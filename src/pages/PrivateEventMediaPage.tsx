import BlogLayout from '../components/BlogLayout/BlogLayout'
import CodeBlock from '../components/CodeBlock/CodeBlock'
import StoryFlow from '../components/StoryFlow/StoryFlow'

const previewTransformExample = `
async function createGalleryPreview(bytes: ArrayBuffer) {
  const output = await env.IMAGES
    .input(streamFor(bytes))
    .transform({
      width: 900,
      height: 900,
      fit: 'scale-down',
    })
    .output({
      format: 'image/webp',
      quality: 72,
    })

  const response = output.response()
  if (!response.ok) {
    throw new UploadError('preview_failed')
  }

  return response.arrayBuffer()
}
`

const quotaReservationExample = `
UPDATE storage_quota
SET used_bytes = used_bytes + ?,
    updated_at = CURRENT_TIMESTAMP
WHERE singleton_id = 1
  AND used_bytes + ? <= ?
`

const uploadCleanupExample = `
const totalBytes = retained.byteLength + preview.byteLength
const reserved = await repository.reserveStorage(totalBytes)

if (reserved === false) {
  throw new UploadError('storage_limit_reached')
}

try {
  await privateBucket.put(originalKey, retained)
  await privateBucket.put(previewKey, preview)
  await repository.insertPhoto({
    collectionId,
    originalKey,
    previewKey,
    totalBytes,
    contentHash,
  })
} catch (error) {
  await privateBucket.delete([originalKey, previewKey])
  await repository.releaseStorage(totalBytes)
  throw error
}
`

const shareBoundaryExample = `
async function readSharedImage(shareToken: string, photoId: string) {
  const share = await repository.enabledShareByToken(shareToken)
  if (share == null) {
    throw new NotFoundError()
  }

  const photo = await repository.photoInShare(share.id, photoId)
  if (photo == null) {
    throw new NotFoundError()
  }

  const image = await createDisplayCopy(photo.privateObjectKey)
  return withHeaders(image, {
    'Cache-Control': 'private, no-store',
    'X-Robots-Tag': 'noindex, nofollow',
  })
}
`

export default function PrivateEventMediaPage() {
  return (
    <BlogLayout
      title="Building a wedding image sharing service"
      date="Summer 2026"
      readingTime="15 min read"
      tags={['React', 'Cloudflare', 'Media delivery', 'Privacy']}
      intro="I built a wedding image sharing service where guests could upload from their phones, the organizer could sort everything privately, and selected photos could be shared without exposing the original files."
      disclosure="This story omits the people involved, wedding date, locations, invite details, private links, uploaded media, credentials, account identifiers, and storage names. Code samples are reduced to the architectural decisions."
    >
      <h2>The experience started with the guest, not the storage</h2>
      <p>
        The first requirement was deliberately low-friction: somebody at the wedding
        should be able to open a link on a phone and contribute images without
        creating a general-purpose account. At the same time, one guest should not be
        able to browse another guest’s collection, and nobody using the contribution
        flow should reach the organizer’s curation tools.
      </p>
      <p>
        I split the product into three surfaces before choosing the backend pieces.
        The guest surface creates or resumes one isolated collection and can only
        manage images inside it. The organizer surface uses a separate privileged
        session to review every collection, categorize images, move them to Trash,
        restore them, and prepare downloads or shares. A share surface can display
        only the images the organizer explicitly selected.
      </p>
      <p>
        That separation kept the guest interface small. It also meant authorization
        could be expressed as a scope rather than a collection of hidden buttons.
        The Worker resolves the session first and passes a collection identifier into
        guest queries. Organizer routes require a different session role. Public
        share routes begin with an enabled share record rather than a guest or
        organizer session.
      </p>

      <StoryFlow
        title="Three surfaces over one private archive"
        steps={[
          {
            label: '01 · Guest',
            title: 'Contribute to one collection',
            detail: 'A lightweight session can upload, review, and remove only that guest’s media.',
          },
          {
            label: '02 · Worker',
            title: 'Enforce the boundary',
            detail: 'Every read and write resolves a guest, organizer, or active-share scope first.',
          },
          {
            label: '03 · Organizer',
            title: 'Curate the full archive',
            detail: 'The private management surface handles review, categories, Trash, downloads, and shares.',
          },
          {
            label: '04 · Recipient',
            title: 'See a selected gallery',
            detail: 'An unlisted share contains display copies for only the chosen images.',
          },
        ]}
      />

      <h2>I chose one Worker because the boundaries mattered more than services</h2>
      <p>
        The application ships as a React interface and API Worker together. The
        Worker serves the static application, checks sessions, validates uploads,
        coordinates image processing, updates relational metadata, and mediates
        every object read. D1 holds collections, sessions, image records, categories,
        share membership, rate-limit state, and storage accounting. R2 holds retained
        originals and generated previews, but the bucket is private.
      </p>
      <p>
        I could have uploaded directly to a public bucket and stored the resulting
        URLs. That would have made the first prototype shorter, but it would turn
        possession of an object URL into the main access rule. Keeping the bucket
        private lets the Worker answer the real question on every read: is this guest
        allowed to see this collection, is this organizer signed in, or does this
        active share include this image?
      </p>
      <p>
        The tradeoff is that the Worker participates in media delivery. I reduced
        that cost by creating reusable display files during upload and serving those
        for galleries. Original files remain available for authenticated organizer
        downloads but are not the default browsing format.
      </p>

      <h2>Uploads had to be trustworthy before they were convenient</h2>
      <p>
        A browser supplies a filename and content type, but both can be wrong. The
        upload path checks the actual file signature, computes a content hash, and
        compares it with the browser-provided hash. The hash supports duplicate
        detection inside one guest collection without treating two guests who chose
        the same image as a global duplicate.
      </p>
      <p>
        The Worker also checks whether uploads are open, applies request limits, and
        enforces the per-collection item cap. Those friendly application checks are
        backed by database constraints so two simultaneous requests cannot both slip
        past a count that was one below the limit.
      </p>

      <StoryFlow
        title="One image upload"
        description="The expensive storage writes happen only after identity, file, duplicate, and capacity checks succeed."
        steps={[
          {
            label: '01 · Validate',
            title: 'Check session and bytes',
            detail: 'Verify scope, upload state, file signature, content hash, duplicate state, and collection limit.',
          },
          {
            label: '02 · Prepare',
            title: 'Retain and make preview',
            detail: 'Keep the intended source file and create a smaller browser-friendly WebP.',
          },
          {
            label: '03 · Reserve',
            title: 'Claim exact storage bytes',
            detail: 'One conditional database update prevents concurrent uploads from crossing the hard limit.',
          },
          {
            label: '04 · Commit',
            title: 'Write objects and metadata',
            detail: 'Store both private objects, insert the image row, or clean up every completed step.',
          },
        ]}
      />

      <h2>Phone originals were the wrong gallery format</h2>
      <p>
        Modern phone photos can be much larger than the screen opening them. Loading
        originals in a grid made the interface feel slow even when the request itself
        worked. It also spent bandwidth transferring detail that a thumbnail could
        not show. I decided to transform once at upload time rather than resize every
        time a gallery opens.
      </p>
      <p>
        Every accepted image gets a WebP preview capped at 900 by 900 pixels. Normal
        inputs go directly through the image binding. Oversized inputs briefly use a
        signed private object as the transformation source and delete that temporary
        object in a finally block. The result is stored beside the retained file in
        private R2, so gallery reads are predictable and do not repeat processing.
      </p>
      <p>
        The organizer still needs the source archive, while a shared gallery benefits
        from more detail when somebody opens an image. I kept three distinct uses:
        lightweight grid preview, higher-quality display copy, and private retained
        original. Naming those uses prevented “best quality” from automatically
        meaning “send the largest file everywhere.”
      </p>

      <CodeBlock
        codeString={previewTransformExample}
        language="TypeScript"
        title="Upload-time WebP preview"
        showLineNumbers
      />

      <h2>A storage check had to remain true under concurrency</h2>
      <p>
        The application has a fixed retained-storage budget. A read-then-write check
        is unsafe: two uploads can both read the same remaining space, both decide
        they fit, and then cross the limit together. The solution is one conditional
        update that adds the exact retained-file and preview sizes only when the new
        total remains below the limit.
      </p>
      <p>
        D1 serializes that update, so only one request can claim the final available
        bytes. A changed-row count of one means the reservation succeeded; zero means
        the upload must stop before writing objects. This is a small SQL statement
        carrying more correctness than a longer series of application checks.
      </p>

      <CodeBlock
        codeString={quotaReservationExample}
        language="SQL"
        title="Atomic storage reservation"
        showLineNumbers
      />

      <h2>D1 and object storage cannot share a transaction</h2>
      <p>
        Reserving bytes solves concurrency but creates a second problem. The database
        transaction cannot include the R2 writes. The Worker may reserve capacity,
        write the original, fail while writing the preview, or stop before inserting
        the final image row. Without explicit compensation, that leaves an orphaned
        object or a permanently inflated quota.
      </p>
      <p>
        I made object keys deterministic for the new image, tracked which writes had
        completed, and wrapped the storage and metadata steps in cleanup. Any failure
        deletes completed objects and releases the reservation. The final insertion
        has its own uniqueness constraints, so a retry cannot silently duplicate the
        same image inside a collection.
      </p>
      <p>
        A Worker can still disappear between external operations before cleanup runs.
        Reconciliation therefore compares the stored quota with image metadata and
        compares database object references with the private bucket inventory. It
        reports differences for explicit repair. It does not silently delete an
        unmatched private image, because preserving somebody’s wedding photo is more
        important than making the counters look tidy.
      </p>

      <CodeBlock
        codeString={uploadCleanupExample}
        language="TypeScript"
        title="Compensating for a partial upload"
        showLineNumbers
      />

      <h2>Deletion meant different things to guests and organizers</h2>
      <p>
        Before the contribution window closes, a guest can remove an accidental
        upload from their own collection. For the organizer, deleting during curation
        behaves like Trash: metadata is marked deleted, the objects remain private,
        and the image can be restored. Permanent organizer deletion is a separate
        authenticated action that removes the objects, metadata, relationships, and
        storage allocation.
      </p>
      <p>
        I chose those different semantics because the mistakes are different. A guest
        correcting their own recent upload expects it to go away. An organizer moving
        quickly through a large archive needs a reversible action. The interface,
        database state, and storage accounting all use the same distinction.
      </p>

      <h2>Sharing was designed as publication, not another permission checkbox</h2>
      <p>
        The organizer can select images and create a share, but a new share begins as
        a disabled draft. Its unguessable token exists so the organizer can preview
        the exact page, yet friends and family cannot open it until the organizer
        explicitly publishes it. The same link can be unpublished and later restored,
        or its token can be rotated when the old URL should stop working permanently.
      </p>
      <p>
        Every gallery request starts by loading an enabled share from the token.
        Every image request then verifies that the requested image still belongs to
        that share. Unknown, disabled, empty, or mismatched requests all use the same
        unavailable response. The public route returns display copies with no-store
        and noindex behavior; it never returns the private original or contributor
        metadata.
      </p>

      <StoryFlow
        title="Publishing a selected gallery"
        steps={[
          {
            label: '01 · Draft',
            title: 'Choose and order images',
            detail: 'The organizer can preview a complete gallery while its token remains inactive.',
          },
          {
            label: '02 · Publish',
            title: 'Enable the share',
            detail: 'The same action saves the current title, message, selection, and order.',
          },
          {
            label: '03 · Request',
            title: 'Verify token and membership',
            detail: 'The Worker confirms both the active share and the requested image on every read.',
          },
          {
            label: '04 · Revoke',
            title: 'Unpublish or rotate',
            detail: 'Unpublishing preserves the URL for later; rotation invalidates the old token.',
          },
        ]}
      />

      <CodeBlock
        codeString={shareBoundaryExample}
        language="TypeScript"
        title="A shared image still passes through authorization"
        showLineNumbers
      />

      <h2>The mobile review changed more than spacing</h2>
      <p>
        Guests were most likely to use the service while holding a phone, possibly on
        an unreliable connection and with several large images selected. I tested the
        upload states as a sequence: selection, validation, progress, partial
        rejection, successful completion, and return to the collection. Clear
        per-file feedback mattered more than packing every control above the fold.
      </p>
      <p>
        The organizer interface also had to work on a phone. Selection targets,
        category actions, destructive confirmations, draft status, and publish
        controls needed enough separation to avoid accidental taps. Public galleries
        load the opening image deliberately, start remaining images with lightweight
        previews, and request sharper display copies as the browser and each image
        become ready.
      </p>

      <h2>What the architecture taught me</h2>
      <p>
        The project looks like an upload form from the outside, but the difficult
        decisions were about ownership and incomplete work. Who may read an object?
        Which representation should the browser receive? What happens after one half
        of a cross-system write succeeds? Does delete mean reversible curation or
        permanent erasure? Is a generated link already public?
      </p>
      <p>
        The final architecture answers those questions with explicit states: scoped
        sessions, private objects, upload-time derivatives, atomic reservations,
        compensating cleanup, reversible Trash, disabled share drafts, and
        Worker-mediated reads. I verified the pieces with file-signature tests,
        concurrent-limit tests, failed-write cleanup tests, authorization tests,
        rendered mobile checks, production headers, and real transformed image
        dimensions. The wedding details remain private; the engineering lesson is
        that a simple contribution flow depends on making every boundary boring and
        clear.
      </p>
    </BlogLayout>
  )
}

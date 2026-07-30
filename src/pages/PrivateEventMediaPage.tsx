import BlogLayout from '../components/BlogLayout/BlogLayout'

export default function PrivateEventMediaPage() {
  return (
    <BlogLayout
      title="Building a wedding image sharing service"
      date="Summer 2026"
      tags={['React', 'Cloud', 'Media delivery', 'Privacy']}
      intro="I built a wedding image sharing service where guests could upload from their phones, the organizer could sort everything privately, and selected photos could be shared without exposing the original files."
      disclosure="This story omits the people involved, wedding date, locations, invite details, private links, uploaded media, access configuration, and storage identifiers."
    >
      <h2>Phone originals were too heavy for the gallery</h2>
      <p>
        Guests could upload modern phone photos that were much larger than the screen
        displaying them. Serving those files directly made the first gallery load
        slow and wasted bandwidth every time somebody opened it.
      </p>
      <p>
        During upload, I generate a WebP preview capped at 900 by 900 pixels and store
        it next to the retained file. Galleries use that preview through an
        authenticated Worker route. Large source photos take a separate temporary
        path for resizing, and that temporary object is deleted after the transform.
      </p>

      <h2>Simultaneous uploads could cross the storage limit</h2>
      <p>
        Checking “is there enough space?” and updating the total as two separate
        operations would let two uploads both claim the final available bytes. The
        database and object storage also cannot share one transaction, so a failed
        write could leave the count wrong.
      </p>
      <p>
        I reserve the exact bytes for the retained file and preview with one
        conditional database update. Only then are both private objects written. If
        either write or the final database insert fails, the objects are removed and
        the reservation is released. A reconciliation check reports the rare case
        where a Worker stops between those steps.
      </p>

      <h2>A guest upload link could not become an admin link</h2>
      <p>
        Each guest upload belongs to an isolated collection. The guest token can add
        to and review that collection, but it cannot open the management area or see
        another guest’s uploads. Organizer actions use a separate secure session.
      </p>

      <h2>Sharing needed an off switch</h2>
      <p>
        A share starts disabled and gets an unguessable token. The organizer can
        enable it, disable it without changing the link, or rotate the token
        entirely. The page is marked not to be indexed, checks that each requested
        image still belongs to the active share, and serves a display copy instead of
        the private original.
      </p>
    </BlogLayout>
  )
}

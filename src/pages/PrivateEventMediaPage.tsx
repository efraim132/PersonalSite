import BlogLayout from '../components/BlogLayout/BlogLayout'

export default function PrivateEventMediaPage() {
  return (
    <BlogLayout
      title="A private event-media workflow that stayed simple"
      date="Summer 2026"
      tags={['React', 'Cloud', 'Media delivery', 'Privacy']}
      intro="The project looked simple from the outside: let guests contribute photos, help an organizer curate them, and make selected images pleasant to share. The real work was in the boundaries."
      disclosure="This retrospective omits the people involved, event identity, event date, locations, invite details, private links, uploaded media, access configuration, and storage identifiers."
    >
      <h2>A small product with three different users</h2>
      <p>
        The experience had to work for a guest arriving from a phone, an organizer
        managing a growing collection, and a recipient opening a shared image later.
        Each user needed a different amount of context and control.
      </p>
      <p>
        I treated those as three focused workflows instead of one overloaded gallery:
        contribute, curate, and share. That kept the guest path short while giving
        the private management view the tools it needed.
      </p>

      <h2>The features that mattered</h2>
      <ul>
        <li>
          <strong>Mobile-first contribution:</strong> a direct upload path with clear
          progress and useful failure feedback.
        </li>
        <li>
          <strong>Private curation:</strong> management tools for reviewing,
          selecting, and organizing media without exposing the administrative
          surface.
        </li>
        <li>
          <strong>Progressive galleries:</strong> fast initial previews that sharpen
          as better media becomes available.
        </li>
        <li>
          <strong>Intentional sharing states:</strong> clear differences between
          selected, published, unavailable, and removed media.
        </li>
        <li>
          <strong>Mobile management polish:</strong> touch-friendly selection,
          readable actions, and layouts that hold up on the device most likely to be
          used during an event.
        </li>
        <li>
          <strong>Production transport protections:</strong> secure delivery and
          strict browser transport behavior on the public surface.
        </li>
      </ul>

      <h2>Image quality is a product decision</h2>
      <p>
        A gallery can feel slow even when the server is fast, and it can feel cheap
        even when the original file is excellent. The solution was a progressive
        media path: send an appropriately sized preview quickly, then let the image
        settle into a sharper version without disrupting the layout.
      </p>
      <p>
        Shared images required a different balance. They needed enough quality to
        stand on their own without turning every open into an original-file
        download. Those decisions were tested as visible user experience, not only
        as successful network requests.
      </p>

      <h2>Privacy changed what “done” meant</h2>
      <p>
        The application handled personal media for a private event, so success was
        not just a working upload. The public and administrative surfaces needed
        different access boundaries. Unpublished media needed unambiguous behavior.
        Notes, screenshots, test data, and release checks also had to avoid carrying
        private context into places it did not belong.
      </p>

      <h2>What I learned</h2>
      <p>
        Small private tools benefit from the same product discipline as larger
        systems. Keep the public path obvious, keep administrative power narrow,
        verify the real mobile experience, and treat privacy as a property of the
        whole workflow—not a sentence added at the end.
      </p>
    </BlogLayout>
  )
}

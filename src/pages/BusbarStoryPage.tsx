import { Link } from 'react-router'
import BlogLayout from '../components/BlogLayout/BlogLayout'

export default function BusbarStoryPage() {
  return (
    <BlogLayout title="From three rails to one G" date="November 21, 2026" tags={['Design', 'Identity']} readingTime="2 min read"
      intro="My first monogram started with a busbar. The one on my site today came from asking how much of that drawing I could take away and still see my initials.">
      <h2>Starting with three rails</h2>
      <p>Electrical systems gave me my first idea. Three horizontal rails with a shorter one in the middle made an E. I tried bending the bottom rail back to suggest a G, then gave the G its own space. I kept the rails level and leaned both letters forward. I paired them with my name in rounded Avenir Next Heavy capitals.</p>
      <figure><img loading="lazy" src="/brand/studies/hidden-g.png" alt="Three early sketches bending the bottom rail back into the E" /><figcaption>My early attempts to fit a G inside the busbar.</figcaption></figure>
      <h2>How much should it look like EG?</h2>
      <p>I liked the weight of the original, but the three stripes kept steering every sketch back to the same place. I tried joining the initials. Both letters were easy to spot, and that was part of the problem. My eye read the pair and moved on.</p>
      <figure><img loading="lazy" src="/brand/studies/literal.webp" alt="Sixteen joined EG studies, including several with one letter nested inside the other" /><figcaption>The nested letters worked like little puzzles. I wanted something simpler.</figcaption></figure>
      <p>I went further with circles, wedges, and rounded blocks. I liked the piece balanced on a dot and the two curved pieces touching at a corner. Looking at them cold, though, I couldn't find much of myself in them.</p>
      <figure><img loading="lazy" src="/brand/studies/abstract.webp" alt="A grid of geometric studies with cut circles, balanced shapes, and rounded blocks" /><figcaption>This round helped me decide what to bring back: one recognizable initial.</figcaption></figure>
      <h2>Fourth row, third column</h2>
      <p>I came back to an upright G. Once I had that silhouette, I could compare just the shoulder, the opening, and the reach of the crossbar. My pick was the third mark in the bottom row. The broad upper-left curve gives it a little motion, while the flat base lets it sit comfortably beside my name.</p>
      <figure><img loading="lazy" src="/brand/studies/refinements.webp" alt="Sixteen closely related upright G shapes. The selected G is in the fourth row, third column." /><figcaption>I chose the bottom row’s third G for its wide stance and the rounded end of its crossbar.</figcaption></figure>
      <p>That crossbar is where I still see a lowercase e. I kept the Ice Blue and midnight colors, drew the final outline as a vector, and used the same shape for the homepage, the signature, and the browser icon. The artwork and downloads are in my <Link to="/brand">brand guidelines</Link>.</p>
    </BlogLayout>
  )
}

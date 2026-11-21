import { Link } from 'react-router'
import BlogLayout from '../components/BlogLayout/BlogLayout'

export default function BusbarStoryPage() {
  return (
    <BlogLayout title="From three rails to one G" date="November 21, 2026" tags={['Design', 'Identity']} readingTime="4 min read"
      intro="My first monogram started with a busbar. The one on my site today came from asking how much of that drawing I could take away and still see my initials.">
      <h2>Why three rails?</h2>
      <p>I liked the rounded corners and single-color shape of Docker’s container logo. For my own mark, I wanted a detail that came from my time working with electrical systems. A busbar gave me a place to start. Stack three rails, shorten the middle one, and I could read an E even with the spine missing.</p>
      <h2>I lost the G trying to hide it</h2>
      <p>My first instinct was to bend the bottom rail back into the middle. Once I knew where the G was, I could see it. Looking away and coming back, I mostly saw three pieces of a shape I had to put together again.</p>
      <figure><img loading="lazy" src="/brand/studies/hidden-g.png" alt="Hook, Split Rail, and Wrap sketches folding the G into the three-rail E" /><figcaption>I liked the original E more than any of these combinations.</figcaption></figure>
      <p>I gave the G its own space beside the E. A circular G looked borrowed, so I drew it with the same thick horizontal runs and rounded bends. Closing the gaps between the E’s rails made the two letters feel like they belonged on the same line.</p>
      <h2>The difference between lean and slope</h2>
      <p>One version looked like it was climbing uphill. I asked for flat rails, then realized I missed the forward motion. Those were two separate adjustments. I shifted the tops of both letters to the right for an 11° lean while keeping the baseline and every rail horizontal.</p>
      <h2>Getting my name to hold its weight</h2>
      <p>Inter SemiBold looked too light beside the symbol. I tried DIN Alternate Bold, Futura Medium, and Optima Regular. Seeing my name set three ways made it easier to say what I wanted: heavier strokes and capitals all the way across.</p>
      <figure><img loading="lazy" src="/brand/studies/type-trials.png" alt="My name in three mixed-case typefaces beside the same EG" /><figcaption>The EG stayed fixed while I compared the lettering.</figcaption></figure>
      <p>I settled on Avenir Next Heavy, rounded the corners of the letter outlines, and sized the EG to the visible height of EFRAIM GREBNEV. That last adjustment matters most in the navigation bar, where a few pixels can make the mark look like it belongs on a different line.</p>
      <h2>Two themes from the site</h2>
      <p>Signal Orange and Ultramarine were my favorite early colors. When I put them against my site’s midnight background, I picked Ultramarine. For the dark theme, Blue Shift, I kept the signature cool white and used the blue for the accent. For Ice Blue, I moved midnight into the lettering and put it on a pale blue field.</p>
      <figure><img loading="lazy" src="/brand/studies/light-palettes.png" alt="Ice Blue, Porcelain, and Signal Mist compared beneath the dark signature" /><figcaption>Ice Blue, on the left, brought the midnight and ultramarine from the dark theme into the light one.</figcaption></figure>
      <figure>
        <img loading="lazy" src="/brand/ice-blue/signature.svg" alt="Original Busbar EG signature with three separate rails beside a forward-leaning G and my name" style={{ background: '#eef2ff', padding: 'clamp(1rem, 4vw, 3rem)' }} />
        <figcaption>My finished Busbar EG signature in Ice Blue. I kept this version here so you can see where the upright G began.</figcaption>
      </figure>
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

import { Link } from 'react-router'
import BlogLayout from '../components/BlogLayout/BlogLayout'

export default function BusbarStoryPage() {
  return (
    <BlogLayout title="How I designed Busbar EG" date="November 21, 2026" tags={['Design', 'Identity']} readingTime="3 min read"
      intro="I wanted one mark I could put in the corner of my website, at the top of my résumé, or on a PCB silkscreen. Three thick bars got me most of the way there. The G took a few tries.">
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
      <p>The full signature now sits in my site header. My résumé already has my name in text, so the EG alone fits beside it. Both versions are in my <Link to="/brand">brand guidelines</Link>.</p>
    </BlogLayout>
  )
}

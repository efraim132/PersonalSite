import BlogLayout from '../components/BlogLayout/BlogLayout'
import CodeBlock from "../components/CodeBlock/CodeBlock.tsx";

export default function EENetPage() {
  return (
    <BlogLayout
      title="ComputerCraft EENet"
      date="October 28, 2025"
      tags={['Lua', 'ComputerCraft', 'Networking']}
      projectUrl="https://github.com/GrebCo/CC-Tweaked-Amazon-OS"
    >
      <p>
        ComputerCraft EENet is a networking and operating system framework built for
        ComputerCraft Tweaked in Minecraft. It provides a structured way to manage
        communication between in-game computers.
      </p>

      <h2>Motivation</h2>
      <p>
        ComputerCraft (CC:Tweaked) is a Minecraft mod that adds programmable computers to the game, each running a stripped-down
        Lua environment. These in-game computers can communicate over a virtual network called Rednet, but there was no cohesive
        way to browse, serve, or interact with content across that network, no browser, no markup standard, and no scripting sandbox.
        I wanted to build the full experience from scratch: a DNS system, a web server, a markup language for rendering pages,
        a sandboxed scripting engine for interactivity, and a browser UI that ties it all together. The goal was to recreate the
        core architectural layers of the real web. DNS resolution, HTTP-like request/response, HTML-like rendering, and
        JavaScript-like scripting, all within the constraints of a 51×19 character terminal running Lua with no external libraries.
      </p>
      <p>This project also served as a hands-on way to deepen my understanding of how browsers, networking stacks, and
        sandboxed execution environments actually work under the hood, skills directly applicable to my cybersecurity studies.
      </p>

      <h2>Technical Approach</h2>
      <p>The system is split into three main components that mirror real web infrastructure:</p>
      <ol>
        <li><h3>Network Layer (EENet)</h3>
          <ol>
            <li><b>DNS Server:</b> A dedicated in-game computer hosts a JSON file mapping hostnames to Rednet computer IDs.
              Clients query this server using a custom DNS protocol over Rednet.</li>

            <li><b> Server:</b> Serves .txt files (MiniMark documents) over a custom EENet protocol. Supports path-based
              routing (e.g., Demo/about resolves to about.txt on the server).</li>

            <li><b>Client Network Handler:</b> Handles DNS resolution with a local cache file, automatic cache refresh on miss,
              and fallback error handling. Provides send(), query(), and sendByLookup() functions for general-purpose
              network communication.</li>

          </ol>
        </li>
        <li><h3>Rendering Layer (MiniMark + UI Framework)</h3></li>
        <ol>
          <li><b>MiniMark:</b> A custom markup language I designed specifically for CC:Tweaked's terminal. It supports headers
            with alignment (#, ##, ###), inline color tags ({"<fg:red>"}, {'<bg:blue>'}), links, buttons, checkboxes, text inputs,
              horizontal rules, and persistent element IDs for dynamic updates.</li>

          <li><b>UI Framework (UI.lua): </b> A from-scratch UI library with scene management, dirty-flag rendering, a
            full event system (mouse, keyboard, touch, scroll), focus management, layout containers (VStack, HStack, Grid),
            draggable panels, and a theme system with 15 built-in color themes (Catppuccin, Dracula, Nord, Gruvbox, etc.).</li>

          <li>MiniMark rendering is split into tokenization, layout, and draw phases. Tokenization and layout are cached
            so that scrolling and redraws only run the fast draw phase ({'<1ms'}), eliminating flicker.</li>
        </ol>
        <li><h3>Scripting Layer (Fizzle)</h3>
          <ol>
            <li><b>Fizzle: </b> A sandboxed Lua scripting engine embedded in MiniMark Pages via {'<script>'} tags. Scripts
              use decorator syntax (@onLoad, @onClick, @onCCEvent "key") to bind functions to events.</li>
            <li><b>Sandbox: </b>Scripts run in a restricted environment with access to safe builtins (math, string, table),
              ComputerCraft APIs (keys, redstone, os.startTimer), and custom libraries (document, net, cookie) but crucially,
              no filesystem or global table access.</li>
            <li><b>Timeout Protection: </b> Every script handler is wrapped in a watchdog that uses debug.sethook() to
              enforce a 10ms execution limit, preventing infinite loops or CPU-intensive attacks from freezing the browser.
            </li>
          </ol>

        </li>
      </ol>
      <h2>Technical Features</h2>
      <p>As part of this project a new Language called Minimark and Fizzle were created:</p>
      <CodeBlock codeString={"<fg:yellow>Welcome to My Page\n" +
          "\n" +
          "<fg:white>This is styled text with <fg:lime>inline colors<reset>.\n" +
          "\n" +
          "<link \"home\",\"Go Home\">\n" +
          "\n" +
          "<button label:\"Submit\" fg:white bg:green onClick:HandleSubmit>\n" +
          "\n" +
          "<textbox width:\"20\" id:\"userInput\" onEnter:ProcessInput>\n" +
          "\n" +
          "<id:\"status\">Waiting for input...\n" +
          "\n" +
          "<script>\n" +
          "@HandleSubmit\n" +
          "function handleSubmit()\n" +
          "  local input = document.getElementById(\"userInput\")\n" +
          "  document.setElementBodyById(\"status\", \"You typed: \" .. input.text)\n" +
          "end\n" +
          "</script>"} language={"Minimark"} title={"Example MiniMark Document"}/>
      <p>MiniMark parses inline, meaning tags like {'<fg:red>'} don't use closing tags, they persist until {'<reset>'} or
        end-of-line. This design choice keeps the syntax minimal for the tiny terminal environment.</p>



      <h3>Sandboxed Script Execution (Fizzle)</h3>
      <CodeBlock codeString={"@onCCEvent \"key\"\n" +
          "function handleKey(keyCode, isHeld)\n" +
          "  if keyCode == keys.w then\n" +
          "    posY = posY - 1\n" +
          "    updateCanvas()\n" +
          "  end\n" +
          "  document.setElementBodyById(\"posY\", tostring(posY))\n" +
          "end"} language={"Lua"} title={"Fizzle Script Example"}/>

      <p>The sandbox provides a document API modeled loosely after the real browser DOM</p>
      <ul>
        <li>document.getElementById(id) returns a reference to a Minimark Element</li>
        <li>document.setElementBodyById(id, text) updates element text and triggers re-layout</li>
        <li>cookie.cookieWrite(name, value, domainMode) writes to persistent storage scoped per domain</li>
        <li>net.query(target, message, protocol) network requests with forced timeout</li>
      </ul>

      <h3>Theme System</h3>
      <p>The UI framework supports palette remapping via CC:Tweaked's term.setPaletteColor(), allowing full RGB control
        of all 16 terminal colors. Themes define semantic roles (background, interactive, error, success) that all UI
        elements reference, so switching themes updates the entire interface instantly.</p>
      <CodeBlock codeString={"-- Switching themes is a single call\n" +
          "ui.setTheme(\"catppuccin\")  -- Mocha pastel palette\n" +
          "ui.setTheme(\"dracula\")     -- Dark purple accent\n" +
          "ui.setTheme(\"paper\")       -- Clean light theme"} language={"Lua"} title={"Theme Switching Example"}/>

      <h3>DNS Resolution with Caching</h3>
      <ol>
        <li>The Client "looks up" its own DNS cache and gets a computer ID (ip address analogue)</li>
        <li>It gets a JSON response back and proceeds on</li>
        <li>If its not found in the DNS Cache, it looks up up by looking for a DNS server</li>
        <li>If its found, the DNS server's data is cached on the PC</li>
        <li>Jump to step 1 if found</li>
      </ol>


      <h2>Key Features</h2>
      <ul>
        <li><b>Full browser UI with URL bar:</b> navigation buttons, settings page, and a splash screen.
          All rendered in a 51×19 character terminal</li>
        <li><b>Page navigation via MiniMark links</b> with automatic network fetching or local page loading</li>
        <li><b>Interactive elements</b> (buttons, checkboxes, text fields) that bridge MiniMark markup to the UI framework
          as real focusable, clickable elements</li>
        <li><b>Cookie system </b>with domain isolation, size limits (1MB per domain), and configurable scoping
          (base domain, full path, or custom)</li>
        <li><b>CC event forwarding:</b> real Minecraft events (mouse clicks, key presses, redstone signals, timers)
          are routed through to Fizzle scripts via an allowlist in the config</li>
        <li><b>Malicious script protection:</b> tested with dedicated "kill test" pages containing infinite loops,
          recursion bombs, and CPU-intensive computations. All terminated by the timeout watchdog</li>
        <li><b>GitHub-based auto-updater</b> that uses the GitHub Contents API to recursively
          download the latest version of the browser</li>
      </ul>

      <h2>Challenges</h2>
      <p>
        Working within the constraints of the ComputerCraft environment required
        creative solutions for networking, resource management, and user interface
        design within the Cobalt Lua Engine.
      </p>
      <ol>
        <li><b>Flicker-free rendering in a character terminal:</b> Early versions re-tokenized and re-laid-out the entire
          MiniMark page on every frame, causing visible flicker during scrolling. The solution was the 3-stage pipeline:
          expensive tokenization and layout happen once on page load, and the draw phase just blits pre-calculated
          character data. A dirty-flag system ensures the draw phase itself is skipped entirely during a render tick
          when nothing has changed.</li>

        <li><b>Sandboxing Lua without true process isolation:</b> CC:Tweaked's Lua environment doesn't support real
          process isolation. Fizzle's sandbox uses setenv-style environment restriction via load() with a custom
          environment table, plus debug.sethook() for CPU time enforcement. The tricky part was handling the two
          different event models. Fizzle's own decorator events pass parameters in a table, while ComputerCraft
          events pass them as direct varargs. The routing layer prefixes CC events with cc: to keep them separate.</li>

        <li><b>UI element lifecycle across page changes:</b> When navigating to a new page, all interactive MiniMark elements
          (buttons, text fields, checkboxes) need to be destroyed and recreated from the new page's tokens,
          but the UI framework's focus state, event subscriptions, and scene tree all need to stay consistent.
          The solution uses a child overlay scene for MiniMark interactive elements, so clearScene() on the overlay
          cleanly removes all old elements without touching the browser chrome.</li>

        <li><b>Scroll synchronization for overlaid UI elements:</b> MiniMark renders text directly to the terminal,
          but interactive elements are real UI framework objects that live in the scene graph. When the user scrolls,
          every interactive element's Y position must be recalculated and visibility toggled based on whether it's
          inside the viewport. This is handled in the renderer's onUpdate() hook, which runs every frame and adjusts
          all overlay elements.</li>
      </ol>

      <h2>Results &amp; Future Work</h2>
      <p>
        The system successfully demonstrates a working multi-computer web infrastructure inside Minecraft:
      </p>
      <ul>
        <li>DNS servers resolve hostnames to computer IDs across the Rednet network</li>
        <li>Web servers host and serve MiniMark pages on request</li>
        <li>The browser fetches, caches, renders, and navigates between pages with interactive scripting</li>
        <li>The timeout protection reliably kills all malicious script patterns tested (infinite loops, recursion bombs)
          while allowing legitimate scripts to complete</li>
        <li>The theme system provides 15 color schemes that work within CC:Tweaked's 16-color palette constraint</li>
      </ul>
      <p>In all Honesty this project has been developing for over a year at this point, and I am grateful to have been
      able to work on this. However unfortunately my personal interest in computercraft is waning. I may possibly pick it
      back up in the future however that is still to be determined</p>
      <h3>Thank you for reading</h3>
    </BlogLayout>
  )
}

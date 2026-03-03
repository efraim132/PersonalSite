import BlogLayout from '../components/BlogLayout/BlogLayout'

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
        {/* TODO: Update */}
        ComputerCraft adds programmable computers to Minecraft, but the default
        networking APIs are low-level. EENet provides a higher-level framework for
        building networked systems within the game.
      </p>

      <h2>Technical Approach</h2>
      <p>
        {/* TODO: Update */}
        The framework is written entirely in Lua and runs on CC:Tweaked computers.
        It implements networking protocols, device discovery, and an operating system
        layer on top of the ComputerCraft APIs.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>Structured networking protocol for ComputerCraft computers</li>
        <li>Operating system framework with device management</li>
        <li>Built entirely in Lua for the CC:Tweaked runtime</li>
        {/* TODO: Update */}
      </ul>

      <h2>Challenges</h2>
      <p>
        {/* TODO: Update */}
        Working within the constraints of the ComputerCraft environment required
        creative solutions for networking, resource management, and user interface
        design within a game engine.
      </p>

      <h2>Results &amp; Future Work</h2>
      <p>
        {/* TODO: Update */}
        EENet provides a usable framework for building networked ComputerCraft
        systems. Future plans include expanding protocol support and adding more
        OS-level features.
      </p>
    </BlogLayout>
  )
}

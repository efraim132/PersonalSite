import BlogLayout from '../components/BlogLayout/BlogLayout'

export default function SuperLuaPage() {
  return (
    <BlogLayout
      title="SuperLua Transpiler"
      date="September 28, 2025"
      tags={['Python', 'Lua', 'Compiler Design']}
      projectUrl="https://efraim132.github.io/SuperLua/index.html"
    >
      <p>
        SuperLua is a transpiler that compiles a superset of Lua with modern language
        features down to standard Lua. It brings quality-of-life improvements to the
        Lua ecosystem while maintaining full compatibility with existing Lua runtimes.
      </p>

      <h2>Motivation</h2>
      <p>
        {/* TODO: Update */}
        Lua is a lightweight and fast scripting language, but it lacks some of the modern
        conveniences found in other languages. SuperLua was created to bridge that gap,
        adding syntactic sugar and new constructs while transpiling down to clean, readable
        Lua code.
      </p>

      <h2>Technical Approach</h2>
      <p>
        {/* TODO: Update */}
        The transpiler is built in Python and processes SuperLua source files through
        lexing, parsing, and code generation stages. It produces standard Lua output
        that can be run on any Lua interpreter.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>Extended syntax support beyond standard Lua</li>
        <li>Clean output code that maintains readability</li>
        <li>Compatibility with existing Lua runtimes</li>
        {/* TODO: Update */}
      </ul>

      <h2>Challenges</h2>
      <p>
        {/* TODO: Update */}
        Building a transpiler involves handling edge cases in parsing and ensuring
        the generated code behaves identically to what the programmer intended.
      </p>

      <h2>Results &amp; Future Work</h2>
      <p>
        {/* TODO: Update */}
        SuperLua successfully transpiles its extended syntax down to standard Lua.
        Future work includes expanding the feature set and improving error messages.
      </p>
    </BlogLayout>
  )
}

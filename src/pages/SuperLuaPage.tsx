import BlogLayout from '../components/BlogLayout/BlogLayout'
import CodeBlock from "../components/CodeBlock/CodeBlock.tsx";

export default function SuperLuaPage() {
  return (
    <BlogLayout
      title="SuperLua Transpiler"
      date="September 28, 2025"
      tags={['Python', 'Lua', 'Compiler Design']}
      projectUrl="https://efraim132.github.io/SuperLua/index.html"
    >
      <p>
        SuperLua is a transpiler that compiles a superset of Lua with with classess down to standard Lua.
        It brings quality-of-life improvements to the Lua ecosystem while maintaining full compatibility
        with existing Lua runtimes.
      </p>

      <h2>Why? What's the motivation</h2>
      <p>
        Lua is a lightweight and fast scripting language, but it lacks some of the modern
        conveniences found in other languages. SuperLua was created to bridge that gap. In development of EENet, I realized
        that progress was slow and clunky. Due to my partner's and I background we realized that classes could make it easier
        for us to move faster.
      </p>
      <CodeBlock codeString={'class Vector\n' +
          '    function new(self, x, y)\n' +
          '        self.x = x or 0\n' +
          '        self.y = y or 0\n' +
          '    end\n' +
          '\n' +
          '    function add(self, other)\n' +
          '        return Vector:new(self.x + other.x, self.y + other.y)\n' +
          '    end\n' +
          '\n' +
          '    function magnitude(self)\n' +
          '        return math.sqrt(self.x * self.x + self.y * self.y)\n' +
          '    end\n' +
          '\n' +
          '    function toString(self)\n' +
          '        return "Vector(" .. self.x .. ", " .. self.y .. ")"\n' +
          '    end\n' +
          'end\n' +
          '\n' +
          '-- Usage example (this will be preserved as-is)\n' +
          'local v1 = Vector:new(3, 4)\n' +
          'local v2 = Vector:new(1, 2)\n' +
          'local v3 = v1:add(v2)\n' +
          'print(v3:toString())'} language={"SuperLua"} title={"SuperLua.slua"}/>

      <h2>Technical Approach</h2>
      <p>
        The idea was to create a SuperLua Language that was identical to base lua but provided classes. This meant having
        easy to use, and recognizable instance and static functions. This was done through a set of predefined functions most notably
        a constructor. Then if you wanted to add in instance methods it was simply just passing in self, similar to that
        of python and other languages.
      </p>
      <p>This project heavily relies on meta-tables from Lua, see the reference  <a href={"https://www.lua.org/pil/13.html"} target={"_blank"}>here</a>.</p>

      <h2>Key Features</h2>
      <ul>
        <li>Adds Classes to Lua that transpiles into normal Lua with minimal overhead</li>
        <li>Clean output code that maintains readability</li>
        <li>Easy to use, simply copy paste output straight into lua program</li>
        <li>Examples for reference just to get started, the syntax isn't overly complex</li>
        <li>Simple WebDemo to be able to show people using Pyscript</li>
      </ul>

      <h2>Challenges</h2>
      <p>
        This project was quite challenging, as it was my first attempt into writing a "pilar" of any kind
        I went through several iterations before settling on a line-by-line parser instead of regex. Here's why:
        <ul>
          <li> Regex was too fragile - Nested structures like if/for/while blocks inside methods broke the pattern matching
            End counting was crucial - I needed to track nested end statements to properly close method bodies
            Line-by-line gave better control - I could handle edge cases and maintain proper indentation</li>
          <li>The parser tracks:
            <ul>
              <li>Class boundaries (class Name to end)</li>
              <li>Method boundaries (function name() to matching end)</li>
              <li>Nested structures that increment the end counter</li>
            </ul>
            </li>
          <li>
            There were even more challenges I had to solve relating to unexpected bugs:
            <ol>
              <li>Methods defined with explicit self parameter caused "attempt to index nil" errors Solution: Remove self from parameter lists since colon syntax provides it automatically</li>
              <li>Initial bug: Regex captured everything until the last end, breaking method boundaries Solution: Line-by-line parsing with proper end counting for nested blocks</li>
            </ol>
          </li>
        </ul>

      </p>

      <h2>Results &amp; Future Work</h2>
      <p>
        SuperLua successfully transpiles its extended syntax down to standard Lua.
        Please see the <a href={"https://github.com/efraim132/SuperLua"} target={"_blank"}>repo</a> for even more indepth information
      </p>
    </BlogLayout>
  )
}

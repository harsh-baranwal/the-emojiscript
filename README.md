<h1 align="center">EmojiScript 🔥</h1>

<p align="center">
<a href="https://www.npmjs.com/package/the-emojiscript"><img alt="Version" src="https://img.shields.io/badge/npm-v1.0.1-blue"/></a>
<a href="https://www.npmjs.com/package/the-emojiscript"><img alt="Package" src="https://img.shields.io/badge/npm-the--emojiscript-orange"/></a>
<img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen"/>
</p>

<p>Compile and run any EmojiScript program from this [website](https://harsh-baranwal.github.io/web-compiler/)</p>

<p align="center">
  <b>EmojiScript 🔥 is a programming language based on emojis.</b>
</p>
<br>

<h2>Installation</h2>
<p>Make sure you have already installed Node in your system. Run the following command in your command prompt window.</p>

```
npm i -g the-emojiscript
```

<p>Run the <code>emojiscript</code> command in your terminal.</p>

<h4>Usage: </h4>

<p><b>Create a new file <code>script.emoji</code>, you can also use <code>.🔥</code> extension</b></p>

<p><b>Edit the file with any text editor.</b></p>

```
🔊"Hello World"❗
```

<h4>Run: </h4>

```
👀 script.emoji
```

<p>or</p>

```
emorun script.emoji
```

<h2>Documentation</h2>

<p>To comment out any line in the code you have to use <code>💬</code>.</p>

```
💬 This is a comment
💬 This is another comment
```

<h3>Variables</h3>
<p>Variables can be declared using <code>➡️</code>.</p>

```
a ➡️ 10
b ➡️ 20
c ➡️ "Hello"
d ➡️ a + b
```

<h3>Conditionals</h3>
<p>EmojiScript 🔥 supports if-else ladder construct <code>🤔</code> block will execute if condition is true, otherwise <code>😌</code> will be execute.</p>

```
a ➡️ 10
🤔 a > 20 👉
    🔊"a is greater than 20"❗
👈
😌 👉
    🔊"a is less than 20"❗
👈
```

<h3>For Loop</h3>
<p>You can use <code>🌀</code> for loop, give a range in a identifier using <code>➡️</code> as <code>initializedValue, condititonalValue, updation</code>. </p>

```
🌀 i ➡️ 1, 10, 1 👉
    🔊"Hello World"❗
👈
```

<h3>While Loop</h3>
<p>Statements inside <code>🤗</code> blocks are executed as long as specified condition evaluates to true. Once the condition will become false it will break the loop.</p>

```
i ➡️ 0
🤗 i < 10 👉
    🔊"Hello World"❗
    🤔 i == 5 👉
        🚫
    👈
    i+1
👈
```

<h3>Print</h3>
<p>To print any thing in console use <code>🔊...❗</code> and <code>🔗</code> instead of <code>,</code>.</p>

```
🔊"This is a string"❗

a ➡️ "World"
🔊"Hello, " 🔗 a❗
```

<h3>Function</h3>
<p>You can also make functions in emojiscript use <code>🌏</code> before function name and pass the arguments after <code>🤌</code>.</p>

```
🌏 myFun 🤌 x, y 👉
    🙏 x + y
👈

myFun 🤌 5, 5
```

<h3>Math Functions</h3>
<p>There are some pre-defined math functions in emojiscript <code>⚡</code> returns power of a number, <code>🟥</code> returns square root of a number, <code>🪵</code> returns log value and <code>🍰/🍕</code> returns the PI value.</p>

```
⚡ 2, 3 ❗
🟥 49 ❗
🪵 2 ❗
```

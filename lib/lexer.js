const moo = require('moo');
const fs = require('mz/fs');

let lexer = moo.compile({
  WS:      /[ \t]+/,
  comment: /💬.*?$/,
  number: /[0-9]+(?:\.[0-9]+)?/,
  string:  /"(?:\\["\\]|[^\n"\\])*"/,
  lparen:  '(',
  rparen:  ')',
  operator: /(?:==)|(?:>=)|(?:<=)|(?:!=)|[\+\-\*\/\>\=\<\.\%]/,
  sp_assign: '➡️',
  comma:   ',',
  colon: ':',
  identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
  keyword: ['🔊', '🎤', '👉', '👈', '❗', '🤔', '😌', '🌀', '🤗', '💯', '😞', '🙏', '😶', '🚫', '😁', '🤌', '🍰', '🔗'],
  credits: ['👦', '👑'],
  fun_keywords: ['🌏', '🌍', '🌎'],
  math_fun: ['⚡', '🟥', '🪵', '🧮', '🍕', '🍰'],
  NL:  { match: /[\r\n]+/, lineBreaks: true },
});

module.exports = lexer;

// main().catch(err => console.log(err.stack));
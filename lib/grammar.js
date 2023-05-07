// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const myLexer = require("./lexer");
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "lines", "symbols": ["line"], "postprocess": id},
    {"name": "lines", "symbols": ["lines", (myLexer.has("NL") ? {type: "NL"} : NL), "line"], "postprocess": 
        (data) => {
            return [...data[0], ...data[2]];
        }
                },
    {"name": "line", "symbols": ["_", "statement", "_"], "postprocess": 
        (data) => {
            return [data[1]];
        }
                },
    {"name": "line", "symbols": ["_"], "postprocess": 
        () => []
                },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["print_fun"], "postprocess": id},
    {"name": "statement", "symbols": ["return_fun"], "postprocess": id},
    {"name": "statement", "symbols": ["fun_call"], "postprocess": id},
    {"name": "statement", "symbols": [(myLexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "statement", "symbols": ["if_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["for_loop"], "postprocess": id},
    {"name": "statement", "symbols": [(myLexer.has("credits") ? {type: "credits"} : credits)], "postprocess": id},
    {"name": "statement", "symbols": ["fun_def"], "postprocess": id},
    {"name": "statement", "symbols": ["break"], "postprocess": id},
    {"name": "statement", "symbols": ["while"], "postprocess": id},
    {"name": "statement", "symbols": ["continue"], "postprocess": id},
    {"name": "var_assign", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"➡️"}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[0],
                value: data[4]
            }
        }
                            },
    {"name": "var_assign", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "input_fun"], "postprocess": 
        (data) => {
            return {
                type: "input_assign",
                var_name: data[0],
                value: data[4]
            }
        }
                      },
    {"name": "return_fun", "symbols": [{"literal":"🙏"}, "__", "expr"], "postprocess": 
        (data) => {
            return {
                type: "return_fun",
                value: data[2],
            }
        }
                        },
    {"name": "input_fun", "symbols": [{"literal":"🎤"}, "_", (myLexer.has("string") ? {type: "string"} : string), "_", {"literal":"❗"}], "postprocess": 
        (data) => {
            return {
                type: "input_fun",
                value: data[2],
            }
        }
                        },
    {"name": "print_fun", "symbols": [{"literal":"🔊"}, "_", "print_val", "_", {"literal":"❗"}], "postprocess": 
        (data) => {
            return {
                type: "print_fun",
                value: data[2],
            }
        }
            },
    {"name": "print_val", "symbols": ["expr"], "postprocess": id},
    {"name": "print_val", "symbols": [], "postprocess": 
        (data) => {
            return {
                value: '"😶"',
            }
            }
        },
    {"name": "print_val", "symbols": ["print_val", "_", {"literal":"🔗"}, "_", "expr"], "postprocess": 
        (data) => {
            return [
                data[0] + data[2] + data[4]
            ]
        }
                     },
    {"name": "codeblock", "symbols": [{"literal":"👉"}, "lines", {"literal":"👈"}], "postprocess": 
        (data) => {
            return {
                type: "codeblock",
                statements: data[1]
            }
        }
                        },
    {"name": "if_statement", "symbols": [{"literal":"🤔"}, "__", "expr", "__", "codeblock"], "postprocess": 
        (data) => {
            return {
                type: "if_statement",
                cond: data[2],
                code: data[4]
            }
        }
                            },
    {"name": "if_statement", "symbols": [{"literal":"🤔"}, "__", "expr", "__", "codeblock", "__lb", {"literal":"😌"}, "__", "codeblock"], "postprocess": 
        (data) => {
            return {
                type: "if_statement",
                cond: data[2],
                code: data[4],
                alt: data[8]
            }
        }
                        },
    {"name": "if_statement", "symbols": [{"literal":"🤔"}, "__", "expr", "__", "codeblock", "__lb", {"literal":"😌"}, "__", "if_statement"], "postprocess": 
        (data) => {
            return {
                type: "if_statement",
                cond: data[2],
                code: data[4],
                alt: data[8]
            }
        }
                        },
    {"name": "arglist", "symbols": [{"literal":"🤌"}, "_"], "postprocess": () => []},
    {"name": "arglist", "symbols": [{"literal":"🤌"}, "__", "fun_param"], "postprocess": 
        (data) => data[2]
                   },
    {"name": "fun_param", "symbols": ["expr"], "postprocess": id},
    {"name": "fun_param", "symbols": ["fun_param", "_", {"literal":","}, "_", "expr"], "postprocess": 
        (data) => {
            return [
                data[0] + data[2] + data[4]
            ]
        }
                     },
    {"name": "fun_call", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "__", "arglist"], "postprocess": 
        (data) => {
            return {
                type: "fun_call",
                fun_name: data[0],
                arguments: data[2]
            }
        }
                    },
    {"name": "fun_def", "symbols": [(myLexer.has("fun_keywords") ? {type: "fun_keywords"} : fun_keywords), "__", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "__", "arglist", "__", "codeblock"], "postprocess": 
        (data) => {
            return {
                type: "fun_def",
                fun_name: data[2],
                code: data[6],
                arguments: data[4]
            }
        }
                            },
    {"name": "while", "symbols": [{"literal":"🤗"}, "__", "expr", "__", "codeblock"], "postprocess": 
        (data) => {
            return {
                type: "while",
                cond: data[2],
                code: data[4]
            }
        }
                    },
    {"name": "for_cond", "symbols": [(myLexer.has("number") ? {type: "number"} : number), "_", {"literal":","}, "_", (myLexer.has("number") ? {type: "number"} : number), "_", {"literal":","}, "_", (myLexer.has("number") ? {type: "number"} : number)], "postprocess": 
        (data) => {
            return {
                fVal: data[0],
                sVal: data[4],
                tVal: data[8],
                value: data[0] + data[2] + data[4] + data[6] + data[8]
            }
        }
                    },
    {"name": "for_loop", "symbols": [{"literal":"🌀"}, "__", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"➡️"}, "_", "for_cond", "__", "codeblock"], "postprocess": 
        (data) => {
            return {
                type: "for_loop",
                loop_var: data[2],
                iterable: data[6],
                code: data[8]
            }
        }
                    },
    {"name": "power_fun", "symbols": [{"literal":"⚡"}, "_", (myLexer.has("number") ? {type: "number"} : number), "_", {"literal":","}, "_", (myLexer.has("number") ? {type: "number"} : number), "_", {"literal":"❗"}], "postprocess": 
        (data) => {
            return {
                type: "power_fun",
                value: data[2] + data[4] + data[6]
            }
        }
                            },
    {"name": "sqrt", "symbols": [{"literal":"🟥"}, "_", (myLexer.has("number") ? {type: "number"} : number), "_", {"literal":"❗"}], "postprocess": 
        (data) => {
            return {
                type: "sqrt",
                value: data[2],
            }
        }
                            },
    {"name": "log_fun", "symbols": [{"literal":"🪵"}, "_", (myLexer.has("number") ? {type: "number"} : number), "_", {"literal":"❗"}], "postprocess": 
        (data) => {
            return {
                type: "log_fun",
                value: data[2],
            }
        }
                            },
    {"name": "math_fun", "symbols": ["power_fun"], "postprocess": id},
    {"name": "math_fun", "symbols": ["sqrt"], "postprocess": id},
    {"name": "math_fun", "symbols": ["log_fun"], "postprocess": id},
    {"name": "expr", "symbols": ["bin_expr"], "postprocess": id},
    {"name": "expr", "symbols": ["math_fun"], "postprocess": id},
    {"name": "expr", "symbols": ["pi"], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("number") ? {type: "number"} : number), "_", {"literal":","}, "_", (myLexer.has("number") ? {type: "number"} : number)], "postprocess": 
        (data) => {
            return {
                fVal: data[0],
                sVal: data[4],
                value: data[0] + data[2] + data[4]
            }
        }
                },
    {"name": "operator", "symbols": [(myLexer.has("operator") ? {type: "operator"} : operator)], "postprocess": id},
    {"name": "unary_expr", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "unary_expr", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "unary_expr", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "unary_expr", "symbols": ["fun_call"], "postprocess": id},
    {"name": "unary_expr", "symbols": ["boolean"], "postprocess": id},
    {"name": "unary_expr", "symbols": [{"literal":"("}, "expr", {"literal":")"}], "postprocess": data => data[1]},
    {"name": "bin_expr", "symbols": ["unary_expr"], "postprocess": id},
    {"name": "bin_expr", "symbols": ["bin_expr", "_", "operator", "_", "unary_expr"], "postprocess": 
        (data) => {
            return {
                type: "bin_expr",
                left: data[0],
                right: data[4],
                value: data[0] + data[2] + data[4]
            }
        }
                    },
    {"name": "break", "symbols": [{"literal":"🚫"}], "postprocess": 
        (data) => {
            return {
                type: "break"
            }
        }
                },
    {"name": "boolean", "symbols": [{"literal":"💯"}], "postprocess": 
        (data) => {
            return {
                type: "boolean",
                value: true
            }
        }
                    },
    {"name": "boolean", "symbols": [{"literal":"😞"}], "postprocess": 
        (data) => {
            return {
                type: "boolean",
                value: false
            }
        }
                    },
    {"name": "continue", "symbols": [{"literal":"😁"}], "postprocess": 
        (data) => {
            return {
                type: "continue"
            }
        }
                    },
    {"name": "pi", "symbols": [{"literal":"🍕"}], "postprocess": 
        (data) => {
            return {
                type: "PI"
            }
        }
                },
    {"name": "pi", "symbols": [{"literal":"🍰"}], "postprocess": 
        (data) => {
            return {
                type: "PI"
            }
        }
                },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "_m$ebnf$1", "symbols": []},
    {"name": "_m$ebnf$1$subexpression$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "_m$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "_m$ebnf$1", "symbols": ["_m$ebnf$1", "_m$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_m", "symbols": ["_m$ebnf$1"]},
    {"name": "__m$ebnf$1$subexpression$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__m$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__m$ebnf$1", "symbols": ["__m$ebnf$1$subexpression$1"]},
    {"name": "__m$ebnf$1$subexpression$2", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__m$ebnf$1$subexpression$2", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__m$ebnf$1", "symbols": ["__m$ebnf$1", "__m$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__m", "symbols": ["__m$ebnf$1"]},
    {"name": "__lb_$ebnf$1$subexpression$1", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1$subexpression$1"]},
    {"name": "__lb_$ebnf$1$subexpression$2", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1", "__lb_$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb_", "symbols": ["__lb_$ebnf$1", "__"]},
    {"name": "__lb$ebnf$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb$ebnf$1", "symbols": ["__lb$ebnf$1", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb", "symbols": ["__lb$ebnf$1"]}
]
  , ParserStart: "lines"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

@{%
const myLexer = require("./lexer");
%}

@lexer myLexer

# statements -> statement {%
#                 (data) => {
#                     return [data[0]];
#                 }
#              %} |
#              statements %NL statement {%
#                 (data) => {
#                     return [...data[0], data[2]];
#                 }
#              %}

lines
    -> line   {% id %}
    |  lines %NL line
        {%
            (data) => {
                return [...data[0], ...data[2]];
            }
        %}

line
    -> _ statement _
        {%
            (data) => {
                return [data[1]];
            }
        %} |
        _
        {%
            () => []
        %}

statement -> var_assign {% id %} |
             print_fun {% id %} |
             return_fun {% id %} |
             fun_call {% id %} |
             %comment {% id %} |
             if_statement {% id %} |
             for_loop {% id %} |
             %credits {% id %} |
             fun_def {% id %} |
             break {% id %} |
             while {% id %} |
             continue {% id %}

var_assign -> %identifier _ "➡️" _ expr
                    {%
                        (data) => {
                            return {
                                type: "var_assign",
                                var_name: data[0],
                                value: data[4]
                            }
                        }
                    %} |
              %identifier _ "=" _ input_fun {%
                    (data) => {
                        return {
                            type: "input_assign",
                            var_name: data[0],
                            value: data[4]
                        }
                    }
              %}

return_fun -> "🙏" __ expr {%
                        (data) => {
                            return {
                                type: "return_fun",
                                value: data[2],
                            }
                        }
                %}

input_fun -> "🎤" _ %string _ "❗" {%
                    (data) => {
                        return {
                            type: "input_fun",
                            value: data[2],
                        }
                    }
                %}

print_fun -> "🔊" _ print_val _ "❗"
    {%
        (data) => {
            return {
                type: "print_fun",
                value: data[2],
            }
        }
    %}

print_val -> expr {% id %} |
             null {%
                (data) => {
                    return {
                        value: '"😶"',
                    }
                    }
                %} |
             print_val _ "🔗" _ expr {%
                (data) => {
                    return [
                        data[0] + data[2] + data[4]
                    ]
                }
             %}

codeblock -> "👉" lines "👈" {%
                    (data) => {
                        return {
                            type: "codeblock",
                            statements: data[1]
                        }
                    }
                %}

if_statement -> "🤔" __ expr __ codeblock
                    {%
                        (data) => {
                            return {
                                type: "if_statement",
                                cond: data[2],
                                code: data[4]
                            }
                        }
                    %} |
                "🤔" __ expr __ codeblock __lb
                "😌" __ codeblock {%
                    (data) => {
                        return {
                            type: "if_statement",
                            cond: data[2],
                            code: data[4],
                            alt: data[8]
                        }
                    }
                %} |
                "🤔" __ expr __ codeblock __lb
                "😌" __ if_statement {%
                    (data) => {
                        return {
                            type: "if_statement",
                            cond: data[2],
                            code: data[4],
                            alt: data[8]
                        }
                    }
                %}

# arglist -> "(" _ ")" {% () => [] %} |
#            "(" fun_param ")" {%
#                 (data) => data[1]
#            %}

arglist -> "🤌" _ {% () => [] %} |
           "🤌" __ fun_param {%
                (data) => data[2]
           %}

fun_param -> expr {% id %} |
             fun_param _ "," _ expr {%
                (data) => {
                    return [
                        data[0] + data[2] + data[4]
                    ]
                }
             %}

fun_call -> %identifier __ arglist {%
                (data) => {
                    return {
                        type: "fun_call",
                        fun_name: data[0],
                        arguments: data[2]
                    }
                }
            %}

fun_def -> %fun_keywords __ %identifier __ arglist __ codeblock {%
                        (data) => {
                            return {
                                type: "fun_def",
                                fun_name: data[2],
                                code: data[6],
                                arguments: data[4]
                            }
                        }
                    %}

while -> "🤗" __ expr __ codeblock {%
                (data) => {
                    return {
                        type: "while",
                        cond: data[2],
                        code: data[4]
                    }
                }
            %}

for_cond -> %number _ "," _ %number _ "," _ %number {%
                (data) => {
                    return {
                        fVal: data[0],
                        sVal: data[4],
                        tVal: data[8],
                        value: data[0] + data[2] + data[4] + data[6] + data[8]
                    }
                }
            %}

for_loop -> "🌀" __ %identifier _ "➡️" _ for_cond __ codeblock {%
                (data) => {
                    return {
                        type: "for_loop",
                        loop_var: data[2],
                        iterable: data[6],
                        code: data[8]
                    }
                }
            %}

power_fun -> "⚡" _ %number _ "," _ %number _ "❗" {%
                        (data) => {
                            return {
                                type: "power_fun",
                                value: data[2] + data[4] + data[6]
                            }
                        }
                    %}

sqrt -> "🟥" _ %number _ "❗" {%
                        (data) => {
                            return {
                                type: "sqrt",
                                value: data[2],
                            }
                        }
                    %}

log_fun -> "🪵" _ %number _ "❗" {%
                        (data) => {
                            return {
                                type: "log_fun",
                                value: data[2],
                            }
                        }
                    %}

math_fun -> power_fun {% id %} |
            sqrt {% id %} |
            log_fun {% id %}

expr -> bin_expr {% id %} |
        math_fun {% id %} |
        pi {% id %} |
        %number _ "," _ %number {%
            (data) => {
                return {
                    fVal: data[0],
                    sVal: data[4],
                    value: data[0] + data[2] + data[4]
                }
            }
        %}

operator -> %operator {% id %}

unary_expr -> %string {% id %} |
              %number {% id %} |
              %identifier {% id %} |
              fun_call {% id %} |
              boolean {% id %} |
              "(" expr ")" {% data => data[1] %}

bin_expr -> unary_expr {% id %} |
            bin_expr _ operator _ unary_expr {%
                (data) => {
                    return {
                        type: "bin_expr",
                        left: data[0],
                        right: data[4],
                        value: data[0] + data[2] + data[4]
                    }
                }
            %}

break -> "🚫" {%
                (data) => {
                    return {
                        type: "break"
                    }
                }
        %}

boolean -> "💯" {%
                (data) => {
                    return {
                        type: "boolean",
                        value: true
                    }
                }
            %} |
            "😞" {%
                (data) => {
                    return {
                        type: "boolean",
                        value: false
                    }
                }
            %}

continue -> "😁" {%
                (data) => {
                    return {
                        type: "continue"
                    }
                }
            %} 

pi -> "🍕" {%
            (data) => {
                return {
                    type: "PI"
                }
            }
        %} |
      "🍰" {%
            (data) => {
                return {
                    type: "PI"
                }
            }
        %}

# Optional whitespace
_ -> %WS:*

# Mandatory whitespace
__ -> %WS:+

# Optional multi-line whitespace
_m -> (%WS | %NL):*

# Mandatory multi-line whitespace
__m -> (%WS | %NL):+

# Linebreak with single space
__lb_ -> (_ %NL):+ __

# Mandatory line break
__lb -> %NL:+
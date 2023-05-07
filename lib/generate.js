const fs = require("mz/fs");
const colors = require("colors/safe");
const indent = require("./indent");

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'brightRed',
    credits: ['green', 'underline']
});

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a .ast file.");
        return;
    }
    
    const astJson = (await fs.readFile(filename)).toString();
    const statements = JSON.parse(astJson);
    const jsCode = generateJsForStatements(statements);
    const outputFilename = filename.replace(".ast", ".js");
    await fs.writeFile(outputFilename, jsCode);

}

const funTable = new Set();
const varTable = new Set();

function generateJsForStatements(statements) {
    const lines = [];
    for (let statement of statements) {
        const line = generateJs(statement);
        lines.push(line);
    }
    return lines.join("\n");
}

function generateJs(node) {
    if (node.type === "var_assign") {
        return genVarAssign(node);
    } else if (node.type === "fun_call") {
        return genFunCall(node);
    } else if (node.type === "fun_def") {
        return genFunction(node);
    } else if (node.type === "print_fun") {
        return genPrint(node);
    } else if (node.type === "return_fun") {
        return genReturn(node);
    } else if (node.type === "input_assign") {
        return genInputFun(node);
    } else if (node.type === "power_fun") {
        return genPower(node);
    } else if (node.type === "sqrt") {
        return genSqrt(node);
    } else if (node.type === "log_fun") {
        return genLog(node);
    } else if (node.type === "codeblock") {
        return genCodeBlock(node);
    } else if (node.type === "if_statement") {
        return genIfStatement(node);
    } else if (node.type === "for_loop") {
        return genForLoop(node);
    } else if (node.type === "while") {
        return genWhile(node);
    } else if (node.type === "PI") {
        return `Math.PI`;
    } else if (node.type === "credits") {
        try {
            console.log(colors.green("Created by"), colors.credits("Harsh Baranwal"));
        } catch (error) {}
    } else if (node.type === "comment") {
        return [];
    } else if (node.type === "string") {
        return node.value;
    } else if (node.type === "bin_expr") {
        return node.value;
    } else if (node.type === "number") {
        return node.value;
    } else if (node.type === "identifier") {
        return node.value;
    } else if (node.type === "break") {
        return "break";
    } else if (node.type === "comma") {
        return ",";
    } else if (node.type === "continue") {
        return "continue";
    } else {
        throw new Error(colors.error(`Unhandled AST node type: ${node.type}`));
    }
}

let keywords = {
    if: "_if",
    else: "_else",
    while: "_while",
    var: "_var",
    for: "_for",
    return: "_return",
    function: "_function",
    const: "_const",
    let: "_let",
    exports: "_exports",
    break: "_break",
    continue: "_continue",
    switch: "_switch",
}

let rkeywords = {
    _if: "if",
    _else: "else",
    _while: "while",
    _var: "var",
    _for: "for",
    _return: "return",
    _function: "function",
    _const: "const",
    _let: "let",
    _exports: "exports",
    _break: "break",
    _continue: "continue",
    _switch: "switch"
}

function genPrint(node) {
    var context = node.value.value;
    if (context == undefined) {
        context = node.value;
        context = context.toString();
    }
    context = context.replace(/if|else|while|var|for|return|function|const|let|exports|break|continue|switch/gi, function(match) {
        return keywords[match];
    })
    const index = [];

    if (context.indexOf('"') > -1 && context.lastIndexOf('"') > -1) {
        for (let i = 0; i < context.length; i++) {
            if (context[i] === '"') {
                index.push(i);
            }
        }
        var cReplace = "";
        for (let i = 0; i < index.length; i=i+2) {
            cReplace = context.substring(index[i],index[i+1]+1);
            cnew = cReplace.replace(/_if|_else|_while|_var|_for|_return|_function|_const|_let|_exports|_break|_continue|_switch/gi, function(match) {
                return rkeywords[match];
            })
            context = context.replace(cReplace, cnew);
        }
    }
    else if (context.indexOf("'") > -1 && context.lastIndexOf("'") > -1) {
        for (let i = 0; i < context.length; i++) {
            if (context[i] === "'") {
                index.push(i);
            }
        }
        var cReplace = "";
        for (let i = 0; i < index.length; i=i+2) {
            cReplace = context.substring(index[i],index[i+1]+1);
            cnew = cReplace.replace(/_if|_else|_while|_var|_for|_return|_function|_const|_let|_exports|_break|_continue|_switch/gi, function(match) {
                return rkeywords[match];
            })
            context = context.replace(cReplace, cnew);
        }
    }
    var varArray = context.split("🔗");
    for (let i in varArray) {
        var str = varArray[i].trim();
        for (let j in str) {
            if (str[j] == "'") {
                indexVal = varArray.indexOf(varArray[i]);
                varArray.splice(indexVal, 1);
                break;
            }
            else if (str[j] == '"') {
                indexVal = varArray.indexOf(varArray[i]);
                varArray.splice(indexVal, 1);
                break;
            }
        }
    }
    for (let k in varArray) {
        var oneVar = varArray[k].trim();
        if (!varTable.has(oneVar)) {
            throw new Error(colors.error(`"${oneVar}" variable is not defined.`));
        }
    }
    context = context.replace(/🔗/gi, "+");
    return `console.log(${context});`;
}

function genVarAssign(node) {
    var main = node.var_name.value;
    const context = generateJs(node.value);
    main = main.replace(/if|else|while|var|for|return|function|const|let|exports|break|continue|switch/gi, function(match) {
        return keywords[match];
    })
    varTable.add(main);
    if (main == "hb" || main == "HB" || main == "hB" || main == "Hb") {
        throw new Error(colors.error(`You cannot declare "${main}" variable in Emojiscript.`));
    }
    else {
        return `var ${main} = ${context};`;
    }
}

function genFunCall(node) {
    const main = node.fun_name.value;
    const argument = node.arguments.value;
    if (!funTable.has(main)) {
        throw new Error(colors.error(`Trying to call "${main}" function which is not defined.`));
    }
    else {
        return `${main}(${argument})`;
    }
}

function genReturn(node) {
    const context = node.value.value;
    return `return ${context};`;
}

function genPower(node) {
    const context = node.value;
    return `Math.pow(${context})`;
}

function genSqrt(node) {
    const context = node.value.value;
    return `Math.sqrt(${context})`;
}

function genLog(node) {
    const context = node.value.value;
    return `Math.log(${context})`;
}

function genFunction(node) {
    const funName = node.fun_name.value;
    var argList = node.arguments.value;
    funTable.add(funName);
    if (argList == undefined) {
        argList = node.arguments;
    }
    return [
        `function ${funName}(${argList}) {`,
        indent(node.code.statements.map(node => {
            return generateJs(node);
        }).join("\n")),
        "}"
    ].join("\n");
}

function genIfStatement(node) {
    const condition = node.cond.value;
    const alternate = node.alt ?
        genIfAlternate(node.alt) : "";
    var dataType = undefined;
    if (condition.indexOf("==") > -1 || condition.indexOf(">=") > -1 || condition.indexOf("<=") > -1 || condition.indexOf("!=") > -1 || condition.indexOf(">") > -1 || condition.indexOf("<") > -1) {
        dataType = "boolean"
    }
    if (dataType != "boolean") {
        throw new Error(colors.error(`Expecting condition ${condition} should be a boolean value.`));
    }
    return [
        `if (${condition}) {`,
        indent(node.code.statements.map(node => {
            return generateJs(node);
        }).join("\n")),
        "}",
        alternate
    ].join("\n");
}

function genIfAlternate(node) {
    return "else {\n" + 
        indent(generateJs(node))
        + "\n}";
}

function genForLoop(node) {
    const varName = node.loop_var.value;
    const fVal = node.iterable.fVal.value;
    const sVal = node.iterable.sVal.value;
    const tVal = node.iterable.tVal.value;
        return [
            `for (let ${varName} = ${fVal}; ${varName} < ${sVal}; ${varName}+=${tVal}) {`,
            indent(node.code.statements.map(node => {
                return generateJs(node);
            }).join("\n")),
            "}",
        ].join("\n");
    // }
}

function genWhile(node) {
    const condition = node.cond.value;
    return [
        `while (${condition}) {`,
        indent(node.code.statements.map(node => {
            return generateJs(node);
        }).join("\n")),
        "}",
    ].join("\n");
}

function genCodeBlock(codeBlock) {
    return codeBlock.statements.map(
        node => generateJs(node))
    .join("\n");
}

main().catch(err => console.log(err.stack));
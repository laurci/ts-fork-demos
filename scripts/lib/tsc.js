const {$, Path} = require("./utils");

const tsLibPath = Path.join(__dirname, "../../../TypeScript/built/local");
const tscPath = Path.join(tsLibPath, "tsc.js");

function runTsc(args) {
    const debug = process.argv.includes("--debug");

    console.log("running tsc");
    $.exec(`node ${debug ? "--inspect-brk=2000" : ""} ${tscPath}` + (args ? ` ${args}` : ""), {fatal: true, silent: false});
}

module.exports = {
    runTsc,
};

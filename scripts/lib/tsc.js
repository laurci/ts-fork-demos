const {$, Path} = require("./utils");

const tsLibPath = Path.join(__dirname, "../../../TypeScript/built/local");
const tscPath = Path.join(tsLibPath, "tsc.js");

function runTsc(args) {
    console.log("running tsc");
    $.exec(`node ${tscPath}` + (args ? ` ${args}` : ""), {fatal: true, silent: false});
}

module.exports = {
    runTsc,
};

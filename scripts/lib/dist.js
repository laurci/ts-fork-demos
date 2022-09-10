const {$} = require("./utils");

function cleanDist() {
    console.log("cleaning dist folder");
    $.rm("-rf", "./dist");
}

function runDist() {
    console.log("running dist");
    $.exec("node .", {fatal: true, silent: false});
}

module.exports = {
    cleanDist,
    runDist,
};

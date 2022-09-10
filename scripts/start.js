const bootstrap = require("./lib/bootstrap");
const {loadSample} = require("./lib/samples");
const {runTsc} = require("./lib/tsc");
const {cleanDist, runDist} = require("./lib/dist");

const {sampleName, options} = bootstrap("start", ["--no-rebuild", "--no-clean"]);

const noRebuild = options["--no-rebuild"];
const noClean = options["--no-clean"];

loadSample(sampleName);
if(!noRebuild) {
    if(!noClean) {
        cleanDist();
    }

    runTsc();
}
runDist();

const bootstrap = require("./lib/bootstrap");
const {loadSample} = require("./lib/samples");
const {runTsc} = require("./lib/tsc");
const {cleanDist} = require("./lib/dist");

const {sampleName} = bootstrap("build");

loadSample(sampleName);
cleanDist();
runTsc();

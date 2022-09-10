const bootstrap = require("./lib/bootstrap");
const {loadSample} = require("./lib/samples");
const {runTsc} = require("./lib/tsc");

const {sampleName} = bootstrap("compile");

loadSample(sampleName);
runTsc();

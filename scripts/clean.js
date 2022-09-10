const bootstrap = require("./lib/bootstrap");
const {loadSample} = require("./lib/samples");
const {cleanDist} = require("./lib/dist");

const {sampleName} = bootstrap("clean");

loadSample(sampleName);
cleanDist();

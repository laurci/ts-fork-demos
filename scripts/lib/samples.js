const {Path, Fs, $} = require("./utils");

const packageJson = JSON.parse(Fs.readFileSync(Path.join(__dirname, "../../package.json"), "utf8"));
const samples = packageJson.workspaces.map((x) => x.replace("./", ""));

function getSampleRootPath(sample) {
    return Path.join(__dirname, `../../${sample}`);
}

function validateSampleName(sample) {
    if (!samples.includes(sample)) {
        throw new Error(`Invalid sample name: ${sample}. Valid sample names are: ${samples.join(", ")}`);
    }
}

function loadSample(sampleName) {
    const samplePath = getSampleRootPath(sampleName);
    $.cd(samplePath);
}

module.exports = {
    samples,
    getSampleRootPath,
    validateSampleName,
    loadSample,
};

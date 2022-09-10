const {validateSampleName, getSampleRootPath, samples} = require("./samples");

module.exports = function bootstrap(scriptName, options) {
    if (process.argv.length < 3) {
        console.log(`Usage: yarn ${scriptName} <sample>` + (options ? ` [${options.join(" ")}]` : ""));
        console.log(`Existing samples: ${samples.join(", ")}`);
        process.exit(1);
    }

    const sampleName = process.argv[2];

    try {
        validateSampleName(sampleName);
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }

    const samplePath = getSampleRootPath(sampleName);

    let optionsResult = {};
    if(options) {
        for(let option of options) {
            if(process.argv.includes(option)) {
                optionsResult[option] = true;
            }
        }
    }

    console.log(`Running [${scriptName}] for sample ${sampleName}`);

    return {
        sampleName,
        samplePath,
        options: optionsResult
    };
};

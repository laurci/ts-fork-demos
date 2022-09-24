import {readCsv} from "./csv";

async function main() {
    console.log("test.csv entries", await readCsv("test.csv"));
    console.log("test2.csv entries", await readCsv("test2.csv"));
}

main();

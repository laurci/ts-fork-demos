export type FileStream = { close(): Promise<void>; read(): Promise<string>};

let openFileCount = 0;

function checkOpenFiles() {
    if(openFileCount > 0) {
        console.log(`FAILED! ${openFileCount} files are still opened!`);
    }
}

process.on("beforeExit", () => {
    checkOpenFiles();
});

const text = `
Romania,18000000
Austria,9000000
Spain,48000000
`.trim();

export function openFile(fileName: string): FileStream {
    console.log(`open file ${fileName}`);
    openFileCount++;

    return {
        async close() { console.log(`closed ${fileName}`); openFileCount--; },
        async read() {
            return text;
        },
    };
}
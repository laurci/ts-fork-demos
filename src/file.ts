export type FileStream = { close(): void; read(): string};
export type AsyncFileStream = {
    [key in keyof FileStream]: (...args: Parameters<FileStream[key]>) => Promise<ReturnType<FileStream[key]>>;
}

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
Romania,19000000
Austria, 9000000
Spain,  48000000
`.trim();

export function openFileSync(fileName: string): FileStream {
    console.log(`open file ${fileName}`);
    openFileCount++;

    return {
        close() { console.log(`closed ${fileName}`); openFileCount--; },
        read() {
            return text;
        },
    };
}

export async function openFile(fileName: string): Promise<AsyncFileStream> {
    const file = openFileSync(fileName);

    return {
        async close() {
            return file.close();
        },
        async read() {
            return file.read();
        }
    }
}
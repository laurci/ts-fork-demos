import {openFile} from "./file";

export interface Entry {
    country: string;
    population: number;
}

export async function readCsv(p: string): Promise<Entry[]> {
    let data: Entry[] = [];
    defer console.log("processed", data.length, "entries");

    const file = openFile(p);
    defer await file.close();

    const content = await file.read();
    const lines = content.split("\n");

    for(let line of lines) {
        const [country, populationString] = line.split(",");
        const population = parseInt(populationString);
        
        const item = {
            country,
            population
        };

        if(item.population < 10_000_000) {
            return data;
        }
        
        data.push(item);
    }

    return data;
}

import {openFileSync} from "./file";

export interface Entry {
    country: string;
    population: number;
}

function process(entries: Entry[]): Entry[] {
    return entries.filter(x => x.population > 10_000_000);
}

/**
 * Input data format: /[A-Z][a-z]( )*+,( )*[0-9]+/
 * Romania ,  19000000
 */
export function readCsv(p: string): Entry[] {
    let data: Entry[] = [];
    defer data = process(data);

    const file = openFileSync(p);
    defer file.close();

    const content = file.read();
    const lines = content.split("\n");

    for(let line of lines) {
        const [country, populationStr] = line.split(",").map(x => x.trim());
        const population = parseInt(populationStr);

        const item = {
            country,
            population
        };

        if(Math.random() > 0.5) {
            return data;
        }

        data.push(item);
    }

    return data;
}

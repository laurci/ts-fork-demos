import {openFileSync} from "./file";

export interface Entry {
    country: string;
    population: number;
}

/**
 * Input data format: /[A-Z][a-z]( )*+,( )*[0-9]+/
 * Romania ,  19000000
 */
export function readCsv(p: string): Entry[] {
    let data: Entry[] = [];

    // TODO: Write csv parser here

    return data;
}

import "./globals";

import { debug } from "./debug";
import { csv } from "./csv";

import { bla } from "@test/bla";

function main() {
    const a = 5, b = 17;

    debug!(a, b, a + b);

    bla!();

    const x = csv!`
Country, Population, Surface
Romania, 100, 99
`;

    debug!(x);    
}

main();
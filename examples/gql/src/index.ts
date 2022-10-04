import "./globals";

import client from "./client";
import {gql} from "./gql";

async function main() {
    const {data} = await client.fetch(gql!`    
        query {
            capsules {
                id,
                landings
            }
        }
    `);

}

main();

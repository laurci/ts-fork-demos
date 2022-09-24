import { debug } from "./debug";

function main() {
    const a = 5, b = 17;

    debug!("main", a, b, a + b);
}

main();

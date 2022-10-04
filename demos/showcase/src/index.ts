import { typename } from "./typename";

interface User {
    
}

function main() {
    console.log(typename!<User>());
}

main();

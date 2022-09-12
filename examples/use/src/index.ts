declare function hello(): void;

async function main() {
    use [hello()] {
    }
}

main();
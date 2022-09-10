# examples/defer

### This example showcases the usage of the `defer` keyword.

## Running the example
To run the example check the instructions in the root of this repository.

## Description

Inspired by Go's [implementation](https://gobyexample.com/defer).

The `defer` keywords signals the compiler that the following statement whould be treated as a `deffered statement`. Deferred statements can only be specified at the scope of a function body. Before the function scope's exits (ex: by returning), all the deffered statements will run. 

## Example snippet:
```ts
function test() {
    let res = num + 1;
    defer console.log(`test input=${num} output=${res}`);

    if(num % 2 == 0) {
        return num;
    }

    return res;
}
```

In this snippet the `console.log` will run before the return statement (either at the end of the body or in the `if` statement). For a better usecase check `src/csv.ts`.


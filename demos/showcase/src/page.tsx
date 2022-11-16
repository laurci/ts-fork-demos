import {contextualReturn} from "./contextual-return";


function cfg(str: string) {

}

function onMount() {

}

function onUnmount() {

}

function onChange() {

}

function timer(name: string) {

}

export async function data() {
    using onMount(): {
    
    
    }

    using onChange(): {

    }

    using onUnmount(): {

    }


    return {
        a: "abcd",
        c: "adsada",
        e: 123
    };
}


export default function Page() {
    const pageData = contextualReturn!();

}
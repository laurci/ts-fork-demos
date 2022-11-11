import {contextualReturn} from "./contextual-return";


export function data() {
    return {
        a: "abcd",
        c: "adsada",
        e: 123
    };
}


export default function Page() {
    const pageData = contextualReturn!();

}
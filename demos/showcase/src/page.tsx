import {contextualReturn} from "./contextual-return";
import {cfg, timer} from "./cfg";

export async function data() {
    using [cfg!("something"), timer!("something stuff")]: {
        console.log("this is emitted only if 'something' cfg is set");
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
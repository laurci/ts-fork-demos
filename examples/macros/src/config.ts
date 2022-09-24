import merge from "ts-deepmerge";
import type {PartialDeep} from "type-fest";
import { Config } from "./tyeps";

const devConfig: Config = {
    macros: {
        debug: {
            separator: "|"
        }
    }
};

const prodOverlay: PartialDeep<Config> = {
    macros: {
        debug: {
            disable: true
        }
    }
}

export default process.env.TARGET_ENV == "production" ? merge(devConfig, prodOverlay) : devConfig;
export interface DebugMacroConfig {
    disable?: boolean;
    separator?: string;
};

export interface MacrosConfig {
    debug?: DebugMacroConfig;
};

export interface Config {
    macros?: MacrosConfig;
};

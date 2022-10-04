function installGlobal(name: string, val: any) {
    (globalThis as any)[name] = val;
}

installGlobal("__csv_create", (data: any[]) => {
    return {
        rows: data
    };
});
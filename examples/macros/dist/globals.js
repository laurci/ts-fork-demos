"use strict";
function installGlobal(name, val) {
    globalThis[name] = val;
}
installGlobal("__csv_create", (data) => {
    return {
        rows: data
    };
});

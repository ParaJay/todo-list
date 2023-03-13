export const themes = {};
export const stylesheets = {};
export var theme;
var done, expected;
var called;

export const loadThemes = (themes, callback) => {
    done = 0;
    expected = themes.length;

    for(let i = 0; i < themes.length; i++) {
        let theme = themes[i];

        if(themes[theme]) {
            expected--;
            continue;
        }

        loadTheme(theme, callback);
    }
}

export const loadTheme = (theme, callback) => {
    if(themes[theme]) return;

    new Promise((resolve) => fetch((require("./themes/" + theme + ".txt"))).then(r => r.text()).then(text => {
            resolve(text);
        })).then((text) => {
            let split = text.split("}");
            let fval = {};

            for(let i = 0; i < split.length; i++) {
                let block = split[i];

                let vars = block.split("{");
                let key = vars[0].trim();

                if(!key) { done++; continue; }

                if(!key.charAt(0).match("a-zA-Z")) key = key.slice(1);

                let values = vars[1];

                if(!values) { done++; continue; }
                
                let valsplit = values.split(";");
                let vals = {};

                for(let j = 0; j < valsplit.length; j++) {
                    let val = valsplit[j];

                    if(!val.trim()) { done++; continue; }

                    let kv = val.split(":");
                    let ky = kv[0].trim();
                    let v = kv[1].trim();

                    if(ky.includes("-")) {
                        let ksplit = ky.split("-");
                        ky = "";

                        for(let k = 0; k < ksplit.length; k++) {
                            let ksp = ksplit[k];

                            if(k !== 0) {
                                ky += (ksp.charAt(0).toUpperCase() + ksp.slice(1));
                            } else {
                                ky += ksp;
                            }
                        }
                    }

                    vals[ky] = v;
                }

                fval[key] = vals;
                

                if(themes[theme]) continue;

                stylesheets[theme] = text;

                themes[theme] = fval;
                done++;
            }

            if(done >= expected && callback && !called) {
                called = true;
                callback();
            }
        })
}

export const setTheme = (t) => {
    theme = themes[t];
}

export const get = (key) => {
    return themes[key];
}

export const getSubOrDefault = (key, objkey, subkey, def) => {
    let res = getSub(key, objkey);

    return res ? res[subkey] : def;
}

export const getSub = (key, subkey) => {
    let theme = get(key);

    return theme ? theme[subkey] : undefined;
}

export const set = (key, value) => {
    theme[key] = value;
}

export const setSub = (key, subkey, value) => {
    theme[key][subkey] = value;
}
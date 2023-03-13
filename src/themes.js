export const themes = {};
export const stylesheets = {};
export var theme;
var done, expected;
var called;
const ths = ["default", "dark"];

export const getTheme = () => {
    return theme;
}

export const getStyling = () => {
    return themes[theme];
}

export const getSelector = (key, def=undefined) => {
    let data = getStyling();

    return data ? data[key] : def;
}

export const getDec = (selector, key, def=undefined) => {
    let sel = getSelector(selector);

    return sel ? sel[key] : def;
}

export const applyTheme = (th, cb) => {
    theme = th;
    if(cb) cb(th);
}

export const toggleTheme = (cb) => {
    let index = ths.indexOf(theme) + 1;

    if(index == ths.length) index = 0;

    applyTheme(ths[index], cb);
    
}

export const injectTheme = () => {
    console.log("injecting: " + theme);
    console.log("injecting: " + stylesheets[theme]);
    var stylesheet = document.getElementById('themeStyle');
    if(stylesheet) stylesheet.parentNode.removeChild(stylesheet);

    let styleSheet = document.createElement("style");
    styleSheet.setAttribute("type", "text/css");
    styleSheet.setAttribute("id", "themeStyle");
    styleSheet.innerText = stylesheets[theme];
    document.head.appendChild(styleSheet);

    document.body.classList.add("themed");
}

export const load = (callback) => {
    done = 0;
    expected = ths.length;

    for(let i = 0; i < ths.length; i++) {
        let theme = ths[i];

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
                console.log("loaded: " + theme);
            }

            if(done >= expected && callback && !called) {
                if(!getTheme()) {
                    called = true;
                    applyTheme("dark", callback());
                }
            }
        })
}
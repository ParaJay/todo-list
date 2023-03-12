
export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function decapitalize(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 * only supports camel <=> space
 * eg 'helloWorld' <=> 'Hello World'
 * @param {String} string - the string to convert
 * @param {String} from - the case to convert from
 * @param {String} to  - the case to convert to
 */
export function convertCase(string, from, to) {
    if(from === "camel") {
        if(to === "space") {
            let chars = string.split("");
            let recon = "";

            for(let i = 0; i < chars.length; i++) {
                let char = chars[i];

                if(char.match("[A-Z]")) {
                    recon += (" " + char);
                } else {
                    recon += char;
                }
            }

            return capitalize(recon);
        }
    } else if(from === "space") {
        if(to === "camel") {
            return decapitalize(string.replaceAll(" ", ""));
        }
    }
}
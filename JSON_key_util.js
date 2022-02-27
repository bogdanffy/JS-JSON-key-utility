/**
 * Get all keys (recursively) from a complex JSON object structure.
 *
 * Example input JSON: 
 * { 
 *      "someObject": { 
 *              "keyInsideObject1": "example", 
 *              "keyInsideObject2": "example" 
 *      } 
 * }
 * 
 * Output:
 * ["someObject", "someObject.keyInsideObject1", "someObject.keyInsideObject2"]
 *
 * @access     public
 *
 * @param {Object}                  json        The JSON object that needs to be processed.
 * @param {string | undefined}      structure   This parameter should be left undefined or null since it is used for the recursiveness of the funciton.
 * @param {Array | undefined}       allKeys     This parameter should be left undefined or null since it is used for the recursiveness of the funciton.
 *
 * @return {Array} Returns an array with all the key-s found in the given JSON object.
 */
const getAllJSONKeys = (json, structure = null, allKeys = []) => {
    const keys = Object.keys(json);
    if(keys) {
        const originalStructure = structure;
        for (const key of keys) {
            structure = originalStructure;
            structure ? structure += `.${key}` : structure = key;
            allKeys.push(structure);
            
            // Check if json[key] is not null -> null is an object in JS
            if(json[key] && typeof json[key] === "object") {
                const keysOfChild = Object.keys(json[key]);
                let childPath;
                let grandChild;

                for(const innerKey of keysOfChild) {
                    childPath = `${structure}.${innerKey}`;
                    allKeys.push(childPath);

                    grandChild = json[key][innerKey];
                    if (grandChild && typeof grandChild === "object") {
                        getAllJSONKeys(grandChild, childPath, allKeys);
                    }
                };
            }
        }
        return allKeys;
    } else {
        console.warn("JSON is null OR invalid...");
        return null;
    }
}


/**
 * Returns the value by the given path from a JSON object
 *
 * Example input path: "someObject.keyInsideObject2"
 * Example input JSON: 
 * { 
 *      "someObject": { 
 *              "keyInsideObject1": "example value 1", 
 *              "keyInsideObject2": "example value 2" 
 *      } 
 * }
 * 
 * Output:
 * "example value 2"
 *
 * @access     public
 *
 * @param {string}  path        The path of the required JSON field. Format: "key.key" or "$.key.key" -> compatible with standard JSONPath
 * @param {Object}  json        The JSON object.
 *
 * @return {any} Returns the value by the given path from the given JSON object.
 */
const getJSONValue = (path, json) => {
    if(path.startsWith("$.")) path.replace("$.", "");
    const splittedPath = path.split(".");

    for(const path of splittedPath) {
        json = json[path];
    };

    return json;
}


/**
 * Gets all JSON values by a path array (getAllJSONKeys function result).
 * 
 * !!!! COMPATIBLE WITH JSON PATH ROOT SIGN AS WELL: '$.'
 * 
 * Example input pathArray value: ["sourceObject.key", "$.sourceObject.subObject.key"]
 *
 * @access     public
 *
 * @param {Array}   pathArray   getAllJSONKeys result array or similar to that.
 * @param {Object}  json        The JSON with the key-value pairs.
 *
 */
 const getAllJSONValues = (pathArray, json) => {
    let resultArr = [];
    for (const path of pathArray) {
        try {
            resultArr.push(getJSONValue(path, json));
        } catch (error) {
            console.warn(`Error getting JSON value from path: ${path}`);
        } 
    };
    return resultArr;
}


/**
 * Prints all values to the browser console by a path array (getAllJSONKeys function) for developer purposes.
 *
 * @access     public
 *
 * @param {Array}   pathArray   getAllJSONKeys result array or similar to that.
 * @param {Object}  json        The JSON object.
 *
 */
const printAllJSONValueToConsole = (pathArray, json) => {
    console.log("======================================================================");
    console.log("========= JSON VALUES BY JSON PATH ARRAY:");
    console.log("======================================================================");
    for (const path of pathArray) {
        console.log("Path: $." + path + ", Value => " + getJSONValue(path, json));
    };
    console.log("======================================================================");
    console.log("========= PRINT JSON VALUES END");
    console.log("======================================================================");
}

export { getAllJSONKeys, getJSONValue, getAllJSONValues, printAllJSONValueToConsole };
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
 * @param {boolean}                 rootNeeded  Decides that the JSON root prefix ('$.') needed or not. Turned off by default.
 * @param {string | null}           structure   This parameter should be left undefined or null since it is used for the recursiveness of the funciton.
 * @param {Array}                   allKeys     This parameter should be left undefined or null since it is used for the recursiveness of the funciton.
 *
 * @return {Array} Returns an array with all the key-s found in the given JSON object.
 */
const getAllJSONKeys = (json, rootNeeded = false, structure = null, allKeys = []) => {
    const keys = Object.keys(json);
    const prefix = rootNeeded ? "$" : "";

    if (keys) {
        const originalStructure = structure;
        for (const key of keys) {
            const keyValue = json[key];
            structure = originalStructure;
            if(Array.isArray(json)) {
                structure ? structure += `[${key}]` : structure = `${prefix}[${key}]`;
            } else {
                structure ? structure += `.${key}` : structure = `${prefix}.${key}`;
            }
            allKeys.push(structure);
            // Check if json[key] is not null and also an object -> null is an object in JS
            if (keyValue && typeof keyValue === "object") {
                const keysOfChild = Object.keys(keyValue);
                let childPath;

                for (const innerKey of keysOfChild) {
                    Array.isArray(keyValue) ? childPath = `${structure}[${innerKey}]` : childPath = `${structure}.${innerKey}`;
                    allKeys.push(childPath);
                    
                    const grandChild = keyValue[innerKey];
                    if (grandChild && typeof grandChild === "object") {
                        getAllJSONKeys(grandChild, rootNeeded, childPath, allKeys);
                    }
                }
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
 * Example input path: "$.someObject.keyInsideObject2" OR "someObject.keyInsideObject2"
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
    try {
        path = path.replace(/[$\]"'\\]/g, "").trim();
        if (path.startsWith(".")) path = path.substring(1);
        const splittedPath = path.split(/[\s.\[]+/);
        
        for (const key of splittedPath) {
            json = json[key];
        }
    } catch (err) {
        throw(`Error getting JSON value from path: ${path}. Error: ${err}`);
    }

    return json;
}


/**
 * Gets all JSON values by a path array (getAllJSONKeys function result).
 * 
 * JSON path compatible:
 * Example input pathArray value: ["sourceObject.key", "$.sourceObject.subObject.key", "$.sourceObject.subObject.key[2]",]
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
            console.warn(error);
        } 
    }
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
    }
    console.log("======================================================================");
    console.log("========= PRINT JSON VALUES END");
    console.log("======================================================================");
}

export { getAllJSONKeys, getJSONValue, getAllJSONValues, printAllJSONValueToConsole };
<h1># JS-JSON-key-utility</h1>
<p>JavaScript utility for processing complex JSON structures.</p>

<h2>Functions:</h2>

<h3>getAllJSONKeys(json):</h3>
Get all the keys (recursively) from a complex JSON object structure.
 <br>
Example input JSON: 
{ 
     "someObject": { 
             "keyInsideObject1": "example", 
             "keyInsideObject2": "example" 
     }
}
<br>
Output:
<b>["someObject", "someObject.keyInsideObject1", "someObject.keyInsideObject2"]</b>
<br>
<br>
<h3>getJSONValue(path, json):</h3>
Returns the value by the given path from a JSON object
<br>
Example input path: "someObject.keyInsideObject2"
<br>
Example input JSON: 
{ 
     "someObject": { 
             "keyInsideObject1": "example value 1", 
             "keyInsideObject2": "example value 2" 
     } 
}
<br>
<b>Output: "example value 2"</b>
<br>
<br>
<h3>getAllJSONValues(pathArray, json):</h3>
Gets all JSON values by a path array (getAllJSONKeys function result).
Compatible with JSONPath format: <b>$.json.path.key</b> or <b>json.path.key</b>
<br>
Example input pathArray value: ["sourceObject.key", "$.sourceObject.subObject.key"]
<br>
<br>
<h3>printAllJSONValue(pathArray, json):</h3>
Prints all values to the browser console by a path array (getAllJSONKeys function) for developer purposes.
<br>
Print format:
Path: $.keyName, Value => value
<br>
<br>


// JSON to JS object conversion

console.log("%c 14.2. JSON -> JS", "font-weight: bold");

const jsonStr = `{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}`;

const obj2 = JSON.parse(jsonStr);
console.log("result :", obj2);

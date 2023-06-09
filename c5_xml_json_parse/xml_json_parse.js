const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const jsonString = `
{
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
}
`;


// XML to JS object
const parserXML = new DOMParser();
const listXML = parserXML.parseFromString(xmlString, "text/xml");

const listNode = listXML.querySelector("list");
const firstStudent = listNode.querySelector("student");
const firstStudentName = firstStudent.querySelector("name");
const secondStudent = firstStudent.nextElementSibling;
const secondStudentName = secondStudent.querySelector("name");

const resultXML = {
    list: [
        {
            name: firstStudentName.querySelector("first").textContent + " " + firstStudentName.querySelector("second").textContent,
            age: firstStudent.querySelector("age").textContent,
            prof: firstStudent.querySelector("prof").textContent,
            lang: firstStudentName.getAttribute("lang")
        },
        {
            name: secondStudentName.querySelector("first").textContent + " " + secondStudentName.querySelector("second").textContent,
            age: secondStudent.querySelector("age").textContent,
            prof: secondStudent.querySelector("prof").textContent,
            lang: secondStudentName.getAttribute("lang")
        }
    ]
};

console.log("XML parse result", resultXML);


// JSON to JS object
const parserJSON = JSON.parse(jsonString);
const firstStudentJSON = parserJSON.list[0];
const secondStudentJSON = parserJSON.list[1];

const resultJSON = {
    list: [
        {
            name: firstStudentJSON.name,
            age: Number(firstStudentJSON.age),
            prof: firstStudentJSON.prof
        },
        {
            name: secondStudentJSON.name,
            age: Number(secondStudentJSON.age),
            prof: secondStudentJSON.prof
        }
    ]
}

console.log("JSON parse result", resultJSON);
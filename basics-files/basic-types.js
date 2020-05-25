"use strict";
// const person: {
//     name: string;
//     age: number;
// } = {
//     name: "Bhuwan",
//     age: 30
// }
// const person = {
//     name: "Bhuwan",
//     age: 30,
//     hobbies: ['Sports', 'Cooking'],
//     role: [2, "author"]
// }
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[],
//     role: [number, string]
// } = {
//     name: "Bhuwan",
//     age: 30,
//     hobbies: ['Sports', 'Cooking'],
//     role: [2, "author"]
// }
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
;
var person = {
    name: "Bhuwan",
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};
var favoriteActivities;
var things;
favoriteActivities = ["soccer"];
things = ["laptop", 56];
console.log(person.role);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}

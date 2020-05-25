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

enum Role { ADMIN, READ_ONLY, AUTHOR };

const person = {
    name: "Bhuwan",
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
}

let favoriteActivities: string[];
let things: (string | number)[];

favoriteActivities = ["soccer"];
things = ["laptop", 56];

console.log(person.role);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}


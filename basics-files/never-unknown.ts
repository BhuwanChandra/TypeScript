let userInput: unknown;
// let userInput: any;
let userName: string;

userInput = 5;
userInput = "Max";

// userName = userInput; // error for unknown
// userName = userInput; // no error for any

if (typeof userInput === "string") {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code }; // never returns a value
  // while(true) {} // same as never
}

generateError("An error ocurred!", 500);

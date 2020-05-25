const user = "Max";
const button = document.querySelector("button")!;

// this is a selected button from dom
if (button) {
  button.addEventListener("click", () => {
    console.log("Clicked");
  });
}

console.log(user);

document.addEventListener("DOMContentLoaded", () => {
    const myDiv = document.querySelector("#my-div");
    myDiv.style.cursor = "pointer";
    let isGreen = false;

    myDiv.addEventListener("click", () => {
      if (isGreen) {
        myDiv.style.backgroundColor = "white";
      } else {
        myDiv.style.backgroundColor = "green";
      }
      isGreen = !isGreen;
    });
});
  
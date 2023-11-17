document.addEventListener("DOMContentLoaded", () => {
    const myDiv = document.querySelector("#my-div");
    myDiv.style.cursor = "pointer";
  
    myDiv.addEventListener("click", () => {
      myDiv.style.backgroundColor = "green";

    });
  });
  
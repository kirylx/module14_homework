const numForm = document.forms["numForm"];
const alert = document.querySelector(".alert");
const imageDiv = document.querySelector("#imageDiv");

console.log(imageDiv);

const numFormHandler = (event) => {
    event.preventDefault();
    const inputValueWidth = event.target["width"].value;
    const inputValueHeight = event.target["height"].value;
    imageDiv.innerHTML = "";
    alert.classList.add("isHidden");

    if (
        inputValueWidth >= 100 &&
        inputValueWidth <= 300 &&
        inputValueHeight >= 100 &&
        inputValueHeight <= 300
    ) {
        fetch(`https://picsum.photos/${inputValueWidth}/${inputValueHeight}`)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    imageDiv.innerHTML = `<img src="${response.url}" alt="server error" class="img-fluid mt-2 rounded-circle"></img>`;
                    console.log(imageDiv);
                    imageDiv.classList.remove("isHidden");
                }
            })
            .catch((error) => console.log("error: ", error));
    } else {
        alert.classList.remove("isHidden");
    }
};

numForm.addEventListener("submit", numFormHandler);

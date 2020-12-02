const numForm = document.forms["numForm"];
const alert = document.querySelector(".alert");
const imageDiv = document.querySelector("#imageDiv");
const spinner = document.querySelector(".spinner-border");
console.log(imageDiv);

const numFormHandler = (event) => {
    event.preventDefault();
    const inputValue = event.target["inputNum"].value;
    alert.classList.add("isHidden");
    imageDiv.innerHTML = "";
    if (inputValue > 0 && inputValue <= 10) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            imageDiv.classList.remove("isHidden");
            if (xhr.status == 200 && xhr.readyState == 4) {
                const result = JSON.parse(xhr.response);
                imageDiv.innerHTML = "";
                result.map((entry) => {
                    imageDiv.innerHTML += `<img src="${entry.download_url}" alt="server error" class="img-fluid mt-2 rounded"></img>`;
                    imageDiv.innerHTML += `<h4 class="text-center">${entry.author} </h4>`;
                });
                spinner.classList.add("isHidden");
            } else {
                spinner.classList.remove("isHidden");
            }
        };
        xhr.onerror = () => {
            console.log("Request error: ", xhr.status);
        };
        xhr.open(
            "GET",
            `https://picsum.photos/v2/list?limit=${inputValue}`,
            true
        );
        xhr.send();
    } else {
        alert.classList.remove("isHidden");
    }
};

numForm.addEventListener("submit", numFormHandler);

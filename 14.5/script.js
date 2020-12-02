const numForm = document.forms["numForm"];
const alert = document.querySelector(".card-panel");
const imageWrapper = document.querySelector("#imageWrapper");

const rangeChecker = (numLow, numHigh, num) => {
    if (num.isNan) {
        return false;
    } else if (num <= numHigh && num >= numLow) {
        return true;
    } else {
        return false;
    }
};

const submitNumForm = (event) => {
    event.preventDefault();

    const pageNumber = event.target["page_number"];
    const limit = event.target["limit"];

    imageWrapper.innerHTML = "";
    alert.classList.add("hide");

    pageNumber.classList = "";
    limit.classList = "";

    if (
        !rangeChecker(1, 10, pageNumber.value) &&
        !rangeChecker(1, 10, limit.value)
    ) {
        alert.innerHTML =
            "🙉 Page number and limit are out of range (1-10) or not a number";
        alert.classList.remove("hide");
        pageNumber.classList = "invalid";
        limit.classList = "invalid";
    } else if (!rangeChecker(1, 10, pageNumber.value)) {
        alert.innerHTML =
            "🙉 Page number is out of range (1-10) or not a number";
        alert.classList.remove("hide");
        pageNumber.classList = "invalid";
    } else if (!rangeChecker(1, 10, limit.value)) {
        alert.innerHTML = "🙉 Limit is out of range (1-10) or not a number";
        alert.classList.remove("hide");
        limit.classList = "invalid";
    } else {
        pageNumber.classList = "valid";
        limit.classList = "valid";
        fetch(
            ` https://picsum.photos/v2/list?page=${pageNumber.value}&limit=${limit.value}`
        )
            .then((response) => response.json())
            .then((entries) => {
                entries.map((entry) => {
                    imageWrapper.innerHTML += `<div class="card-panel grey lighten-5 z-depth-1">
                    <div class="row valign-wrapper">
                        <div class="col s12">
                            <img src="${entry.download_url}" alt="server error" class="responsive-img">
                            <!-- notice the "circle" class -->
                        </div>
                        <div class="col s10">
                            <span class="black-text">
                                ${entry.author}
                            </span>
                        </div>
                    </div>
                </div>`;
                });
                window.localStorage.setItem(
                    "SkillFactoryTest",
                    JSON.stringify(imageWrapper.innerHTML)
                );
            })
            .catch((error) => console.log("error: ", error));
    }
};

imageWrapper.innerHTML = JSON.parse(
    window.localStorage.getItem("SkillFactoryTest")
);

numForm.addEventListener("submit", submitNumForm);

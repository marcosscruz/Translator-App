const textFrom = document.querySelector("#from-text");
const textTo = document.querySelector("#to-text");
const buttonTranslate = document.querySelector("#btnTranslate");
const selects = document.querySelectorAll("select");

selects.forEach((tag) => {
    for (let country in countries) {
        let selected;
        if (tag.className.includes("selectFrom") && country == "pt-BR") {
            selected = "selected";
        } else if (tag.className.includes("selectTo") && country == "en-GB") {
            selected = "selected";
        }

        const option = `<option value ="${country}" ${selected}>${countries[country]}</option>`;

        tag.insertAdjacentHTML("beforeend", option);
    }
});

buttonTranslate.addEventListener("click", () => {
    if (textFrom.value) {
        loadTranslation();
    } else {
        textTo.value = "";
    }
});

function loadTranslation() {
    fetch(
        `https://api.mymemory.translated.net/get?q=${textFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
    )
        .then((res) => res.json)
        .then((data) => {
            textTo.value = data.responseData.translatedText;
        });
}
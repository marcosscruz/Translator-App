const fromText = document.querySelector(".from-text")
const toText = document.querySelector(".to-text")
const exchangeIcon = document.querySelector(".exchange")
const selectTag = document.querySelectorAll(".select")
const icons = document.querySelectorAll(".row i")
const translateBtn = document.querySelector(".button")


selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "BR" ? "selected" : "" : country_code == "US" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${country_code[country_code]}</option`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchangeIcon.addEventListener("click", ()=>{
    let tempText=fromText.value,
        tempLang = selectTag[0].value;
    fromText.value=toText.value;
    toText.value=tempText;
    selectTag[0].value=selectTag[1].value;
    selectTag[1].value=tempLang;
})
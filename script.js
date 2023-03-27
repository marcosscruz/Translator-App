const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const selectTag = document.querySelectorAll(".select");
const icons = document.querySelectorAll(".row i");
const translateBtn = document.querySelector("button");


// add countries with country code to select tag
selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "pt-BR" ? "selected" : "";

        let opcao = `<opcao ${selected} value="${country_code}">${countries[country_code]}</opcao>`;

        tag.insertAdjacentHTML("beforeend", opcao);
    }
});

// função para alterar os countries com um click
exchangeIcon.addEventListener("click", () => {
    let tempTexto = fromText.value,
        tempLingua = selectTag[0].value;

    fromText.value = toText.value;
    toText.value = tempTexto;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLingua;
});

fromText.addEventListener("keyup", () => {
    if (!fromText.value) {
        toText.value = "";
    }
});

//  click event do butão traduzir
translateBtn.addEventListener("click", () => {
    let texto = fromText.value.trim(),
        traduzirFrom = selectTag[0].value,
        traduzirTo = selectTag[1].value;
    if (!texto) return; // faz nada quando input esta vazio
    toText.setAttribute("placeholder", "Traduzindo...");

    // adicionando a API
    let urlApi = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    fetch(urlApi).then(res => res.json()).then(data => {
        toText.value = data.responseData.textoTraduzido;
        data.matches.forEach(data => {
            if (data.id === 0) {
                toText.value = data.traducao;
            }
        });
        toText.setAttribute("placeholder", "Tradução");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (!fromText.value || !toText.value) return;

        // copia os eventos do clipboard
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            // texto para eventos de fala
            let enunciado;
            if (target.id == "from") {
                enunciado = new SpeechSynthesisUtterance(fromText.value);
                enunciado.lang = selectTag[0].value;
            } else {
                enunciado = new SpeechSynthesisUtterance(toText.value);
                enunciado.lang = selectTag[1].value;
            }
            speechSynthesis.speak(enunciado);
        }
    });
});
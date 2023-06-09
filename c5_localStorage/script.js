const pageNumberNode = document.getElementById("input__page_number");
const limitNode = document.getElementById("input__limit");
const btn = document.getElementById("btn");
const errorNode = document.getElementById("error");
const wrapperNode = document.getElementById("wrapper");
const resultNode = document.getElementById("result");


btn.addEventListener('click', () => {
    let isCorrectPageNumber, isCorrectLimit = false;
    let cards = "";
    if (pageNumberNode.value >= 1 && pageNumberNode.value <= 10) isCorrectPageNumber  = true;
    if (limitNode.value >= 1 && limitNode.value <= 10) isCorrectLimit  = true;
    resultNode.innerHTML = "";
    if (isCorrectPageNumber && isCorrectLimit) {
        const url = `https://picsum.photos/v2/list?page=${pageNumberNode.value}&limit=${limitNode.value}`;
        const loadAnimation = `
                <div id="load_animation"></div>
                `;
        errorNode.textContent = "";
        errorNode.insertAdjacentHTML("afterend", loadAnimation);
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                data.forEach((item) => {
                    const card = `
                    <img src="${item.download_url}" alt="Картинка" class="card-image">
                    `;
                    cards += card + `\n`;
                });
                localStorage.setItem("last_user_request", cards);
                localStorage.setItem("page_number_input", pageNumberNode.value);
                localStorage.setItem("limit_input", limitNode.value);
                resultNode.insertAdjacentHTML("beforeend", cards);
                })

            .catch(() => {
                errorNode.textContent = "Ошибка сервера!";
            })
            .finally(()=> {
                wrapperNode.removeChild(document.getElementById("load_animation"));
            })
    } else if (!isCorrectPageNumber && !isCorrectLimit) {
        const card = document.getElementById("card");
        if (card) wrapperNode.removeChild(document.getElementById("card"));
        errorNode.textContent = "Ошибка! Введите корректные значения полей";
    } else if (!isCorrectLimit) {
        const card = document.getElementById("card");
        if (card) wrapperNode.removeChild(document.getElementById("card"));
        errorNode.textContent = "Ошибка! Введите корректное значение лимита";
    } else {
        const card = document.getElementById("card");
        if (card) wrapperNode.removeChild(document.getElementById("card"));
        errorNode.textContent = "Ошибка! Введите корректное значение номера страницы";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("last_user_request")) {
        resultNode.insertAdjacentHTML("beforeend", localStorage.getItem("last_user_request"));
        pageNumberNode.value = localStorage.getItem("page_number_input");
        limitNode.value = localStorage.getItem("limit_input");
    }
})

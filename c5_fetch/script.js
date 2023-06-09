const imageWidth = document.getElementById("input__width");
const imageHeight = document.getElementById("input__height");
const btn = document.getElementById("btn");
const errorNode = document.getElementById("error");
const wrapperNode = document.getElementById("wrapper");


btn.addEventListener('click', () => {
    let isCorrectValues = false;
    if ((imageWidth.value >= 100 && imageWidth.value <= 300)
        &&
        (imageHeight.value >= 100 && imageHeight.value) <= 300) isCorrectValues = true;
    if (isCorrectValues) {
        const url = `https://picsum.photos/${imageWidth.value}/${imageHeight.value}`;
        const loadAnimation = `
                <div id="load_animation"></div>
                `;
        errorNode.textContent = "";
        if (document.getElementById("card")) wrapperNode.removeChild(document.getElementById("card"));
        errorNode.insertAdjacentHTML("afterend", loadAnimation);
        fetch(url)
            .then((response) => {
                return response.url;
            })
            .then(data => {
                const card = `
                <img src="${data}" alt="Картинка" id="card">
`;
                errorNode.insertAdjacentHTML("afterend", card);
            })
            .catch(() => {
                const card = document.getElementById("card");
                if (card) document.removeChild(card);
                errorNode.textContent = "Ошибка сервера!";
            })
            .finally(()=> {
                wrapperNode.removeChild(document.getElementById("load_animation"));
            })
    } else {
        const card = document.getElementById("card");
        if (card) wrapperNode.removeChild(document.getElementById("card"));
        errorNode.textContent = "Ошибка! Введите корректные значения";
    }
});
const btn = document.getElementById("btn");
const input = document.querySelector("input");
const resultElement = document.getElementById("result");
const errorNode = document.getElementById("error");

btn.addEventListener('click', () => {
    const value = input.value;
    let isCorrectValue = false;
    if (1 <= value && value <= 10) isCorrectValue = true;
    if (isCorrectValue) {
        errorNode.textContent = "";
        useRequest(`https://picsum.photos/v2/list?limit=${input.value}`, displayResult);
    } else if (!isCorrectValue && errorNode.textContent) {
        return undefined;
    }
    else {
        errorNode.textContent = "Ошибка! Введите корректное значение";
    }
})

function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = () => {
        if (xhr.status !== 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {

            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };

    xhr.onerror = () => {
        console.log('Ошибка! Статус ответа: ', xhr.status);
        errorNode.textContent = `Ошибка сервера!`;
        resultElement.removeChild("card");
    };

    xhr.send();
}

function displayResult(apiData) {
    let cards = '';
    // console.log('start cards', cards);

    apiData.forEach(item => {
        const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
          alt=""
        />
        <p>${item.author}</p>
      </div>
    `;
        cards = cards + cardBlock;
    });
    resultElement.innerHTML = cards;
}
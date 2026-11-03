// Поиск элементов через getElementById, querySelector, querySelectorAll
let themeBtn = document.getElementById("theme-btn");
let addObjectBtn = document.getElementById("add-object-btn");
let toggleObjectsBtn = document.getElementById("toggle-objects-btn");
let cardsContainer = document.getElementById("cards-container");

let objectsHeading = document.querySelector("#objects h2");
let navLinks = document.querySelectorAll(".nav-menu a");

// Обработка ошибок - проверка существования элементов
if (!themeBtn || !addObjectBtn || !toggleObjectsBtn || !cardsContainer || !objectsHeading) {
    console.error("Ошибка: не удалось найти необходимые элементы на странице!");
} else {
    console.log("Все основные элементы найдены. Ссылок в меню: " + navLinks.length);
}

// Начальный список объектов (если в localStorage ещё ничего нет).
let defaultObjects = [
    { name: "Юпитер", type: "Планета", brightness: "-2.5m" },
    { name: "Сатурн", type: "Планета", brightness: "0.5m" },
    { name: "Луна", type: "Спутник", brightness: "-12.7m" }
];

// Загружаем массив объектов из localStorage или берём начальный
let objectsList = [];
let savedObjects = localStorage.getItem("spaceObjects");

if (savedObjects) {
    objectsList = JSON.parse(savedObjects);
} else {
    objectsList = defaultObjects;
}

// Функция сохранения списка объектов в localStorage
function saveObjects() {
    localStorage.setItem("spaceObjects", JSON.stringify(objectsList));
}

// создание и удаление карточек, изменение текста, атрибутов и классов
function renderObjects() {
    if (!cardsContainer) return;

    // Очищаем контейнер перед отрисовкой
    cardsContainer.innerHTML = "";

    for (let i = 0; i < objectsList.length; i++) {
        let item = objectsList[i];

        // Создаём карточку
        let card = document.createElement("article");
        card.classList.add("card");
        card.setAttribute("data-index", i);
        card.setAttribute("title", "Космический объект: " + item.name);

        let title = document.createElement("h3");
        title.textContent = item.name;

        let typeText = document.createElement("p");
        typeText.textContent = "Тип: " + item.type;

        let brightnessText = document.createElement("p");
        brightnessText.textContent = "Яркость: " + item.brightness;

        // Кнопка «Удалить»
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.setAttribute("type", "button");
        deleteBtn.classList.add("delete-btn");

        // Удаление карточки по клику
        deleteBtn.onclick = function() {
            objectsList.splice(i, 1);
            saveObjects();
            renderObjects();
        };

        // Собираем карточку и добавляем в контейнер
        card.appendChild(title);
        card.appendChild(typeText);
        card.appendChild(brightnessText);
        card.appendChild(deleteBtn);

        cardsContainer.appendChild(card);
    }

    // Используем querySelectorAll для подсчёта созданных карточек на странице
    let currentCards = document.querySelectorAll(".card");
    if (objectsHeading) {
        objectsHeading.textContent = "Наблюдаемые объекты (" + currentCards.length + ")";
    }
}

// 4. Добавление нового объекта по кнопке «Добавить объект»
if (addObjectBtn) {
    addObjectBtn.onclick = function() {
        let name = prompt("Введите название объекта:", "Сириус");
        if (!name) return;

        let type = prompt("Введите тип объекта:", "Звезда");
        if (!type) type = "Неизвестно";

        let brightness = prompt("Введите яркость объекта:", "-1.4m");
        if (!brightness) brightness = "0m";

        objectsList.push({
            name: name,
            type: type,
            brightness: brightness
        });

        saveObjects();
        renderObjects();
    };
}

// 5. Скрытие и показ блока объектов по клику
if (toggleObjectsBtn && cardsContainer) {
    toggleObjectsBtn.onclick = function() {
        cardsContainer.classList.toggle("hidden");

        if (cardsContainer.classList.contains("hidden")) {
            toggleObjectsBtn.textContent = "Показать объекты";
        } else {
            toggleObjectsBtn.textContent = "Скрыть объекты";
        }
    };
}

// 6. Переключение темы (светлая/тёмная) и сохранение в localStorage
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    if (themeBtn) {
        themeBtn.textContent = "Тёмная тема";
    }
}

if (themeBtn) {
    themeBtn.onclick = function() {
        document.body.classList.toggle("light-theme");

        if (document.body.classList.contains("light-theme")) {
            themeBtn.textContent = "Тёмная тема";
            localStorage.setItem("theme", "light");
        } else {
            themeBtn.textContent = "Светлая тема";
            localStorage.setItem("theme", "dark");
        }
    };
}

// Отрисовываем карточки при загрузке страницы
renderObjects();
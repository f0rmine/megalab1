var info = document.getElementById("authorInfo");


function showAuthorInfo() {
    info.style.display = "block";
}

function hideAuthorInfo() {
    info.style.display = "none";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showClosestPointsForm() {
    document.getElementById('content').innerHTML = `
        <h2>Знайти Найближчу Пару Точок</h2>
        <div id="pointsInput">
            <input type="number" id="x" placeholder="x координата">
            <input type="number" id="y" placeholder="y координата">
            <button onclick="addPoint()">Додати точку</button>
        </div>
        <button onclick="findAndShowClosestPoints()">Знайти Найближчу Пару Точок</button>
        <div id="enteredPoints"></div>
        <p id="closestPointsResult"></p>
    `;
}

let points = [];

function addPoint() {
    const x = parseInt(document.getElementById('x').value);
    const y = parseInt(document.getElementById('y').value);
    if (!isNaN(x) && !isNaN(y)) {
        points.push([x, y]);
        document.getElementById('enteredPoints').innerText = `Введені точки: ${JSON.stringify(points)}`;
        document.getElementById('x').value = '';
        document.getElementById('y').value = '';
    } else {
        alert("Будь ласка, введіть дійсні координати.");
    }
}

function findAndShowClosestPoints() {
    const closestPair = findClosestPoints(points);
    const resultElement = document.getElementById('closestPointsResult');

    if (closestPair) {
        resultElement.innerHTML = `
            <p>Найближча пара точок:</p>
            <p>Точка 1: (${closestPair[0][0]}, ${closestPair[0][1]})</p>
            <p>Точка 2: (${closestPair[1][0]}, ${closestPair[1][1]})</p>
        `;
    } else {
        resultElement.innerText = "Неможливо знайти найближчу пару точок. Масив містить менше двох точок.";
    }
}

function findClosestPoints(points) {
    if (points.length < 2) {
        return null; // Якщо масив має менше двох точок, неможливо знайти найближчу пару
    }

    let closestPair = [points[0], points[1]]; // Початкова найближча пара
    let minDistance = distance(points[0], points[1]); // Початкова мінімальна відстань

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dist = distance(points[i], points[j]); 
            if (dist < minDistance) {
                minDistance = dist;
                closestPair = [points[i], points[j]];
            }
        }
    }

    return closestPair;
}

function distance(point1, point2) {
    const dx = point1[0] - point2[0];
    const dy = point1[1] - point2[1];
    return Math.sqrt(dx * dx + dy * dy); 
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showPasswordGenerator() {
    document.getElementById('content').innerHTML = `
        <h2>Генератор Паролів</h2>
        <input type="number" id="passwordLength" placeholder="Довжина паролю" min="1">
        <div id="checkboxes">
            <label><input type="checkbox" id="includeUppercase"> Використовувати великі літери</label>
            <label><input type="checkbox" id="includeLowercase"> Використовувати малі літери</label>
            <label><input type="checkbox" id="includeNumbers"> Використовувати цифри</label>
            <label><input type="checkbox" id="includeSymbols"> Використовувати спеціальні символи</label>
        </div>
        <button onclick="generatePassword()">Згенерувати Пароль</button>
        <p id="generatedPassword"></p>
    `;
}

function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;

    const password = generateRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    document.getElementById('generatedPassword').innerText = `Згенерований Пароль: ${password}`;
}

function generateRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characters = '';
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (characters === '') {
        return 'Оберіть хоча б один тип символів для генерації паролю.';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showCapitalizeText() {
    document.getElementById('content').innerHTML = `
        <h2>Перетворення першої літери кожного слова на велику</h2>
        <textarea id="inputText" placeholder="Введіть текст тут" rows="4" cols="50"></textarea><br>
        <button onclick="transformText()">Перетворити Текст</button>
        <p id="outputText"></p>
    `;
}

function capitalizeFirstLetterOfEachWord(inputString) {
    return inputString.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}

function transformText() {
    const inputText = document.getElementById('inputText').value;
    const outputText = capitalizeFirstLetterOfEachWord(inputText);
    document.getElementById('outputText').innerText = outputText;
}

// Інші функції (showLCMCalculator, calculateLCM, findLCM, showNumberInputControl, checkNumber, showWordCount, calculateWordCount, showClosestPointsForm, addPoint, findAndShowClosestPoints, findClosestPoints, distance, showPasswordGenerator, generatePassword, generateRandomPassword) залишаються без змін

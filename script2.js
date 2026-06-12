<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qoraqalpoq So‘zlik</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }

        header {
            background-color: #2e3b4e;
            color: white;
            padding: 20px 0;
            text-align: center;
        }

        .container {
            width: 80%;
            margin: 20px auto;
        }

        .search-box {
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
        }

        .search-box input {
            padding: 10px;
            width: 50%;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        .search-box button {
            padding: 10px;
            background-color: #2e3b4e;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 10px;
        }

        .search-box button:hover {
            background-color: #1a2434;
        }

        .results {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        .word-card {
            background-color: #ffffff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            margin-bottom: 20px;
            padding: 15px;
            width: 23%;
            border-radius: 8px;
            transition: all 0.3s ease-in-out;
        }

        .word-card:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        .word-card h3 {
            margin: 0;
            color: #2e3b4e;
        }

        .word-card p {
            color: #555;
        }

        footer {
            background-color: #2e3b4e;
            color: white;
            text-align: center;
            padding: 10px;
            position: fixed;
            width: 100%;
            bottom: 0;
        }

    </style>
</head>
<body>

<header>
    <h1>Qoraqalpoq So‘zlik</h1>
    <p>So‘zlar va ularning ma'nolarini o‘rganing</p>
</header>

<div class="container">
    <div class="search-box">
        <input type="text" id="searchInput" placeholder="So‘zni qidirish...">
        <button onclick="searchWord()">Qidirish</button>
    </div>

    <div class="results" id="resultsContainer">
        <!-- So‘zlar va ularning ma'nolari shu yerda ko‘rsatiladi -->
    </div>
</div>

<footer>
    <p>&copy; 2025 Qoraqalpoq So‘zlik</p>
</footer>

<script>
// So‘zlar va ularning ma'nolarini saqlash
const words = [
    { word: "kompyuter", meaning: "Elektron hisoblash apparati", experience: "Texnologiya, bilim va ijodda keng qo‘llaniladi." },
    { word: "internet", meaning: "Butun dunyo bo‘ylab tarmoq", experience: "Axborot almashinuvi va kommunikatsiyaning asosiy vositasi." },
    { word: "mobil telefon", meaning: "Portativ telefon", experience: "Kunlik hayotimizning ajralmas qismi, mobil ilovalar bilan." },
    { word: "kitob", meaning: "O'qish va o'rganish vositasi", experience: "Bilimlarni saqlash va tarqatishda eng qadimiy vosita." },
    // Bu yerda boshqa 1000 ta so‘zni qo‘shishingiz mumkin...
];

// So‘zlarni qidirish funksiyasi
function searchWord() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredWords = words.filter(word => word.word.toLowerCase().includes(searchTerm));

    displayResults(filteredWords);
}

// So‘zlarni ekranda ko‘rsatish
function displayResults(wordsList) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    if (wordsList.length === 0) {
        resultsContainer.innerHTML = "<p>Hech qanday natija topilmadi.</p>";
        return;
    }

    wordsList.forEach(wordObj => {
        const wordCard = document.createElement("div");
        wordCard.classList.add("word-card");

        wordCard.innerHTML = `
            <h3>${wordObj.word}</h3>
            <p><strong>Ma'no:</strong> ${wordObj.meaning}</p>
            <p><strong>Tajribasi:</strong> ${wordObj.experience}</p>
        `;

        resultsContainer.appendChild(wordCard);
    });
}
</script>

</body>
</html>

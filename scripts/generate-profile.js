questions = [];
questionTemplates = {
    "Hoeveel jaar ervaring heb je?": "Ik heb <value> jaar werkervaring.",
    "Wat is je hoogst genoten opleiding?": "Mijn hoogst genoten opleiding is <value>."
}

initialize();

function initialize() {
    document.addEventListener("DOMContentLoaded", function () {
        var elements = document.getElementById("personal-data-form").elements;

        for (var i = 0; i <  elements.length; i++) {
            elements[i].addEventListener("keydown", function () {
                generateText();
            });
        }
    })
}

function generateText(event) {
    var name = getTextOrPlaceholder(document.getElementById("name").value);
    var age  = getTextOrPlaceholder(document.getElementById("age").value);
    var city = getTextOrPlaceholder(document.getElementById("city").value);
    var job = getTextOrPlaceholder(document.getElementById("job").value);

    var text = getProfileIntroduction(name, age, city, job);

    document.getElementById("profile-introduction").innerHTML = text;
}

function addQuestion() {
    var question = document.getElementById("question-select").value;
    var answer = document.getElementById("question-answer").value;

    console.log(question);

    if (question !== "-1") {
        questions[question] = answer;

        updatePreviewText(questions);
        generateProfileBody(questions);
    }
}

function getProfileIntroduction(name, age, city, job) {
    return "Ik ben " + name + " en ben " + age + " jaar en ben op zoek naar een baan als " + job.toLowerCase() + ".<br>"
        + "Mijn voorkeur naar werkplaats is in de buurt van " + city + ". "
}

function getTextOrPlaceholder(text, placeholder = "___") {
    text = text.trim();
    return text === null || typeof text === "undefined" || text === "" ? placeholder : text;
}

function updatePreviewText(questions) {
    var html = "";

    for (var key in questions) {
        html += "<ul><li>" + key + "</li><li>" + questions[key] + "</li></ul>";
        html += "<button class=\"btn btn-danger\" onclick=\"removeQuestion(\'" + key + "\')\">Verwijder</button>"
    }

    document.getElementById("selected-questions").innerHTML = html;
}

function generateProfileBody(questions) {
    var html = "";

    for (var key in questions) {
        html += parseQuestionTemplate(questionTemplates[key], questions[key]) + " ";
    }

    document.getElementById("profile-body").innerHTML = html;
}

function removeQuestion(key) {
    delete questions[key];
    console.log(questions);

    updatePreviewText(questions);
    generateProfileBody(questions);
}

function parseQuestionTemplate(template, value) {
    return template.replace("<value>", value);
}
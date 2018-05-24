questions = [];
questionTemplates = {
    "Hoeveel jaar ervaring heb je?": "Ik heb <value> jaar werkervaring.",
    "Wat is je hoogst genote opleiding?": "Mijn hoogst genote opleiding is <value>."
}

initialize();

function initialize() {
    document.addEventListener("DOMContentLoaded", function () {
        var formNodes = document.getElementById("personal-data-form").childNodes;

        for (var i = 0; i <  formNodes.length; i++) {
            if (formNodes[i].className = "form-input") {
                formNodes[i].addEventListener("change", function () {
                    generateText();
                })
            }
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
    return "Ik ben " + name.toLowerCase() + " en ben " + age + " jaar en ben op zoek naar een baan als " + job.toLowerCase() + ".<br>"
        + "Mijn voorkeur naar werkplaats is in de buurt van " + city.toLowerCase() + ". "
}

function getTextOrPlaceholder(text, placeholder = "___") {
    text = text.trim();
    return text === null || typeof text === "undefined" || text === "" ? placeholder : text;
}

function updatePreviewText(questions) {
    var html = "";

    for (var key in questions) {
        html += "<p>" + key + "<br>" + questions[key] + "</p>";
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

function parseQuestionTemplate(template, value) {
    return template.replace("<value>", value);
}
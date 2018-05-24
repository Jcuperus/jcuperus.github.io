function generateText() {
    var name = document.getElementById("name").value;
    var age  = document.getElementById("age").value;
    var city = document.getElementById("city").value;
    var hobby = document.getElementById("hobby").value;
    var job = document.getElementById("job").value;

    var text = getProfileText(name, age, city, hobby, job);

    document.getElementById("profile-text").innerHTML = text;
}

function getProfileText(name, age, city, hobby, job) {
    return "Ik ben " + name.toLowerCase() + " en ben " + age + " jaar en ben op zoek naar een baan als " + job.toLowerCase() + ".<br>"
        + "In mijn vrije tijd besteed ik veel tijd aan " + hobby.toLowerCase() 
        + " en ik hoop deze interresses ook in mijn werk naar voren te brengen.<br>"
        + "Mijn voorkeur naar werkplaats is in de buurt van " + city.toLowerCase() + ", dit is namelijk ook mijn woonplaats."
}
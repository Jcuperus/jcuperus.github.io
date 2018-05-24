function generateText() {
    var name = document.getElementById('name').value;
    var age  = document.getElementById('age').value;
    var city = document.getElementById('city').value;
    var hobby = document.getElementById('hobby').value;
    var job = document.getElementById('job').value;

    var text = name + " " + age + " " + city + " " + hobby + " " + job;

    document.getElementById("profile-text").innerHTML = text;
}
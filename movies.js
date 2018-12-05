const key = "bf0bea97";
const baseUrl = "https://www.omdbapi.com/";

let searchField;
let moviesContainer;
let rowLimit = 3;

function initialize() {
    searchField = document.getElementById('search-field');
    moviesContainer = document.getElementById('movies-container');
}

function submitSearchForm() {
    searchMovies(searchField.value);
    return false;
}

function focusOnSearch() {
    searchField.focus();
}

function searchMovies(search) {
    let url = generateUrl(["s=" + search]);

    fetch(url).then(response => {
        if (response.ok) {
            return response.json();
        }
    }, errorResponse => {
        console.log(errorResponse.message);
    }).then(jsonResponse => {
        renderResponse(jsonResponse);
    });
}

function renderResponse(jsonResponse) {
    if (jsonResponse.Response == "True") {
        clearMoviesContainer();
        
        let row = getRowDom();

        jsonResponse.Search.forEach((movie, key) => {
            if (key % rowLimit == 0) {
                moviesContainer.appendChild(row);
                row = getRowDom();
            }
            
            let col = getColDom();
            col.appendChild(getMovieCardDom(
                movie.Title,
                movie.imdbID,
                movie.Type,
                movie.Year,
                movie.Poster
            ));

            row.appendChild(col);
        });

        if (row.childElementCount < rowLimit) {
            moviesContainer.appendChild(row);
        }
    }    
}

function getMovieCardDom(title, imdbId, type, year, poster) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("text-center");

    let imageWrapper = document.createElement("div");
    imageWrapper.className = "card-img-container";

    if (poster !== 'N/A') {
        let imageElement = document.createElement("img");
        imageElement.className = "card-img-top";
        imageElement.src = poster;
        imageElement.alt = title + " Movie poster";

        imageWrapper.appendChild(imageElement);
    }

    card.appendChild(imageWrapper);

    let body = document.createElement("div");
    body.className = "card-body";

    let titleElement = document.createElement("h3");
    titleElement.className = "card-title";
    titleElement.appendChild(document.createTextNode(title))
    body.appendChild(titleElement);

    let yearElement = document.createElement("h5");
    yearElement.classList.add("card-subtitle");
    yearElement.classList.add("text-muted");
    yearElement.appendChild(document.createTextNode(year));
    body.appendChild(yearElement);

    card.appendChild(body);

    let footer = document.createElement("div");
    footer.classList.add("card-footer");
    footer.classList.add("text-muted");
    footer.appendChild(document.createTextNode(imdbId));
    card.appendChild(footer);

    return card;
}

function getRowDom() {
    let row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("justify-content-md-center");

    return row;
}

function getColDom() {
    let col = document.createElement("div");
    col.className = "col-sm-4";

    return col;
}

function clearMoviesContainer() {
    while (moviesContainer.firstChild) {
        moviesContainer.removeChild(moviesContainer.firstChild);
    }
}

function generateUrl(params) {
    params.push("apikey=" + key);
    return baseUrl + '?' + params.join("&");
}

document.addEventListener("DOMContentLoaded", () => {
    initialize();
});
const form = document.querySelector("#form");
const table = document.querySelector("table");
const titleField = document.querySelector("#title");
const directorField = document.querySelector("#director");
const yearField = document.querySelector("#year");
const genreField = document.querySelector("#genre");
const errorList = document.querySelector("#error-list");
let fragment = document.createDocumentFragment();
const movies = [];
let validateObject = {
  title: false,
  director: false,
  genre: false,
  year: false,
};
const currentDate = new Date();
const year = currentDate.getFullYear();
const yearText = year.toString();
const regEx = {
  title: "^/([a-zÁ-ÿ-]s*)+/i$",
  director: "^/([a-zÁ-ÿ-]s*)+/i$",
  year: `/^(18\d\d|19\d\d|200\d|201\d|20[0-${year[2]}][0-${year[3]}])$/`,
};
console.log(regEx.year);
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  validate();
});

const validate = () => {
  errorList.innerHTML = "";
  table.innerHTML = "";
  let errors = "";
  const title = titleField.value;
  const director = directorField.value;
  const year = yearField.value;
  const genre = genreField.value;

  if (isNaN(title) && title.trim().length > 0) {
    validateObject.title = true;
  } else {
    validateObject.title = false;
    errors += "<li>Title not valid</li>";
  }
  if (isNaN(director) && director.trim().length > 0) {
    validateObject.director = true;
  } else {
    validateObject.director = false;
    errors += "<li>Director not valid</li>";
  }
  if (!isNaN(year) && year.trim().length == 4) {
    validateObject.year = true;
  } else {
    validateObject.year = false;
    errors += "<li>Year not valid</li>";
  }
  if (genre != "select_value") {
    validateObject.genre = true;
  } else {
    validateObject.genre = false;
    errors += "<li>Please select a genre</li>";
  }

  const validateArray = Object.values(validateObject);
  const valid = validateArray.findIndex((item) => item == false);
  if (valid === -1) {
    movies.push({
      title,
      director,
      year,
      genre,
    });
    printMovies();
  } else {
    console.log(errors);
    errorList.innerHTML = errors;
  }
};

const printMovies = () => {
  let headRow = document.createElement("TR");
  headRow.innerHTML =
    "<th></th><th>Title</th><th>Director</th><th>Year</th><th>Genre</th>";
  movies.forEach((item, i) => {
    let row = document.createElement("TR");
    let data0 = document.createElement("TD");
    data0.textContent = i + 1;
    let data1 = document.createElement("TD");
    data1.textContent = item.title;
    let data2 = document.createElement("TD");
    data2.textContent = item.director;
    let data3 = document.createElement("TD");
    data3.textContent = item.year;
    let data4 = document.createElement("TD");
    data4.textContent = item.genre;
    row.append(data0, data1, data2, data3, data4);
    fragment.append(row);
  });
  table.append(fragment);
};

const createSelectOptions = () => {
  optionsArray = [
    { value: "action", text: "Action" },
    { value: "drama", text: "Drama" },
    { value: "sciFi", text: "SciFi" },
    { value: "comedy", text: "Comedy" },
    { value: "romance", text: "Romance" },
  ];

  optionsArray.forEach(({ value, text }) => {
    const option = document.createElement("OPTION");
    option.value = value;
    option.textContent = text;
    fragment.append(option);
  });
  genreField.append(fragment);
};
createSelectOptions();

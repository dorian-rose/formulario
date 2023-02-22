document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form");
  const table = document.querySelector("table");
  const titleField = document.querySelector("#title");
  const directorField = document.querySelector("#director");
  const yearField = document.querySelector("#year");
  const genreField = document.querySelector("#genre");
  const errorList = document.querySelector("#error-list");
  let fragment = document.createDocumentFragment();

  let validateObject = {
    title: false,
    director: false,
    genre: false,
    year: false,
  };
  const movies = JSON.parse(localStorage.getItem("movies")) || [];

  //get year:
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  //const yearText = currentYear.toString();

  //regular expressions for validation
  const regExp = {
    title: /^([a-zÁ-ÿ0-9\-]\s*)+$/i,
    director: /^([a-zÁ-ÿ\-]\s*)+$/i,
    /*year: `/(18\d\d|19\d\d|200\d|201\d|20[0-${yearText[2]}][0-${yearText[3]}])/`,*/
  };

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    validate();
  });

  const validate = () => {
    errorList.innerHTML = "";
    table.innerHTML = "";
    let errors = "";
    const title = titleField.value.trim();
    const director = directorField.value.trim();
    const year = parseInt(yearField.value.trim());
    const genre = genreField.value;

    if (regExp.title.test(title)) {
      validateObject.title = true;
    } else {
      validateObject.title = false;
      errors += "<li>Title not valid</li>";
    }
    if (regExp.director.test(director)) {
      validateObject.director = true;
    } else {
      validateObject.director = false;
      errors += "<li>Director not valid</li>";
    }
    if (year > 1799 && year <= currentYear) {
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
      setLocal();
      printMovies();
    } else {
      errorList.innerHTML = errors;
    }
  };

  //add to local
  const setLocal = () => {
    localStorage.setItem("movies", JSON.stringify(movies));
  };

  //get from local
  const getLocal = () => {
    return JSON.parse(localStorage.getItem("movies")); //|| []
  };
  //print to page
  const printMovies = () => {
    let headRow = document.createElement("TR");
    headRow.innerHTML =
      "<th></th><th>Title</th><th>Director</th><th>Year</th><th>Genre</th>";
    const moviesToPrint = getLocal();
    moviesToPrint.forEach((item, i) => {
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

  //Call functions
  createSelectOptions();
  printMovies();
}); //LOAD

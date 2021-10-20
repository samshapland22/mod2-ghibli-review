//<-------------------------------FETCH MOVIE DATA--------------------------------->
let url = "https://ghibliapi.herokuapp.com/films";

fetch(url)
  .then((res) => {
    return res.json(); //the API sends us JSON data, which is stored in the variable "res". we're parsing that data here with the method .json()
  })
  .then((movies) => {
    console.log(movies); //"movies" is our parsed data. let's use console.log to see what it looks like in the console.

    //<---------------POPULATE DROPDOWN WITH MOVIE TITLES FROM API DATA-------------------->

    let dropdown = document.querySelector("select");

    //loop through all of the movies from our API call a
    for (let movie of movies) {
      const option = document.createElement("option");
      option.setAttribute("value", movie.title);
      option.textContent = movie.title;
      dropdown.append(option);
    }

    //<-----------DISPLAY SELECTED MOVIE'S INFO BASED ON SELECTED MOVIE FROM DROPDOWN-------------->

    const description = document.querySelector("#display-info");
    let selectedMovie; //we will use this variable later on lines 35 and 52 to keep track of which movie is currently selected. we're initializing the variable here for scoping reasons.

    //add an event listener to the dropdown menu so that it displays the appropriate info every time you choose a new movie.
    dropdown.addEventListener("change", (event) => {
      movies.forEach((movie) => {
        if (movie.title === event.target.value) {
          //check to see which movie from the API data has a title that matches our currently selected dropdown option.
          description.innerHTML = `<h2>${movie.title}</h2><p>${movie.release_date}</p><p>${movie.description}</p>`;
          selectedMovie = movie; //now we have access to which movie is currently selected, even OUTSIDE of this loop. (scoping reasons)
        }
      });
    });

    //<--------ADD EVENT LISTENER TO FORM ON SUBMIT THAT ADDS A REVIEW FOR THE SELECTED MOVIE----------->

    const reviewForm = document.querySelector("#review");
    const ul = document.querySelector("ul");

    //add an event listener to our form. every time the user submits a review, some logic should be executed
    //to make a new list item with a)the title of the movie & b)their review.
    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault(); //prevent page refresh
      let myReview = document.createElement("li"); //create list element
      let strongTitle = document.createElement("strong"); //create strong tag for movie title
      strongTitle.textContent = `${selectedMovie.title}: `; //add text content to strong tag
      myReview.textContent = event.target.written.value; //add user's form input as text content to myReview
      // myReview.innerHTML = `<strong>${selectedMovie.title}:</strong> ${event.target.written.value}` <-- it is not recommended to use innerHTML inside of a form! this is just here so you can see how to use it.
      myReview.prepend(strongTitle); //prepend strong tag with movie title to myReview
      ul.append(myReview);
      written.value = ""; //reset text input to be blank after user submits review
    });
  });

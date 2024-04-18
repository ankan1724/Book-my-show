
const currentDate = new Date();
let fullDate = '';
let time = '';
let selectedMovie = '';
let count = 0;
let totalPrice = '';
let selectedPrice = '';

function todaysDate() {

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const yr = currentDate.getFullYear();

  fullDate = (`${day}/${month}/${yr}`)
  document.querySelector('.js-selectDate').innerHTML = '';
  document.querySelector('.js-showDate').innerHTML
    = `Selected date: ${fullDate}`;
}

function tomorrowsDate() {

  const day = currentDate.getDate() + 1;
  const month = currentDate.getMonth() + 1;
  const yr = currentDate.getFullYear();

  fullDate = (`${day}/${month}/${yr}`)
  document.querySelector('.js-selectDate').innerHTML = '';
  document.querySelector('.js-showDate').innerHTML
    = "Selected date: " + fullDate;
}

function dateSelector() {

  const html = `<input type="date" id="js-dateInput">`;
  document.querySelector('.js-selectDate').innerHTML = html;
  fullDate = '';

  document.addEventListener("click", function (event) {

    let containerDiv = document.querySelector('.dates');
    if (!containerDiv.contains(event.target)) {
      let dateUM = document.getElementById('js-dateInput').value;

      const dateArray = dateUM.split('-');
      const date = dateArray[2];
      const month = dateArray[1];
      const year = dateArray[0];

      fullDate = (`${date}/${month}/${year}`);
      if (fullDate === 'undefined/undefined/') {
        return;
      }
      document.querySelector('.js-showDate').innerHTML = `Selected date: ${fullDate}`;
    }
  }
  );
}
let seatAvailability = true;
function getTime(button) {

  time = button.innerHTML;
  let seatCount = Math.random();
  let html = '';
  if (seatCount >= 0 && seatCount < 1 / 3) {
    seatAvailability = false;
    html = `<span style="color:red; margin-left:5px">No Seats left. Please select some other time.</span>`;
  } else if (seatCount >= 1 / 3 && seatCount < 2 / 3) {
    seatAvailability = true;
    html = `<span style="color:red; margin-left:5px">Limited Seats. Hurry Up !!</span>`;
  } else if (seatCount >= 2 / 3 && seatCount <= 1) {
    seatAvailability = true;
    html = `<span style="color:green; margin-left:5px">Seats Available</span>`;
  }

  document.querySelector('.js-showTime').innerHTML = `Selected Time: ${time} ${html}`;
  return html;
}



function seatCount() {
  let containerDiv = document.querySelector('.seats');
  if (!containerDiv.contains(event.target)) {
    count = document.getElementById("seatsDropdown").value;
    document.querySelector('.js-showSeats').innerHTML = `No. of seats: ${count}`;
  }
}

document.addEventListener("click", function (event) {
  let containerDiv = document.querySelector('.seats');
  if (!containerDiv.contains(event.target)) {
    
    seatCount();
    return count;
  }
}
);

function confirm() {
  seatCount();
  const selectedPriceRadio = document.
    querySelector('.js-select-price input[name="price"]:checked');
  selectedPrice = selectedPriceRadio ? selectedPriceRadio.value : null;

  const selectedMovieRadio = document.
    querySelector('.js-select-movie input[name="movies"]:checked');
  selectedMovie = selectedMovieRadio ? selectedMovieRadio.value : null;

  if (selectedMovie === null) {

    document.querySelector('.movie-error-msg').innerHTML = "Please select a movie!";
    document.addEventListener("click", function (event) {
      let containerDiv = document.querySelector('.js-select-movie');
      if (containerDiv.contains(event.target)) {
        document.querySelector('.movie-error-msg').innerHTML = '';
      }
    });
  }
  else {
    if (fullDate === '') {
      document.querySelector('.date-error-msg').innerHTML = "Please select a date!";
      document.addEventListener("click", function (event) {
        let containerDiv = document.querySelector('.dates');
        if (containerDiv.contains(event.target)) {
          document.querySelector('.date-error-msg').innerHTML = '';
        }
      });
    }
    else {
      if (time === '') {
        document.querySelector('.time-error-msg').innerHTML = "Please select a time slot!";
        document.addEventListener("click", function (event) {
          let containerDiv = document.querySelector('.js-time');
          if (containerDiv.contains(event.target)) {
            document.querySelector('.time-error-msg').innerHTML = '';
          }
        });
      } 
      else {
        if (count == 0) {
          document.querySelector('.seat-error-msg').innerHTML = "Please select a seats!";
          document.addEventListener("click", function (event) {
            let containerDiv = document.querySelector('#seatsDropdown');
            if (containerDiv.contains(event.target)) {
              document.querySelector('.seat-error-msg').innerHTML = '';
            }
          });
        } 
        else {
          if (selectedPrice === null) {
            document.querySelector('.price-error-msg').innerHTML = "Please select a ticket price!";
            document.addEventListener("click", function (event) {
              let containerDiv = document.querySelector('.js-select-price');
              if (containerDiv.contains(event.target)) {
               document.querySelector('.price-error-msg').innerHTML = '';
              }
            });
          }
          else {
            calculatePrice();
            showDetails();
          }
        }
      }
    }
  }
}




function showDetails() {
  if (!seatAvailability) {
    document.querySelector('.error-Msg').innerHTML="No Seats available for selected time. Please select some other date/time!"
  } else {
    document.querySelector('.error-Msg').innerHTML='';
    const html =
      `<p>Movie: ${selectedMovie}</p><p>Date: ${fullDate}</p><p>Time: ${time}</p><p>Seats: ${count}</p><p>Price : Rs.${selectedPrice} x ${count}</p><p>GST: 15%</p><p>Total: Rs.${totalPrice}`;
    document.querySelector('.showDetails').innerHTML = html;
  }
}

function calculatePrice() {
  let totalPriceBeforeGST = (selectedPrice * count);
  totalPrice = totalPriceBeforeGST + (totalPriceBeforeGST * 0.15);
}



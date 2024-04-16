
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
}



function seatCount() {
  let containerDiv = document.querySelector('.seats');
  if (!containerDiv.contains(event.target)) {
    count = document.getElementById("seatsDropdown").value;
    document.querySelector('.js-showSeats').innerHTML = `No. of seats: ${count}`;
  }
}
// const count= document.querySelector('.seatsDropdown').value;
document.addEventListener("click", function (event) {
  let containerDiv = document.querySelector('.seats');
  if (!containerDiv.contains(event.target)) {
    // let count= document.getElementById("seatsDropdown").value;
    // console.log(count);
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
    alert("Please select a movie.");
  }
  else {
    if (fullDate === '' | time === '') {
      alert('Please select date and time.');
    } else {
      if (count == 0) {
        // console.log(count);
        alert('Please select no. of seats.');
      } else {
        if (selectedPrice === null) {
          console.log(selectedPrice)
          alert('Please select seat price.');
        } else {
          calculatePrice();
          showDetails();
        }
      }
    }
  }
}




function showDetails() {
  if (!seatAvailability) {
    alert("Selected time has no seats available. PLease select some other time");
  } else {
    const html =
      `<p>Movie: ${selectedMovie}</p><p>Date: ${fullDate}</p><p>Time: ${time}</p><p>Seats: ${count}</p><p>Price : Rs.${selectedPrice} x ${count}</p><p>GST: 15%</p><p>Total: Rs.${totalPrice}`;
    document.querySelector('.showDetails').innerHTML = html;
  }
}

  function calculatePrice() {
    let totalPriceBeforeGST = (selectedPrice * count);
    totalPrice = totalPriceBeforeGST + (totalPriceBeforeGST * 0.15);
  }



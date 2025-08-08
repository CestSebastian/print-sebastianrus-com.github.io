let calendarContainer = document.getElementById('calendar-conainer');

const bgColors = {
  'January': '#f0b1ac',
  'February': '#efbc87',
  'March': '#f4d4a3',
  'April': '#a9cebd',
  'May': '#a8cdd3',
  'June': '#c4dbe9',
  'July': '#c4dbe9',
  'August': '#c4dbe9',
  'September': '#f0bd88',
  'October': '#f2d3a4',
  'November': '#a9cebd',
  'December': '#a8cdd3',
};

// console.log(thisYear, thisMonth)

function update() {
  calendarContainer.innerHTML = '<div class="row dotw"><div>Monday</div><div>Tuesday</div><div>Wednesday</div><div>Thursday</div><div>Friday</div><div>Saturday</div><div>Sunday</div></div>';

  let today = new Date();
  let thisYear = today.getFullYear();
  let thisMonth = today.getMonth() + 1; // thisMonth will be 1 .. 12

  if (location.hash) {
    [
      thisYear,
      thisMonth
    ] = location.hash.substring(1).split('-').map(e => parseInt(e, 10))
  }

  let firstDayOfMonth = new Date(thisYear, thisMonth - 1, 1, 12);
  let lastOfMonth = new Date(thisYear, thisMonth, 0, 12);
  let used = (firstDayOfMonth.getDay() || 7) - 1 + lastOfMonth.getDate();
  let weeksInMonth = Math.ceil( used / 7);

  // UPDATE HTML FOR CURRENT MONTH
  const longMonth = firstDayOfMonth.toLocaleString('default', { month: 'long' });
  document.getElementById('title-h1').textContent = longMonth + ' ' + firstDayOfMonth.getFullYear();
  document.title = 'Free Printable ' + longMonth + ' ' + firstDayOfMonth.getFullYear() + ' Calendar from SebastianRus.com';
  // document.getElementById('app-container').style.backgroundImage = `url('./assets/months/${longMonth}.jpg')`;
  // document.body.style.backgroundImage = `url('./assets/months/${longMonth}.jpg')`;
  document.body.style.backgroundColor = bgColors[longMonth];
  document.getElementById('prev-btn').setAttribute('href', `#${thisMonth > 1 ? thisYear : thisYear - 1}-${thisMonth > 1 ? thisMonth - 1 : 12}`);
  document.getElementById('next-btn').setAttribute('href', `#${thisMonth < 12 ? thisYear : thisYear + 1}-${thisMonth < 12 ? thisMonth + 1 : 1}`);

  let firstDayOnCalendar = new Date(thisYear, thisMonth - 1, 1 - (firstDayOfMonth.getDay() || 7) + 1, 12)
  console.log(firstDayOfMonth, firstDayOfMonth.getDay(), firstDayOnCalendar, used, weeksInMonth)

  for (let i = 0; i < weeksInMonth; i++) { // weeksInMonth weeks displayed for month
  	let row = document.createElement('div');
    row.setAttribute('class', 'row');
    
    for (let j = 0; j < 7; j++) {
    	let dayContainer = document.createElement('div');
    	dayContainer.setAttribute('class', 'day-container');
      
      let dayLabel = document.createElement('div');
    	dayLabel.setAttribute('class', 'day-label' + (thisMonth === firstDayOnCalendar.getMonth() + 1 ? '' : ' gray-label'));
      dayLabel.textContent = firstDayOnCalendar.getDate();
      
      dayContainer.appendChild(dayLabel);
      row.appendChild(dayContainer);
      
      // add day to date
      firstDayOnCalendar.setDate(firstDayOnCalendar.getDate() + 1);
    }
    
    calendarContainer.appendChild(row);
  }
}

update()
addEventListener("hashchange", update); 

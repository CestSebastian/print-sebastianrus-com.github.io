let calendarContainer = document.getElementById('calendar-conainer');

let firstDayOfMonth = new Date(2024, 4, 1);
let lastOfMonth = new Date(2024, 5, 0);
let used = firstDayOfMonth.getDay() + lastOfMonth.getDate();
let weeksInMonth = Math.ceil( used / 7);



let firstDayOnCalendar = new Date(2024, 4, 1 - firstDayOfMonth.getDay() + 1)
console.log(firstDayOfMonth, firstDayOnCalendar, used, weeksInMonth)

for (let i = 0; i < weeksInMonth; i++) { // weeksInMonth weeks displayed for month
	let row = document.createElement('div');
  row.setAttribute('class', 'row');
  
  for (let j = 0; j < 7; j++) {
  	let dayContainer = document.createElement('div');
  	dayContainer.setAttribute('class', 'day-container');
    
    let dayLabel = document.createElement('span');
  	dayLabel.setAttribute('class', 'day-label');
    dayLabel.textContent = firstDayOnCalendar.getDate();
    
    dayContainer.appendChild(dayLabel);
    row.appendChild(dayContainer);
    
    // add day to date
    firstDayOnCalendar.setDate(firstDayOnCalendar.getDate() + 1);
  }
  
  calendarContainer.appendChild(row);
}

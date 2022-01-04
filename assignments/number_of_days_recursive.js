function isLeapYear (year) {
  return ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0))
}

function getDaysOfMonth (month, year) {

  if (month === 2) {
    return 28 + Number(isLeapYear(year))
  }

  if(month === 4 || month === 6 || month === 9 || month === 11) {
    return 30
  }

  return 31

}

function isValidDate (day, month, year) {
  if ((typeof day !== 'number') || (typeof month !== 'number') || (typeof year !== 'number')) {
    return false
  }

  if (month < 1 || month > 12) {
    return false
  }

  return ((day >= 1) && (day <= getDaysOfMonth(month, year)))
}

function calculateDays (day1, month1, year1, day2, month2, year2, accumulator=0) {

  if (month1 === month2 && year1 === year2) {
    return (day2 - day1) + accumulator
  }

  accumulator += getDaysOfMonth(month1, year1)

  month1++

  if (month1 > 12) {
    month1 = 1
    year1++
  }

  return calculateDays(day1, month1, year1, day2, month2, year2, accumulator)
}

function getNumberOfDays (dd1, mm1, yy1, dd2, mm2, yy2) {
  if (!isValidDate(dd1, mm1, yy1) || !isValidDate(dd2, mm2, yy2)) {
    return null
  }

  let swap = false

  if (yy1 > yy2) {
    swap = true
  }

  if (yy1 === yy2) {
    if (mm1 > mm2) {
      swap = true
    } else if (mm1 === mm2 && dd1 > dd2) {
      swap = true
    }
  }

  if (swap) {
    [dd1, mm1, yy1, dd2, mm2, yy2] = [dd2, mm2, yy2, dd1, mm1, yy1]
  }

  return calculateDays(dd1, mm1, yy1, dd2, mm2, yy2)
}

// console.log(getNumberOfDays(4, 7, 1998, 30, 11, 2021));
console.log(getNumberOfDays(4, 7, 1998, 4, 7, 2010))

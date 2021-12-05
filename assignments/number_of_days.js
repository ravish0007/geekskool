function numberOfDays(dd1, mm1, yy1, dd2, mm2, yy2) {


    let days_in_a_month = {

      01 : 31,
      02 : 28,
      03 : 31,
      04 : 30,
      05 : 31,
      06 : 30,
      07 : 31,
      08 : 31,
      09 : 30,
      10 : 31,
      11 : 30,
      12 : 31

    }


   function isLeapYear(yy) {

     return ((yy%400 == 0) || (yy%4 == 0 && yy%100 != 0 )) ? true : false;

   }

   function get_days(mm, yy) {

     return days_in_a_month[mm] +  ( mm == 2 && isLeapYear(yy) ? 1 : 0 ) ;

   }

   function isValidDate(dd, mm, yy) {

     if( (typeof dd != 'number') || (typeof mm != 'number') || (typeof yy != 'number') ) return false;

     if(mm < 0 || mm > 12) return false;

     return 1 <= dd && dd <= get_days(mm, yy) ? true : false;

   }


  if(!isValidDate(dd1, mm1, yy1) ||  !isValidDate(dd2, mm2, yy2)) return false;


  let days = 0;

  let years_in_between = (yy2 - 1) - yy1;

  for(let year = yy1 + 1 ; year <= yy1 + years_in_between; year++ )  days += 365 + (isLeapYear(year) ? 1: 0);


  let days_remaining_of_the_year = get_days(mm1, yy1) - dd1;

  for(let month = mm1 + 1 ; month <= 12; month++) {

    days_remaining_of_the_year += get_days(month, yy1) ;

  }


  let present_year_days = dd2;

  for(let month = 1; month < mm2; month++) {

    present_year_days += get_days(month, yy2);

  }

  days += days_remaining_of_the_year + present_year_days;


  if( yy1 == yy2 ) {

    let days_till_dd1 = dd1;
    for( let month = 1 ; month < mm1 ; month++ )  days_till_dd1 +=  get_days(month, yy1);

    return present_year_days - days_till_dd1 ;
  }

  return days;

}


console.log(numberOfDays(04, 07, 1998, 30, 11, 2021));

export class MMMonthInfo {
    // constructor() {
    //     this.numberOfDays = 0;
    //     this.firstDay = null;
    //     this.weekNumberOfFirstDay = 0;
    // }
    constructor(numberOfDays, firstDay, weekNumberOfFirstDay) {
        this.numberOfDays = numberOfDays;
        this.firstDay = firstDay;
        this.weekNumberOfFirstDay = weekNumberOfFirstDay;
    }

    getTitle() {
        return this.firstDay.getFullYear() + '年' + (this.firstDay.getMonth() + 1) + '月'
    }

    numberOfLines() {
      return Math.ceil((this.numberOfDays + this.weekNumberOfFirstDay) / 7);
    }
}

export class MMCalendar {
  constructor() {
    this.today = new Date();
    this.offsetOfMonth =  0;

    this.prevMonthInfo = null;
    this.currentMonthInfo = null;
    this.nextMonthInfo = null;
  }
    // 获取输入月份的天数
  getNumberOfDays(year, month) {
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
      monthDays[1] = 29;
    }
      return monthDays[month];
  }

  getMonthInfo(year, month) {
    var numberOfDays = this.getNumberOfDays(year, month);
    var firstDay = new Date(year, month, 1);
    var weekNumber = firstDay.getUTCDay();     // 0-6
    return new MMMonthInfo(numberOfDays, firstDay, weekNumber);
  }

  // 注意调用顺序
  buildDays() {
    this.buildCurrentMonth();
    this.buildPrevMonth();
    this.buildNextMonth();
  }

  buildCurrentMonth() {
    var year = this.today.getFullYear();
    var month = this.today.getMonth() + this.offsetOfMonth; // 0-11

    if(month < 0) {
      while(month < 0) {
        month += 12;
        year -= 1;
      }
    } else if (month > 11) {
      while(month > 11) {
        month -= 12;
        year += 1;
      }
    }

    this.currentMonthInfo = this.getMonthInfo(year, month);
  }

  buildPrevMonth() {
    var dateInCurrentMonth = this.currentMonthInfo.firstDay;

    var year = dateInCurrentMonth.getFullYear();
    var month = dateInCurrentMonth.getMonth() - 1;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
    this.prevMonthInfo = this.getMonthInfo(year, month);
  }

  buildNextMonth() {
    var dateInCurrentMonth = this.currentMonthInfo.firstDay;

    var year = dateInCurrentMonth.getFullYear();
    var month = dateInCurrentMonth.getMonth() + 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    this.nextMonthInfo = this.getMonthInfo(year, month);
  }

  moveToPrevMonth() {
    this.nextMonthInfo = this.currentMonthInfo;
    this.currentMonthInfo = this.prevMonthInfo;
    this.buildPrevMonth();
  }

  moveToNextMonth() {
    this.prevMonthInfo = this.currentMonthInfo;
    this.currentMonthInfo = this.nextMonthInfo;
    this.buildNextMonth();
  }
};

// export default {
//     MMMonthInfo,
//     MMCalendar
// }
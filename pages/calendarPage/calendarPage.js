import {MMMonthInfo, MMCalendar} from '../../utils/MMCalendar.js'

var calendar = new MMCalendar();

Page({
  data: {
    daysOfPreMonth: null,
    daysOfCurrentMonth: null,
    daysOfNextMonth: null,
    dataForRenderMonth: null,
  },

  refreshCalendar: function(calendar) {
    var windowWidth = getApp().globalData.systemInfo.windowWidth - 44 * 2;
    var itemCountEachRow = 7;
	  var margin = 0;
    var itemSize = (windowWidth - itemCountEachRow * 2 * margin) / itemCountEachRow;

    var numberOfLines = calendar.currentMonthInfo.numberOfLines();

    // render days
    var cellArray = [];
    for (var k = 0; k < numberOfLines * 7; ++k) {
      cellArray.push(k);
    }

    this.setData({
      dataForRenderMonth: {cellArray: cellArray},
      monthInfo: calendar.currentMonthInfo,
      title: calendar.currentMonthInfo.getTitle(),
      margin : margin,
      itemSize : itemSize,
    });
  },

  onLoad: function(options) {
    // Do some initialize when page load.
    calendar.buildDays();

    this.refreshCalendar(calendar);
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
    // wx.setNavigationBarTitle = "第1页";
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down
  },
  onTouchPrevButton: function() {
    calendar.moveToPrevMonth();
    this.refreshCalendar(calendar);
  },
  onTouchNextButton: function() {
    calendar.moveToNextMonth();
    this.refreshCalendar(calendar);
  }
})
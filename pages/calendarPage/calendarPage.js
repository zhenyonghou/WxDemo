import utils from '../../utils/utils.js';
import {MMMonthInfo, MMCalendar} from '../../utils/MMCalendar.js'
import MMMensesCalculator from '../../utils/MMMensesCalculator.js'
import MensInfoMgr from '../../utils/mensInfoMgr.js';
var mensInfoMgr = MensInfoMgr.getInstance();

var calendar = new MMCalendar();
var mensesCalc = null;

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

    let typeArray = mensesCalc.getDaysTypeArray(calendar.currentMonthInfo);

    this.setData({
      dataForRenderMonth: {cellArray: cellArray, typeArray: typeArray},
      monthInfo: calendar.currentMonthInfo,
      title: calendar.currentMonthInfo.getTitle(),
      margin : margin,
      itemSize : itemSize,
    });
  },

  onLoad: function(options) {
    // Do some initialize when page load.
    mensesCalc = new MMMensesCalculator(utils.dateFromString(mensInfoMgr.lastDate), mensInfoMgr.cycle, mensInfoMgr.numberOfDays);
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
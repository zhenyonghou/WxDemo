App({
    onLaunch: function() {
        // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.globalData.systemInfo = res;
            }
        });
    },
    onShow: function() {
        // 当小程序启动，或从后台进入前台显示
    },
    onHide: function() {
        // 当小程序从前台进入后台
    },
    globalData:{
        systemInfo:{},
        selectedLocalPhotos:[]
    }
})
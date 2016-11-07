class MMMensesCalculator {
    constructor() {
        this.lastMensesDate = null;
        this.cycle = null;
        this.menses = 0;
    }

    init(lastMensesDate, cycle, menses) {
        this.lastMensesDate = lastMensesDate;
        this.cycle = cycle;
        this.menses = menses;
    }

    // 返回: 经期1, 危险期2, 安全期3, 其它-1
    calcDate(date) {
        // 距离用户设定的月经第一天的天数
        var escapedTime = Math.floor((date.getTime() - this.lastMensesDate.getTime()) / (24 * 60 * 60 * 1000));
        // 距离上次月经第一天的天数
        var escapedLastMenses = (escapedTime % this.cycle + this.cycle) % this.cycle;

        var ret = -1;
        if (escapedLastMenses >= 0 && escapedLastMenses < this.menses) {
            console.log("这是月经期，要注意经期卫生，避免性事");
            ret = 1;
        } else if (escapedLastMenses >= this.menses && escapedLastMenses <= (this.cycle - 20)) {
            coonsole.log("这是安全期，性事一般不会受孕，您放心吧");
            ret = 3;
        } else if (escapedLastMenses >= (this.cycle - 19) && escapedLastMenses <= (this.cycle - 10)) {
            console.log("这是危险期，亦称排卵期，性事受孕可能性大，千万要注意");
            ret = 2;
        } else if (escapedLastMenses >= (this.cycle - 9) && escapedLastMenses <= (this.cycle - 1)) {
            console.log("这是安全期，性事一般不会受孕，您放心吧");
            ret = 3;
        } else {
            console.log("经期算法错误！");
        }
        return ret;
    }
};

export default MMMensesCalculator;
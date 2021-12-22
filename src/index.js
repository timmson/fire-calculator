import "bootstrap";
import "./index.scss";

import Accounting from "accounting";
import Vue from "vue";


function buildIncrement(date, initialBalance, monthlyAmount, monthlyRate) {
    const increment = {
        date: date,
        initialBalance: initialBalance,
        monthlyRate: monthlyRate
    }
    increment.dividendAmount = increment.initialBalance * increment.monthlyRate;

    const amounts = [monthlyAmount + increment.dividendAmount, monthlyAmount].sort();
    increment.monthlyAmount = amounts[0];
    increment.incrementAmount = amounts[1];

    increment.finalBalance = increment.initialBalance + increment.incrementAmount;
    return increment;
}

const telegramShareUrl = "https://t.me/share/url";

const params = new URL(window.location.href).searchParams;

const request = {
    startAmount: params.get("startAmount") || "-5000000",
    monthlyAmount: params.get("monthlyAmount") || "150000",
    startDate: params.get("startDate") || new Intl.DateTimeFormat("ru").format(new Date()),
    rate: params.get("percent") || 4,
    targetIncome: params.get("targetIncome") || "40000",
};

new Vue({
    el: "#app",
    data: {
        currentYear: new Date().getFullYear().toString(),
        shareUrl: "",
        request: request,
        schedule: {
            increments: []
        }
    },
    methods: {

        updateSchedule: function () {
            this.request.startAmount = this.fromMoney(this.request.startAmount);
            this.request.monthlyAmount = this.fromMoney(this.request.monthlyAmount);
            this.request.targetIncome = this.fromMoney(this.request.targetIncome);
            this.request.startDate = this.fromDate(this.request.startDate);
            const monthlyRate = this.request.rate / (12 * 100);

            this.schedule = {};
            const initialIncrement = buildIncrement(this.request.startDate, 0, this.request.startAmount, monthlyRate);
            this.schedule.increments = [initialIncrement];

            let i = 1;
            let currentIncome = this.schedule.increments[this.schedule.increments.length - 1].dividendAmount;
            while (currentIncome < this.request.targetIncome) {
                const lastDate = this.schedule.increments[i - 1].date;

                const increment = buildIncrement(
                    new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, lastDate.getDate()),
                    this.schedule.increments[i - 1].finalBalance,
                    this.request.monthlyAmount,
                    monthlyRate
                )

                const increment1 = {
                    date: new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, lastDate.getDate()),
                    initialBalance: this.schedule.increments[i - 1].finalBalance,
                    monthlyRate: this.schedule.increments[i - 1].monthlyRate
                }
                /*increment.dividendAmount = increment.initialBalance * increment.monthlyRate;
                increment.monthlyAmount = this.request.monthlyAmount + ((increment.dividendAmount < 0) ? increment.dividendAmount : 0);
                increment.incrementAmount = increment.monthlyAmount + increment.dividendAmount
                increment.finalBalance = increment.initialBalance + increment.incrementAmount;*/
                this.schedule.increments.push(increment);

                currentIncome = this.schedule.increments[this.schedule.increments.length - 1].dividendAmount;
                i++;
            }

            this.schedule.targetAmount = this.toMoney(this.schedule.increments[this.schedule.increments.length - 1].finalBalance);
            this.schedule.lastPaymentDate = this.toDate(this.schedule.increments[this.schedule.increments.length - 1].date);
            this.schedule.termInYear = Math.ceil(i / 12);

            this.request.startAmount = this.toMoney(this.request.startAmount);
            this.request.monthlyAmount = this.toMoney(this.request.monthlyAmount);
            this.request.targetIncome = this.toMoney(this.request.targetIncome);
            this.request.startDate = this.toDate(this.request.startDate);
        },

        toDate: function (date) {
            return new Intl.DateTimeFormat("ru").format(date);
        },

        fromDate: function (date) {
            return new Date(date.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1'));
        },


        toMoney: function (number) {
            return number ? Accounting.formatMoney(number, {symbol: "", format: "%s%v", thousand: " "}) : number;
        },

        fromMoney: function (numberWithSpaces) {
            return parseFloat(numberWithSpaces ? numberWithSpaces.toString().split(" ").join("").replaceAll(",", ".") : "0");
        }
    },

    mounted() {
        this.updateSchedule(null);
    }
});
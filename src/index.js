import "bootstrap";
import "./index.scss";

import Vue from "vue";
import Accounting from "accounting";
import ScheduleBuilder from "./schedule-builder";

const Privilege = {
	NONE: "NONE",
	A: "A",
	B: "B"
};

const telegramShareUrl = "https://t.me/share/url";
const params = new URL(window.location.href).searchParams;
const request = {
	startAmount: params.get("startAmount") || "100000",
	monthlyAmount: params.get("monthlyAmount") || "50000",
	startDate: params.get("startDate") || new Intl.DateTimeFormat("ru").format(new Date()),
	rate: params.get("rate") || 4,
	tax: params.get("tax") || 13,
	taxPrivilege: params.get("taxPrivilege") || Privilege.NONE,
	taxPrivilegeAmount: 400000,
	targetIncome: params.get("targetIncome") || "30000",
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
			this.request.startDate = this.fromDate(this.request.startDate);
			this.request.startAmount = this.fromMoney(this.request.startAmount);
			this.request.monthlyAmount = this.fromMoney(this.request.monthlyAmount);
			this.request.targetIncome = this.fromMoney(this.request.targetIncome);
			this.request.monthlyRate = this.request.rate / (12 * 100);
			this.request.taxRate = this.request.tax / 100;
			this.request.taxPrivilegeMonthlyAmount = this.request.taxPrivilegeAmount / 12;

			this.schedule = new ScheduleBuilder(this.request).build();

			this.request.startDate = this.toDate(this.request.startDate);

			params.set("startAmount", this.request.startAmount);
			params.set("monthlyAmount", this.request.monthlyAmount);
			params.set("startDate", this.request.startDate);
			params.set("rate", this.request.rate);
			params.set("targetIncome", this.request.targetIncome);
			window.history.replaceState({}, "F.I.R.E. Calculator", "?" + params.toString());
			this.shareUrl = `${telegramShareUrl}?url=${encodeURIComponent(window.location.href)}`;

			this.request.startAmount = this.toMoney(this.request.startAmount);
			this.request.monthlyAmount = this.toMoney(this.request.monthlyAmount);
			this.request.targetIncome = this.toMoney(this.request.targetIncome);
		},

		toDate: function (date) {
			return new Intl.DateTimeFormat("ru").format(date);
		},

		fromDate: function (date) {
			return new Date(date.replace(/(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1"));
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
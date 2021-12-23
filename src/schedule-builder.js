class ScheduleBuilder {

	constructor(request) {
		this.request = request;
	}

	build() {
		const schedule = {};
		const initialIncrement = this.buildIncrement(this.request.startDate, 0, this.request.startAmount);
		schedule.increments = [initialIncrement];

		let i = 1;
		let currentIncome = schedule.increments[schedule.increments.length - 1].dividendAmount;
		while (currentIncome < this.request.targetIncome) {
			const lastDate = schedule.increments[i - 1].date;

			const increment = this.buildIncrement(
				new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, lastDate.getDate()),
				schedule.increments[i - 1].finalBalance
			);

			schedule.increments.push(increment);

			currentIncome = schedule.increments[schedule.increments.length - 1].dividendAmount;
			i++;
		}

		schedule.targetAmount = schedule.increments[schedule.increments.length - 1].finalBalance;
		schedule.lastPaymentDate = schedule.increments[schedule.increments.length - 1].date;
		schedule.termInYear = Math.ceil(i / 12);

		return schedule;
	}

	buildIncrement(date, initialBalance, deposit) {
		const increment = {
			date: date,
			initialBalance: initialBalance,
			monthlyRate: this.request.monthlyRate,
			taxRate: this.request.taxRate
		};

		const monthlyDeposit = deposit || this.request.monthlyAmount;

		increment.dividendAmount = increment.initialBalance * increment.monthlyRate;

		if (increment.dividendAmount >= 0) {

			increment.monthlyAmount = monthlyDeposit;

			if (this.request.taxPrivilege === "B") {
				increment.taxAmount = 0;
			} else {
				increment.taxAmount = -increment.dividendAmount * increment.taxRate;

				if (this.request.taxPrivilege === "A") {
					increment.taxAmount += Math.min(this.request.taxPrivilegeMonthlyAmount, monthlyDeposit) * increment.taxRate;
				}
			}

			increment.incrementAmount = increment.monthlyAmount + increment.dividendAmount + increment.taxAmount;
		} else {
			increment.taxAmount = 0;
			increment.incrementAmount = monthlyDeposit;
			increment.monthlyAmount = increment.incrementAmount + increment.dividendAmount;
		}

		increment.finalBalance = increment.initialBalance + increment.incrementAmount;
		return increment;
	}

}

module.exports = ScheduleBuilder;
class ScheduleBuilder {

	build(request) {
		const schedule = {};
		const initialIncrement = this.buildIncrement(request.startDate, 0, request.startAmount, request.monthlyRate);
		schedule.increments = [initialIncrement];

		let i = 1;
		let currentIncome = schedule.increments[schedule.increments.length - 1].dividendAmount;
		while (currentIncome < request.targetIncome) {
			const lastDate = schedule.increments[i - 1].date;

			const increment = this.buildIncrement(
				new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, lastDate.getDate()),
				schedule.increments[i - 1].finalBalance,
				request.monthlyAmount,
				request.monthlyRate
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

	buildIncrement(date, initialBalance, monthlyAmount, monthlyRate) {
		const increment = {
			date: date,
			initialBalance: initialBalance,
			monthlyRate: monthlyRate
		};
		increment.dividendAmount = increment.initialBalance * increment.monthlyRate;

		const amounts = [monthlyAmount + increment.dividendAmount, monthlyAmount].sort((a, b) => a - b);

		increment.monthlyAmount = amounts[0];
		increment.incrementAmount = amounts[1];

		increment.finalBalance = increment.initialBalance + increment.incrementAmount;
		return increment;
	}

}

module.exports = ScheduleBuilder;
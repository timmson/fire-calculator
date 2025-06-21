import {RequestType, ScheduleIncrementType, ScheduleType} from "./types"

class ScheduleBuilder {

	private request: RequestType

	constructor(request: RequestType) {
		this.request = request
	}

	build(): ScheduleType {
		const schedule: ScheduleType = {increments: []}
		const initialIncrement = this.buildIncrement(this.request.startDate, 0, this.request.startAmount)
		schedule.increments = [initialIncrement]

		let i = 1
		let currentIncome = schedule.increments[schedule.increments.length - 1].dividendAmount
		while (currentIncome < this.request.targetIncome) {
			const lastDate = schedule.increments[i - 1].date

			const increment = this.buildIncrement(
				new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, lastDate.getDate()),
				schedule.increments[i - 1].finalBalance
			)

			schedule.increments.push(increment)

			currentIncome = schedule.increments[schedule.increments.length - 1].dividendAmount + schedule.increments[schedule.increments.length - 1].projectedTaxAmount
			i++
		}

		schedule.targetAmount = schedule.increments[schedule.increments.length - 1].finalBalance
		schedule.lastPaymentDate = schedule.increments[schedule.increments.length - 1].date
		schedule.termInYear = Math.ceil(i / 12)

		return schedule
	}

	buildIncrement(date: Date, initialBalance: number, deposit?: number): ScheduleIncrementType {
		const increment: ScheduleIncrementType = {
			date: date,
			initialBalance: initialBalance,
			monthlyRate: this.request.incomeRate / 12,
			taxRate: this.request.taxRate,
			recoverAmount: 0
		}

		const monthlyDeposit = deposit || this.request.monthlyAmount

		increment.dividendAmount = increment.initialBalance * increment.monthlyRate
		increment.projectedTaxAmount = -increment.dividendAmount * increment.taxRate

		if (increment.initialBalance >= 0 && monthlyDeposit >= 0) {
			increment.recoverAmount = this.request.taxPrivilege ? Math.min(this.request.taxContributionRecoverLimit / 12, monthlyDeposit) * increment.taxRate : 0
		}

		if (increment.dividendAmount >= 0) {
			increment.monthlyAmount = monthlyDeposit
			increment.taxAmount = this.request.taxPrivilege ? 0 : increment.projectedTaxAmount
		} else {
			increment.taxAmount = 0
			increment.incrementAmount = monthlyDeposit
			increment.monthlyAmount = increment.incrementAmount + increment.dividendAmount
		}

		increment.incrementAmount = increment.monthlyAmount + increment.dividendAmount + increment.taxAmount + increment.recoverAmount
		increment.finalBalance = increment.initialBalance + increment.incrementAmount

		return increment
	}

}

export default ScheduleBuilder

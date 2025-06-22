import {fromDate, toDate} from "../util/date"
import {fromMoney, toMoney} from "../util/money"
import ScheduleBuilder from "../schedule/schedule-builder"
import {State, StateSchedule} from "./reducer"
import {RequestType} from "../schedule/types"

export const buildSchedule = (state: State): StateSchedule => {
	const request: RequestType = {
		startDate: fromDate(state.startDate),
		startAmount: fromMoney(state.startAmount),
		monthlyAmount: fromMoney(state.monthlyAmount),
		incomeRate: fromMoney(state.rate) / 100,
		targetIncome: fromMoney(state.targetIncome),
		targetAmount: fromMoney(state.targetAmount),
		taxRate: fromMoney(state.tax) / 100,
		taxPrivilege: state.taxPrivilege,
		taxContributionRecoverLimit: fromMoney(state.taxContributionRecoverLimit),
		taxIncomeRecoverLimit: fromMoney(state.taxIncomeRecoverLimit),
	}

	const schedule = new ScheduleBuilder(request).build()

	return {
		...schedule,
		targetAmount: toMoney(schedule.targetAmount),
		lastPaymentDate: toDate(schedule.lastPaymentDate),
		increments: schedule.increments.map((it) => {
			return ({
				date: toDate(it.date),
				initialBalance: toMoney(it.initialBalance),
				monthlyAmount: toMoney(it.monthlyAmount),
				recoverAmount: toMoney(it.recoverAmount),
				dividendAmount: toMoney(it.dividendAmount),
				taxAmount: toMoney(it.taxAmount),
				incrementAmount: toMoney(it.incrementAmount),
				finalBalance: toMoney(it.finalBalance)
			})
		})
	}
}

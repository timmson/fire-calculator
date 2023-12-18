import {fromDate, toDate} from "../util/date"
import {fromMoney, toMoney} from "../util/money"
import ScheduleBuilder from "../schedule/schedule-builder"
import {State, StateSchedule} from "./reducer"

export const buildSchedule = (state: State): StateSchedule => {
	const request = {
		startDate: fromDate(state.startDate),
		startAmount: fromMoney(state.startAmount),
		monthlyAmount: fromMoney(state.monthlyAmount),
		monthlyRate: fromMoney(state.rate) / (100 * 12),
		targetIncome: fromMoney(state.targetIncome),
		taxRate: 0,
		taxPrivilege: "NONE"
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
				dividendAmount: toMoney(it.dividendAmount),
				taxAmount: toMoney(it.taxAmount),
				incrementAmount: toMoney(it.incrementAmount),
				finalBalance: toMoney(it.finalBalance)
			})
		})
	}
}

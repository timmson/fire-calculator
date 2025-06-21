import ScheduleBuilder from "../../src/schedule/schedule-builder"
import {RequestType} from "../../src/schedule/types"

describe("Schedule should", () => {

	test("build", () => {
		const request: RequestType = {
			startDate: new Date(2011, 12, 25),
			startAmount: 100,
			monthlyAmount: 10,
			targetIncome: 5,
			incomeRate: 12 / 100,
			taxRate: 13 / 100,
			taxPrivilege: false,
			taxContributionRecoverLimit: 0,
			taxIncomeRecoverLimit: 0
		}

		const scheduleBuilder = new ScheduleBuilder(request)
		const schedule = scheduleBuilder.build()

		expect(schedule.increments).toHaveLength(40)
		expect(schedule.targetAmount).toEqual(602.1511881041255)
		expect(schedule.lastPaymentDate).toEqual(new Date(2015, 3, 25))
		expect(schedule.termInYear).toEqual(4)
	})

	test("buildIncrement with positive dividends and IIA type A", () => {
		const request: RequestType = {
			startDate: new Date(2011, 12, 25),
			startAmount: 100,
			monthlyAmount: 10,
			targetIncome: 5,
			incomeRate: 12 / 100,
			taxRate: 13 / 100,
			taxPrivilege: true,
			taxContributionRecoverLimit: 400000,
			taxIncomeRecoverLimit: 3000000
		}

		const scheduleBuilder = new ScheduleBuilder(request)
		const increment = scheduleBuilder.buildIncrement(null, request.startAmount)

		expect(increment.initialBalance).toEqual(request.startAmount)
		expect(increment.monthlyRate).toEqual(request.incomeRate / 12)
		expect(increment.dividendAmount).toEqual(1)
		expect(increment.monthlyAmount).toEqual(10)
		expect(increment.incrementAmount).toEqual(12.3)
		expect(increment.taxAmount).toEqual(0)
		expect(increment.finalBalance).toEqual(112.3)
	})

	test("buildIncrement with positive dividends and tax", () => {
		const request: RequestType = {
			startDate: new Date(2011, 12, 25),
			startAmount: 100,
			monthlyAmount: 10,
			targetIncome: 5,
			incomeRate: 12 / 100,
			taxRate: 13 / 100,
			taxPrivilege: false,
			taxContributionRecoverLimit: 0,
			taxIncomeRecoverLimit: 0
		}

		const scheduleBuilder = new ScheduleBuilder(request)
		const increment = scheduleBuilder.buildIncrement(null, request.startAmount)

		expect(increment.initialBalance).toEqual(request.startAmount)
		expect(increment.monthlyRate).toEqual(request.incomeRate / 12)
		expect(increment.dividendAmount).toEqual(1)
		expect(increment.monthlyAmount).toEqual(request.monthlyAmount)
		expect(increment.incrementAmount).toEqual(10.87)
		expect(increment.taxAmount).toEqual(-0.13)
		expect(increment.finalBalance).toEqual(110.87)
	})

	test("buildIncrement with positive dividends", () => {
		const request:RequestType = {
			startDate: new Date(2011, 12, 25),
			startAmount: 100,
			monthlyAmount: 10,
			targetIncome: 5,
			incomeRate: 12 / 100,
			taxRate: 0,
			taxPrivilege: false,
			taxContributionRecoverLimit: 0,
			taxIncomeRecoverLimit: 0
		}

		const scheduleBuilder = new ScheduleBuilder(request)
		const increment = scheduleBuilder.buildIncrement(null, request.startAmount)

		expect(increment.initialBalance).toEqual(request.startAmount)
		expect(increment.monthlyRate).toEqual(request.incomeRate / 12)
		expect(increment.dividendAmount).toEqual(1)
		expect(increment.monthlyAmount).toEqual(request.monthlyAmount)
		expect(increment.incrementAmount).toEqual(11)
		expect(increment.finalBalance).toEqual(111)
	})

	test("buildIncrement with negative dividends", () => {
		const request : RequestType= {
			startDate: new Date(2011, 12, 25),
			startAmount: 100,
			monthlyAmount: 10,
			targetIncome: 5,
			incomeRate: 12 / 100,
			taxRate: 0,
			taxPrivilege: false,
			taxContributionRecoverLimit: 0,
			taxIncomeRecoverLimit: 0
		}

		const date = new Date(2011, 12, 25)
		const initialBalance = -100
		const monthlyRate = 0.01
		const scheduleBuilder = new ScheduleBuilder(request)

		const increment = scheduleBuilder.buildIncrement(date, initialBalance)

		expect(increment.date).toEqual(date)
		expect(increment.initialBalance).toEqual(initialBalance)
		expect(increment.monthlyRate).toEqual(monthlyRate)
		expect(increment.dividendAmount).toEqual(-1)
		expect(increment.monthlyAmount).toEqual(9)
		expect(increment.incrementAmount).toEqual(8)
		expect(increment.finalBalance).toEqual(-92)
	})
})

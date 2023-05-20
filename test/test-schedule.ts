import ScheduleBuilder from "../src/schedule-builder"

describe("Schedule should", () => {

	test("build", () => {
		const request = {
			startDate: new Date(2011, 12, 25),
			startAmount: 100,
			monthlyAmount: 10,
			monthlyRate: 12 / (100 * 12),
			targetIncome: 5,
			taxRate: 0,
			taxPrivilege: "NONE"
		}

		const scheduleBuilder = new ScheduleBuilder(request)
		const schedule = scheduleBuilder.build()

		expect(schedule.increments).toHaveLength(34)
		expect(schedule.targetAmount).toEqual(527.5590938480487)
		expect(schedule.lastPaymentDate).toEqual(new Date(2014, 9, 25))
		expect(schedule.termInYear).toEqual(3)
	})

	test("buildIncrement with positive dividends and IIA type A", () => {
		const request = {
			startDate: new Date(2011, 12, 25),
			startAmount: 100,
			monthlyAmount: 10,
			monthlyRate: 12 / (100 * 12),
			targetIncome: 5,
			taxRate: 13 / 100,
			taxPrivilege: "A",
			taxPrivilegeMonthlyAmount: 400000 / 12
		}

		const scheduleBuilder = new ScheduleBuilder(request)
		const increment = scheduleBuilder.buildIncrement(null, request.startAmount)

		expect(increment.initialBalance).toEqual(request.startAmount)
		expect(increment.monthlyRate).toEqual(request.monthlyRate)
		expect(increment.dividendAmount).toEqual(1)
		expect(increment.monthlyAmount).toEqual(10)
		expect(increment.incrementAmount).toEqual(12.17)
		expect(increment.taxAmount).toEqual(-0.13 + 1.3)
		expect(increment.finalBalance).toEqual(112.17)
	})

	test("buildIncrement with positive dividends and tax", () => {
		const request = {
			startDate: new Date(2011, 12, 25),
			startAmount: 100,
			monthlyAmount: 10,
			monthlyRate: 12 / (100 * 12),
			targetIncome: 5,
			taxRate: 13 / 100,
			taxPrivilege: "NONE"
		}

		const scheduleBuilder = new ScheduleBuilder(request)
		const increment = scheduleBuilder.buildIncrement(null, request.startAmount)

		expect(increment.initialBalance).toEqual(request.startAmount)
		expect(increment.monthlyRate).toEqual(request.monthlyRate)
		expect(increment.dividendAmount).toEqual(1)
		expect(increment.monthlyAmount).toEqual(request.monthlyAmount)
		expect(increment.incrementAmount).toEqual(10.87)
		expect(increment.taxAmount).toEqual(-0.13)
		expect(increment.finalBalance).toEqual(110.87)
	})

	test("buildIncrement with positive dividends", () => {
		const request = {
			startDate: new Date(2011, 12, 25),
			startAmount: 100,
			monthlyAmount: 10,
			monthlyRate: 12 / (100 * 12),
			targetIncome: 5,
			taxRate: 0,
			taxPrivilege: "NONE"
		}

		const scheduleBuilder = new ScheduleBuilder(request)
		const increment = scheduleBuilder.buildIncrement(null, request.startAmount)

		expect(increment.initialBalance).toEqual(request.startAmount)
		expect(increment.monthlyRate).toEqual(request.monthlyRate)
		expect(increment.dividendAmount).toEqual(1)
		expect(increment.monthlyAmount).toEqual(request.monthlyAmount)
		expect(increment.incrementAmount).toEqual(11)
		expect(increment.finalBalance).toEqual(111)
	})

	test("buildIncrement with negative dividends", () => {
		const request = {
			startDate: new Date(2011, 12, 25),
			startAmount: 100,
			monthlyAmount: 10,
			monthlyRate: 12 / (100 * 12),
			targetIncome: 5,
			taxRate: 0,
			taxPrivilege: "NONE"
		}

		const date = new Date(2011, 12, 25)
		const initialBalance = -100
		const monthlyAmount = 10
		const monthlyRate = 0.01
		const scheduleBuilder = new ScheduleBuilder(request)

		const increment = scheduleBuilder.buildIncrement(date, initialBalance)

		expect(increment.date).toEqual(date)
		expect(increment.initialBalance).toEqual(initialBalance)
		expect(increment.monthlyRate).toEqual(monthlyRate)
		expect(increment.dividendAmount).toEqual(-1)
		expect(increment.monthlyAmount).toEqual(9)
		expect(increment.incrementAmount).toEqual(monthlyAmount)
		expect(increment.finalBalance).toEqual(-90)
	})
})
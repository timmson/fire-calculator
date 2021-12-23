const ScheduleBuilder = require("../src/schedule-builder.js");

describe("Schedule should", () => {

	const scheduleBuilder = new ScheduleBuilder();

	test("build", () => {
		const request = {
			startDate: new Date(2011, 12, 25),
			startAmount: 100,
			monthlyAmount: 10,
			monthlyRate: 4 / (100 * 12),
			targetIncome: 5
		};

		const schedule = scheduleBuilder.build(request);

		expect(schedule.increments).toHaveLength(114);
		expect(schedule.targetAmount).toEqual(1515.1679841260823);
		expect(schedule.lastPaymentDate).toEqual(new Date(2021, 5, 25));
		expect(schedule.termInYear).toEqual(10);
	});

	test("buildIncrement with positive dividends", () => {
		const date = new Date(2011, 12, 25);
		const initialBalance = 100;
		const monthlyAmount = 10;
		const monthlyRate = 0.01;

		const increment = scheduleBuilder.buildIncrement(date, initialBalance, monthlyAmount, monthlyRate);

		expect(increment.date).toEqual(date);
		expect(increment.initialBalance).toEqual(initialBalance);
		expect(increment.monthlyRate).toEqual(monthlyRate);
		expect(increment.dividendAmount).toEqual(1);
		expect(increment.monthlyAmount).toEqual(monthlyAmount);
		expect(increment.incrementAmount).toEqual(11);
		expect(increment.finalBalance).toEqual(111);
	});

	test("buildIncrement with negative dividends", () => {
		const date = new Date(2011, 12, 25);
		const initialBalance = -100;
		const monthlyAmount = 10;
		const monthlyRate = 0.01;

		const increment = scheduleBuilder.buildIncrement(date, initialBalance, monthlyAmount, monthlyRate);

		expect(increment.date).toEqual(date);
		expect(increment.initialBalance).toEqual(initialBalance);
		expect(increment.monthlyRate).toEqual(monthlyRate);
		expect(increment.dividendAmount).toEqual(-1);
		expect(increment.monthlyAmount).toEqual(9);
		expect(increment.incrementAmount).toEqual(monthlyAmount);
		expect(increment.finalBalance).toEqual(-90);
	});
});
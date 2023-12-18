import {fromDate, toDate} from "../../src/util/date"

describe("Date should", () => {

	test("transform to date", () => {
		const actual = toDate(new Date("2023-12-18"))

		expect(actual).toEqual("18.12.2023")
	})

	test("transform from date", () => {
		const actual = fromDate("18.12.2023")

		expect(actual).toEqual(new Date("2023-12-18"))
	})

})

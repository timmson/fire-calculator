import {fromMoney, toMoney} from "../../src/util/money"

describe("Money should", () => {

	test("transform to money", () => {
		const actual = toMoney(1000.00)

		expect(actual).toEqual("1 000.00")
	})

	test("transform from money", () => {
		const actual = fromMoney("1 000.00")

		expect(actual).toEqual(1000.00)
	})

})

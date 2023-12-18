import Accounting from "accounting"

export const toMoney = (number : number) => {
	return number ? Accounting.formatMoney(number, {symbol: "", format: "%s%v", thousand: " "}) : number
}

export const fromMoney = (numberWithSpaces: string) => {
	return parseFloat(numberWithSpaces ? numberWithSpaces.toString().split(" ").join("").replaceAll(",", ".") : "0")
}

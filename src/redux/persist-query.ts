const params = new URL(window.location.href).searchParams

const fields = {
	startAmount: "50 000.00",
	monthlyAmount: "10 000.00",
	startDate: new Intl.DateTimeFormat("ru").format(new Date()),
	rate: "4.00",
	tax: "13.00",
	taxPrivilege: true,
	targetIncome: "50 000.00",
	targetAmount: "10 000 000.00"
}

export const loadState = () => {
	const state = {
		taxContributionRecoverLimit: "400 000.00",
		taxIncomeRecoverLimit: "30 000 000",
		schedule: {
			termInYear: 0,
			targetAmount: "",
			lastPaymentDate: "",
			increments: []
		}
	}
	Object.keys(fields).forEach((name) => state[name] = params.get(name) || fields[name])
	return {state: state}
}

export const saveState = (rootState) => {
	Object.keys(fields).forEach((name) => {
		params.set(name, rootState.state[name])
	})
	window.history.replaceState({}, "F.I.R.E. Calculator", "?" + params.toString())
}

export const clearState = () => {
	Object.keys(fields).forEach((name) => params.delete(name))
	window.history.replaceState({}, "Loan Amortization Schedule", "?" + params.toString())
}

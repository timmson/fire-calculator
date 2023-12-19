const params = new URL(window.location.href).searchParams

const fields = {
	startAmount: "50 000.00",
	monthlyAmount: "10 000.00",
	startDate: new Intl.DateTimeFormat("ru").format(new Date()),
	rate: "7.5",
	tax: "13.0",
	taxContributionRecover: false,
	taxIncomeFree: false,
	targetIncome: "50 000.00"
}

export const loadState = () => {
	const state = {
		taxContributionRecoverLimit: "400 000.00",
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

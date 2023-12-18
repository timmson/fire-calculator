const KEY = "fire-calculator"

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem(KEY)
		if (!serializedState) return undefined
		return JSON.parse(serializedState)
	} catch (ignore) {
		//ignore
		return undefined
	}
}

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem(KEY, serializedState)
	} catch (ignore) {
		//ignore
	}
}

export const clearState = () => {
	try {
		localStorage.removeItem(KEY)
	} catch (ignore) {
		//ignore
	}
}

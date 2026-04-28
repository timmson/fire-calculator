const KEY = "fire-calculator"

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem(KEY)
		if (!serializedState) return undefined
		return JSON.parse(serializedState)
	} catch {
		return undefined
	}
}

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem(KEY, serializedState)
	} catch {
		// ignore errors
	}
}

export const clearState = () => {
	try {
		localStorage.removeItem(KEY)
	} catch {
		// ignore errors
	}
}

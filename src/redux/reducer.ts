import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {buildSchedule} from "./api"
import {fromMoney, toMoney} from "../util/money"

export interface StateSchedule {
	termInYear?: number
	targetAmount: string
	lastPaymentDate: string
	increments: Array<{
		date: string
		initialBalance: string
		monthlyAmount: string
		recoverAmount: string
		dividendAmount: string
		taxAmount: string
		incrementAmount: string
		finalBalance: string
	}>
}

export interface State {
	startAmount: string
	monthlyAmount: string
	startDate: string
	rate: string
	tax: string
	taxContributionRecover: boolean
	taxIncomeFree: boolean
	targetIncome: string
	schedule: StateSchedule
}

const initialState: State = {
	startAmount: "50 000.00",
	monthlyAmount: "10 000.00",
	startDate: new Intl.DateTimeFormat("ru").format(new Date()),
	rate: "7.5",
	tax: "13.0",
	taxContributionRecover: false,
	taxIncomeFree: false,
	targetIncome: "50 000.00",
	schedule: {
		termInYear: 0,
		targetAmount: "",
		lastPaymentDate: "",
		increments: []
	}
}

export const Slice = createSlice({
	name: "state",
	initialState,
	reducers: {
		updateRequestField: (state: State, action: PayloadAction<{ key: string, value: string | boolean }>) => {
			state[action.payload.key] = action.payload.value
			try {
				state.schedule = buildSchedule(state)
			} catch (ignore) {
				console.error(ignore)
			}
		},
		updateSchedule: (state: State) => {
			try {
				state.schedule = buildSchedule(state)
			} catch (ignore) {
				console.error(ignore)
			}
		},
		formatRequestField: (state: State, action: PayloadAction<{ key: string, value: string }>) => {
			state[action.payload.key] = toMoney(fromMoney(action.payload.value))
		}
	}
})

export default Slice.reducer

export const {updateRequestField, updateSchedule, formatRequestField} = Slice.actions

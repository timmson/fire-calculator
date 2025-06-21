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
    taxPrivilege: boolean;
	taxContributionRecoverLimit: string
	taxIncomeRecoverLimit: string
	targetAmount: string
	targetIncome: string
	schedule: StateSchedule
}

const initialState: State = {
	startAmount: "",
	monthlyAmount: "",
	startDate: "",
	rate: "",
	tax: "",
	taxPrivilege: false,
	taxContributionRecoverLimit: "",
	taxIncomeRecoverLimit: "",
	targetIncome: "",
	targetAmount: "",
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
				//ignore
			}
		},
		updateSchedule: (state: State) => {
			try {
				state.schedule = buildSchedule(state)
			} catch (ignore) {
				//ignore
			}
		},
		formatRequestField: (state: State, action: PayloadAction<{ key: string, value: string }>) => {
			state[action.payload.key] = toMoney(fromMoney(action.payload.value))
		}
	}
})

export default Slice.reducer

export const {updateRequestField, updateSchedule, formatRequestField} = Slice.actions

import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Privilege} from "../types"
import {buildSchedule} from "./api"

export interface StateSchedule {
	termInYear?: number
	targetAmount: string
	lastPaymentDate: string
	increments: Array<{
		date: string
		initialBalance: string
		monthlyAmount: string
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
	taxPrivilege: Privilege,
	taxPrivilegeAmount: string
	targetIncome: string
	schedule: StateSchedule
}

const initialState: State = {
	startAmount: "50000",
	monthlyAmount: "10000",
	startDate: new Intl.DateTimeFormat("ru").format(new Date()),
	rate: "10",
	tax: "13",
	taxPrivilege: Privilege.NONE,
	taxPrivilegeAmount: "0",
	targetIncome: "50000",
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
		updateRequestField: (state: State, action: PayloadAction<{ key: string, value: string }>) => {
			state[action.payload.key] = action.payload.value
			state.schedule = buildSchedule(state)
		},
		updateSchedule: (state: State) => {
			state.schedule = buildSchedule(state)
		}
	}
})

export default Slice.reducer

export const {updateRequestField, updateSchedule} = Slice.actions

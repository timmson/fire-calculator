import {configureStore} from "@reduxjs/toolkit"
import {Slice} from "./reducer"

export const Reducers = {}
const slices = [Slice]
slices.forEach((it) => Reducers[it.name] = it.reducer)

export const Store = configureStore({reducer: Reducers})
export type RootState = ReturnType<typeof Store.getState>

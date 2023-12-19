import {configureStore} from "@reduxjs/toolkit"
import {Slice} from "./reducer"
import {loadState} from "./persist-query"

export const Reducers = {}
const slices = [Slice]
slices.forEach((it) => Reducers[it.name] = it.reducer)

export const Store = configureStore({reducer: Reducers, preloadedState: loadState()})
export type RootState = ReturnType<typeof Store.getState>

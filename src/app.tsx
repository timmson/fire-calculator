import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "./redux/store"
import {updateSchedule} from "./redux/reducer"
import {Schedule} from "./schedule"
import {Form} from "./form"

export const App = () => {

	const state = useSelector((state: RootState) => state.state)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(updateSchedule())
	}, [])

	return (
		<div style={{marginTop: 0, paddingTop: 0}}>
			<Form state={state}/>
			<Schedule schedule={state.schedule}/>
		</div>
	)
}

import React, {useEffect} from "react"
//import {Privilege} from "./types"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "./redux/store"
import {updateRequestField, updateSchedule} from "./redux/reducer"

const currentYear = new Date().getFullYear()
const shareUrl = () => {
	window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`, "blank")
}

//const params = new URL(window.location.href).searchParams

/*const initialState = {
	startAmount: params.get("startAmount") || "100000",
	monthlyAmount: params.get("monthlyAmount") || "50000",
	startDate: params.get("startDate") || new Intl.DateTimeFormat("ru").format(new Date()),
	rate: params.get("rate") || 7,
	tax: params.get("tax") || 13,
	taxPrivilege: params.get("taxPrivilege") || Privilege.NONE,
	taxPrivilegeAmount: 400000,
	targetIncome: params.get("targetIncome") || "50000",
	schedule: {}
}*/

export const App = () => {

	const state = useSelector((state: RootState) => state.state)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(updateSchedule())
	}, [])

	const update = (target: EventTarget & HTMLInputElement) => dispatch(updateRequestField({key: target.id, value: target.value}))

	return (
		<div className="container" style={{marginTop: 0, paddingTop: 0}}>
			<form className="form-horizontal" role="form">
				<div className="row mt-2 text-start">
					<div className="col-3 pt-2">
						<label htmlFor="startAmount">Start amount, $</label>
					</div>
					<div className="col-3">
						<input id="startAmount" name="startAmount" value={state.startAmount} className="form-control" placeholder="Start amount"
							   onChange={(e) => update(e.target)}/>
					</div>
					<div className="col-3">
						<label htmlFor="monthlyAmount">Monthly deposit, $</label>
					</div>
					<div className="col-3">
						<input id="monthlyAmount" name="monthlyAmount" value={state.monthlyAmount} className="form-control" placeholder="Monthly amount"
							   onChange={(e) => update(e.target)}/>
					</div>
				</div>
				<div className="row mt-2 text-start">
					<div className="col-3">
						<label htmlFor="startDate">Start date</label>
					</div>
					<div className="col-3">
						<input id="startDate" value={state.startDate} className="form-control" placeholder="dd.mm.yyyy"
							   onChange={(e) => update(e.target)} type="text"/>
					</div>
					<div className="col-3">
						<label htmlFor="rate">Annual rate, %</label>
					</div>
					<div className="col-3">
						<input id="rate" value={state.rate} className="form-control" placeholder="%" onChange={(e) => update(e.target)}/>
					</div>
				</div>
				<div className="row mt-2 text-left">
					<div className="col-3 pt-2">
						<label htmlFor="tax">Income Tax, %</label>
					</div>
					<div className="col-3">
						<input id="tax" value={state.tax} className="form-control" placeholder="%" onChange={(e) => update(e.target)}/>
					</div>
				</div>
				<div className="row mt-2 text-left">
					<div className="col-3">
						<p>Tax privilege</p>
					</div>
					<div className="col-sm-9">
						<input id="privilege-none" value={state.taxPrivilege} type="radio"/>
						<label htmlFor="privilege-none">No</label>
						&nbsp;
						<input id="privilege-a" value={state.taxPrivilege} type="radio"/>
						<label htmlFor="privilege-a">Contribution deduction aka "ИИС" типа A</label>
						&nbsp;
						<input id="privilege-b" value={state.taxPrivilege} type="radio"/>
						<label htmlFor="privilege-b">Deduction for income aka "ИИС" типа B</label>
					</div>
				</div>
				<hr/>
				<div className="row mt-2 text-left">
					<div className="col-3">
						<label htmlFor="targetIncome">Target Net Income, $</label>
					</div>
					<div className="col-3">
						<input id="targetIncome" value={state.targetIncome} className="form-control" placeholder="Target income, $"
							   onChange={(e) => update(e.target)} />
					</div>
					<div className="col-sm-6">
						&nbsp;
					</div>
				</div>
			</form>
			<hr/>
			<div className="row mt-2">
				<div className="col-9">
					<div style={{color: "#fd680e"}}>
						{state.schedule.targetAmount}, {state.schedule.lastPaymentDate} {state.schedule.termInYear}Y
					</div>
				</div>
				<div className="col-3 text-right">
					<a target="_blank" onClick={() => shareUrl()}>[Share via TG]</a>
					<a id="header" href="#footer">[Bottom &darr;]</a>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-12 text-center">
					<table id="schedule" className="table-bordered w-100">
						<thead>
							<tr>
								<th>Date</th>
								<th>Initial balance, $</th>
								<th>Deposit, $</th>
								<th>Dividends, $</th>
								<th>Tax, $</th>
								<th>Increment, $</th>
								<th>Final balance, $</th>
							</tr>
						</thead>
						<tbody>
							{(state.schedule.increments || []).map((increment, index) => (
								<tr key={index}>
									<td>{increment.date}</td>
									<td>{increment.initialBalance}</td>
									<td>{increment.monthlyAmount}</td>
									<td>{increment.dividendAmount}</td>
									<td>{increment.taxAmount}</td>
									<td>{increment.incrementAmount}</td>
									<td>{increment.finalBalance}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-12 text-right">
					<a id="footer" href="#header">[Top &uarr;]</a>
				</div>
			</div>
			<div className="row mt-5">
				<div className="col-sm-12 text-right">
					<p className="copyright">Copyright &copy; <span>{currentYear}</span> - Designed by timmson</p>
				</div>
			</div>
		</div>
	)
}

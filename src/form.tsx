import React from "react"
import {useDispatch} from "react-redux"
import {formatRequestField, State, updateRequestField} from "./redux/reducer"

interface FormProps {
	state: State
}

export const Form = (props: FormProps) => {

	const dispatch = useDispatch()
	const update = (target: EventTarget & HTMLInputElement) =>
		dispatch(updateRequestField({key: target.id, value: (target.type === "checkbox") ? target.checked : target.value}))

	const format = (target: EventTarget & HTMLInputElement) =>
		dispatch(formatRequestField({key: target.id, value: target.value}))

	return (
		<form className="form-horizontal" role="form">
			<div className="row mt-2 text-start">
				<div className="col-3 pt-2">
					<label htmlFor="startAmount">Start amount, $</label>
				</div>
				<div className="col-3">
					<input id="startAmount" name="startAmount" value={props.state.startAmount} className="form-control" placeholder="Start amount"
						   onChange={(e) => update(e.target)}
						   onBlur={(e) => format(e.target)}
					/>
				</div>
				<div className="col-3">
					<label htmlFor="monthlyAmount">Monthly deposit, $</label>
				</div>
				<div className="col-3">
					<input id="monthlyAmount" name="monthlyAmount" value={props.state.monthlyAmount} className="form-control" placeholder="Monthly amount"
						   onChange={(e) => update(e.target)}
						   onBlur={(e) => format(e.target)}
					/>
				</div>
			</div>
			<div className="row mt-2 text-start">
				<div className="col-3">
					<label htmlFor="startDate">Start date</label>
				</div>
				<div className="col-3">
					<input id="startDate" value={props.state.startDate} className="form-control" placeholder="dd.mm.yyyy"
						   onChange={(e) => update(e.target)} type="text"/>
				</div>
				<div className="col-3">
					<label htmlFor="rate">Annual rate, %</label>
				</div>
				<div className="col-3">
					<input id="rate" name="rate" value={props.state.rate} className="form-control" placeholder="%"
						   onChange={(e) => update(e.target)}
						   onBlur={(e) => format(e.target)}
					/>
				</div>
			</div>
			<div className="row mt-2 text-left">
				<div className="col-3 pt-2">
					<label htmlFor="tax">Income Tax, %</label>
				</div>
				<div className="col-3">
					<input id="tax" value={props.state.tax} className="form-control" placeholder="%"
						   onChange={(e) => update(e.target)}
						   onBlur={(e) => format(e.target)}
					/>
				</div>
			</div>
			<div className="row mt-2 text-left">
				<div className="col-3">
					<label className="form-check-label" htmlFor="taxContributionRecover">Contribution recover (aka ИИС A)</label>
				</div>
				<div className="col-3">
					<div className="form-check form-switch">
						<input className="form-check-input" type="checkbox" role="switch" id="taxContributionRecover" name="taxContributionRecover"
							   checked={props.state.taxContributionRecover}
							   onChange={(e) => update(e.target)}/>
					</div>
				</div>
				<div className="col-3">
					<label className="form-check-label" htmlFor="taxIncomeFree">Tax income free (aka ИИС B)</label>
				</div>
				<div className="col-3">
					<div className="form-check form-switch">
						<input className="form-check-input" type="checkbox" role="switch" id="taxIncomeFree" name="taxIncomeFree"
							   checked={props.state.taxIncomeFree}
							   onChange={(e) => update(e.target)}/>
					</div>
				</div>
			</div>
			<hr/>
			<div className="row mt-2 text-left">
				<div className="col-3">
					<label htmlFor="targetIncome">Target Net Income, $</label>
				</div>
				<div className="col-3">
					<input id="targetIncome" value={props.state.targetIncome} className="form-control" placeholder="Target income, $"
						   onChange={(e) => update(e.target)}
						   onBlur={(e) => format(e.target)}
					/>
				</div>
				<div className="col-sm-6">
					&nbsp;
				</div>
			</div>
		</form>
	)
}

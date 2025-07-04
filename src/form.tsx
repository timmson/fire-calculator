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
			<div className="row">
				<div className="col">
					<h2 className={"orange text-center"}>Калькулятор инерционного дохода</h2>
				</div>
			</div>
			<div className="row text-start">
				<div className="col-lg-3 mt-2">
					<label htmlFor="startAmount">Стартовый капитал, ₽</label>
				</div>
				<div className="col-lg-3 mt-2">
					<input id="startAmount" name="startAmount" value={props.state.startAmount} className="form-control" placeholder="Start amount"
						   onChange={(e) => update(e.target)}
						   onBlur={(e) => format(e.target)}
					/>
				</div>
				<div className="col-lg-3 mt-2">
					<label htmlFor="monthlyAmount">Ежемесячное пополнение, ₽</label>
				</div>
				<div className="col-lg-3 mt-2">
					<input id="monthlyAmount" name="monthlyAmount" value={props.state.monthlyAmount} className="form-control"
						   placeholder="Monthly amount"
						   onChange={(e) => update(e.target)}
						   onBlur={(e) => format(e.target)}
					/>
				</div>
			</div>
			<div className="row text-start">
				<div className="col-lg-3 mt-2">
					<label htmlFor="startDate">Старт инвестирования</label>
				</div>
				<div className="col-lg-3 mt-2">
					<input id="startDate" value={props.state.startDate} className="form-control" placeholder="dd.mm.yyyy"
						   onChange={(e) => update(e.target)} type="text"/>
				</div>
				<div className="col-lg-3 mt-2">
					<label htmlFor="rate">Средняя ставка сверх инфляции, %</label>
				</div>
				<div className="col-lg-3 mt-2">
					<input id="rate" name="rate" value={props.state.rate} className="form-control" placeholder="%"
						   onChange={(e) => update(e.target)}
						   onBlur={(e) => format(e.target)}
					/>
				</div>
			</div>
			<div className="row text-start">
				<div className="col-lg-3 mt-2">
					<label htmlFor="tax">НДФЛ, %</label>
				</div>
				<div className="col-lg-3 mt-2">
					<input id="tax" value={props.state.tax} className="form-control" placeholder="%"
						   onChange={(e) => update(e.target)}
						   onBlur={(e) => format(e.target)}
					/>
				</div>
			</div>
			<div className="row text-start mt-2 pt-2 border-3 border-top">
				<div className="col-lg-6 mt-2">
					<label className="form-check-label" htmlFor="taxPrivilege">
						<span>
							ИИС 3-типа
						</span>
					</label>
				</div>
				<div className="col-lg-6 mt-2">
					<div className="form-check form-switch">
						<input className="form-check-input" type="checkbox" role="switch" id="taxPrivilege" name="taxPrivilege"
							   checked={props.state.taxPrivilege}
							   onChange={(e) => update(e.target)}/>
					</div>
				</div>
			</div>
			<div className="row text-start mt-2">
				<div className="col-lg-3 mt-2">
					<label htmlFor="taxContributionRecoverLimit">Льготный взнос в год, ₽</label>
				</div>
				<div className="col-lg-3 mt-2">
					<input id="taxContributionRecoverLimit" value={props.state.taxContributionRecoverLimit} className="form-control" disabled={true}/>
				</div>
				<div className="col-lg-3 mt-2">
					<label htmlFor="taxIncomeRecoverLimit">Безналоговый доход, ₽</label>
				</div>
				<div className="col-lg-3 mt-2">
					<input id="taxIncomeRecoverLimit" value={props.state.taxIncomeRecoverLimit} className="form-control" disabled={true}/>
				</div>
			</div>
			<div className="row mt-2 text-start border-3 pt-2 pb-2 border-top border-bottom">
				<div className="col-lg-3 mt-2">
					<label htmlFor="targetAmount">Целевой капитал, ₽</label>
				</div>
				<div className="col-lg-3 mt-2">
					<input id="targetAmount" value={props.state.targetAmount} className="form-control" placeholder="Target capitalization, $"
						   onChange={(e) => update(e.target)}
						   onBlur={(e) => format(e.target)}
					/>
				</div>
				<div className="col-lg-3 mt-2">
					<label htmlFor="targetIncome">Целевой доход, ₽</label>
				</div>
				<div className="col-lg-3 mt-2">
					<input id="targetIncome" value={props.state.targetIncome} className="form-control" placeholder="Target income, $"
						   onChange={(e) => update(e.target)}
						   onBlur={(e) => format(e.target)}
					/>
				</div>
			</div>
		</form>
	)
}

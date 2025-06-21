import React from "react"
import {StateSchedule} from "./redux/reducer"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowAltCircleDown, faArrowAltCircleUp} from "@fortawesome/free-regular-svg-icons"

interface SchedulePros {
    schedule: StateSchedule
}

export const Schedule = (props: SchedulePros) => (
	<>
		<div className="row text-start mt-4 orange">
			<div className="col-lg-4 text-center">
				<b>Капитал, ₽</b>: {props.schedule.targetAmount}
			</div>
			<div className="col-lg-4 text-center">
				<b>Инвестировать до</b>: {props.schedule.lastPaymentDate}
			</div>
			<div className="col-lg-4 text-center">
				<b>Срок инвестиций</b>: {props.schedule.termInYear} год(а)/лет
			</div>
		</div>
		<div className="row text-end mt-1">
			<div className="col">
				<a href="#footer" id="header">[Вниз <FontAwesomeIcon icon={faArrowAltCircleDown}/>]</a>
			</div>
		</div>
		<div className="row mt-2">
			<div className="col-12 text-center">
				<table id="schedule" className="table table-hover table-bordered w-100 border-dark">
					<thead>
						<tr className={"desktop"}>
							<th rowSpan={2}><p>Дата</p></th>
							<th rowSpan={2}>Входящих баланс, ₽</th>
							<th rowSpan={2}>Прирост, ₽</th>
							<th colSpan={4}>включая</th>
							<th rowSpan={2}>Исходящих баланс, ₽</th>
						</tr>
						<tr className={"desktop"}>
							<th>Пополнение, ₽</th>
							<th>Вычет на взнос, ₽</th>
							<th>Доход, ₽</th>
							<th>Налог, ₽</th>
						</tr>
						<tr className={"mobile"}>
							<th><p>Дата</p></th>
							<th>Входящих баланс, ₽</th>
							<th>Прирост, ₽</th>
							<th>Исходящих баланс, ₽</th>
						</tr>
					</thead>
					<tbody>
						{
							(props.schedule.increments || []).map((increment, index) => (
								<tr key={index}>
									<td>{increment.date}</td>
									<td>{increment.initialBalance}</td>
									<td>{increment.incrementAmount}</td>
									<td className={"desktop-cell"}>{increment.monthlyAmount}</td>
									<td className={"desktop-cell"}>{increment.recoverAmount}</td>
									<td className={"desktop-cell"}>{increment.dividendAmount}</td>
									<td className={"desktop-cell"}>{increment.taxAmount}</td>
									<td>{increment.finalBalance}</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
		<div className="row">
			<div className="col-12 text-end ps-2">
				<a href="#header" id="footer">[Вверх <FontAwesomeIcon icon={faArrowAltCircleUp}/>]</a>
			</div>
		</div>
	</>
)

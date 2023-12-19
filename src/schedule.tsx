import React from "react"
import {StateSchedule} from "./redux/reducer"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowAltCircleDown, faArrowAltCircleUp} from "@fortawesome/free-regular-svg-icons"

interface SchedulePros {
    schedule: StateSchedule
}

export const Schedule = (props: SchedulePros) => (
	<>
		<div className="row text-start mt-2 orange">
			<div className="col-4 text-center">
				<b>Необходимый капитал, ₽</b>: {props.schedule.targetAmount}
			</div>
			<div className="col-4 text-center">
				<b>Инвестировать до</b>: {props.schedule.lastPaymentDate}
			</div>
			<div className="col-4 text-center">
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
						<tr>
                            <th rowSpan={2}>Дата</th>
                            <th rowSpan={2}>Входящих баланс, ₽</th>
                            <th rowSpan={2}>Прирост, ₽</th>
                            <th colSpan={4}>включая</th>
                            <th rowSpan={2}>Исходящих баланс, ₽</th>
                        </tr>
                        <tr>
                            <th>Пополнение, ₽</th>
                            <th>Вычет на взнос, ₽</th>
                            <th>Доход, ₽</th>
							<th>Налог, ₽</th>
						</tr>
					</thead>
					<tbody>
						{
							(props.schedule.increments || []).map((increment, index) => (
								<tr key={index}>
									<td>{increment.date}</td>
									<td>{increment.initialBalance}</td>
                                    <td>{increment.incrementAmount}</td>
									<td>{increment.monthlyAmount}</td>
									<td>{increment.recoverAmount}</td>
									<td>{increment.dividendAmount}</td>
									<td>{increment.taxAmount}</td>
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

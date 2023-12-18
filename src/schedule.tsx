import React from "react"
import {StateSchedule} from "./redux/reducer"

interface SchedulePros {
	schedule: StateSchedule
}

export const Schedule = (props: SchedulePros) => (
	<>
		<div className="row mt-2">
			<div className="col-9">
				<div style={{color: "#fd680e"}}>
					{props.schedule.targetAmount}, {props.schedule.lastPaymentDate} {props.schedule.termInYear}Y
				</div>
			</div>
			<div className="col-3 text-right">
				<a id="header" href="#footer">[Bottom &darr;]</a>
			</div>
		</div>
		<div className="row">
			<div className="col-12 text-center">
				<table id="schedule" className="table-bordered w-100">
					<thead>
						<tr>
							<th>Date</th>
							<th>Initial balance, $</th>
							<th>Deposit, $</th>
							<th>Recover, $</th>
							<th>Dividends, $</th>
							<th>Tax, $</th>
							<th>Increment, $</th>
							<th>Final balance, $</th>
						</tr>
					</thead>
					<tbody>
						{
							(props.schedule.increments || []).map((increment, index) => (
								<tr key={index}>
									<td>{increment.date}</td>
									<td>{increment.initialBalance}</td>
									<td>{increment.monthlyAmount}</td>
									<td>{increment.recoverAmount}</td>
									<td>{increment.dividendAmount}</td>
									<td>{increment.taxAmount}</td>
									<td>{increment.incrementAmount}</td>
									<td>{increment.finalBalance}</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
		<div className="row">
			<div className="col-sm-12 text-right">
				<a id="footer" href="#header">[Top &uarr;]</a>
			</div>
		</div>
	</>
)

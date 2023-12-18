import "./index.scss"

import React from "react"
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import {Store} from "./redux/store"
import {App} from "./app"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTelegram} from "@fortawesome/free-brands-svg-icons"

const currentYear = new Date().getFullYear()
const shareUrl = () => {
	window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`, "blank")
}

const root = createRoot(document.getElementById("app"))
root.render(
	<div className="container" style={{marginTop: 0, paddingTop: 0}}>
		<Provider store={Store}><App/></Provider>
		<div className="row mt-3">
			<div className="col text-end">
				<a href="#" target="_blank" onClick={() => shareUrl()}>
					[Share via <FontAwesomeIcon icon={faTelegram}/>]
				</a>
				<p className="copyright">&copy; {currentYear} timmson</p>
			</div>
			<div className="col-sm-1">&nbsp;</div>
		</div>
	</div>
)


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

import "./index.scss"

import React from "react"
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import {Store} from "./redux/store"
import {App} from "./app"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTelegram} from "@fortawesome/free-brands-svg-icons"
import {saveState} from "./redux/persist-query"

const currentYear = new Date().getFullYear()
const shareUrl = () => {
	window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`, "blank")
}

Store.subscribe(() => saveState(Store.getState()))

const root = createRoot(document.getElementById("app"))
root.render(
	<div className="container-xxl" style={{marginTop: 0, paddingTop: 0}}>
		<Provider store={Store} children={App}><App/></Provider>
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

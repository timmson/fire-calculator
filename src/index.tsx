import "./index.scss"

import React from "react"
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import {Store} from "./redux/store"

import {App} from "./app"

const root = createRoot(document.getElementById("app"))
root.render(<Provider store={Store}><App/></Provider>)

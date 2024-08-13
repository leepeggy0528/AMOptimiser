import React from "react"
import ReactDOM from "react-dom/client"
import "./css/styles.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
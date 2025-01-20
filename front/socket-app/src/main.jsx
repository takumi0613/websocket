import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Global, css } from '@emotion/react'
import Socket from './componets/socket'
import 'tailwindcss/tailwind.css'

const globalStyles = 
  css`
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  `

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Global styles={globalStyles} />
      <Socket />
    </React.StrictMode>
)

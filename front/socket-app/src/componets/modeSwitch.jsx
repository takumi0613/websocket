/* eslint-disable*/
import React from "react"
import { css } from "@emotion/react"
/* eslint-enable*/

export default function ModeSwitch(props) {
   const button = css({
      width: "60px",
      height: "60px",
      textAlign: "center",
      cursor: "pointer",
      border: "1px solid black",
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: `${props.mode ? "white" : "black"}`,
      color: `${props.mode ? "black" : "white"}`,
   })
   return(
      <>
         <div css={button} onClick={() => props.setMode(!props.mode)}>
            {props.mode ? 'Dark' : 'Light'}
         </div>
      </>
   )
}
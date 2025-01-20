/* eslint-disable*/
import React from "react"
import Chat from "./chat"
import ModeSwitch from "./modeSwitch";
import { useState } from 'react'
import tw, { css } from "twin.macro";
/* eslint-enable*/
export default function Socket() {
    const [mode, setMode] = useState(false)

    const background = css({
        width: "100vw",
        height: "100vh",
        background: `${mode ? "black" : "white"}`,
        color: `${mode ? "white" : "black"}` 
    })

    return (
        <div css={background}>
            <div className="flex gap-5 items-center justify-start">
                <h1 className="text-3xl">
                    Socket
                </h1>
            </div>
            <div className="flex items-center justify-start gap-5">
                {/* {menuList.map((menu, index) => {
                    return (
                        <>
                            <button className={`w-20 h-10 ${mode ? 'text-black' : 'text-white'} ${mode ? 'bg-white' : 'bg-black'} rounded-md border border-black`} key={index} onClick={() => setPage(menu)}>{menu}</button>
                        </>
                    )
                })} */}
                <ModeSwitch mode={mode} setMode={setMode} />
            </div>
            <Chat />
        </div>
    )
}
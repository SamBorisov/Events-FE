import React from "react"
import { useState } from "react";




export default function Button(props) {

   //disable button
   const [disabled, setDisabled] = useState(false)

   //button styles
   const [mouseOv, setMouseOv] = useState(false)

   function chageColor() {
       setMouseOv(true)
      }
   function changeBack(){
       setMouseOv(false)
      }

      // "#ffa07a"
      // "#B1B1B1"



return(
      <button disabled={props.disabled} style={{backgroundColor: mouseOv ? props.color : "white"}} onMouseOver={chageColor}  onMouseLeave={changeBack}
      onClick={props.func}>{props.text}
      </button>
)
}
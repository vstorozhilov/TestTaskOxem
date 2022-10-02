import React from "react"

const OutputTextField = React.forwardRef((props, ref)=>{
  return (
    <div className="OutputWrap">
      <div>{props.fieldName}</div>
      <div className="OutputText">
        <output name={props.name}>{props.value.toLocaleString('ru-RU')}</output>
        <div>₽</div>
      </div>
    </div>
  )
})

export default OutputTextField;
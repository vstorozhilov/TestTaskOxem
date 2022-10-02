import React, { useRef } from "react";
import { useEffect } from "react";

export default function InputInitialPay(props) {
  const range = useRef(null);
  const thumb = useRef(null);
  const track = useRef(null);
  const text = useRef(null);

  const {cost, setValue} = props;

  const changeSliderHandler = (e)=> {
    let relativeValue = (parseFloat(e.currentTarget.value) - props.min) / (props.max - props.min) * 100
    thumb.current.style.left = `${relativeValue}%`
    thumb.current.style.transform = `translate(-${relativeValue}%, -50%)`
    track.current.style.width = `${relativeValue}%`
    text.current.value = Math.round((parseFloat(e.currentTarget.value) * props.cost)).toLocaleString('ru-RU');
    props.setValue(Math.round((parseFloat(e.currentTarget.value) * props.cost)));
  }

  const changeTextHandler = (e)=> {
    let currentNumber = parseInt(text.current.value.replaceAll(String.fromCharCode(160), '').replaceAll(' ', ''));
    if (currentNumber > props.max * props.cost) {
      currentNumber = Math.round(props.max * props.cost);
      text.current.value = currentNumber.toLocaleString('ru-RU');
    }
    else if (currentNumber < props.min * props.cost) {
      currentNumber = Math.round(props.min * props.cost);
      text.current.value = currentNumber.toLocaleString('ru-RU');
    }
    else {
      text.current.value = currentNumber.toLocaleString('ru-RU');
    }
    let relativeValue = (currentNumber - props.min * props.cost) / ((props.max - props.min) * props.cost) * 100
    thumb.current.style.left = `${relativeValue}%`
    thumb.current.style.transform = `translate(-${relativeValue}%, -50%)`
    track.current.style.width = `${relativeValue}%`
    props.setValue(currentNumber);
  }

  const textValidator = (e) => {
    if (!e.code.startsWith('Digit') && e.code !== ('Backspace') && e.code !== ('Space')) {
      e.preventDefault();
    }
  }

  useEffect(()=>{
    let value = Math.round(cost * range.current.value);
    text.current.value = value.toLocaleString('ru-RU');
    setValue(value);
  }, [cost, setValue])

  return (
    <div className="InteractiveContainer">
      <div className="Label">
        <label htmlFor={props.name}>{props.fieldName}</label>
      </div>
      <input type='text'
      disabled={props.disabled}
      defaultValue={props.initialPay.toLocaleString('ru-RU')}
      onKeyDown={textValidator}
      onBlur={changeTextHandler}
      name={props.name}
      className={props.disabled ? "TextInput Disabled" : "TextInput"} ref={text}>
      </input>
      <div id="percentLabel" className={props.disabled ? 'Disabled' : ''}>
        {Math.round((props.initialPay / props.cost) * 100)}%
      </div>
      <div className={props.disabled ? "sliderWrap Disabled" : "sliderWrap"}>
        <input type="range"
        disabled={props.disabled}
        ref={range}
        onInput={changeSliderHandler}
        className="sliderRange"
        min={props.min}
        max={props.max}
        defaultValue={props.min}
        step={0.01}></input>
        <div className="sliderTrack">
          <div className="sliderTrack-inner" ref={track}></div>
        </div>
        <div className="sliderThumb" ref={thumb}></div>
      </div>
    </div>
  )
};
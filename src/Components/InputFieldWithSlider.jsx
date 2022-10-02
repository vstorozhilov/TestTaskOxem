import React, { useRef } from "react";

export default function InputFieldWithSlider(props) {
  const range = useRef(null);
  const thumb = useRef(null);
  const track = useRef(null);
  const text = useRef(null);

  const changeSliderHandler = (e)=> {
    let relativeValue = (parseInt(e.currentTarget.value) - props.min) / (props.max - props.min) * 100
    thumb.current.style.left = `${relativeValue}%`
    thumb.current.style.transform = `translate(-${relativeValue}%, -50%)`
    track.current.style.width = `${relativeValue}%`
    text.current.value = parseInt(e.currentTarget.value).toLocaleString('ru-RU');
    props.setValue(parseInt(e.currentTarget.value));
  }

  const changeTextHandler = (e)=> {
    let currentNumber = parseInt(text.current.value.replaceAll(String.fromCharCode(160), '').replaceAll(' ', ''));
    if (currentNumber > props.max) {
      currentNumber = props.max
      text.current.value = currentNumber.toLocaleString('ru-RU');
    }
    else if (currentNumber < props.min) {
      currentNumber = props.min
      text.current.value = currentNumber.toLocaleString('ru-RU');
    }
    else {
      text.current.value = currentNumber.toLocaleString('ru-RU');
    }
    let relativeValue = (currentNumber - props.min) / (props.max - props.min) * 100
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

  return (
    <div className="InteractiveContainer">
      <div className="Label">
        <label htmlFor={props.name}>{props.fieldName}</label>
      </div>
      <input type='text' disabled={props.disabled}
      defaultValue={parseInt(props.defaultValue).toLocaleString('ru-RU')}
      onKeyDown={textValidator}
      onBlur={changeTextHandler}
      name={props.name}
      className={props.disabled ? "TextInput Disabled" : "TextInput"} ref={text}>
      </input>
      <div className={props.disabled ? 'Unit Disabled' : 'Unit'}>
        {props.iconText}
      </div>
      <div className={props.disabled ? "sliderWrap Disabled" : "sliderWrap"}>
        <input type="range"
        disabled={props.disabled}
        ref={range}
        onInput={changeSliderHandler}
        className="sliderRange"
        min={props.min}
        max={props.max}
        step={1}></input>
        <div className="sliderTrack">
          <div className="sliderTrack-inner" ref={track}></div>
        </div>
        <div className="sliderThumb" ref={thumb}></div>
      </div>
    </div>
  )
};
import CircularProgress from '@mui/material/CircularProgress';

export default function SubmitButton(props) {

  const clickHandler = async (e)=>{

    props.setDisabled(true);

    await fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', {
      method : 'POST',
      mode: "cors",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        ...props.fields
      })
    });

    props.setDisabled(false);
  }

  return (
    <div className="OutputWrap">
      <input type='button'
      disabled={props.disabled}
      value={props.disabled ? '' : 'Оставить заявку'}
      className={props.disabled ? "SubmitButtonDisabled" : "SubmitButton"} onClick={clickHandler}></input>
      {props.disabled ? <CircularProgress
      className='CircularProgress'
      sx={{
          color: '#ffffff'
        }}/> : null}
    </div>
  )
}
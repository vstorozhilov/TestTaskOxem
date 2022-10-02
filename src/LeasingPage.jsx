import { useState, useEffect } from 'react';
import InputFieldWithSlider from './Components/InputFieldWithSlider';
import OutputTextField from './Components/OutputTextField';
import SubmitButton from './Components/SubmitButton';
import InputInitialPay from './Components/InputInitialPay';

function LeasingPage() {

  const [disabled, setDisabled] = useState(false);

  const [cost, setCost] = useState(1000000);
  const [initialPay, setInitialPay] = useState(100000);
  const [leasingPeriod, setLeasingPeriod] = useState(1);

  const [fullLeasingSum, setFullLeasingSum] = useState(0);
  const [monthlyPay, setMonthlyPay] = useState(0);
  
  useEffect(()=>{

    let monthlyPay = Math.round((cost - initialPay) *
    ((0.035 * Math.pow((1 + 0.035), leasingPeriod)) /
    (Math.pow((1 + 0.035), leasingPeriod) - 1)));
  
    setMonthlyPay(monthlyPay);
  
    setFullLeasingSum(Math.round(initialPay + leasingPeriod * monthlyPay));

  }, [cost, initialPay, leasingPeriod])

  return (
      <form className='baseContainer'>
        <div className='textContainer'>
          <div>Рассчитайте стоимость</div>
          <div>автомобиля в лизинг</div>
        </div>
        <div className='InteractiveContainers'>
          <InputFieldWithSlider
            disabled={disabled}
            fieldName="Стоимость автомобиля"
            min={1000000}
            max={6000000}
            defaultValue={1000000}
            name='1'
            setValue={setCost}
            iconText='₽'
          />
          <InputInitialPay
            disabled={disabled}
            fieldName="Первоначальный взнос"
            name='2'
            cost={cost}
            min={0.1}
            max={0.6}
            initialPay={initialPay}
            setValue={setInitialPay}
          />
          <InputFieldWithSlider
            disabled={disabled}
            fieldName="Срок лизинга"
            name='3'
            min={1}
            max={60}
            defaultValue={1}
            iconText='мес.'
            setValue={setLeasingPeriod}
          />
        </div>
        <div className='OutputContainer'>
          <OutputTextField
          fieldName='Сумма договора лизинга'
          value={fullLeasingSum} name='1'/>
          <OutputTextField
          fieldName='Ежемесячный платеж от'
          value={monthlyPay} name='2'/>
          <SubmitButton fields={{cost,
            initialPay,
            leasingPeriod,
            fullLeasingSum,
            monthlyPay}}
            disabled={disabled}
            setDisabled={setDisabled}
            name='3'/>
        </div>
      </form>
  );
}

export default LeasingPage;

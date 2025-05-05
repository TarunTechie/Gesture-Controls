import React, { useEffect, useState } from 'react';

export default function EyeAnimation() {
    const [timer,setTimer]=useState(3)
  useEffect(() => {
    setTimeout(() => { setTimer(timer - 1) }, 1000)
    },[timer])
  return (
    <div className='m-auto'>
        <div className="eye-lid">
        <div className="eye">
          <div className="cornea">
            <div className="white-pupil" />
            <h1 className="eye-number">{timer}</h1> 
          </div>
        </div>
      </div>
    </div>
  );
};


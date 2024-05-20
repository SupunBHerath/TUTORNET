import React from 'react'
import './Card.css'
import { Color } from '../../../../Components/CSS/CSS'
const HeaderCard = (prop:any) => {
  return (
    <div className='HeaderCard mt-4' >
      <div className='HeaderCard__left'>
    <img src={prop.icon} alt="" />
      </div>
      <div className='HeaderCard__right  w-100 mt-2 '>
     <h2 style={{color:Color.PrimaryColor}}>{prop.title}</h2>
     <h3 style={{color:Color.SecondaryColor}}>{prop.count}</h3>
      </div>
    </div>
  )
}

export default HeaderCard

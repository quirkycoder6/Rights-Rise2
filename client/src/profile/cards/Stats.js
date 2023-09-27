import React from 'react'
import fire from "../asset/fire.png"
import badge from "../asset/badge.png"
import light from "../asset/light-bulb.png"
import coin from "../asset/star.png"
import "../css/stats.css"

const Stats = () => {
    var coins=35,count=3,exp=234,medal="Gold";
  return (
    <div className='stats'>
        <div className='cards card1'>
            <div className='icon'>
                <img src={fire} alt='fire' style={{height: 90, width: 90}}></img>
            </div>
            <div className='desc'>
                {count} DAY Streak
            </div>
        </div>
        <div className='cards card2'>
            <div className='icon'>
                <img src={light} alt='fire' style={{height: 90, width: 90}}></img>
            </div>
            <div className='desc'>
                {exp} EXP
            </div>
        </div>
        <div className='cards card3'>
            <div className='icon'>
                <img src={badge} alt='fire' style={{height: 90, width: 90}}></img>
            </div>
            <div className='desc'>
                {medal} Badge                
            </div>
        </div>
        <div className='cards card4'>
            <div className='icon'>
                <img src={coin} alt='fire' style={{height: 90, width: 90}}></img>
            </div>
            <div className='desc'>
                {coins} Points
            </div>
        </div>
    </div>
  )
}

export default Stats
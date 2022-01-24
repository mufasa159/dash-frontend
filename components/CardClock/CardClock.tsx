import React  from 'react';
import Clock from 'react-live-clock'
import styles from './CardClock.module.scss'

export default function CardClock(){
   return(
      <div className={styles.clockDisplay}>
         <div className={styles.time}>
            <p>
               <Clock format={"dddd"}/><br/>
               <Clock format={"MMMM D, YYYY"}/><br/>
            </p>         
            <h1>
               <Clock format={"h:mm A"} ticking={true} timezone={process.env.timeZone} />
            </h1>
         </div>
      </div>
   )
}
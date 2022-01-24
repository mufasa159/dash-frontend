import React from 'react'
import styles from './CardHabits.module.scss'
import Link from 'next/link';
import moment from 'moment';

class CardHabits extends React.Component {
   state = {
      currently: 'loading',
      habits: []
   }

   componentDidMount() {
      fetch(process.env.dbServerUrl + "/habits")
      .then((res) => res.json())
      .then((habits) => this.setState({ habits, currently: 'success' }))
      .catch(() => this.setState({ currently: 'error' }))
   }
   
   async changeStatus(item: any) {
      const API_URL = process.env.dbServerUrl + "/mark-as-complete";

      let _date = item.last_completed;
      let current_date;
      let database_date;
      let date_difference;

      let habit_id = item.id;
      let streak = Number(item.streak);
      let req_body;

      if ( _date != null) {
         database_date = moment(_date).format('YYYY-MM-DD');
         current_date = moment().format('YYYY-MM-DD');
         date_difference = moment(current_date).diff(database_date, 'days');
         // console.log(date_difference);

         if ( date_difference == 1) {
            streak += 1;
            req_body = { habit_id, streak }
            const markAsComplete = await fetch(API_URL, {
               method: "POST",
               headers: {"Content-Type": "application/json"},
               body: JSON.stringify(req_body)
            })
            console.log("Updated DB and added streak");

         } else if (date_difference > 1) {
            streak = 1;
            req_body = { habit_id, streak }
            const markAsComplete = await fetch(API_URL, {
               method: "POST",
               headers: {"Content-Type": "application/json"},
               body: JSON.stringify(req_body)
            })
            console.log("Updated DB and resetted streak");

         } else if ( date_difference == 0) {
            console.log("Did Not Update DB");
         }
      } else {
         streak = 1;
         req_body = { habit_id, streak }
         const markAsComplete = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(req_body)
         })
         console.log('Marked complete and streak 1');
      }
   }

   render(){

      const { currently, habits } = this.state

      return(
         <div>
            <div className={styles.header}>
               <h3>Habit Tracker</h3>
            </div>
            <div className={styles.habitsDisplay}>
               
               {/* <h4>Daily Checklist</h4> */}

               {currently === 'loading' ? (
                  <p>Loading…</p>
               ) : currently === 'error' ? (
                  <p>There was an error :(</p>
               ) : (
                  <>
                  {habits.map((item:any, index:number) => (
                     <div key={index} className={styles.habits}>
                        <div className={styles.left}>
                           <p>{item.description}</p>
                           {moment(moment().format('YYYY-MM-DD')).diff(moment(item.last_completed).format('YYYY-MM-DD'), 'days') > 1 ? (
                              <small>Streak: 0</small>
                           ) : (
                              <small>Streak: {item.streak}</small>
                           )}
                        </div>
                        
                        <div className={styles.right}>
                           <button onClick={() => this.changeStatus(item)}>Done ?</button>
                        </div>
                     </div>
                   ))}

                  </>
               )}

               <small><Link href='/habits'>Edit Habits &gt;&gt;</Link></small>
            </div>
         </div>
      )
   }
}

export default CardHabits;
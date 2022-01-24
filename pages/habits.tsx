import type { NextPage } from 'next'
import React, { useEffect, useState} from 'react';
import styles from '../styles/habits.module.scss';
import Link from 'next/dist/client/link';
import Head from 'next/dist/shared/lib/head';

const Habits: NextPage = () => {

   let [id, setHabitId] = useState(0)
   const [habits, setHabits] = useState([]);
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const REST_API_URL = process.env.dbServerUrl;

   useEffect(()=>{
      fetch(REST_API_URL + "/habits")
      .then((res) => res.json())
      .then(data => {
         setHabits(data);
       }).catch((e) => {console.log(e)});
   })

   const handleRemove = async (e:React.ChangeEvent<any>) => {
      e.preventDefault();
      try {
         const habitToDelete = { id };
         console.log(habitToDelete);
         
         if (habitToDelete.id == 0) {
            alert("Please select an item first.")
            return 0;
         }

         const response = await fetch(REST_API_URL + "/remove-habit", {
           method: "POST",
           headers: {"Content-Type": "application/json"},
           body: JSON.stringify(habitToDelete)
         });
         console.log(response.status);
         
         setHabitId(0);

         if (response.status == 201){
            alert("Habit removed successfully!");
         } else {
            alert("Something went wrong. Try again later.")
         }
       } catch (err) {
         console.error("error message");
       }
   }

   const handleSubmit = async (e: React.ChangeEvent<any>) => {
      e.preventDefault();
      try {
        const user = {name, description};

        if (name == "" || description == "") {
           alert("Both fields are required");
           return 0;
        } else {
           alert("Successfully added hobby to database!")
        }

        const response = await fetch(REST_API_URL + "/add-habit", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(user)
        });
        setDescription('');
        setName('');
      } catch (err) {
        console.error("error message");
      }
   }

   return(
      <div className={styles.edit}>
         <Head>
            <title>Edit Habits</title>
         </Head>

         <Link href='/'>&#8592; Back to Dashboard</Link><br/><br/>

         <div className={styles.card}>
            <h2>Add New Habits</h2>
            <small>Try to be specific with your goals</small>
            <form onSubmit={handleSubmit}>
               <input value={name} onChange={e => setName(e.target.value)} type="text" name="habit" placeholder="Title: Reading"/>
               <input value={description} onChange={e => setDescription(e.target.value)} type="text" name="description" placeholder="Short description: Read at least 10 pages each day"/>
               <button type="submit">Add</button>
            </form>
         </div>

         <div className={styles.card}>
            <h2>Remove Habits</h2>
            <small>Hope you were able to achieve your goals!</small>
            <select value={id} onChange={e => setHabitId(parseInt(e.target.value))}>
               <option value='0'>Select a habit to remove</option>
               {[...habits].map((item:any, index:number) => (
                  <option value={item.id} key={index}>
                     {item.name} - {item.description}
                  </option>
               ))}
            </select>
            <button type="submit" onClick={handleRemove}>Remove</button>
         </div>
      </div>
   )
}

export default Habits;
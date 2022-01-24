import React, {useEffect, useState } from 'react'
import styles from './CardToDo.module.scss'
import Circle from '../../assets/icons/circle.svg'
import Image from 'next/image'
import Link from 'next/dist/client/link'

export default function CardToDo(){
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [todo, setTodo] = useState("");
   
   let changeHandler = (event:any) => {
       setTodo(event.target.value)
   }

   let addTodo = (event:any) => {
      setLoading(true)
      event.preventDefault();
      fetch('/api/add?todo=' + todo)
            .then(res => res.json())
            .then(data => {
               loadTodos()
            })
   }

   let removeTodo = (rtodo:any) => {
      setLoading(true)
      fetch('/api/remove?todo=' + rtodo)
            .then(res => res.json())
            .then(data => {
               loadTodos()
            })
   }

   let loadTodos = () => {
      // console.log("load todos")
      fetch('/api/list')
            .then(res => res.json())
            .then(data => {
                  setData(data)
                  setLoading(false)
               }
            )
   }

   useEffect(() => {
      setLoading(true)
      loadTodos()
   }, [])

   if (!data){
      return (
         <p>Loading...</p>
      )
   }

   return(
      <div>
         <div className={styles.header}>
            <h3>Tasks To Do</h3>
         </div>

         <div className={styles.todoDisplay}>

            <div className={styles.formInput}>

               {data.slice(0).reverse().map((item, index) =>
                     <div className={styles.tasks} key={index}>
                        <p><a className={styles.delete} onClick={() => removeTodo(item)}>
                           <Image src={Circle} height={11} width={11} alt='Mark as complete' />
                        </a>  {item}</p>
                     </div>
               )}

               {loading ?
                  <p></p>
                  :
                  <form className={styles.cardForm} onSubmit={addTodo}>
                     <input className={styles.cardInput} type="text" name="todo" onChange={changeHandler} placeholder="Press enter after typing"/>
                  </form>
               }

               <small><Link href='/todo' >Todo Hacks &gt;&gt;</Link></small>
            </div>
         </div>
      </div>
   )
}
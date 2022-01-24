import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import CardClock from "../components/CardClock/CardClock"
// import CardCalendar from '../components/CardCalendar/CardCalendar'
import CardNews from '../components/CardNews/CardNews'
import CardQuote from '../components/CardQuote/CardQuote'
import CardToDo from '../components/CardToDo/CardToDo'
import CardSpotify from '../components/CardSpotify/CardSpotify'
import CardHabits from '../components/CardHabits/CardHabits'
import Head from 'next/head'
// import { FullScreen, useFullScreenHandle } from "react-full-screen";

const Home: NextPage = () => {
  // const handle = useFullScreenHandle();
  return (
    //<FullScreen handle={handle}>
    <div>
      <Head>
        <title>Dash</title>
      </Head>

      {/* <button onClick={handle.enter}>
        Enter fullscreen
      </button> */}
      
      
        <div className={styles.widget_row}>
          <div className={styles.widget}><CardClock/></div>
          <div className={styles.widget}><CardNews/></div>
          <div className={styles.widget}><CardQuote/></div>
          <div className={styles.widget}><CardToDo/></div>
          <div className={styles.widget}><CardSpotify/></div>
          {/* <div className={styles.widget}><CardCalendar/></div> */}
          <div className={styles.widget}><CardHabits/></div>
        </div>
    
    </div>
    //</FullScreen>
  )
}

export default Home

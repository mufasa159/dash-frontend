import React, { Component } from 'react'
import styles from './CardQuote.module.scss'

interface Quotes {
   success: {
         total: number
   },
   contents: {
      quotes: [
         {
           quote: string,
           length: number,
           author: string,
           tags: string[],
           category: string,
           language: string,
           date: Date,
           permalink: URL,
           id: string,
           background: URL,
           title: string
         }
      ]
   },
   baseurl: URL,
   copyright: {
      year: number,
      url: URL
   }
}

class CardQuote extends Component {
   interval: NodeJS.Timer
   state = {
      currently: 'loading',
      text: {} as Quotes
   }

   componentDidMount() {
      this.interval = setInterval(this.fetchData, 86400000)
      this.fetchData();
   }

   fetchData = () => {
      const url = "http://localhost:8080/quote"

      // add other properties from theysaidso.com

      fetch(url, {
         method: 'GET',
         // headers: {
         //    'Accept' : 'application/json',
         //    'Content-Type': 'application/json',
         //    'Authorization': 'Bearer Ex6A2gefSBWpdhW8GsHaL7zbdzM1bT6Cs2QTAXnx',
         //    'Access-Control-Allow-Origin': '*'
         // }
      })
      .then((res) => res.json())
      .then((text) => this.setState({ text, currently: 'success' }))
      .catch(() => this.setState({ currently: 'error' }))
   }

   render() {
      const { currently, text } = this.state

      return (
         <div>
            <div className={styles.header}>
               <h3>Quote of The Day</h3>
            </div>

            <div className={styles.quotesDisplay}>
               {currently === 'loading' ? (
                     <p>Loading…</p>
                  ) : currently === 'error' ? (
                     <p>There was an error :(</p>
                  ) : (
                     <>
                        <p>{text.contents.quotes[0].quote}</p>
                        <small className={styles.author}>~ {text.contents.quotes[0].author}</small>
                     </>
                  )
               }
            </div>
         </div>
      )
   }
}

export default CardQuote
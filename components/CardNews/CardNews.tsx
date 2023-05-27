import React, { Component } from 'react'
import styles from './CardNews.module.scss'
import moment from 'moment'

const API_KEY = process.env.newsApiKey

interface News {
   status: string,
   totalResults: number,
   articles: [
      {
         source: {
            id: string,
            name: string
         },
         author: string,
         title: string,
         description: string,
         url: URL,
         urlToImage: URL,
         publishedAt: string,
         content: string,
      }
   ]
}

class CardNews extends Component {
   interval: NodeJS.Timer
   state = {
      currently: 'loading',
      news: {} as News
   }   

   componentDidMount() {
      this.interval = setInterval(this.fetchData, 1800000)
      this.fetchData();
   }

   fetchData = () => {
      const url = "https://newsapi.org/v2/top-headlines?category=technology&pageSize=4&country=us&apiKey="
      fetch(url + API_KEY, {
         method: 'GET',
         headers: {
            'Upgrade': 'HTTP/2.0',
            'Connection': 'Upgrade',
            'Content-Length': '53',
            'Content-Type': 'text/plain'
         }
      })
      .then((res) => res.json())
      .then((news) => this.setState({ news, currently: 'success' }))
      .catch(() => this.setState({ currently: 'error' }))
   }

   render() {
      const { currently, news } = this.state

      return (
         <div>
            <div className={styles.header}>
               <h3>Top Headlines</h3>
            </div>

            <div className={styles.newsDisplay}>
               {currently === 'loading' ? (
                  <p>Loading…</p>
               ) : currently === 'error' ? (
                  <p>There was an error :(</p>
               ) : (
                  <div>
                     {news.articles.map((article:any, index:number) => (
                        <a className={styles.list} href={article.url} target="_blank" key={index} rel="noreferrer">
                           <div className={styles.newsImage}>
                              <img
                                 className={styles.thumbnail}
                                 src={article.urlToImage}
                              />
                           </div>

                           <div>
                              {article.title.indexOf("- ") > 90 ? (
                              <>   
                                 <p>{article.title.substring(0,80)}...</p>
                                 <small>{article.source.name} - {moment(article.publishedAt).fromNow()}</small>
                              </>
                              ) : (
                              <>
                                 <p>{article.title.substring(0, article.title.indexOf("- "))}</p>
                                 <small>{article.source.name} - {moment(article.publishedAt).fromNow()}</small>
                              </>
                              )}
                           </div>
                        </a>
                     ))}
                  </div>
               )}

            </div>
         </div>
      )
   }
}

export default CardNews
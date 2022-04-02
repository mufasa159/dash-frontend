import styles from './CardSpotify.module.scss'
import React from 'react';

export default class CardSpotify extends React.Component{
   interval: NodeJS.Timer
   state = {
      currently: 'loading',
      songs: []
   }

   componentDidMount(){
      this.interval = setInterval(this.fetchData, 86400000)
      this.fetchData();
   }

   fetchData = () => {
      fetch(process.env.productionUrl + "/api/SpotifyTopTracks")
         .then((res) => res.json())
         .then((topTracks) => {
            let songs = topTracks.tracks;
            this.setState({ songs, currently: 'success' }); 
            // console.log(songs.length)
         })
         .catch(() => this.setState({ currently: 'error' }))
   }
   
   render(){
      const { currently, songs } = this.state
      //console.log(topTracks.tracks)

      return(
         <div>
            <div className={styles.header}>
               <h3>Most Played This Month</h3>
            </div>

            <div className={styles.spotifyDisplay}>
               {songs.map((item:any, index:number)=>(
                  <div className={styles.track} key={index}>
                     <a target="_blank" rel="noreferrer" href="play-music-function-here" key={index}>
                        <img className={styles.coverArt} src={item.imageUrl} alt={item.title}/>
                     </a>
                     <div className={styles.text}>
                        <div className={styles.title}>
                        {item.title.length > 26 ? (
                              <a target="_blank" rel="noreferrer" href={item.songUrl} key={index}>{item.title.substring(0, 26)}...</a>
                           ):(
                              <a target="_blank" rel="noreferrer" href={item.songUrl} key={index}>{item.title}</a>
                           )}
                        </div>
                           {item.artist.length > 16 ? (
                              <small>{item.artist.slice(0, 15)}...</small>
                           ):(
                              <small>{item.artist}</small>
                           )}
                        
                     </div>
                  </div>
                  // <div className={styles.track} key={index}>
                  //    <img className={styles.coverArt} src={item.imageUrl} alt={item.title}/>
                  //    
                  // </div>
               ))}
            </div>
         </div>
      )
   }
}
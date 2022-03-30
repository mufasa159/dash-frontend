import React, { Component, useEffect } from 'react'
import styles from './CardCalendar.module.scss'
import moment from "moment";
import Link from 'next/dist/client/link'

interface Events {
   kind: string,
   htmlLink: URL,
   created: string,
   updated: string,
   summary: string,
   description: string,
   location: string,
   creator: {
      email: string,
      self: boolean
   },
   organizer: {
      email: string,
      self: boolean
   },
   start: {
      dateTime: string,
      timeZone: string
   },
   end: {
      dateTime: string,
      timeZone: string
   },
   recurringEventId: string,
   originalStartTime: {
      dateTime: string,
      timeZone: string
   },
   iCalUID: string,
   sequence: number,
   reminders: {
      useDefault: boolean,
      overrides: [
            {
               method: string,
               minutes: number
            }
      ]
   },
   eventType: string
}

export default class CardCalendar extends React.Component {
   interval: NodeJS.Timer
   state = {
      currently: 'loading',
      events: {} as Events
   }   

   componentDidMount() {
      this.interval = setInterval(this.fetchData, 1800000)
      this.fetchData();
   }

   fetchData = () => {
      const url = "/upcoming-events"
      fetch("http://localhost:8080" + url, {
         method: 'GET',
         headers: {
            'Upgrade': 'HTTP/2.0',
            'Connection': 'Upgrade',
            'Content-Length': '53',
            'Content-Type': 'text/plain'
         }
      })
      .then((res) => res.json())
      .then((events) => this.setState({ events, currently: 'success' }))
      .catch(() => this.setState({ currently: 'error' }))
   }

   render() {
      const { currently, events } = this.state

      return (
         <>
            <div className={styles.header}>
               <h3>Upcoming Events</h3>
            </div>
            <div className={styles.calendarDisplay}>
               {currently === 'loading' ? (
                  <p>Loading…</p>
               ) : currently === 'error' ? (
                  <p>There was an error :(</p>
               ) : (
                  <div>
                     {events.map((event:Events, index:number) => (
                        <div key={index}>
                           {moment.duration(moment(event.start.dateTime).diff(moment())).asHours() < 10 ? (
                              <p className={styles.soon}>{moment(event.start.dateTime).format("dddd, hh:mm A")}</p>
                           ) : (
                              <p><span>{moment(event.start.dateTime).format("dddd, hh:mm A")}</span> </p>
                           )}
                           <p className={styles.eventListMargin}>{event.summary}</p>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </>
      )
   }
}
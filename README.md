# Productivity Management System Dashboard (aka. PMS Dash)

**UPDATE: [BACKEND](https://github.com/mufasa159/dash-backend) REPO IS PUBLIC**
|              |           |
|--------------|-----------|
|Developer     | Mufasa A. |
|Start Date    | Nov 13, 2021  |
|Status        | In Progress |

Note: It's meant to run locally (authentication stuff felt too frustrating to code), but there's a **[demo](https://pmsdashboard.herokuapp.com)** version available (without NewsAPI). Also, this is what it supposed to look like when run locally:  
  
![pmsdash-screenshot](/assets/screenshots/pmsdashboard_2022-03-30.png "PMS Dash")

### Description

Dash is sort of like a PMS (Productivity Management System). To put it simply, it’s a personal dashboard that includes daily essential productivity tools such as calendar, todo-list, habit-tracker, news updates, weather etc. Having all these tools in one place just makes life easier. This project has evolved from one of my previous projects called Robin, which was fully written in python and used tkinter for its GUI. Due to lack of compatibility and the need of frequent troubleshooting on Robin, project Dash was started as a way of eliminating most of those issues.

Original Plan for User Interface : [PMS Dash](https://www.figma.com/file/C66s9Mu57pFZMMAubdlxHk/productivity-dashboard?node-id=0:1)  
What Robin looked like : [Robin V2.1](https://www.figma.com/file/kZOJU2mVysRBVoG0aglQuK/robin_main)

  
---

### Setting Up Local Dev Environment

First, setup the [API server](https://github.com/mufasa159/dash-backend) and keep it running while accessing frontend.

Install node version 16.13.0  
```
$ nvm install 16.13.0  
$ nvm use 16.13.0
$ npm install
```
Open `next.config.js` file and update the environment variables:
| Variable | Description|
|------|------------|
|`productionUrl` | URL of where this site is hosted (i.e. `localhost:300`)|
|`dbServerUrl`|URL of the backend REST API. Learn more [here](#)|
| `timeZone` | Update clock widget's timezone (i.e. `"America/New_York"`)
| `newsApiKey` | Register for API key at [NewsAPI.org](https://newsapi.org/register) and copy your API key |
| `upstashToken` | Used for to-do list (Why? Because I was curious about Upstash and decided to try it out. Turns out it's pretty simple). Sign up at [Upstash](https://console.upstash.com/login) and create a database. Click on your newly created database and copy `UPSTASH_REDIS_REST_TOKEN`|
|`upstashUrl`| Copy `UPSTASH_REDIS_REST_URL` from your Upstash database |
|`spotifyClientId`| Create an account or sign in at [Spotify for Developers](https://developer.spotify.com/dashboard/). Then create an app called 'dash' (or whatever you like). Click on the newly created app and copy `Client ID`|
|`spotifyClientSecret` | Go to your app (from previous row) on Soptify for Developers and click `SHOW CLIENT SECRET`. Then copy `Client Secret`|
|`spotifyRefreshToken`| I don't exactly remember but I think I manually cutomized URL for this (i.e. `https://accounts.spotify.com/authorize?response_type=code&client_id=$CLIENT_ID&scope=user-top-read&redirect_uri=http%3A%2F%2Flocalhost%3A3000`), but you can use [spotify-refresh-token-generator](https://spotify-refresh-token-generator.netlify.app/#info). I feel like there is something I'm forgetting about this but I'll update as I make progress|

### Google Calendar

The annoying part of this. After setting up the API server, you'll have to fetch calendar events twice apparently. I am still working on it. but for now, there's no need to do anything in the front-end for getting calendar events.
  
  
Once all variables have been updated, run:
```
npm run dev
```

Run `next lint`  

---

### Useful Docs

Time format : https://momentjs.com/docs/#/displaying/format/  
News API : https://newsapi.org/docs/endpoints/top-headlines  
Quote : https://theysaidso.com/api/#js  

---

### Integration  
- [x] To Do List
- [x] Habit Tracker
- [x] News
- [x] Weather
- [x] Spotify
- [x] Google Calendar
- [ ] Gmail and Mail
- [ ] Reminders
- [ ] RSS (?)
- [ ] Custom Analytics
   - [ ] mufasa.cc
   - [ ] mufasa.cool
   - [ ] muhfasul.com
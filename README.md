# Billiards Tracker

A full-stack web application for tracking billiards games and player stats.

## Overview

### Frontend
An Angular single-page application that lets users view players, log new games, and see individual player stats and game history.

- **Framework:** Angular 19
- **Language:** TypeScript
- **Styling:** SCSS
- **HTTP:** Angular `HttpClient` with RxJS
- **Routing:** Angular Router

### Backend
A REST API that serves player and game data stored in local JSON files.

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript (run with `tsx`)
- **Data:** JSON flat files (`Players.json`, `Games.json`)
- **Middleware:** CORS

## Project Structure

```
billiards-tracker/
├── Backend/          # Express API server
│   ├── tracking.ts   # Main server entry point
│   ├── Players.json  # Player data store
│   └── Games.json    # Game data store
└── Frontend/
    └── billiards-tracker/   # Angular app
        └── src/app/
            ├── home/         # Home / player list view
            ├── players/      # Players listing
            ├── player/       # Individual player stats
            ├── game/         # Game detail view
            └── add-game/     # Log a new game
```

## Getting Started

### Backend
```bash
cd Backend
npm install
npm start
```
Server runs on `http://localhost:3000`.

### Frontend
```bash
cd Frontend/billiards-tracker
npm install
ng serve
```
App runs on `http://localhost:4200`.

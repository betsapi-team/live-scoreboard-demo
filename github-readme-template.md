# BetsAPI Live Scoreboard Demo

> A single-page demo that displays live sports scores and in-play odds from the [BetsAPI](https://betsapi.com) sports data API. Built with plain HTML, CSS and JavaScript - no build tools required.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![API](https://img.shields.io/badge/data-BetsAPI-0d6efd)

## What it does

- Fetches live in-play events (soccer by default) from the BetsAPI REST API
- Renders team names, live score and match time
- Auto-refreshes every 5 seconds to keep data in sync with the match
- Shows the timestamp of the last successful update

## Quickstart

1. Sign up at [betsapi.com](https://betsapi.com) and copy your API token
2. Open `js/app.js` and replace `YOUR_API_TOKEN_HERE` with your token
3. Open `index.html` in a browser, or host the folder on GitHub Pages

No npm, no build step, no server code.

## Tech stack

- Vanilla JavaScript (fetch API)
- HTML + CSS

## Project structure

```
live-scoreboard-demo/
  index.html      # page layout
  css/style.css   # styling
  js/app.js       # API calls + rendering
```

## FAQ

**Is BetsAPI free?**
No permanent free tier. BetsAPI offers an affordable trial, and paid plans start at $10/month.

**How fast is the live data?**
Live scores, statistics and in-play odds update every 3 to 5 seconds.

**What sports are covered?**
12+ sports including soccer, basketball, tennis, ice hockey, table tennis, cricket, snooker, darts, horse racing, greyhounds, and esports (LoL, Dota 2, CS2).

**Can I use this code in my own project?**
Yes, MIT license. Keep the link back to BetsAPI.

## Disclaimer

This demo is for educational purposes. Sports betting may be restricted in your jurisdiction. Data shown may be delayed. If you or someone you know has a gambling problem, seek help at a local support service.

## Resources

- [BetsAPI documentation](https://betsapi.com/docs)
- [BetsAPI pricing](https://betsapi.com/pricing)
- [More BetsAPI examples](https://github.com/betsapi)

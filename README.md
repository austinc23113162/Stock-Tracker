# 📈 Stock Tracker  

A full-stack web application that lets users search, track, and bookmark stocks with a clean, modern UI. Built as a personal portfolio project and deployed on **Heroku**.  

**Live Demo:** [Stock Tracker](https://stock-tracker-c22a275617c8.herokuapp.com)  

---

## Features  

- **User Authentication & Authorization** — secure register/login system with authorization measures
- **Search Stocks** — find companies by ticker or name using real-time financial data
- **Latest News** — view related news for each company
- **Bookmarks** — toggleable bookmark icon to save or remove companies from your list  
- **Responsive UI** — mobile-friendly design with smooth hover & transition effects  

---

## Tech Stack  

**Frontend**  
- HTML5, CSS3 (modern styling)  
- Vanilla JavaScript (ES6+)  

**Backend**  
- Node.js
- Express.js (REST API)  
- MongoDB with Mongoose (users, bookmarks, stock cache)  

**Other**  
- Deployed on Heroku  
- GitHub integration for continuous deployment  
- Third-party API: [Finnhub](https://finnhub.io)

---

## Final Thoughts

I know this is not a very complicated project, but I learned a lot from it. This is my first solo project, and here are my key takeaways:

- Structuring a web app in a professional way in terms of the architecture of my code and repositories
- Learning the importance and nuance of security
  - Spent a good amount of time reading about and implementing a secure account system using JWT stored in HTTP-only cookies and authentication middleware
- Implementing a REST API

Feel free to email me for any questions: austin.chang@tufts.edu

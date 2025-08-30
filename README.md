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
## Future Improvements

- Adding cron job to update cached price automatically
- Implementing a customizable alert system
  
---
## Final Thoughts

This project is my first solo full-stack app. While simple in design, it taught me fundamental concepts and skills in developing professional web applications. My key takeaways include:

**Security matters**
  - Implementing a secure account system with password hashing and JWT authentication stored in HTTP-only cookies to mitigate CSRF and XSS attacks
    
**Clean architecture**
  - Structuring my code and repositories in a professional way to improve readability, maintainability, and scalability
    
**Building a REST API**
  - Practical experience in designing a REST API

If you have questions or feedback, feel free to reach out: **austin.chang@tufts.edu**

const form = document.getElementById("searchForm");
const resultDiv = document.getElementById("result-list");
const sortContainer = document.getElementById("sort-container");
const newsContainer = document.getElementById("news-container");

//event handler for getting stock data
form.addEventListener("submit", async function(event) {
    event.preventDefault();
    sortContainer.style.display = "none";
    newsContainer.style.display = "none"
    resultDiv.innerHTML = "Processing...";
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();
    
    try {
        const response = await fetch(`/api/process?${queryString}`);
        const result = await response.json();
        if(response.ok) {
            resultDiv.innerHTML = `
            <div id="result-container">
                <div class="result-text">
                    <p>Company Name: ${result.name}</p>
                    <p>Stock Ticker: ${result.ticker}</p>
                    <p>Price: $${result.price}</p>
                    ${result.error ? `<p class="error">${result.error}</p>` : ''}
                </div>
            </div>`;
            show_news(result);
            //add the bookmark icon if price is succesfully fetched
            if(!result.error) {
                const parent = document.getElementById("result-container");
                const newContent = document.createElement('span');
                newContent.id = "bookmarkIcon";
                newContent.className = "bookmark-icon";
                newContent.title = "Bookmark this company";
                newContent.innerHTML = "&#9734;"
                parent.appendChild(newContent);

                bookmark_event(result);
            }
        } 
        else {
            resultDiv.innerHTML = result.error;
        }     
    }
    catch(err) {
        console.log(err);
    }
})

function show_news(result) {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = ""; // Clear previous news
    newsContainer.style.display = "block";
    if(result.news && result.news.length > 0) {
        for(const news of result.news) {
            const newsDiv = document.createElement("div");
            newsDiv.className = "news-item";
            newsDiv.innerHTML = `
                <div class="news-text">
                    <h4><a href="${news.url}" target="_blank">${news.headline}</a></h4>
                    <p>${news.summary}</p>
                </div>
               
            `;
            newsList.appendChild(newsDiv);
        }
    }
    else {
        newsList.innerHTML = "<p>No news available</p>"
    }  
}

//event handler for the bookmark button
async function bookmark_event(stock) {
    const bookmarkBtn = document.getElementById("bookmarkIcon");

    try {
        const bookmarked = await check_bookmark(stock.ticker);
        if(bookmarked) {
            bookmarkBtn.innerHTML = "&#9733;"; // filled star
            bookmarkBtn.title = "Remove bookmark";
            bookmarkBtn.classList.add("bookmarked");
        }
    }
    catch(err) {
        console.log(err);
    }

    bookmarkBtn.addEventListener("click", async function() {
        const name = stock.name;
        const ticker = stock.ticker;
        const price = stock.price;

        try {
            const response = await fetch('/api/bookmark/toggle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, ticker, price}),
            });
            
            const result = await response.json();

            if(response.ok && result.bookmarked) {
                bookmarkBtn.innerHTML = "&#9734;"; // empty star
                bookmarkBtn.title = "Bookmark this company";
                bookmarkBtn.classList.remove("bookmarked"); 
                console.log(result.message);               
            }
            else if(!result.bookmarked) {
                bookmarkBtn.innerHTML = "&#9733;"; // filled star
                bookmarkBtn.title = "Remove bookmark";
                bookmarkBtn.classList.add("bookmarked");
                console.log(result.message);
            }
            else {
                console.log(result.error);
            }          
        }
        catch(err) {
            console.log(err);
        }
    })
}

async function check_bookmark(ticker) {
    const response = await fetch(`/api/bookmark/check?ticker=${ticker}`);
    const result = await response.json();

    return response.ok && result.bookmarked;
    
}
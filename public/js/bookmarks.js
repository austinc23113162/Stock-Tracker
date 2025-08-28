async function show_bookmarks() {
    sort_event();
    const bookmarkBtn = document.getElementById("bookmark");

    bookmarkBtn.addEventListener("click", function() {
        fetch_bookmarks("name");
    });
}

async function fetch_bookmarks(sortBy) {
    const newsContainer = document.getElementById("news-container");
    const resultDiv = document.getElementById("result-list");
    const sortContainer = document.getElementById("sort-container");
    resultDiv.innerHTML = 'Loading bookmarks...';
    newsContainer.style.display = "none";
    try {
        const response = await fetch(`/api/bookmarks?sort=${sortBy}`);
        const result = await response.json();

        if(response.ok) {
            let html = "";
            if(result.bookmarks.length == 0) {
                html = "No bookmarks added";
            }
            else {
                for(const bookmark of result.bookmarks) {
                    html += 
                    `<div class="result-container">
                        <div class="result-text">
                            <p>Company Name: ${bookmark.name}</p>
                            <p>Stock Ticker: ${bookmark.ticker}</p>
                            <p>Price: $${bookmark.price}</p>
                        </div>
                    </div>`;
                }
            }
            resultDiv.innerHTML = html;
            sortContainer.style.display = "flex"; // Show the sort container
        }
        else {
            resultDiv.innerHTML = result.error;
        }
    }
    catch(err) {
        console.log(err);
    }
}

function sort_event() {
    const sortBy = document.getElementById('sortSelect');

    sortBy.addEventListener("change", function() {
        fetch_bookmarks(sortBy.value);
    })
}
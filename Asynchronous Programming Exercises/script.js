// Callbacks Implementation
document.getElementById('callbackButton')?.addEventListener('click', function() {
    const resultElement = document.getElementById('callbackResult');
    resultElement.innerText = "Please wait... Executing callback in 5 seconds...";
    
    setTimeout(function() {
        resultElement.innerText = "Callback executed after 5 seconds";
        fetchData('callbackResult');
    }, 5000);
});

// Promises Implementation
document.getElementById('promiseButton')?.addEventListener('click', function() {
    const resultElement = document.getElementById('promiseResult');
    resultElement.innerText = "Loading...";
    
    fetchDataWithPromise('promiseResult');
});

// Async/Await Implementation
document.getElementById('asyncButton')?.addEventListener('click', async function() {
    const resultElement = document.getElementById('asyncResult');
    resultElement.innerText = "Loading...";
    
    await fetchDataWithAsync('asyncResult');
});

// Fetch Data using Callbacks with Improved UI
target.innerHTML += '<ul>' + data.posts.map(post => `<li>${post.title}</li>`).join('') + '</ul>';
function fetchData(resultElementId) {
    fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {
            const target = document.getElementById(resultElementId);
            target.innerHTML = "<strong>Fetched Titles:</strong>";
            target.innerHTML += '<ul>' + data.posts.map(post => `<li>${post.title}</li>`).join('') + '</ul>';
        })
        .catch(() => {
            document.getElementById(resultElementId).innerText = "Error: Unable to fetch data.";
        });
}

// Fetch Data using Promises with Enhanced Timeout Handling
function fetchDataWithPromise(resultElementId) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject("Operation timed out."), 5000);
        fetch('https://dummyjson.com/posts')
            .then(response => response.json())
            .then(data => {
                clearTimeout(timeout);
                resolve(data.posts);
            })
            .catch(() => {
                clearTimeout(timeout);
                reject("Network error occurred.");
            });
    })
    .then(posts => {
        const target = document.getElementById(resultElementId);
        target.innerHTML = "<strong>Fetched Titles:</strong>";
        target.innerHTML += '<ul>' + posts.map(post => `<li>${post.title}</li>`).join('') + '</ul>';
    })
    .catch(error => {
        document.getElementById(resultElementId).innerText = error;
    });
}

// Fetch Data using Async/Await with Timeout and Clearer Error Handling
async function fetchDataWithAsync(resultElementId) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('https://dummyjson.com/posts', { signal: controller.signal });
        clearTimeout(timeout);

        if (!response.ok) throw new Error("Failed to fetch data.");

        const data = await response.json();
        const target = document.getElementById(resultElementId);
        target.innerHTML = "<strong>Fetched Titles:</strong>";
        target.innerHTML += '<ul>' + data.posts.map(post => `<li>${post.title}</li>`).join('') + '</ul>';
    } catch (error) {
        document.getElementById(resultElementId).innerText = error.message.includes("aborted")
            ? "Operation timed out. Please try again."
            : "Network error: Unable to fetch data.";
    }
}

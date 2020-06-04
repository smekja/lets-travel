let addPostBtn = document.querySelector(".create-post-btn");
let logOutBtn = document.querySelector(".log-out-btn");

document.addEventListener("DOMContentLoaded", async function() {
    addPosts();
    addCallbackRequests();
    addEmail();
    
});

addPostBtn.addEventListener("click", function() {
    let articlesTab = document.getElementById("v-pills-articles");
    articlesTab.classList.remove("show");
    articlesTab.classList.remove("active");
    let createPost = document.getElementById("v-pills-create-post");
    createPost.classList.add("show");
    createPost.classList.add("active");
});

async function addPosts() {
    let posts = await getPosts();
    let articles = document.querySelector(".articles");
    articles.innerHTML = "";
    let i = 1;
    posts.forEach((post) => {
        let postHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${post.id}">
        <div class="name w30">${post.title}</div>
        <div class="date w30">${post.date}</div>
        <div class="country w20">${post.country}</div>
        <div class="edit w10"><button class="btn btn-link btn-edit">edit</button></div>
        <div class="remove w5"><button class="btn btn-link btn-remove">x</button></div>
        </article>`
        articles.insertAdjacentHTML("beforeend", postHTML);
    });
}
async function addCallbackRequests() {
    let requests = await getCallbackRequests();
    let requestsBlock = document.querySelector("#v-pills-callback");
    requestsBlock.innerHTML = "";
    let i = 1;
    requests.forEach((request) => {
        let requestsHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${request.id}">
        <div class="name w60">${request.phoneNumber}</div>
        <div class="date w30">${request.date}</div>
        <div class="remove w5"><button class="btn btn-link btn-remove">x</button></div>
        </article>`
        requestsBlock.insertAdjacentHTML("beforeend", requestsHTML)
    });
}

async function addEmail() {
    let requests = await getEmail();
    let requestsBlock = document.querySelector("#v-pills-mails");
    requestsBlock.innerHTML = "";
    let i = 1;
    requests.forEach((request) => {
        let requestsHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${request.id}">
        <div class="name w30">${request.name}</div>
        <div class="email w30">${request.email}</div>
        <div class="date w30">${request.date}</div>
        <div class="remove w5"><button class="btn btn-link btn-remove">x</button></div>
        <div class="text w100">${request.text}</div>
        </article>`
        requestsBlock.insertAdjacentHTML("beforeend", requestsHTML)
    });
}

logOutBtn.addEventListener("click", function() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = "/";
})
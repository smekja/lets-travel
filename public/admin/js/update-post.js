let articles = document.querySelector(".articles");
let updateForm = document.querySelector(".update-post-form")
let title = document.getElementById("update-title");
let textArea = document.getElementById("update-text");
let id;

articles.addEventListener("click", async function(e) {
    if(e.target.classList.contains("btn-edit")) {
        id = e.target.parentNode.parentNode.querySelector(".id").value;
        let postInfo = await fetch("http://localhost:3000/posts/" + id)
        .then((resp) => resp.json()).then((data) => data);
        title.value = postInfo.title;
        textArea.value = postInfo.text;

        let articlesTab = document.getElementById("v-pills-articles");
        articlesTab.classList.remove("show");
        articlesTab.classList.remove("active");
        let createPost = document.getElementById("v-pills-update-post");
        createPost.classList.add("show");
        createPost.classList.add("active");
    }
    updateForm.addEventListener("submit", function(e) {
        e.preventDefault();
        fetch("http://localhost:3000/posts/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title.value,
                text: textArea.value,
                description: textArea.value.substring(0, textArea.value.indexOf(".") + 1)
            })
        }).then((resp) => resp.text()).then(() => window.history.go());
    })
});

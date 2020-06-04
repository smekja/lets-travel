let articlesBlock = document.querySelector(".articles");

articlesBlock.addEventListener("click", async   function(e) {
    if(e.target.classList.contains("btn-remove")) {
        let id = e.target.parentNode.parentNode.querySelector(".id").value;
        await fetch("/posts/" + id, {
            method: "DELETE"
        }).then((resp) => resp.text())
        .then(() => window.history.go());
    }
});
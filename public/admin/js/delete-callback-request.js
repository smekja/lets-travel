let requestsBlock = document.querySelector("#v-pills-callback");

requestsBlock.addEventListener("click", async   function(e) {
    if(e.target.classList.contains("btn-remove")) {
        let id = e.target.parentNode.parentNode.querySelector(".id").value;
        await fetch("/callback-request/" + id, {
            method: "DELETE"
        }).then((resp) => resp.text())
        .then(() => { 
            window.history.go()
        });
        
    } 
});


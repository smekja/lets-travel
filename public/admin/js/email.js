async function getEmail() {
    return await fetch("/email").then((response) => response.json())
                                        .then((data) => data);
}

{let requestsBlock = document.querySelector("#v-pills-mails");

requestsBlock.addEventListener("click", async   function(e) {
    if(e.target.classList.contains("btn-remove")) {
        let id = e.target.parentNode.parentNode.querySelector(".id").value;
        await fetch("/email/" + id, {
            method: "DELETE"
        }).then((resp) => resp.text())
        .then(() => { 
            window.history.go()
        });
        
    } 
})};
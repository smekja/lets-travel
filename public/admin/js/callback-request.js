async function getCallbackRequests() {
    return await fetch("http://localhost:3000/callback-request").then((response) => response.json())
                                        .then((data) => data);
}
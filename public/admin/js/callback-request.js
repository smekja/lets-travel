async function getCallbackRequests() {
    return await fetch("/callback-request").then((response) => response.json())
                                        .then((data) => data);
}
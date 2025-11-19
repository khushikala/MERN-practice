function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: 1, name: "Node.js" });
        }, 1000);
    });
}

fetchData()
    .then(result => console.log("Result:", result))
    .catch(error => console.error("Error:", error));
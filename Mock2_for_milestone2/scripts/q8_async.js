// Callback version
function fetchDataCallback(callback) {
  setTimeout(() => {
    callback(null, 'Data fetched');
  }, 1000);
}

// Promise version
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched');
    }, 1000);
  });
}

// Async/Await version
async function fetchDataAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data fetched');
    }, 1000);
  });
}

// Usage examples

// Callback
fetchDataCallback((err, data) => {
  if (!err) {
    console.log('Callback:', data + ' successfully');
  }
});

// Promise
fetchDataPromise().then(data => {
  console.log('Promise:', data + ' successfully');
});

// Async/Await
(async () => {
  try {
    const data = await fetchDataAsync();
    console.log('Async/Await:', data + ' successfully');
  } catch (error) {
    console.error(error);
  }
})();

const activities = [
  { id: 1, activity: "Create project file on tables (pg 12-19)", subject: "Maths" },
  { id: 2, activity: "Prepare Science model for exhibition", subject: "Science" },
  { id: 3, activity: "Read Chapter 3 and write summary", subject: "English" },
  { id: 4, activity: "Draw India's map and label states", subject: "Social" },
  { id: 5, activity: "Make a painting on nature", subject: "Art" }
];

function toggleRegister() {
  document.getElementById("loginPage").classList.toggle("d-none");
  document.getElementById("registerPage").classList.toggle("d-none");
}

function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  if (username && password) {
    localStorage.setItem(username, password);
    alert("Registered successfully!");
    toggleRegister();
  } else {
    alert("Please fill all fields!");
  }
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const storedPassword = localStorage.getItem(username);
  if (password === storedPassword && username) {
    document.getElementById("loginPage").classList.add("d-none");
    document.getElementById("mainApp").classList.remove("d-none");
    showPage("home");
  } else {
    alert("Invalid username or password!");
  }
}

function logout() {
  document.getElementById("mainApp").classList.add("d-none");
  document.getElementById("loginPage").classList.remove("d-none");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => page.classList.add("d-none"));
  document.getElementById(pageId).classList.remove("d-none");
}

function showActivities() {
  const subject = document.getElementById("subjectSelect").value;
  const list = document.getElementById("activityList");
  list.innerHTML = "";
  const filtered = activities.filter((a) => a.subject === subject);
  if (filtered.length === 0) {
    list.innerHTML = `<li class="list-group-item text-danger">No activities found!</li>`;
  } else {
    filtered.forEach((a) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = a.activity;
      list.appendChild(li);
    });
  }
}

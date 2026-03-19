function login() {
  fetch("http://127.0.0.1:8000/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "admin",
      password: "123"
    })
  })
}
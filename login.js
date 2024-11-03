let attempt = 0;
const maxAttempts = 3;
sampleUser = 
[
    {name: "Tommy", password: "easypass"},
    {name: "Chise", password: "peaceofmind"},
    {name: "Jonathan", password: "rustLinux"},
    {name: "Christeen", password: "onepunch876"},
    {name: "Kurumi", password: "Shido1234"}
];

        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === "Tommy" && password === "easypass")
            {
                alert("Login successful!");
                window.location.href = "product.html";
                localStorage.setItem('User', JSON.stringify([username, password]));
            }
            else if (username === "Chise" && password === "peaceofmind") {
                alert("Login successful!");
                window.location.href = "product.html";
                localStorage.setItem('User', JSON.stringify([username, password]));
            }
            else if (username === "Jonathan" && password === "rustLinux")
            {
                alert("Login successful!");
                window.location.href = "product.html";
                localStorage.setItem('User', JSON.stringify([username, password]));
            }
            else if (username === "Christeen" && password === "onepunch876")
                {
                    alert("Login successful!");
                    window.location.href = "product.html";
                    localStorage.setItem('User', JSON.stringify([username, password]));
                }
            else if (username === "Kurumi" && password === "Shido123")
            {
                alert("Login successful!");
                window.location.href = "product.html";
                localStorage.setItem('User', JSON.stringify([username, password]));
            }
            else 
            {
                attempt++;
                alert('Login failed');

                if (attempt >= maxAttempts) {
                    alert("Maximum attempts reached. Redirecting to error page.");
                    window.location.href = "error.html";
                }
            }
        });
async function checkLogin() {
    try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            window.location.href = "login.html";
            return;
        }

        const data = await response.json();

        if (!data.authenticated) {
            window.location.href = "login.html";
        }

    } catch (error) {
        console.error("Login check error:", error);
        window.location.href = "login.html";
    }
}

checkLogin();
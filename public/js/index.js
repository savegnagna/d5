function sendForm() {
    const email = document.getElementById('mail')
    const pass = document.getElementById('pass')
    payload =
    {
        "email": email.value,
        "password": pass.value,
    }
    fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            location.reload();
        }else{
            response.text().then((text) => {
                let viewer = document.getElementById("request-status");
                viewer.textContent = text;
            });
        }
    })
}
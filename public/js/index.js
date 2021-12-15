function sendForm() {
    const email = document.getElementById('mail')
    const pass = document.getElementById('pass')
    const hasher = new jsSHA("SHA-1", "TEXT");
    hasher.update(pass.value);
    payload =
    {
        "email": email.value,
        "password": hasher.getHash("HEX")
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
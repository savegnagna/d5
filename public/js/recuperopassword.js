function submitRec() {
    let inputs = document.getElementById("recForm").querySelectorAll(".textinput")
    form = 
    {
        "contatto": inputs.item(0).value,
    }
    fetch("/recuperopassword", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
    })
    .then(response => {
        console.log(response.status);
        if (response.status == 200) {
            location.href = './'
        } else {
            location.href = './recuperopassword'
        }
    })
}

function radem(){
    document.getElementById("contatto").placeholder = 'Email'
    document.getElementById("contatto").type = 'mail'
    document.getElementById("contatto").value = ''
}

function radnu(){
    document.getElementById("contatto").placeholder = 'Numero'
    document.getElementById("contatto").type = 'number'
    document.getElementById("contatto").value = ''
}


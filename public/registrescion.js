/**
 * todo Implemntare un migiore sistema di rindirizamento del utente, senza hardcoding
 */

function submitReg() {
    let inputs = document.getElementById("regForm").querySelectorAll(".textinput")
    form = 
    {
        "name": inputs.item(0).value,
        "surname": inputs.item(1).value,
        "birth": inputs.item(2).value,
        "email": inputs.item(3).value,
        "number": inputs.item(4).value,
        "password": inputs.item(5).value,
        "payment": 
        {
            "holder": inputs.item(7).value,
            "number": inputs.item(8).value,
            "MM": inputs.item(9).value,
            "AA": inputs.item(10).value,
            "CVV": inputs.item(11).value
        }
    }
    fetch("/registrazione", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
    })
    .then(response => {
        console.log(response.status);
        if (response.status == 201) {
            location.href = './'
        } else {
            location.href = './registrazione'
        }
    })
}
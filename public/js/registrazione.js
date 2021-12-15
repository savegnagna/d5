function submitReg() {
    let inputs = document.getElementById("regForm")
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
            "nameholder": inputs.item(7).value,
            "cardnumber": inputs.item(8).value,
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
        if (response.status == 200) {
            location.href = './'
        } else {
            location.href = './registrazione'
        }
    })
}

function getform(){
    const backui = document.createElement("div")
    backui.id = "comp"
    backui.style.border = "1px solid rgb(173, 173, 173)"
    backui.style.backgroundColor = "rgb(224, 224, 224)"
    backui.style.width = "70%"
    backui.style.marginLeft = "40px"
    backui.style.padding = "15px"
    backui.innerHTML = "<div><input type='text' class='card' id='cardnumber' placeholder='Card number' style='width: 190px;'></div><div><input type='text' class='card' id='nameholder' placeholder='Name holder' style='width: 190px;'></div><div style='display: flex; justify-content: center;'><input type='number' class='card' id='CVV' placeholder='CVV' style='width: 50px;' max='999'><input type='month' class='card' id='MMVV' value='2022-03' pattern='[0-9]{4}-[0-9]{2}' min='2021-12' max='2031-12' style='width: 120px; font-size: 10px;'></div></div>"

    let input = document.getElementById("card")
    input.appendChild(backui)
}

function remform(){
    let p = document.getElementById("card")
    let f = document.getElementById("comp")
    p.removeChild(comp)
}
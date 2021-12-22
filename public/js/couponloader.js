fetch('/coupons')
  .then(response => response.json())
  .then(data => loader(data))
  .catch((err) => errorHeandler(err));

function loader(data) {
  const templ = document.getElementById("couponview");
  const coupons = document.getElementById("coupons");
  console.log(data.coupons);

  data.coupons.forEach(element => {
    let clone = templ.content.cloneNode(true);

    let coupon = clone.getElementById('deadline');

    let coupon2 = clone.getElementById('code');

    console.log(element.deadline);

    coupon.innerHTML = 'Deadline: ' + element.expire + "&nbsp;&nbsp;&nbsp;&nbsp;" + "Discount: " + (element.amount * 100) + "%";
    coupon2.innerHTML = "Code: " + element.code + "<hr color= green size= 3px>";

    coupons.append(clone);

  }); 
}
function errorHeandler(err) {
  const coupons = document.getElementById("coupons");
  coupons.innerText = "No Coupons"
}
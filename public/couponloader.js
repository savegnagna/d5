fetch('coupons')
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

    coupon.innerHTML = 'Expire: ' + element.expire + "&nbsp;&nbsp;&nbsp;&nbsp;" + "Discount: " + (element.amount * 100) + '%';
    coupon2.innerHTML = element.code;

    coupons.append(clone);

  });
}
function errorHeandler(err) {
  const coupons = document.getElementById("coupons");
  coupons.innerText = "No Coupons"
}
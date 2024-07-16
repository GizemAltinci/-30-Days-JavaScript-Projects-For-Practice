const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; //çarpı işareti kaldır işaretini yaptı
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  //click olayı dinleyicisi, listContainer içerisindeki herhangi bir yere tıklandığında belirli işlemlerin yapılmasını sağlar.
  "click",
  function (e) {
    //Tıklama olayı gerçekleştiğinde çalışacak olan anonim fonksiyon. e parametresi, olay nesnesini temsil eder ve tıklanan element hakkında bilgi sağlar.
    if (e.target.tagName === "LI") {
      //tıklanan element bir<li> ise
      e.target.classList.toggle("checked");
      saveData();
      //classList.toggle("checked"): checked sınıfını ekler veya kaldırır. Bu, tıklanan <li> öğesinin tamamlanmış (checked) veya tamamlanmamış (unchecked) olarak işaretlenmesini sağlar.
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove(); //Bu, <span> öğesine tıklanmasıyla ilgili görevin silinmesini sağlar.
      saveData();
    }
  },
  false
);

function saveData() {
  //sayfayı yenilediğimizde yazdıklarımız gitmiyor
  localStorage.setItem("data", listContainer.innerHTML);
  //localStorage tarayıcının bir özelliğidir ve verilerin kullanıcının tarayıcısında kalıcı olarak saklanmasını sağlar.
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data"); //kullanıcı tarafından kaydedilen görevlerin geri yüklenmesini sağlar.sayfayı kapatsan da açtığında veriler geliyor.
}
showTask();

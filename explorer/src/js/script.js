const form = document.getElementById("form-habits");
const nlwSetup = new NLWSetup(form);
const button = document.querySelector("header button");

button.addEventListener("click", add);
form.addEventListener("change", save);

function add() {
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5);
  const dayExists = nlwSetup.dayExists(today);

  if (!dayExists) {
    alert("Adicionado com sucesso");
    nlwSetup.addDay(today);
  } else {
    alert("Dia já incluso");
    return;
  }
}

function save() {
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data));
}

const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {};
nlwSetup.setData(data);
nlwSetup.load();

/*
=============
TEMPLATE DATA
=============
const data = {
  pizza: ["01-01", "01-02", "01-06"],
  fries: ["01-05", "01-10"],
  hamburguer: ["01-01", "01-03"],
  procastinate: ["01-01", "01-02", "01-08", "01-09"],
  videogame: ["01-01", "01-03", "01-05", "01-06"],
  web: ["01-04", "01-07"],
  overSleep: ["01-01", "01-02", "01-03", "01-05", "01-06", "01-10"],
};
*/

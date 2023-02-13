const form = document.getElementById("form-habits");

const nlwSetup = new NLWSetup(form);

const data = {
  pizza: ["01-01", "01-02", "01-06"],
  fries: ["01-05", "01-10"],
  hamburguer: ["01-01", "01-03"],
  procastinate: ["01-01", "01-02", "01-08", "01-09"],
  videogame: ["01-01", "01-03", "01-05", "01-06"],
  hide: ["01-04", "01-07"],
  overSleep: ["01-01", "01-02", "01-03", "01-05", "01-06", "01-10"],
};

nlwSetup.setData(data);

nlwSetup.load();

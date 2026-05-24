let display = document.getElementById("display");

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    if (display.value === "") {
      alert("Please enter a value");
      return;
    }

    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}
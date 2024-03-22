const Text = document.getElementById("text_to_summarize");
const Summary = document.getElementById("summary");
const Button = document.getElementById("submit-button");
const DemoButton = document.getElementById("demo-submit-button")

let demotext = "Servers play a vital role in modern digital infrastructure.They are specialized computers designed to store, manage, and process data, applications, and services. Acting as central repositories, servers respond to requests from client devices like computers, smartphones, or other servers over a network, such as the internet.";

Text.addEventListener("input", VerifyTheInput);
DemoButton.addEventListener("click", SubmitData);
Button.addEventListener("click", SubmitData);

Button.disabled = true;

function VerifyTheInput(e) {
  const InputText = e.target;

  if (InputText.value.length > 200 && InputText.value.length < 100000) {
    Button.disabled = false;
  } else {
    Button.disabled = true;
  }
}

function SubmitData(e) {
  const clickedbutton = e.target;
  let Text_to_summarize;
  if(clickedbutton.id === "demo-submit-button"){
    Text_to_summarize = demotext;
    Text.value = demotext;
  }
  else{
    Text_to_summarize = Text.value;
  }
  Button.classList.add("submit-button--loading");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "text_to_summarize" : Text_to_summarize,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch("/summarize", requestOptions)
    .then(response => response.text())
    .then(summary => {
      Summary.value = summary;
      Button.classList.remove("submit-button--loading");
    })
    .catch(error => console.error(error));
}

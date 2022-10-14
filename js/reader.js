const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInput = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = wrapper.querySelector(".close"),
copyBtn = wrapper.querySelector(".copy");


function fetchRequest(formData, file) {
    infoText.innerText = "Scanning QR Code...";
    //sending post request to the api
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't Scan QR Code";
        if(!result) return;
        wrapper.querySelector("textarea").innerText = result;
        wrapper.classList.add("active");
        form.querySelector("img").src = URL.createObjectURL(file);
        // console.log(result);
    }).catch(() => {
        infoText.innerText = "Couldn't Scan QR Code";
    });
}

fileInput.addEventListener("change", e => {
    let file = e.target.files[0]; //getting user selected file
    if(!file) return;
    let formData = new FormData(); //creating new FormData Object
    formData.append("file", file); //adding selected file to FormData
    fetchRequest(formData, file);
   
    // console.log(file);
});


copyBtn.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
})

closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));

form.addEventListener("click", () => fileInput.click());

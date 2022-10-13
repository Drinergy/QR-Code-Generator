const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img");

generateBtn.addEventListener("click", () =>{
    let qrValue = qrInput.value;    
    //console.log(qrValue);
    if(!qrValue) return; //if the input is empty then return from here
    generateBtn.innerText = "Generating QR Code...";
    //getting QR code of QR value
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&bgcolor=EEEEEE&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
    
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value){
        wrapper.classList.remove("active");
    };
});

//Download QR Code

let dlBtn = document.querySelector("#download");
let img = qrImg;

dlBtn.addEventListener('click', () => {
    let qrValue = qrInput.value; 
    let imgPath = img.getAttribute('src');
    let fileName = qrValue + ".png";

    saveAs(imgPath, fileName);
});


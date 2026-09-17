const button = document.querySelector("#submitButton");
//JavaScript tìm button có: id="submitButton" 
//và lưu nó vào biến button.
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput =document.querySelector("#message");
button.addEventListener("click", function(){
    //→ Khi button được click, thực hiện đoạn code bên trong.
    const name = nameInput.value;
    const email = emailInput.value;
    const message =messageInput.value;

    console.log(name);
    console.log(email);
    console.log(message);
    
    alert("送信されました！");
});
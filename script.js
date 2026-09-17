

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

    console.log("お名前:",name);
    console.log("メールアドレス:",email);
    console.log("お問い合わせ内容:",message);

// object
const inquiry ={
    name: name,
    email:email,
    message:message

};
// Object → JSON
const jsonData = JSON.stringify(inquiry);

console.log(jsonData);

fetch("http://localhost:8080/api/inquiries", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: jsonData
});

});



const button = document.querySelector("#submitButton");
//JavaScript tìm button có: id="submitButton" 
//và lưu nó vào biến button.
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput =document.querySelector("#message");

const companyNameInput = document.querySelector("#companyName");
const categoryInput = document.querySelector("#category");
const subjectInput = document.querySelector("#subject");






button.addEventListener("click", function(){
    //→ Khi button được click, thực hiện đoạn code bên trong.
    const name = nameInput.value;
    const email = emailInput.value;
    const message =messageInput.value;

    const companyName = companyNameInput.value;
    const category = categoryInput.value;
    const subject = subjectInput.value;

    console.log("お名前:",name);
    console.log("メールアドレス:",email);
    console.log("お問い合わせ内容:",message);




//validation email. name   message
if (name ===""){
    alert ("お名前を入力してください。");
    return;
}






if (email ===""){
    alert("メールアドレスを入力してください。");
    return;
    }

//kiểm tra email rỗng hay kh ông, nếu rỗng thì thông báo và dừng thực hien =>>
const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if  (!emailPattern.test(email)){
    alert ("正しいメールアドレスを入力してください！！");
    return;
}






if (message ===""){
    alert ("お問い合わせ内容を入力してください。");
    return;
    }   


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
    })
    .then (response => {
        if (!response.ok){
            throw new Error ("送信に失敗しました。");
        }
        return response.json();
    })

    .then (data=>{
        console.log("サーバーから回答:",data);
    })
    .catch(error =>{
        console.error("エラー:",error);
    })

});


//khai bao bien

const button = document.querySelector("#submitButton");
//JavaScript tìm button có: id="submitButton" 
//và lưu nó vào biến button.
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput =document.querySelector("#message");

const companyNameInput = document.querySelector("#companyName");
const categoryInput = document.querySelector("#category");
const subjectInput = document.querySelector("#subject");

const attachmentButton = document.querySelector("#attachmentButton");
const attachmentMenu = document.querySelector("#attachmentMenu");
    

const attachmentInput = document.querySelector("#attachment"); // nut bam them file  pdf
const fileName = document.querySelector("#fileName");


        attachmentButton.addEventListener("click", function() {
            attachmentInput.click();
    });



        attachmentInput.addEventListener("change", function() {
        const attachment = attachmentInput.files[0];

        if (attachment) {
            console.log("ファイル名:", attachment.name);
            fileName.textContent = attachment.name;
        }
    });


















button.addEventListener("click", function(){
    //→ Khi button được click, thực hiện đoạn code bên trong.
    const name = nameInput.value;
    const email = emailInput.value;
    const message =messageInput.value;

    const companyName = companyNameInput.value;
    const category = categoryInput.value;
    const subject = subjectInput.value;

    const attachment = attachmentInput.files[0];
    if (attachment){
            console.log("ファイル名:",attachment.name);
    }

    console.log("お名前:",name);
    console.log("メールアドレス:",email);
    console.log("お問い合わせ内容:",message);
    // ==== Drag & Drop cho file đính kèm ====
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('attachment');

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('drag-over');
    });
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');
    });
});

dropZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        fileInput.dispatchEvent(new Event('change')); // kích hoạt lại logic hiển thị tên file đã có sẵn
    }
});



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







if (attachment) {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(attachment.type)) {
        alert("対応していないファイル形式です。");
        return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (attachment.size > maxSize) {
        alert("添付ファイルは10MB以下にしてください。");
        return;
    }

    console.log("添付ファイル:", attachment.name);
    console.log("ファイルサイズ:", attachment.size);
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

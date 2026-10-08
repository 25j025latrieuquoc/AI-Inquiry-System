// ==================================================
// 1. DOM ELEMENT
// ==================================================

// Submit button
const button = document.querySelector("#submitButton");

// Form input
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const companyNameInput = document.querySelector("#companyName");
const categoryInput = document.querySelector("#category");
const subjectInput = document.querySelector("#subject");

// Attachment
const attachmentInput = document.querySelector("#attachment");
const fileList = document.querySelector("#fileList");
const dropZone = document.querySelector("#dropZone");
const submitStatus = document.querySelector("#submitStatus");


// ==================================================
// 2. ATTACHMENT FILE MANAGEMENT
// ==================================================

// Đối tượng này dùng để lưu tất cả file đã chọn
let selectedFiles = [];

function displayFiles() {

    fileList.innerHTML = "";

    selectedFiles.forEach(function(file, index) {

        const fileItem = document.createElement("div");
        fileItem.className = "file-item";


        // Noi dung file 
        if (file.type.startsWith("image/")) {

            const image = document.createElement("img");

            image.src = URL.createObjectURL(file);


            image.addEventListener("click",function(event) {

                event.stopPropagation();

                window.open(image.src,"_blank");

            });


            image.alt = file.name;

            fileItem.appendChild(image);

        }else{
            //file khong phai anh 
            const fileIcon = document.createElement("div");

            fileIcon.className = "file-icon";

            fileIcon.textContent = "📄";

            fileItem.appendChild(fileIcon);
        }


     
        // Dấu X
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";

        deleteButton.className = "delete-file";

        deleteButton.textContent = "×";


        // Xóa file
        deleteButton.addEventListener("click", function() {

            selectedFiles.splice(index, 1);

            displayFiles();

        });




        fileItem.appendChild(deleteButton);
        // Click file để xem
        fileItem.addEventListener("click", function(event) {

        if (event.target.classList.contains("delete-file")) {
            return;
        }

        const fileUrl = URL.createObjectURL(file);

        // Ảnh
        if (file.type.startsWith("image/")) {

            window.open(fileUrl, "_blank");

            return;
        }

        // PDF
        if (file.type === "application/pdf") {

            window.open(fileUrl, "_blank");

            return;
        }

        // Các file khác
        alert("このファイルはブラウザでプレビューできません。");
    });



    
        // Tên file
        const fileText = document.createElement("span");

        fileText.className = "file-name";

        fileText.textContent = file.name;

        fileItem.appendChild(fileText);


        fileList.appendChild(fileItem);

    });

}


// ==================================================
// 3. CHỌN FILE BẰNG NÚT ＋
// ==================================================

attachmentInput.addEventListener("change", function() {

    // Lấy những file vừa chọn
    const newFiles = Array.from(attachmentInput.files);

    // Thêm file mới vào danh sách file cũ
    selectedFiles = selectedFiles.concat(newFiles);

    displayFiles();
    

   

});


// ==================================================
// 4. DRAG & DROP
// ==================================================

dropZone.addEventListener("dragover", function(event) {

    event.preventDefault();

    dropZone.classList.add("dragover");

});


dropZone.addEventListener("dragleave", function(event) {

    event.preventDefault();

    dropZone.classList.remove("dragover");

});


dropZone.addEventListener("drop", function(event) {

    event.preventDefault();

    dropZone.classList.remove("dragover");

    const newFiles = Array.from(event.dataTransfer.files);

    if (newFiles.length === 0) {
        return;
    }

    // Thêm file kéo thả vào danh sách
    selectedFiles = selectedFiles.concat(newFiles);

    // Hiển thị file
    displayFiles();

});

// ==================================================
// 5. SUBMIT BUTTON
// ==================================================

button.addEventListener("click", function() {

    // --------------------------------------------------
    // Lấy dữ liệu từ form
    // --------------------------------------------------

    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    const companyName = companyNameInput.value;
    const category = categoryInput.value;
    const subject = subjectInput.value;


    // --------------------------------------------------
    // Kiểm tra thông tin người dùng
    // --------------------------------------------------

    console.log("お名前:", name);
    console.log("メールアドレス:", email);
    console.log("お問い合わせ内容:", message);


    // ==================================================
    // 6. VALIDATION
    // ==================================================

    // お名前
    if (name === "") {

        alert("お名前を入力してください。");

        return;
    }


    // メールアドレス
    if (email === "") {

        alert("メールアドレスを入力してください。");

        return;
    }


    // Email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("正しいメールアドレスを入力してください！！");

        return;
    }


    // お問い合わせ内容
    if (message === "") {

        alert("お問い合わせ内容を入力してください。");

        return;
    }


    // ==================================================
    // 7. FILE VALIDATION
    // ==================================================

    if (selectedFiles.length > 0) {

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


        const maxSize = 10 * 1024 * 1024;


        // Kiểm tra từng file
        for (const attachment of selectedFiles) {

            // Kiểm tra loại file
            if (!allowedTypes.includes(attachment.type)) {

                alert("対応していないファイル形式です。");

                return;
            }


            // Kiểm tra dung lượng
            if (attachment.size > maxSize) {

                alert("添付ファイルは10MB以下にしてください。");

                return;
            }


            console.log("添付ファイル:", attachment.name);

            console.log("ファイルサイズ:", attachment.size);

        }

    }


    // ==================================================
    // 8. OBJECT
    // ==================================================

    // const inquiry = {

    //     name: name,

    //     email: email,

    //     message: message

    // };


    // // ==================================================
    // // 9. OBJECT → JSON
    // // ==================================================

    // const jsonData = JSON.stringify(inquiry);

    // console.log(jsonData);

// ==================================================
// 10. SEND TO BACKEND
// ==================================================

const formData = new FormData();

formData.append("companyName", companyName);
formData.append("name", name);
formData.append("email", email);
formData.append("category", category);
formData.append("subject", subject);
formData.append("message", message);

// Add attachments
selectedFiles.forEach(function(file) {
    formData.append("attachments", file);
});

// 送信中
button.disabled = true;
button.textContent = "送信中...";

submitStatus.textContent = "お問い合わせを送信しています...";
submitStatus.className = "submit-status loading";

fetch("http://localhost:8080/api/inquiries", {
    method: "POST",
    body: formData
})
.then(function(response) {

    if (!response.ok) {
        throw new Error("送信に失敗しました。");
    }

    return response.json();
})
.then(function(data) {

    console.log("お問い合わせ送信成功:", data);

    // 送信成功
    submitStatus.textContent = "お問い合わせを送信しました。";
    submitStatus.className = "submit-status success";

    // Form reset
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
    companyNameInput.value = "";
    categoryInput.value = "";
    subjectInput.value = "";

    // Attachment reset
    selectedFiles = [];
    attachmentInput.value = "";

    displayFiles();

})
.catch(function(error) {

    console.error("お問い合わせ送信エラー:", error);

    // 送信失敗
    submitStatus.textContent =
        "お問い合わせの送信に失敗しました。もう一度お試しください。";

    submitStatus.className = "submit-status error";

})
.finally(function() {

    // Button reset
    button.disabled = false;
    button.textContent = "送信";

});



});
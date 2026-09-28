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


// ==================================================
// 2. ATTACHMENT FILE MANAGEMENT
// ==================================================

// Đối tượng này dùng để lưu tất cả file đã chọn
let selectedFiles = [];

function displayFiles() {

    fileList.innerHTML = "";

    selectedFiles.forEach(function(file) {

        const fileItem = document.createElement("div");
        fileItem.className = "file-item";


        // Nếu là ảnh
        if (file.type.startsWith("image/")) {

            const image = document.createElement("img");

            image.src = URL.createObjectURL(file);

            image.alt = file.name;

            fileItem.appendChild(image);

        }


        // Tên file
        const fileText = document.createElement("span");

        fileText.className = "file-name";

        fileText.textContent = file.name;

        fileItem.appendChild(fileText);


        // Thêm vào danh sách
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

// Khi kéo file vào khu vực
dropZone.addEventListener("dragover", function(event) {

    event.preventDefault();

    dropZone.classList.add("dragover");

});


// Khi kéo file ra khỏi khu vực
dropZone.addEventListener("dragleave", function() {

    dropZone.classList.remove("dragover");

});


// Khi thả file
dropZone.addEventListener("drop", function(event) {

    event.preventDefault();

    dropZone.classList.remove("dragover");

    // Lấy các file được kéo vào
    const newFiles = Array.from(event.dataTransfer.files);

    // Thêm vào danh sách file hiện tại
   selectedFiles = selectedFiles.concat(newFiles);
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

    const inquiry = {

        name: name,

        email: email,

        message: message

    };


    // ==================================================
    // 9. OBJECT → JSON
    // ==================================================

    const jsonData = JSON.stringify(inquiry);

    console.log(jsonData);


    // ==================================================
    // 10. SEND TO BACKEND
    // ==================================================

    fetch("http://localhost:8080/api/inquiries", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: jsonData

    })

    .then(function(response) {

        if (!response.ok) {

            throw new Error("送信に失敗しました。");

        }

        return response.json();

    })

    .then(function(data) {

        console.log("サーバーから回答:", data);

    })

    .catch(function(error) {

        console.error("エラー:", error);

    });

});
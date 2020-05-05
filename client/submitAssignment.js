let validation = false;

function uploadForm() {
    validateForm();
    if(validation) {
        let formData = new FormData(document.getElementById("mainForm"));
        $.ajax({
            url: "http://localhost:8082/upload",
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            cache: false,
            success: function (data) {
                console.log(data);
                let output = document.getElementById("output");
                output.innerHTML = data;
            },
            error: function (data) {
                console.log(data);
                let output = document.getElementById("output");
                output.innerHTML = data;
            }
        });
    }
}

function buildNRun() {
    let formData = new FormData(document.getElementById("mainForm"));
    $.ajax({
        url: "http://localhost:8082/buildRun",
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST',
        cache: false,
        success: function (data) {
            console.log(data);
            let output = document.getElementById("output");
            output.innerHTML = data;
        },
        error: function (data) {
            console.log(data);
            let output = document.getElementById("output");
            output.innerHTML = data;
        }
    });
}
// Verifies the file type (should be .zip, .tar or .tar.gz)
function verifyFiles(fileInput) {
    let files = fileInput.files;
    let allowedFiles = ["application/zip", "application/x-tar","application/gzip"];
    let allowedExtensions = [".zip", ".tar", ".tar.gz"];

    let fileType = files[0].type;
    let output = document.getElementById("fileError");
	if (!allowedFiles.includes(fileType)) {
        output.innerHTML = "Please upload files having extensions: " + allowedExtensions.join(', ') + " only.";
        return false;
    }
	output.innerHTML = "";
    return true;
}
// Validates the file upload and command line args
function validateForm() {
  let fileName = document.forms["mainForm"]["file"].value;
  if (fileName === "") {
	let output = document.getElementById("fileError");
	output.innerHTML = "Please select a file to upload";
    validation = false;
    return;
  }
  validation = true;
}

let argCount = 1;

// Adds key and argument text boxes on click of "Add" button
function appendRow()
{
   let d = document.getElementById('cmdArgs');
   d.insertAdjacentHTML('beforeend',"<div class='form-group row'>\
   <div class='col-sm-2'>\
   <input type='text' class='form-control' id='key"+ argCount +"' name='key"+ argCount +"'>\
   </div>\
   <div class='col-sm-2'>\
   <input type='text' class='form-control' id='arg"+ argCount +"' name='arg"+ argCount++ +"'>\
   </div>\
   </div>");
}

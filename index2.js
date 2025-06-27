var Swal;
var inputName = document.getElementById('inputName');
var inputAge = document.getElementById('inputAge');
var inputAddress = document.getElementById('inputAddress');
var selectedValue = document.getElementById('chooseGender');
var selectedGender = "";
var arr = JSON.parse(localStorage.getItem("arrLocalStoage")) || [];
var type = "add";
var editedIndex = NaN;
var tbody = document.querySelector('tbody');
// function handleSave(){
//     let stdName:string = inputName.value.trim();
//     let stdAge:number = parseInt(inputAge.value.trim());
//     let stdAddress:string = inputAddress.value.trim();
//     if (!stdName.match(/^[a-zA-Z ]+$/)) {
//     Swal.fire({ title: "Invalid Name!", text: "Only letters and spaces allowed.", icon: "error" });
//     $('#exampleModalCenter').modal('show');  
//     return;
// }
//     if (isNaN(stdAge) || stdAge <= 0 || stdAge > 120) {
//         Swal.fire({ title: "Invalid Age!", text: "Enter a valid age between 1 and 120.", icon: "error" });
//         $('#exampleModalCenter').modal('show');  
//         return;
//     }
//     if (stdAddress.length < 2 || stdAddress=="") {
//         Swal.fire({ title: "Invalid Address!", text: "Address too short.", icon: "error" });
//         $('#exampleModalCenter').modal('show');  
//         return;
//     }
//     if (selectedGender === "Select Gender") {
//         Swal.fire({ title: "Invalid Gender!", text: "Please choose a valid gender.", icon: "error" });
//         $('#exampleModalCenter').modal('show');
//         return;
//     }
//    if (type === "add"){
//          let studentsField:student[] = [{
//             Name:stdName,
//             Age:stdAge,
//             Gender:selectedGender,
//             Address:stdAddress
//          }]
//     arr.push(...studentsField)
//    }
//    else if(type === "edit"){
//         arr[editedIndex].Name = stdName
//         arr[editedIndex].Age = stdAge
//         arr[editedIndex].Address = stdAddress
//         arr[editedIndex].Gender = selectedGender
//         type = "add"
//         let btnSave = document.getElementById('btnSave') as HTMLButtonElement
//         btnSave.textContent = "Save"
//         Swal.fire({
//             title: "Data Updated!",
//             icon: "success",
//             draggable: true
//         });
//    }
//     renderList()
//     inputName.value = ""
//     inputAge.value = ""
//     inputAddress.value = ""
//     selectedValue.value = "Select Gender"
// }
function handleSave() {
    var stdName = inputName.value.trim();
    var stdAge = parseInt(inputAge.value);
    var stdAddress = inputAddress.value.trim();
    // Validation conditions
    if (stdName === "" || stdAddress === "" || selectedGender === "Select Gender" || selectedGender === "" || isNaN(stdAge) || stdAge < 1 || stdAge > 120) {
        Swal.fire({
            title: "Invalid Input!",
            text: "Please fill all fields correctly.",
            icon: "error"
        });
        // Ensure modal remains open ONLY if validation fails
        $('#exampleModalCenter').modal('show');
        return; // Stops execution, preventing unwanted issues
    }
    // Save logic (either add new student or edit existing one)
    if (type === "add") {
        var studentsField = [{
                Name: stdName,
                Age: stdAge,
                Gender: selectedGender,
                Address: stdAddress
            }];
        arr.push.apply(arr, studentsField);
    }
    else if (type === "edit") {
        arr[editedIndex].Name = stdName;
        arr[editedIndex].Age = stdAge;
        arr[editedIndex].Address = stdAddress;
        arr[editedIndex].Gender = selectedGender;
        type = "add";
        // Reset button text
        document.getElementById("btnSave").textContent = "Save";
        Swal.fire({
            title: "Data Updated!",
            icon: "success",
            draggable: true
        });
    }
    // Render updated list
    renderList();
    SavetoLocalStorage();
    // Clear form inputs
    inputName.value = "";
    inputAge.value = "";
    inputAddress.value = "";
    selectedValue.value = "Select Gender";
    selectedGender = ""; // Reset selected
    // Close modal manually **only after valid data is saved**
    $('#exampleModalCenter').modal('hide');
}
function SavetoLocalStorage() {
    localStorage.setItem("arrLocalStoage", JSON.stringify(arr));
}
function handleClose() {
    inputName.value = "";
    inputAge.value = "";
    inputAddress.value = "";
    selectedValue.value = "Select Gender";
    selectedGender = "";
    type = "add";
    document.getElementById('btnSave').textContent = "Save";
}
function btnEdit(index) {
    var btnSave = document.getElementById('btnSave');
    btnSave.textContent = "Save Changes";
    type = "edit";
    editedIndex = index;
    var std = arr[index];
    inputName.value = std.Name;
    inputAge.value = std.Age.toString();
    inputAddress.value = std.Address;
    selectedValue.value = std.Gender;
    selectedGender = std.Gender;
}
function renderList() {
    tbody.innerHTML = "";
    arr.forEach(function (std, index) {
        var tr = document.createElement('tr');
        tr.innerHTML = "\n            <td>".concat(index + 1, "</td>\n            <td>").concat(std.Name, "</td>\n            <td>").concat(std.Gender, "</td>\n            <td>").concat(std.Age, "</td>\n            <td>").concat(std.Address, "</td>\n            <td>\n                <button onclick=\"btnEdit(").concat(index, ")\" class=\"btn btn-warning p-0 px-3 py-1\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\">Edit</button>\n                <button onclick=\"handleDelete(").concat(index, ")\" class=\"btn btn-danger p-0 px-3 py-1\">Delete</button>\n            </td>\n        ");
        tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
        inputName.value = "";
        inputAge.value = "";
        inputAddress.value = "";
        selectedValue.value = "Select Gender";
    });
}
function handleDelete(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(function (result) {
        if (result.isConfirmed) {
            arr.splice(index, 1);
            renderList();
            SavetoLocalStorage();
            console.log(arr);
            console.log(index);
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}
function handleGender() {
    var selectedValue = document.getElementById('chooseGender').value;
    selectedGender = selectedValue;
    console.log(selectedGender);
}
renderList();

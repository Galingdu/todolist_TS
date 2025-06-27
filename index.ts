interface student{
    Name:string,
    Age:number,
    Gender:string,
    Address:string
}
let Swal:any
let inputName = document.getElementById('inputName') as HTMLInputElement
let inputAge = document.getElementById('inputAge') as HTMLInputElement
let inputAddress = document.getElementById('inputAddress') as HTMLInputElement
let selectedValue = document.getElementById('chooseGender')as HTMLInputElement

let selectedGender:string = ""
let arr:student[] = JSON.parse(localStorage.getItem("arrLocalStoage")!)||[]
let type:string = "add"
let editedIndex:number = NaN
let tbody = document.querySelector('tbody')

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
    let stdName: string = inputName.value.trim();
    let stdAge: number = parseInt(inputAge.value);
    let stdAddress: string = inputAddress.value.trim();

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
        let studentsField: student[] = [{
            Name: stdName,
            Age: stdAge,
            Gender: selectedGender,
            Address: stdAddress
        }];
        arr.push(...studentsField);
    } else if (type === "edit") {
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
    localStorage.setItem("arrLocalStoage", JSON.stringify(arr))
}
function handleClose(){
    inputName.value = ""
    inputAge.value = ""
    inputAddress.value = ""
    selectedValue.value = "Select Gender"
    selectedGender = "";
    type = "add"
    document.getElementById('btnSave').textContent = "Save"
}
function btnEdit(index:number){
    let btnSave = document.getElementById('btnSave') as HTMLButtonElement
    btnSave.textContent = "Save Changes"
    type = "edit"
    editedIndex = index
    let std:student= arr[index];
    inputName.value = std.Name;
    inputAge.value = std.Age.toString();
    inputAddress.value = std.Address;
    selectedValue.value = std.Gender
    selectedGender = std.Gender  
}
function renderList(){
    tbody.innerHTML=""
    arr.forEach((std,index)=>{
        let tr = document.createElement('tr')
        tr.innerHTML=`
            <td>${index + 1}</td>
            <td>${std.Name}</td>
            <td>${std.Gender}</td>
            <td>${std.Age}</td>
            <td>${std.Address}</td>
            <td>
                <button onclick="btnEdit(${index})" class="btn btn-warning p-0 px-3 py-1" data-toggle="modal" data-target="#exampleModalCenter">Edit</button>
                <button onclick="handleDelete(${index})" class="btn btn-danger p-0 px-3 py-1">Delete</button>
            </td>
        `
        tbody?.appendChild(tr)
        inputName.value = ""
        inputAge.value = ""
        inputAddress.value = ""
        selectedValue.value = "Select Gender"
       

    })
}
function handleDelete(index:number){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {
        arr.splice(index, 1)
        renderList()
        SavetoLocalStorage()
        console.log(arr)
        console.log(index)
        Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success" 
    });
  }
}); 
}
function handleGender(){
    let selectedValue = (document.getElementById('chooseGender')as HTMLInputElement).value
    selectedGender = selectedValue
    console.log(selectedGender)
}
renderList()
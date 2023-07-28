console.log("welcome");
let arr = [];
let form = document.querySelector('form');
const formSubmitHandler = (e) => {
    e.preventDefault();
    if (expenseAmount === "" || description === "" || selectedOptionText==="") {
        alert("Please select");
    } else {
        console.log(expenseAmount,description,selectedOptionText);
        let data = {
            expenseAmount:expenseAmount,
            description:description,
            selectedOptionText:selectedOptionText
        };
        arr.push(data);
        localStorage.setItem("user",JSON.stringify(arr));
        console.log(localStorage.getItem("user"));
        ShowingData();
        // let ul = document.querySelector("ul");
        // let li = document.createElement("li");
        // let delbutton = document.createElement("button");
        // delbutton.setAttribute("id", "deleteBtn");
        // delbutton.setAttribute("class","btn btn-danger");
        // delbutton.innerText = "Delete";
        // let editBtn = document.createElement("button");
        // editBtn.setAttribute("id", "edit");
        // editBtn.setAttribute("class","btn btn-primary");
        // editBtn.innerText = "Edit";
        // li.textContent = `${expenseAmount} - ${description} - ${selectedOptionText} `;
        // ul.appendChild(li);
        // li.appendChild(delbutton);
        // li.appendChild(editBtn);
        // editBtn.addEventListener('click', () => {
        //     console.log('Edit');
        // })
        // delbutton.addEventListener('click', () => {
        //     console.log('Delete');
        // });
        form.reset();
        expenseAmount="";
        description = "";
        selectedOptionText = ""
    }
    
}
function ShowingData() {
    console.log('Showing data');
    let ul = document.querySelector('ul');
    ul.innerHTML = "";
    let dataOfStorage = localStorage.getItem('user');
    dataOfStorage = JSON.parse(dataOfStorage);
    console.log(dataOfStorage);
    dataOfStorage.forEach((item,index) => {
        let li = document.createElement('li');
        li.innerText = `${item.expenseAmount} - ${item.selectedOptionText} - ${item.description} `;
        let delBtn = document.createElement('button');
        delBtn.setAttribute('id', 'delBtn');
        delBtn.innerText = "Delete";
        delBtn.addEventListener('click',function(e) {
            deleteListItem(index);
        })
        li.appendChild(delBtn);
        let editBtn = document.createElement('button');
        editBtn.setAttribute('id', 'editBtn');
        editBtn.innerText = "Edit";
        editBtn.addEventListener('click',function(e) {
            editlist(index,item)
        })
        li.appendChild(editBtn);
        ul.appendChild(li);
    })
}
function editlist(index,item) {
    console.log(item);
    let expenseInput = document.getElementById("expenseAmount")
    expenseInput.value = item.expenseAmount;
    let descriptionInput = document.getElementById("description");
    descriptionInput.value = item.description;
    let selectedCategory = document.getElementById("category")
    selectedCategory.value = item.selectedOptionText;
    let newExpenseAmount = 0;
    let newDescription = "";
    let newSelectedOptionText = "";
    expenseInput.addEventListener("keyup",(e) => {
        newExpenseAmount = e.target.value
        console.log(newExpenseAmount);
        let dataFromLocal = JSON.parse(localStorage.getItem("user"));
        dataFromLocal[index].expenseAmount = newExpenseAmount;
        console.log(dataFromLocal[index].expenseAmount);

    })
    descriptionInput.addEventListener("keyup",(e) => {
        newDescription = e.target.value;
        console.log(newDescription);
        let dataFromLocal = JSON.parse(localStorage.getItem("user"));
        dataFromLocal[index].description = newDescription;
        console.log(dataFromLocal[index].description);
    })
    selectedCategory.addEventListener("change",(e) => {
        // newSelectedOptionText = e.target.value;
        var selectedOption = selectElement.options[selectElement.selectedIndex];
        selectedOptionText = selectedOption.textContent;
        let newSelectedOption = selectedOptionText;
        console.log(newSelectedOption);
        let dataFromLocal = JSON.parse(localStorage.getItem("user"));
        dataFromLocal[index].selectedOptionText = newSelectedOption;
        console.log(dataFromLocal[index].selectedOptionText);
    })
    // console.log(newExpenseAmount,newSelectedOptionText,newDescription);
}
// function editlist(index,item)
//  {
//     var form = document.querySelector('form');
//     var expenseinput = document.querySelector('#expenseAmount');
//     var descriptioninput = document.querySelector('#description');
//     // var selectedOptionTextInput =
//     expenseinput.value = item.expenseAmount;
//     descriptioninput.value = item.description;
//     form.onsubmit = function(e) {
//         e.preventDefault();
//         var neExpenseAmount = expenseinput.value;
//         var newDescription = descriptionInput.value;
//         updateListItem(index, neExpenseAmount,newDescription);

//     }
//  }

// function updateListItem(index, neExpenseAmount,newDescription) {
//     console.log(neExpenseAmount,newDescription);
//     var objects = JSON.parse(localStorage.getItem("user")) || [];
//     objects[index].expenseAmount = neExpenseAmount;
//     objects[index].description = newDescription;
//     localStorage.setItem("user", JSON.stringify(objects));
//     ShowingData();
// }

function deleteListItem(index) {
    var objects = JSON.parse(localStorage.getItem("user")) || [];
    objects.splice(index, 1);
    localStorage.setItem("user", JSON.stringify(objects));
    ShowingData();
}
ShowingData();

form.addEventListener('submit',formSubmitHandler);
// window.onload = () => {
//     // console.log(localStorage.getItem('user'));
//     ShowingData();
// }

let expenseAmount = "";
let expenseAmountInput = document.querySelector("#expenseAmount")
const expenseAmountInputChangeHandler = (e) => {
     expenseAmount = e.target.value;
    //  console.log("hii")
    // console.log(expenseAmount);
}
expenseAmountInput.addEventListener("keyup",expenseAmountInputChangeHandler);

let description = "";
let descriptionInput = document.querySelector("#description");
const descriptionHandler = (e) => {
    description = e.target.value;
    console.log(description);
}
descriptionInput.addEventListener("keyup",descriptionHandler);


var selectElement = document.getElementById("category");
let selectedOptionText ="";
const handleOptionChange = (e) => {
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    selectedOptionText = selectedOption.textContent;
    console.log(selectedOptionText);
}
selectElement.addEventListener("change",handleOptionChange);


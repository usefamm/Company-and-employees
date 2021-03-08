

$(".updateBtn").click(function () {
  let list = [];

  let td_1 = $(this).parent().find("td:eq(0)").text();
  let td_2 = $(this).parent().find("td:eq(1)").text();
  let td_3 = $(this).parent().find("td:eq(2)").text();
  let td_4 = $(this).parent().find("td:eq(3)").text();
  let td_5 = $(this).parent().find("td:eq(4)").text();
  let td_6 = $(this).parent().find("td:eq(5)").text();
  let td_7 = $(this).parent().find("td:eq(6)").text();
  let td_8 = $(this).parent().find("td:eq(7)").text();
  let td_9 = $(this).parent().find("td:eq(8)").text();
  list.push(td_1, td_2, td_3, td_4, td_5, td_6, td_7,td_8,td_9);

  showUpdateForm(list);
});
$(".DeleteBtn").click(function () {
  let result=confirm('Are You Sure Of Deleting This?')
  if(result){
    let list = [];
    let td_1 = $(this).parent().find("td:eq(0)").text();
    let td_8 = $(this).parent().find("td:eq(7)").text();
    list.push(td_1, td_8);
    Delete(list);

  }

});

//CREATE(PLUS)button that will show a form to create
$("#myBtn").click(function () {
  let id=$(this).parent().find('table').find('tr:eq(1)').find('td:eq(7)').text() ;
  id=id.trim()
  $(".modal").css("display", "block");
  $(".modal-header h2").html("Create");
  $(".modal-body").html(`
        <input type="text" class="createFormInputs name"  placeholder="Name">
        <input type="text" class="createFormInputs familyName"  placeholder="Family Name">
        <input type="text" class="createFormInputs Code"  placeholder="Code">
        <input type="text" class="createFormInputs Gender"  placeholder="Gender">
        <input type="text" class="createFormInputs Manager"  placeholder="Manager">
        <input type="text" class="createFormInputs birthDay"  placeholder="Birth Day">
        <input type="text" class="createFormInputs Company_id"  value="${id}" disabled>`);
  $(".modal-footer").html(
    `<button class="btn createBtn" onclick="create()">Create</button>`
  );
});

//Create function that when we click on button in previous form it will execute...
function create() {
  let createFormInputs = $(".createFormInputs");

  let obj = {};
  for (let index = 0; index < createFormInputs.length; index++) {

    let input = createFormInputs[index];
    if(input.value===""){
      alert('fill all inputs')
      break
    }
    obj[input.classList[1]] = input.value;
  }

  $.ajax({
    type: "PUT",
    url: "/employee",
    data: obj,
    dataType: "text",
    success: function (response) {
      $(".modal").css("display", "none");
      alert("created successfully")
      window.location.href = `http://localhost:5005/company/${id}`;
    },
    err:function(error){
      console.log(error);;
     

    }
  });
}

//DELETE function
function Delete(element) {

  $.ajax({
    type: "DELETE",
    url: `/employee/delete/${element[0]}`,

    success: function (response) {
      alert("Deleted successfully...");
      setTimeout(() => {
        window.location.href = `http://localhost:5005/company/${element[1]}`
      }, 2000);
    },
    error: function (err) {
      alert(err.responseText);
    },
  });
}

//showing a form that will let us to continue to update ...
///////////I have question in this part...in date part/////////////
function showUpdateForm(element) {
 
  
  $(".modal").css("display", "block");
  $(".modal-header h2").html("Update");
  $(".modal-body")
    .html(`<input type="text" class="updateFormInputs _id" value=${element[0]} disabled>
        <input type="text" class="updateFormInputs name" value=${element[1]}  >
        <input type="text" class="updateFormInputs familyName" value=${element[2]}>
        <input type="text" class="updateFormInputs Code" value=${element[3]}>
        <input type="text" class="updateFormInputs Gender" value=${element[4]}>
        <input type="text"  class="updateFormInputs Manager" value="${element[5].trim()}" disabled>
        <input type="text" class="updateFormInputs birthDay"  value="${element[6]}">
        <input type="text" class="updateFormInputs Company_id"  value=${element[7]}disabled>`);
  $(".modal-footer").html(
    `<button class="btn saveBtn" onclick="update()">Save</button>`
  );
  
}

//when we complete SHOWUPDATEFORM and when we click on SAVE button it will execute...
function update() {

  let updateFormInputs = $(".updateFormInputs");
  let obj = {};
  for (let index = 0; index < updateFormInputs.length; index++) {
    let input = updateFormInputs[index];
    if (input.value === "")
      return alert("Fill all inputs dude...I said it thousand times:/");

    obj[input.classList[1]] = input.value;
  }
  let Company_id=obj.Company_id;
  
  
  
  $.ajax({
    type: "Post",
    url: "/employee/update",
    data: obj,
    dataType: "text",
    success: function (response) {
   
      alert("Updated successfully...");
      setTimeout(() => {
        window.location.href = `http://localhost:5005/company/${Company_id}`;
      }, 2000);
    },
    error: function (err) {
      alert(err.responseText);
    },
  });
}

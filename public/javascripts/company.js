


$(".updateBtn").click(function () {
  let list = [];

  let td_1 = $(this).parent().find("td:eq(0)").text();
  let td_2 = $(this).parent().find("td:eq(1)").text();
  let td_3 = $(this).parent().find("td:eq(2)").text();
  let td_4 = $(this).parent().find("td:eq(3)").text();
  let td_5 = $(this).parent().find("td:eq(4)").text();
  let td_6 = $(this).parent().find("td:eq(5)").text();
  let td_7 = $(this).parent().find("td:eq(6)").text();
  list.push(td_1, td_2, td_3, td_4, td_5, td_6, td_7);

  showUpdateForm(list);
});
$(".DeleteBtn").click(function () {
  let result=confirm('Are You Sure Of Deleting This?')
  if(result){
    let list = [];
  let td_1 = $(this).parent().find("td:eq(0)").text();
  
  list.push(td_1);
  Delete(list);

  }
  
});

//CREATE(PLUS)button that will show a form to create
$("#myBtn").click(function () {
  $(".modal").css("display", "block");
  $(".modal-header h2").html("Create");
  $(".modal-body").html(`
        <input type="text" class="createFormInputs name"  placeholder="name">
        <input type="text" class="createFormInputs submitNumber"  placeholder="submitNumber">
        <input type="text" class="createFormInputs Town"  placeholder="Town">
        <input type="text" class="createFormInputs City"  placeholder="City">
        <input type="date" class="createFormInputs SubmitDate"  placeholder="SubmitDate">
        <input type="text" class="createFormInputs Phone"  placeholder="Phone">`);
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
    obj[input.classList[1]] = input.value;
  }

  $.ajax({
    type: "PUT",
    url: "/company",
    data: obj,
    dataType: "text",
    success: function (response) {
      window.location.href = "http://localhost:5005/company/companiesPage";
    },
  });
}

//DELETE function
function Delete(element) {
  
  $.ajax({
    type: "DELETE",
    url: `/company/delete/${element[0].trim()}`,

    success: function (response) {
      alert("Deleted successfully...");
      setTimeout(() => {
        window.location.href = "http://localhost:5005/company/companiesPage";
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
        <input type="number" class="updateFormInputs submitNumber" value=${element[2]}>
        <input type="text" class="updateFormInputs Town" value=${element[3]}>
        <input type="text" class="updateFormInputs City" value=${element[4]}>
        <input type="text"  class="updateFormInputs SubmitDate" value="${element[5]}" disabled>
        <input type="text" class="updateFormInputs Phone"  value=${element[6]}>`);
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
  $.ajax({
    type: "Post",
    url: "/company/update",
    data: obj,
    dataType: "text",
    success: function (response) {
      alert("Updated successfully...");
      setTimeout(() => {
        window.location.href = "http://localhost:5005/company/companiesPage";
      }, 2000);
    },
    error: function (err) {
      alert(err.responseText);
    },
  });
}

// business logic
function Task (name, category, dueDate, daysUntil, completed) {
  this.name = name;
  this.category = category;
  this.dueDate = dueDate;
  this.daysUntil = calculateDaysUntil(dueDate);
  this.completed = false;
}

var calculateDaysUntil = function(dueDate) {
  return Math.ceil((Date.parse(dueDate) - Date.now()) / (1000 * 3600 * 24));
}


// user interface logic
$(document).ready(function() {
  $("#toDoForm").submit(function(event){
    event.preventDefault();

    var inputtedName = $("input#newName").val();
    var inputtedCategory = $("select#newCategory").val();
    var inputtedDueDate = $("input#newDueDate").val();
    var calculatedDaysUntil = calculateDaysUntil(inputtedDueDate);

    var newTask = new Task(inputtedName, inputtedCategory, inputtedDueDate, calculateDaysUntil);

    var daysUntil = "";
    if (newTask.daysUntil === -1) {
      daysUntil = "Due today"
    } else if (newTask.daysUntil < -1) {
      daysUntil = -(newTask.daysUntil) + " days overdue"
    } else daysUntil = newTask.daysUntil + " days until due"

    $("div#toDoList").append("<div class='well'><span class='name'>" + newTask.name + " " + "</span><button type='button' class= 'deleteItem fa fa-check' aria-hidden='true'></button></i><ul><li>Category: "+ newTask.category +"</li><li>"+ "Due date: " + newTask.dueDate + "</li><li>" + daysUntil + "</li></ul></div>");

    $(".results").show();

    $("input#newName").val("");
    $("select#newCategory").val("");
    $("input#newDueDate").val("");

    $(".deleteItem").unbind("click").click(function(){
       var done = confirm("Are you sure you want to delete this task?  This action cannot be undone.");
       console.log(done)
       if (done === true) {
         $(this).parent().remove();
       }
    });

    $(".name").unbind("click").click(function(){
      $(this).nextAll("ul").first().slideToggle("slow");
    });

  });
});

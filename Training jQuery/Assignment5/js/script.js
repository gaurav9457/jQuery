function addDiv() {
    let divParent = $("#divParent");
    divParent.width(100 * 3 + 3 * 8);
  
    for (var i = 1; i <= 3; i++) {
      for (var j = 1; j <= 3; j++) {
  
        let gridItem = $("<div>").attr("id", 'fixColor').addClass("changecolor").css({float: 'left', margin: '4px'});
        divParent.append(gridItem);
  
        gridItem.on("click", function() {
          if ($(this).hasClass("redBack")) {
            $(this).removeClass("redBack").css("background-color", "yellow");
          } else {
            $(this).addClass("redBack").css("background-color", "red");
          }
        });
  
        gridItem.on("mouseover", function() {
          if (!$(this).hasClass("redBack")) {
            $(this).css("background-color", "red");
          }
        });
  
        gridItem.on("mouseout", function() {
          if (!$(this).hasClass("redBack")) {
            $(this).css("background-color", "yellow");
          }
        });
  
      }
  
      var clearDiv = $("<div>").css("clear", "both");
      divParent.append(clearDiv);
  
    }
  }
  
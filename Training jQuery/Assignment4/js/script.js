$(function (){

    $("#createBtn").click(function () {
        createGrid();
    })
function createGrid(){
    let rows = $("#rows").val();
    let cols = $("#cols").val();

    var boxParent = $("#boxParent");
    boxParent.empty();

    boxParent.width(80 * cols + 8 * cols);
    boxParent.height(80 * rows + 8 * rows);

    for (var i = 1; i <= rows; i++) {
        for (var j = 1; j <= cols; j++) {
            var gridItem = $("<div>").addClass("grid-item").css({float: 'left', margin: '4px'});
            boxParent.append(gridItem);
        }
        var clearDiv = $("<div>").css("clear", "both");
        boxParent.append(clearDiv);
    }
}
})

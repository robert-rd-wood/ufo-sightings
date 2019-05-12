// from data.js
var tableData = data;
var tbody = d3.select("tbody");

data.forEach(function(ufoReport) {
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(function([key, value]) {
      // Append a cell to the row for each value
      // in the UFO object
      var cell = row.append("td");
      cell.text(value);
    });
  });

var filterButton = d3.select("#filter-btn");

function handleChange(event) {
    var inputValue = d3.event.target.value;
    console.log(inputValue);
}

filterButton.on("click",handleChange);
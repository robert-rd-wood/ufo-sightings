// from data.js
var tableData = data;
var tbody = d3.select("tbody");

tableData.forEach(writeTable);
    
function writeTable(ufoReport) {

    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(function([key, value]) {
        // Append a cell to the row for each value
        // in the UFO object
        var cell = row.append("td");
        cell.text(value);
    });
}
    
function filterTable(ufoReport) {

}

var filterButton = d3.select("#filter-btn");

function handleFilter(event) {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    tableData.forEach(function(ufoReport) {
    // If function is called with a date argument, display matching date records
        if (Object.entries(ufoReport)[0][1] == inputValue) {
            var row = tbody.append("tr");
            Object.entries(ufoReport).forEach(function([key, value]) {
                // Append a cell to the row for each value
                // in the UFO object
                var cell = row.append("td");
                cell.text(value);
            });
        }
    });
}

filterButton.on("click",handleFilter);
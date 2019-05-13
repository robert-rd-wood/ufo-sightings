// from data.js
var tableData = data;
var tbody = d3.select("tbody");

// Write full table
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
    
// Declare variable for Filter button
var filterButton = d3.select("#filter-btn");

// Function to handle Filter
function handleFilter(event) {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    // Delete current table
    d3.selectAll("tbody>tr").remove();

    tableData.forEach(function(ufoReport) {
        //  If the datetime field matches the input value, display matching date record
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

// Define my button
filterButton.on("click",handleFilter);
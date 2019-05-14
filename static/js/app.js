// from data.js
var tableData = data;
var tbody = d3.select("tbody");

// Write full table
tableData.forEach(writeTable);

// Write row and columns
function writeTable(ufoReport) {

    // Append row element
    var row = tbody.append("tr");

    // Loop through each key-value pair
    Object.entries(ufoReport).forEach(function([key, value]) {
        // Append a cell to the row for each value
        // in the UFO object
        var cell = row.append("td");
        cell.text(value);
    });
}

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

function handleClear(event) {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Delete current table
    d3.selectAll("tbody>tr").remove();

    // Write full table
    tableData.forEach(writeTable);

}

// Declare variable for Filter Table button
var filterButton = d3.select("#filter-btn");

// Declare variable for Clear Filter button
var clearButton = d3.select("#clear-btn");

// Define Filter Table button action
filterButton.on("click",handleFilter);

// Define Clear Filter button action
clearButton.on("click",handleClear);
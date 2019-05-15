// from data.js
var tableData = data;
var tbody = d3.select("tbody");
var stateName = d3.select("#state-name");
var countryName = d3.select("#country-name");
var shapeName = d3.select("#shape-name");

// Write full table
tableData.forEach(writeTable);

// Write table row and columns
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

// Create array of states
var stateArray = [];

for (var i=0; i<tableData.length; i+=1) {
    // Declare current state variable and set equal to the corresponding element in the object
    var currentState = tableData[i].state;
    // If the current state is not already in the array, add it
    if (stateArray.includes(currentState) == false) {
        stateArray.push(currentState);
    }
}

// Sort stateArray alphabetically
stateArray.sort();

console.log(stateArray);

// Populate State select dropdown
stateArray.forEach(function(state) {
    var option = stateName.append("option");
    option.text(state);
});

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
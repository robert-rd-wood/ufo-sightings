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
//////////////////////////////////////////
// State handling and select dropdown
//////////////////////////////////////////

// Create array of states
var stateArray = [];

for (var i=0; i<tableData.length; i++) {
    // Declare current state variable and set equal to the corresponding element in the object
    var currentState = tableData[i].state;
    // If the current state is not already in the array, add it
    if (stateArray.includes(currentState) == false) {
        stateArray.push(currentState);
    }
}

// Sort stateArray alphabetically
stateArray.sort();

// Map uppercase state abbreviations to new array
var stateArrayCaps = stateArray.map(function(item) {
    return item.toUpperCase();
});

// Populate State select dropdown
stateArrayCaps.forEach(function(state) {
    var option = stateName.append("option");
    option.text(state);
});

//////////////////////////////////////////
// Country handling and select dropdown
//////////////////////////////////////////

// Create array of countries
var countryArray = [];

for (var i=0; i<tableData.length; i++) {
    // Declare current country variable and set equal to the corresponding element in the object
    var currentCountry = tableData[i].country;
    // If the current country is not already in the array, add it
    if (countryArray.includes(currentCountry) == false) {
        countryArray.push(currentCountry);
    }
}

// Sort countryArray alphabetically
countryArray.sort();

// Map uppercase country abbreviations to new array
var countryArrayCaps = countryArray.map(function(item) {
    return item.toUpperCase();
});

// Populate Country select dropdown
countryArrayCaps.forEach(function(country) {
    var option = countryName.append("option");
    option.text(country);
});


//////////////////////////////////////////
// Shape handling and select dropdown
//////////////////////////////////////////

// Create array of shapes
var shapeArray = [];

for (var i=0; i<tableData.length; i++) {
    // Declare current shape variable and set equal to the corresponding element in the object
    var currentShape = tableData[i].shape;
    // If the current shape is not already in the array, add it
    if (shapeArray.includes(currentShape) == false) {
        shapeArray.push(currentShape);
    }
}

// Sort shapeArray alphabetically
shapeArray.sort();

// Create array to store shapes converted to Camel case
var shapeArrayCamel = [];

// Capitalize the first letter of each array element
for(var i = 1 ; i < shapeArray.length ; i++) {
    shapeArrayCamel[i] = shapeArray[i].charAt(0).toUpperCase() + shapeArray[i].substr(1);
}       

// Populate Shape select dropdown
shapeArrayCamel.forEach(function(shape) {
    var option = shapeName.append("option");
    option.text(shape);
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
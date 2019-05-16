// from data.js
var tableData = data;
var tbody = d3.select("tbody");
var dateField = d3.select("#datetime");
var cityName = d3.select("#city-name");
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

// Function to display an empty message when no results are found for the filters in place
function writeEmptyMessage() {

    // Append row element
    var row = tbody.append("tr");
    var cell = row.append("td").attr("colspan","7").attr("align","center");
    cell.text("Sorry, no entries were found matching your criteria.  Please clear your filters and try again.")

}

/*
 * State handling and select dropdown
*/

// Call function to create select dropdown
stateSelectDropdown(tableData);

// Function to create select dropdown
function stateSelectDropdown(tableData) {

    // Create array of states
    var stateArray = [];

    // Delete current added options in select dropdown (leaving initial blank option)
    d3.selectAll("#state-name>#added-option").remove();

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
        var option = stateName.append("option").attr("id", "added-option");
        option.text(state);
    });
}

/*
 * Country handling and select dropdown
*/

// Call function to create select dropdown
countrySelectDropdown(tableData);

// Function to create select dropdown
function countrySelectDropdown(tableData) {

    // Create array of countries
    var countryArray = [];

    // Delete current added options in select dropdown (leaving initial blank option)
    d3.selectAll("#country-name>#added-option").remove();

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
        var option = countryName.append("option").attr("id", "added-option");
        option.text(country);
    });
}

/*
 * Shape handling and select dropdown
*/

// Call function to create select dropdown
shapeSelectDropdown(tableData);

// Function to create select dropdown
function shapeSelectDropdown(tableData) {

    // Create array of shapes
    var shapeArray = [];

    // Delete current added options in select dropdown (leaving initial blank option)
    d3.selectAll("#shape-name>#added-option").remove();

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
    for(var i = 0 ; i < shapeArray.length ; i++) {
        shapeArrayCamel[i] = shapeArray[i].charAt(0).toUpperCase() + shapeArray[i].substr(1);
    }       

    // Populate Shape select dropdown
    shapeArrayCamel.forEach(function(shape) {
        var option = shapeName.append("option").attr("id", "added-option");
        option.text(shape);
    });
}

/*
 *Filter button handling
*/

// Function to handle Filter
function handleFilter(event) {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input elements and get the raw HTML node
    var inputElementDate = d3.select("#datetime");
    var inputElementCity = d3.select("#city-name");
    var inputElementState = d3.select("#state-name");
    var inputElementCountry = d3.select("#country-name");
    var inputElementShape = d3.select("#shape-name");

    // Get the value property of the input elements
    var inputValueDate = inputElementDate.property("value");
    var inputValueCity = inputElementCity.property("value");
    var inputValueState = inputElementState.property("value");
    var inputValueCountry = inputElementCountry.property("value");
    var inputValueShape = inputElementShape.property("value");


    // Delete current table
    d3.selectAll("tbody>tr").remove();

    // Declare arrays to hold each level of filtered values
    var filteredArray1 = [];
    var filteredArray2 = [];
    var filteredArray3 = [];
    var filteredArray4 = [];
    var filteredArray5 = [];

    var stateBool = false;
    var countryBool = false;
    var shapeBool = false;

    /*  Date Handling  */

    // If no date was entered, assign full results to new array
    if (inputValueDate == "") {
        filteredArray1 = tableData;
    }
    // Else filter by date and save into new array
    else {
        filteredArray1 = tableData.filter(function(item) {
            return inputValueDate == item.datetime;
        });
    }

    /*  City Handling  */

    // If no city was entered, assign full previous results to new array
    if (inputValueCity == "") {
        filteredArray2 = filteredArray1;
    }
    // Else filter by city and save into new array
    else {
        filteredArray2 = filteredArray1.filter(function(item) {
            return inputValueCity.toUpperCase() == item.city.toUpperCase();
        });
    }

    /*  State Handling  */

    // If no state was entered, assign full previous results to new array
    if (inputValueState == "") {
        filteredArray3 = filteredArray2;
    }
    // Else filter by state and save into new array
    else {
        stateBool = true;
        filteredArray3 = filteredArray2.filter(function(item) {
            return inputValueState == item.state.toUpperCase();
        });
    }

    /*  Country Handling  */

    // If no country was entered, assign full previous results to new array
    if (inputValueCountry == "") {
        filteredArray4 = filteredArray3;
    }
    // Else filter by country and save into new array
    else {
        countryBool = true;
        filteredArray4 = filteredArray3.filter(function(item) {
            return inputValueCountry == item.country.toUpperCase();
        });
    }

    /*  Shape Handling  */

    // If no shape was entered, assign full previous results to new array
    if (inputValueShape == "") {
        filteredArray5 = filteredArray4;
    }
    // Else filter by shape and save into new array
    else {
        shapeBool = true;
        filteredArray5 = filteredArray4.filter(function(item) {
            return inputValueShape.toUpperCase() == item.shape.toUpperCase();
        });
    }

    // Write table using final results array
    filteredArray5.forEach(writeTable);

    if (filteredArray5.length == 0) {
        writeEmptyMessage();
    }

    // If no state was entered, rewrite the select dropdown to show viable selections
    if (stateBool == false) {
        stateSelectDropdown(filteredArray5);
    }

    // If no country was entered, rewrite the select dropdown to show viable selections
    if (countryBool == false) {
        countrySelectDropdown(filteredArray5);
    }

    // If no shape was entered, rewrite the select dropdown to show viable selections
    if (shapeBool == false) {
        shapeSelectDropdown(filteredArray5);
    }

}

function handleClear(event) {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Clear input fields
    dateField.value='';
    // cityName.text("");
    // stateName.text("");
    // countryName.text("");
    // shapeName.text("");
    dateField.text("testing");

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
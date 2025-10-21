/**
 * PASTE .\PopulatePortalCatalogItem.js HERE
 */

// EXAMPLE STARTS FROM HERE =======================================Prepare yourself a file where you paste everything until this line ===============================================

const exampleForm1 = {
    field1: "Nick Fury",
    field12: true
};

const exampleForm2 = {
    field3: 20,
    field4: 25
};

const exampleMultiRowData = [
    {
        field1: 15,
        field2: "blue"
    },
    {
        field1: 20,
        field2: "yellow"
    }
];

const exampleMultiRowVariableSetName = "example_multi_row_variable_set_name"

(async() => {
    await populate(exampleForm1, {delay: 20});
    await wait(100);
    await populate(exampleForm2, {delay: 20});
    
    for(let record in exampleMultiRowData) {
        clickMultiRowVariableButton("example_multi_row_variable_set_name", "Add")                     // searches for the "field" on the portal, then clicks the button with Text "Add";
        await wait(1000);                                                                           // We wait for the variable set modal to show up and load;
        await populate(record, {delay: 20, shouldSubmit: true});                                    // we populate the necessary fields
    }

    // OR you could just do this;

    await populate({
        example_multi_row_variable_set_name: '[{field: 15, field2: "blue"}, {field1: 20, field2: "yellow"}]'
    });

    submit();
})()
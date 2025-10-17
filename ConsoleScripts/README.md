[Portal Catalog Item Utility For testing](./PopulatePortalCatalogItem.js)
### How to use
1) paste the script and call exportForm() in the browser console so that you get a 
printed object with all of the visible fields on the page and their value mappings, which you can use afterwards as a template.

2) create a new file on your computer, paste the contents of PopulatePortalCatalogItem.js in it, after that place the printed object.

3) write similar logic to the following

* you can find an [example](./PopulatePortalCatalogItemExample.js) here.

Example for autocompletion with ready templates:

```js
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
```

4) paste the ready file's content in your console everytime you need autocompletion.
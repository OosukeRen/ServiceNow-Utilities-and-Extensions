/**
 * Create an async wait
 * e.g await wait(1000);
 * @param {*} milliseconds 
 * @returns {Promise<void>}
 */
async function wait (milliseconds) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, milliseconds);
    })
};

/**
 * 
 * @returns {{
 *  setValue: (fieldName: string, value: any) => void;
 *  getValue: (fieldName: string) => any;
 *  submit: () => any;
 * }}
 */
function getGForm () {
    return angular.element($("sp-variable-layout")).scope().getGlideForm();
};

/**
 * 
 * @param {*} formToPopulate 
 * @param {{delay: number, shouldSubmit: boolean}} config
 * - delay: time inbetween separate field populations (in case you have some client scripts that are influenced by specific fields/values;
 * - shouldSubmit: mark whether the form should get submitted after populating everything - would work for both catalog item and variable set modals.  
 */
async function populate (formToPopulate, config) {
    let {delay = 1, shouldSubmit} = config;
    let g_form = getGForm(); // if we've opened a modal, the old g_form is going to hold a reference to the main catalog item, not modal's fields, so we need a new reference for every time we're populating;
    let entries = Object.entries(formToPopulate);

    for(let [key, value] of entries) {
        g_form.setValue(key, value);
        await wait(delay);
    }

    if(shouldSubmit) {
        g_form.submit();
    }
};

function isVisible(el) {
  if (!el) return false;
  const style = getComputedStyle(el);
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    el.offsetWidth > 0 &&
    el.offsetHeight > 0
  );
}

/**
 * run this inside a portal so you can make a snapshot of all of the fields you have on your catalog item, and it'll be logged in the console so you can turn it into a template
 */
function exportForm () {
    let g_form = getGForm();
    let visibleItems = Array.from($(`[ng-repeat='f in ::column.fields']`)).filter(isVisible);
    let fieldKeys = visibleItems.map(el => el.id);
    let formToPrint = {};

    for(key of fieldKeys) {
        let value = g_form.getValue(key);
        formToPrint[key] = value;
    }

    console.log(formToPrint);
}

/**
 * @description Searches for the first variable set with the name passed, searches for the first button with specific label, and then triggers a click event on it
 * @param {*} variableName 
 * @param {*} buttonText 
 */
function clickMultiRowVariableButton (variableName, buttonText) {
    Array.from($(`sp-sc-multi-row-element[id*=${variableName}] button`)).filter(button => {
        return button.textContent.includes(buttonText)
    })[0].click;
}

function submit () {
    let g_form = getGForm();
    g_form.submit();
}
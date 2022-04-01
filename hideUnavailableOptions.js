/**
* Hide secondary select options which are not available.
*/

_hideUnavailableOptions: function() {

// get first dropdown
const option1 = document.getElementById("SingleOptionSelector-0");

// get second dropdown
const option2 = document.getElementById("SingleOptionSelector-1");

// monitor option1 dropdown for changes
option1.onchange = function(){
console.log(option1);
  
  // loop through options
  for (let option of option2) { 
    
    // deselect option
  	option.removeAttribute('selected');
    
    // check index of options and only animate if not first option
    // we animate to show the user that option 2 has reset to the first option
    var x = document.getElementById("SingleOptionSelector-1").selectedIndex;
    if(x>0){   
      // not first option so add animation class
      document.getElementById("SingleOptionSelector-1").classList.add("shake-horizontal");
      
      // wait 2 seconds then remove that class so we can animate again on further onchange events
      setTimeout(() => {        
          document.getElementById("SingleOptionSelector-1").classList.remove("shake-horizontal");
      }, 2000);  
    }
  }    
};

// remove all 'no options available' options from previous loops (otherwise we will accrue them)   
for (let option of option2) {      
   if (option.text.includes("No options available")) {
   		option.remove();
   }
}   

// now we can get the options from second dropdown
const secondOptions = option2.options;   

// create an array of variants that has the option names and availablity status
// we will check the dropdowns against this array to determine if a product is in stock
const variants = this.product.variants;
    
// create an array of the current option 1 and all the option 2 variations
let possibles = [];

// loop through the variants array
variants.forEach((variant) => {
  
  // if available
  if (variant.options.includes(option1.value) && variant.available === true) {
      	      
    // add options combination to the possibles array
    possibles.push(variant.options)
  }
})
            
// loop through the options from the second dropdown   
for (let option of secondOptions) {
    
  // get value of current option
  const value = option.value;

  // set 'out of stock' as default
  let flag = false;
  
  // loop through each option1/option2 pair
  possibles.forEach((possible) => {
    
    if (possible.includes(value)) {
      // Second dropdown value is in possible so set to available
      flag = true;
    }
    
  })
  
  // adjust option HTML to show it is out of stock
  if (flag === false) {
    option.removeAttribute('selected');
    option.setAttribute('disabled', 'disabled');
    
    // if it already has (sold out) text ignore it
    if (option.text.includes(' (sold out)')) {
        // do nothing
    }
    else {
        // add 'sold out' text on end
        option.text=option.text.concat(' (sold out)');
    }            
  } else {
    // reset the option HTML because it is available
    option.removeAttribute('disabled');
    option.text = option.value;
  }
}

// check if all options are disabled
var counter = 0;
var total = 0;
for (let option2a of option2) {
	    total++;
    if (option2a.disabled) {
    	counter++;
    }
} 

// if all options are disabled above, add a 'no options available' option
if(total === counter) {
   option2.append(new Option("No options available", "")); 
}

// important to reset the counters to avoid accruing on the next dropdown change
total = 0;
counter = 0;

// Select the first non-disabled option
option2.querySelector(':not([disabled="disabled"])').setAttribute('selected', 'selected');
},

//after this will be _onSelectChange etc...

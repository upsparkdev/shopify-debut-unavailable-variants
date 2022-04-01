# shopify-debut-unavailable-variants

Highlight and disable out-of-stock variants on product pages with the Shopify Debut theme (version 17.9.0).

This code builds on https://gist.github.com/jonolayton/7c7b2fc313fa973c04e02f08c7a3cd88 by Jono Layton.

This solution worked for me and I hope it works for you too.

This solution adds '(out of stock)' text to every out of stock option in the second dropdown. It also disables those options from being selected.

If the user changes the first drop down, the second dropdown will reset to the first available option in the second dropdown.

Step 1:
Copy the function.js contents to your theme.js file in your Shopify store backend.
The code must be placed between these two methods:
• _getVariantFromOptions
• _onSelectChange

Step 2:
Add the line below to your theme.js file, immediately above: this.currentVariant = this._getVariantFromOptions(); 
this._hideUnavailableOptions();  //N.B. this MUST be before the next line
   
Step 3:
Add the line below to your theme.js file, immediately above: var variant = this._getVariantFromOptions();
this._hideUnavailableOptions();  //N.B. this MUST be before the next line

Step 4:
Add the style.css contents to the end of your theme.css file.

Done! Refresh your store to see the results.

IMPORTANT: I've commented the code thoroughly so you may wish to remove these lines prior to production. There is also a console.log on line 15 to help with debugging.

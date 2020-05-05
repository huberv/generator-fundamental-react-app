# How to add a custom theme

1. Create a theme using the [SAP Theme Designer](https://themedesigner-themedesigner.dispatcher.hanatrial.ondemand.com)
2. Download and unzip your theme into the same folder as this Readme file
3. Adjust the import in [`index.css`](../src/index.css) to your theme. If you named your theme `custombelize`, the import would be:

`@import "../themes/custombelize/Base/baseLib/custombelize/css_variables.css";`

4. The hard part is using the correct css variables in your own components...
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  getUserDetailsApiURL: 'http://localhost/admin/backend/getUserLoginDetails.php',
  searchApiUrl: 'http://localhost/admin/backend/search_product.php',
  uploadDataApiUrl: 'http://localhost/admin/backend/uploadAdminData.php',
  insertUserDetailsApiUrl: 'http://localhost/admin/backend/insertUserDetailsData.php',
  getProductListDetailsApiUrl: 'http://localhost/admin/backend/getProductDetails.php',
  productBuyerApiUrl: 'http://localhost/admin/backend/productbuyer.php',
  getProductNotifyApiUrl: 'http://localhost/admin/backend/getProductNotification.php',
   getBuyerDataApiUrl: 'http://localhost/admin/backend/getProductBuyerData.php',
 
  // getUserDetailsApiURL: 'http://192.168.74.250/getUserLoginDetails.php',
  // searchApiUrl: 'http://192.168.74.250/search_product.php',
  // uploadDataApiUrl: 'http://192.168.74.250/uploadAdminData.php',
  // insertUserDetailsApiUrl: 'http://192.168.74.250/insertUserDetailsData.php',
  // getProductListDetailsApiUrl: 'http://192.168.74.250/getProductDetails.php',
  // productBuyerApiUrl: 'http://192.168.74.250/productbuyer.php',
  // getProductNotifyApiUrl: 'http://192.168.74.250/getProductNotification.php',
  // getBuyerDataApiUrl: 'http://192.168.74.250/getProductBuyerData.php',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

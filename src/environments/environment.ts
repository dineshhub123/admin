// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "xxxx",
    authDomain: "xxxx",
    projectId: "xxxx",
    messagingSenderId: "xxxx",
    appId: "xxxx"
  },


  getUserDetailsApiURL: 'https://ruralx.in/api/getUserLoginDetails.php',
  searchApiUrl: 'https://ruralx.in/api/search_product.php',
  uploadDataApiUrl: 'https://ruralx.in/api/uploadAdminData.php',
  insertUserDetailsApiUrl: 'https://ruralx.in/api/insertUserDetailsData.php',
  getProductListDetailsApiUrl: 'https://ruralx.in/api/getProductDetails.php',
  productBuyerApiUrl: 'https://ruralx.in/api/productbuyer.php',
  getProductNotifyApiUrl: 'https://ruralx.in/api/getProductNotification.php',
  getBuyerDataApiUrl: 'https://ruralx.in/api/getProductBuyerData.php',
  deleteProductListDetailsApiUrl: 'https://ruralx.in/api/delete_product.php',
  deleteCustomerListDetailsApiUrl: 'https://ruralx.in/api/delete_customer.php',
  deleteOrderListDetailsApiUrl: 'https://ruralx.in/api/delete_order.php',
  updateUserDetailsApiUrl: 'https://ruralx.in/api/updateUserDetails.php',
  updateProductDetailsApiUrl: 'https://ruralx.in/api/updateProductDetails.php',
  updateCategoryDetailsApiUrl: 'https://ruralx.in/api/updateCategoryDetails.php',
  editOrderDetailsApiUrl: 'https://ruralx.in/api/editOrderDetails.php',
  insertStoreDetailsApiUrl: 'https://ruralx.in/api/insertstoreList.php',
  getStoreDetailsApiUrl: 'https://ruralx.in/api/getStoreList.php',
  deleteStoreDetailsApiUrl: 'https://ruralx.in/api/deleteStore.php',
  getOrderListApiUrl: 'https://ruralx.in/api/getOrders.php',

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

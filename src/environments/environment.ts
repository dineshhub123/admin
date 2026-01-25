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
  updateUserDetailsApiUrl:'https://ruralx.in/api/updateUserDetails.php',
  updateProductDetailsApiUrl:'https://ruralx.in/api/updateProductDetails.php',
  updateCategoryDetailsApiUrl:'https://ruralx.in/api/updateCategoryDetails.php',
  editOrderDetailsApiUrl:'https://ruralx.in/api/editOrderDetails.php',
  insertStoreDetailsApiUrl:'https://ruralx.in/api/insertstoreList.php',
  getStoreDetailsApiUrl:'https://ruralx.in/api/getStoreList.php',
  deleteStoreDetailsApiUrl:'https://ruralx.in/api/deleteStore.php',
  getOrderListApiUrl: 'https://ruralx.in/api/getOrders.php',
  getPendingOrderApiUrl: 'https://ruralx.in/api/pending_order.php',
  getOrderByIdApiUrl: 'https://ruralx.in/api/get_order_by_id.php',
  upadateStatusApiUrl: 'https://ruralx.in/api/update_order_status.php',
  getOrderListByStatusApiUrl: 'https://ruralx.in/api/getOrderListByStatus.php',

  // getUserDetailsApiURL: 'http://localhost/getUserLoginDetails.php',
  // searchApiUrl: 'http://localhost/search_product.php',
   //uploadDataApiUrl: 'http://localhost/uploadAdminData.php',
  // insertUserDetailsApiUrl: 'http://localhost/insertUserDetailsData.php',
  // getProductListDetailsApiUrl: 'http://localhost/getProductDetails.php',
  // productBuyerApiUrl: 'http://localhost/productbuyer.php',
  // getProductNotifyApiUrl: 'http://localhost/getProductNotification.php',
  // getBuyerDataApiUrl: 'http://localhost/getProductBuyerData.php',
  // deleteProductListDetailsApiUrl: 'http://localhost/delete_product.php',
  // deleteCustomerListDetailsApiUrl: 'http://localhost/delete_customer.php',
  // deleteOrderListDetailsApiUrl: 'http://localhost/delete_order.php',
  // updateUserDetailsApiUrl: 'http://localhost/updateUserDetails.php',
  // updateProductDetailsApiUrl: 'http://localhost/updateProductDetails.php',
  // updateCategoryDetailsApiUrl: 'http://localhost/updateCategoryDetails.php',
  // editOrderDetailsApiUrl: 'http://localhost/editOrderDetails.php',
  // insertStoreDetailsApiUrl: 'http://localhost/insertstoreList.php',
  // getStoreDetailsApiUrl: 'http://localhost/getStoreList.php',
  // deleteStoreDetailsApiUrl: 'http://localhost/deleteStore.php',
  // getOrderListApiUrl: 'https://ruralx.in/api/getOrders.php',
  // getPendingOrderApiUrl: 'http://localhost/pending_order.php',
  // getOrderByIdApiUrl: 'http://localhost/get_order_by_id.php',
  // upadateStatusApiUrl: 'http://localhost/update_order_status.php',

};


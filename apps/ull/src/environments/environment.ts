// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseServerURL: "http://localhost:",
  authenticationServiceURL: "3333/api/authentication",
  chatServiceURL: "3337/api/chat",
  customerServiceURL: "3336/api/customer",
  accountingServiceURL: "3332/api/accounting",
  discoveryServiceURL: "3338/api/discovery",
  providerServiceURL: "3335/api/provider",
  reservationServiceURL: "3334/api/reservation",

  providerPicturesURL: "https://cdn.sbader.fr/provider/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

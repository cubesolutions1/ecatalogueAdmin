// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //apiUrl: 'http://localhost:3112/api/v1/',
   apiUrl: 'http://192.168.1.45:3112/api/v1/',
  // apiUrl: 'http://192.168.137.215:3112/api/v1/',
  // apiUrl: 'https://ecatalogueapi.herokuapp.com/api/v1/',
  //  apiUrl: 'http://catalogue.cubesolutions.tn:3112/api/v1/',
  // apiUrl: 'http://catalogueadmin.gmes.fr:3114/api/v1/',
  

  //apiImg: 'http://localhost:3112/img/',
  apiImg: 'http://192.168.1.45:3112/img/',
  // apiImg: 'http://192.168.137.215:3112/img/',
  // apiImg: 'https://ecatalogueapi.herokuapp.com/img/',
  //  apiImg: 'http://catalogue.cubesolutions.tn:3112/img/',
  // apiImg: 'http://catalogueadmin.gmes.fr:3114/img/',
  TOKEN: 'token',
  currentAdmin: 'currentAdmin',
  idUser: 'id',
  ExpiresIn: 'expiredIn',
  email: 'email'
};





// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,

  apiUrl: 'http://192.168.137.31:3112/api/v1/',
  // apiUrl: 'https://admin.neod-distri.fr:3116/api/v1/',
 // apiUrl: 'http://192.168.43.11:3112/api/v1/',
 //apiUrl: 'http://catalogue.cubesolutions.tn:3112/api/v1/',
   // apiUrl: 'http://192.168.1.39:3112/api/v1/',

 //apiImg :'https://admin.neod-distri.fr:3116/img/',
 apiImg: 'http://192.168.137.31:3112/img/',
  //apiImg: 'http://catalogue.cubesolutions.tn:3112/img/',
 // apiImg: 'http://192.168.1.39:3112:3112/img/',
 //apiImg: 'http://192.168.43.11:3112/img/',





  TOKEN: 'token',
  currentAdmin: 'currentAdmin',
  idUser: 'id',
  ExpiresIn: 'expiredIn',
  email: 'email'
};





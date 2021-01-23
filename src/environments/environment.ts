import { APP_INITIALIZER } from "@angular/core";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // api_url_ip: 'http://159.90.9.128/api/',
  // api_url_dns: 'http://api.reserva.ac.labf.usb.ve/api/',
  api_url: 'http://ec2-18-232-146-200.compute-1.amazonaws.com/api/'
};

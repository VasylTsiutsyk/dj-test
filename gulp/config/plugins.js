import plumber from 'gulp-plumber'; // errors
import notify from 'gulp-notify'; // notifications
import browsersync from 'browser-sync'; // local server
import newer from 'gulp-newer'; //check img updates
import ifPlugin from 'gulp-if'; // condition for mode

export const plugins = { plumber, notify, browsersync, newer, if: ifPlugin };

# Known Issues

This document tracks any recurring problems with the project setup or environment.
Contributors should check here first when they encounter errors during installation or testing.

## npm config warnings
If `npm test` prints `npm warn Unknown env config "http-proxy"`, your environment is still using
`npm_config_http_proxy` or `npm_config_https_proxy`. Update to the newer `npm_config_proxy` names
or unset the old variables to silence the warning.

## Test crashes from Node out-of-memory
The Spacesim tests occasionally exceed Node's default memory limit. If the test run aborts with
"FATAL ERROR: Ineffective mark-compacts near heap limit" set `NODE_OPTIONS=--max_old_space_size=4096`
when running `npm test`.

# Known Issues

This document tracks any recurring problems with the project setup or environment.
Contributors should check here first when they encounter errors during installation or testing.

## npm config warnings
- **Symptom**: `npm warn Unknown env config "http-proxy"` during `npm test`.
- **Cause**: the old `npm_config_http_proxy` or `npm_config_https_proxy` variables are set.
- **Fix**: rename them to `npm_config_proxy` or unset them.

## Test crashes from Node out-of-memory
- **Symptom**: tests abort with `FATAL ERROR: Ineffective mark-compacts near heap limit`.
- **Fix**: run `NODE_OPTIONS=--max_old_space_size=4096 npm test`.

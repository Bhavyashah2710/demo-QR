# Shah Café — QR Menu Demo

## Pages
- Customer menu: `index.html`
- Owner demo panel: `admin.html`

## Try the owner panel
1. Open `admin.html` (or `/demo-QR/admin.html` on GitHub Pages).
2. Demo PIN: **1234** (not a real secure authentication system).
3. Add/edit/delete menu items or toggle availability.
4. Open the customer menu in the **same browser** to see saved changes.

## Important demo limitation
This prototype stores edits in browser `localStorage`. It demonstrates the owner workflow, but edits do **not** sync to other phones/devices or browsers. For a real restaurant deployment, connect Firebase (authentication + database + image storage) or a hosted Sheets/API backend, and replace demo PIN with secure owner authentication. Do not use this demo PIN for real customer data.

Food items/prices are sample demo content; confirm actual menu and prices with the restaurant before publishing.

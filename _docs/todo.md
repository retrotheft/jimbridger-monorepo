# Todo

## Next

- [ ] Exo 2 font not included - change fonts to include in sitekit
- [ ] `panel.css` has problems on live site (inject styles doesn't work properly?)
- [ ] some rogue `$inspect` calls

## Main Site

- [x] write remote function to get github stars and commits (maybe the same query?)
- [x] fix background linear gradient to look like sitekit (brightness, maybe something in the way?)
- [ ] implement `StrategyHeader` from `SiteKit` on main site
   - [x] GitHub stars
   - [x] Workouts
   - [x] Time
   - [ ] Commits by Language
   - [ ] Hook up remote functions
- [ ] Clean up component split between sitekit and website
   - [x] remove old backgrounds from SiteKit
   - [x] move current background to SiteKit
   - [x] move non-UI focused components to Website (Workouts, Commits etc.)
- [ ] Games should have better loading UI feedback

## SiteKit

- [ ] date should have better error checking in `DateDisplay.svelte`

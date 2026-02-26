# Todo

## Main Site

- [x] write remote function to get github stars and commits (maybe the same query?)
- [x] fix background linear gradient to look like sitekit (brightness, maybe something in the way?)
- [ ] implement `StrategyHeader` from `SiteKit` on main site
   - [ ] GitHub stars
   - [ ] Commits by Language
   - [ ] Workouts
   - [ ] Time
   - [ ] Hook up remote functions
- [ ] Clean up component split between sitekit and website
   - [ ] remove old backgrounds from SiteKit
   - [ ] move current background to SiteKit
   - [ ] move non-UI focused components to Website (Workouts, Commits etc.)
- [ ] improve SVG handling

## SiteKit

- [ ] date should have better error checking in `DateDisplay.svelte`

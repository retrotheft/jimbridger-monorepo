# Kv-sheets Todo

- [x] make [key] universal, create new working copy without live copy
- [x] create `Remote` and `Local` components, `pass initialValue | undefined` down
- [x] implement remaining methods on `Sheet`
- [x] bring new iteration to feature parity
   - [x] styling
   - [x] comparison
   - [x] save remote: pass save function to `Remote.svelte`, provide via context
- [x] delete unused files
- [ ] create new sheet on empty navigation

---

- [ ] revise lastSaved logic (currently adding Date.now on save, not part of in-memory sheet)
- [ ] enforce field name uniqueness

---

## Files to Keep

- Remote
- Local
- Sheet.svelte.ts
- everything in `components/Sheet`
-

var Tetris = (function() {
  "use strict";
  const DEV = false;
  var is_array = Array.isArray;
  var index_of = Array.prototype.indexOf;
  var includes = Array.prototype.includes;
  var array_from = Array.from;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  var object_prototype = Object.prototype;
  var array_prototype = Array.prototype;
  var get_prototype_of = Object.getPrototypeOf;
  var is_extensible = Object.isExtensible;
  const noop = () => {
  };
  function run_all(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i]();
    }
  }
  function deferred() {
    var resolve;
    var reject;
    var promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }
  const DERIVED = 1 << 1;
  const EFFECT = 1 << 2;
  const RENDER_EFFECT = 1 << 3;
  const MANAGED_EFFECT = 1 << 24;
  const BLOCK_EFFECT = 1 << 4;
  const BRANCH_EFFECT = 1 << 5;
  const ROOT_EFFECT = 1 << 6;
  const BOUNDARY_EFFECT = 1 << 7;
  const CONNECTED = 1 << 9;
  const CLEAN = 1 << 10;
  const DIRTY = 1 << 11;
  const MAYBE_DIRTY = 1 << 12;
  const INERT = 1 << 13;
  const DESTROYED = 1 << 14;
  const EFFECT_RAN = 1 << 15;
  const EFFECT_TRANSPARENT = 1 << 16;
  const EAGER_EFFECT = 1 << 17;
  const HEAD_EFFECT = 1 << 18;
  const EFFECT_PRESERVED = 1 << 19;
  const USER_EFFECT = 1 << 20;
  const EFFECT_OFFSCREEN = 1 << 25;
  const WAS_MARKED = 1 << 15;
  const REACTION_IS_UPDATING = 1 << 21;
  const ASYNC = 1 << 22;
  const ERROR_VALUE = 1 << 23;
  const STATE_SYMBOL = /* @__PURE__ */ Symbol("$state");
  const STALE_REACTION = new class StaleReactionError extends Error {
    name = "StaleReactionError";
    message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
  }();
  function lifecycle_outside_component(name) {
    {
      throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
    }
  }
  function async_derived_orphan() {
    {
      throw new Error(`https://svelte.dev/e/async_derived_orphan`);
    }
  }
  function effect_in_teardown(rune) {
    {
      throw new Error(`https://svelte.dev/e/effect_in_teardown`);
    }
  }
  function effect_in_unowned_derived() {
    {
      throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
    }
  }
  function effect_orphan(rune) {
    {
      throw new Error(`https://svelte.dev/e/effect_orphan`);
    }
  }
  function effect_update_depth_exceeded() {
    {
      throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
    }
  }
  function state_descriptors_fixed() {
    {
      throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
    }
  }
  function state_prototype_fixed() {
    {
      throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
    }
  }
  function state_unsafe_mutation() {
    {
      throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
    }
  }
  function svelte_boundary_reset_onerror() {
    {
      throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
    }
  }
  const EACH_ITEM_REACTIVE = 1;
  const EACH_INDEX_REACTIVE = 1 << 1;
  const EACH_IS_CONTROLLED = 1 << 2;
  const EACH_IS_ANIMATED = 1 << 3;
  const EACH_ITEM_IMMUTABLE = 1 << 4;
  const TEMPLATE_FRAGMENT = 1;
  const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
  const UNINITIALIZED = /* @__PURE__ */ Symbol();
  function svelte_boundary_reset_noop() {
    {
      console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
    }
  }
  function equals(value) {
    return value === this.v;
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
  }
  function safe_equals(value) {
    return !safe_not_equal(value, this.v);
  }
  let tracing_mode_flag = false;
  let component_context = null;
  function set_component_context(context) {
    component_context = context;
  }
  function push(props, runes = false, fn) {
    component_context = {
      p: component_context,
      i: false,
      c: null,
      e: null,
      s: props,
      x: null,
      l: null
    };
  }
  function pop(component2) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    var effects = context.e;
    if (effects !== null) {
      context.e = null;
      for (var fn of effects) {
        create_user_effect(fn);
      }
    }
    context.i = true;
    component_context = context.p;
    return (
      /** @type {T} */
      {}
    );
  }
  function is_runes() {
    return true;
  }
  let micro_tasks = [];
  function run_micro_tasks() {
    var tasks = micro_tasks;
    micro_tasks = [];
    run_all(tasks);
  }
  function queue_micro_task(fn) {
    if (micro_tasks.length === 0 && true) {
      var tasks = micro_tasks;
      queueMicrotask(() => {
        if (tasks === micro_tasks) run_micro_tasks();
      });
    }
    micro_tasks.push(fn);
  }
  function handle_error(error) {
    var effect2 = active_effect;
    if (effect2 === null) {
      active_reaction.f |= ERROR_VALUE;
      return error;
    }
    if ((effect2.f & EFFECT_RAN) === 0) {
      if ((effect2.f & BOUNDARY_EFFECT) === 0) {
        throw error;
      }
      effect2.b.error(error);
    } else {
      invoke_error_boundary(error, effect2);
    }
  }
  function invoke_error_boundary(error, effect2) {
    while (effect2 !== null) {
      if ((effect2.f & BOUNDARY_EFFECT) !== 0) {
        try {
          effect2.b.error(error);
          return;
        } catch (e) {
          error = e;
        }
      }
      effect2 = effect2.parent;
    }
    throw error;
  }
  const STATUS_MASK = -7169;
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  function update_derived_status(derived2) {
    if ((derived2.f & CONNECTED) !== 0 || derived2.deps === null) {
      set_signal_status(derived2, CLEAN);
    } else {
      set_signal_status(derived2, MAYBE_DIRTY);
    }
  }
  function clear_marked(deps) {
    if (deps === null) return;
    for (const dep of deps) {
      if ((dep.f & DERIVED) === 0 || (dep.f & WAS_MARKED) === 0) {
        continue;
      }
      dep.f ^= WAS_MARKED;
      clear_marked(
        /** @type {Derived} */
        dep.deps
      );
    }
  }
  function defer_effect(effect2, dirty_effects, maybe_dirty_effects) {
    if ((effect2.f & DIRTY) !== 0) {
      dirty_effects.add(effect2);
    } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
      maybe_dirty_effects.add(effect2);
    }
    clear_marked(effect2.deps);
    set_signal_status(effect2, CLEAN);
  }
  const batches = /* @__PURE__ */ new Set();
  let current_batch = null;
  let batch_values = null;
  let queued_root_effects = [];
  let last_scheduled_effect = null;
  let is_flushing = false;
  class Batch {
    committed = false;
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    current = /* @__PURE__ */ new Map();
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    previous = /* @__PURE__ */ new Map();
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    #commit_callbacks = /* @__PURE__ */ new Set();
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    #discard_callbacks = /* @__PURE__ */ new Set();
    /**
     * The number of async effects that are currently in flight
     */
    #pending = 0;
    /**
     * The number of async effects that are currently in flight, _not_ inside a pending boundary
     */
    #blocking_pending = 0;
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    #deferred = null;
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    #dirty_effects = /* @__PURE__ */ new Set();
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    #maybe_dirty_effects = /* @__PURE__ */ new Set();
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    skipped_effects = /* @__PURE__ */ new Set();
    is_fork = false;
    #decrement_queued = false;
    is_deferred() {
      return this.is_fork || this.#blocking_pending > 0;
    }
    /**
     *
     * @param {Effect[]} root_effects
     */
    process(root_effects) {
      queued_root_effects = [];
      this.apply();
      var effects = [];
      var render_effects = [];
      for (const root2 of root_effects) {
        this.#traverse_effect_tree(root2, effects, render_effects);
      }
      if (this.is_deferred()) {
        this.#defer_effects(render_effects);
        this.#defer_effects(effects);
      } else {
        for (const fn of this.#commit_callbacks) fn();
        this.#commit_callbacks.clear();
        if (this.#pending === 0) {
          this.#commit();
        }
        current_batch = null;
        flush_queued_effects(render_effects);
        flush_queued_effects(effects);
        this.#deferred?.resolve();
      }
      batch_values = null;
    }
    /**
     * Traverse the effect tree, executing effects or stashing
     * them for later execution as appropriate
     * @param {Effect} root
     * @param {Effect[]} effects
     * @param {Effect[]} render_effects
     */
    #traverse_effect_tree(root2, effects, render_effects) {
      root2.f ^= CLEAN;
      var effect2 = root2.first;
      var pending_boundary = null;
      while (effect2 !== null) {
        var flags2 = effect2.f;
        var is_branch = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
        var is_skippable_branch = is_branch && (flags2 & CLEAN) !== 0;
        var skip = is_skippable_branch || (flags2 & INERT) !== 0 || this.skipped_effects.has(effect2);
        if (!skip && effect2.fn !== null) {
          if (is_branch) {
            effect2.f ^= CLEAN;
          } else if (pending_boundary !== null && (flags2 & (EFFECT | RENDER_EFFECT | MANAGED_EFFECT)) !== 0) {
            pending_boundary.b.defer_effect(effect2);
          } else if ((flags2 & EFFECT) !== 0) {
            effects.push(effect2);
          } else if (is_dirty(effect2)) {
            if ((flags2 & BLOCK_EFFECT) !== 0) this.#maybe_dirty_effects.add(effect2);
            update_effect(effect2);
          }
          var child2 = effect2.first;
          if (child2 !== null) {
            effect2 = child2;
            continue;
          }
        }
        var parent = effect2.parent;
        effect2 = effect2.next;
        while (effect2 === null && parent !== null) {
          if (parent === pending_boundary) {
            pending_boundary = null;
          }
          effect2 = parent.next;
          parent = parent.parent;
        }
      }
    }
    /**
     * @param {Effect[]} effects
     */
    #defer_effects(effects) {
      for (var i = 0; i < effects.length; i += 1) {
        defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
      }
    }
    /**
     * Associate a change to a given source with the current
     * batch, noting its previous and current values
     * @param {Source} source
     * @param {any} value
     */
    capture(source2, value) {
      if (value !== UNINITIALIZED && !this.previous.has(source2)) {
        this.previous.set(source2, value);
      }
      if ((source2.f & ERROR_VALUE) === 0) {
        this.current.set(source2, source2.v);
        batch_values?.set(source2, source2.v);
      }
    }
    activate() {
      current_batch = this;
      this.apply();
    }
    deactivate() {
      if (current_batch !== this) return;
      current_batch = null;
      batch_values = null;
    }
    flush() {
      this.activate();
      if (queued_root_effects.length > 0) {
        flush_effects();
        if (current_batch !== null && current_batch !== this) {
          return;
        }
      } else if (this.#pending === 0) {
        this.process([]);
      }
      this.deactivate();
    }
    discard() {
      for (const fn of this.#discard_callbacks) fn(this);
      this.#discard_callbacks.clear();
    }
    #commit() {
      if (batches.size > 1) {
        this.previous.clear();
        var previous_batch_values = batch_values;
        var is_earlier = true;
        for (const batch of batches) {
          if (batch === this) {
            is_earlier = false;
            continue;
          }
          const sources = [];
          for (const [source2, value] of this.current) {
            if (batch.current.has(source2)) {
              if (is_earlier && value !== batch.current.get(source2)) {
                batch.current.set(source2, value);
              } else {
                continue;
              }
            }
            sources.push(source2);
          }
          if (sources.length === 0) {
            continue;
          }
          const others = [...batch.current.keys()].filter((s) => !this.current.has(s));
          if (others.length > 0) {
            var prev_queued_root_effects = queued_root_effects;
            queued_root_effects = [];
            const marked = /* @__PURE__ */ new Set();
            const checked = /* @__PURE__ */ new Map();
            for (const source2 of sources) {
              mark_effects(source2, others, marked, checked);
            }
            if (queued_root_effects.length > 0) {
              current_batch = batch;
              batch.apply();
              for (const root2 of queued_root_effects) {
                batch.#traverse_effect_tree(root2, [], []);
              }
              batch.deactivate();
            }
            queued_root_effects = prev_queued_root_effects;
          }
        }
        current_batch = null;
        batch_values = previous_batch_values;
      }
      this.committed = true;
      batches.delete(this);
    }
    /**
     *
     * @param {boolean} blocking
     */
    increment(blocking) {
      this.#pending += 1;
      if (blocking) this.#blocking_pending += 1;
    }
    /**
     *
     * @param {boolean} blocking
     */
    decrement(blocking) {
      this.#pending -= 1;
      if (blocking) this.#blocking_pending -= 1;
      if (this.#decrement_queued) return;
      this.#decrement_queued = true;
      queue_micro_task(() => {
        this.#decrement_queued = false;
        if (!this.is_deferred()) {
          this.revive();
        } else if (queued_root_effects.length > 0) {
          this.flush();
        }
      });
    }
    revive() {
      for (const e of this.#dirty_effects) {
        this.#maybe_dirty_effects.delete(e);
        set_signal_status(e, DIRTY);
        schedule_effect(e);
      }
      for (const e of this.#maybe_dirty_effects) {
        set_signal_status(e, MAYBE_DIRTY);
        schedule_effect(e);
      }
      this.flush();
    }
    /** @param {() => void} fn */
    oncommit(fn) {
      this.#commit_callbacks.add(fn);
    }
    /** @param {(batch: Batch) => void} fn */
    ondiscard(fn) {
      this.#discard_callbacks.add(fn);
    }
    settled() {
      return (this.#deferred ??= deferred()).promise;
    }
    static ensure() {
      if (current_batch === null) {
        const batch = current_batch = new Batch();
        batches.add(current_batch);
        {
          queue_micro_task(() => {
            if (current_batch !== batch) {
              return;
            }
            batch.flush();
          });
        }
      }
      return current_batch;
    }
    apply() {
      return;
    }
  }
  function flush_effects() {
    is_flushing = true;
    var source_stacks = null;
    try {
      var flush_count = 0;
      while (queued_root_effects.length > 0) {
        var batch = Batch.ensure();
        if (flush_count++ > 1e3) {
          var updates, entry;
          if (DEV) ;
          infinite_loop_guard();
        }
        batch.process(queued_root_effects);
        old_values.clear();
        if (DEV) ;
      }
    } finally {
      is_flushing = false;
      last_scheduled_effect = null;
    }
  }
  function infinite_loop_guard() {
    try {
      effect_update_depth_exceeded();
    } catch (error) {
      invoke_error_boundary(error, last_scheduled_effect);
    }
  }
  let eager_block_effects = null;
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0) return;
    var i = 0;
    while (i < length) {
      var effect2 = effects[i++];
      if ((effect2.f & (DESTROYED | INERT)) === 0 && is_dirty(effect2)) {
        eager_block_effects = /* @__PURE__ */ new Set();
        update_effect(effect2);
        if (effect2.deps === null && effect2.first === null && effect2.nodes === null) {
          if (effect2.teardown === null && effect2.ac === null) {
            unlink_effect(effect2);
          } else {
            effect2.fn = null;
          }
        }
        if (eager_block_effects?.size > 0) {
          old_values.clear();
          for (const e of eager_block_effects) {
            if ((e.f & (DESTROYED | INERT)) !== 0) continue;
            const ordered_effects = [e];
            let ancestor = e.parent;
            while (ancestor !== null) {
              if (eager_block_effects.has(ancestor)) {
                eager_block_effects.delete(ancestor);
                ordered_effects.push(ancestor);
              }
              ancestor = ancestor.parent;
            }
            for (let j = ordered_effects.length - 1; j >= 0; j--) {
              const e2 = ordered_effects[j];
              if ((e2.f & (DESTROYED | INERT)) !== 0) continue;
              update_effect(e2);
            }
          }
          eager_block_effects.clear();
        }
      }
    }
    eager_block_effects = null;
  }
  function mark_effects(value, sources, marked, checked) {
    if (marked.has(value)) return;
    marked.add(value);
    if (value.reactions !== null) {
      for (const reaction of value.reactions) {
        const flags2 = reaction.f;
        if ((flags2 & DERIVED) !== 0) {
          mark_effects(
            /** @type {Derived} */
            reaction,
            sources,
            marked,
            checked
          );
        } else if ((flags2 & (ASYNC | BLOCK_EFFECT)) !== 0 && (flags2 & DIRTY) === 0 && depends_on(reaction, sources, checked)) {
          set_signal_status(reaction, DIRTY);
          schedule_effect(
            /** @type {Effect} */
            reaction
          );
        }
      }
    }
  }
  function depends_on(reaction, sources, checked) {
    const depends = checked.get(reaction);
    if (depends !== void 0) return depends;
    if (reaction.deps !== null) {
      for (const dep of reaction.deps) {
        if (includes.call(sources, dep)) {
          return true;
        }
        if ((dep.f & DERIVED) !== 0 && depends_on(
          /** @type {Derived} */
          dep,
          sources,
          checked
        )) {
          checked.set(
            /** @type {Derived} */
            dep,
            true
          );
          return true;
        }
      }
    }
    checked.set(reaction, false);
    return false;
  }
  function schedule_effect(signal) {
    var effect2 = last_scheduled_effect = signal;
    while (effect2.parent !== null) {
      effect2 = effect2.parent;
      var flags2 = effect2.f;
      if (is_flushing && effect2 === active_effect && (flags2 & BLOCK_EFFECT) !== 0 && (flags2 & HEAD_EFFECT) === 0) {
        return;
      }
      if ((flags2 & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags2 & CLEAN) === 0) return;
        effect2.f ^= CLEAN;
      }
    }
    queued_root_effects.push(effect2);
  }
  function createSubscriber(start) {
    let subscribers = 0;
    let version = source(0);
    let stop;
    return () => {
      if (effect_tracking()) {
        get(version);
        render_effect(() => {
          if (subscribers === 0) {
            stop = untrack(() => start(() => increment(version)));
          }
          subscribers += 1;
          return () => {
            queue_micro_task(() => {
              subscribers -= 1;
              if (subscribers === 0) {
                stop?.();
                stop = void 0;
                increment(version);
              }
            });
          };
        });
      }
    };
  }
  var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED | BOUNDARY_EFFECT;
  function boundary(node, props, children) {
    new Boundary(node, props, children);
  }
  class Boundary {
    /** @type {Boundary | null} */
    parent;
    is_pending = false;
    /** @type {TemplateNode} */
    #anchor;
    /** @type {TemplateNode | null} */
    #hydrate_open = null;
    /** @type {BoundaryProps} */
    #props;
    /** @type {((anchor: Node) => void)} */
    #children;
    /** @type {Effect} */
    #effect;
    /** @type {Effect | null} */
    #main_effect = null;
    /** @type {Effect | null} */
    #pending_effect = null;
    /** @type {Effect | null} */
    #failed_effect = null;
    /** @type {DocumentFragment | null} */
    #offscreen_fragment = null;
    /** @type {TemplateNode | null} */
    #pending_anchor = null;
    #local_pending_count = 0;
    #pending_count = 0;
    #pending_count_update_queued = false;
    #is_creating_fallback = false;
    /** @type {Set<Effect>} */
    #dirty_effects = /* @__PURE__ */ new Set();
    /** @type {Set<Effect>} */
    #maybe_dirty_effects = /* @__PURE__ */ new Set();
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    #effect_pending = null;
    #effect_pending_subscriber = createSubscriber(() => {
      this.#effect_pending = source(this.#local_pending_count);
      return () => {
        this.#effect_pending = null;
      };
    });
    /**
     * @param {TemplateNode} node
     * @param {BoundaryProps} props
     * @param {((anchor: Node) => void)} children
     */
    constructor(node, props, children) {
      this.#anchor = node;
      this.#props = props;
      this.#children = children;
      this.parent = /** @type {Effect} */
      active_effect.b;
      this.is_pending = !!this.#props.pending;
      this.#effect = block(() => {
        active_effect.b = this;
        {
          var anchor = this.#get_anchor();
          try {
            this.#main_effect = branch(() => children(anchor));
          } catch (error) {
            this.error(error);
          }
          if (this.#pending_count > 0) {
            this.#show_pending_snippet();
          } else {
            this.is_pending = false;
          }
        }
        return () => {
          this.#pending_anchor?.remove();
        };
      }, flags);
    }
    #hydrate_resolved_content() {
      try {
        this.#main_effect = branch(() => this.#children(this.#anchor));
      } catch (error) {
        this.error(error);
      }
    }
    #hydrate_pending_content() {
      const pending = this.#props.pending;
      if (!pending) return;
      this.#pending_effect = branch(() => pending(this.#anchor));
      queue_micro_task(() => {
        var anchor = this.#get_anchor();
        this.#main_effect = this.#run(() => {
          Batch.ensure();
          return branch(() => this.#children(anchor));
        });
        if (this.#pending_count > 0) {
          this.#show_pending_snippet();
        } else {
          pause_effect(
            /** @type {Effect} */
            this.#pending_effect,
            () => {
              this.#pending_effect = null;
            }
          );
          this.is_pending = false;
        }
      });
    }
    #get_anchor() {
      var anchor = this.#anchor;
      if (this.is_pending) {
        this.#pending_anchor = create_text();
        this.#anchor.before(this.#pending_anchor);
        anchor = this.#pending_anchor;
      }
      return anchor;
    }
    /**
     * Defer an effect inside a pending boundary until the boundary resolves
     * @param {Effect} effect
     */
    defer_effect(effect2) {
      defer_effect(effect2, this.#dirty_effects, this.#maybe_dirty_effects);
    }
    /**
     * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
     * @returns {boolean}
     */
    is_rendered() {
      return !this.is_pending && (!this.parent || this.parent.is_rendered());
    }
    has_pending_snippet() {
      return !!this.#props.pending;
    }
    /**
     * @param {() => Effect | null} fn
     */
    #run(fn) {
      var previous_effect = active_effect;
      var previous_reaction = active_reaction;
      var previous_ctx = component_context;
      set_active_effect(this.#effect);
      set_active_reaction(this.#effect);
      set_component_context(this.#effect.ctx);
      try {
        return fn();
      } catch (e) {
        handle_error(e);
        return null;
      } finally {
        set_active_effect(previous_effect);
        set_active_reaction(previous_reaction);
        set_component_context(previous_ctx);
      }
    }
    #show_pending_snippet() {
      const pending = (
        /** @type {(anchor: Node) => void} */
        this.#props.pending
      );
      if (this.#main_effect !== null) {
        this.#offscreen_fragment = document.createDocumentFragment();
        this.#offscreen_fragment.append(
          /** @type {TemplateNode} */
          this.#pending_anchor
        );
        move_effect(this.#main_effect, this.#offscreen_fragment);
      }
      if (this.#pending_effect === null) {
        this.#pending_effect = branch(() => pending(this.#anchor));
      }
    }
    /**
     * Updates the pending count associated with the currently visible pending snippet,
     * if any, such that we can replace the snippet with content once work is done
     * @param {1 | -1} d
     */
    #update_pending_count(d) {
      if (!this.has_pending_snippet()) {
        if (this.parent) {
          this.parent.#update_pending_count(d);
        }
        return;
      }
      this.#pending_count += d;
      if (this.#pending_count === 0) {
        this.is_pending = false;
        for (const e of this.#dirty_effects) {
          set_signal_status(e, DIRTY);
          schedule_effect(e);
        }
        for (const e of this.#maybe_dirty_effects) {
          set_signal_status(e, MAYBE_DIRTY);
          schedule_effect(e);
        }
        this.#dirty_effects.clear();
        this.#maybe_dirty_effects.clear();
        if (this.#pending_effect) {
          pause_effect(this.#pending_effect, () => {
            this.#pending_effect = null;
          });
        }
        if (this.#offscreen_fragment) {
          this.#anchor.before(this.#offscreen_fragment);
          this.#offscreen_fragment = null;
        }
      }
    }
    /**
     * Update the source that powers `$effect.pending()` inside this boundary,
     * and controls when the current `pending` snippet (if any) is removed.
     * Do not call from inside the class
     * @param {1 | -1} d
     */
    update_pending_count(d) {
      this.#update_pending_count(d);
      this.#local_pending_count += d;
      if (!this.#effect_pending || this.#pending_count_update_queued) return;
      this.#pending_count_update_queued = true;
      queue_micro_task(() => {
        this.#pending_count_update_queued = false;
        if (this.#effect_pending) {
          internal_set(this.#effect_pending, this.#local_pending_count);
        }
      });
    }
    get_effect_pending() {
      this.#effect_pending_subscriber();
      return get(
        /** @type {Source<number>} */
        this.#effect_pending
      );
    }
    /** @param {unknown} error */
    error(error) {
      var onerror = this.#props.onerror;
      let failed = this.#props.failed;
      if (this.#is_creating_fallback || !onerror && !failed) {
        throw error;
      }
      if (this.#main_effect) {
        destroy_effect(this.#main_effect);
        this.#main_effect = null;
      }
      if (this.#pending_effect) {
        destroy_effect(this.#pending_effect);
        this.#pending_effect = null;
      }
      if (this.#failed_effect) {
        destroy_effect(this.#failed_effect);
        this.#failed_effect = null;
      }
      var did_reset = false;
      var calling_on_error = false;
      const reset = () => {
        if (did_reset) {
          svelte_boundary_reset_noop();
          return;
        }
        did_reset = true;
        if (calling_on_error) {
          svelte_boundary_reset_onerror();
        }
        Batch.ensure();
        this.#local_pending_count = 0;
        if (this.#failed_effect !== null) {
          pause_effect(this.#failed_effect, () => {
            this.#failed_effect = null;
          });
        }
        this.is_pending = this.has_pending_snippet();
        this.#main_effect = this.#run(() => {
          this.#is_creating_fallback = false;
          return branch(() => this.#children(this.#anchor));
        });
        if (this.#pending_count > 0) {
          this.#show_pending_snippet();
        } else {
          this.is_pending = false;
        }
      };
      queue_micro_task(() => {
        try {
          calling_on_error = true;
          onerror?.(error, reset);
          calling_on_error = false;
        } catch (error2) {
          invoke_error_boundary(error2, this.#effect && this.#effect.parent);
        }
        if (failed) {
          this.#failed_effect = this.#run(() => {
            Batch.ensure();
            this.#is_creating_fallback = true;
            try {
              return branch(() => {
                failed(
                  this.#anchor,
                  () => error,
                  () => reset
                );
              });
            } catch (error2) {
              invoke_error_boundary(
                error2,
                /** @type {Effect} */
                this.#effect.parent
              );
              return null;
            } finally {
              this.#is_creating_fallback = false;
            }
          });
        }
      });
    }
  }
  function flatten(blockers, sync, async, fn) {
    const d = derived;
    var pending = blockers.filter((b) => !b.settled);
    if (async.length === 0 && pending.length === 0) {
      fn(sync.map(d));
      return;
    }
    var batch = current_batch;
    var parent = (
      /** @type {Effect} */
      active_effect
    );
    var restore = capture();
    var blocker_promise = pending.length === 1 ? pending[0].promise : pending.length > 1 ? Promise.all(pending.map((b) => b.promise)) : null;
    function finish(values) {
      restore();
      try {
        fn(values);
      } catch (error) {
        if ((parent.f & DESTROYED) === 0) {
          invoke_error_boundary(error, parent);
        }
      }
      batch?.deactivate();
      unset_context();
    }
    if (async.length === 0) {
      blocker_promise.then(() => finish(sync.map(d)));
      return;
    }
    function run() {
      restore();
      Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then((result) => finish([...sync.map(d), ...result])).catch((error) => invoke_error_boundary(error, parent));
    }
    if (blocker_promise) {
      blocker_promise.then(run);
    } else {
      run();
    }
  }
  function capture() {
    var previous_effect = active_effect;
    var previous_reaction = active_reaction;
    var previous_component_context = component_context;
    var previous_batch = current_batch;
    return function restore(activate_batch = true) {
      set_active_effect(previous_effect);
      set_active_reaction(previous_reaction);
      set_component_context(previous_component_context);
      if (activate_batch) previous_batch?.activate();
    };
  }
  function unset_context() {
    set_active_effect(null);
    set_active_reaction(null);
    set_component_context(null);
  }
  // @__NO_SIDE_EFFECTS__
  function derived(fn) {
    var flags2 = DERIVED | DIRTY;
    var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
      /** @type {Derived} */
      active_reaction
    ) : null;
    if (active_effect !== null) {
      active_effect.f |= EFFECT_PRESERVED;
    }
    const signal = {
      ctx: component_context,
      deps: null,
      effects: null,
      equals,
      f: flags2,
      fn,
      reactions: null,
      rv: 0,
      v: (
        /** @type {V} */
        UNINITIALIZED
      ),
      wv: 0,
      parent: parent_derived ?? active_effect,
      ac: null
    };
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function async_derived(fn, label, location) {
    let parent = (
      /** @type {Effect | null} */
      active_effect
    );
    if (parent === null) {
      async_derived_orphan();
    }
    var boundary2 = (
      /** @type {Boundary} */
      parent.b
    );
    var promise = (
      /** @type {Promise<V>} */
      /** @type {unknown} */
      void 0
    );
    var signal = source(
      /** @type {V} */
      UNINITIALIZED
    );
    var should_suspend = !active_reaction;
    var deferreds = /* @__PURE__ */ new Map();
    async_effect(() => {
      var d = deferred();
      promise = d.promise;
      try {
        Promise.resolve(fn()).then(d.resolve, d.reject).then(() => {
          if (batch === current_batch && batch.committed) {
            batch.deactivate();
          }
          unset_context();
        });
      } catch (error) {
        d.reject(error);
        unset_context();
      }
      var batch = (
        /** @type {Batch} */
        current_batch
      );
      if (should_suspend) {
        var blocking = boundary2.is_rendered();
        boundary2.update_pending_count(1);
        batch.increment(blocking);
        deferreds.get(batch)?.reject(STALE_REACTION);
        deferreds.delete(batch);
        deferreds.set(batch, d);
      }
      const handler = (value, error = void 0) => {
        batch.activate();
        if (error) {
          if (error !== STALE_REACTION) {
            signal.f |= ERROR_VALUE;
            internal_set(signal, error);
          }
        } else {
          if ((signal.f & ERROR_VALUE) !== 0) {
            signal.f ^= ERROR_VALUE;
          }
          internal_set(signal, value);
          for (const [b, d2] of deferreds) {
            deferreds.delete(b);
            if (b === batch) break;
            d2.reject(STALE_REACTION);
          }
        }
        if (should_suspend) {
          boundary2.update_pending_count(-1);
          batch.decrement(blocking);
        }
      };
      d.promise.then(handler, (e) => handler(null, e || "unknown"));
    });
    teardown(() => {
      for (const d of deferreds.values()) {
        d.reject(STALE_REACTION);
      }
    });
    return new Promise((fulfil) => {
      function next(p) {
        function go() {
          if (p === promise) {
            fulfil(signal);
          } else {
            next(promise);
          }
        }
        p.then(go, go);
      }
      next(promise);
    });
  }
  // @__NO_SIDE_EFFECTS__
  function user_derived(fn) {
    const d = /* @__PURE__ */ derived(fn);
    push_reaction_value(d);
    return d;
  }
  // @__NO_SIDE_EFFECTS__
  function derived_safe_equal(fn) {
    const signal = /* @__PURE__ */ derived(fn);
    signal.equals = safe_equals;
    return signal;
  }
  function destroy_derived_effects(derived2) {
    var effects = derived2.effects;
    if (effects !== null) {
      derived2.effects = null;
      for (var i = 0; i < effects.length; i += 1) {
        destroy_effect(
          /** @type {Effect} */
          effects[i]
        );
      }
    }
  }
  function get_derived_parent_effect(derived2) {
    var parent = derived2.parent;
    while (parent !== null) {
      if ((parent.f & DERIVED) === 0) {
        return (parent.f & DESTROYED) === 0 ? (
          /** @type {Effect} */
          parent
        ) : null;
      }
      parent = parent.parent;
    }
    return null;
  }
  function execute_derived(derived2) {
    var value;
    var prev_active_effect = active_effect;
    set_active_effect(get_derived_parent_effect(derived2));
    {
      try {
        derived2.f &= ~WAS_MARKED;
        destroy_derived_effects(derived2);
        value = update_reaction(derived2);
      } finally {
        set_active_effect(prev_active_effect);
      }
    }
    return value;
  }
  function update_derived(derived2) {
    var value = execute_derived(derived2);
    if (!derived2.equals(value)) {
      derived2.wv = increment_write_version();
      if (!current_batch?.is_fork || derived2.deps === null) {
        derived2.v = value;
        if (derived2.deps === null) {
          set_signal_status(derived2, CLEAN);
          return;
        }
      }
    }
    if (is_destroying_effect) {
      return;
    }
    if (batch_values !== null) {
      if (effect_tracking() || current_batch?.is_fork) {
        batch_values.set(derived2, value);
      }
    } else {
      update_derived_status(derived2);
    }
  }
  let eager_effects = /* @__PURE__ */ new Set();
  const old_values = /* @__PURE__ */ new Map();
  let eager_effects_deferred = false;
  function source(v, stack) {
    var signal = {
      f: 0,
      // TODO ideally we could skip this altogether, but it causes type errors
      v,
      reactions: null,
      equals,
      rv: 0,
      wv: 0
    };
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function state(v, stack) {
    const s = source(v);
    push_reaction_value(s);
    return s;
  }
  // @__NO_SIDE_EFFECTS__
  function mutable_source(initial_value, immutable = false, trackable = true) {
    const s = source(initial_value);
    if (!immutable) {
      s.equals = safe_equals;
    }
    return s;
  }
  function set(source2, value, should_proxy = false) {
    if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
    // to ensure we error if state is set inside an inspect effect
    (!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 && (current_sources === null || !includes.call(current_sources, source2))) {
      state_unsafe_mutation();
    }
    let new_value = should_proxy ? proxy(value) : value;
    return internal_set(source2, new_value);
  }
  function internal_set(source2, value) {
    if (!source2.equals(value)) {
      var old_value = source2.v;
      if (is_destroying_effect) {
        old_values.set(source2, value);
      } else {
        old_values.set(source2, old_value);
      }
      source2.v = value;
      var batch = Batch.ensure();
      batch.capture(source2, old_value);
      if ((source2.f & DERIVED) !== 0) {
        const derived2 = (
          /** @type {Derived} */
          source2
        );
        if ((source2.f & DIRTY) !== 0) {
          execute_derived(derived2);
        }
        update_derived_status(derived2);
      }
      source2.wv = increment_write_version();
      mark_reactions(source2, DIRTY);
      if (active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
        if (untracked_writes === null) {
          set_untracked_writes([source2]);
        } else {
          untracked_writes.push(source2);
        }
      }
      if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
        flush_eager_effects();
      }
    }
    return value;
  }
  function flush_eager_effects() {
    eager_effects_deferred = false;
    for (const effect2 of eager_effects) {
      if ((effect2.f & CLEAN) !== 0) {
        set_signal_status(effect2, MAYBE_DIRTY);
      }
      if (is_dirty(effect2)) {
        update_effect(effect2);
      }
    }
    eager_effects.clear();
  }
  function increment(source2) {
    set(source2, source2.v + 1);
  }
  function mark_reactions(signal, status) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags2 = reaction.f;
      var not_dirty = (flags2 & DIRTY) === 0;
      if (not_dirty) {
        set_signal_status(reaction, status);
      }
      if ((flags2 & DERIVED) !== 0) {
        var derived2 = (
          /** @type {Derived} */
          reaction
        );
        batch_values?.delete(derived2);
        if ((flags2 & WAS_MARKED) === 0) {
          if (flags2 & CONNECTED) {
            reaction.f |= WAS_MARKED;
          }
          mark_reactions(derived2, MAYBE_DIRTY);
        }
      } else if (not_dirty) {
        if ((flags2 & BLOCK_EFFECT) !== 0 && eager_block_effects !== null) {
          eager_block_effects.add(
            /** @type {Effect} */
            reaction
          );
        }
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
  function proxy(value) {
    if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
      return value;
    }
    const prototype = get_prototype_of(value);
    if (prototype !== object_prototype && prototype !== array_prototype) {
      return value;
    }
    var sources = /* @__PURE__ */ new Map();
    var is_proxied_array = is_array(value);
    var version = /* @__PURE__ */ state(0);
    var parent_version = update_version;
    var with_parent = (fn) => {
      if (update_version === parent_version) {
        return fn();
      }
      var reaction = active_reaction;
      var version2 = update_version;
      set_active_reaction(null);
      set_update_version(parent_version);
      var result = fn();
      set_active_reaction(reaction);
      set_update_version(version2);
      return result;
    };
    if (is_proxied_array) {
      sources.set("length", /* @__PURE__ */ state(
        /** @type {any[]} */
        value.length
      ));
    }
    return new Proxy(
      /** @type {any} */
      value,
      {
        defineProperty(_, prop2, descriptor) {
          if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
            state_descriptors_fixed();
          }
          var s = sources.get(prop2);
          if (s === void 0) {
            s = with_parent(() => {
              var s2 = /* @__PURE__ */ state(descriptor.value);
              sources.set(prop2, s2);
              return s2;
            });
          } else {
            set(s, descriptor.value, true);
          }
          return true;
        },
        deleteProperty(target, prop2) {
          var s = sources.get(prop2);
          if (s === void 0) {
            if (prop2 in target) {
              const s2 = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
              sources.set(prop2, s2);
              increment(version);
            }
          } else {
            set(s, UNINITIALIZED);
            increment(version);
          }
          return true;
        },
        get(target, prop2, receiver) {
          if (prop2 === STATE_SYMBOL) {
            return value;
          }
          var s = sources.get(prop2);
          var exists = prop2 in target;
          if (s === void 0 && (!exists || get_descriptor(target, prop2)?.writable)) {
            s = with_parent(() => {
              var p = proxy(exists ? target[prop2] : UNINITIALIZED);
              var s2 = /* @__PURE__ */ state(p);
              return s2;
            });
            sources.set(prop2, s);
          }
          if (s !== void 0) {
            var v = get(s);
            return v === UNINITIALIZED ? void 0 : v;
          }
          return Reflect.get(target, prop2, receiver);
        },
        getOwnPropertyDescriptor(target, prop2) {
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor && "value" in descriptor) {
            var s = sources.get(prop2);
            if (s) descriptor.value = get(s);
          } else if (descriptor === void 0) {
            var source2 = sources.get(prop2);
            var value2 = source2?.v;
            if (source2 !== void 0 && value2 !== UNINITIALIZED) {
              return {
                enumerable: true,
                configurable: true,
                value: value2,
                writable: true
              };
            }
          }
          return descriptor;
        },
        has(target, prop2) {
          if (prop2 === STATE_SYMBOL) {
            return true;
          }
          var s = sources.get(prop2);
          var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
          if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop2)?.writable)) {
            if (s === void 0) {
              s = with_parent(() => {
                var p = has ? proxy(target[prop2]) : UNINITIALIZED;
                var s2 = /* @__PURE__ */ state(p);
                return s2;
              });
              sources.set(prop2, s);
            }
            var value2 = get(s);
            if (value2 === UNINITIALIZED) {
              return false;
            }
          }
          return has;
        },
        set(target, prop2, value2, receiver) {
          var s = sources.get(prop2);
          var has = prop2 in target;
          if (is_proxied_array && prop2 === "length") {
            for (var i = value2; i < /** @type {Source<number>} */
            s.v; i += 1) {
              var other_s = sources.get(i + "");
              if (other_s !== void 0) {
                set(other_s, UNINITIALIZED);
              } else if (i in target) {
                other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
                sources.set(i + "", other_s);
              }
            }
          }
          if (s === void 0) {
            if (!has || get_descriptor(target, prop2)?.writable) {
              s = with_parent(() => /* @__PURE__ */ state(void 0));
              set(s, proxy(value2));
              sources.set(prop2, s);
            }
          } else {
            has = s.v !== UNINITIALIZED;
            var p = with_parent(() => proxy(value2));
            set(s, p);
          }
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor?.set) {
            descriptor.set.call(receiver, value2);
          }
          if (!has) {
            if (is_proxied_array && typeof prop2 === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop2);
              if (Number.isInteger(n) && n >= ls.v) {
                set(ls, n + 1);
              }
            }
            increment(version);
          }
          return true;
        },
        ownKeys(target) {
          get(version);
          var own_keys = Reflect.ownKeys(target).filter((key2) => {
            var source3 = sources.get(key2);
            return source3 === void 0 || source3.v !== UNINITIALIZED;
          });
          for (var [key, source2] of sources) {
            if (source2.v !== UNINITIALIZED && !(key in target)) {
              own_keys.push(key);
            }
          }
          return own_keys;
        },
        setPrototypeOf() {
          state_prototype_fixed();
        }
      }
    );
  }
  var $window;
  var $document;
  var is_firefox;
  var first_child_getter;
  var next_sibling_getter;
  function init_operations() {
    if ($window !== void 0) {
      return;
    }
    $window = window;
    $document = document;
    is_firefox = /Firefox/.test(navigator.userAgent);
    var element_prototype = Element.prototype;
    var node_prototype = Node.prototype;
    var text_prototype = Text.prototype;
    first_child_getter = get_descriptor(node_prototype, "firstChild").get;
    next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
    if (is_extensible(element_prototype)) {
      element_prototype.__click = void 0;
      element_prototype.__className = void 0;
      element_prototype.__attributes = null;
      element_prototype.__style = void 0;
      element_prototype.__e = void 0;
    }
    if (is_extensible(text_prototype)) {
      text_prototype.__t = void 0;
    }
  }
  function create_text(value = "") {
    return document.createTextNode(value);
  }
  // @__NO_SIDE_EFFECTS__
  function get_first_child(node) {
    return (
      /** @type {TemplateNode | null} */
      first_child_getter.call(node)
    );
  }
  // @__NO_SIDE_EFFECTS__
  function get_next_sibling(node) {
    return (
      /** @type {TemplateNode | null} */
      next_sibling_getter.call(node)
    );
  }
  function child(node, is_text) {
    {
      return /* @__PURE__ */ get_first_child(node);
    }
  }
  function first_child(node, is_text = false) {
    {
      var first = /* @__PURE__ */ get_first_child(node);
      if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
      return first;
    }
  }
  function sibling(node, count = 1, is_text = false) {
    let next_sibling = node;
    while (count--) {
      next_sibling = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(next_sibling);
    }
    {
      return next_sibling;
    }
  }
  function clear_text_content(node) {
    node.textContent = "";
  }
  function should_defer_append() {
    return false;
  }
  function without_reactive_context(fn) {
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      return fn();
    } finally {
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function validate_effect(rune) {
    if (active_effect === null) {
      if (active_reaction === null) {
        effect_orphan();
      }
      effect_in_unowned_derived();
    }
    if (is_destroying_effect) {
      effect_in_teardown();
    }
  }
  function push_effect(effect2, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect2;
    } else {
      parent_last.next = effect2;
      effect2.prev = parent_last;
      parent_effect.last = effect2;
    }
  }
  function create_effect(type, fn, sync) {
    var parent = active_effect;
    if (parent !== null && (parent.f & INERT) !== 0) {
      type |= INERT;
    }
    var effect2 = {
      ctx: component_context,
      deps: null,
      nodes: null,
      f: type | DIRTY | CONNECTED,
      first: null,
      fn,
      last: null,
      next: null,
      parent,
      b: parent && parent.b,
      prev: null,
      teardown: null,
      wv: 0,
      ac: null
    };
    if (sync) {
      try {
        update_effect(effect2);
        effect2.f |= EFFECT_RAN;
      } catch (e2) {
        destroy_effect(effect2);
        throw e2;
      }
    } else if (fn !== null) {
      schedule_effect(effect2);
    }
    var e = effect2;
    if (sync && e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && // either `null`, or a singular child
    (e.f & EFFECT_PRESERVED) === 0) {
      e = e.first;
      if ((type & BLOCK_EFFECT) !== 0 && (type & EFFECT_TRANSPARENT) !== 0 && e !== null) {
        e.f |= EFFECT_TRANSPARENT;
      }
    }
    if (e !== null) {
      e.parent = parent;
      if (parent !== null) {
        push_effect(e, parent);
      }
      if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0 && (type & ROOT_EFFECT) === 0) {
        var derived2 = (
          /** @type {Derived} */
          active_reaction
        );
        (derived2.effects ??= []).push(e);
      }
    }
    return effect2;
  }
  function effect_tracking() {
    return active_reaction !== null && !untracking;
  }
  function teardown(fn) {
    const effect2 = create_effect(RENDER_EFFECT, null, false);
    set_signal_status(effect2, CLEAN);
    effect2.teardown = fn;
    return effect2;
  }
  function user_effect(fn) {
    validate_effect();
    var flags2 = (
      /** @type {Effect} */
      active_effect.f
    );
    var defer = !active_reaction && (flags2 & BRANCH_EFFECT) !== 0 && (flags2 & EFFECT_RAN) === 0;
    if (defer) {
      var context = (
        /** @type {ComponentContext} */
        component_context
      );
      (context.e ??= []).push(fn);
    } else {
      return create_user_effect(fn);
    }
  }
  function create_user_effect(fn) {
    return create_effect(EFFECT | USER_EFFECT, fn, false);
  }
  function component_root(fn) {
    Batch.ensure();
    const effect2 = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn, true);
    return (options = {}) => {
      return new Promise((fulfil) => {
        if (options.outro) {
          pause_effect(effect2, () => {
            destroy_effect(effect2);
            fulfil(void 0);
          });
        } else {
          destroy_effect(effect2);
          fulfil(void 0);
        }
      });
    };
  }
  function effect(fn) {
    return create_effect(EFFECT, fn, false);
  }
  function async_effect(fn) {
    return create_effect(ASYNC | EFFECT_PRESERVED, fn, true);
  }
  function render_effect(fn, flags2 = 0) {
    return create_effect(RENDER_EFFECT | flags2, fn, true);
  }
  function template_effect(fn, sync = [], async = [], blockers = []) {
    flatten(blockers, sync, async, (values) => {
      create_effect(RENDER_EFFECT, () => fn(...values.map(get)), true);
    });
  }
  function block(fn, flags2 = 0) {
    var effect2 = create_effect(BLOCK_EFFECT | flags2, fn, true);
    return effect2;
  }
  function branch(fn) {
    return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn, true);
  }
  function execute_effect_teardown(effect2) {
    var teardown2 = effect2.teardown;
    if (teardown2 !== null) {
      const previously_destroying_effect = is_destroying_effect;
      const previous_reaction = active_reaction;
      set_is_destroying_effect(true);
      set_active_reaction(null);
      try {
        teardown2.call(null);
      } finally {
        set_is_destroying_effect(previously_destroying_effect);
        set_active_reaction(previous_reaction);
      }
    }
  }
  function destroy_effect_children(signal, remove_dom = false) {
    var effect2 = signal.first;
    signal.first = signal.last = null;
    while (effect2 !== null) {
      const controller = effect2.ac;
      if (controller !== null) {
        without_reactive_context(() => {
          controller.abort(STALE_REACTION);
        });
      }
      var next = effect2.next;
      if ((effect2.f & ROOT_EFFECT) !== 0) {
        effect2.parent = null;
      } else {
        destroy_effect(effect2, remove_dom);
      }
      effect2 = next;
    }
  }
  function destroy_block_effect_children(signal) {
    var effect2 = signal.first;
    while (effect2 !== null) {
      var next = effect2.next;
      if ((effect2.f & BRANCH_EFFECT) === 0) {
        destroy_effect(effect2);
      }
      effect2 = next;
    }
  }
  function destroy_effect(effect2, remove_dom = true) {
    var removed = false;
    if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes !== null && effect2.nodes.end !== null) {
      remove_effect_dom(
        effect2.nodes.start,
        /** @type {TemplateNode} */
        effect2.nodes.end
      );
      removed = true;
    }
    destroy_effect_children(effect2, remove_dom && !removed);
    remove_reactions(effect2, 0);
    set_signal_status(effect2, DESTROYED);
    var transitions = effect2.nodes && effect2.nodes.t;
    if (transitions !== null) {
      for (const transition of transitions) {
        transition.stop();
      }
    }
    execute_effect_teardown(effect2);
    var parent = effect2.parent;
    if (parent !== null && parent.first !== null) {
      unlink_effect(effect2);
    }
    effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes = effect2.ac = null;
  }
  function remove_effect_dom(node, end) {
    while (node !== null) {
      var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
      node.remove();
      node = next;
    }
  }
  function unlink_effect(effect2) {
    var parent = effect2.parent;
    var prev = effect2.prev;
    var next = effect2.next;
    if (prev !== null) prev.next = next;
    if (next !== null) next.prev = prev;
    if (parent !== null) {
      if (parent.first === effect2) parent.first = next;
      if (parent.last === effect2) parent.last = prev;
    }
  }
  function pause_effect(effect2, callback, destroy = true) {
    var transitions = [];
    pause_children(effect2, transitions, true);
    var fn = () => {
      if (destroy) destroy_effect(effect2);
      if (callback) callback();
    };
    var remaining = transitions.length;
    if (remaining > 0) {
      var check = () => --remaining || fn();
      for (var transition of transitions) {
        transition.out(check);
      }
    } else {
      fn();
    }
  }
  function pause_children(effect2, transitions, local) {
    if ((effect2.f & INERT) !== 0) return;
    effect2.f ^= INERT;
    var t = effect2.nodes && effect2.nodes.t;
    if (t !== null) {
      for (const transition of t) {
        if (transition.is_global || local) {
          transitions.push(transition);
        }
      }
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (child2.f & BRANCH_EFFECT) !== 0 && (effect2.f & BLOCK_EFFECT) !== 0;
      pause_children(child2, transitions, transparent ? local : false);
      child2 = sibling2;
    }
  }
  function resume_effect(effect2) {
    resume_children(effect2, true);
  }
  function resume_children(effect2, local) {
    if ((effect2.f & INERT) === 0) return;
    effect2.f ^= INERT;
    if ((effect2.f & CLEAN) === 0) {
      set_signal_status(effect2, DIRTY);
      schedule_effect(effect2);
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      resume_children(child2, transparent ? local : false);
      child2 = sibling2;
    }
    var t = effect2.nodes && effect2.nodes.t;
    if (t !== null) {
      for (const transition of t) {
        if (transition.is_global || local) {
          transition.in();
        }
      }
    }
  }
  function move_effect(effect2, fragment) {
    if (!effect2.nodes) return;
    var node = effect2.nodes.start;
    var end = effect2.nodes.end;
    while (node !== null) {
      var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
      fragment.append(node);
      node = next;
    }
  }
  let is_updating_effect = false;
  let is_destroying_effect = false;
  function set_is_destroying_effect(value) {
    is_destroying_effect = value;
  }
  let active_reaction = null;
  let untracking = false;
  function set_active_reaction(reaction) {
    active_reaction = reaction;
  }
  let active_effect = null;
  function set_active_effect(effect2) {
    active_effect = effect2;
  }
  let current_sources = null;
  function push_reaction_value(value) {
    if (active_reaction !== null && true) {
      if (current_sources === null) {
        current_sources = [value];
      } else {
        current_sources.push(value);
      }
    }
  }
  let new_deps = null;
  let skipped_deps = 0;
  let untracked_writes = null;
  function set_untracked_writes(value) {
    untracked_writes = value;
  }
  let write_version = 1;
  let read_version = 0;
  let update_version = read_version;
  function set_update_version(value) {
    update_version = value;
  }
  function increment_write_version() {
    return ++write_version;
  }
  function is_dirty(reaction) {
    var flags2 = reaction.f;
    if ((flags2 & DIRTY) !== 0) {
      return true;
    }
    if (flags2 & DERIVED) {
      reaction.f &= ~WAS_MARKED;
    }
    if ((flags2 & MAYBE_DIRTY) !== 0) {
      var dependencies = (
        /** @type {Value[]} */
        reaction.deps
      );
      var length = dependencies.length;
      for (var i = 0; i < length; i++) {
        var dependency = dependencies[i];
        if (is_dirty(
          /** @type {Derived} */
          dependency
        )) {
          update_derived(
            /** @type {Derived} */
            dependency
          );
        }
        if (dependency.wv > reaction.wv) {
          return true;
        }
      }
      if ((flags2 & CONNECTED) !== 0 && // During time traveling we don't want to reset the status so that
      // traversal of the graph in the other batches still happens
      batch_values === null) {
        set_signal_status(reaction, CLEAN);
      }
    }
    return false;
  }
  function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    if (current_sources !== null && includes.call(current_sources, signal)) {
      return;
    }
    for (var i = 0; i < reactions.length; i++) {
      var reaction = reactions[i];
      if ((reaction.f & DERIVED) !== 0) {
        schedule_possible_effect_self_invalidation(
          /** @type {Derived} */
          reaction,
          effect2,
          false
        );
      } else if (effect2 === reaction) {
        if (root2) {
          set_signal_status(reaction, DIRTY);
        } else if ((reaction.f & CLEAN) !== 0) {
          set_signal_status(reaction, MAYBE_DIRTY);
        }
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
  function update_reaction(reaction) {
    var previous_deps = new_deps;
    var previous_skipped_deps = skipped_deps;
    var previous_untracked_writes = untracked_writes;
    var previous_reaction = active_reaction;
    var previous_sources = current_sources;
    var previous_component_context = component_context;
    var previous_untracking = untracking;
    var previous_update_version = update_version;
    var flags2 = reaction.f;
    new_deps = /** @type {null | Value[]} */
    null;
    skipped_deps = 0;
    untracked_writes = null;
    active_reaction = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
    current_sources = null;
    set_component_context(reaction.ctx);
    untracking = false;
    update_version = ++read_version;
    if (reaction.ac !== null) {
      without_reactive_context(() => {
        reaction.ac.abort(STALE_REACTION);
      });
      reaction.ac = null;
    }
    try {
      reaction.f |= REACTION_IS_UPDATING;
      var fn = (
        /** @type {Function} */
        reaction.fn
      );
      var result = fn();
      var deps = reaction.deps;
      if (new_deps !== null) {
        var i;
        remove_reactions(reaction, skipped_deps);
        if (deps !== null && skipped_deps > 0) {
          deps.length = skipped_deps + new_deps.length;
          for (i = 0; i < new_deps.length; i++) {
            deps[skipped_deps + i] = new_deps[i];
          }
        } else {
          reaction.deps = deps = new_deps;
        }
        if (effect_tracking() && (reaction.f & CONNECTED) !== 0) {
          for (i = skipped_deps; i < deps.length; i++) {
            (deps[i].reactions ??= []).push(reaction);
          }
        }
      } else if (deps !== null && skipped_deps < deps.length) {
        remove_reactions(reaction, skipped_deps);
        deps.length = skipped_deps;
      }
      if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
        for (i = 0; i < /** @type {Source[]} */
        untracked_writes.length; i++) {
          schedule_possible_effect_self_invalidation(
            untracked_writes[i],
            /** @type {Effect} */
            reaction
          );
        }
      }
      if (previous_reaction !== null && previous_reaction !== reaction) {
        read_version++;
        if (previous_reaction.deps !== null) {
          for (let i2 = 0; i2 < previous_skipped_deps; i2 += 1) {
            previous_reaction.deps[i2].rv = read_version;
          }
        }
        if (previous_deps !== null) {
          for (const dep of previous_deps) {
            dep.rv = read_version;
          }
        }
        if (untracked_writes !== null) {
          if (previous_untracked_writes === null) {
            previous_untracked_writes = untracked_writes;
          } else {
            previous_untracked_writes.push(.../** @type {Source[]} */
            untracked_writes);
          }
        }
      }
      if ((reaction.f & ERROR_VALUE) !== 0) {
        reaction.f ^= ERROR_VALUE;
      }
      return result;
    } catch (error) {
      return handle_error(error);
    } finally {
      reaction.f ^= REACTION_IS_UPDATING;
      new_deps = previous_deps;
      skipped_deps = previous_skipped_deps;
      untracked_writes = previous_untracked_writes;
      active_reaction = previous_reaction;
      current_sources = previous_sources;
      set_component_context(previous_component_context);
      untracking = previous_untracking;
      update_version = previous_update_version;
    }
  }
  function remove_reaction(signal, dependency) {
    let reactions = dependency.reactions;
    if (reactions !== null) {
      var index2 = index_of.call(reactions, signal);
      if (index2 !== -1) {
        var new_length = reactions.length - 1;
        if (new_length === 0) {
          reactions = dependency.reactions = null;
        } else {
          reactions[index2] = reactions[new_length];
          reactions.pop();
        }
      }
    }
    if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
    // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
    // allows us to skip the expensive work of disconnecting and immediately reconnecting it
    (new_deps === null || !includes.call(new_deps, dependency))) {
      var derived2 = (
        /** @type {Derived} */
        dependency
      );
      if ((derived2.f & CONNECTED) !== 0) {
        derived2.f ^= CONNECTED;
        derived2.f &= ~WAS_MARKED;
      }
      update_derived_status(derived2);
      destroy_derived_effects(derived2);
      remove_reactions(derived2, 0);
    }
  }
  function remove_reactions(signal, start_index) {
    var dependencies = signal.deps;
    if (dependencies === null) return;
    for (var i = start_index; i < dependencies.length; i++) {
      remove_reaction(signal, dependencies[i]);
    }
  }
  function update_effect(effect2) {
    var flags2 = effect2.f;
    if ((flags2 & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect2, CLEAN);
    var previous_effect = active_effect;
    var was_updating_effect = is_updating_effect;
    active_effect = effect2;
    is_updating_effect = true;
    try {
      if ((flags2 & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0) {
        destroy_block_effect_children(effect2);
      } else {
        destroy_effect_children(effect2);
      }
      execute_effect_teardown(effect2);
      var teardown2 = update_reaction(effect2);
      effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
      effect2.wv = write_version;
      var dep;
      if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && effect2.deps !== null) ;
    } finally {
      is_updating_effect = was_updating_effect;
      active_effect = previous_effect;
    }
  }
  function get(signal) {
    var flags2 = signal.f;
    var is_derived = (flags2 & DERIVED) !== 0;
    if (active_reaction !== null && !untracking) {
      var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
      if (!destroyed && (current_sources === null || !includes.call(current_sources, signal))) {
        var deps = active_reaction.deps;
        if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
          if (signal.rv < read_version) {
            signal.rv = read_version;
            if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
              skipped_deps++;
            } else if (new_deps === null) {
              new_deps = [signal];
            } else {
              new_deps.push(signal);
            }
          }
        } else {
          (active_reaction.deps ??= []).push(signal);
          var reactions = signal.reactions;
          if (reactions === null) {
            signal.reactions = [active_reaction];
          } else if (!includes.call(reactions, active_reaction)) {
            reactions.push(active_reaction);
          }
        }
      }
    }
    if (is_destroying_effect && old_values.has(signal)) {
      return old_values.get(signal);
    }
    if (is_derived) {
      var derived2 = (
        /** @type {Derived} */
        signal
      );
      if (is_destroying_effect) {
        var value = derived2.v;
        if ((derived2.f & CLEAN) === 0 && derived2.reactions !== null || depends_on_old_values(derived2)) {
          value = execute_derived(derived2);
        }
        old_values.set(derived2, value);
        return value;
      }
      var should_connect = (derived2.f & CONNECTED) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & CONNECTED) !== 0);
      var is_new = derived2.deps === null;
      if (is_dirty(derived2)) {
        if (should_connect) {
          derived2.f |= CONNECTED;
        }
        update_derived(derived2);
      }
      if (should_connect && !is_new) {
        reconnect(derived2);
      }
    }
    if (batch_values?.has(signal)) {
      return batch_values.get(signal);
    }
    if ((signal.f & ERROR_VALUE) !== 0) {
      throw signal.v;
    }
    return signal.v;
  }
  function reconnect(derived2) {
    if (derived2.deps === null) return;
    derived2.f |= CONNECTED;
    for (const dep of derived2.deps) {
      (dep.reactions ??= []).push(derived2);
      if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
        reconnect(
          /** @type {Derived} */
          dep
        );
      }
    }
  }
  function depends_on_old_values(derived2) {
    if (derived2.v === UNINITIALIZED) return true;
    if (derived2.deps === null) return false;
    for (const dep of derived2.deps) {
      if (old_values.has(dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
        /** @type {Derived} */
        dep
      )) {
        return true;
      }
    }
    return false;
  }
  function untrack(fn) {
    var previous_untracking = untracking;
    try {
      untracking = true;
      return fn();
    } finally {
      untracking = previous_untracking;
    }
  }
  const PASSIVE_EVENTS = ["touchstart", "touchmove"];
  function is_passive_event(name) {
    return PASSIVE_EVENTS.includes(name);
  }
  const all_registered_events = /* @__PURE__ */ new Set();
  const root_event_handles = /* @__PURE__ */ new Set();
  function create_event(event_name, dom, handler, options = {}) {
    function target_handler(event2) {
      if (!options.capture) {
        handle_event_propagation.call(dom, event2);
      }
      if (!event2.cancelBubble) {
        return without_reactive_context(() => {
          return handler?.call(this, event2);
        });
      }
    }
    if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
      queue_micro_task(() => {
        dom.addEventListener(event_name, target_handler, options);
      });
    } else {
      dom.addEventListener(event_name, target_handler, options);
    }
    return target_handler;
  }
  function event(event_name, dom, handler, capture2, passive) {
    var options = { capture: capture2, passive };
    var target_handler = create_event(event_name, dom, handler, options);
    if (dom === document.body || // @ts-ignore
    dom === window || // @ts-ignore
    dom === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
    dom instanceof HTMLMediaElement) {
      teardown(() => {
        dom.removeEventListener(event_name, target_handler, options);
      });
    }
  }
  function delegate(events) {
    for (var i = 0; i < events.length; i++) {
      all_registered_events.add(events[i]);
    }
    for (var fn of root_event_handles) {
      fn(events);
    }
  }
  let last_propagated_event = null;
  function handle_event_propagation(event2) {
    var handler_element = this;
    var owner_document = (
      /** @type {Node} */
      handler_element.ownerDocument
    );
    var event_name = event2.type;
    var path = event2.composedPath?.() || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event2.target
    );
    last_propagated_event = event2;
    var path_idx = 0;
    var handled_at = last_propagated_event === event2 && event2.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event2.__root = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx;
      }
    }
    current_target = /** @type {Element} */
    path[path_idx] || event2.target;
    if (current_target === handler_element) return;
    define_property(event2, "currentTarget", {
      configurable: true,
      get() {
        return current_target || owner_document;
      }
    });
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      var throw_error;
      var other_errors = [];
      while (current_target !== null) {
        var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
        current_target.host || null;
        try {
          var delegated = current_target["__" + event_name];
          if (delegated != null && (!/** @type {any} */
          current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          event2.target === current_target)) {
            delegated.call(current_target, event2);
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
          break;
        }
        current_target = parent_element;
      }
      if (throw_error) {
        for (let error of other_errors) {
          queueMicrotask(() => {
            throw error;
          });
        }
        throw throw_error;
      }
    } finally {
      event2.__root = handler_element;
      delete event2.currentTarget;
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function create_fragment_from_html(html) {
    var elem = document.createElement("template");
    elem.innerHTML = html.replaceAll("<!>", "<!---->");
    return elem.content;
  }
  function assign_nodes(start, end) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (effect2.nodes === null) {
      effect2.nodes = { start, end, a: null, t: null };
    }
  }
  // @__NO_SIDE_EFFECTS__
  function from_html(content, flags2) {
    var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
    var use_import_node = (flags2 & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    var has_start = !content.startsWith("<!>");
    return () => {
      if (node === void 0) {
        node = create_fragment_from_html(has_start ? content : "<!>" + content);
        if (!is_fragment) node = /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(node);
      }
      var clone = (
        /** @type {TemplateNode} */
        use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
      );
      if (is_fragment) {
        var start = (
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_first_child(clone)
        );
        var end = (
          /** @type {TemplateNode} */
          clone.lastChild
        );
        assign_nodes(start, end);
      } else {
        assign_nodes(clone, clone);
      }
      return clone;
    };
  }
  function comment() {
    var frag = document.createDocumentFragment();
    var start = document.createComment("");
    var anchor = create_text();
    frag.append(start, anchor);
    assign_nodes(start, anchor);
    return frag;
  }
  function append(anchor, dom) {
    if (anchor === null) {
      return;
    }
    anchor.before(
      /** @type {Node} */
      dom
    );
  }
  function set_text(text, value) {
    var str = value == null ? "" : typeof value === "object" ? value + "" : value;
    if (str !== (text.__t ??= text.nodeValue)) {
      text.__t = str;
      text.nodeValue = str + "";
    }
  }
  function mount(component2, options) {
    return _mount(component2, options);
  }
  const document_listeners = /* @__PURE__ */ new Map();
  function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
    init_operations();
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive = is_passive_event(event_name);
        target.addEventListener(event_name, handle_event_propagation, { passive });
        var n = document_listeners.get(event_name);
        if (n === void 0) {
          document.addEventListener(event_name, handle_event_propagation, { passive });
          document_listeners.set(event_name, 1);
        } else {
          document_listeners.set(event_name, n + 1);
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    var component2 = void 0;
    var unmount = component_root(() => {
      var anchor_node = anchor ?? target.appendChild(create_text());
      boundary(
        /** @type {TemplateNode} */
        anchor_node,
        {
          pending: () => {
          }
        },
        (anchor_node2) => {
          if (context) {
            push({});
            var ctx = (
              /** @type {ComponentContext} */
              component_context
            );
            ctx.c = context;
          }
          if (events) {
            props.$$events = events;
          }
          component2 = Component(anchor_node2, props) || {};
          if (context) {
            pop();
          }
        }
      );
      return () => {
        for (var event_name of registered_events) {
          target.removeEventListener(event_name, handle_event_propagation);
          var n = (
            /** @type {number} */
            document_listeners.get(event_name)
          );
          if (--n === 0) {
            document.removeEventListener(event_name, handle_event_propagation);
            document_listeners.delete(event_name);
          } else {
            document_listeners.set(event_name, n);
          }
        }
        root_event_handles.delete(event_handle);
        if (anchor_node !== anchor) {
          anchor_node.parentNode?.removeChild(anchor_node);
        }
      };
    });
    mounted_components.set(component2, unmount);
    return component2;
  }
  let mounted_components = /* @__PURE__ */ new WeakMap();
  class BranchManager {
    /** @type {TemplateNode} */
    anchor;
    /** @type {Map<Batch, Key>} */
    #batches = /* @__PURE__ */ new Map();
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    #onscreen = /* @__PURE__ */ new Map();
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    #offscreen = /* @__PURE__ */ new Map();
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    #outroing = /* @__PURE__ */ new Set();
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    #transition = true;
    /**
     * @param {TemplateNode} anchor
     * @param {boolean} transition
     */
    constructor(anchor, transition = true) {
      this.anchor = anchor;
      this.#transition = transition;
    }
    #commit = () => {
      var batch = (
        /** @type {Batch} */
        current_batch
      );
      if (!this.#batches.has(batch)) return;
      var key = (
        /** @type {Key} */
        this.#batches.get(batch)
      );
      var onscreen = this.#onscreen.get(key);
      if (onscreen) {
        resume_effect(onscreen);
        this.#outroing.delete(key);
      } else {
        var offscreen = this.#offscreen.get(key);
        if (offscreen) {
          this.#onscreen.set(key, offscreen.effect);
          this.#offscreen.delete(key);
          offscreen.fragment.lastChild.remove();
          this.anchor.before(offscreen.fragment);
          onscreen = offscreen.effect;
        }
      }
      for (const [b, k] of this.#batches) {
        this.#batches.delete(b);
        if (b === batch) {
          break;
        }
        const offscreen2 = this.#offscreen.get(k);
        if (offscreen2) {
          destroy_effect(offscreen2.effect);
          this.#offscreen.delete(k);
        }
      }
      for (const [k, effect2] of this.#onscreen) {
        if (k === key || this.#outroing.has(k)) continue;
        const on_destroy = () => {
          const keys = Array.from(this.#batches.values());
          if (keys.includes(k)) {
            var fragment = document.createDocumentFragment();
            move_effect(effect2, fragment);
            fragment.append(create_text());
            this.#offscreen.set(k, { effect: effect2, fragment });
          } else {
            destroy_effect(effect2);
          }
          this.#outroing.delete(k);
          this.#onscreen.delete(k);
        };
        if (this.#transition || !onscreen) {
          this.#outroing.add(k);
          pause_effect(effect2, on_destroy, false);
        } else {
          on_destroy();
        }
      }
    };
    /**
     * @param {Batch} batch
     */
    #discard = (batch) => {
      this.#batches.delete(batch);
      const keys = Array.from(this.#batches.values());
      for (const [k, branch2] of this.#offscreen) {
        if (!keys.includes(k)) {
          destroy_effect(branch2.effect);
          this.#offscreen.delete(k);
        }
      }
    };
    /**
     *
     * @param {any} key
     * @param {null | ((target: TemplateNode) => void)} fn
     */
    ensure(key, fn) {
      var batch = (
        /** @type {Batch} */
        current_batch
      );
      var defer = should_defer_append();
      if (fn && !this.#onscreen.has(key) && !this.#offscreen.has(key)) {
        if (defer) {
          var fragment = document.createDocumentFragment();
          var target = create_text();
          fragment.append(target);
          this.#offscreen.set(key, {
            effect: branch(() => fn(target)),
            fragment
          });
        } else {
          this.#onscreen.set(
            key,
            branch(() => fn(this.anchor))
          );
        }
      }
      this.#batches.set(batch, key);
      if (defer) {
        for (const [k, effect2] of this.#onscreen) {
          if (k === key) {
            batch.skipped_effects.delete(effect2);
          } else {
            batch.skipped_effects.add(effect2);
          }
        }
        for (const [k, branch2] of this.#offscreen) {
          if (k === key) {
            batch.skipped_effects.delete(branch2.effect);
          } else {
            batch.skipped_effects.add(branch2.effect);
          }
        }
        batch.oncommit(this.#commit);
        batch.ondiscard(this.#discard);
      } else {
        this.#commit();
      }
    }
  }
  function if_block(node, fn, elseif = false) {
    var branches = new BranchManager(node);
    var flags2 = elseif ? EFFECT_TRANSPARENT : 0;
    function update_branch(condition, fn2) {
      branches.ensure(condition, fn2);
    }
    block(() => {
      var has_branch = false;
      fn((fn2, flag = true) => {
        has_branch = true;
        update_branch(flag, fn2);
      });
      if (!has_branch) {
        update_branch(false, null);
      }
    }, flags2);
  }
  function index(_, i) {
    return i;
  }
  function pause_effects(state2, to_destroy, controlled_anchor) {
    var transitions = [];
    var length = to_destroy.length;
    var group;
    var remaining = to_destroy.length;
    for (var i = 0; i < length; i++) {
      let effect2 = to_destroy[i];
      pause_effect(
        effect2,
        () => {
          if (group) {
            group.pending.delete(effect2);
            group.done.add(effect2);
            if (group.pending.size === 0) {
              var groups = (
                /** @type {Set<EachOutroGroup>} */
                state2.outrogroups
              );
              destroy_effects(array_from(group.done));
              groups.delete(group);
              if (groups.size === 0) {
                state2.outrogroups = null;
              }
            }
          } else {
            remaining -= 1;
          }
        },
        false
      );
    }
    if (remaining === 0) {
      var fast_path = transitions.length === 0 && controlled_anchor !== null;
      if (fast_path) {
        var anchor = (
          /** @type {Element} */
          controlled_anchor
        );
        var parent_node = (
          /** @type {Element} */
          anchor.parentNode
        );
        clear_text_content(parent_node);
        parent_node.append(anchor);
        state2.items.clear();
      }
      destroy_effects(to_destroy, !fast_path);
    } else {
      group = {
        pending: new Set(to_destroy),
        done: /* @__PURE__ */ new Set()
      };
      (state2.outrogroups ??= /* @__PURE__ */ new Set()).add(group);
    }
  }
  function destroy_effects(to_destroy, remove_dom = true) {
    for (var i = 0; i < to_destroy.length; i++) {
      destroy_effect(to_destroy[i], remove_dom);
    }
  }
  var offscreen_anchor;
  function each(node, flags2, get_collection, get_key, render_fn, fallback_fn = null) {
    var anchor = node;
    var items = /* @__PURE__ */ new Map();
    var is_controlled = (flags2 & EACH_IS_CONTROLLED) !== 0;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        node
      );
      anchor = parent_node.appendChild(create_text());
    }
    var fallback = null;
    var each_array = /* @__PURE__ */ derived_safe_equal(() => {
      var collection = get_collection();
      return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
    });
    var array;
    var first_run = true;
    function commit() {
      state2.fallback = fallback;
      reconcile(state2, array, anchor, flags2, get_key);
      if (fallback !== null) {
        if (array.length === 0) {
          if ((fallback.f & EFFECT_OFFSCREEN) === 0) {
            resume_effect(fallback);
          } else {
            fallback.f ^= EFFECT_OFFSCREEN;
            move(fallback, null, anchor);
          }
        } else {
          pause_effect(fallback, () => {
            fallback = null;
          });
        }
      }
    }
    var effect2 = block(() => {
      array = /** @type {V[]} */
      get(each_array);
      var length = array.length;
      var keys = /* @__PURE__ */ new Set();
      var batch = (
        /** @type {Batch} */
        current_batch
      );
      var defer = should_defer_append();
      for (var index2 = 0; index2 < length; index2 += 1) {
        var value = array[index2];
        var key = get_key(value, index2);
        var item = first_run ? null : items.get(key);
        if (item) {
          if (item.v) internal_set(item.v, value);
          if (item.i) internal_set(item.i, index2);
          if (defer) {
            batch.skipped_effects.delete(item.e);
          }
        } else {
          item = create_item(
            items,
            first_run ? anchor : offscreen_anchor ??= create_text(),
            value,
            key,
            index2,
            render_fn,
            flags2,
            get_collection
          );
          if (!first_run) {
            item.e.f |= EFFECT_OFFSCREEN;
          }
          items.set(key, item);
        }
        keys.add(key);
      }
      if (length === 0 && fallback_fn && !fallback) {
        if (first_run) {
          fallback = branch(() => fallback_fn(anchor));
        } else {
          fallback = branch(() => fallback_fn(offscreen_anchor ??= create_text()));
          fallback.f |= EFFECT_OFFSCREEN;
        }
      }
      if (!first_run) {
        if (defer) {
          for (const [key2, item2] of items) {
            if (!keys.has(key2)) {
              batch.skipped_effects.add(item2.e);
            }
          }
          batch.oncommit(commit);
          batch.ondiscard(() => {
          });
        } else {
          commit();
        }
      }
      get(each_array);
    });
    var state2 = { effect: effect2, items, outrogroups: null, fallback };
    first_run = false;
  }
  function skip_to_branch(effect2) {
    while (effect2 !== null && (effect2.f & BRANCH_EFFECT) === 0) {
      effect2 = effect2.next;
    }
    return effect2;
  }
  function reconcile(state2, array, anchor, flags2, get_key) {
    var is_animated = (flags2 & EACH_IS_ANIMATED) !== 0;
    var length = array.length;
    var items = state2.items;
    var current = skip_to_branch(state2.effect.first);
    var seen;
    var prev = null;
    var to_animate;
    var matched = [];
    var stashed = [];
    var value;
    var key;
    var effect2;
    var i;
    if (is_animated) {
      for (i = 0; i < length; i += 1) {
        value = array[i];
        key = get_key(value, i);
        effect2 = /** @type {EachItem} */
        items.get(key).e;
        if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
          effect2.nodes?.a?.measure();
          (to_animate ??= /* @__PURE__ */ new Set()).add(effect2);
        }
      }
    }
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      effect2 = /** @type {EachItem} */
      items.get(key).e;
      if (state2.outrogroups !== null) {
        for (const group of state2.outrogroups) {
          group.pending.delete(effect2);
          group.done.delete(effect2);
        }
      }
      if ((effect2.f & EFFECT_OFFSCREEN) !== 0) {
        effect2.f ^= EFFECT_OFFSCREEN;
        if (effect2 === current) {
          move(effect2, null, anchor);
        } else {
          var next = prev ? prev.next : current;
          if (effect2 === state2.effect.last) {
            state2.effect.last = effect2.prev;
          }
          if (effect2.prev) effect2.prev.next = effect2.next;
          if (effect2.next) effect2.next.prev = effect2.prev;
          link(state2, prev, effect2);
          link(state2, effect2, next);
          move(effect2, next, anchor);
          prev = effect2;
          matched = [];
          stashed = [];
          current = skip_to_branch(prev.next);
          continue;
        }
      }
      if ((effect2.f & INERT) !== 0) {
        resume_effect(effect2);
        if (is_animated) {
          effect2.nodes?.a?.unfix();
          (to_animate ??= /* @__PURE__ */ new Set()).delete(effect2);
        }
      }
      if (effect2 !== current) {
        if (seen !== void 0 && seen.has(effect2)) {
          if (matched.length < stashed.length) {
            var start = stashed[0];
            var j;
            prev = start.prev;
            var a = matched[0];
            var b = matched[matched.length - 1];
            for (j = 0; j < matched.length; j += 1) {
              move(matched[j], start, anchor);
            }
            for (j = 0; j < stashed.length; j += 1) {
              seen.delete(stashed[j]);
            }
            link(state2, a.prev, b.next);
            link(state2, prev, a);
            link(state2, b, start);
            current = start;
            prev = b;
            i -= 1;
            matched = [];
            stashed = [];
          } else {
            seen.delete(effect2);
            move(effect2, current, anchor);
            link(state2, effect2.prev, effect2.next);
            link(state2, effect2, prev === null ? state2.effect.first : prev.next);
            link(state2, prev, effect2);
            prev = effect2;
          }
          continue;
        }
        matched = [];
        stashed = [];
        while (current !== null && current !== effect2) {
          (seen ??= /* @__PURE__ */ new Set()).add(current);
          stashed.push(current);
          current = skip_to_branch(current.next);
        }
        if (current === null) {
          continue;
        }
      }
      if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
        matched.push(effect2);
      }
      prev = effect2;
      current = skip_to_branch(effect2.next);
    }
    if (state2.outrogroups !== null) {
      for (const group of state2.outrogroups) {
        if (group.pending.size === 0) {
          destroy_effects(array_from(group.done));
          state2.outrogroups?.delete(group);
        }
      }
      if (state2.outrogroups.size === 0) {
        state2.outrogroups = null;
      }
    }
    if (current !== null || seen !== void 0) {
      var to_destroy = [];
      if (seen !== void 0) {
        for (effect2 of seen) {
          if ((effect2.f & INERT) === 0) {
            to_destroy.push(effect2);
          }
        }
      }
      while (current !== null) {
        if ((current.f & INERT) === 0 && current !== state2.fallback) {
          to_destroy.push(current);
        }
        current = skip_to_branch(current.next);
      }
      var destroy_length = to_destroy.length;
      if (destroy_length > 0) {
        var controlled_anchor = (flags2 & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
        if (is_animated) {
          for (i = 0; i < destroy_length; i += 1) {
            to_destroy[i].nodes?.a?.measure();
          }
          for (i = 0; i < destroy_length; i += 1) {
            to_destroy[i].nodes?.a?.fix();
          }
        }
        pause_effects(state2, to_destroy, controlled_anchor);
      }
    }
    if (is_animated) {
      queue_micro_task(() => {
        if (to_animate === void 0) return;
        for (effect2 of to_animate) {
          effect2.nodes?.a?.apply();
        }
      });
    }
  }
  function create_item(items, anchor, value, key, index2, render_fn, flags2, get_collection) {
    var v = (flags2 & EACH_ITEM_REACTIVE) !== 0 ? (flags2 & EACH_ITEM_IMMUTABLE) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
    var i = (flags2 & EACH_INDEX_REACTIVE) !== 0 ? source(index2) : null;
    return {
      v,
      i,
      e: branch(() => {
        render_fn(anchor, v ?? value, i ?? index2, get_collection);
        return () => {
          items.delete(key);
        };
      })
    };
  }
  function move(effect2, next, anchor) {
    if (!effect2.nodes) return;
    var node = effect2.nodes.start;
    var end = effect2.nodes.end;
    var dest = next && (next.f & EFFECT_OFFSCREEN) === 0 ? (
      /** @type {EffectNodes} */
      next.nodes.start
    ) : anchor;
    while (node !== null) {
      var next_node = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      dest.before(node);
      if (node === end) {
        return;
      }
      node = next_node;
    }
  }
  function link(state2, prev, next) {
    if (prev === null) {
      state2.effect.first = next;
    } else {
      prev.next = next;
    }
    if (next === null) {
      state2.effect.last = prev;
    } else {
      next.prev = prev;
    }
  }
  function snippet(node, get_snippet, ...args) {
    var branches = new BranchManager(node);
    block(() => {
      const snippet2 = get_snippet() ?? null;
      branches.ensure(snippet2, snippet2 && ((anchor) => snippet2(anchor, ...args)));
    }, EFFECT_TRANSPARENT);
  }
  function component(node, get_component, render_fn) {
    var branches = new BranchManager(node);
    block(() => {
      var component2 = get_component() ?? null;
      branches.ensure(component2, component2 && ((target) => render_fn(target, component2)));
    }, EFFECT_TRANSPARENT);
  }
  function head(hash, render_fn) {
    var anchor;
    {
      anchor = document.head.appendChild(create_text());
    }
    try {
      block(() => render_fn(anchor), HEAD_EFFECT);
    } finally {
    }
  }
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx$1() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }
  function clsx(value) {
    if (typeof value === "object") {
      return clsx$1(value);
    } else {
      return value ?? "";
    }
  }
  const whitespace = [..." 	\n\r\f \v\uFEFF"];
  function to_class(value, hash, directives) {
    var classname = value == null ? "" : "" + value;
    if (directives) {
      for (var key in directives) {
        if (directives[key]) {
          classname = classname ? classname + " " + key : key;
        } else if (classname.length) {
          var len = key.length;
          var a = 0;
          while ((a = classname.indexOf(key, a)) >= 0) {
            var b = a + len;
            if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
              classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
            } else {
              a = b;
            }
          }
        }
      }
    }
    return classname === "" ? null : classname;
  }
  function to_style(value, styles) {
    return value == null ? null : String(value);
  }
  function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
    var prev = dom.__className;
    if (prev !== value || prev === void 0) {
      var next_class_name = to_class(value, hash, next_classes);
      {
        if (next_class_name == null) {
          dom.removeAttribute("class");
        } else {
          dom.className = next_class_name;
        }
      }
      dom.__className = value;
    } else if (next_classes && prev_classes !== next_classes) {
      for (var key in next_classes) {
        var is_present = !!next_classes[key];
        if (prev_classes == null || is_present !== !!prev_classes[key]) {
          dom.classList.toggle(key, is_present);
        }
      }
    }
    return next_classes;
  }
  function set_style(dom, value, prev_styles, next_styles) {
    var prev = dom.__style;
    if (prev !== value) {
      var next_style_attr = to_style(value);
      {
        if (next_style_attr == null) {
          dom.removeAttribute("style");
        } else {
          dom.style.cssText = next_style_attr;
        }
      }
      dom.__style = value;
    }
    return next_styles;
  }
  function prop(props, key, flags2, fallback) {
    var fallback_value = (
      /** @type {V} */
      fallback
    );
    var fallback_dirty = true;
    var get_fallback = () => {
      if (fallback_dirty) {
        fallback_dirty = false;
        fallback_value = /** @type {V} */
        fallback;
      }
      return fallback_value;
    };
    {
      props[key];
    }
    var getter;
    {
      getter = () => {
        var value = (
          /** @type {V} */
          props[key]
        );
        if (value === void 0) return get_fallback();
        fallback_dirty = true;
        return value;
      };
    }
    {
      return getter;
    }
  }
  function onMount(fn) {
    if (component_context === null) {
      lifecycle_outside_component();
    }
    {
      user_effect(() => {
        const cleanup = untrack(fn);
        if (typeof cleanup === "function") return (
          /** @type {() => void} */
          cleanup
        );
      });
    }
  }
  function onDestroy(fn) {
    if (component_context === null) {
      lifecycle_outside_component();
    }
    onMount(() => () => untrack(fn));
  }
  const PUBLIC_VERSION = "5";
  if (typeof window !== "undefined") {
    ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(PUBLIC_VERSION);
  }
  let mainLoop;
  if (typeof window === "undefined") {
    mainLoop = {
      register: () => {
      },
      unregister: () => {
      },
      state: {
        isRunning: false,
        timestamp: 0,
        lastTimestamp: 0,
        lastAbsence: 0,
        checkAway: false,
        frame: 0,
        tick: 0,
        fps: 0,
        lastInterp: 0,
        lastDelta: 0,
        panic: false
      },
      functions: {
        begin: [],
        draw: [],
        update: [],
        end: []
      },
      setBegin: () => {
      },
      setUpdate: () => {
      },
      setDraw: () => {
      },
      setEnd: () => {
      },
      start: () => {
      },
      stop: () => {
      },
      reset: () => {
      }
    };
  } else {
    let animate = function(timestamp) {
      rafHandle = requestAnimationFrame2(animate);
      if (timestamp < lastFrameTimeMs + minFrameDelay) {
        return;
      }
      frameDelta += timestamp - lastFrameTimeMs;
      lastFrameTimeMs = timestamp;
      begin(timestamp, frameDelta);
      if (timestamp > lastFpsUpdate + fpsUpdateInterval) {
        fps = // Divide the number of frames since the last FPS update by the
        // amount of time that has passed to get the mean frames per second
        // over that period. This is necessary because slightly more than a
        // second has likely passed since the last update.
        fpsAlpha * framesSinceLastFpsUpdate * 1e3 / (timestamp - lastFpsUpdate) + (1 - fpsAlpha) * fps;
        lastFpsUpdate = timestamp;
        framesSinceLastFpsUpdate = 0;
      }
      framesSinceLastFpsUpdate++;
      numUpdateSteps = 0;
      while (frameDelta >= simulationTimestep) {
        update(simulationTimestep);
        frameDelta -= simulationTimestep;
        if (++numUpdateSteps >= 240) {
          panic = true;
          break;
        }
      }
      draw(frameDelta / simulationTimestep);
      end(fps, panic);
      panic = false;
    };
    let simulationTimestep = 1e3 / 60;
    let frameDelta = 0;
    let lastFrameTimeMs = 0;
    let fps = 60;
    let fpsAlpha = 0.9;
    let fpsUpdateInterval = 1e3;
    let lastFpsUpdate = 0;
    let framesSinceLastFpsUpdate = 0;
    let numUpdateSteps = 0;
    let minFrameDelay = 0;
    let running = false;
    let started = false;
    let panic = false;
    const requestAnimationFrame2 = window.requestAnimationFrame || (function() {
      let lastTimestamp = Date.now(), now, timeout;
      return function(callback) {
        now = Date.now();
        timeout = Math.max(0, simulationTimestep - (now - lastTimestamp));
        lastTimestamp = now + timeout;
        return setTimeout(function() {
          callback(now + timeout);
        }, timeout);
      };
    })();
    const cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
    let begin = function(timestamp, delta) {
    };
    let update = function(delta) {
    };
    let draw = function(interpolationPercentage) {
    };
    let end = function(fps2, panic2) {
    };
    let rafHandle;
    mainLoop = {
      /**
       * Gets how many milliseconds should be simulated by every run of update().
       *
       * See `MainLoop.setSimulationTimestep()` for details on this value.
       *
       * @return {Number}
       *   The number of milliseconds that should be simulated by every run of
       *   {@link #setUpdate update}().
       */
      getSimulationTimestep: function() {
        return simulationTimestep;
      },
      /**
       * Sets how many milliseconds should be simulated by every run of update().
       *
       * The perceived frames per second (FPS) is effectively capped at the
       * multiplicative inverse of the simulation timestep. That is, if the
       * timestep is 1000 / 60 (which is the default), then the maximum perceived
       * FPS is effectively 60. Decreasing the timestep increases the maximum
       * perceived FPS at the cost of running {@link #setUpdate update}() more
       * times per frame at lower frame rates. Since running update() more times
       * takes more time to process, this can actually slow down the frame rate.
       * Additionally, if the amount of time it takes to run update() exceeds or
       * very nearly exceeds the timestep, the application will freeze and crash
       * in a spiral of death (unless it is rescued; see `MainLoop.setEnd()` for
       * an explanation of what can be done if a spiral of death is occurring).
       *
       * The exception to this is that interpolating between updates for each
       * render can increase the perceived frame rate and reduce visual
       * stuttering. See `MainLoop.setDraw()` for an explanation of how to do
       * this.
       *
       * If you are considering decreasing the simulation timestep in order to
       * raise the maximum perceived FPS, keep in mind that most monitors can't
       * display more than 60 FPS. Whether humans can tell the difference among
       * high frame rates depends on the application, but for reference, film is
       * usually displayed at 24 FPS, other videos at 30 FPS, most games are
       * acceptable above 30 FPS, and virtual reality might require 75 FPS to
       * feel natural. Some gaming monitors go up to 144 FPS. Setting the
       * timestep below 1000 / 144 is discouraged and below 1000 / 240 is
       * strongly discouraged. The default of 1000 / 60 is good in most cases.
       *
       * The simulation timestep should typically only be changed at
       * deterministic times (e.g. before the main loop starts for the first
       * time, and not in response to user input or slow frame rates) to avoid
       * introducing non-deterministic behavior. The update timestep should be
       * the same for all players/users in multiplayer/multi-user applications.
       *
       * See also `MainLoop.getSimulationTimestep()`.
       *
       * @param {Number} timestep
       *   The number of milliseconds that should be simulated by every run of
       *   {@link #setUpdate update}().
       */
      setSimulationTimestep: function(timestep) {
        simulationTimestep = timestep;
        return this;
      },
      /**
       * Returns the exponential moving average of the frames per second.
       *
       * @return {Number}
       *   The exponential moving average of the frames per second.
       */
      getFPS: function() {
        return fps;
      },
      /**
       * Gets the maximum frame rate.
       *
       * Other factors also limit the FPS; see `MainLoop.setSimulationTimestep`
       * for details.
       *
       * See also `MainLoop.setMaxAllowedFPS()`.
       *
       * @return {Number}
       *   The maximum number of frames per second allowed.
       */
      getMaxAllowedFPS: function() {
        return 1e3 / minFrameDelay;
      },
      /**
       * Sets a maximum frame rate.
       *
       * See also `MainLoop.getMaxAllowedFPS()`.
       *
       * @param {Number} [fps=Infinity]
       *   The maximum number of frames per second to execute. If Infinity or not
       *   passed, there will be no FPS cap (although other factors do limit the
       *   FPS; see `MainLoop.setSimulationTimestep` for details). If zero, this
       *   will stop the loop, and when the loop is next started, it will return
       *   to the previous maximum frame rate. Passing negative values will stall
       *   the loop until this function is called again with a positive value.
       *
       * @chainable
       */
      setMaxAllowedFPS: function(fps2) {
        if (typeof fps2 === "undefined") {
          fps2 = Infinity;
        }
        if (fps2 === 0) {
          this.stop();
        } else {
          minFrameDelay = 1e3 / fps2;
        }
        return this;
      },
      /**
       * Reset the amount of time that has not yet been simulated to zero.
       *
       * This introduces non-deterministic behavior if called after the
       * application has started running (unless it is being reset, in which case
       * it doesn't matter). However, this can be useful in cases where the
       * amount of time that has not yet been simulated has grown very large
       * (for example, when the application's tab gets put in the background and
       * the browser throttles the timers as a result). In applications with
       * lockstep the player would get dropped, but in other networked
       * applications it may be necessary to snap or ease the player/user to the
       * authoritative state and discard pending updates in the process. In
       * non-networked applications it may also be acceptable to simply resume
       * the application where it last left off and ignore the accumulated
       * unsimulated time.
       *
       * @return {Number}
       *   The cumulative amount of elapsed time in milliseconds that has not yet
       *   been simulated, but is being discarded as a result of calling this
       *   function.
       */
      resetFrameDelta: function() {
        const oldFrameDelta = frameDelta;
        frameDelta = 0;
        return oldFrameDelta;
      },
      /**
       * Sets the function that runs at the beginning of the main loop.
       *
       * The begin() function is typically used to process input before the
       * updates run. Processing input here (in chunks) can reduce the running
       * time of event handlers, which is useful because long-running event
       * handlers can sometimes delay frames.
       *
       * Unlike {@link #setUpdate update}(), which can run zero or more times per
       * frame, begin() always runs exactly once per frame. This makes it useful
       * for any updates that are not dependent on time in the simulation.
       * Examples include adjusting HUD calculations or performing long-running
       * updates incrementally. Compared to {@link #setEnd end}(), generally
       * actions should occur in begin() if they affect anything that
       * {@link #setUpdate update}() or {@link #setDraw draw}() use.
       *
       * @param {Function} begin
       *   The begin() function.
       * @param {Number} [begin.timestamp]
       *   The current timestamp (when the frame started), in milliseconds. This
       *   should only be used for comparison to other timestamps because the
       *   epoch (i.e. the "zero" time) depends on the engine running this code.
       *   In engines that support `DOMHighResTimeStamp` (all modern browsers
       *   except iOS Safari 8) the epoch is the time the page started loading,
       *   specifically `performance.timing.navigationStart`. Everywhere else,
       *   including node.js, the epoch is the Unix epoch (1970-01-01T00:00:00Z).
       * @param {Number} [begin.delta]
       *   The total elapsed time that has not yet been simulated, in
       *   milliseconds.
       */
      setBegin: function(fun) {
        begin = fun || begin;
        return this;
      },
      /**
       * Sets the function that runs updates (e.g. AI and physics).
       *
       * The update() function should simulate anything that is affected by time.
       * It can be called zero or more times per frame depending on the frame
       * rate.
       *
       * As with everything in the main loop, the running time of update()
       * directly affects the frame rate. If update() takes long enough that the
       * frame rate drops below the target ("budgeted") frame rate, parts of the
       * update() function that do not need to execute between every frame can be
       * moved into Web Workers. (Various sources on the internet sometimes
       * suggest other scheduling patterns using setTimeout() or setInterval().
       * These approaches sometimes offer modest improvements with minimal
       * changes to existing code, but because JavaScript is single-threaded, the
       * updates will still block rendering and drag down the frame rate. Web
       * Workers execute in separate threads, so they free up more time in the
       * main loop.)
       *
       * This script can be imported into a Web Worker using importScripts() and
       * used to run a second main loop in the worker. Some considerations:
       *
       * - Profile your code before doing the work to move it into Web Workers.
       *   It could be the rendering that is the bottleneck, in which case the
       *   solution is to decrease the visual complexity of the scene.
       * - It doesn't make sense to move the *entire* contents of update() into
       *   workers unless {@link #setDraw draw}() can interpolate between frames.
       *   The lowest-hanging fruit is background updates (like calculating
       *   citizens' happiness in a city-building game), physics that doesn't
       *   affect the scene (like flags waving in the wind), and anything that is
       *   occluded or happening far off screen.
       * - If draw() needs to interpolate physics based on activity that occurs
       *   in a worker, the worker needs to pass the interpolation value back to
       *   the main thread so that is is available to draw().
       * - Web Workers can't access the state of the main thread, so they can't
       *   directly modify objects in your scene. Moving data to and from Web
       *   Workers is a pain. The fastest way to do it is with Transferable
       *   Objects: basically, you can pass an ArrayBuffer to a worker,
       *   destroying the original reference in the process.
       *
       * You can read more about Web Workers and Transferable Objects at
       * [HTML5 Rocks](http://www.html5rocks.com/en/tutorials/workers/basics/).
       *
       * @param {Function} update
       *   The update() function.
       * @param {Number} [update.delta]
       *   The amount of time in milliseconds to simulate in the update. In most
       *   cases this timestep never changes in order to ensure deterministic
       *   updates. The timestep is the same as that returned by
       *   `MainLoop.getSimulationTimestep()`.
       */
      setUpdate: function(fun) {
        update = fun || update;
        return this;
      },
      /**
       * Sets the function that draws things on the screen.
       *
       * The draw() function gets passed the percent of time that the next run of
       * {@link #setUpdate update}() will simulate that has actually elapsed, as
       * a decimal. In other words, draw() gets passed how far between update()
       * calls it is. This is useful because the time simulated by update() and
       * the time between draw() calls is usually different, so the parameter to
       * draw() can be used to interpolate motion between frames to make
       * rendering appear smoother. To illustrate, if update() advances the
       * simulation at each vertical bar in the first row below, and draw() calls
       * happen at each vertical bar in the second row below, then some frames
       * will have time left over that is not yet simulated by update() when
       * rendering occurs in draw():
       *
       *     update() timesteps:  |  |  |  |  |  |  |  |  |
       *     draw() calls:        |   |   |   |   |   |   |
       *
       * To interpolate motion for rendering purposes, objects' state after the
       * last update() must be retained and used to calculate an intermediate
       * state. Note that this means renders will be up to one update() behind.
       * This is still better than extrapolating (projecting objects' state after
       * a future update()) which can produce bizarre results. Storing multiple
       * states can be difficult to set up, and keep in mind that running this
       * process takes time that could push the frame rate down, so it's often
       * not worthwhile unless stuttering is visible.
       *
       * @param {Function} draw
       *   The draw() function.
       * @param {Number} [draw.interpolationPercentage]
       *   The cumulative amount of time that hasn't been simulated yet, divided
       *   by the amount of time that will be simulated the next time update()
       *   runs. Useful for interpolating frames.
       */
      setDraw: function(fun) {
        draw = fun || draw;
        return this;
      },
      /**
       * Sets the function that runs at the end of the main loop.
       *
       * Unlike {@link #setUpdate update}(), which can run zero or more times per
       * frame, end() always runs exactly once per frame. This makes it useful
       * for any updates that are not dependent on time in the simulation.
       * Examples include cleaning up any temporary state set up by
       * {@link #setBegin begin}(), lowering the visual quality if the frame rate
       * is too low, or performing long-running updates incrementally. Compared
       * to begin(), generally actions should occur in end() if they use anything
       * that update() or {@link #setDraw draw}() affect.
       *
       * @param {Function} end
       *   The end() function.
       * @param {Number} [end.fps]
       *   The exponential moving average of the frames per second. This is the
       *   same value returned by `MainLoop.getFPS()`. It can be used to take
       *   action when the FPS is too low (or to restore to normalcy if the FPS
       *   moves back up). Examples of actions to take if the FPS is too low
       *   include exiting the application, lowering the visual quality, stopping
       *   or reducing activities outside of the main loop like event handlers or
       *   audio playback, performing non-critical updates less frequently, or
       *   increasing the simulation timestep (by calling
       *   `MainLoop.setSimulationTimestep()`). Note that this last option
       *   results in more time being simulated per update() call, which causes
       *   the application to behave non-deterministically.
       * @param {Boolean} [end.panic=false]
       *   Indicates whether the simulation has fallen too far behind real time.
       *   Specifically, `panic` will be `true` if too many updates occurred in
       *   one frame. In networked lockstep applications, the application should
       *   wait for some amount of time to see if the user can catch up before
       *   dropping the user. In networked but non-lockstep applications, this
       *   typically indicates that the user needs to be snapped or eased to the
       *   current authoritative state. When this happens, it may be convenient
       *   to call `MainLoop.resetFrameDelta()` to discard accumulated pending
       *   updates. In non-networked applications, it may be acceptable to allow
       *   the application to keep running for awhile to see if it will catch up.
       *   However, this could also cause the application to look like it is
       *   running very quickly for a few frames as it transitions through the
       *   intermediate states. An alternative that may be acceptable is to
       *   simply ignore the unsimulated elapsed time by calling
       *   `MainLoop.resetFrameDelta()` even though this introduces
       *   non-deterministic behavior. In all cases, if the application panics
       *   frequently, this is an indication that the main loop is running too
       *   slowly. However, most of the time the drop in frame rate will probably
       *   be noticeable before a panic occurs. To help the application catch up
       *   after a panic caused by a spiral of death, the same steps can be taken
       *   that are suggested above if the FPS drops too low.
       */
      setEnd: function(fun) {
        end = fun || end;
        return this;
      },
      /**
       * Starts the main loop.
       *
       * Note that the application is not considered "running" immediately after
       * this function returns; rather, it is considered "running" after the
       * application draws its first frame. The distinction is that event
       * handlers should remain paused until the application is running, even
       * after `MainLoop.start()` is called. Check `MainLoop.isRunning()` for the
       * current status. To act after the application starts, register a callback
       * with requestAnimationFrame() after calling this function and execute the
       * action in that callback. It is safe to call `MainLoop.start()` multiple
       * times even before the application starts running and without calling
       * `MainLoop.stop()` in between, although there is no reason to do this;
       * the main loop will only start if it is not already started.
       *
       * See also `MainLoop.stop()`.
       */
      start: function() {
        if (!started) {
          started = true;
          rafHandle = requestAnimationFrame2(function(timestamp) {
            draw(1);
            running = true;
            lastFrameTimeMs = timestamp;
            lastFpsUpdate = timestamp;
            framesSinceLastFpsUpdate = 0;
            rafHandle = requestAnimationFrame2(animate);
          });
        }
        return this;
      },
      /**
       * Stops the main loop.
       *
       * Event handling and other background tasks should also be paused when the
       * main loop is paused.
       *
       * Note that pausing in multiplayer/multi-user applications will cause the
       * player's/user's client to become out of sync. In this case the
       * simulation should exit, or the player/user needs to be snapped to their
       * updated position when the main loop is started again.
       *
       * See also `MainLoop.start()` and `MainLoop.isRunning()`.
       */
      stop: function() {
        running = false;
        started = false;
        cancelAnimationFrame(rafHandle);
        return this;
      },
      /**
       * Returns whether the main loop is currently running.
       *
       * See also `MainLoop.start()` and `MainLoop.stop()`.
       *
       * @return {Boolean}
       *   Whether the main loop is currently running.
       */
      isRunning: function() {
        return running;
      }
    };
  }
  class Loop {
    #functions = (
      // Functions for each stage
      /* @__PURE__ */ state(proxy({ begin: [], draw: [], update: [], end: [] }))
    );
    get functions() {
      return get(this.#functions);
    }
    set functions(value) {
      set(this.#functions, value, true);
    }
    #lengths = /* @__PURE__ */ user_derived(() => ({
      begin: this.functions.begin.length,
      draw: this.functions.draw.length,
      update: this.functions.update.length,
      end: this.functions.end.length
    }));
    get lengths() {
      return get(this.#lengths);
    }
    set lengths(value) {
      set(this.#lengths, value);
    }
    #state = /* @__PURE__ */ state(proxy({
      isRunning: false,
      timestamp: 0,
      lastTimestamp: 0,
      lastAbsence: 0,
      checkAway: false,
      frame: 0,
      tick: 0,
      fps: 0,
      lastInterp: 0,
      lastDelta: 0,
      panic: false
    }));
    get state() {
      return get(this.#state);
    }
    set state(value) {
      set(this.#state, value, true);
    }
    constructor() {
      mainLoop.setBegin((timestamp, delta) => this.#run("begin", [timestamp, delta]));
      mainLoop.setDraw((interpolationPercentage) => this.#run("draw", [interpolationPercentage]));
      mainLoop.setUpdate((delta) => this.#run("update", [delta / 1e3]));
      mainLoop.setEnd((fps, panic) => this.#run("end", [fps, panic]));
      this.register("begin", this.#begin);
      this.register("draw", this.#draw);
      this.register("update", this.#update);
      this.register("end", this.#end);
      if (typeof document !== "undefined") {
        document.addEventListener("visibilitychange", () => {
          if (document.hidden) return this.stop();
          return this.start();
        });
      }
    }
    /**
     * Runs all functions registered for a particular stage
     */
    #run(stage, params) {
      this.functions[stage].forEach((fn) => {
        fn(...params);
      });
    }
    /**
     * Adds a function to a stage if it doesn't already exist
     */
    #addFunction(stage, fn) {
      if (this.functions[stage].indexOf(fn) === -1) this.functions[stage].push(fn);
    }
    /**
     * Removes a function from a stage if it exists
     */
    #removeFunction(stage, fn) {
      const index2 = this.functions[stage].indexOf(fn);
      if (index2 > -1) this.functions[stage].splice(index2, 1);
    }
    /**
     * Register a function for a specific stage
     */
    register = (stage, fn) => this.#addFunction(stage, fn);
    /**
     * Unregister a function from a specific stage
     */
    unregister = (stage, fn) => this.#removeFunction(stage, fn);
    /**
     * Begin callback that updates timestamp and checks for absence
     */
    #begin = (timestamp, delta) => {
      this.state.timestamp = timestamp;
      if (this.state.checkAway) {
        this.state.lastAbsence = timestamp - this.state.lastTimestamp;
        this.state.checkAway = false;
      }
    };
    /**
     * Draw callback that updates interpolation and frame counter
     */
    #draw = (interp) => {
      this.state.lastInterp = interp;
      this.state.frame++;
    };
    /**
     * Update callback that increments tick and updates delta
     */
    #update = (delta) => {
      this.state.tick++;
      this.state.lastDelta = delta * 1e3;
    };
    /**
     * End callback that updates fps and panic state
     */
    #end = (fps, panic) => {
      this.state.fps = fps;
      this.state.panic = panic;
    };
    /**
     * Returns the time elapsed since the loop was last active
     */
    getLastAbsence = () => this.state.lastAbsence;
    /**
     * Returns the exponential moving average of the frames per second.
     */
    getFPS = mainLoop.getFPS;
    /**
     * Gets the maximum frame rate.
     * Other factors also limit the FPS; see `MainLoop.setSimulationTimestep` for details.
     */
    getMaxAllowedFPS = mainLoop.getMaxAllowedFPS;
    /**
     * Gets how many milliseconds should be simulated by every run of update().
     */
    getSimulationTimestep = mainLoop.getSimulationTimestep;
    /**
     * Sets the maximum frame rate.
     * @param fps The maximum number of frames per second to execute.
     * If Infinity or not passed, there will be no FPS cap. If zero, this will stop the loop.
     */
    setMaxAllowedFPS = mainLoop.setMaxAllowedFPS;
    /**
     * Sets how many milliseconds should be simulated by every run of update().
     * @param timestep The number of milliseconds that should be simulated by every run of update()
     */
    setSimulationTimestep = mainLoop.setSimulationTimestep;
    /**
     * Starts the main loop.
     */
    start = () => {
      mainLoop.start();
      requestAnimationFrame(() => this.state.isRunning = true);
    };
    /**
     * Stops the main loop.
     */
    stop = () => {
      this.state.isRunning = false;
      mainLoop.stop();
      this.state.lastTimestamp = this.state.timestamp;
      this.state.checkAway = true;
    };
    /**
     * Stops the main loop and resets frame and tick counters to 1.
     */
    reset = () => {
      this.stop();
      this.state.frame = 1;
      this.state.tick = 1;
    };
  }
  let loop;
  if (typeof window !== "undefined") {
    loop = new Loop();
    loop.start();
  } else {
    console.warn("svelte-mainloop was imported in a non-browser environment (probably during SSR). A no-op version will be used. The loop will start when the page hydrates in the browser.");
    loop = {
      register: () => {
      },
      unregister: () => {
      },
      state: {
        isRunning: false,
        timestamp: 0,
        lastTimestamp: 0,
        lastAbsence: 0,
        checkAway: false,
        frame: 0,
        tick: 0,
        fps: 0,
        lastInterp: 0,
        lastDelta: 0,
        panic: false
      },
      functions: { begin: [], draw: [], update: [], end: [] },
      lengths: { begin: 0, draw: 0, update: 0, end: 0 },
      getLastAbsence: () => 0,
      getFPS: () => 0,
      getMaxAllowedFPS: () => 0,
      getSimulationTimestep: () => 0,
      setMaxAllowedFPS: () => {
      },
      setSimulationTimestep: () => {
      },
      start: () => {
      },
      stop: () => {
      },
      reset: () => {
      }
    };
  }
  function JoinLoop($$anchor, $$props) {
    push($$props, true);
    let begin = prop($$props, "begin", 3, void 0), update = prop($$props, "update", 3, void 0), draw = prop($$props, "draw", 3, void 0), end = prop($$props, "end", 3, void 0);
    function run(fn) {
      if (begin()) fn("begin", begin());
      if (update()) fn("update", update());
      if (draw()) fn("draw", draw());
      if (end()) fn("end", end());
    }
    onMount(() => run(loop.register));
    onDestroy(() => run(loop.unregister));
    pop();
  }
  class Vector {
    x;
    y;
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
    static add(d) {
      return (v) => new Vector(v.x + d.x, v.y + d.y);
    }
    static rotateRight(p) {
      return (v) => {
        const x = v.y - p.y + p.x;
        const y = p.y - v.x + p.x;
        return new Vector(x, y);
      };
    }
    static rotateLeft(p) {
      return (v) => {
        const x = p.x - v.y + p.y;
        const y = v.x - p.x + p.y;
        return new Vector(x, y);
      };
    }
    static flip(p) {
      return (v) => {
        const x = 2 * p.x - v.x;
        const y = 2 * p.y - v.y;
        return new Vector(x, y);
      };
    }
    static of(v) {
      return new Vector(v.x, v.y);
    }
  }
  class Shape {
    vectors;
    constructor(vectors) {
      this.vectors = vectors;
    }
    map(f) {
      return new Shape(this.vectors.map(f));
    }
    try(f) {
      const newVectors = [];
      for (const v of this.vectors) {
        const newV = f(v);
        if (!newV)
          return this;
        newVectors.push(newV);
      }
      return new Shape(newVectors);
    }
    flatMap(f) {
      const nestedShapes = this.vectors.map(f);
      const allVectors = nestedShapes.flatMap((shape) => shape.vectors);
      return new Shape(allVectors);
    }
    static of(v) {
      return new Shape([v]);
    }
    get origin() {
      return this.vectors[0];
    }
  }
  class GridShapeTransformer {
    grid;
    constructor(grid) {
      this.grid = grid;
    }
    move(d) {
      return (v) => {
        const newV = Vector.add(d)(v);
        if (!this.grid.canMoveTo(newV))
          return null;
        return newV;
      };
    }
    rotate(f) {
      return (p) => (v) => {
        const newV = f(p)(v);
        if (!this.grid.canMoveTo(newV))
          return null;
        return newV;
      };
    }
    by(d) {
      return this.move(d);
    }
    get countercw() {
      return this.rotate(Vector.rotateLeft);
    }
    get clockwise() {
      return this.rotate(Vector.rotateRight);
    }
    get flip() {
      return this.rotate(Vector.flip);
    }
    get up() {
      return this.move(this.grid.UP);
    }
    get right() {
      return this.move(this.grid.RIGHT);
    }
    get down() {
      return this.move(this.grid.DOWN);
    }
    get left() {
      return this.move(this.grid.LEFT);
    }
  }
  function withProps(Component, defaultProps) {
    return function($$anchor, $$props) {
      const mergedProps = { ...defaultProps, ...$$props };
      return Component($$anchor, mergedProps);
    };
  }
  var root_2$2 = /* @__PURE__ */ from_html(`<li class="svelte-mt0erd"><!></li>`);
  var root$2 = /* @__PURE__ */ from_html(`<ol class="svelte-mt0erd"><!> <!></ol>`);
  function Grid2D$1($$anchor, $$props) {
    push($$props, true);
    var ol = root$2();
    var node = child(ol);
    snippet(node, () => $$props.children ?? noop);
    var node_1 = sibling(node, 2);
    each(node_1, 17, () => $$props.grid.array, index, ($$anchor2, row, r2) => {
      var fragment = comment();
      var node_2 = first_child(fragment);
      each(node_2, 17, () => get(row), index, ($$anchor3, _, c) => {
        var li = root_2$2();
        var node_3 = child(li);
        snippet(node_3, () => $$props.cell ?? noop, () => c, () => r2);
        append($$anchor3, li);
      });
      append($$anchor2, fragment);
    });
    template_effect(() => set_style(ol, `--columns: ${$$props.grid.width};`));
    append($$anchor, ol);
    pop();
  }
  class Grid2D {
    width;
    height;
    length;
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.length = this.width * this.height;
    }
    canMoveTo(dest) {
      if (dest.x < 0 || dest.x >= this.width || dest.y < 0 || dest.y >= this.height)
        return false;
      return true;
    }
    canMoveBy(d, v) {
      const destination = Vector.add(d)(v);
      return this.canMoveTo(destination);
    }
    get transformer() {
      return new GridShapeTransformer(this);
    }
    get array() {
      return new Array(this.height).fill(null).map(() => Array(this.width).fill(null));
    }
    get component() {
      return withProps(Grid2D$1, { grid: this });
    }
    UP = new Vector(0, -1);
    RIGHT = new Vector(1, 0);
    DOWN = new Vector(0, 1);
    LEFT = new Vector(-1, 0);
  }
  var root_2$1 = /* @__PURE__ */ from_html(`<li class="svelte-10p6zfl"><!></li>`);
  var root$1 = /* @__PURE__ */ from_html(`<ol class="svelte-10p6zfl"></ol>`);
  function Inventory2D$1($$anchor, $$props) {
    push($$props, true);
    var ol = root$1();
    each(ol, 21, () => $$props.inventory.rows, index, ($$anchor2, row, r2) => {
      var fragment = comment();
      var node = first_child(fragment);
      each(node, 17, () => get(row), index, ($$anchor3, slot, c) => {
        var li = root_2$1();
        var node_1 = child(li);
        snippet(node_1, () => $$props.cell ?? noop, () => get(slot), () => c, () => r2);
        append($$anchor3, li);
      });
      append($$anchor2, fragment);
    });
    template_effect(() => set_style(ol, `--columns: ${$$props.inventory.width};`));
    append($$anchor, ol);
    pop();
  }
  class Inventory2D {
    #rows = /* @__PURE__ */ state(proxy([]));
    get rows() {
      return get(this.#rows);
    }
    set rows(value) {
      set(this.#rows, value, true);
    }
    constructor(rows) {
      this.rows = rows;
    }
    // is instance member because we need to keep reference to this
    occupied = (v) => !!this.rows[v.y][v.x];
    add(item) {
      return (v) => {
        this.rows[v.y][v.x] = item;
        return item;
      };
    }
    remove(v) {
      const item = this.rows[v.y][v.x];
      this.rows[v.y][v.x] = null;
      return item;
    }
    get width() {
      return this.rows[0].length;
    }
    get component() {
      return withProps(Inventory2D$1, { inventory: this });
    }
  }
  class ThrottledInput {
    name;
    throttle;
    func;
    codes;
    lastTimestamp = 0;
    skip = false;
    constructor(name, throttle, func, codes) {
      this.name = name;
      this.throttle = throttle;
      this.func = func;
      this.codes = codes;
    }
    run(timestamp) {
      if (!this.skip && timestamp < this.lastTimestamp + this.throttle)
        return;
      this.skip = false;
      this.lastTimestamp = timestamp;
      this.func();
    }
    skipThrottle() {
      this.skip = true;
    }
  }
  function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }
    return array;
  }
  function InputThrottle($$anchor, $$props) {
    push($$props, true);
    const inputBuffer = /* @__PURE__ */ new Set();
    function onkeyup(event2) {
      const input = $$props.inputs.find((el) => el.codes.includes(event2.code));
      if (input) inputBuffer.delete(input);
    }
    function onkeydown(event2) {
      if (event2.repeat) return;
      const input = $$props.inputs.find((el) => el.codes.includes(event2.code));
      if (input) {
        input.skipThrottle();
        inputBuffer.add(input);
      }
    }
    function processInput(timestamp) {
      for (const input of inputBuffer) {
        input.run(timestamp);
      }
    }
    event("keyup", $window, onkeyup);
    event("keydown", $window, onkeydown);
    JoinLoop($$anchor, { begin: processInput });
    pop();
  }
  class Tetromino {
    name;
    vectors;
    constructor(type) {
      this.name = type.name;
      this.vectors = type.vectors;
    }
    static types = [
      {
        name: "O",
        vectors: [
          new Vector(0, 0),
          new Vector(1, 0),
          new Vector(0, 1),
          new Vector(1, 1)
        ]
      },
      {
        name: "I",
        vectors: [
          new Vector(0, 0),
          new Vector(-1, 0),
          new Vector(1, 0),
          new Vector(2, 0)
        ]
      },
      {
        name: "T",
        vectors: [
          new Vector(0, 0),
          new Vector(-1, 0),
          new Vector(1, 0),
          new Vector(0, 1)
        ]
      },
      {
        name: "L",
        vectors: [
          new Vector(0, 0),
          new Vector(-1, 0),
          new Vector(1, 0),
          new Vector(1, 1)
        ]
      },
      {
        name: "J",
        vectors: [
          new Vector(0, 0),
          new Vector(-1, 0),
          new Vector(1, 0),
          new Vector(-1, 1)
        ]
      },
      {
        name: "S",
        vectors: [
          new Vector(0, 0),
          new Vector(-1, 0),
          new Vector(0, 1),
          new Vector(1, 1)
        ]
      },
      {
        name: "Z",
        vectors: [
          new Vector(0, 0),
          new Vector(1, 0),
          new Vector(0, 1),
          new Vector(-1, 1)
        ]
      }
    ];
  }
  var root_1 = /* @__PURE__ */ from_html(`<link rel="stylesheet" href="/style.css"/>`);
  var root_2 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
  var root_3 = /* @__PURE__ */ from_html(`<button>New Game</button>`);
  var root_4 = /* @__PURE__ */ from_html(`<button> </button>`);
  var root_5 = /* @__PURE__ */ from_html(`<div></div>`);
  var root_7 = /* @__PURE__ */ from_html(`<div></div>`);
  var root_8 = /* @__PURE__ */ from_html(`<div></div>`);
  var root = /* @__PURE__ */ from_html(`<!> <header><!></header> <main><!> <section><h2>Next Piece</h2> <!> <h2>Level</h2> <p> </p> <h2>Lines Cleared</h2> <p> </p> <h2>Game Speed</h2> <p> </p></section></main>`, 1);
  function App($$anchor, $$props) {
    push($$props, true);
    const newTetrominoPool = () => shuffle(Tetromino.types.map((type) => new Tetromino(type)));
    const tetrominoPool = proxy(newTetrominoPool());
    function* createTetrominoGenerator() {
      while (true) {
        while (tetrominoPool.length > 1) {
          yield tetrominoPool.shift();
        }
        tetrominoPool.push(...newTetrominoPool());
      }
    }
    const generator = createTetrominoGenerator();
    const WIDTH = 10;
    const HEIGHT = 20;
    const START_VECTOR = new Vector(Math.floor(WIDTH / 2 - 1), 0);
    const LEVEL_INCREASE_LINES = 10;
    const grid = new Grid2D(WIDTH, HEIGHT);
    const move2 = /* @__PURE__ */ user_derived(() => grid.transformer);
    const nextShapeGrid = new Grid2D(4, 2);
    const nextShapeMove = nextShapeGrid.transformer;
    let inventory = /* @__PURE__ */ state(proxy(new Inventory2D(grid.array)));
    let name = /* @__PURE__ */ state(proxy(tetrominoPool[0].name));
    let shape = /* @__PURE__ */ state(getNextPiece());
    const nextShape = /* @__PURE__ */ user_derived(() => new Shape(tetrominoPool[0].vectors).try(nextShapeMove.by(new Vector(1, 0))));
    const nextName = /* @__PURE__ */ user_derived(() => tetrominoPool[0].name);
    let isRunning = /* @__PURE__ */ state(true);
    let score = /* @__PURE__ */ state(0);
    let gameover = /* @__PURE__ */ state(false);
    let counter = /* @__PURE__ */ state(
      0
      // move down counter, resets when player manually moves down
    );
    const level = /* @__PURE__ */ user_derived(() => Math.floor(get(score) / LEVEL_INCREASE_LINES) + 1);
    const gameSpeed = /* @__PURE__ */ user_derived(() => Math.max(0.05, 1 - (get(level) - 1) / 29));
    function setGameOverState(_gameover) {
      set(gameover, _gameover, true);
      set(isRunning, !_gameover);
    }
    function restartGame() {
      set(inventory, new Inventory2D(grid.array), true);
      set(score, 0);
      getNextPiece();
      set(shape, getNextPiece());
      setGameOverState(false);
    }
    function getNextPiece() {
      const tetromino = generator.next().value;
      set(name, tetromino.name, true);
      const s = new Shape(tetromino.vectors).try(get(move2).by(START_VECTOR));
      if (s.vectors.some(get(inventory).occupied)) setGameOverState(true);
      return s;
    }
    function freeze() {
      if (get(shape).vectors.some(get(inventory).occupied)) return;
      get(shape).vectors.map(get(inventory).add(get(name)));
      set(shape, getNextPiece());
      clearLines();
    }
    function clearLines() {
      const incompleteLines = get(inventory).rows.filter((row) => row.some((el) => el === null));
      const newLines = new Grid2D(WIDTH, grid.height - incompleteLines.length).array;
      set(inventory, new Inventory2D([...newLines, ...incompleteLines]), true);
      set(score, get(score) + newLines.length);
    }
    const check = (f) => {
      const newShape = get(shape).try(f);
      if (newShape.vectors.some(get(inventory).occupied)) return;
      set(shape, newShape);
    };
    function moveDown() {
      set(counter, 0);
      const newShape = get(shape).try(get(move2).down);
      if (newShape === get(
        shape
        // if shape is strictly equal, it couldn't move
      )) return freeze();
      if (newShape.vectors.some(get(inventory).occupied)) return freeze();
      set(shape, newShape);
    }
    function update(delta) {
      set(counter, get(counter) + delta);
      if (get(counter) <= get(gameSpeed)) return;
      moveDown();
    }
    const inputs = [
      new ThrottledInput("right", 150, () => check(get(move2).right), ["KeyD", "ArrowRight", "Numpad6"]),
      new ThrottledInput("down", 75, moveDown, ["KeyS", "ArrowDown", "Numpad5"]),
      new ThrottledInput("left", 150, () => check(get(move2).left), ["KeyA", "ArrowLeft", "Numpad4"]),
      new ThrottledInput("rotate-clockwise", 250, () => check(get(move2).clockwise(get(shape).origin)), ["KeyQ", "Numpad7"]),
      new ThrottledInput("rotate-countercw", 250, () => check(get(move2).countercw(get(shape).origin)), ["KeyE", "Numpad9"]),
      new ThrottledInput("flip", 250, () => check(get(move2).flip(get(shape).origin)), ["Numpad0"])
    ];
    var fragment = root();
    head("1n46o8q", ($$anchor2) => {
      var link2 = root_1();
      effect(() => {
        $document.title = "Tetris";
      });
      append($$anchor2, link2);
    });
    var node = first_child(fragment);
    {
      var consequent = ($$anchor2) => {
        var fragment_1 = root_2();
        var node_1 = first_child(fragment_1);
        InputThrottle(node_1, {
          get inputs() {
            return inputs;
          }
        });
        var node_2 = sibling(node_1, 2);
        JoinLoop(node_2, { update });
        append($$anchor2, fragment_1);
      };
      if_block(node, ($$render) => {
        if (get(isRunning) && !get(gameover)) $$render(consequent);
      });
    }
    var header = sibling(node, 2);
    var node_3 = child(header);
    {
      var consequent_1 = ($$anchor2) => {
        var button = root_3();
        button.__click = restartGame;
        append($$anchor2, button);
      };
      var alternate = ($$anchor2) => {
        var button_1 = root_4();
        button_1.__click = () => set(isRunning, !get(isRunning));
        var text = child(button_1);
        template_effect(() => set_text(text, get(isRunning) ? "Pause" : "Play"));
        append($$anchor2, button_1);
      };
      if_block(node_3, ($$render) => {
        if (get(gameover)) $$render(consequent_1);
        else $$render(alternate, false);
      });
    }
    var main = sibling(header, 2);
    var node_4 = child(main);
    {
      const cell = ($$anchor2, x = noop, y = noop) => {
        var div = root_5();
        let classes;
        template_effect(($0) => classes = set_class(div, 1, clsx(get(name)), null, classes, $0), [
          () => ({
            active: get(shape).vectors.find((v) => v.x === x() && v.y === y())
          })
        ]);
        append($$anchor2, div);
      };
      component(node_4, () => grid.component, ($$anchor2, grid_component) => {
        grid_component($$anchor2, {
          cell,
          children: ($$anchor3, $$slotProps) => {
            var fragment_2 = comment();
            var node_5 = first_child(fragment_2);
            {
              const cell2 = ($$anchor4, slot = noop, x = noop, y = noop) => {
                var div_1 = root_7();
                let classes_1;
                template_effect(() => classes_1 = set_class(div_1, 1, clsx(slot()), null, classes_1, { active: slot() !== null }));
                append($$anchor4, div_1);
              };
              component(node_5, () => get(inventory).component, ($$anchor4, inventory_component) => {
                inventory_component($$anchor4, { cell: cell2, $$slots: { cell: true } });
              });
            }
            append($$anchor3, fragment_2);
          },
          $$slots: { cell: true, default: true }
        });
      });
    }
    var section = sibling(node_4, 2);
    var node_6 = sibling(child(section), 2);
    {
      const cell = ($$anchor2, x = noop, y = noop) => {
        var div_2 = root_8();
        let classes_2;
        template_effect(($0) => classes_2 = set_class(div_2, 1, clsx(get(nextName)), null, classes_2, $0), [
          () => ({
            active: get(nextShape).vectors.find((v) => v.x === x() && v.y === y())
          })
        ]);
        append($$anchor2, div_2);
      };
      component(node_6, () => nextShapeGrid.component, ($$anchor2, nextShapeGrid_component) => {
        nextShapeGrid_component($$anchor2, { cell, $$slots: { cell: true } });
      });
    }
    var p = sibling(node_6, 4);
    var text_1 = child(p);
    var p_1 = sibling(p, 4);
    var text_2 = child(p_1);
    var p_2 = sibling(p_1, 4);
    var text_3 = child(p_2);
    template_effect(
      ($0) => {
        set_text(text_1, get(level));
        set_text(text_2, get(score));
        set_text(text_3, `${$0 ?? ""}s`);
      },
      [() => get(gameSpeed).toFixed(2)]
    );
    append($$anchor, fragment);
    pop();
  }
  delegate(["click"]);
  const app = mount(App, {
    target: document.getElementById("app")
  });
  return app;
})();

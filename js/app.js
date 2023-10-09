(() => {
    var __webpack_modules__ = {
        171: module => {
            !function(e) {
                var t = 0, n = function e(n, s) {
                    var i = this, r = this, o = !1;
                    if (Array.isArray(n)) return !!n.length && n.map((function(t) {
                        return new e(t, s);
                    }));
                    var a = {
                        init: function() {
                            this.options = Object.assign({
                                duration: 600,
                                ariaEnabled: !0,
                                collapse: !0,
                                showMultiple: !1,
                                onlyChildNodes: !0,
                                openOnInit: [],
                                elementClass: "ac",
                                triggerClass: "ac-trigger",
                                panelClass: "ac-panel",
                                activeClass: "is-active",
                                beforeOpen: function() {},
                                onOpen: function() {},
                                beforeClose: function() {},
                                onClose: function() {}
                            }, s);
                            var e = "string" == typeof n;
                            this.container = e ? document.querySelector(n) : n, this.createDefinitions(), r.attachEvents();
                        },
                        createDefinitions: function() {
                            var e = this, n = this.options, s = n.elementClass, i = n.openOnInit, r = n.onlyChildNodes ? this.container.childNodes : this.container.querySelectorAll(u(s));
                            this.elements = Array.from(r).filter((function(e) {
                                return e.classList && e.classList.contains(s);
                            })), this.firstElement = this.elements[0], this.lastElement = this.elements[this.elements.length - 1], 
                            this.elements.filter((function(e) {
                                return !e.classList.contains("js-enabled");
                            })).forEach((function(n) {
                                n.classList.add("js-enabled"), e.generateIDs(n), e.setARIA(n), e.setTransition(n);
                                var s = e.elements.indexOf(n);
                                t++, i.includes(s) ? e.showElement(n, !1) : e.closeElement(n, !1);
                            }));
                        },
                        setTransition: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = this.options, s = n.duration, i = n.panelClass, r = e.querySelector(u(i)), o = l("transitionDuration");
                            r.style[o] = t ? null : "".concat(s, "ms");
                        },
                        generateIDs: function(e) {
                            var n = this.options, s = n.triggerClass, i = n.panelClass, r = e.querySelector(u(s)), o = e.querySelector(u(i));
                            e.setAttribute("id", e.id || "ac-".concat(t)), r.setAttribute("id", r.id || "ac-trigger-".concat(t)), 
                            o.setAttribute("id", o.id || "ac-panel-".concat(t));
                        },
                        removeIDs: function(e) {
                            var t = this.options, n = t.triggerClass, s = t.panelClass, i = e.querySelector(u(n)), r = e.querySelector(u(s));
                            e.id.startsWith("ac-") && e.removeAttribute("id"), i.id.startsWith("ac-") && i.removeAttribute("id"), 
                            r.id.startsWith("ac-") && r.removeAttribute("id");
                        },
                        setARIA: function(e) {
                            var t = this.options, n = t.ariaEnabled, s = t.triggerClass, i = t.panelClass;
                            if (n) {
                                var r = e.querySelector(u(s)), o = e.querySelector(u(i));
                                r.setAttribute("role", "button"), r.setAttribute("aria-controls", o.id), r.setAttribute("aria-disabled", !1), 
                                r.setAttribute("aria-expanded", !1), o.setAttribute("role", "region"), o.setAttribute("aria-labelledby", r.id);
                            }
                        },
                        updateARIA: function(e, t) {
                            var n = t.ariaExpanded, s = t.ariaDisabled, i = this.options, r = i.ariaEnabled, o = i.triggerClass;
                            if (r) {
                                var a = e.querySelector(u(o));
                                a.setAttribute("aria-expanded", n), a.setAttribute("aria-disabled", s);
                            }
                        },
                        removeARIA: function(e) {
                            var t = this.options, n = t.ariaEnabled, s = t.triggerClass, i = t.panelClass;
                            if (n) {
                                var r = e.querySelector(u(s)), o = e.querySelector(u(i));
                                r.removeAttribute("role"), r.removeAttribute("aria-controls"), r.removeAttribute("aria-disabled"), 
                                r.removeAttribute("aria-expanded"), o.removeAttribute("role"), o.removeAttribute("aria-labelledby");
                            }
                        },
                        focus: function(e, t) {
                            e.preventDefault();
                            var n = this.options.triggerClass;
                            t.querySelector(u(n)).focus();
                        },
                        focusFirstElement: function(e) {
                            this.focus(e, this.firstElement), this.currFocusedIdx = 0;
                        },
                        focusLastElement: function(e) {
                            this.focus(e, this.lastElement), this.currFocusedIdx = this.elements.length - 1;
                        },
                        focusNextElement: function(e) {
                            var t = this.currFocusedIdx + 1;
                            if (t > this.elements.length - 1) return this.focusFirstElement(e);
                            this.focus(e, this.elements[t]), this.currFocusedIdx = t;
                        },
                        focusPrevElement: function(e) {
                            var t = this.currFocusedIdx - 1;
                            if (t < 0) return this.focusLastElement(e);
                            this.focus(e, this.elements[t]), this.currFocusedIdx = t;
                        },
                        showElement: function(e) {
                            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = this.options, s = n.panelClass, i = n.activeClass, r = n.collapse, o = n.beforeOpen;
                            t && o(e);
                            var a = e.querySelector(u(s)), l = a.scrollHeight;
                            e.classList.add(i), requestAnimationFrame((function() {
                                requestAnimationFrame((function() {
                                    a.style.height = t ? "".concat(l, "px") : "auto";
                                }));
                            })), this.updateARIA(e, {
                                ariaExpanded: !0,
                                ariaDisabled: !r
                            });
                        },
                        closeElement: function(e) {
                            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = this.options, s = n.panelClass, i = n.activeClass, r = n.beforeClose, o = e.querySelector(u(s)), a = o.scrollHeight;
                            e.classList.remove(i), t ? (r(e), requestAnimationFrame((function() {
                                o.style.height = "".concat(a, "px"), requestAnimationFrame((function() {
                                    o.style.height = 0;
                                }));
                            }))) : o.style.height = 0, this.updateARIA(e, {
                                ariaExpanded: !1,
                                ariaDisabled: !1
                            });
                        },
                        toggleElement: function(e) {
                            var t = this.options, n = t.activeClass, s = t.collapse, i = e.classList.contains(n);
                            if (!i || s) return i ? this.closeElement(e) : this.showElement(e);
                        },
                        closeElements: function() {
                            var e = this, t = this.options, n = t.activeClass;
                            t.showMultiple || this.elements.forEach((function(t, s) {
                                t.classList.contains(n) && s !== e.currFocusedIdx && e.closeElement(t);
                            }));
                        },
                        handleClick: function(e) {
                            var t = this, n = e.currentTarget;
                            this.elements.forEach((function(s, i) {
                                s.contains(n) && "A" !== e.target.nodeName && (t.currFocusedIdx = i, t.closeElements(), 
                                t.focus(e, s), t.toggleElement(s));
                            }));
                        },
                        handleKeydown: function(e) {
                            switch (e.key) {
                              case "ArrowUp":
                                return this.focusPrevElement(e);

                              case "ArrowDown":
                                return this.focusNextElement(e);

                              case "Home":
                                return this.focusFirstElement(e);

                              case "End":
                                return this.focusLastElement(e);

                              default:
                                return null;
                            }
                        },
                        handleFocus: function(e) {
                            var t = e.currentTarget, n = this.elements.find((function(e) {
                                return e.contains(t);
                            }));
                            this.currFocusedIdx = this.elements.indexOf(n);
                        },
                        handleTransitionEnd: function(e) {
                            if (e.stopPropagation(), "height" === e.propertyName) {
                                var t = this.options, n = t.onOpen, s = t.onClose, i = e.currentTarget, r = parseInt(i.style.height), o = this.elements.find((function(e) {
                                    return e.contains(i);
                                }));
                                r > 0 ? (i.style.height = "auto", n(o)) : s(o);
                            }
                        }
                    };
                    this.attachEvents = function() {
                        if (!o) {
                            var e = a.options, t = e.triggerClass, n = e.panelClass;
                            a.handleClick = a.handleClick.bind(a), a.handleKeydown = a.handleKeydown.bind(a), 
                            a.handleFocus = a.handleFocus.bind(a), a.handleTransitionEnd = a.handleTransitionEnd.bind(a), 
                            a.elements.forEach((function(e) {
                                var s = e.querySelector(u(t)), i = e.querySelector(u(n));
                                s.addEventListener("click", a.handleClick), s.addEventListener("keydown", a.handleKeydown), 
                                s.addEventListener("focus", a.handleFocus), i.addEventListener("webkitTransitionEnd", a.handleTransitionEnd), 
                                i.addEventListener("transitionend", a.handleTransitionEnd);
                            })), o = !0;
                        }
                    }, this.detachEvents = function() {
                        if (o) {
                            var e = a.options, t = e.triggerClass, n = e.panelClass;
                            a.elements.forEach((function(e) {
                                var s = e.querySelector(u(t)), i = e.querySelector(u(n));
                                s.removeEventListener("click", a.handleClick), s.removeEventListener("keydown", a.handleKeydown), 
                                s.removeEventListener("focus", a.handleFocus), i.removeEventListener("webkitTransitionEnd", a.handleTransitionEnd), 
                                i.removeEventListener("transitionend", a.handleTransitionEnd);
                            })), o = !1;
                        }
                    }, this.toggle = function(e) {
                        var t = a.elements[e];
                        t && a.toggleElement(t);
                    }, this.open = function(e) {
                        var t = a.elements[e];
                        t && a.showElement(t);
                    }, this.openAll = function() {
                        var e = a.options, t = e.activeClass, n = e.onOpen;
                        a.elements.forEach((function(e) {
                            e.classList.contains(t) || (a.showElement(e, !1), n(e));
                        }));
                    }, this.close = function(e) {
                        var t = a.elements[e];
                        t && a.closeElement(t);
                    }, this.closeAll = function() {
                        var e = a.options, t = e.activeClass, n = e.onClose;
                        a.elements.forEach((function(e) {
                            e.classList.contains(t) && (a.closeElement(e, !1), n(e));
                        }));
                    }, this.destroy = function() {
                        i.detachEvents(), i.openAll(), a.elements.forEach((function(e) {
                            a.removeIDs(e), a.removeARIA(e), a.setTransition(e, !0);
                        })), o = !0;
                    }, this.update = function() {
                        a.createDefinitions(), i.detachEvents(), i.attachEvents();
                    };
                    var l = function(e) {
                        return "string" == typeof document.documentElement.style[e] ? e : (e = c(e), e = "webkit".concat(e));
                    }, c = function(e) {
                        return e.charAt(0).toUpperCase() + e.slice(1);
                    }, u = function(e) {
                        return ".".concat(CSS.escape(e));
                    };
                    a.init();
                };
                true && void 0 !== module.exports ? module.exports = n : e.Accordion = n;
            }(window);
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        function tableInit(table) {
            const cols = table.querySelectorAll("[data-col]");
            cols.forEach((col => {
                const cells = col.querySelectorAll("[data-cell]");
                table.dataset.cellCount = cells.length;
                cells.forEach(((cell, index) => {
                    cell.dataset.cell = index;
                }));
            }));
            table.dataset.colCount = cols.length;
        }
        function tableCellObserve(table) {
            let cellCount = table.dataset.cellCount;
            for (let i = 0; i < cellCount; i++) {
                table.querySelectorAll(`[data-cell="${i}"]`).forEach((cell => cell.style.height = ``));
                const rowHeight = Array.from(table.querySelectorAll(`[data-cell="${i}"]`)).map((cell => cell.clientHeight + (cell.offsetHeight - cell.clientHeight)));
                const maxHeight = Math.max(...rowHeight);
                table.querySelectorAll(`[data-cell="${i}"]`).forEach((cell => cell.style.height = `${maxHeight}px`));
            }
        }
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(webP.height == 2);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = support === true ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        function functions_getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        function setHash(hash) {
            hash = hash ? `#${hash}` : window.location.href.split("#")[0];
            history.pushState("", "", hash);
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        function tabs() {
            const tables = document.querySelectorAll("[data-table]");
            tables?.forEach((table => {
                tableInit(table);
            }));
            const tabs = document.querySelectorAll("[data-tabs]");
            let tabsActiveHash = [];
            if (tabs.length > 0) {
                const hash = functions_getHash();
                if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
                tabs.forEach(((tabsBlock, index) => {
                    tabsBlock.classList.add("_tab-init");
                    tabsBlock.setAttribute("data-tabs-index", index);
                    tabsBlock.addEventListener("click", setTabsAction);
                    initTabs(tabsBlock);
                }));
                let mdQueriesArray = dataMediaQueries(tabs, "tabs");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
            }
            function setTitlePosition(tabsMediaArray, matchMedia) {
                tabsMediaArray.forEach((tabsMediaItem => {
                    tabsMediaItem = tabsMediaItem.item;
                    let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                    let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                    let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                    let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                    tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems.forEach(((tabsContentItem, index) => {
                        if (matchMedia.matches) {
                            tabsContent.append(tabsTitleItems[index]);
                            tabsContent.append(tabsContentItem);
                            tabsMediaItem.classList.add("_tab-spoller");
                        } else {
                            tabsTitles.append(tabsTitleItems[index]);
                            tabsMediaItem.classList.remove("_tab-spoller");
                        }
                    }));
                }));
            }
            function initTabs(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
                if (tabsActiveHashBlock) {
                    const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                    tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
                }
                if (tabsContent.length) {
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        tabsTitles[index].setAttribute("data-tabs-title", "");
                        tabsContentItem.setAttribute("data-tabs-item", "");
                        if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                        tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                        if (tabsTitles[index].classList.contains("_tab-active")) {
                            const table = tabsContentItem.querySelector("[data-table]");
                            document.addEventListener("DOMContentLoaded", (e => {
                                tableCellObserve(table);
                                window.addEventListener("resize", (() => tableCellObserve(table)));
                            }));
                            table.dataset.table = "observed";
                        }
                    }));
                }
            }
            function setTabsStatus(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                function isTabsAnamate(tabsBlock) {
                    if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
                }
                const tabsBlockAnimate = isTabsAnamate(tabsBlock);
                if (tabsContent.length > 0) {
                    const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        if (tabsTitles[index].classList.contains("_tab-active")) {
                            if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                            if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                            const table = tabsContentItem.querySelector("[data-table]");
                            if (table && !table.dataset.table) {
                                console.log(table);
                                tableCellObserve(table);
                                window.addEventListener("resize", (() => tableCellObserve(table)));
                                table.dataset.table = "observed";
                            }
                        } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                    }));
                }
            }
            function setTabsAction(e) {
                const el = e.target;
                if (el.closest("[data-tabs-title]")) {
                    const tabTitle = el.closest("[data-tabs-title]");
                    const tabsBlock = tabTitle.closest("[data-tabs]");
                    if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                        let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                        tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                        tabTitle.classList.add("_tab-active");
                        setTabsStatus(tabsBlock);
                    }
                    e.preventDefault();
                }
            }
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        var accordion_min = __webpack_require__(171);
        const containers = document.querySelectorAll(".accordion-container");
        const DURATION = 600;
        containers?.forEach((container => {
            new accordion_min(container, {
                duration: DURATION,
                showMultiple: true,
                elementClass: "accordion",
                triggerClass: "accordion__trigger",
                panelClass: "accordion__body",
                activeClass: "open",
                beforeOpen: e => {
                    const body = e.querySelector(".accordion__body");
                    setMarginBottom(body, DURATION / 2, 40);
                    if (window.innerWidth >= 479.98) setPaddingTop(body, DURATION / 2, 16);
                },
                beforeClose: e => {
                    const body = e.querySelector(".accordion__body");
                    resetMarginbottom(body, DURATION / 2);
                    if (window.innerWidth >= 479.98) resetPaddingTop(body, DURATION / 2);
                }
            });
        }));
        function setPaddingTop(element, duration, padding) {
            const frameTime = 30;
            const frames = duration / frameTime;
            const paddingPerFrame = padding / frames;
            let currentPadding = 0;
            let timerId = setTimeout((function animation() {
                currentPadding += paddingPerFrame;
                element.style.paddingTop = currentPadding + "px";
                if (currentPadding >= padding) return;
                timerId = setTimeout(animation, frameTime);
            }), frameTime);
        }
        function setMarginBottom(element, duration, margin) {
            const frameTime = 30;
            const frames = duration / frameTime;
            const marginPerFrame = margin / frames;
            let currentMargin = 0;
            let timerId = setTimeout((function animation() {
                currentMargin += marginPerFrame;
                element.style.marginBottom = currentMargin + "px";
                if (currentMargin >= margin) return;
                timerId = setTimeout(animation, frameTime);
            }), frameTime);
        }
        function resetPaddingTop(element, duration) {
            const frameTime = 30;
            const frames = duration / frameTime;
            let currentPadding = parseInt(element.style.paddingTop);
            const paddingPerFrame = currentPadding / frames;
            let timerId = setTimeout((function animation() {
                currentPadding -= paddingPerFrame;
                element.style.paddingTop = currentPadding + "px";
                if (currentPadding === 0) return;
                timerId = setTimeout(animation, frameTime);
            }), frameTime);
        }
        function resetMarginbottom(element, duration) {
            const frameTime = 30;
            const frames = duration / frameTime;
            let currentMargin = parseInt(element.style.marginBottom);
            const marginPerFrame = currentMargin / frames;
            let timerId = setTimeout((function animation() {
                currentMargin -= marginPerFrame;
                element.style.marginBottom = currentMargin + "px";
                if (currentMargin === 0) return;
                timerId = setTimeout(animation, frameTime);
            }), frameTime);
        }
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        window["FLS"] = true;
        isWebp();
        tabs();
    })();
})();
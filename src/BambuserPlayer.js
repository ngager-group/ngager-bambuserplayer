/* eslint-disable */
const BambuserPlayer = function(e) {
    function t(s) {
        if (i[s])
            return i[s].exports;
        var r = i[s] = {
            exports: {},
            id: s,
            loaded: !1
        };
        return e[s].call(r.exports, r, r.exports, t),
        r.loaded = !0,
        r.exports
    }
    var i = {};
    return t.m = e,
    t.c = i,
    t.p = "/",
    t(0)
}([function(e, t, i) {
    "use strict";
    function s(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function r(e) {
        return "undefined" == typeof e
    }
    var n = function() {
        function e(e, t) {
            for (var i = 0; i < t.length; i++) {
                var s = t[i];
                s.enumerable = s.enumerable || !1,
                s.configurable = !0,
                "value"in s && (s.writable = !0),
                Object.defineProperty(e, s.key, s)
            }
        }
        return function(t, i, s) {
            return i && e(t.prototype, i),
            s && e(t, s),
            t
        }
    }()
      , a = {
        hostedPlayer: {
            host: "https://dist.bambuser.net",
            path: "/player/iframeapi/"
        },
        applicationId: "8oWeUkW3TKSxDJEndIqrA",
        bambuserVideoCoreLibraryUrl: "https://dist.bambuser.net/player/lib/bambuser-video-core/latest/bambuser-video-core.min.js",
        filename: "index.html",
        template: "./src/host/index.jade",
        inject: !1
    } || {};
    e.exports = {
        create: function(e, t, i) {
            if (e instanceof HTMLElement || (i = t,
            t = e),
            "string" != typeof t)
                throw new Error("Missing resourceUri");
            var s = {
                noFullscreen: !1,
                timeshift: !1,
                usePreviewAsPoster: void 0
            };
            i = i || {},
            Object.keys(s).forEach(function(e) {
                "undefined" == typeof i[e] && (i[e] = s[e])
            });
            var r = new o(t,i);
            return e instanceof HTMLElement && r.setupPlayerIn(e),
            r
        }
    };
    var o = function() {
        function e(t, i) {
            s(this, e),
            this._resourceUri = t,
            this._opts = i,
            this._iframe = null,
            this._frameId = "player-" + Math.round(1e7 * Math.random()),
            this._attributes = {},
            this._startWhenReady = !1,
            this._playPromises = {},
            this._autoplay = void 0,
            this._buffered = [],
            this._controls = void 0,
            this._currentTime = void 0,
            this._duration = NaN,
            this._ended = !1,
            this._error = null,
            this._muted = void 0,
            this._paused = !0,
            this._poster = void 0,
            this._seeking = !1,
            this._videoHeight = 0,
            this._videoWidth = 0,
            this._volume = void 0,
            this._broadcastId = void 0,
            this._contentPreset = "",
            this._isLive = !1,
            this._playerType = "",
            this._scaleMode = void 0,
            this._timeshift = "undefined" == typeof i.timeshift ? void 0 : i.timeshift,
            this._viewers = {
                current: 0,
                total: 0
            },
            this._setupExternalInterface()
        }
        return n(e, [{
            key: "_emit",
            value: function(e) {
                this._listeners && this._listeners[e] && this._listeners[e].forEach(function(t) {
                    t(e)
                })
            }
        }, {
            key: "_dispatchAction",
            value: function(e, t) {
                var i = {
                    action: e,
                    value: t
                };
                i = JSON.stringify(i),
                this._iframe && this._iframe.contentWindow.window.postMessage(i, "*")
            }
        }, {
            key: "_setupExternalInterface",
            value: function() {
                var e = this;
                window.addEventListener("message", function(t) {
                    if (t.origin === a.hostedPlayer.host) {
                        var i = t.data;
                        if ("string" == typeof i)
                            try {
                                i = JSON.parse(i)
                            } catch (e) {
                                return
                            }
                        var s = i.videoEvent;
                        if (s && s.frameId === e._frameId && s) {
                            switch (s.name) {
                            case "__state__":
                                e._duration = s.data.duration,
                                e._ended = s.data.ended,
                                e._paused = s.data.paused,
                                e._seeking = s.data.seeking,
                                e._broadcastId = s.data.broadcastId,
                                e._contentPreset = s.data.contentPreset,
                                e._isLive = s.data.isLive,
                                e._playerType = s.data.playerType,
                                e._emittedReady || (e._emit("ready"),
                                e._emittedReady = !0,
                                e.autoplay = r(e._autoplay) ? s.data.autoplay : e.autoplay,
                                e.timeshift = r(e._timeshift) ? s.data.timeshift : e.timeshift,
                                e.controls = r(e._controls) ? s.data.controls : e.controls,
                                r(e._currentTime) ? s.data.currentOffsetFromStart > -1 ? e.currentTime = s.data.currentOffsetFromStart : e.currentTime = s.data.currentTime : e.currentTime = e.currentTime,
                                e.muted = r(e._muted) ? s.data.muted : e.muted,
                                e.poster = r(e._poster) ? s.data.poster : e.poster,
                                e.volume = r(e._volume) ? s.data.volume : e.volume,
                                e.scaleMode = r(e._scaleMode) ? s.data.scaleMode : e.scaleMode,
                                Object.keys(e._attributes).forEach(function(t) {
                                    e.setAttribute(t, e._attributes[t])
                                })),
                                e._startWhenReady && (Object.keys(e._playPromises).forEach(function(t) {
                                    e._playPromises[t].resolve(),
                                    delete e._playPromises[t]
                                }),
                                e.play(!1));
                                break;
                            case "__video_dimensions__":
                                s.data.videoHeight && (e._videoHeight = s.data.videoHeight),
                                s.data.videoWidth && (e._videoWidth = s.data.videoWidth);
                                break;
                            case "__exception__":
                                throw s.data;
                            case "__play_promise_result__":
                                var n = s.data
                                  , o = n.id
                                  , u = n.resolved
                                  , d = e._playPromises[o];
                                d && (u ? d.resolve() : d.reject(),
                                delete e._playPromises[o]);
                                break;
                            case "ended":
                                e._ended = !0;
                                break;
                            case "error":
                                var c = new Error(s.data.message);
                                s.data.name && (e._error.name = s.data.name),
                                e._error = c;
                                break;
                            case "durationchange":
                                e._duration = s.data;
                                break;
                            case "pause":
                                e._paused = !0;
                                break;
                            case "play":
                                e._paused = !1;
                                break;
                            case "playing":
                                e._seeking = !1;
                                break;
                            case "progress":
                                e._buffered = s.data;
                                break;
                            case "seeked":
                                e._seeking = !1;
                                break;
                            case "seeking":
                                e._seeking = !0;
                                break;
                            case "timeupdate":
                                s.data.currentOffsetFromStart > -1 ? e._currentTime = s.data.currentOffsetFromStart : e._currentTime = s.data.currentTime;
                                break;
                            case "viewers":
                                e._viewers = s.data;
                                break;
                            case "volumechange":
                                e._volume = s.data.volume,
                                e._muted = s.data.muted;
                                break;
                            case "canplay":
                            case "loadedmetadata":
                            case "loadeddata":
                            case "waiting":
                            case "webkitendfullscreen":
                            }
                            e._emit(s.name)
                        }
                    }
                }, !1)
            }
        }, {
            key: "addEventListener",
            value: function(e, t) {
                "function" == typeof t && (this._listeners || (this._listeners = {}),
                this._listeners[e] || (this._listeners[e] = []),
                this._listeners[e].push(t))
            }
        }, {
            key: "removeEventListener",
            value: function(e, t) {
                if (this._listeners && this._listeners[e]) {
                    var i = this._listeners[e].indexOf(t);
                    i !== -1 && this._listeners[e].splice(i, 1)
                }
            }
        }, {
            key: "setAttribute",
            value: function(e, t) {
                this._attributes[e] = t,
                this._dispatchAction("setAttribute", {
                    key: e,
                    value: t
                })
            }
        }, {
            key: "pause",
            value: function() {
                this._dispatchAction("pause")
            }
        }, {
            key: "play",
            value: function() {
                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this._startWhenReady = !0;
                var t = void 0
                  , i = void 0;
                if (e && window.Promise) {
                    i = "p" + Math.random();
                    var s = void 0
                      , r = void 0;
                    t = new Promise(function(e, t) {
                        s = e,
                        r = t
                    }
                    ),
                    this._playPromises[i] = {
                        resolve: function() {
                            return s()
                        },
                        reject: function() {
                            return r()
                        }
                    }
                }
                return this._dispatchAction("play", i),
                e ? t : void 0
            }
        }, {
            key: "load",
            value: function() {
                this._dispatchAction("load")
            }
        }, {
            key: "getHTMLElement",
            value: function() {
                if (this._iframe)
                    return this._iframe;
                var e = a.hostedPlayer.host + a.hostedPlayer.path
                  , t = {
                    frameId: this._frameId,
                    resourceUri: this._resourceUri,
                    volume: this.volume,
                    autoplay: this.autoplay,
                    timeshift: this._opts.timeshift,
                    usePreviewAsPoster: this._opts.usePreviewAsPoster,
                    host: window.location.host
                };
                if (this._opts.applicationId && (t.applicationId = this._opts.applicationId),
                this._opts.allowedPlayerTypes && (t.allowedPlayerTypes = this._opts.allowedPlayerTypes.toString()),
                this._opts.allowedPresets && (t.allowedPresets = this._opts.allowedPresets.toString()),
                e += "?" + Object.keys(t).map(function(e) {
                    return e + "=" + encodeURIComponent(t[e])
                }).join("&"),
                this._opts.startPosition || this._opts.endPosition) {
                    var i = encodeURIComponent(this._opts.startPosition || "")
                      , s = this._opts.endPosition ? "," + encodeURIComponent(this._opts.endPosition) : "";
                    e += "#t=" + i + s
                }
                var r = this._iframe = document.createElement("iframe");
                return r.style.width = "100%",
                r.style.height = "100%",
                r.style.border = 0,
                r.setAttribute("frameborder", "0"),
                r.setAttribute("scrolling", "no"),
                r.setAttribute("marginWidth", "0"),
                r.setAttribute("marginHeight", "0"),
                this._opts.noFullscreen || r.setAttribute("allowFullScreen", ""),
                r.setAttribute("allow", "autoplay" + (this._opts.noFullscreen ? "" : "; fullscreen")),
                r.src = e,
                r
            }
        }, {
            key: "setupPlayerIn",
            value: function(e) {
                e.innerHTML = "",
                e.appendChild(this.getHTMLElement())
            }
        }, {
            key: "buffered",
            get: function() {
                var e = this;
                return {
                    length: this._buffered.length,
                    start: function(t) {
                        return e._buffered[t][0]
                    },
                    end: function(t) {
                        return e._buffered[t][1]
                    }
                }
            }
        }, {
            key: "autoplay",
            get: function() {
                return "undefined" != typeof this._autoplay && this._autoplay
            },
            set: function(e) {
                this._autoplay = !!e,
                this._dispatchAction("setAutoplay", this._autoplay)
            }
        }, {
            key: "controls",
            get: function() {
                return "undefined" != typeof this._controls && this._controls
            },
            set: function(e) {
                this._controls = !!e,
                this._iframe && (this._iframe.style.pointerEvents = this._controls ? "" : "none"),
                this._dispatchAction("setControls", this._controls)
            }
        }, {
            key: "currentTime",
            get: function() {
                return "undefined" == typeof this._currentTime ? 0 : this._currentTime
            },
            set: function(e) {
                this._currentTime = e,
                this._dispatchAction("setCurrentTime", e)
            }
        }, {
            key: "ended",
            get: function() {
                return this._ended
            }
        }, {
            key: "error",
            get: function() {
                return this._error
            }
        }, {
            key: "duration",
            get: function() {
                return this._duration
            }
        }, {
            key: "muted",
            get: function() {
                return "undefined" != typeof this._muted && this._muted
            },
            set: function(e) {
                this._muted = !!e,
                this._dispatchAction("setMuted", this._muted)
            }
        }, {
            key: "paused",
            get: function() {
                return this._paused
            }
        }, {
            key: "poster",
            get: function() {
                return "undefined" == typeof this._poster ? "" : this._poster
            },
            set: function(e) {
                e ? "string" == typeof e && (e.match(/^http/) || e.match(/^\/\//) || (e.match(/^\//) || (e = "/" + e),
                e = window.location.origin + e)) : e = "",
                this._poster = e,
                this._dispatchAction("setPoster", e)
            }
        }, {
            key: "seeking",
            get: function() {
                return this._seeking
            }
        }, {
            key: "videoHeight",
            get: function() {
                return this._videoHeight
            }
        }, {
            key: "videoWidth",
            get: function() {
                return this._videoWidth
            }
        }, {
            key: "viewers",
            get: function() {
                return this._viewers
            }
        }, {
            key: "volume",
            get: function() {
                return "undefined" == typeof this._volume ? 1 : this._volume
            },
            set: function(e) {
                this._volume = e,
                this._dispatchAction("setVolume", e)
            }
        }, {
            key: "broadcastId",
            get: function() {
                return this._broadcastId
            }
        }, {
            key: "contentPreset",
            get: function() {
                return this._contentPreset
            }
        }, {
            key: "isLive",
            get: function() {
                return this._isLive
            }
        }, {
            key: "playerType",
            get: function() {
                return this._playerType
            }
        }, {
            key: "scaleMode",
            get: function() {
                return this._scaleMode || ""
            },
            set: function(e) {
                this._scaleMode = e,
                this._dispatchAction("setScaleMode", e)
            }
        }, {
            key: "timeshift",
            get: function() {
                return this._timeshift
            },
            set: function(e) {
                this._timeshift = e,
                this._dispatchAction("setTimeshift", e)
            }
        }]),
        e
    }()
}
]);
//# sourceMappingURL=bambuser-video-iframeapi.min.js.map

export default BambuserPlayer;

(function(source, args) {
    function GoogleIma3(source) {
        const VERSION = "3.453.0";
        const ima = {};
        const AdDisplayContainer = function AdDisplayContainer() {};
        AdDisplayContainer.prototype.destroy = noopFunc;
        AdDisplayContainer.prototype.initialize = noopFunc;
        const ImaSdkSettings = function ImaSdkSettings() {};
        ImaSdkSettings.CompanionBackfillMode = {
            ALWAYS: "always",
            ON_MASTER_AD: "on_master_ad"
        };
        ImaSdkSettings.VpaidMode = {
            DISABLED: 0,
            ENABLED: 1,
            INSECURE: 2
        };
        ImaSdkSettings.prototype = {
            c: true,
            f: {},
            i: false,
            l: "",
            p: "",
            r: 0,
            t: "",
            v: "",
            getCompanionBackfill: noopFunc,
            getDisableCustomPlaybackForIOS10Plus() {
                return this.i;
            },
            getDisabledFlashAds: function getDisabledFlashAds() {
                return true;
            },
            getFeatureFlags() {
                return this.f;
            },
            getLocale() {
                return this.l;
            },
            getNumRedirects() {
                return this.r;
            },
            getPlayerType() {
                return this.t;
            },
            getPlayerVersion() {
                return this.v;
            },
            getPpid() {
                return this.p;
            },
            getVpaidMode() {
                return this.C;
            },
            isCookiesEnabled() {
                return this.c;
            },
            isVpaidAdapter() {
                return this.M;
            },
            setCompanionBackfill: noopFunc,
            setAutoPlayAdBreaks(a) {
                this.K = a;
            },
            setCookiesEnabled(c) {
                this.c = !!c;
            },
            setDisableCustomPlaybackForIOS10Plus(i) {
                this.i = !!i;
            },
            setDisableFlashAds: noopFunc,
            setFeatureFlags(f) {
                this.f = !!f;
            },
            setIsVpaidAdapter(a) {
                this.M = a;
            },
            setLocale(l) {
                this.l = !!l;
            },
            setNumRedirects(r) {
                this.r = !!r;
            },
            setPageCorrelator(a) {
                this.R = a;
            },
            setPlayerType(t) {
                this.t = !!t;
            },
            setPlayerVersion(v) {
                this.v = !!v;
            },
            setPpid(p) {
                this.p = !!p;
            },
            setVpaidMode(a) {
                this.C = a;
            },
            setSessionId: noopFunc,
            setStreamCorrelator: noopFunc,
            setVpaidAllowed: noopFunc,
            CompanionBackfillMode: {
                ALWAYS: "always",
                ON_MASTER_AD: "on_master_ad"
            },
            VpaidMode: {
                DISABLED: 0,
                ENABLED: 1,
                INSECURE: 2
            }
        };
        const EventHandler = function EventHandler() {
            this.listeners = new Map;
            this._dispatch = function(e) {
                const listeners = this.listeners.get(e.type) || [];
                for (var _i = 0, _Array$from = Array.from(listeners); _i < _Array$from.length; _i++) {
                    const listener = _Array$from[_i];
                    try {
                        listener(e);
                    } catch (r) {
                        logMessage(source, r);
                    }
                }
            };
            this.addEventListener = function(t, c) {
                if (!this.listeners.has(t)) {
                    this.listeners.set(t, new Set);
                }
                this.listeners.get(t).add(c);
            };
            this.removeEventListener = function(t, c) {
                var _this$listeners$get;
                (_this$listeners$get = this.listeners.get(t)) === null || _this$listeners$get === void 0 ? void 0 : _this$listeners$get.delete(c);
            };
        };
        const AdsManager = new EventHandler;
        AdsManager.volume = 1;
        AdsManager.collapse = noopFunc;
        AdsManager.configureAdsManager = noopFunc;
        AdsManager.destroy = noopFunc;
        AdsManager.discardAdBreak = noopFunc;
        AdsManager.expand = noopFunc;
        AdsManager.focus = noopFunc;
        AdsManager.getAdSkippableState = function() {
            return false;
        };
        AdsManager.getCuePoints = function() {
            return [ 0 ];
        };
        AdsManager.getCurrentAd = function() {
            return currentAd;
        };
        AdsManager.getCurrentAdCuePoints = function() {
            return [];
        };
        AdsManager.getRemainingTime = function() {
            return 0;
        };
        AdsManager.getVolume = function() {
            return this.volume;
        };
        AdsManager.init = noopFunc;
        AdsManager.isCustomClickTrackingUsed = function() {
            return false;
        };
        AdsManager.isCustomPlaybackUsed = function() {
            return false;
        };
        AdsManager.pause = noopFunc;
        AdsManager.requestNextAdBreak = noopFunc;
        AdsManager.resize = noopFunc;
        AdsManager.resume = noopFunc;
        AdsManager.setVolume = function(v) {
            this.volume = v;
        };
        AdsManager.skip = noopFunc;
        AdsManager.start = function() {
            for (var _i2 = 0, _arr = [ AdEvent.Type.ALL_ADS_COMPLETED, AdEvent.Type.CONTENT_RESUME_REQUESTED ]; _i2 < _arr.length; _i2++) {
                const type = _arr[_i2];
                try {
                    this._dispatch(new ima.AdEvent(type));
                } catch (e) {
                    logMessage(source, e);
                }
            }
        };
        AdsManager.stop = noopFunc;
        AdsManager.updateAdsRenderingSettings = noopFunc;
        const manager = Object.create(AdsManager);
        const AdsManagerLoadedEvent = function AdsManagerLoadedEvent(type, adsRequest, userRequestContext) {
            this.type = type;
            this.adsRequest = adsRequest;
            this.userRequestContext = userRequestContext;
        };
        AdsManagerLoadedEvent.prototype = {
            getAdsManager: function getAdsManager() {
                return manager;
            },
            getUserRequestContext() {
                if (this.userRequestContext) {
                    return this.userRequestContext;
                }
                return {};
            }
        };
        AdsManagerLoadedEvent.Type = {
            ADS_MANAGER_LOADED: "adsManagerLoaded"
        };
        const AdsLoader = EventHandler;
        AdsLoader.prototype.settings = new ImaSdkSettings;
        AdsLoader.prototype.contentComplete = noopFunc;
        AdsLoader.prototype.destroy = noopFunc;
        AdsLoader.prototype.getSettings = function() {
            return this.settings;
        };
        AdsLoader.prototype.getVersion = function() {
            return VERSION;
        };
        AdsLoader.prototype.requestAds = function(adsRequest, userRequestContext) {
            var _this = this;
            requestAnimationFrame((function() {
                const ADS_MANAGER_LOADED = AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED;
                const event = new ima.AdsManagerLoadedEvent(ADS_MANAGER_LOADED, adsRequest, userRequestContext);
                _this._dispatch(event);
            }));
            const e = new ima.AdError("adPlayError", 1205, 1205, "The browser prevented playback initiated without user interaction.", adsRequest, userRequestContext);
            requestAnimationFrame((function() {
                _this._dispatch(new ima.AdErrorEvent(e));
            }));
        };
        const AdsRenderingSettings = noopFunc;
        const AdsRequest = function AdsRequest() {};
        AdsRequest.prototype = {
            setAdWillAutoPlay: noopFunc,
            setAdWillPlayMuted: noopFunc,
            setContinuousPlayback: noopFunc
        };
        const AdPodInfo = function AdPodInfo() {};
        AdPodInfo.prototype = {
            getAdPosition: function getAdPosition() {
                return 1;
            },
            getIsBumper: function getIsBumper() {
                return false;
            },
            getMaxDuration: function getMaxDuration() {
                return -1;
            },
            getPodIndex: function getPodIndex() {
                return 1;
            },
            getTimeOffset: function getTimeOffset() {
                return 0;
            },
            getTotalAds: function getTotalAds() {
                return 1;
            }
        };
        const Ad = function Ad() {};
        Ad.prototype = {
            pi: new AdPodInfo,
            getAdId: function getAdId() {
                return "";
            },
            getAdPodInfo() {
                return this.pi;
            },
            getAdSystem: function getAdSystem() {
                return "";
            },
            getAdvertiserName: function getAdvertiserName() {
                return "";
            },
            getApiFramework: function getApiFramework() {
                return null;
            },
            getCompanionAds: function getCompanionAds() {
                return [];
            },
            getContentType: function getContentType() {
                return "";
            },
            getCreativeAdId: function getCreativeAdId() {
                return "";
            },
            getDealId: function getDealId() {
                return "";
            },
            getDescription: function getDescription() {
                return "";
            },
            getDuration: function getDuration() {
                return 8.5;
            },
            getHeight: function getHeight() {
                return 0;
            },
            getMediaUrl: function getMediaUrl() {
                return null;
            },
            getMinSuggestedDuration: function getMinSuggestedDuration() {
                return -2;
            },
            getSkipTimeOffset: function getSkipTimeOffset() {
                return -1;
            },
            getSurveyUrl: function getSurveyUrl() {
                return null;
            },
            getTitle: function getTitle() {
                return "";
            },
            getTraffickingParametersString: function getTraffickingParametersString() {
                return "";
            },
            getUiElements: function getUiElements() {
                return [ "" ];
            },
            getUniversalAdIdRegistry: function getUniversalAdIdRegistry() {
                return "unknown";
            },
            getUniversalAdIds: function getUniversalAdIds() {
                return [ "" ];
            },
            getUniversalAdIdValue: function getUniversalAdIdValue() {
                return "unknown";
            },
            getVastMediaBitrate: function getVastMediaBitrate() {
                return 0;
            },
            getVastMediaHeight: function getVastMediaHeight() {
                return 0;
            },
            getVastMediaWidth: function getVastMediaWidth() {
                return 0;
            },
            getWidth: function getWidth() {
                return 0;
            },
            getWrapperAdIds: function getWrapperAdIds() {
                return [ "" ];
            },
            getWrapperAdSystems: function getWrapperAdSystems() {
                return [ "" ];
            },
            getWrapperCreativeIds: function getWrapperCreativeIds() {
                return [ "" ];
            },
            isLinear: function isLinear() {
                return true;
            },
            isSkippable() {
                return true;
            }
        };
        const CompanionAd = function CompanionAd() {};
        CompanionAd.prototype = {
            getAdSlotId: function getAdSlotId() {
                return "";
            },
            getContent: function getContent() {
                return "";
            },
            getContentType: function getContentType() {
                return "";
            },
            getHeight: function getHeight() {
                return 1;
            },
            getWidth: function getWidth() {
                return 1;
            }
        };
        const AdError = function AdError(type, code, vast, message, adsRequest, userRequestContext) {
            this.errorCode = code;
            this.message = message;
            this.type = type;
            this.adsRequest = adsRequest;
            this.userRequestContext = userRequestContext;
            this.getErrorCode = function() {
                return this.errorCode;
            };
            this.getInnerError = function() {};
            this.getMessage = function() {
                return this.message;
            };
            this.getType = function() {
                return this.type;
            };
            this.getVastErrorCode = function() {
                return this.vastErrorCode;
            };
            this.toString = function() {
                return "AdError ".concat(this.errorCode, ": ").concat(this.message);
            };
        };
        AdError.ErrorCode = {};
        AdError.Type = {};
        const isEngadget = function isEngadget() {
            try {
                for (var _i3 = 0, _Object$values = Object.values(window.vidible._getContexts()); _i3 < _Object$values.length; _i3++) {
                    var _ctx$getPlayer, _ctx$getPlayer$div;
                    const ctx = _Object$values[_i3];
                    if ((_ctx$getPlayer = ctx.getPlayer()) !== null && _ctx$getPlayer !== void 0 && (_ctx$getPlayer$div = _ctx$getPlayer.div) !== null && _ctx$getPlayer$div !== void 0 && _ctx$getPlayer$div.innerHTML.includes("www.engadget.com")) {
                        return true;
                    }
                }
            } catch (e) {}
            return false;
        };
        const currentAd = isEngadget() ? undefined : new Ad;
        const AdEvent = function AdEvent(type) {
            this.type = type;
        };
        AdEvent.prototype = {
            getAd: function getAd() {
                return currentAd;
            },
            getAdData: function getAdData() {}
        };
        AdEvent.Type = {
            AD_BREAK_READY: "adBreakReady",
            AD_BUFFERING: "adBuffering",
            AD_CAN_PLAY: "adCanPlay",
            AD_METADATA: "adMetadata",
            AD_PROGRESS: "adProgress",
            ALL_ADS_COMPLETED: "allAdsCompleted",
            CLICK: "click",
            COMPLETE: "complete",
            CONTENT_PAUSE_REQUESTED: "contentPauseRequested",
            CONTENT_RESUME_REQUESTED: "contentResumeRequested",
            DURATION_CHANGE: "durationChange",
            EXPANDED_CHANGED: "expandedChanged",
            FIRST_QUARTILE: "firstQuartile",
            IMPRESSION: "impression",
            INTERACTION: "interaction",
            LINEAR_CHANGE: "linearChange",
            LINEAR_CHANGED: "linearChanged",
            LOADED: "loaded",
            LOG: "log",
            MIDPOINT: "midpoint",
            PAUSED: "pause",
            RESUMED: "resume",
            SKIPPABLE_STATE_CHANGED: "skippableStateChanged",
            SKIPPED: "skip",
            STARTED: "start",
            THIRD_QUARTILE: "thirdQuartile",
            USER_CLOSE: "userClose",
            VIDEO_CLICKED: "videoClicked",
            VIDEO_ICON_CLICKED: "videoIconClicked",
            VIEWABLE_IMPRESSION: "viewable_impression",
            VOLUME_CHANGED: "volumeChange",
            VOLUME_MUTED: "mute"
        };
        const AdErrorEvent = function AdErrorEvent(error) {
            this.error = error;
            this.type = "adError";
            this.getError = function() {
                return this.error;
            };
            this.getUserRequestContext = function() {
                var _this$error;
                if ((_this$error = this.error) !== null && _this$error !== void 0 && _this$error.userRequestContext) {
                    return this.error.userRequestContext;
                }
                return {};
            };
        };
        AdErrorEvent.Type = {
            AD_ERROR: "adError"
        };
        const CustomContentLoadedEvent = function CustomContentLoadedEvent() {};
        CustomContentLoadedEvent.Type = {
            CUSTOM_CONTENT_LOADED: "deprecated-event"
        };
        const CompanionAdSelectionSettings = function CompanionAdSelectionSettings() {};
        CompanionAdSelectionSettings.CreativeType = {
            ALL: "All",
            FLASH: "Flash",
            IMAGE: "Image"
        };
        CompanionAdSelectionSettings.ResourceType = {
            ALL: "All",
            HTML: "Html",
            IFRAME: "IFrame",
            STATIC: "Static"
        };
        CompanionAdSelectionSettings.SizeCriteria = {
            IGNORE: "IgnoreSize",
            SELECT_EXACT_MATCH: "SelectExactMatch",
            SELECT_NEAR_MATCH: "SelectNearMatch"
        };
        const AdCuePoints = function AdCuePoints() {};
        AdCuePoints.prototype = {
            getCuePoints: function getCuePoints() {
                return [];
            },
            getAdIdRegistry: function getAdIdRegistry() {
                return "";
            },
            getAdIsValue: function getAdIsValue() {
                return "";
            }
        };
        const AdProgressData = noopFunc;
        const UniversalAdIdInfo = function UniversalAdIdInfo() {};
        Object.assign(ima, {
            AdCuePoints: AdCuePoints,
            AdDisplayContainer: AdDisplayContainer,
            AdError: AdError,
            AdErrorEvent: AdErrorEvent,
            AdEvent: AdEvent,
            AdPodInfo: AdPodInfo,
            AdProgressData: AdProgressData,
            AdsLoader: AdsLoader,
            AdsManager: manager,
            AdsManagerLoadedEvent: AdsManagerLoadedEvent,
            AdsRenderingSettings: AdsRenderingSettings,
            AdsRequest: AdsRequest,
            CompanionAd: CompanionAd,
            CompanionAdSelectionSettings: CompanionAdSelectionSettings,
            CustomContentLoadedEvent: CustomContentLoadedEvent,
            gptProxyInstance: {},
            ImaSdkSettings: ImaSdkSettings,
            OmidAccessMode: {
                DOMAIN: "domain",
                FULL: "full",
                LIMITED: "limited"
            },
            settings: new ImaSdkSettings,
            UiElements: {
                AD_ATTRIBUTION: "adAttribution",
                COUNTDOWN: "countdown"
            },
            UniversalAdIdInfo: UniversalAdIdInfo,
            VERSION: VERSION,
            ViewMode: {
                FULLSCREEN: "fullscreen",
                NORMAL: "normal"
            }
        });
        if (!window.google) {
            window.google = {};
        }
        window.google.ima = ima;
        hit(source);
    }
    function hit(source) {
        if (source.verbose !== true) {
            return;
        }
        try {
            const log = console.log.bind(console);
            const trace = console.trace.bind(console);
            let prefix = source.ruleText || "";
            if (source.domainName) {
                const AG_SCRIPTLET_MARKER = "#%#//";
                const UBO_SCRIPTLET_MARKER = "##+js";
                let ruleStartIndex;
                if (source.ruleText.includes(AG_SCRIPTLET_MARKER)) {
                    ruleStartIndex = source.ruleText.indexOf(AG_SCRIPTLET_MARKER);
                } else if (source.ruleText.includes(UBO_SCRIPTLET_MARKER)) {
                    ruleStartIndex = source.ruleText.indexOf(UBO_SCRIPTLET_MARKER);
                }
                const rulePart = source.ruleText.slice(ruleStartIndex);
                prefix = "".concat(source.domainName).concat(rulePart);
            }
            log("".concat(prefix, " trace start"));
            if (trace) {
                trace();
            }
            log("".concat(prefix, " trace end"));
        } catch (e) {}
        if (typeof window.__debug === "function") {
            window.__debug(source);
        }
    }
    function noopFunc() {}
    function logMessage(source, message) {
        let forced = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        let convertMessageToString = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        const name = source.name, verbose = source.verbose;
        if (!forced && !verbose) {
            return;
        }
        const nativeConsole = console.log;
        if (!convertMessageToString) {
            nativeConsole("".concat(name, ":"), message);
            return;
        }
        nativeConsole("".concat(name, ": ").concat(message));
    }
    const updatedArgs = args ? [].concat(source).concat(args) : [ source ];
    try {
        GoogleIma3.apply(this, updatedArgs);
    } catch (e) {
        console.log(e);
    }
})({
    name: "google-ima3",
    args: []
}, []);
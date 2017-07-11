define(['bootstrap/bootstrap.min', 'app-remote/framework/localization/config',"language/inventory"], function (bootstrap, localizationConfig, i18n) {
    "use strict";
    var ctrl = function ($rootScope, frameworkService, globalRegionName, currentService, $sce, $state, $location, storage) {
        var i18nSubRegRex = /\{\s*([^\|\}]+?)\s*(?:\|([^\}]*))?\s*\}/g;
        $rootScope.i18nReplace = function (s, o) {
            if (!s || !o) {
                return;
            }
            return ((s.replace) ? s.replace(i18nSubRegRex, function (match, key) {
                return (!angular.isUndefined(o[key])) ? o[key] : match;
            }) : s);
        };
        $rootScope.widgetsLanguage = window.tinyLanguage.language;
        $rootScope.timeFormat = $rootScope.i18n.dateFormat + ' HH:mm:ss';
        $rootScope.tmpRegions = [];
        $rootScope.regions = [];
        $rootScope.regionIdInUserInfo = '';
        $rootScope.displayRegionName = '';
        $rootScope.isVdcRegion = false;
        $rootScope.noticeNum = 0;
        $rootScope.username = '';
        $rootScope.company = '';
        $rootScope.userId = '';
        $rootScope.userRoles = [];
        $rootScope.isOldUser = false;
        $rootScope.accountBalance = 0;
        $rootScope.accountBalanceDecimal = '.00';
        $rootScope.debitBalance = 0;
        $rootScope.bonusBalance = 0;
        $rootScope.homeEndpoint = null;
        $rootScope.UserCenterEndpoint = null;
        $rootScope.AppMgmtEndpoint = null;
        $rootScope.TreasureChestEndpoint = null;
        $rootScope.TreasureChestEndpoints = [];
        $rootScope.HelpCenterEndpoint = null;
        //已经按类别进行分类处理的endpoints，可直接用于菜单服务列表显示
        $rootScope.serviceEndpoints = [];
        //列表格式的endpoints，未按类别进行分组
        $rootScope.serviceEndpointList = [];
        $rootScope.favoriteEndpoints = [];
        //收藏是否失败标志
        $rootScope.favoriteError = true;
        $rootScope.messageTypeKeys = '';
        $rootScope.isLoginUserFlag = true;
        $rootScope.loginUserAccount = {};
        $rootScope.hasAssumeRoleFlag = false;
        $rootScope.assumeRoles = [];
        $rootScope.links = [];
        $rootScope.favoriteServiceMax = 7;
        $rootScope.showBalance = false;
        //是否为分销商子账户
        $rootScope.isVendorSubUser = false;
        $rootScope.endpointInitFlag = false;
        $rootScope.elementDisplayFlag = true;
        $rootScope.regionDisplayFlag = true;
        $rootScope.globalRegionName = globalRegionName;
        $rootScope.currentService = currentService;
        $rootScope.bussinessConsoleList = ['authCenter', 'marketplace', 'userCenter'];
        $rootScope.isServiceConsole = $.inArray($rootScope.currentService, $rootScope.bussinessConsoleList) < 0;
        $rootScope.currentServiceName = $rootScope.i18n['console_term_' + $rootScope.currentService + '_label'];
        $rootScope.logoutUrl = window.appWebPath + '/logout';
        $rootScope.lastState = "";
        $rootScope.canAssumeRole = localizationConfig.canAssumeRole;
        $rootScope.console_term_copyright_label = $sce.trustAsHtml($rootScope.i18n.console_term_copyright_label);

        $rootScope.user_head_href = {
            "url": 'theme/default/images/user-head.png'
        };

        $rootScope.user_head_all = {};

        $rootScope.my_quota_link = $rootScope.i18n.console_term_consoleHome_link + "#/quota";

        $rootScope.nonsupportRegions = [];

        $rootScope.displayMenuElements = function (flag) {
            $rootScope.regionDisplayFlag = flag;
        };

        $rootScope.displayMenusWithOutRegion = function (flag) {
        };

        $rootScope.logout = function() {
            storage.flush();
            window.location.href =  $rootScope.logoutUrl;
        };
        var myRegions = [];
        //初始化region 代码表
        function initRegions() {
            var promiseRegion = frameworkService.queryRegions();
            promiseRegion.then(function (data) {
                if (!data) {
                    return;
                }
                if (!data.regions) {
                    $rootScope.tmpRegions = [];
                } else {
                    $rootScope.tmpRegions = data.regions;
                }
                $rootScope.regions =  $rootScope.tmpRegions;
                myRegions = data.regions;
                initUserInfo(myRegions);
            });
        }

        $rootScope.i18n.console_term_collectTip_valid = $sce.trustAsHtml($rootScope.i18nReplace($rootScope.i18n.console_term_collectTip_valid,
            {
                "1": $rootScope.favoriteServiceMax,
                "2": '<span class="hwsicon-frame-image-favorite-true menu-hwsicon-frame-service-favorite-tip"></span>'
            }));

        pageInit();
        function pageInit() {
            initRegions();
        }

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                if (toState.name !== "nonsupportRegion") {
                    if ($rootScope.nonsupportRegions && $rootScope.isNonsupportRegion($rootScope.nonsupportRegions, $rootScope.regionIdInUserInfo)) {
                        $rootScope.lastState = toState;
                        event.preventDefault();
                    }
                }
            });

        //用户数据及依赖用户数据的endpoints相关数据初始化
        function initUserInfo(regionInfor) {
            var promiseUser = frameworkService.getLoginUser();
            promiseUser.then(function (data) {
                if (!data) {
                    return;
                }
                var regionId = data.region;
                if (!regionId || "" === regionId) {
                    var regions = regionInfor;
                    if ([] === regions || null === regions || undefined === regions) {
                        regionId = "";
                    } else {
                        regionId = regions[0].id;
                    }
                }
                $rootScope.userId = data.id;
                $rootScope.username = data.name;
                $rootScope.regionIdInUserInfo = regionId;
                $rootScope.userRoles = data.roleNames;
                $rootScope.$broadcast("initUser");
                initDefaultRegion(regionId);
                return frameworkService.queryEndpoints({"region": $rootScope.regionIdInUserInfo});
            }).then(function (data) {
                dealAllEndpoints(data);
            }).then(function (data) {
                dealServiceEndpoints();
            });
        }

        function getDisplayRegionName(regionId) {
            if (regionId  === "") {
                if ($rootScope.tmpRegions.length === 0){
                    $rootScope.displayRegionName = "";
                } else {
                    $rootScope.displayRegionName = ($rootScope.tmpRegions[0]).name;
                }
                return $rootScope.displayRegionName;
            }
            return getRegionNameById(regionId);
        }
        function initDefaultRegion(regionId) {
            if (globalRegionName + '' === '') {
                if ($rootScope.tmpRegions.length > 0) {
                    $rootScope.displayRegionName = getDisplayRegionName(regionId);
                    $rootScope.$broadcast("initDefaultRegion");
                }
            } else {
                $rootScope.displayRegionName = globalRegionName;
                $rootScope.$broadcast("initDefaultRegion");
            }
        }

        function getRegionNameById(regionId) {
            var index;
            for (index in $rootScope.tmpRegions) {
                if (regionId === $rootScope.tmpRegions[index].id) {
                    return $rootScope.tmpRegions[index].name;
                }
            }
            return '';
        }

        function dealAllEndpoints(data) {
            if (!data || !data.endpoints) {
                return;
            }
            var endpoints = data.endpoints;
            var tmpEndpoints = [];
            var endpoint;
            for (var item = 0; item < endpoints.length; item++) {
                endpoints[item].notDisable = false;
                endpoint = endpoints[item];
                if(endpoint.nonSupportRegions){
                    if(endpoint.nonSupportRegions.indexOf($rootScope.regionIdInUserInfo)===-1){
                        endpoint.notDisable = true;
                    }
                }
                if (endpoint.id === window.global_endpoint_id) {
                    $rootScope.endpointName = endpoint.name;
                }
                if (endpoint.id === "home") {
                    $rootScope.homeEndpoint = endpoint;
                } else if (endpoint.id === "UserCenter") {
                    $rootScope.UserCenterEndpoint = endpoint;
                } else if (endpoint.id === "AppMgmt") {
                    $rootScope.AppMgmtEndpoint = endpoint;
                } else if (endpoint.id === "TreasureChest") {
                    $rootScope.TreasureChestEndpoint = endpoint;
                } else if (endpoint.id === "HelpCenter") {
                    $rootScope.HelpCenterEndpoint = endpoint;
                } else if (endpoint.catalog === $rootScope.i18n.console_menu_box) {
                    $rootScope.TreasureChestEndpoints.push(endpoint);
                } else {
                    tmpEndpoints.push(endpoint);
                }
            }
            $rootScope.serviceEndpointList = tmpEndpoints;
        }

        //处理endpoints，将endpoints归类用户UI显示
        function dealServiceEndpoints() {
            var endpoints = $rootScope.serviceEndpointList;
            if (!endpoints) {
                return [];
            }
            var catalogs = {};
            var endpoint;
            var catalog;
            for (var item = 0; item < endpoints.length; item++) {
                //根据类别分类
                endpoint = endpoints[item];
                catalog = $.trim(endpoint.catalog);
                catalogs[catalog] = catalogs[catalog] || [];
                catalogs[catalog].push(endpoint);
            }
            var result = [];
            var index;
            for (index in catalogs) {
                if (catalogs.hasOwnProperty(index)) {
                    result.push({
                        catalog: index,
                        endpoints: catalogs[index]
                    });
                }
            }
            $rootScope.serviceEndpoints = result;
        }

        $rootScope.isNonsupportRegion = function (nonsupportRegions, regionId) {
            var result = false;
            //如果是DeC的project
            if (regionId && regionId.indexOf('DeC') === 0) {
                for (var i = 0; i < nonsupportRegions.length; i++) {
                    if (nonsupportRegions[i] && regionId.indexOf(nonsupportRegions[i]) === 0) {
                        result = true;
                        break;
                    }
                }
            } else {
                result = nonsupportRegions.indexOf(regionId) >= 0;
            }

            return result;
        };

        $rootScope.changeRegion = function (regionId) {
            if ($rootScope.isNonsupportRegion($rootScope.nonsupportRegions, regionId)) {
                return;
            }
            frameworkService.changeRegion({"region": regionId}).then(function () {
                //删除URL中的agencyId和regionName并刷新窗口以获取最新token
                var href = $rootScope.delUrlParameter(window.location.href, 'agencyId');
                href = $rootScope.delUrlParameter(href, 'region');
                //此处逻辑需要修改
                $rootScope.regionIdInUserInfo = regionId;
                if ($state.current.name === 'nonsupportRegion' || $state.current.name === 'beingMaintained' ||
                    $state.current.name === 'accessDeclined') {
                    window.location.href = href.replace('#' + $location.url(), '');
                } else {
                    if (href === window.location.href) {
                        window.location.reload();
                    } else {
                        window.location.href = href;
                    }
                }
            });
        };

        $rootScope.goHome = function () {
            if ($rootScope.isServiceConsole) {
                window.location.href = $rootScope.genHWSHref($rootScope.homeEndpoint.endpoint);
            } else {
                window.location.href = $rootScope.genHWSHref($rootScope.links.console_common, 'locale');
            }
        };

        if(storage.get('framework_tips_new_msg' + storage.cookieStorage.getItem('agencyID'))) {
            if($('.frame-message-round')) {
                $('.frame-message-round').css('display', 'block');
            }
        }


        /************************/

        //设置标志  $rootScope.userType 值为 1 时表示普通用户，此时 信息收集要隐藏，值为2时，信息收集 要显示



        //$rootScope.host_userType = sessionStorage.getItem("host-userType");
        //if( $rootScope.host_userType == "one"){
        //
        //    //nav顶部 左侧菜单栏显示 其中state表示的是路由,还要有一个标志当是普通用户的时候 ”信息收集“菜单不会显示
        //    $rootScope.menuItem = [{id:1,catalog:i18n.virtualMachine_apply,state:"#/virtualMachine_apply"},{id:2,catalog:i18n.system_manger,state:"#/system_manger"}];
        //
        //
        //}else if($rootScope.host_userType == "two"){
        //    $rootScope.menuItem = [{id:1,catalog:i18n.virtualMachine_apply,state:"#/virtualMachine_apply"},{id:2,catalog:i18n.info_collection,state:"#/info_collection"},{id:3,catalog:i18n.system_manger,state:"#/system_manger"}];
        //
        //}







        /*用户名*/
        $rootScope.meeting_userName =sessionStorage.getItem('hostManger');
        //$rootScope.HECPASS_token =sessionStorage.getItem('HECPASS_token');

        if( $rootScope.meeting_userName == '' || $rootScope.meeting_userName == null){

            $location.path('/login');
            return  false;
        }
        //if($rootScope.meeting_token == undefined || $rootScope.meeting_token == '' || $rootScope.meeting_token == null){
        //
        //    $location.path('/login');
        //    return  false;
        //}

        $rootScope.meeting_logout = function(){
            $rootScope.meeting_username = '';
            sessionStorage.setItem('hostManger','');
            //$rootScope.meeting_token = '';
            //sessionStorage.setItem('meeting_token','');
            //将左侧类型置空
            //$rootScope.leftmenuNumber = "";
            $location.path('/login');

        }




    };

    ctrl.$injector = ["$rootScope", "frameworkService", "globalRegionName", "currentService", "$state", "$location"];
    return ctrl;
});

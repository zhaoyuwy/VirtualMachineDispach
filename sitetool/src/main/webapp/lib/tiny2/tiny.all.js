/**
 * Description: TinyUI2.0 components
 * Version: 2.3.0
 */

/**
 * @description
 *  用来注册各组件通用的服务
 */
define('components/common/service/service',[], function () {
    'use strict';
    var toolModule = angular.module('tiny.service', []);
    toolModule.service('tiService', tinyService);

    function tinyService() {
        // contains
        this.contains = function (arr, item) {
            if (angular.isArray(arr)) {
                return _.contains(arr, item);
            }

            return false;
        };
        // add
        this.add = function (arr, item) {
            arr = angular.isArray(arr) ? arr : [];
            if (!_.contains(arr, item)) {
                arr.push(item);
            }

            return arr;
        };
        // remove
        this.remove = function (arr, item) {
            if (angular.isArray(arr)) {
                for (var i = arr.length; i--;) {
                    if (arr[i] === item) {
                        arr.splice(i, 1);
                        break;
                    }

                }
            }

            return arr;
        };
    }
    return toolModule.name;
});

define('components/common/utils/browser',[], function(){
    !window.tiny && (window.tiny = {});
    !tiny.utils && (tiny.utils = {});
    tiny.utils.browser = browserDetect();

    /**
     * 检测浏览器的类型及版本
     * @return {Object} [属性version表示浏览器的版本，是字符串类型；小写的浏览器名称属性，是布尔型]
     */
    function browserDetect() {
        var browser = {};
        var userAgent = navigator.userAgent.toLowerCase(), aAgentInfo;

        (aAgentInfo = userAgent.match(/rv:([\d.]+)\) like gecko/)) ? browser.ie = true :
            (aAgentInfo = userAgent.match(/msie ([\d.]+)/)) ? browser.ie = true :
                (aAgentInfo = userAgent.match(/firefox\/([\d.]+)/)) ? browser.firefox = true :
                    (aAgentInfo = userAgent.match(/chrome\/([\d.]+)/)) ? browser.chrome = true :
                        (aAgentInfo = userAgent.match(/opera.([\d.]+)/)) ? browser.opera = true :
                            (aAgentInfo = userAgent.match(/version\/([\d.]+).*safari/)) ? browser.safari = true : 0;

        _.isArray(aAgentInfo) && (browser.version = aAgentInfo[1]);

        return browser;
    }

    return tiny.utils.browser;
})

;
define('components/common/utils/placeholder',["components/common/utils/browser"],function (browser) {
    "use strict";
    !window.tiny && (window.tiny = {});
    !tiny.utils && (tiny.utils = {});
    tiny.utils.placeholder = {};
    var placeholder = tiny.utils.placeholder;

    // 判断浏览器是否支持placeholder属性：通过input标签或者textarea标签是否有placeholder属性判断
    // IE高版本下input设置placeholder时会触发input事件，因此IE高版本下不通过原生placeholder方式来实现
    if ((!window.tiny.utils.browser.ie) && ('placeholder' in document.createElement('input'))) {
        placeholder.setPlaceholder = function(elem, plValue) {
            if (typeof plValue === "string") {
                $(elem).attr("placeholder", plValue);
            }
        }
    } else {
        placeholder.setPlaceholder = setPlaceholder;

        var hooks = {
            get : getFn,
            set : setFn
        };
        $.valHooks.input = hooks;
        $.valHooks.textarea = hooks;
        $.propHooks.value = hooks;
    }

    function setPlaceholder(elem, plValue) {
        if (typeof plValue !== "string") {
            return;
        }

        var $element = $(elem);
        var element = $element[0];
        $element.attr("tiPlaceholder", plValue);

        // 动态更新placeholder时，不需要重新记录输入框默认类型
        // 解决问题：password类型输入框时，输入框内容为空时更新placeholder时，避免defaultType成为text
        if (!_.isString($element.data("defaultType"))) {
            $element.data("defaultType", element.type);
        }

        if($element.val() === '') {
            addPlaceholder(element);
        }

        element.onfocus = function() {
            if($element.hasClass("ti-placeholder")) {
                clearPlaceholder(element);
            }
        };

        element.onblur = function() {
            if(element.value === '') {
                addPlaceholder(element);
            }
        }
    }

    function clearPlaceholder(element) {
        var $element = $(element);
        element.value = '';
        $element.removeClass("ti-placeholder");
        if($element.data("defaultType") === "password") {
            element.type = "password";
        }
    }

    function addPlaceholder(element) {
        var $element = $(element);
        element.value = $element.attr("tiPlaceholder");
        $element.addClass("ti-placeholder");
        if($element.data("defaultType") === "password") {
            element.type = "text";
        }
    }

    function getFn(element) {
        var $element = $(element);
        return $element.hasClass("ti-placeholder") ? '' : element.value;
    }

    function setFn(element, value) {
        var $element = $(element);

        if ($element.attr("tiPlaceholder") === undefined) {
            element.value = value;
            return $element;
        }

        if (value === '') {
            element.value = "";
            // 如果当前输入框处于focus状态，不需要添加placeholder
            if (element !== document.activeElement) {
                addPlaceholder(element);
            }
        } else {
            clearPlaceholder(element);
            element.value = value;
        }
        return $element;
    }

    return placeholder;
});
/**
 * @description
 *  用来注册各组件通用的功能
 */
define('components/common/utils/utils',["components/common/utils/placeholder","components/common/utils/browser"],function (placeholder, browser) {
    'use strict';

    var utils = window.tiny.utils ? window.tiny.utils : {};

    utils.isDate = function (date) {
        // underscore的_.isDate()方法没有做Invalid Date判断，因此，组件单独封装一个判断Date的方法
        if (Object.prototype.toString.call(date) === "[object Date]" && date != "Invalid Date") {
            return true;
        }

        return false;
    };

    return utils;
});


// 控件的简体中文词条设置
define('i18n/zh-cn/tiny2Language',{
    // 公共词条
    more_title: '更多',
    ok_btn: '确认',
    cancel_btn: '取消',
    // actionMenu组件词条
    actionmenu_operate_title: '操作',
    // message控件词条
    msg_prompt_title: '提示',
    msg_warn_title: '警告',
    msg_confirm_title: '确认',
    msg_error_title: '错误',
    // 时间日期组件
    date_format: 'yyyy-MM-dd',
    time_format: 'HH:mm',
    date_clear_btn: '清除',
    date_today_btn: '今天',
    date_prev_month_title: '上月',
    date_next_month_title: '下月',
    date_week_start_value: 1,// 不需翻译
    date_week_names_abb: ['日', '一', '二', '三', '四', '五', '六'],
    date_week_names_title: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    date_month_names_abb: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'],
    date_year_suffix_label: '年',
    date_range_begin_label: '开始日期',
    date_range_end_label: '结束日期',
    datetime_range_time_label: '时间：',
    date_range_to_label: ' 至 ',
    // 分页
    page_goto_label: '跳转', // Pagination控件：goto跳转按钮的title属性值
    page_prev_title: '上一页', // Pagination控件：上一页按钮的title属性值
    page_next_title: '下一页', // Pagination控件：下一页按钮的title属性值
    page_total_label: '总条数:', // Pagination控件：显示消息总条数部分前边的文本
    // 文件上传
    upload_add_file_btn: '添加文件',
    upload_wait_info: '等待上传',
    upload_success_info: '上传成功',
    upload_error_info: '上传失败',
    // 校验
    valid_required_info: '输入不能为空。',
    valid_maxSize_info: '输入长度不能超过{0}。',
    valid_minSize_info: '输入长度不能小于{0}。',
    valid_rangeSize_info: '输入长度范围为{0}到{1}。',
    valid_maxValue_info: '输入值不能超过{0}。',
    valid_minValue_info: '输入值不能小于{0}。',
    valid_rangeValue_info: '输入值必须在{0}到{1}之间。',
    valid_regularCheck_info: '输入值无效。',
    valid_contains_info: '输入值必须包含有字符{0}。',
    valid_notContains_info: '输入值不能含有非法字符{0}。',
    valid_checkScriptInfo_info: '输入值不能含有script标签。',
    valid_equal_info: '输入值必须等于{0}。',
    valid_notEqual_info: '输入值不能等于{0}。',
    valid_port_info: '端口号为0到65535的整数。',
    valid_path_info: '输入值未满足路径格式要求。',
    valid_email_info: '输入email地址无效。',
    valid_date_info: '输入日期无效。',
    valid_url_info: '输入URL无效。',
    valid_integer_info: '输入值不是有效整数。',
    valid_number_info: '输入值不是有效数字。',
    valid_digits_info: '输入值不是有效数字字符。',
    valid_ipv4_info: '输入值不是有效IPV4地址。',
    valid_ipv6_info: '输入值不是有效IPV6地址。',
    // charts 组件
    loadingText: '数据加载中...'
});

/**
 * @description
 *  用来注册TinyUI component的AngularJS module
 */
define('components/module',['components/common/service/service', 'components/common/utils/utils', 'i18n/zh-cn/tiny2Language'], function (service, utils, laguage) {
    'use strict';

    // 默认控件语言为中文
    !window.tiny && (window.tiny = {});
    !tiny.language && (tiny.language = laguage);
    // 创建tiny核心模块
    var module = angular.module('tiny', [service]);
    module.config(['$sceProvider', function ($sceProvider) {
        $sceProvider.enabled(false);
    }]);
    return module;
});


/**
 * @description
 * AngularJS version of the tab directive.
 * 定义ti-tab指令,最终返回module名
 */

define('components/accordion/accordion',['components/module'],
    function (module) {
        'use strict';

        module.constant('tiAccordionConfig', {
            closeOthers: true,
            clickToggle: true
        });

        module.controller('tiAccordionController', tiAccordionController);
        tiAccordionController.$inject = ['$scope', '$attrs', 'tiAccordionConfig'];
        function tiAccordionController($scope, $attrs, accordionConfig) {
            // 存放accordion条目数据
            var items = $scope.accordionItems = [];

            this.headClass = $scope.$eval($attrs.headClass); // 支持开发者对手风琴条目头部设置自定义样式
            this.bodyClass = $scope.$eval($attrs.bodyClass); // 支持开发者对手风琴条目展开面板设置自定义样式

            // 设置closeOthers为true的情况下，关闭其他accordion条目
            this.closeOthers = function (openItem) {
                var closeOthers = angular.isDefined($attrs.closeOthers)
                    ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
                if (closeOthers) {
                    angular.forEach(items, function (item) {
                        if (item.open && item !== openItem) {
                            item.open = false;
                        }
                    });
                }
            };

            // 添加某一accordion条目到items数组中
            this.addItem = function (item) {
                items.push(item);
            };

            // 从items数组中删除某一accordion条目
            this.removeItem = function (item) {
                var index = items.indexOf(item);
                if (index !== -1) {
                    items.splice(index, 1);
                }
            };
        }

        // tiAccordion指令的控制器将在子指令中使用
        module.directive('tiAccordion', function () {
            return {
                restrict: 'E',
                controller: tiAccordionController,
                controllerAs: 'accordion',
                transclude: true,
                replace: true,
                templateUrl: '/tiny-components/src/components/accordion/accordion.html'
            };
        });

        module.controller('tiAccordionItemController', tiAccordionItemController);
        tiAccordionItemController.$inject = ['$scope'];
        function tiAccordionItemController($scope) {
            this.setHead = function (element) {
                this.head = element;
            };
        }

        module.directive('tiAccordionItem', tiAccordionItem);
        tiAccordionItem.$inject = ['tiAccordionConfig'];
        function tiAccordionItem(accordionConfig) {
            return {
                require: '^tiAccordion',
                transclude: true,
                restrict: 'E',
                replace: true,
                templateUrl: '/tiny-components/src/components/accordion/accordion-item.html',
                scope: {
                    open: '=?', // 设置面板是否开启
                    disable: '=?', // 设置不可用状态
                    clickToggle: '=?', // 设置用户点击head时是否自动实现状态切换
                    headClick: '&' // 点击头部的回调
                },
                controller: tiAccordionItemController,
                link: function (scope, element, attrs, accordionCtrl) {
                    // 添加当前的accordion到列表中
                    accordionCtrl.addItem(scope);

                    // 用户设置的手风琴条目头部和展开面板的样式
                    scope.headClass = accordionCtrl.headClass ? accordionCtrl.headClass : '';
                    scope.bodyClass = accordionCtrl.bodyClass ? accordionCtrl.bodyClass : '';

                    // 当前手风琴条目面板展开时，且closeOthers设置为true，则关闭其他面板
                    scope.$watch('open', function (value) {
                        if (value) {
                            accordionCtrl.closeOthers(scope);
                        }
                    });

                    // clickToggle标识：用户点击头部时，是否自动实现面板的状态切换
                    var clickToggle = angular.isDefined(attrs.clickToggle)
                        ? scope.$eval(attrs.clickToggle) : accordionConfig.clickToggle;
                    scope.toggleOpen = function () {
                        // 当前手风琴条目可用，且clickToggle为true，则自动实现面板的状态切换
                        if (!scope.disable && clickToggle) {
                            scope.open = !scope.open;
                        }
                        // 触发headClick回调
                        if (typeof scope.headClick() === 'function') {
                            scope.headClick()(scope.open);
                        }
                    };

                    // 当前面板销毁时，自动删除item
                    scope.$on('$destroy', function () {
                        accordionCtrl.removeItem(scope);
                    });
                }
            };
        }

        // 属于tiAccordionItem的子指令，用来设置accordion的head
        module.directive('tiAccordionHead', function () {
            return {
                transclude: true,
                template: '',
                replace: true,
                restrict: 'E',
                require: '^tiAccordionItem',
                link: function (scope, element, attrs, accordionItemCtrl, transclude) {
                    accordionItemCtrl.setHead(transclude(scope, angular.noop));
                }
            };
        });

        // 监听head内容变化，并将head内容放置到合适位置
        module.directive('tiAccordionTransclude', function () {
            return {
                require: '^tiAccordionItem',
                link: function (scope, element, attrs, controller) {
                    scope.$watch(function () {
                        return controller[attrs.tiAccordionTransclude];
                    }, function (heading) {
                        if (heading) {
                            var elem = $(element.find('[ti-accordion-header]')[0]);
                            elem.html('');
                            elem.append(heading);
                        }
                    });
                }
            };
        });

        return module.name;
    }
);


/**
 * @description
 * AngularJS version of the button directive.
 * 定义ti-button指令,最终返回module名
 */

define('components/button/button',["components/module"],
    function(module) {
        'use strict';
        module.directive('tiButton', tiButton);

        function tiButton() {
            var directive = {
                restrict: 'A',
                link: function(scope, $element, attrs){
                    // autofocus功能实现(IE9下兼容性处理)
                    var utils = window.tiny.utils;
                    if($element.attr("autofocus") !== undefined && (utils.browser.ie && utils.browser.version < 10)) {
                        $element[0].focus();
                    }
                }
            };
            return directive;
        }
        return module.name;
    }
);
/**
 * @description
 * AngularJS version of the checkbox directive.
 * 定义ty-checkbox指令,最终返回module名
 */

define('components/checkbox/checkbox',['components/module'],
    function (module) {
        'use strict';

        module.directive('tiCheckbox', tiCheckbox);

        tiCheckbox.$inject = ['$parse'];
        function tiCheckbox($parse) {
            var directive = {
                restrict: 'A',
                priority: 598, // 不能超过ng-if的优先级(600)和tiCheckGroup的优先级(599)
                require: '?ngModel', // 使用AngularJS ngModel情况下，需要调用ngModelCtrl API
                link: link
            };
            return directive;

            function link(scope, $element, attrs, ngModelCtrl) {
                // 获取和设置input[type=checkbox]元素的id属性
                var checkboxId = $element.attr('id');
                if (!checkboxId) {
                    checkboxId = _.uniqueId('ti_checkbox_');
                    $element.attr('id', checkboxId);
                }

                // checkbox-skin用来覆盖默认的checkbox显示，
                // checkbox-label用来覆显示checkbox的label，
                // label标签+for在Firefox focus不生效，因此使用span标签
                var checkboxTpl =
                    "<label class='ti-checkbox' for='<%= id %>'>" +
                        "<span class='ti-checkbox-skin ti-icon ti-icon-checkmark' for='<%= id %>'></span>" +
                        "<label class='ti-checkbox-label' for='<%= id %>'></label>" +
                    '</label>';
                var checkboxDOM = _.template(checkboxTpl)({ id: checkboxId });
                $element.after(checkboxDOM);
                $element.attr('tabindex', '-1');// 取消input元素的tab聚焦行为(input 可聚焦情况下，tab键切换时会聚焦该元素)

                var $tiCheckbox = $element.next();
                // 业务数据变化 =》label的显示变化
                scope.$watch($parse(attrs.tiCheckbox), function (newValue) {
                    var $label = $tiCheckbox.find('.ti-checkbox-label');
                    if (!_.isUndefined(newValue)) { // if value is defined
                        $label.html(newValue);
                    } else {
                        $label.html('');
                    }
                });

                var $checkboxSkin = $tiCheckbox.find('.ti-checkbox-skin');
                // 点选元素后，聚集到对应的checkbox-skin
                $element.on('click', function () {
                    $checkboxSkin.focus();
                });

                // 灰化状态下，元素可聚焦行为处理
                scope.$watch(function () {
                    return $element.attr('disabled');
                }, function (newValue) {
                    if (newValue) {
                        $checkboxSkin.removeAttr('tabindex');// 灰化状态下，设置tabindex为-1,点击label仍会聚焦，因此此处禁用tabindex
                    } else {
                        $checkboxSkin.attr('tabindex', '0');
                    }
                });

                // 快捷键的处理(Enter和Space)：考虑到交互的友好性及与原生的一致性，
                // 在keyup中做相应的事件处理(keydown和keypress会存在一次点击，多次触发的情况);
                // 此外，需要阻止浏览器默认事件（空格键会触发页面滚动条滚到底部的行为，
                // 默认事件的阻止需要在keyup之前，因此此处在keydown中阻止）
                $checkboxSkin.on('keydown', function (event) {
                    if ($element.attr('disabled')) {
                        return;
                    }
                    var keyCode = event.which || event.keyCode;
                    if ((keyCode === 13) || (keyCode === 108) || (keyCode === 32)) {
                        event.preventDefault();
                    }
                });

                $checkboxSkin.on('keyup', function (event) {
                    if ($element.attr('disabled')) {
                        return;
                    }
                    var keyCode = event.which || event.keyCode;
                    if ((keyCode === 13) || (keyCode === 108) || (keyCode === 32)) {
                        $element[0].checked = !$element[0].checked;// 设置元素的选中状态
                        if (ngModelCtrl) { // 更新Angular指令中的模型值
                            ngModelCtrl.$setViewValue($element[0].checked);
                        }
                        $element.trigger('change');// 触发原生checkbox的change事件，确保change事件生效
                    }
                });
            }
        }
        return module.name;
    }
);


/**
 * @description
 * AngularJS version of the checkbox directive.
 * 定义ty-checkbox指令,最终返回module名
 */

define('components/collapse/collapse',['components/module'],
    function (module) {
        'use strict';
        module.directive('tiCollapse', tiCollapse);

        tiCollapse.$inject = ['$parse', '$injector', '$animate'];
        function tiCollapse($parse, $injector, $animate) {
            return {
                link: function (scope, element, attrs) {
                    var fromCss = {};
                    var toCss = {};

                    init(); // 处理默认的关闭/打开状态

                    // 处理动态设置的关闭/打开状态
                    scope.$watch(attrs.tiCollapse, function (willCollapse, hasCollapsed) {
                        // 初始设置不作处理
                        if (willCollapse === hasCollapsed) {
                            return;
                        }
                        if (willCollapse) {
                            collapse(); // 关闭
                        }
                        else {
                            expand(); // 展开
                        }
                    });

                    function init() {
                        fromCss = {
                            height: ''
                        };
                        toCss = {
                            height: '0'
                        };
                        // 根据开发者初始化时设置的面板打开/关闭状态，对面板设置样式
                        if (!scope.$eval(attrs.tiCollapse)) { // 如果初始化设置不关闭面板
                            element.addClass('ti-in')
                                .addClass('ti-collapse')
                                .css(fromCss);
                        }
                        else {
                            element.addClass('ti-collapse')
                                .css(toCss);
                        }
                    }

                    function getScrollFromElement(element) {
                        return {height: element.scrollHeight + 'px'};
                    }

                    function expand() {
                        // 删除关闭样式，添加过渡(transition)样式
                        element.removeClass('ti-collapse')
                            .addClass('ti-collapsing');
                        // 动画处理
                        $animate.addClass(element, 'ti-in', {
                            css: {
                                overflow: 'hidden'
                            },
                            to: getScrollFromElement(element[0])
                        }).then(expandDone);
                    }

                    function expandDone() {
                        element.removeClass('ti-collapsing')
                            .addClass('ti-collapse')
                            .css(fromCss);
                    }

                    function collapse() {
                        element
                            // 在添加collapsing样式类之前进行高度设置，避免动画从高度0开始（collapsing中有设置）
                            .css(getScrollFromElement(element[0]))
                            // 临时删除collapse样式，是为了避免动画跳转到collapsed状态
                            .removeClass('ti-collapse')
                            .addClass('ti-collapsing');

                        $animate.removeClass(element, 'ti-in', {
                            to: toCss
                        }).then(collapseDone);
                    }

                    function collapseDone() {
                        element.css(toCss);
                        element.removeClass('ti-collapsing')
                            .addClass('ti-collapse');
                    }
                }
            };
        }
        return module.name;
    }
);

/**
 * @description
 * AngularJS version of the formField directive.
 * 定义ti-formfield指令,最终返回module名
 */

define('components/formfield/formfield',["components/module"],
    function (module) {
        'use strict';

        module.constant('tiFormConst', {

            // 每一个ti-item占4个td
            // 第一个td用来显示“*”，第二个td用来显示label，
            // 第三个td用来显示content, 第四个td是item间距
            tdNumPerItem: 4,

            // item之间的默认间距，适用于多列情况
            colsGap: "70px",

            // ti-btn-item的水平对齐方式
            horizontalAlignOpts: {
                "required": "required", // 与第一个td水平对齐（第一个td用来显示“*”）
                "label": "label",       // 与第二个td水平对齐（第二个td用来显示label）
                "content": "content"   // 与第三个td水平对齐（第三个td用来显示content）
            },

            // 表单内容的垂直对齐方式
            verticalAlign: "middle"

        });


        module.directive('tiFormfield', tiFormField);
        function tiFormField() {
            return {
                restrict: 'E',
                transclude: true,
                scope: true,
                replace: true,
                controller: tiFormFieldController,
                templateUrl: '/tiny-components/src/components/formfield/formfield.html',
                link: function (scope, element, attrs) {
                    // 删除存放ti-item的废弃标签
                    setTimeout(function(){
                        element.find("#" + scope.fieldId).remove();
                    }, 0);
                }
            };
        }

        tiFormFieldController.$inject = ["$scope", "$attrs", "tiFormConst"];
        function tiFormFieldController($scope, $attrs, tiFormConst) {
            var fieldCtrl = this;
            // ti-item数据列表
            $scope.items = [];
            // 根据cols对ti-item列表分组后的数据
            $scope.groupedItems = [];
            // btn-item数据列表
            $scope.btnItems = [];

            var fieldCols = $scope.$eval($attrs.cols);
            setColsNumber($scope, fieldCols);
            setColsGap($scope, fieldCols, tiFormConst.colsGap);

            // 统一设置表单内容的垂直对齐方式
            setFieldVerticalAlign($scope, $scope.$eval($attrs.verticalAlign), tiFormConst);

            // 用来标识field唯一性的id
            setFieldId($scope);

            fieldCtrl.addCntItem = function addCntItem(item) {
                // 设置某一item的垂直对齐方式
                setItemVerticalAlign(item, item.verticalAlign, tiFormConst);
                // item间距
                item.colsGap = $scope.colsGap;

                $scope.items.push(item);
                $scope.groupedItems = chunkArray($scope.items, $scope.colsNumber);
            };

            fieldCtrl.addBtnItem = function addBtnItem(item) {
                setItemVerticalAlign(item, item.verticalAlign, tiFormConst);
                setHorizontalAlign(item, $scope.colsNumber, tiFormConst);
                $scope.btnItems.push(item);
            };
        }
        function chunkArray(array, size) {
            var length = array ? array.length : 0;
            if (!length || size < 1) {
                return [];
            }
            var index = 0,
                resIndex = -1,
                result = new Array(Math.ceil(length / size));
            while (index < length) {
                result[++resIndex] = sliceArray(array, index, (index += size));
            }
            return result;
            /**
             * @param {Array} array The array to slice.
             * @param {number} [start=0] The start position.
             * @param {number} [end=array.length] The end position.
             * @returns {Array} Returns the slice of `array`.
             */
            function sliceArray(array, start, end) {
                var index = -1,
                    length = array.length;
                if (start < 0) {
                    start = -start > length ? 0 : (length + start);
                }
                end = end > length ? length : end;
                if (end < 0) {
                    end += length;
                }
                length = start > end ? 0 : ((end - start) >>> 0);
                start >>>= 0;
                var result = Array(length);
                while (++index < length) {
                    result[index] = array[index + start];
                }
                return result;
            }
        }

        function setColsNumber($scope, fieldCols) {
            var colsNumber = parseInt(fieldCols && fieldCols.number);
            $scope.colsNumber = (_.isNaN(colsNumber) || colsNumber < 1) ? 1 : colsNumber;
        }

        function setColsGap($scope, fieldCols, defaultGap) {

            var customGap = fieldCols && fieldCols.gap;
            var colsNumber = $scope.colsNumber;

            // 初始化item之间的默认间距
            $scope.colsGap = [];
            for (var i = 0; i < colsNumber; i++) {
                // 同一行：两个item之间设置gap，最后一个item的gap为0
                if (i < colsNumber - 1) {
                    $scope.colsGap.push({ width: defaultGap });
                } else {
                    $scope.colsGap.push({ width: "0px" });
                }
            }

            // 用户对各列间距的合法设置
            if (_.isArray(customGap)) {
                var gapLen = _.min([customGap.length, colsNumber]);
                for (var j = 0; j < gapLen; j++) {
                    if (customGap[j] !== "") {
                        $scope.colsGap[j] = { width: customGap[j] };
                    }
                }
            }
        }

        function setHorizontalAlign(item, colsNumber, tiFormConst) {

            var tdNum = tiFormConst.tdNumPerItem;
            var alignOpts = item.alignOpts = tiFormConst.horizontalAlignOpts;

            // 用户未设置对齐方式，则按照AgileUI规范处理单列和多列的对齐方式
            if (!_.has(alignOpts, item.horizontalAlign)) {
                item.horizontalAlign = colsNumber === 1 ? alignOpts.content : alignOpts.label;
            }

            // 根据对齐方式，设置按钮所在的单元格横跨td数量
            switch (item.horizontalAlign) {
                case alignOpts.required:
                    // 与显示*的td对齐
                    item.btnColspan = tdNum * colsNumber;
                    break;
                case alignOpts.label:
                    // 与label对齐时，保留第一个td（用来显示*）
                    item.btnColspan = tdNum * colsNumber - 1;
                    break;
                default:
                    // 与content对齐时，保留前两个td（分别用来显示*和label）
                    item.btnColspan = tdNum * colsNumber - 2;
            }
        }

        function setFieldVerticalAlign(item, align, tiFormConst) {
            var verticalAlign = angular.isDefined(align) ? align : tiFormConst.verticalAlign;
            item.verticalAlign = {"vertical-align": verticalAlign};
        }

        function setItemVerticalAlign(item, align, tiFormConst) {
            if (!angular.isDefined(align)) {
                return;
            }
            item.verticalAlign = {"vertical-align": align};
        }

        function setFieldId($scope) {
            $scope.fieldId = 'ti-field-' + $scope.$id + '-' + _.uniqueId();
        }


        module.directive('tiItem', tiItem);
        function tiItem() {
            return {
                require: '^tiFormfield',
                restrict: 'E',
                replace: true,
                template: '',
                transclude: true,
                scope: {
                    label: '=?',
                    required: '=?',
                    verticalAlign: '=?'
                },
                controller: tiItemController,
                link: function (scope, elm, attrs, fieldCtrl, transclude) {
                    scope.setHasLabel(scope, true); // 初始化时默认item存在label

                    fieldCtrl.addCntItem(scope);
                    scope.$transcludeFn = transclude;
                }
            };
        }

        tiItemController.$inject = ["$scope"];
        function tiItemController($scope) {
            /**
             * 根据item是否包含label,设置content横跨td数
             * @param {Angular Scope} item 每一个ti-item指令对应的scope对象
             * @param {Boolean} hasLabel 标识否有label
             */
            $scope.setHasLabel = function(item, hasLabel) {
                if (hasLabel) { // 有label时，content和label各占一个td
                    item.hasLabel = true;
                    item.cntColspan = 1;
                } else { // 没有label时，content横跨两个td（包含label和content对应的td）
                    item.hasLabel = false;
                    item.cntColspan = 2;
                }
            };
        }


        module.directive('tiBtnItem', tiBtnItem);
        function tiBtnItem() {
            return {
                require: '^tiFormfield',
                restrict: 'E',
                replace: true,
                scope: {
                    horizontalAlign: "=?",
                    verticalAlign: "=?"
                },
                template: '',
                transclude: true,
                link: function (scope, elm, attrs, fieldCtrl, transclude) {
                    fieldCtrl.addBtnItem(scope);
                    scope.$transcludeFn = transclude;
                }
            };
        }

        module.directive('itemLabelTransclude', function () {
            return {
                restrict: 'A',
                require: '^tiFormfield',
                link: function (scope, elm, attrs) {
                    var item = scope.$eval(attrs.itemLabelTransclude);
                    item.$watch('label', function updateLabel(label) {
                        if (_.isUndefined(label)) {
                            item.setHasLabel(item, false);
                        } else {
                            item.setHasLabel(item, true);

                            elm.html('');
                            elm.append(label);
                        }
                    });
                }
            };
        });


        module.directive('itemContentTransclude', function () {
            return {
                restrict: 'A',
                require: '^tiFormfield',
                link: function (scope, elm, attrs) {
                    var item = scope.$eval(attrs.itemContentTransclude);
                    item.$transcludeFn(item.$parent, function (contents) {
                        // 更新item的label
                        var $itemLabel = contents.filter("ti-item-label");
                        if ($itemLabel.length > 0) {
                            item.label = $itemLabel;
                        }
                        
                        // 更新item的content
                        // 注：当item中有ng-repeat等未被解析的元素时,此时会以注释形式存在,使用not方法及jquery选择器时,会把注释性元素删除掉，此处为了保留使用如下方式
                        item.content = contents.filter(function(){
                            return $itemLabel[0] !== this;
                        });
                        
                        elm.html('');
                        elm.append(item.content);
                    });
                }
            };
        });


        module.directive('fieldBtnTransclude', function () {
            return {
                restrict: 'A',
                require: '^tiFormfield',
                link: function (scope, elm, attrs) {
                    var item = scope.$eval(attrs.fieldBtnTransclude);
                    item.$transcludeFn(item.$parent, function (contents) {
                        elm.html("");
                        elm.append(contents);
                    });
                }
            };
        });


        return module.name;
    });




/**
 * @description
 * AngularJS version of the checkbox directive.
 * 定义ty-checkbox指令,最终返回module名
 */

define('components/radio/radio',['components/module'],
    function (module) {
        'use strict';

        module.directive('tiRadio', tiRadio);

        tiRadio.$inject = ['$parse'];
        function tiRadio($parse) {
            var directive = {
                restrict: 'A',
                priority: 598, // 不能超过ng-repeat的优先级（1000）
                require: '?ngModel',
                link: link
            };
            return directive;

            function link(scope, $element, attrs, ngModelCtrl) {
                // 获取和设置input[type=radio]元素的id属性
                var radioId = $element.attr('id');
                if (!radioId) {
                    radioId = _.uniqueId('ti_radio_');
                    $element.attr('id', radioId);
                }
                // radio-skin用来覆盖默认的radio显示，
                // radio-label用来覆显示radio的label，
                // for属性值与input[type=radio]元素id保持一致，可以关联点击事件
                // label标签+for在Firefox focus不生效，因此使用span标签
                var radioTpl =
                    "<label class='ti-radio' for='<%= id %>'>" +
                        "<span class='ti-radio-skin' for='<%= id %>'></span>" +
                        "<label class='ti-radio-label' for='<%= id %>'></label>" +
                    '</label>';
                var radioDOM = _.template(radioTpl)({ id: radioId });
                $element.after(radioDOM);
                $element.attr('tabindex', '-1');// 设置原有元素不可通过tab键获取焦点

                var $tiRadio = $element.next();
                // 业务数据变化 =》label的显示变化
                scope.$watch($parse(attrs.tiRadio), function (newValue) {
                    var $label = $tiRadio.find('.ti-radio-label');
                    if (!_.isUndefined(newValue)) { // if value is defined
                        $label.html(newValue);
                    } else {
                        $label.html('');
                    }
                });

                var $tiRadioSkin = $tiRadio.find('.ti-radio-skin');
                // 点选元素后，聚集到对应的radio-skin
                $element.on('click', function () {
                    $tiRadioSkin.focus();
                });

                // 灰化状态下，元素可聚焦行为处理
                scope.$watch(function () {
                    return $element.attr('disabled');
                }, function (newValue) {
                    if (newValue) {
                        $tiRadioSkin.removeAttr('tabindex');
                    } else {
                        $tiRadioSkin.attr('tabindex', '0');
                    }
                });

                // 快捷键的处理(Enter和Space)：考虑到交互的友好性及与原生的一致性，
                // 在keyup中做相应的事件处理(keydown和keypress会存在一次点击，多次触发的情况);
                // 此外，需要阻止浏览器默认事件（空格键会触发页面滚动条滚到底部的行为，
                // 默认事件的阻止需要在keyup之前，因此此处在keydown中阻止）
                var isCheckKeyCode = function (keyCode) {
                    return (keyCode === 13) || (keyCode === 108) || (keyCode === 32);
                };

                $tiRadioSkin.on('keydown', function (event) {
                    if ($element.attr('disabled')) {
                        return;
                    }
                    var keyCode = event.which || event.keyCode;
                    if (isCheckKeyCode(keyCode)) {
                        event.preventDefault();
                    }
                });

                $tiRadioSkin.on('keyup', function (event) {
                    if ($element.attr('disabled')) {
                        return;
                    }
                    var keyCode = event.which || event.keyCode;
                    if (isCheckKeyCode(keyCode)) {
                        if (!$element[0].checked) {
                            $element[0].checked = true;// 设置元素的选中状态
                            $element.trigger('change');// 触发原生radio的change事件
                        }
                        if (ngModelCtrl) { // 更新Angular指令中的模型值
                            ngModelCtrl.$setViewValue(attrs.value);
                        }
                    }
                });
            }
        }
        return module.name;
    }
);

/**
 * Tiny2.0版本Tooltip组件
 */
define('components/tip/tip',['components/module'], function(module) {
    'use strict';

    /**
     * 配置Tooltip的常量参数
     */
    var CONSTANT_CONFIG = {
        WIDTH: '276px', // Tooltip的默认换行宽度
        EVENT_MAP: {
            mouseenter: 'mouseleave',
            focus: 'blur',
            click: 'click',
            none: 'none' // 若Tooltip的显示、隐藏需要自己控制，则事件定义为"none"
        },
        ARROW_HEIGHT: 9// 主要使用场景为参与计算，因此直接使用数值 TODO: 提供修改功能
    };
/************************************tiTipService服务定义****************************************/
    module.provider('tiTipService', tiTipService);
    function tiTipService() {
        var defaultConfig = {
            triggerEvent: 'mouseenter',
            show: false,
            position: 'top',
            content: 'Welcome to use Tiny tooltip.'
        };

        /**
         * 配置整个APP中Tooltip的默认设置
         * @param 用户自定义配置参数集
         */
        this.setDefaults = function(options) {
            angular.extend(defaultConfig, options);
        };

        /**
         * 获取当前默认的Tooltip配置参数集
         * @returns {{triggerEvent: string, show: boolean, position: string, content: string}}
         */
        this.getDefaults = function() {
            return defaultConfig;
        };

        /**
         * 为某一element配置Tooltip
         * @param element[type: jquery Obj]: 被提示元素的DOM对象
         * @param options[type: Obj]: tooltip的配置参数集
         */
         // TODO: element放到判断中
        this.createTip = function($element, options) {
            if (angular.isUndefined($element) || !canCreateTooltip($element)) {
                return;
            }

            // 创建某一元素的Tooltip，配置相关参数，在mouseenter、focus或click事件触发时显示Tooltip
            var tooltipModel = angular.extend({}, defaultConfig, options);
            addBehaviorByService($element, tooltipModel);

            // options为需要更新的参数集
            function show(options) {
                if (angular.isUndefined($element) || $element.length < 1) {
                    return;
                }

                if ($.isPlainObject(options)) {
                    angular.extend($element[0].tiTip.tooltipModel, options); // 更新Tooltip的配置
                }

                showTooltipByService($element, $element[0].tiTip.tooltipModel);
            }

            function hide() {
                if (angular.isUndefined($element) || angular.isUndefined($element[0].tiTip) || $element.tiTip === null) {
                    return;
                }
                $element[0].tiTip.hideTooltip($element)();
            }

            var tipInstance = {
                show: show,
                hide: hide
            };
            return tipInstance;
        };

        // 是否可以在$element上创建Tooltip
        function canCreateTooltip($element) {
            if ($element.length < 1 || $.isPlainObject($element[0].tiTip)) {
                return false;
            }
            return true;
        }

        // 根据元素及内容，设置是否出现Tooltip
        this.setTooltip = function($element, tooltipConfig) {
            if (angular.isUndefined($element) || $element.length < 1) {
                return;
            }

            //this.hide($element); // 先隐藏之前的Tooltip
            $element.removeAttr('title'); // 暂时先使用原生title，后续提供跟踪样式Tip

            // 计算元素的当前显示宽度和完整显示时需要的宽度
            var displayWidth = parseFloat(getComputedStyle($element[0], null).width);
            var $tempNode = $element.clone();
            $tempNode.css({
                "overflow" : "visible",
                "position" : "absolute",
                "visibility" : "hidden"
            });
            $('body').append($tempNode);
            var realWidth = parseFloat(getComputedStyle($tempNode[0], null).width);
            $tempNode.remove();

            // 如果完整显示时的宽度大于当前显示宽度，则自动设置提示信息
            if (realWidth > displayWidth) {
                //this.createTooltip($element, tooltipConfig);
                //this.show($element);
                $element.attr('title', tooltipConfig.content); // 暂时先使用原生title，后续提供跟踪样式Tip
            }
        };

        // 对外暴露的方法
        this.$get = function() {
            return {
                getDefaults: this.getDefaults,
                setDefaults: this.setDefaults,
                createTip: this.createTip,
                setTooltip: this.setTooltip
            };
        };

        // TODO:修改事件传播

        /**
         * 添加Tooltip相关的事件行为 TODO: 修改为config
         * @param element[type: jquery Obj]: 被提示元素
         * @param tooltipModel[type: Obj]: tooltip的配置参数集
         */
        function addBehaviorByService($element, tooltipModel) {

            initConfig($element, tooltipModel); // 设置$element上的默认参数

            addTriggerEvt($element, tooltipModel); // 添加控制tooltip显示与隐藏的事件

            // 仅隐藏Tooltip，内存中仍保存相关数据
            $(document).on('mousewheel.tiTip DOMMouseScroll.tiTip', $element[0].tiTip.hideTooltip($element));
            $(window).on('resize.tiTip', $element[0].tiTip.hideTooltip($element));

            // 当$element销毁时，彻底销毁Tooltip
            $element.on('$destroy', function() {
                if ($element[0].tiTip === null) {
                    return;
                }
                $(document).off('mousewheel.tiTip DOMMouseScroll.tiTip', $element[0].tiTip.hideTooltip($element));
                $(window).off('resize.tiTip', $element[0].tiTip.hideTooltip($element));
                $element[0].tiTip.tooltipDom.remove();
                $element[0].tiTip = null;
            });

            // TODO: 定义回调函数，从DOM中删除

            // 当元素隐藏时，Tooltip也应该自动消失
            $element.scope().$on('elementHide', function() {
                $element[0].tiTip.hideTooltip($element)();
            });
        }

        /**
         * 设置element上与Tooltip相关的默认值
         * @param element[type: jquery Obj]: 被提示元素
         * @param tooltipModel[type: Obj]: tooltip的配置参数集
         */
        function initConfig($element, tooltipModel) {
            $element[0].tiTip = {
                tooltipModel: tooltipModel,
                hasShown: false, // 标识Tooltip的显示、隐藏状态 TODO: isShown
                isPrevented: false, // mouseenter/mouseleave时，在鼠标移动到Tooltip上时，要阻止tooltip消失
                hideTooltip: function($element) { // TODO:hide
                    // tempEffect仅用于内部隐藏时清除duration，否则调用服务重复调用服务show方法时会导致Tooltip消失
                    return function (tempEffect) {
                        // TODO:VAR TEMP = $element[0].tiTip;
                        if (angular.isUndefined($element[0].tiTip) || $element[0].tiTip === null || !$element[0].tiTip.hasShown) {
                            return;
                        }

                        // 设置Tooltip消失时的动画效果
                        var hideEffect = {
                            duration: 0, // 建议控制在300ms以内
                            complete: function() {
                                $element[0].tiTip.tooltipDom.remove();
                                $element[0].tiTip.hasShown = false;
                            }
                        };
                        if (angular.isUndefined(tempEffect)) {
                            angular.extend(hideEffect, $element[0].tiTip.tooltipModel.hideEffect);
                        } else {
                            angular.extend(hideEffect, tempEffect); // 内部使用时，临时清除duration
                        }
                        $element[0].tiTip.tooltipDom.hide(hideEffect);
                    }
                }
            }
        }

        // 在$element上添加控制Tooltip显示与隐藏的事件 TODO:修改为case语句
        function addTriggerEvt($element, tooltipModel) {
            var triggerEvt = getTriggerEvt(tooltipModel, CONSTANT_CONFIG.EVENT_MAP);
            if (triggerEvt.showEvt === 'click') {
                $element.on('click', function() {
                    if ($element[0].tiTip.hasShown === true) {
                        $element[0].tiTip.hideTooltip($element)();
                    } else {
                        // TODO:代码一致性
                        showTooltipByService($element, tooltipModel);
                    }
                });
            } else {
                $element.on(triggerEvt.showEvt, function() {
                    showTooltipByService($element, tooltipModel);
                });

                $element.on(triggerEvt.hideEvt, function() {
                    // mouseenter/mouseleave时，在鼠标移动到Tooltip上时，要阻止tooltip消失
                    if (triggerEvt.hideEvt === 'mouseleave') {
                        setTimeout(function() {
                            if ($element[0].tiTip.isPrevented === false) {
                                $element[0].tiTip.hideTooltip($element)();
                            }
                        }, 0);
                    } else {
                        $element[0].tiTip.hideTooltip($element)();
                    }
                });
            }
        }

        function showTooltipByService($element, tooltipModel) {
            // 若当前Tooltip未定义或内容为空，则不显示 TODO:定义变量，封装函数
            if (angular.isUndefined($element[0].tiTip)
                || $element[0].tiTip === null) {
                return;
            }

            $element[0].tiTip.hideTooltip($element)({duration: 0});

            // 当内容为空时，仅使tip消失
            if (tooltipModel.content === '') {
                return;
            }

            var $tooltipElem = generateTooltipElem($element, tooltipModel);
            var layoutParam = getLayoutParam($element, $tooltipElem, tooltipModel);
            setTooltipPosition($tooltipElem, layoutParam);

            // 设置Tooltip显示时的动画效果
            var showEffect = {
                duration: 0 // 建议控制在300ms以内
            };
            angular.extend(showEffect, tooltipModel.showEffect);
            $tooltipElem.show(showEffect);
            $element[0].tiTip.hasShown = true;
        }

        // 对position的合法性检查
        // 生成Tooltip的DOM，并处理mouseenter、mouseleave事件
        function generateTooltipElem($element, tooltipModel) {
            var $tooltipElem = $('<div class="ti-tooltip ti-tooltip-' + tooltipModel.position + '"></div>'); // TODO: XSS防护
            $tooltipElem.html(tooltipModel.content);
            $tooltipElem.addClass(tooltipModel.customClass);
            $element[0].tiTip.tooltipDom = $tooltipElem;

            // 当事件为mouseenter时，在鼠标移动到Tooltip上时，要阻止tooltip消失
            if (tooltipModel.triggerEvent === 'mouseenter') {
                $tooltipElem.on('mouseenter', function() {
                    $element[0].tiTip.isPrevented = true;
                });
                $tooltipElem.on('mouseleave', function() {
                    $element[0].tiTip.hideTooltip($element)();
                    $element[0].tiTip.isPrevented = false;
                });
            }

            return $tooltipElem;
        }
    }

/************************************tiTip指令定义****************************************/
    module.directive('tiTip', ['tiTipService', function(tiTipService) {
        return {
            restrict: 'A',
            replace: false,
            scope: {
                tooltipModel: '=tiTip'
            },
            link: link
        };

        function link(scope, $element) {
            var tooltipModel = angular.extend({}, tiTipService.getDefaults(), scope.tooltipModel); // 参数合并
            scope.isPrevented = false; // 鼠标移出元素时是否阻止tooltip消失

            addBehaviorByDirective($element, tooltipModel, scope);

            // 当数据发生变化时一律重绘 TODO:content参数变化时单独处理
            scope.$watchCollection('tooltipModel', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                hideTooltipByDirective(scope, {duration: 0});
                if (newValue.show === true && newValue.content !== '') {
                    var newOptions = angular.extend({}, tiTipService.getDefaults(), newValue);
                    showTooltipByDirective($element, newOptions, scope);
                }
            });
        }

        // 指令方式生成时，添加事件
        function addBehaviorByDirective($element, tooltipModel, scope) {
            // 添加控制tooltip显示与隐藏的事件
            var triggerEvt = getTriggerEvt(tooltipModel, CONSTANT_CONFIG.EVENT_MAP); // 获取触发事件
            if (triggerEvt.showEvt === 'click') {
                $element.on('click', function() {
                    scope.tooltipModel.show = !scope.tooltipModel.show;
                    scope.$evalAsync();
                });
            } else {
                // 使得Tooltip显示的事件，如“focus”，“mouseenter”
                $element.on(triggerEvt.showEvt, function() {
                    scope.tooltipModel.show = true;
                    scope.$evalAsync();
                });

                // 使得Tooltip消失的事件，如“blur”，“mouseleave”
                $element.on(triggerEvt.hideEvt, function() {
                    // 当事件对为mouseenter/mouseleave时，在鼠标移动到Tooltip上时，要阻止tooltip消失
                    if (triggerEvt.hideEvt === 'mouseleave') {
                        setTimeout(function() {
                            if (scope.isPrevented === false) {
                                scope.tooltipModel.show = false;
                                scope.$evalAsync();
                            }
                        }, 0);
                    } else {
                        scope.tooltipModel.show = false;
                        scope.$evalAsync();
                    }
                });
            }

            // 当$element销毁时，销毁Tooltip
            $element.on('$destroy', scope.hideTooltip);

            // 当元素隐藏时，销毁Tooltip
            $element.scope().$on('elementHide', scope.hideTooltip);
        }

        // 指令方式生成时，显示Tooltip
        function showTooltipByDirective($element, tooltipModel, scope) {
            // 生成Tooltip的DOM
            var $tooltipElem = $('<div class="ti-tooltip ti-tooltip-' + tooltipModel.position + '"></div>'); // TODO: XSS防护
            $tooltipElem.html(tooltipModel.content);
            $tooltipElem.addClass(tooltipModel.customClass);
            scope.$tooltipElem = $tooltipElem;

            addHideEvt(scope, $tooltipElem, tooltipModel); // 添加需要隐藏Tooltip的事件

            var layoutParam = getLayoutParam($element, $tooltipElem, tooltipModel); // 获取Tooltip的显示参数
            setTooltipPosition($tooltipElem, layoutParam); // 设置Tooltip的显示样式

            // 设置Tooltip显示时的动画效果
            var showEffect = {
                duration: 0 // 建议控制在300ms以内
            };
            angular.extend(showEffect, scope.tooltipModel.showEffect);
            $tooltipElem.show(showEffect);
        }

        function addHideEvt(scope, $tooltipElem, tooltipModel) {
            // 当事件为mouseenter时，在鼠标移动到Tooltip上时，要阻止tooltip消失
            if (tooltipModel.triggerEvent === 'mouseenter') {
                $tooltipElem.on('mouseenter', function() {
                    scope.isPrevented = true;
                });
                $tooltipElem.on('mouseleave', function() {
                    scope.tooltipModel.show = false;
                    scope.isPrevented = false;
                    scope.$evalAsync();
                });
            }

            scope.hideTooltip = function () {
                scope.tooltipModel.show = false;
                scope.$evalAsync();
            };

            // 任何可能导致元素位置发生变化的交互都需要Tooltip消失
            $(document).on('mousewheel.tiTip DOMMouseScroll.tiTip', scope.hideTooltip);
            $(window).on('resize.tiTip', scope.hideTooltip);
        }

        // 指令方式销毁Tooltip
        function hideTooltipByDirective(scope, tempEffect) {
            if (!scope.$tooltipElem) {
                return;
            }
            $(document).off('mousewheel.tiTip DOMMouseScroll.tiTip', scope.hideTooltip);
            $(window).off('resize.tiTip', scope.hideTooltip);

            // 设置Tooltip消失时的动画效果
            var hideEffect = {
                duration: 0, // 建议控制在300ms以内
                complete: function() {
                    if (scope.$tooltipElem === null) {
                      return;
                    }
                    scope.$tooltipElem.remove();
                    scope.$tooltipElem = null;
                }
            };
            if (angular.isUndefined(tempEffect)) {
                angular.extend(hideEffect, scope.tooltipModel.hideEffect);
            } else {
                angular.extend(hideEffect, tempEffect);
            }
            scope.$tooltipElem.hide(hideEffect);
        }

    }]);

/**************************以下为tiTip服务和指令共同调用的公共方法****************************/

    // 获取控制Tooltip显示、消失的事件对
    function getTriggerEvt(tooltipModel, eventMap) {
        return {
            showEvt: tooltipModel.triggerEvent,
            hideEvt: eventMap[tooltipModel.triggerEvent]
        }
    }

    // 当position: "top"时，计算Tooltip的显示参数
    function showTop($element, $tooltipElem, tooltipModel) {
        var layoutParam = getElementLayout($element); // 获取元素的布局参数

        // 通过临时DOM计算Tooltip的显示时的布局参数
        var $temp = $tooltipElem.clone();
        $temp.css({
            position: 'absolute',
            left: layoutParam.left + 'px'
        }).appendTo($('body')).show();

        var tempWidth = setTempTooltipWidth($temp, tooltipModel.maxWidth);
        var tooltipHeight = $temp[0].offsetHeight;
        var top = layoutParam.top - tooltipHeight - CONSTANT_CONFIG.ARROW_HEIGHT;
        var leftOffset = ($temp[0].offsetWidth - $element[0].offsetWidth) / 2;
        var left = layoutParam.left - leftOffset;
        $temp.remove();

        return {
            left: left,
            top: top,
            width: tempWidth
        }
    }

    // 当position: "top-left"时，计算Tooltip的显示参数
    function showTopLeft($element, $tooltipElem, tooltipModel) {
        var layoutParam = getElementLayout($element); // 获取元素的布局参数

        // 通过临时DOM计算Tooltip的显示时的布局参数
        var $temp = $tooltipElem.clone();
        $temp.css({
            position: 'absolute',
            left: layoutParam.left + 'px'
        }).appendTo($('body')).show();

        var tempWidth = setTempTooltipWidth($temp, tooltipModel.maxWidth);
        var tooltipHeight = $temp[0].offsetHeight;
        var top = layoutParam.top - tooltipHeight - CONSTANT_CONFIG.ARROW_HEIGHT;
        var left = layoutParam.left;
        $temp.remove();

        return {
            left: left,
            top: top,
            width: tempWidth
        }
    }

    // 当position: "top-right"时，计算Tooltip的显示参数
    function showTopRight($element, $tooltipElem, tooltipModel) {
        var layoutParam = getElementLayout($element); // 获取元素的布局参数

        // 通过临时DOM计算Tooltip的显示时的布局参数
        var $temp = $tooltipElem.clone();
        var right = document.documentElement.clientWidth - layoutParam.left - layoutParam.width + 'px';
        $temp.css({
            position: 'absolute',
            right: right
        }).appendTo($('body')).show();

        var tempWidth = setTempTooltipWidth($temp, tooltipModel.maxWidth); // 需要设置换行宽度
        var tooltipHeight = $temp[0].offsetHeight;
        var top = layoutParam.top - tooltipHeight - CONSTANT_CONFIG.ARROW_HEIGHT;
        $temp.remove();

        return {
            right: right,
            top: top,
            width: tempWidth
        }
    }

    // 当position: "bottom"时，计算Tooltip的显示参数
    function showBottom($element, $tooltipElem, tooltipModel) {
        var layoutParam = getElementLayout($element); // 获取元素的布局参数

        // 通过临时DOM计算Tooltip的显示时的布局参数
        var $temp = $tooltipElem.clone();
        $temp.css({
            position: 'absolute',
            left: layoutParam.left + 'px'
        }).appendTo($('body')).show();

        var tempWidth = setTempTooltipWidth($temp, tooltipModel.maxWidth);
        var top = layoutParam.top + layoutParam.height + CONSTANT_CONFIG.ARROW_HEIGHT;
        var leftOffset = ($temp[0].offsetWidth - $element[0].offsetWidth) / 2;
        var left = layoutParam.left - leftOffset;
        $temp.remove();

        return {
            left: left,
            top: top,
            width: tempWidth
        }
    }

    // 当position: "bottom-left"时，计算Tooltip的显示参数
    function showBottomLeft($element, $tooltipElem, tooltipModel) {
        var layoutParam = getElementLayout($element); // 获取元素的布局参数

        // 通过临时DOM计算Tooltip的显示时的布局参数
        var $temp = $tooltipElem.clone();
        $temp.css({
            position: 'absolute',
            left: layoutParam.left + 'px'
        }).appendTo($('body')).show();

        var tempWidth = setTempTooltipWidth($temp, tooltipModel.maxWidth);
        var top = layoutParam.top + layoutParam.height + CONSTANT_CONFIG.ARROW_HEIGHT;
        var left = layoutParam.left;
        $temp.remove();

        return {
            left: left,
            top: top,
            width: tempWidth
        }
    }

    // 当position: "bottom-right"时，计算Tooltip的显示参数
    function showBottomRight($element, $tooltipElem, tooltipModel) {
        var layoutParam = getElementLayout($element); // 获取元素的布局参数

        // 通过临时DOM计算Tooltip的显示时的布局参数
        var $temp = $tooltipElem.clone();
        var right = document.documentElement.clientWidth - layoutParam.left - layoutParam.width + 'px';
        $temp.css({
            position: 'absolute',
            right: right
        }).appendTo($('body')).show();

        var tempWidth = setTempTooltipWidth($temp, tooltipModel.maxWidth); // 需要设置换行宽度
        var top = layoutParam.top + layoutParam.height + CONSTANT_CONFIG.ARROW_HEIGHT;
        $temp.remove();

        return {
            right: right,
            top: top,
            width: tempWidth
        }
    }

    // 当position: "left"时，计算Tooltip的显示参数
    function showLeft($element, $tooltipElem, tooltipModel) {
        var layoutParam = getElementLayout($element); // 获取元素的布局参数

        // 通过临时DOM计算Tooltip的显示时的布局参数
        var $temp = $tooltipElem.clone();
        var right = document.documentElement.clientWidth - layoutParam.left + CONSTANT_CONFIG.ARROW_HEIGHT + 'px';
        $temp.css({
            position: 'absolute',
            right: right
        }).appendTo($('body')).show();

        var tempWidth = setTempTooltipWidth($temp, tooltipModel.maxWidth); // 需要设置换行宽度
        var topOffset = ($temp[0].offsetHeight - layoutParam.height) / 2;
        var top = layoutParam.top - topOffset;
        $temp.remove();

        return {
            right: right,
            top: top,
            width: tempWidth
        }
    }

    // 当position: "left-top"时，计算Tooltip的显示参数
    function showLeftTop($element, $tooltipElem, tooltipModel) {
        var layoutParam = getElementLayout($element); // 获取元素的布局参数

        // 通过临时DOM计算Tooltip的显示时的布局参数
        var $temp = $tooltipElem.clone();
        var right = document.documentElement.clientWidth - layoutParam.left + CONSTANT_CONFIG.ARROW_HEIGHT + 'px';
        $temp.css({
            position: 'absolute',
            right: right
        }).appendTo($('body')).show();

        var tempWidth = setTempTooltipWidth($temp, tooltipModel.maxWidth); // 需要设置换行宽度
        var top = layoutParam.top;
        $temp.remove();

        return {
            right: right,
            top: top,
            width: tempWidth
        }
    }

    // 当position: "left-bottom"时，计算Tooltip的显示参数
    function showLeftBottom($element, $tooltipElem, tooltipModel) {
        var layoutParam = getElementLayout($element); // 获取被提示元素的布局参数

        // 通过临时DOM计算Tooltip的显示时的布局参数
        var $temp = $tooltipElem.clone();
        var right = document.documentElement.clientWidth - layoutParam.left + CONSTANT_CONFIG.ARROW_HEIGHT + 'px';
        $temp.css({
            position: 'absolute',
            right: right
        }).appendTo($('body')).show();

        var tempWidth = setTempTooltipWidth($temp, tooltipModel.maxWidth); // 需要设置换行宽度
        var bottom = document.documentElement.clientHeight - layoutParam.top - layoutParam.height;
        $temp.remove();

        return {
            right: right,
            bottom: bottom,
            width: tempWidth
        }
    }

    // 当position: "right"时，计算Tooltip的显示参数
    function showRight($element, $tooltipElem, tooltipModel) {
        var layoutParam = getElementLayout($element); // 获取被提示元素的布局参数

        // 通过临时DOM计算Tooltip的显示时的布局参数
        var $temp = $tooltipElem.clone();
        var left = layoutParam.left + layoutParam.width + CONSTANT_CONFIG.ARROW_HEIGHT + 'px';
        $temp.css({
            position: 'absolute',
            left: left
        }).appendTo($('body')).show();

        var tempWidth = setTempTooltipWidth($temp, tooltipModel.maxWidth); // 需要设置换行宽度
        var topOffset = ($temp[0].offsetHeight - layoutParam.height) / 2;
        var top = layoutParam.top - topOffset;
        $temp.remove();

        return {
            left: left,
            top: top,
            width: tempWidth
        }
    }

    // 当position: "right-top"时，计算Tooltip的显示参数
    function showRightTop($element, $tooltipElem, tooltipModel) {
        var layoutParam = getElementLayout($element); // 获取被提示元素的布局参数

        // 通过临时DOM计算Tooltip的显示时的布局参数
        var $temp = $tooltipElem.clone();
        var left = layoutParam.left + layoutParam.width + CONSTANT_CONFIG.ARROW_HEIGHT + 'px';
        $temp.css({
            position: 'absolute',
            left: left
        }).appendTo($('body')).show();

        var tempWidth = setTempTooltipWidth($temp, tooltipModel.maxWidth); // 需要设置换行宽度
        var top = layoutParam.top;
        $temp.remove();

        return {
            left: left,
            top: top,
            width: tempWidth
        }
    }

    // 当position: "right-bottom"时，计算Tooltip的显示参数
    function showRightBottom($element, $tooltipElem, tooltipModel) {
        var layoutParam = getElementLayout($element); // 获取被提示元素的布局参数

        // 通过临时DOM计算Tooltip的显示时的布局参数
        var $temp = $tooltipElem.clone();
        var left = layoutParam.left + layoutParam.width + CONSTANT_CONFIG.ARROW_HEIGHT + 'px';
        $temp.css({
            position: 'absolute',
            left: left
        }).appendTo($('body')).show();

        var tempWidth = setTempTooltipWidth($temp, tooltipModel.maxWidth); // 需要设置换行宽度
        var bottom = document.documentElement.clientHeight - layoutParam.top - layoutParam.height;
        $temp.remove();

        return {
            left: left,
            bottom: bottom,
            width: tempWidth
        }
    }

    // 获取Tooltip的定位及宽度参数
    function getLayoutParam($element, $tooltipElem, tooltipModel) {
        var layoutParam = {};
        switch (tooltipModel.position) {
            case 'top':
                layoutParam = showTop($element, $tooltipElem, tooltipModel);
                break;
            case 'top-left':
                layoutParam = showTopLeft($element, $tooltipElem, tooltipModel);
                break;
            case 'top-right':
                layoutParam = showTopRight($element, $tooltipElem, tooltipModel);
                break;
            case 'bottom':
                layoutParam = showBottom($element, $tooltipElem, tooltipModel);
                break;
            case 'bottom-right':
                layoutParam = showBottomRight($element, $tooltipElem, tooltipModel);
                break;
            case 'bottom-left':
                layoutParam = showBottomLeft($element, $tooltipElem, tooltipModel);
                break;
            case 'left':
                layoutParam = showLeft($element, $tooltipElem, tooltipModel);
                break;
            case 'left-top':
                layoutParam = showLeftTop($element, $tooltipElem, tooltipModel);
                break;
            case 'left-bottom':
                layoutParam = showLeftBottom($element, $tooltipElem, tooltipModel);
                break;
            case 'right':
                layoutParam = showRight($element, $tooltipElem, tooltipModel);
                break;
            case 'right-top':
                layoutParam = showRightTop($element, $tooltipElem, tooltipModel);
                break;
            case 'right-bottom':
                layoutParam = showRightBottom($element, $tooltipElem, tooltipModel);
                break;
            default :
                break;
        }

        return layoutParam;
    }

    /**
     * 设置Tooltip最终显示时的布局参数
     * @param tooltipElem：Tooltip的DOM
     * @param layoutParam：通过临时DOM及用户配置计算得出的Tooltip布局参数，部分参数会存在undefined的情况
     */
    function setTooltipPosition($tooltipElem, layoutParam) {
        $tooltipElem.css({
            left: parseInt(layoutParam.left, 10) + 'px',
            top: parseInt(layoutParam.top, 10) + 'px',
            right: parseInt(layoutParam.right, 10) + 'px',
            bottom: parseInt(layoutParam.bottom, 10) + 'px',
            width: parseInt(layoutParam.width, 10) + 'px'
        });
        $tooltipElem.appendTo($('body'));
    }

    /**
     * 获取元素的布局参数，如width, height, left, top
     * @param element [jquery Obj]: 被提示元素的DOM对象
     * @returns {top: number, left: number, width: number, height: number}
     */
    function getElementLayout($element) {
        return {
            top: $element.offset().top,
            left: $element.offset().left,
            width: $element[0].offsetWidth,
            height: $element[0].offsetHeight
        }
    }

    /**
     * 设置Tooltip临时DOM的宽度属性，临时呈现的效果需要与最终呈现的保持一致
     * @param tempTooltip：临时DOM，获取到相关样式后移除
     * @param customWidth：用户自定义的换行宽度
     * @return tempWidth: Tooltip最终显示时，也需要设置相同的宽度
     */
    function setTempTooltipWidth($tempTooltip, customWidth) {
        var tempWidth; // 默认值为undefined，会被css忽略
        if (angular.isDefined(customWidth)) {
            tempWidth = customWidth;
        } else if ($tempTooltip[0].offsetWidth > parseInt(CONSTANT_CONFIG.WIDTH, 10)) {
            tempWidth = CONSTANT_CONFIG.WIDTH;
        }
        $tempTooltip.css('width', tempWidth);

        return tempWidth;
    }

    return module.name;
});


define('components/dropdown/dropdown',['components/module', 'components/tip/tip'], function (module) {
    'use strict';

    /**
     * 将下拉面板单独定义为一个指令，方便后续做autoComplate和Searchbox
     */
    module.directive('tiDropdown', tiDropdown);
    tiDropdown.$inject = ['tiTipService'];
    function tiDropdown(tiTipService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                options: '=?',        // 下拉列表数据
                selectedId: '=?',     // 当前选中的ID(适用于单选功能)
                selectedArray: '=?',  // 当前选中项的ID组成的数组(适用于多选功能)
                showStyle: '=?',      // 是否向下展开
                maxHeight: '=?',      // 下拉列表的最大高度，默认为"9999px"
                panelWidth: '=?',     // 下拉列表的宽度
                noDataText: '=?',      // 自定义无匹配项时的提示文本
                dominator: '=?',      // 下拉框的定位元素
                show: '=?',            // 是否显示列表
                select: '&',          // 下拉选项的选中事件（包括点击和上下键）
                change: '&'           // 由用户导致的当前选中项变更（单选：下拉框关闭时判定是否发生变化；多选；Checkbox改变即触发）
            },
            templateUrl: function ($element, attrs) {
                if (_.has(attrs, 'multi')) {
                    return '/tiny-components/src/components/dropdown/dropdownMulti.html';
                }

                return '/tiny-components/src/components/dropdown/dropdownSingle.html';
            },
            link: link
        };

        function link(scope, $element, attrs) {
            init(scope, $element, attrs);
            addBehavior(scope, $element, tiTipService); // 定义事件及事件回调
            addWatcher(scope, $element); // 添加脏值检查回调
        }
    }

    function init(scope, $element, attrs) {
        scope.maxHeight = _.isUndefined(scope.maxHeight) ? '9999px' : scope.maxHeight;
        verifyPanelWidth(scope); // 对panelWidth做合法性处理, 并修正非法值
        scope.isMulti = _.has(attrs, 'multi');

        // 设置下拉框的初始展开状态，便于在show的脏值检查中统一确定是否需要触发change事件
        if (scope.show === true) {
            show(scope, $element);
        } else {
            hide(scope, $element);
        }
    }

    function verifyPanelWidth(scope) {
        // panelWidth设置为'auto'、'justified'或数字时属于合法情况，不做处理
        if (scope.panelWidth === 'auto' ||
            scope.panelWidth === 'justified' ||
            !_.isNaN(parseInt(scope.panelWidth, 10))) {
            return;
        }

        scope.panelWidth = 'justified';
    }

    function addBehavior(scope, $element, tiTipService) {
        scope.panelMousedown = function (event) {
            event.preventDefault(); // 点击组名时不能使根节点失去焦点

            // 兼容性处理：IE下点击下拉框的滚动条无法阻止根节点失去焦点，兼容性处理
            if (window.tiny.utils.browser.ie === true) {
                (scope.dominator)[0].isPrevented = true;
                event.stopPropagation();
            }
        };

        // 兼容性处理：确保IE下点击组名再点击其他地方时，组件能正常触发对外blur
        scope.groupMousedown = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };

        // 下拉选项的单击操作（不包括组名所在的<li>元素）
        scope.mousedown = function (event, option) {
            event.preventDefault(); // 阻止根节点失去焦点

            // 兼容性处理：IE下点击下拉框的滚动条会导致根节点失去焦点
            if (window.tiny.utils.browser.ie === true) {
                event.stopPropagation();
            }

            if (scope.isMulti === true) {
                // 多选时的处理
                if (_.indexOf(scope.selectedArray, option.id) === -1) {
                    checkItem(scope, angular.copy(option));
                } else {
                    uncheckItem(scope, angular.copy(option));
                }
            } else {
                // 单选时的处理
                var selectedOption = angular.copy(option); // 更新当前选中项
                scope.selectedId = selectedOption.id;
                scope.show = false;
                if (_.isFunction(scope.select())) {
                    scope.select()(selectedOption); // 单选时传出当前选中对象
                }
            }
        };

        // 鼠标进入下拉选项时的交互
        scope.mouseenter = function (event) {
            // 若内容无法完整显示，则通过Tooltip显示完整内容
            var $option = $(event.currentTarget);
            var tooltipOptions = {
                content: $option.scope().option.label,
                position: 'top-left'
            };
            tiTipService.setTooltip($option, tooltipOptions);
        };

        // Bug Fixed：若使用原生的滚轮行为，则滚动到下拉面板头部或底部的时候，若继续滚动会触发祖先元素的滚轮事件，导致下拉面板与元素分离
        // 必须要自定义下拉面板的滚轮行为，否则会导致下拉面板与控制元素分离
        $element.on('mousewheel DOMMouseScroll', function (event) {
            event.stopPropagation();
            event.preventDefault();

            // 火狐浏览器需要做兼容性处理
            if (window.tiny.utils.browser.firefox) {
                $element[0].scrollTop += event.originalEvent.detail > 0 ? 120 : -120;
            } else {
                $element[0].scrollTop += event.originalEvent.wheelDelta > 0 ? -120 : 120;
            }
        });

        // 上、下、回车、退出等其他快捷键操作的响应
        scope.keydown = function (event) {
            if (!scope.show) {
                return;
            }

            var keyCode = event.keyCode;
            switch (keyCode) {
                case 38 : // UP键
                    responseUp(scope, $element, event);
                    break;
                case 40 : // DOWN键
                    responseDown(scope, $element, event);
                    break;
                case 27 : // ESC键
                    responseEsc(scope, event);
                    break;
                case 13 : // ENTER键
                case 108 : // ENTER键(数字小键盘)
                    responseEnter(scope, $element, event);
                    break;
                default :
                    break;
            }
        };
        $(document).on('keydown', scope.keydown);

        // 所有使得支配元素位置变化的操作都需要隐藏下拉框
        scope.hiddenPanel = function () {
            scope.show = false;
            scope.$evalAsync();
        };
        $(document).on('mousewheel DOMMouseScroll', scope.hiddenPanel);
        $(window).on('resize', scope.hiddenPanel);
    }

    function addWatcher(scope, $element) {
        scope.$watch('show', function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }

            // 每一次下拉框收起时确定是否需要触发单选情况下的change事件
            if (newValue === true) {
                show(scope, $element);
                scope.oldSelectedId = scope.selectedId;
            } else {
                hide(scope, $element);
                if (scope.oldSelectedId !== scope.selectedId && scope.isMulti === false) {
                    if (_.isFunction(scope.change())) {
                        scope.change()(scope.selectedId);
                    }
                }
            }
        });

        // 数据发生变化时，如果下拉框处于展开状态，需要动态设置下拉框的最大高度以适应新数据
        scope.$watch('options', function () {
            // 下拉框收起的情况下更新数据时，不需要动态设置下拉框的最大高度
            if (scope.show === false) {
                return;
            }

            // 保持当前显示位置不变，根据内容重新设置下拉框的最大高度
            var $dominator = scope.dominator;
            var position = $dominator.offset();
            var dominatorHeight = $dominator[0].offsetHeight;
            var compatibleHeight = document.documentElement.clientHeight ||
                document.body.clientHeight ||
                window.innerHeight;
            var maxHeight;
            if (scope.showStyle === 'down') {
                var availableHeightBelow = compatibleHeight +
                    $(document).scrollTop() -
                    position.top -
                    dominatorHeight;// 输入框下方可用高度
                maxHeight = availableHeightBelow > parseInt(scope.maxHeight, 10) ?
                    scope.maxHeight : availableHeightBelow;
            } else if (scope.showStyle === 'up') {
                var availableHeightOver = position.top -
                    $(document).scrollTop();// 输入框上方可用高度
                maxHeight = availableHeightOver > parseInt(scope.maxHeight, 10) ?
                    scope.maxHeight : availableHeightOver;
            }
            $element.css('max-height', maxHeight + 'px');
        }, true);

        // link由内向外执行，初始化时scope.dominator为undefined，因此将dominator相关操作在脏值检查中完成
        scope.$watch('dominator', function (newValue) {
            if (_.isUndefined(newValue)) {
                return;
            }

            var $dominator = scope.dominator;
            $element.css('line-height', $dominator.outerHeight() + 'px');
            $element.appendTo($('body'));

            // 在支配元素销毁时，销毁下拉框
            scope.dominator.on('$destroy', function () {
                $element.remove();
                scope.$destroy();
                $(document).off('keydown', scope.keydown);
                $(window).off('resize', scope.hiddenPanel);
                $(document).off('mousewheel DOMMouseScroll', scope.hiddenPanel);
            });
        });
    }

    function responseUp(scope, $element, event) {
        event.preventDefault();

        if (scope.isMulti === true) {
            upFnMulti($element);
        } else {
            upFnSingle(scope, $element);
        }
    }

    function responseDown(scope, $element, event) {
        event.preventDefault();

        if (scope.isMulti === true) {
            downFnMulti($element);
        } else {
            downFnSingle(scope, $element);
        }
    }

    function responseEsc(scope, event) {
        event.preventDefault();
        scope.show = false;
        scope.$evalAsync();
    }

    // 关闭下拉框
    function responseEnter(scope, $element) {
        if (scope.isMulti === true) {
            enterFnMulti(scope, $element);
        } else {
            scope.show = false;
        }
        scope.$evalAsync();
    }

    function enterFnMulti(scope, $element) {
        var $current = $element.find('.ti-dropdown-option-hover');
        if ($current.length < 1) {
            scope.show = false;
        } else if ($current.hasClass('ti-dropdown-option-selected')) {
            uncheckItem(scope, angular.copy($current.scope().option));
        } else {
            checkItem(scope, angular.copy($current.scope().option));
        }
    }

    function checkItem(scope, option) {
        scope.selectedArray.push(option.id);

        // 触发select事件
        if (_.isFunction(scope.select())) {
            scope.select()(option);
        }

        // 触发change事件
        if (_.isFunction(scope.change())) {
            scope.change()(scope.selectedArray);
        }
    }

    function uncheckItem(scope, option) {
        scope.selectedArray = _.without(scope.selectedArray, option.id);

        // 触发select事件
        if (_.isFunction(scope.select())) {
            scope.select()(option);
        }

        // 触发change事件
        if (_.isFunction(scope.change())) {
            scope.change()(scope.selectedArray);
        }
    }

    function upFnMulti($element) {
        var $allItems = $element.find('.ti-dropdown-option');
        if ($allItems.length < 1) {
            return;
        }

        // 优先查找hover元素，如果没有的话查找当前选中项
        var $current = $allItems.filter('.ti-dropdown-option-hover');
        var $next;
        var index;
        if ($current.length < 1) {
            $current = $allItems.filter('.ti-dropdown-option-selected').first();
        }

        // 查找向下键响应的hover元素
        if ($current.length > 0) {
            index = findIndex($current, $allItems);
        }
        if (index > 0) {
            $next = $($allItems[index - 1]);
        } else {
            $next = $allItems.last();
        }

        // 多选时仅涉及样式变更
        $current.removeClass('ti-dropdown-option-hover');
        $next.addClass('ti-dropdown-option-hover');
        $element.scrollTop($next[0].offsetTop);
    }

    function upFnSingle(scope, $element) {
        var $allItems = $element.find('.ti-dropdown-option');
        if ($allItems.length < 1) {
            return;
        }

        // 确定下一个选中项
        var $current = $allItems.filter('.ti-dropdown-option-selected');
        var $next;
        var index;
        if ($current.length > 0) {
            index = findIndex($current, $allItems);
        }
        if (index > 0) {
            $next = $($allItems[index - 1]);
        } else {
            $next = $allItems.last();
        }

        // 单选时完成事件通知及更新滚动条
        var selectedOption = angular.copy($next.scope().option);
        scope.selectedId = selectedOption.id;
        scope.$evalAsync();
        $element.scrollTop($next[0].offsetTop);
        if (_.isFunction(scope.select())) {
            scope.select()(selectedOption);
        }
    }

    function downFnMulti($element) {
        var $allItems = $element.find('.ti-dropdown-option');
        if ($allItems.length < 1) {
            return;
        }

        // 优先查找hover元素，如果没有的话查找当前选中项
        var $current = $allItems.filter('.ti-dropdown-option-hover');
        var $next;
        var index;
        if ($current.length < 1) {
            $current = $allItems.filter('.ti-dropdown-option-selected').first();
        }

        // 查找向下键响应的hover元素
        if ($current.length > 0) {
            index = findIndex($current, $allItems);
        }
        if (index < $allItems.length - 1) {
            $next = $($allItems[index + 1]);
        } else {
            $next = $allItems.first();
        }

        // 多选时仅涉及样式变更
        $current.removeClass('ti-dropdown-option-hover');
        $next.addClass('ti-dropdown-option-hover');
        $element.scrollTop($next[0].offsetTop);
    }

    function downFnSingle(scope, $element) {
        var $allItems = $element.find('.ti-dropdown-option');
        if ($allItems.length < 1) {
            return;
        }

        // 确定下一个选中项
        var $current = $allItems.filter('.ti-dropdown-option-selected');
        var $next;
        var index;
        if ($current.length > 0) {
            index = findIndex($current, $allItems);
        }
        if (index < $allItems.length - 1) {
            $next = $($allItems[index + 1]);
        } else {
            $next = $allItems.first();
        }

        // 单选时完成事件通知及更新滚动条
        var selectedOption = angular.copy($next.scope().option);
        scope.selectedId = selectedOption.id;
        scope.$evalAsync();
        $element.scrollTop($next[0].offsetTop);
        if (_.isFunction(scope.select())) {
            scope.select()(selectedOption);
        }
    }

    // 从符合jquery选择器的某一集合中寻找$item所在的序号
    function findIndex($item, $itemCollections) {
        if ($item.length < 1 || $itemCollections.length < 1) {
            return -1;
        }

        for (var i = 0; i < $itemCollections.length; i++) {
            if ($item[0] === $itemCollections[i]) {
                return i;
            }
        }

        return -1;
    }

    // 将下拉框显示出来
    function show(scope, $element) {
        setLayout(scope, $element);
        setShowStyle(scope, $element);
        $element.show();
        setPanelWidth(scope, $element); // 确保在显示之后设置下拉框的宽度，避免滚动条的影响
        setScrollTop(scope, $element); // 滚动条定位至当前选中元素
    }

    // 设置下拉框的行高及最小宽度
    function setLayout(scope, $element) {
        var $dominator = scope.dominator;
        var dominatorHeight = $dominator.outerHeight();
        $element.css({
            'line-height': dominatorHeight + 'px',
            'min-width': $dominator.outerWidth() - 2 + 'px',
            'max-height': scope.maxHeight
        });
    }

    // 确定元素的显示样式，包括位置、最大高度、向上或向下
    function setShowStyle(scope, $element) {
        var $dominator = scope.dominator;
        var dominatorHeight = $dominator.outerHeight();
        var position = $dominator.offset();
        var compatibleHeight = document.documentElement.clientHeight ||
            document.body.clientHeight ||
            window.innerHeight;
        var availableHeightBelow = compatibleHeight +
            $(document).scrollTop() -
            position.top -
            dominatorHeight;// 输入框下方可用高度
        var availableHeightOver = position.top - $(document).scrollTop();// 输入框上方可用高度
        var actualHeight = getActualHeight($element); // 获取下拉框的真实显示高度
        if (actualHeight <= availableHeightBelow) {
            // 1.下方空间足够，向下展开
            $element.css({
                bottom: '',
                top: position.top + dominatorHeight + 'px',
                left: position.left + 'px',
                'max-height': actualHeight + 2 + 'px'
            });
            scope.showStyle = 'down';
        } else if (actualHeight <= availableHeightOver) {
            // 2.下方空间不足，上方空间足够，向上展开
            $element.css({
                top: '',
                bottom: compatibleHeight - position.top + 'px',
                left: position.left + 'px',
                'max-height': actualHeight + 2 + 'px'
            });
            scope.showStyle = 'up';
        } else if (availableHeightOver > availableHeightBelow) {
            // 3.上下空间都不够，上方空间较大，则向上展开
            $element.css({
                top: '',
                bottom: compatibleHeight - position.top - 1 + 'px',
                left: position.left + 'px',
                'max-height': availableHeightOver - 1
            });
            scope.showStyle = 'up';
        } else {
            // 4.上下空间都不够，下方空间较大，则向下展开
            $element.css({
                bottom: '',
                top: position.top + dominatorHeight - 1 + 'px',
                left: position.left + 'px',
                'max-height': availableHeightBelow - 1
            });
            scope.showStyle = 'down';
        }
    }

    // 获取$element在无最大高度限制时的显示高度
    function getActualHeight($element) {
        // 通过临时DOM计算下拉列表的显示高度
        var $temp = $element.clone();
        $temp.css({
            display: 'block',
            visibility: 'hidden',
            left: '-9999px',
            position: 'absolute'
        }).appendTo($('body'));
        var actualHeight = $temp.outerHeight();// 弹出框的显示高度
        $temp.remove();

        return actualHeight;
    }

    function setScrollTop(scope, $element) {
        var $allItems = $element.find('.ti-dropdown-option');
        if ($allItems.length < 1) {
            return;
        }

        var option = {};
        for (var i = 0; i < $allItems.length; i++) {
            option = $($allItems[i]).scope().option;
            if (scope.isMulti === true) {
                // 多选时定位至第一个选中项
                if (_.indexOf(scope.selectedArray, option.id) !== -1) {
                    $element.scrollTop($allItems[i].offsetTop);
                    return;
                }
            } else if (option.id === scope.selectedId) {
                $element.scrollTop($allItems[i].offsetTop);
                return;
            }
        }

        $element.scrollTop($allItems[0].offsetTop);
    }

    function setPanelWidth(scope, $element) {
        var panelWidth = parseInt(scope.panelWidth, 10);
        if (!isNaN(panelWidth)) {
            $element.css('width', parseInt(scope.panelWidth, 10) - 2 + 'px');
        } else if (scope.panelWidth === 'auto') {
            $element.css('width', 'auto');
            // Fix bug: 非IE下滚动条会覆盖部分内容
            if (!window.tiny.utils.browser.ie) {
                // 需要重置宽度设置，根据下拉面板的真实宽度确定是否需要增加滚动条宽度
                $element[0].style.width = null;

                // 有滚动条出现且文本较长时，需要再增加滚动条的宽度，否则内容显示不全，加2是左、右边框的宽度
                var clientWidth = $element[0].clientWidth;
                var offsetWidth = $element[0].offsetWidth;
                var scrollWidth = offsetWidth - clientWidth;
                if (offsetWidth > (clientWidth + 2) &&
                    $element.outerWidth() < ($element.outerWidth() + scrollWidth)) {
                    $element.css('width', $element.outerWidth() + scrollWidth - 2);
                }
            }
        } else {
            // 默认宽度设置，包含justified
            var $dominator = scope.dominator;
            $element.css('width', parseInt($dominator[0].offsetWidth, 10) - 2 + 'px');
        }
    }

    function hide(scope, $element) {
        // scope.$broadcast('elementHide'); // 被提示元素隐藏前需要通知给Tooltip
        $element.hide();
    }

    return module.name;
});

/**
 * 单选下拉组件
 */

define('components/select/select',['components/module', 'components/dropdown/dropdown'],
    function (module) {
        module.directive('tiSelect', tiSelectDirective);
        tiSelectDirective.$inject = ['$timeout'];
        function tiSelectDirective($timeout) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    placeholderText: '=?',  // 组件的预留文本
                    disable: '=?',          // 控制组件是否可用
                    focused: '=?',          // 控制组件是否获取焦点
                    panelMaxHeight: '=?',   // 下拉面板的最大显示高度，溢出时则出滚动条
                    panelWidth: '=?',       // 下拉面板的宽度，可选值为'justified'(默认),'auto'或自定义宽度，但宽度不能小于select面板的宽度
                    selectedId: '=?',       // 当前选中项的id
                    options: '=?',           // 下拉选项的全部数据
                    noDataText: '=?',        // 无数据时的显示文本
                    change: '&',            // 同原生change事件
                    blur: '&',              // 失去焦点的事件
                    focus: '&',             // 下拉框的focus事件
                    beforeOpen: '&'         // 仅用于异步数据获取
                },
                templateUrl: '/tiny-components/src/components/select/select.html',

                link: function (scope, $element, attrs) {
                    // 默认值设定
                    init(scope, $element, attrs);
                    addBehavior(scope, $element, $timeout); // 定义事件回调
                    addWatcher(scope, $element);
                }
            };
        }

        function init(scope, $element) {
            scope.isOpen = false; // 控制组件的下拉框的展开收起状态
            scope.isFocused = false;
            scope.suggestions = _.isUndefined(scope.options) ?
                [] : angular.copy(scope.options); // 下拉选项列表默认为空数组
            scope.selectedId = _.isUndefined(scope.selectedId) ? '' : scope.selectedId; // 默认为空字符串
            scope.placeholderText = _.isUndefined(scope.placeholderText) ? '' : scope.placeholderText;
            scope.dominator = $element;
        }

        function addBehavior(scope, $element, $timeout) {
            scope.focusFn = function ($event) {
                if (scope.disable === true) {
                    $event.preventDefault();
                    return;
                }

                // IE下点击滚动条操作的兼容性处理
                if (window.tiny.utils.browser.ie === true) {
                    // 如果当前处于聚焦状态，则不触发对外focus
                    if (scope.isFocused === true) {
                        if ($element[0].isPrevented === true || scope.isInner === true) {
                            $element[0].isPrevented = false;
                            scope.isInner = false;
                            return;
                        }
                    } else {
                        $element[0].isPrevented = false;
                        scope.isInner = false;
                    }
                }

                scope.isFocused = true;
                scope.focused = true;
                if (_.isFunction(scope.focus())) {
                    scope.focus()(scope.selectedOption);
                }
                $element.trigger('tiFocus');
            };

            // 内部mousedown事件冒泡至根节点
            scope.selectMousedownFn = function ($event) {
                if (scope.disable === true) {
                    $event.preventDefault();
                    return;
                }

                // 兼容性处理：如果在IE下，并且当前组件没有获取焦点，则使组件获取焦点并触发对外focus事件
                if (window.tiny.utils.browser.ie === true && scope.isFocused !== true) {
                    $event.preventDefault();
                    scope.isInner = true;
                    $element.focus();
                }

                // 异步支持
                if (_.isFunction(scope.beforeOpen()) && scope.isOpen === false) {
                    triggerBeforeOpen(scope);
                } else {
                    scope.isOpen = !scope.isOpen;
                }
            };

            scope.blurFn = function () {
                // 兼容性处理：IE下点击下拉框的滚动条时会导致根节点失去焦点，使它重新获取焦点
                if (window.tiny.utils.browser.ie &&
                    ($element[0].isPrevented === true || scope.isInner === true)) {
                    $element.focus();
                    return;
                }

                scope.isFocused = false;
                scope.focused = false;
                scope.isOpen = false;
                if (_.isFunction(scope.blur())) {
                    scope.blur()(scope.selectedOption);
                }
                $element.trigger('tiBlur');
            };

            scope.changeFn = function (selectedId) {
                var option = getOptionById(scope.options, selectedId);
                $element[0].tiValue = option.label;
                $element.trigger('contentChange');
                if (_.isFunction(scope.change())) {
                    $timeout(function () { // $timeout是为了避免回调触发时selectedId尚未改变
                        scope.change()(option);
                    }, 0);
                }
            };

            // 兼容性处理：下拉按钮的点击事件，仅用于IE下阻止根节点失去焦点
            scope.menuMousedownFn = function ($event) {
                if (window.tiny.utils.browser.ie === true) {
                    $event.preventDefault();
                }
            };

            scope.keydownFn = function (event) {
                if (scope.disable) {
                    return;
                }
                var keyCode = event.keyCode;
                switch (keyCode) {
                    case 9 : // Tab键
                        responseTab(scope, event);
                        break;
                    case 13 : // ENTER键
                    case 108 : // ENTER键(数字小键盘)
                        responseEnter(scope);
                        break;
                    case 32 : // SPACE键
                        responseSpace(scope, event);
                        break;
                    default :
                        break;
                }
            };
            $(document).on('keydown.tiSelect', scope.keydownFn);

            $element.on('$destroy', function () {
                $(document).off('keydown.tiSelect', scope.keydownFn);
            });
        }

        function addWatcher(scope, $element) {
            scope.$watch('options', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                scope.suggestions = angular.copy(newValue);
                scope.selectedOption = getOptionById(newValue, scope.selectedId);
            }, true);

            scope.$watch('selectedId', function (newValue) {
                scope.selectedOption = getOptionById(scope.options, newValue);
            });

            scope.$watch('placeholderText', function () {
                setPlaceholder(scope, $element);
            });

            scope.$watch('selectedOption', function (newValue) {
                $element[0].tiValue = newValue.label;
            });

            scope.$watch('focused', function (newValue) {
                if (newValue === true && scope.isFocused === false) {
                    $element.find('.ti-select-text').trigger('focus');
                } else if (newValue === false && scope.isFocused === true) {
                    $element.find('.ti-select-text').trigger('blur');
                }
            });
        }

        // 异步获取数据时，触发beforeOpen
        function triggerBeforeOpen(scope) {
            var changeRet = scope.beforeOpen()();
            if (!_.isUndefined(changeRet) && _.isFunction(changeRet.then)) {
                changeRet.then(function () {
                    scope.isOpen = true;
                    scope.$evalAsync();
                });
            } else {
                scope.isOpen = true;
            }
        }

        function responseTab(scope, event) {
            if (scope.isOpen) {
                event.preventDefault(); // 阻止触发blurFn
                scope.isOpen = false; // 已展开的情况

                // 兼容性处理：IE下仍然会触发blur事件，将isInner置为false，阻止再次触发focus
                if (window.tiny.utils.browser.ie === true) {
                    scope.isInner = false;
                }
            } else if (scope.isFocused) {
                scope.isFocused = false; // 未展开，但处于focus状态的情况
            }
            scope.$evalAsync();
        }

        // 回车键仅导致下拉框的收起、展开
        function responseEnter(scope) {
            if (scope.isOpen) {
                scope.isOpen = false;
            } else if (scope.isFocused) {
                if (_.isFunction(scope.beforeOpen())) {
                    triggerBeforeOpen(scope);
                } else {
                    scope.isOpen = true;
                }
            }
            scope.$evalAsync();
        }

        // 空格键仅在Select获取焦点的情况下使下拉框展开
        function responseSpace(scope, event) {
            if (!scope.isFocused) {
                return;
            }
            event.preventDefault(); // 阻止默认的页面卷去行为
            if (_.isFunction(scope.beforeOpen())) {
                triggerBeforeOpen(scope);
            } else {
                scope.isOpen = true;
            }
            scope.$evalAsync();
        }

        // 设置预留文本
        function setPlaceholder(scope, $element) {
            $element.find('.ti-select-text').attr('placeholder', scope.placeholderText);
        }

        function getOptionById(options, id) {
            if (_.isUndefined(options) || options.length < 1) {
                return {};
            }

            var i;
            if (_.has(options[0], 'children')) {
                // 分组情况下的检索
                var children = [];
                for (i = 0; i < options.length; i++) {
                    children = options[i].children;
                    for (var j = 0; j < children.length; j++) {
                        if (id === children[j].id) {
                            return children[j];
                        }
                    }
                }
            } else {
                // 非分组情况下的检索
                for (i = 0; i < options.length; i++) {
                    if (id === options[i].id) {
                        return options[i];
                    }
                }
            }

            return {};
        }

        return module.name;
    }
);

/**
 * 单选下拉组件
 */

define('components/multiSelect/multiSelect',['components/module', 'components/dropdown/dropdown'],
    function (module) {
        module.directive('tiMultiSelect', function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    placeholderText: '=?',  // 组件的预留文本
                    disable: '=?',          // 控制组件是否可用
                    focused: '=?',          // 控制组件是否获取焦点
                    panelMaxHeight: '=?',   // 下拉面板的最大显示高度，溢出时则出滚动条
                    panelWidth: '=?',       // 下拉面板的宽度，可选值为'justified'(默认),'auto'或自定义宽度，但宽度不能小于select面板的宽度
                    selectedId: '=?',       // 当前选中项的id
                    options: '=?',           // 下拉选项的全部数据
                    noDataText: '=?',        // 无数据时的显示文本
                    change: '&',            // 同原生change事件
                    blur: '&',              // 失去焦点的事件
                    focus: '&',             // 下拉框的focus事件
                    beforeOpen: '&'         // 仅用于异步数据获取
                },
                templateUrl: '/tiny-components/src/components/multiSelect/multiSelect.html',
                link: link
            };
        });

        function link(scope, $element) {
            // 默认值设定
            init(scope, $element);
            addBehavior(scope, $element); // 定义事件回调
            addWatcher(scope, $element);
        }

        function init(scope, $element) {
            scope.isOpen = false; // 控制组件的下拉框的展开收起状态
            scope.isFocused = false;
            scope.suggestions = _.isUndefined(scope.options) ?
                [] : angular.copy(scope.options); // 下拉选项列表默认为空数组
            scope.selectedId = _.isArray(scope.selectedId) ? scope.selectedId : []; // 默认为空字符串
            scope.placeholderText = _.isUndefined(scope.placeholderText) ? '' : scope.placeholderText;
            scope.dominator = $element;
        }

        function addBehavior(scope, $element) {
            scope.focusFn = function ($event) {
                if (scope.disable === true) {
                    $event.preventDefault();
                    return;
                }

                // IE下点击滚动条操作的兼容性处理
                if (window.tiny.utils.browser.ie === true) {
                    // 如果当前处于聚焦状态，则不触发对外focus
                    if (scope.isFocused === true) {
                        if ($element[0].isPrevented === true || scope.isInner === true) {
                            $element[0].isPrevented = false;
                            scope.isInner = false;
                            return;
                        }
                    } else {
                        $element[0].isPrevented = false;
                        scope.isInner = false;
                    }
                }

                scope.isFocused = true;
                scope.focused = true;
                if (_.isFunction(scope.focus())) {
                    scope.focus()(scope.selectedOption);
                }
                $element.trigger('tiFocus');
            };

            // 内部mousedown事件冒泡至根节点
            scope.selectMousedownFn = function ($event) {
                if (scope.disable === true) {
                    $event.preventDefault();
                    return;
                }

                // 兼容性处理：如果在IE下，并且当前组件没有获取焦点，则使组件获取焦点并触发对外focus事件
                if (window.tiny.utils.browser.ie === true && scope.isFocused !== true) {
                    $event.preventDefault();
                    scope.isInner = true;
                    $element.focus();
                }

                // 异步支持
                if (_.isFunction(scope.beforeOpen()) && scope.isOpen === false) {
                    triggerBeforeOpen(scope);
                } else {
                    scope.isOpen = !scope.isOpen;
                }
            };

            scope.blurFn = function () {
                // 兼容性处理：IE下点击下拉框的滚动条时会导致根节点失去焦点，使它重新获取焦点
                if (window.tiny.utils.browser.ie &&
                    ($element[0].isPrevented === true || scope.isInner === true)) {
                    $element.focus();
                    return;
                }

                scope.isFocused = false;
                scope.focused = false;
                scope.isOpen = false;
                if (_.isFunction(scope.blur())) {
                    scope.blur()(scope.selectedOption);
                }
                $element.trigger('tiBlur');
            };

            scope.changeFn = function (selectedId) {
                $element[0].tiValue = getContentById(scope.options, selectedId);
                $element.trigger('contentChange');
                if (_.isFunction(scope.change())) {
                    scope.change()(selectedId);
                }
            };

            // 兼容性处理：下拉按钮的点击事件，仅用于IE下阻止根节点失去焦点
            scope.menuMousedownFn = function ($event) {
                if (window.tiny.utils.browser.ie === true) {
                    $event.preventDefault();
                }
            };

            scope.keydownFn = function (event) {
                if (scope.disable) {
                    return;
                }
                var keyCode = event.keyCode;
                switch (keyCode) {
                    case 9 : // Tab键
                        responseTab(scope, event);
                        break;
                    case 13 : // ENTER键
                    case 108 : // ENTER键(数字小键盘)
                        responseEnter(scope);
                        break;
                    case 32 : // SPACE键
                        responseSpace(scope, event);
                        break;
                    default :
                        break;
                }
            };
            $(document).on('keydown.tiSelect', scope.keydownFn);

            $element.on('$destroy', function () {
                $(document).off('keydown.tiSelect', scope.keydownFn);
            });
        }

        function addWatcher(scope, $element) {
            scope.$watch('options', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                scope.suggestions = angular.copy(newValue);
                scope.content = getContentById(newValue, scope.selectedId);
                $element[0].tiValue = scope.content;
            }, true);

            scope.$watchCollection('selectedId', function (newValue) {
                scope.content = getContentById(scope.options, newValue);
                $element[0].tiValue = scope.content;
            });

            scope.$watch('placeholderText', function () {
                setPlaceholder(scope, $element);
            });

            scope.$watch('focused', function (newValue) {
                if (newValue === true && scope.isFocused === false) {
                    $element.find('.ti-select-text').trigger('focus');
                } else if (newValue === false && scope.isFocused === true) {
                    $element.find('.ti-select-text').trigger('blur');
                }
            });
        }

        // 异步获取数据时，触发beforeOpen
        function triggerBeforeOpen(scope) {
            var changeRet = scope.beforeOpen()();
            if (!_.isUndefined(changeRet) && _.isFunction(changeRet.then)) {
                changeRet.then(function () {
                    scope.isOpen = true;
                    scope.$evalAsync();
                });
            } else {
                scope.isOpen = true;
            }
        }

        function responseTab(scope, event) {
            if (scope.isOpen) {
                event.preventDefault(); // 阻止触发blurFn
                scope.isOpen = false; // 已展开的情况

                // 兼容性处理：IE下仍然会触发blur事件，将isInner置为false，阻止再次触发focus
                if (window.tiny.utils.browser.ie === true) {
                    scope.isInner = false;
                }
            } else if (scope.isFocused) {
                scope.isFocused = false; // 未展开，但处于focus状态的情况
            }
            scope.$evalAsync();
        }

        // 回车键仅导致下拉框的收起、展开
        function responseEnter(scope) {
            if (!scope.isOpen && scope.isFocused) {
                if (_.isFunction(scope.beforeOpen())) {
                    triggerBeforeOpen(scope);
                } else {
                    scope.isOpen = true;
                }
            }
            scope.$evalAsync();
        }

        // 空格键仅在Select获取焦点的情况下使下拉框展开
        function responseSpace(scope, event) {
            if (!scope.isFocused) {
                return;
            }
            event.preventDefault(); // 阻止默认的页面卷去行为
            if (_.isFunction(scope.beforeOpen())) {
                triggerBeforeOpen(scope);
            } else {
                scope.isOpen = true;
            }
            scope.$evalAsync();
        }

        // 设置预留文本
        function setPlaceholder(scope, $element) {
            $element.find('.ti-select-text').attr('placeholder', scope.placeholderText);
        }

        function getContentById(options, idArray) {
            if (_.isUndefined(options) || options.length < 1 || idArray.length < 1) {
                return '';
            }

            var labelArray = [];
            var i;
            if (_.has(options[0], 'children')) {
                // 分组情况下的检索
                var children = [];
                for (i = 0; i < options.length; i++) {
                    children = options[i].children;
                    for (var j = 0; j < children.length; j++) {
                        if (_.indexOf(idArray, children[j].id) !== -1) {
                            labelArray.push(children[j].label);
                        }
                    }
                }
            } else {
                // 非分组情况下的检索
                for (i = 0; i < options.length; i++) {
                    if (_.indexOf(idArray, options[i].id) !== -1) {
                        labelArray.push(options[i].label);
                    }
                }
            }

            return labelArray.join(',');
        }

        return module.name;
    }
);


define('components/combobox/combobox',['components/module', 'components/dropdown/dropdown'], function(module) {
    'use strict';

    module.directive('tiCombobox', tiCombobox);
    function tiCombobox() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                placeholderText: '=?',  // 组件的预留文本
                disable: '=?',          // 控制组件是否可用
                focused: '=?',          // 控制组件是否获取焦点
                panelMaxHeight: '=?',   // 下拉面板的最大显示高度，溢出时则出滚动条
                panelWidth: '=?',       // 下拉面板的宽度，可选值为'justified'(默认),'auto'或自定义宽度，但宽度不能小于select面板的宽度
                change: '&',            // 同原生ngChange事件
                blur: '&',              // 失去焦点的事件
                focus: '&',             // 下拉框的focus事件
                select: '&',            // 下拉选项的选中事件
                selectedId: '=?',       // 当前选中项的id
                match:'=?',             // 下拉选项的匹配方式，提供四种："head", "any", "head-nocap", "any-nocap"(默认)
                options: '=?',          // 下拉选项的全部数据
                noMatched: '=?'    // 无匹配项时的显示内容
            },
            templateUrl: '/tiny-components/src/components/combobox/Datemodel',
            link: link
        };
    }

    function link(scope, $element, attrs) {
        init(scope, $element, attrs); // 初始化内部变量
        addBehavior(scope, $element); // 定义事件回调
        addWatcher(scope, $element); // 脏值检查
    }

    // 初始化设置
    function init(scope, $element, attrs) {
        scope.isFocused = false; // 组件当前是否处于focus状态
        scope.isOpen = false; // 标示组件的下拉框的展开收起状态
        scope.match = _.isUndefined(scope.match) ? 'any-nocap' : scope.match; // 默认为与Select展示区域宽度对齐
        scope.panelWidth = _.isUndefined(scope.panelWidth) ? 'justified' : scope.panelWidth; // 默认为与Select展示区域宽度对齐
        scope.suggestions = _.isUndefined(scope.options) ? [] : angular.copy(scope.options); // 下拉选项列表默认为空数组
        scope.selectedId = _.isUndefined(scope.selectedId) ? '' : scope.selectedId; // 默认为空字符串
        scope.selectedOption = getOptionById(scope.suggestions, scope.selectedId); // 选中项
        scope.content = scope.selectedOption.label; // 输入框内容
        $element[0].tiValue = scope.content;
        scope.placeholderText = _.isUndefined(scope.placeholderText) ? '' : scope.placeholderText;
        scope.dominator = $element;
    }

    // 定义事件回调
    function addBehavior(scope, $element) {
        // 输入框的focus事件的回调
        scope.focusFn = function(event) {
            if (scope.disable === true) {
                event.preventDefault();
                return;
            }

            // IE点击滚动条操作的兼容性处理
            if (window.tiny.utils.browser.ie && $element[0].isPrevented === true) {
                $element[0].isPrevented = false;
                return;
            }

            scope.isFocused = true;
            scope.focused = true;
            if (_.isFunction(scope.focus())) {
                scope.focus()(scope.selectedOption, event);
            }
            $element.trigger('tiFocus');
        };

        // 输入框的blur事件的回调
        scope.blurFn = function(event) {
            // IE下点击下拉框的滚动条无法阻止a标签失去焦点，兼容性处理
            if (window.tiny.utils.browser.ie && $element[0].isPrevented === true) {
                $element.find('.ti-combobox-text').focus();
                return;
            }

            scope.isFocused = false;
            scope.focused = false;
            scope.isOpen = false;
            checkContent(scope, $element);
            if (_.isFunction(scope.blur())) {
                scope.blur()(scope.selectedOption, event);
            }
            $element.trigger('tiBlur');
        };

        // disable状态下，如果当前存在内容且被选中，左右键仍然会被响应，需要屏蔽
        scope.keydownFn = function(event) {
            if (scope.disable === true) {
                event.preventDefault();
                return;
            }
        };

        // 下拉按钮的点击事件
        scope.menuMousedownFn = function(event) {
            if (scope.disable === true) {
                return;
            }
            event.preventDefault(); // 仅阻止点击的默认行为，不能阻止冒泡，使其他组件能通过document上的click事件正确交互
            // 若点击按钮时组件未处于聚焦状态，则需要使组件获取焦点
            if (!scope.isFocused) {
                $element.find('.ti-combobox-text').trigger('focus');
            }
            scope.suggestions = angular.copy(scope.options);
            scope.isOpen = !scope.isOpen; // 同步执行的情况
        };

        // 输入框ngChange事件回调
        scope.changeFn = function(content) {
            $element[0].tiValue = content;
            $element.trigger('contentChange');
            if (!_.isFunction(scope.change())) {
                defaultFilter(scope, content);
                return;
            }

            // 用户根据当前值直接在change回调中完成数据过滤并更新，组件仅负责呈现
            var changeRet = scope.change()(scope.selectedOption);
            if (!_.isUndefined(changeRet) && _.isFunction(changeRet.then)) {
                changeRet.then(function() {
                    // 后台异步获取时，程序根据当前值直接在change回调中完成数据过滤并更新，组件仅负责呈现
                    scope.isOpen = true;
                    scope.$evalAsync();
                });
            } else if (changeRet === true) {
                // 若用户以同步方式在change中已过滤并更新数据，则需要返回true，组件仅负责呈现
                scope.isOpen = true;
            } else {
                defaultFilter(scope, content);
            }
        };

        scope.selectFn = function(option) {
            $element[0].tiValue = option.label;
            $element.trigger('contentChange');
            if (_.isFunction(scope.select())) {
                scope.select()(option);
            }
        };

        $element.on('$destroy', function() {
            scope.$destroy();
        });
    }

    function addWatcher(scope, $element) {

        scope.$watch('options', function(newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            scope.suggestions = angular.copy(newValue);
        }, true);

        scope.$watch('selectedId', function(newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            scope.selectedOption = getOptionById(scope.options, newValue);
            scope.content = scope.selectedOption.label;
        });

        scope.$watch('placeholderText', function(newValue, oldValue) {
            var utils = window.tiny.utils;
            utils.placeholder.setPlaceholder($element.find('.ti-combobox-text')[0], newValue);
        });

        // 检测selectedOption的变化，仅用于blur时对输入值进行合法性检查
        scope.$watch('selectedOption', function(newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            scope.content = newValue.label;
            scope.selectedId = newValue.id;
            $element[0].tiValue = newValue.label;
        });

        scope.$watch('focused', function(newValue, oldValue) {
            if (newValue === true && scope.isFocused === false) {
                $element.find('.ti-combobox-text').trigger('focus');
            } else if (newValue === false && scope.isFocused === true) {
                $element.find('.ti-combobox-text').trigger('blur');
            }
        });
    }

    /**
     * 失焦后，对输入框中的内容做合法性校验
     * 若和某一选项匹配成功，则对输入内容不做修改，否则清空当前的输入内容
     */
    function checkContent(scope, $element) {
        // 当内容为空时不做失焦后的匹配
        if (scope.content === '') {
            return;
        }

        var options = scope.options;
        var children = [];
        var isFound = false;
        for (var i = 0, len = options.length; i < len; i++) {
            if (_.isUndefined(options[i].children)) {
                // 非分组情况下的匹配
                if (options[i].label === scope.content) {
                    isFound = true;
                }
            } else {
                // 分组情况下的匹配
                children = options[i].children;
                for (var j = 0; j < children.length; j++) {
                    if (children[j].label === scope.content) {
                        isFound = true;
                        break;
                    }
                }
            }

            // 若匹配成功，则结束查找且当前用户输入的内容不做任何修改
            if (isFound) {
                break;
            }
        }

        // 若匹配不成功，则设置当前选中项的内容为空
        if (isFound === false) {

            scope.selectedOption = {
                id: '',
                label: ''
            };
            $element[0].tiValue = '';
        }
    }

    /**
     * 根据id值检索选项
     * @param options：所有选中，包括分组和非分组
     * @param id：检索关键字
     * @return option：检索结果，若无匹配项，则为{}
     */
    function getOptionById(options, id) {
        if (options.length < 1) {
            return {};
        }

        if (_.has(options[0], 'children')) {
            // 分组情况下的检索
            var children = [];
            for (var i = 0; i < options.length; i++) {
                children = options[i].children;
                for (var j = 0; j < children.length; j++) {
                    if (id === children[j].id) {
                        return children[j];
                    }
                }
            }
        } else {
            // 非分组情况下的检索
            for (var i = 0; i < options.length; i++) {
                if (id === options[i].id) {
                    return options[i];
                }
            }
        }

        return {};
    }

    function defaultFilter(scope, content) {
        var options = scope.options;
        var filtered = []; // 存储匹配到的数据
        if (content === '') {
            filtered = options; // 当输入内容为空时，返回当前所有数据
        } else {
            for (var i = 0, len = options.length; i < len; i++) {
                if (_.isUndefined(options[i].children)) {
                    // 非分组情况下的过滤
                    if (isMatched(content, options[i].label, scope.match)) {
                        filtered.push(options[i]);
                    }
                } else {
                    // 分组情况下的过滤
                    var group = angular.copy(options[i]); // 对原数据不做修改
                    var children = group.children;
                    var filteredOptions = []; // 存储匹配成功的选项
                    for (var j = 0; j < children.length; j++) {
                        if (isMatched(content, children[j].label, scope.match)) {
                            filteredOptions.push(children[j]);
                        }
                    }

                    // 若某一分组中存在匹配选项，则将该分组信息及匹配选项存储到过滤结果
                    if (filteredOptions.length > 0) {
                        group.children = filteredOptions;
                        filtered.push(group);
                    }
                }
            }
        }

        scope.suggestions = filtered;
        scope.isOpen = true;
    }

    /**
     * 测试关键字keyword能否在testString中得到匹配，匹配规则有rule确定
     * @param keyword: 用户输入的内容
     * @param testString：某一下拉选项的内容
     * @param rule：匹配规则
     * @returns {true: 匹配成功；false：匹配失败；}
     */
    function isMatched(keyword, testString, rule) {
        // 若rule为函数类型，则匹配结果由用户自定义函数确定
        if (_.isFunction(rule)) {
            return rule(keyword, testString);
        }

        var result = false;
        switch (rule) {
            case 'head':
                if (testString.indexOf(keyword) === 0) {
                    result = true;
                }
                break;
            case 'any':
                if (testString.indexOf(keyword) >= 0) {
                    result = true;
                }
                break;
            case 'head-nocap':
                if (testString.toLowerCase().indexOf(keyword.toLowerCase()) === 0) {
                    result = true;
                }
                break;
            default:
                if (testString.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
                    result = true;
                }
                break;
        }
        return result;
    }

    return module.name;
});

/*****/
 //模仿写的组件
/*****/


define('components/searchbox/searchbox',['components/module', 'components/dropdown/dropdown'], function(module) {
    'use strict';

    module.directive('tiSearchbox', tiSearchbox);
    tiSearchbox.$inject = ["$timeout"];
    function tiSearchbox($timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                placeholderText: '=?',
                disable: '=?',
                maxlength: '=?',
                suggestion: '=?',
                value: "=?",
                change: '&',
                search: '&'
            },
            templateUrl: '/tiny-components/src/components/searchbox/searchbox.html',
            link: link
        };

        function link(scope, $element, attrs) {
            init(scope, $element, attrs); // 变量初始化操作
            addBehavior(scope, $element); // 定义事件
            addWatcher(scope, $element); // 定义脏值检查回调
        }

        function init(scope, $element, attrs) {
            scope.isFocused = false; // 组件当前是否处于focus状态
            scope.isOpen = false; // 标识组件的下拉框的展开收起状态
            scope.value = _.isString(scope.value) ? scope.value : ''; // 设置的value非字符串类型时，将其设置为空字符串
            scope.isShowClear = scope.value !== ""; // value为空字符串时，不显示清除按钮，否则显示清除按钮
            scope.suggestion = _.isUndefined(scope.suggestion) ? [] : angular.copy(scope.suggestion); // 下拉选项列表默认为空数组
            scope.selectedId = _.isUndefined(scope.selectedId) ? '' : scope.selectedId; // 默认为空字符串
            scope.placeholderText = _.isUndefined(scope.placeholderText) ? '' : scope.placeholderText;
            scope.dominator = $element;

            if (!isNaN(scope.maxlength)) {
                $element.find('.ti-searchbox-input').attr('maxlength', scope.maxlength);
            }

            if (_.has(attrs, 'autofocus')) {
                setFocus(scope, $element); // 处理autofocus状态
            }
        }

        function addBehavior(scope, $element) {
            scope.focusFn = function(event) {
                scope.isFocused = true;
            };

            scope.blurFn = function() {
                scope.isFocused = false;
                scope.isOpen = false;
            };

            // 回车键触发搜索并使搜索框失焦
            scope.inputKeydown = function(event) {
                switch (event.keyCode) {
                    case 13:  // ENTER键大键盘
                    case 108: // ENTER键数字键盘
                        setTimeout(function(){
                            scope.searchFn(scope.value);
                            if (scope.isFocused === true) {
                                $element.find('.ti-searchbox-input').trigger('blur');
                            }
                        }, 0);
                        break;
                    default :
                        break;
                }
            };

            // 搜索按钮的点击事件
            scope.searchFn = function(value) {
                if (scope.disable === true) {
                    return;
                }
                if (_.isFunction(scope.search())) {
                    scope.search()(value);
                }
            };

            // 输入框ngChange事件回调
            scope.changeFn = function(value) {
                scope.selectedId = ''; // 将之前选中项清空

                // 触发change事件
                if (_.isFunction(scope.change())) {
                    triggerChange();
                }

                function triggerChange() {
                    var changeRet = scope.change()(value);

                    // 非异步请求suggestion内容
                    if (_.isUndefined(changeRet) || !_.isFunction(changeRet.then)) {
                        setIsOpen();
                        return;
                    }

                    // 异步请求suggestion内容
                    changeRet.then(function () {
                        setIsOpen();
                    });
                }

                function setIsOpen() {
                    // $timeout作用：保证用户更新的suggestion已经生效到组件内容的scope上了
                    $timeout(function(){
                        if (scope.suggestion.length) {
                            scope.isOpen = true;
                        } else {
                            scope.isOpen = false;
                        }
                    }, 0);
                }
            };

            // 用户通过上下键选择时不触发change事件
            scope.select = function(option) {
                scope.value = option.label;
            };

            scope.clear = function(event) {
                if (scope.disable === true) {
                    return;
                }

                scope.value = '';
                scope.changeFn(''); // 触发change事件
                $element.find('.ti-searchbox-input').trigger('focus'); // 点击下拉按钮使仍然需要使组件获取聚焦
            }

            $element.on('$destroy', function() {
                scope.$destroy();
            });
        }

        function addWatcher(scope, $element) {
            scope.$watch('suggestion', function(newValue, oldValue) {
                if (!_.isArray(newValue)) {
                    return;
                }

                // 设置联想词条
                scope.dropList = angular.copy(newValue);
            }, true);

            scope.$watch('placeholderText', function(newValue) {
                var utils = window.tiny.utils;
                utils.placeholder.setPlaceholder($element.find('.ti-searchbox-input')[0], newValue);
            });

            scope.$watch('value', function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                if (!_.isString(newValue)) {
                    scope.value = oldValue;
                    return;
                }

                if (newValue === '') {
                    scope.isShowClear = false;
                } else {
                    scope.isShowClear = true;
                }
            });
        }

        /**
         * 设置搜索框组件处于focus状态
         * @param scope
         * @param $element: 搜索框组件的DOM对象
         */
        function setFocus(scope, $element) {
            if (scope.disable === true) {
                return;
            }
            $element.find('.ti-searchbox-input').trigger('focus');
        }
    }



    return module.name;
});

/**
 * @description
 * AngularJS version of the tab directive.
 * 定义ti-tab指令,最终返回module名
 */

define('components/tab/tab',["components/module"],
    function(module) {
        'use strict';

        module.directive('tiTabs', tiTabsDirective);
        function tiTabsDirective() {
            return {
                restrict: 'EA',
                transclude: true,
                scope: true,
                replace: true,
                controller: tiTabsController,
                templateUrl: '/tiny-components/src/components/tab/tabset.html',
                link: function(scope, element, attrs) { }
            };
        }

        tiTabsController.$inject = ['$scope'];
        function tiTabsController($scope) {
            var tabsCtrl = this,
                tabs = tabsCtrl.tabs = $scope.tabs = [];

            tabsCtrl.activeTab = function(selectedTab) {
                deActiveOthers(tabs, selectedTab);
                selectedTab.active = true;

                if (!selectedTab.selectCalled) {
                    selectedTab.onSelect() && selectedTab.onSelect()();
                    selectedTab.selectCalled = true;
                }
            };

            tabsCtrl.addTab = function addTab(tab) {
                tabs.push(tab);

                if (tabs.length === 1 && tab.active !== false || tab.active) {
                    tab.active = true;
                } else {
                    tab.active = false;
                }
            };

            tabsCtrl.removeTab = function removeTab(tab) {
                var index = tabs.indexOf(tab);

                if (tab.active && tabs.length > 1 && !destroyed) {
                    var newActiveIndex = (index == tabs.length - 1) ? index - 1 : index + 1;
                    tabsCtrl.activeTab(tabs[newActiveIndex]);
                }
                tabs.splice(index, 1);
            };

            var destroyed;
            $scope.$on('$destroy', function() {
                destroyed = true;
            });

            function deActiveOthers(tabs, selectedTab) {
                angular.forEach(tabs, function(tab) {
                    if (tab.active && tab !== selectedTab) {
                        tab.active = false;
                        tab.onDeselect() && tab.onDeselect()();
                        selectedTab.selectCalled = false;
                    }
                });
            }
        }

        module.directive('tiTab', tiTabDirective);
        function tiTabDirective() {
            return {
                require: '^tiTabs',
                restrict: 'EA',
                replace: true,
                templateUrl: '/tiny-components/src/components/tab/tab.html',
                transclude: true,
                scope: {
                    active: '=?',
                    disable: '=?',
                    onSelect: '&',
                    onDeselect: '&'
                },
                controller: function() {},
                link: tiTabLink
            };
            function tiTabLink(scope, elm, attrs, tabsCtrl, transclude) {
                scope.$watch('active', function(active) {
                    if (active) {
                        tabsCtrl.activeTab(scope);
                    }
                });

                scope.select = function() {
                    if (!scope.disable) {
                        scope.active = true;
                    }
                };

                tabsCtrl.addTab(scope);
                scope.$on('$destroy', function() {
                    tabsCtrl.removeTab(scope);
                });

                scope.$transcludeFn = transclude;
            }
        }

        module.directive('tiTabHeadHtml', tiTabHeadHtmlDirective);
        function tiTabHeadHtmlDirective() {
            return {
                restrict: 'A',
                require: '?^tiTab',
                link: function(scope, $element) {
                    scope.$watch('headElement', function updateHeadElement(headElement) {
                        if (headElement) {
                            $element.html('');
                            $element.append(headElement);
                        }
                    });
                }
            };
        }

        module.directive('tiTabBodyHtml', tiTabBodyHtmlDirective);
        function tiTabBodyHtmlDirective() {
            return {
                restrict: 'A',
                require: '?^tiTab',
                link: tiTabBodyLink
            };
            function tiTabBodyLink(scope, element, attrs) {
                var tab = scope.$eval(attrs.tiTabBodyHtml);
                tab.$transcludeFn(tab.$parent, function(contents) {
                    var $tabHeadElm = contents.filter("ti-tab-head");
                    var $tabBodyElm = contents.not("ti-tab-head");
                    tab.headElement = $tabHeadElm;
                    element.append($tabBodyElm);
                });
            }
        }

        return module.name;
    }
);


define('components/text/text',["components/module"], function(module) {
    'use strict';
    module.directive('tiText', tiText);

    tiText.$inject = ["$parse"];

    function tiText($parse) {
        return {
            restrict: 'A',
            link: linkFn
        };

        function linkFn(scope, $element, attrs) {
            init(scope, $element, attrs);

            addBehavior(scope, $element, attrs);

            addWatcher(scope, $element, attrs);
        }

        function init(scope, $element, attrs) {
            // 用于记录当前输入框中是否已经处于focus状态
            scope.tiIsFocused = false;

            // 密码框情况下，默认关闭autocomplete，避免浏览器弹出记住密码提示框引起的安全问题
            if (attrs["type"] === "password") {
                $element.attr("autocomplete", "off");
            }

            if (hasClear($element)) {
                addClear(scope, $element, attrs);
            }
        }

        function addBehavior(scope, $element, attrs) {
            $element.on('focus', function() {
                $element.trigger('tiFocus');
                scope.tiIsFocused = true;
                if (!_.isUndefined(attrs['focused'])) {
                    $parse(attrs['focused']).assign(scope, true);
                }
            });

            $element.on('blur', function() {
                $element.trigger('tiBlur');
                scope.tiIsFocused = false;
                if (!_.isUndefined(attrs['focused'])) {
                    $parse(attrs['focused']).assign(scope, false);
                }
            });

            if (hasClear($element)) {
                // 点击清除按钮事件，清空输入框内容
                $('.ti-text-clear', $element.parent()).on("mousedown", function() {
                    if (!_.isUndefined($element.attr("disabled"))) {
                        return;
                    }

                    $element.val("");

                    // 产品使用ngModel时，必须将其对应变量置空，否则会导致用户取到的变量值也是之前值
                    if (!_.isUndefined(attrs['ngModel'])) {
                        $parse(attrs['ngModel']).assign(scope, "");
                    }
                    scope.$evalAsync();

                    contentChangeHandler();

                    setTimeout(function(){
                        $element.trigger('focus');
                    }, 0);
                });
            }

            // 校验部分的说明：因为涉及到JS修改情况下的变量，因此输入框中的值不通过tiValue设置，
            // 可直接通过原生$element[0].value方式获取最新值
            // contentChange事件提供
            function contentChangeHandler(){
                $element.trigger("contentChange");
            }

            // 注册输入框的input，但IE下的剪切、Backspace和Delete键无效
            $element.on("input", function(event){
                contentChangeHandler();
            });

            var utils = window.tiny.utils;
            if (utils.browser.ie && (utils.browser.version < 10)) {
                // IE下不支持剪切引起的改变
                $element.on("cut", function(event){
                    setTimeout(function() {
                        contentChangeHandler();
                    }, 0);
                });

                $element.on("keyup", function(event){
                    if(8 == event.keyCode || 46== event.keyCode){
                        contentChangeHandler();
                    }
                });
            }

            // IE下Tab键获取焦点时，内容全部选中功能实现
            if (utils.browser.ie && attrs["type"] === "password") {
                var keyupHandler = function (event) {
                    if (event.keyCode === 9 && $element[0] === document.activeElement) {
                        $element[0].select();
                    }
                }
                var $document = angular.element(document);
                $document.bind("keyup", keyupHandler);

                $element.on("$destroy",function(){
                    $document.unbind("keyup", keyupHandler);
                });
            }
        }

        function addWatcher(scope, $element, attrs) {
            if (!_.isUndefined(attrs['placeholderText'])) {
                scope.$watch(attrs['placeholderText'], function(newValue) {
                    window.tiny.utils.placeholder.setPlaceholder($element[0], newValue);
                });
            }

            if (!_.isUndefined(attrs['focused'])) {
                scope.$watch(attrs['focused'], function(newValue) {
                    // 如果输入框处于blur状态，并且新的focused值为true时，触发focus事件
                    // 如果输入框处于focus状态，并且新的focused值为false时，触发focus事件
                    if (newValue === true && scope.tiIsFocused === false) {
                        $element.trigger('focus');
                    } else if (newValue === false && scope.tiIsFocused === true) {
                        $element.trigger('blur');
                    }
                });
            }
        }

        function hasClear($element) {
            return !_.isUndefined($element.parent().attr("ti-clear"));
        }

        function addClear(scope, $element, attrs) {
            // 获取父容器DOM，并添加对应样式
            var $parent = $element.parent();
            $parent.addClass("ti-text-clear-container");

            // 生成clear按钮DOM，并放到父容器当中
            var $clear = $('<div class="ti-text-clear ti-icon ti-icon-clear"></div>');
            $parent.append($clear);

            scope.$watch(function(){
                return $element.val();
            }, function(newValue){
                if (_.isString(newValue) && newValue !== "") {
                    $clear.css("display", "block");
                    $element.addClass("ti-text-input-show-clear");
                } else {
                    $clear.css("display", "none");
                    $element.removeClass("ti-text-input-show-clear");
                }
            });
        }
    }

    return module.name;
})


;
/**
 * @description
 * AngularJS version of the textarea directive.
 * 定义ti-textarea,最终返回module名
 */

define('components/textarea/textarea',["components/module"],
    function(module) {
        'use strict';
        module.directive('tiTextarea', tiTextarea);

        function tiTextarea() {
            var directive = {
                restrict: 'A',
                link: function (scope, $element, attrs) {
                    var utils = window.tiny.utils;

                    // autofocus功能实现
                    if(utils.browser.ie && (utils.browser.version < 10) && (attrs['autofocus'] !== undefined)) {
                        $element[0].focus();
                    }

                    // 需要支持placeholder动态更新
                    scope.$watch(function () {
                        return scope.$eval(attrs['placeholderText']);
                    }, function(newValue) {
                        utils.placeholder.setPlaceholder($element[0], newValue);
                    });

                    $element.on('focus', function() {
                        $element.trigger('tiFocus');
                    });

                    $element.on('blur', function() {
                        $element.trigger('tiBlur');
                    });

                    // 校验部分的说明：因为涉及到JS修改情况下的变量，因此输入框中的值不通过tiValue设置，可直接通过原生$element[0].value方式获取最新值
                    // contentChange事件提供
                    function contentChangeHandler(event){
                        $element.trigger("contentChange");
                    };

                    // 注册输入框的input，但IE下的剪切、Backspace和Delete键无效
                    $element.on("input", function(event){
                        contentChangeHandler(event);
                    });

                    if (utils.browser.ie && (utils.browser.version < 10)) {
                        // IE下不支持剪切引起的改变
                        $element.on("cut", function(event){
                            setTimeout(function() {
                                contentChangeHandler(event);
                            }, 0);
                        });

                        $element.on("keyup", function(event){
                            if(8 == event.keyCode || 46== event.keyCode){
                                contentChangeHandler(event);
                            }
                        });
                    }
                }
            };
            return directive;
        }
        return module.name;
    }
);

define('components/time/time',["components/module"],
    function(module) {
        'use strict';

        module.provider("timeService", timeService)
        function timeService() {
            this.constant = {
                "UP_DOWN_TRIANGLE_HEIGHT" : 5    //上下调节三角宽度
            };

            this.defaultValue = {
                format : "HH:mm:ss",
                maxValue : "23:59:59",
                minValue : "0:0:0"
            };

            this.$get = function() {
                var service = {
                    constant : this.constant,
                    defaultValue : this.defaultValue
                };
                return service;
            }
        }

        module.directive("tiTime", tiTime);
        tiTime.$inject = ["$filter","timeService"];
        function tiTime($filter, timeService) {
            return {
                restrict : "E",
                priority : 999,
                scope : {
                    format : "=", // 时间格式设置。格式：HH/H/hh/h : mm/m : ss/s
                    value : "=", // 时间值。格式：时：分：秒
                    maxValue : "=", //设置时间最大值。格式参考value
                    minValue : "=", //设置时间最小值。格式参考value
                    disable : "=",
                    change : "&", // 内容改变时触发的回调函数，参数：改变后value
                    blur : "&" // 整个输入框失去焦点时的回调函数，参数：改变后value
                },
                templateUrl : "/tiny-components/src/components/time/time.html",
                replace : true,
                link : linkFn
            };

            function linkFn(scope, $element, attrs) {
                init(scope, $element);

                addBehavior(scope, $element);

                addWatcher(scope, $element);
            }

            function init(scope, $element) {
                // 时间格式校验
                validateFormat(scope);

                // 初始化全局变量
                initVariable(scope);

                // 设置最小宽度
                setMinWidth(scope, $element);

                // 最大最小值校验
                validateMaxAndMin(scope);

                // value值校验
                validateValue(scope);

                // 对value进行格式化
                formatValue(scope);
            }

            function validateFormat(scope) {
                scope.format = _.isString(scope.format) ? scope.format : timeService.defaultValue.format;
            }

            function initVariable(scope) {
                // 各个时间段显示的值
                scope.showValue = {
                    hour : "00",
                    minute : "00",
                    second : "00",
                    ampm : "AM"
                };

                // 各个时间段格式
                var formatArr = scope.format.split(":");
                scope.formats = {
                    hour : formatArr[0],
                    minute : formatArr[1],
                    second : formatArr[2]
                };

                // 各个时间段是否显示
                scope.show = {
                    minute : scope.formats.minute === "m" || scope.formats.minute === "mm",
                    second : scope.formats.second === "s" || scope.formats.second === "ss",
                    ampm : scope.formats.hour === "hh" || scope.formats.hour === "h"
                }
            }

            function validateMaxAndMin(scope) {
                // 最大值合法性校验
                scope.maxValue = isValidTime(scope.maxValue) ? scope.maxValue : timeService.defaultValue.maxValue;

                // 最小值合法性校验
                scope.minValue = isValidTime(scope.minValue) ? scope.minValue : timeService.defaultValue.minValue;

                // 最大最小值矛盾时，设置为默认值
                if (isSmaller(scope.maxValue, scope.minValue)) {
                    scope.maxValue = timeService.defaultValue.maxValue;
                    scope.minValue = timeService.defaultValue.minValue;
                }
            }

            function validateValue(scope) {
                // 非法时间时，设置为当前时间
                if (!isValidTime(scope.value)) {
                    scope.value = $filter('date')(new Date(), addAmpmFormat(scope));
                }

                // 最小值校验
                if (isSmaller(scope.value, scope.minValue)) {
                    scope.value = scope.minValue;
                }

                // 最大值校验
                if (isBigger(scope.value, scope.maxValue)) {
                    scope.value = scope.maxValue;
                }
            }

            function formatValue(scope) {
                // 格式化value
                var date = new Date("2015/2/14 " + addColon(scope.value));
                scope.value = $filter('date')(date, addAmpmFormat(scope));

                // 输入框显示的小时
                scope.showValue.hour = $filter('date')(date, scope.formats.hour);

                // 输入框显示的分钟
                if (scope.show.minute) {
                    scope.showValue.minute = $filter('date')(date, scope.formats.minute);
                }

                // 输入框显示的秒
                if (scope.show.second) {
                    scope.showValue.second = $filter('date')(date, scope.formats.second);
                }

                // 输入框显示的ampm
                if (scope.show.ampm) {
                    scope.showValue.ampm = $filter('date')(date, "a");
                }
            }

            function addBehavior(scope, $element) {
                addBtnMousedownFn(scope, $element);
                addTimeKeyupFn(scope);
                addTimeFocusFn(scope);
                addTimeChangeFn(scope);
                addTimeBlurFn(scope, $element)
            }

            function addBtnMousedownFn(scope , $element) {
                scope.focusedTime = "hour"; // 初始生成时，点击上下按钮，改变小时值

                // 点击向上向下按钮，改变用户最后焦点所在输入框对应的时间值
                scope.btnUpMousedown = function() {
                    if (scope.disable) {
                        return;
                    }

                    var event = {
                        keyCode : 38,
                        target : $("[ng-model='showValue." + scope.focusedTime + "']", $element)[0]
                    }
                    scope[scope.focusedTime + "Keyup"](event);
                };

                scope.btnDownMousedown = function() {
                    if (scope.disable) {
                        return;
                    }

                    var event = {
                        keyCode : 40,
                        target : $("[ng-model='showValue." + scope.focusedTime + "']", $element)[0]
                    }
                    scope[scope.focusedTime + "Keyup"](event);
                };
            }

            function addTimeKeyupFn(scope) {
                scope.hourKeyup = function($event) {
                    var hourValue;
                    var hourFormat = scope.formats.hour;
                    //向上键
                    if (38 === $event.keyCode) {
                        hourValue = +scope.showValue.hour;
                        if (isTwelveTime(hourFormat)) {
                            if (hourValue >= 12) {
                                hourValue = 1;
                            } else {
                                hourValue += 1;
                            }
                        } else {
                            if (hourValue >= 23) {
                                hourValue = 0;
                            } else {
                                hourValue += 1;
                            }
                        }
                        scope.showValue.hour = (hourFormat === "hh" || hourFormat === "HH") ? addZero(hourValue, 2) : hourValue;
                        scope.value = getShowValue(scope);
                        setTimeSelected($event.target);
                        return;
                    }

                    //向下键
                    if (40 === $event.keyCode) {
                        hourValue = +scope.showValue.hour;
                        if (isTwelveTime(hourFormat)) {
                            if (hourValue <= 1 || hourValue > 12) {
                                hourValue = 12;
                            } else {
                                hourValue -= 1;
                            }
                        } else {
                            if (hourValue === 0 || hourValue > 23) {
                                hourValue = 23;
                            } else {
                                hourValue -= 1;
                            }
                        }
                        scope.showValue.hour = hourFormat === "hh" || hourFormat === "HH" ? addZero(hourValue, 2) : hourValue;
                        scope.value = getShowValue(scope);
                        setTimeSelected($event.target);
                    }
                };

                scope.minuteKeyup = function($event) {
                    var minuteValue;
                    var minuteFormat = scope.formats.minute;
                    if (38 === $event.keyCode) {//向上键
                        minuteValue = +scope.showValue.minute;
                        if (minuteValue >= 59) {
                            minuteValue = 0;
                        } else {
                            minuteValue += 1;
                        }
                        scope.showValue.minute = minuteFormat === "mm" ? addZero(minuteValue, 2) : minuteValue;
                        scope.value = getShowValue(scope);
                        setTimeSelected($event.target);
                        return;
                    }

                    if (40 === $event.keyCode) {//向下键
                        minuteValue = +scope.showValue.minute;
                        if (minuteValue === 0 || minuteValue > 59) {
                            minuteValue = 59;
                        } else {
                            minuteValue -= 1;
                        }
                        scope.showValue.minute = minuteFormat === "mm" ? addZero(minuteValue, 2) : minuteValue;
                        scope.value = getShowValue(scope);
                        setTimeSelected($event.target);
                    }
                };

                scope.secondKeyup = function($event) {
                    var secondValue;
                    var secondFormat = scope.formats.second;
                    if (38 === $event.keyCode) {//向上键
                        secondValue = +scope.showValue.second;
                        if (secondValue >= 59) {
                            secondValue = 0;
                        } else {
                            secondValue += 1;
                        }
                        scope.showValue.second = secondFormat === "ss" ? addZero(secondValue, 2) : secondValue;
                        scope.value = getShowValue(scope);
                        setTimeSelected($event.target);
                        return;
                    }

                    if (40 === $event.keyCode) {//向下键
                        secondValue = +scope.showValue.second;
                        // 用户键盘输入一个大于59的数字后，按向下键时，直接变成59
                        if (secondValue === 0 || secondValue > 59) {
                            secondValue = 59;
                        } else {
                            secondValue -= 1;
                        }
                        scope.showValue.second = secondFormat === "ss" ? addZero(secondValue, 2) : secondValue;
                        scope.value = getShowValue(scope);
                        setTimeSelected($event.target);
                    }
                };

                scope.ampmKeyup = function($event) {
                    if (38 === $event.keyCode || 40 === $event.keyCode) {
                        var ampmValue;
                        ampmValue = scope.showValue.ampm;
                        scope.showValue.ampm = (ampmValue === "AM") ? "PM" : "AM";
                        scope.value = getShowValue(scope);
                        setTimeSelected($event.target);
                    }
                };
            }

            function addTimeFocusFn(scope) {
                scope.hourFocus = function($event) {
                    scope.focusedTime = "hour";
                    $event.target.select();
                };
                scope.minuteFocus = function($event) {
                    scope.focusedTime = "minute";
                    $event.target.select();
                };
                scope.secondFocus = function($event) {
                    scope.focusedTime = "second";
                    $event.target.select();
                };
                scope.ampmFocus = function($event) {
                    scope.focusedTime = "ampm";
                    $event.target.select();
                };
            }

            function addTimeChangeFn(scope) {
                scope.hourChange = function() {
                    scope.showValue.hour = getNumStr(scope.showValue.hour);
                    scope.value = getShowValue(scope);
                };
                scope.minuteChange = function() {
                    scope.showValue.minute = getNumStr(scope.showValue.minute);
                    scope.value = getShowValue(scope);
                };
                scope.secondChange = function() {
                    scope.showValue.second = getNumStr(scope.showValue.second);
                    scope.value = getShowValue(scope);
                };
                scope.ampmChange = function() {
                    scope.value = getShowValue(scope);
                };
            }

            function addTimeBlurFn(scope, $element) {
                scope.hourBlur = function() {
                    blurFn(scope, $element);
                };
                scope.minuteBlur = function() {
                    blurFn(scope, $element);
                };
                scope.secondBlur = function() {
                    blurFn(scope, $element);
                };
                scope.ampmBlur = function() {
                    blurFn(scope, $element);
                };
            }

            function addWatcher(scope, $element) {
                scope.$watch("value", function(newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }

                    // 用户操作导致的改变，输入框中显示值与value值相同,不用再处理
                    if (scope.value === getShowValue(scope)) {
                        triggerChange(scope);
                        return;
                    }

                    // 动态改变后的value是个非法时间时，保持之前值不变
                    if (!isValidValue(scope)) {
                        scope.value = oldValue;
                        return;
                    }

                    formatValue(scope);
                    triggerChange(scope);
                });

                scope.$watch("minValue", function(newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }

                    // 新minValue值非法时，恢复到之前值
                    if (!isValidMinValue(scope)) {
                        scope.minValue = oldValue;
                        return;
                    }

                    // 对value值进行最小值校验
                    if (isValidTime(scope.value) && isSmaller(scope.value, scope.minValue)) {
                        scope.value = scope.minValue;
                    }
                });

                scope.$watch("maxValue", function(newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }

                    // 新maxValue值非法时，恢复到之前值
                    if (!isValidMaxValue(scope)) {
                        scope.maxValue = oldValue;
                        return;
                    }

                    // 对value值进行最小值校验
                    if (isValidTime(scope.value) && isBigger(scope.value, scope.maxValue)) {
                        scope.value = scope.maxValue;
                    }
                });

                scope.$watch("format", function(newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }

                    // 新format值非法时，恢复到之前值
                    if (!isValidFormat(scope)) {
                        scope.format = oldValue;
                        return;
                    }

                    // 重置各个时间段格式
                    var formatArr = scope.format.split(":");
                    scope.formats = {
                        hour : formatArr[0],
                        minute : formatArr[1],
                        second : formatArr[2]
                    };

                    // 各个时间段是否显示
                    scope.show = {
                        minute : scope.formats.minute === "m" || scope.formats.minute === "mm",
                        second : scope.formats.second === "s" || scope.formats.second === "ss",
                        ampm : scope.formats.hour === "hh" || scope.formats.hour === "h"
                    };

                    setMinWidth(scope, $element);

                    if (isValidTime(scope.value)) {
                        formatValue(scope);
                    }
                });
            }

            // 比较value1和value2两个时间值大小.value1 < value2时，返回true；否则返回false；
            function isSmaller(value1, value2) {
                return Date.parse("2015/2/14 " + addColon(value1)) < Date.parse("2015/2/14 " + addColon(value2));
            }

            // 比较value1和value2两个时间值大小.value1 > value2时，返回true；否则返回false；
            function isBigger(value1, value2) {
                return Date.parse("2015/2/14 " + addColon(value1)) > Date.parse("2015/2/14 " + addColon(value2));
            }

            // 比较value1和value2两个时间值大小.value1 < value2时，返回true；否则返回false；
            function isSmallerOrEquel(value1, value2) {
                return Date.parse("2015/2/14 " + addColon(value1)) <= Date.parse("2015/2/14 " + addColon(value2));
            }

            // 比较value1和value2两个时间值大小.value1 > value2时，返回true；否则返回false；
            function isBiggerOrEquel(value1, value2) {
                return Date.parse("2015/2/14 " + addColon(value1)) >= Date.parse("2015/2/14 " + addColon(value2));
            }


            function addAmpmFormat(scope) {
                if (isTwelveTime(scope.formats.hour)) {
                    return scope.format + " a"; // AngularJS的$filter服务获取时间时，"a"代表AMPM
                } else {
                    return scope.format;
                }
            }

            function getShowValue(scope) {
                var time = scope.showValue;
                var hour = (time.hour + "").trim();
                var value = hour +
                    (scope.show.minute ? ":" + time.minute : "") +
                    (scope.show.second ? ":" + time.second : "") +
                    (scope.show.ampm ? " " + time.ampm : "");
                return value;
            }

            function getNumStr(timeValue) {
                var numStrArr = (timeValue + "").split("");
                var numStr = "";
                // 剔除非数字字符
                _.each(numStrArr, function(value) {
                    if (value.match(/[0-9]/)) {
                        numStr += value;
                    }
                });

                return numStr;
            }

            function isInnerInputFocused($element) {
                var isFocused = false;
                var $input = $("input", $element);
                for(var i = 0; i < $input.length; i++) {
                    if ($input[i] === document.activeElement) {
                        isFocused = true;
                        break;
                    }
                }

                return isFocused;
            }

            function setTimeSelected(element) {
                // 放置在setTimeout中原因：保证输入框中内容已经被AngularJS更新完毕
                setTimeout(function() {
                    element.select();
                }, 0);
            }

            function blurFn(scope, $element) {
                // setTimeout的作用是为了保证focus已经触发
                setTimeout(function() {
                    if (isInnerInputFocused($element)) {
                        return;
                    }

                    // $evalAsync作用是保证本次校验后的值能更新到视图上
                    scope.$evalAsync(function() {
                        validateValue(scope);
                        formatValue(scope);

                        // 这里加setTimeout的原因：保证value值的改变已经通知到与其绑定的外部scope上的value
                        setTimeout(function(){
                            if (_.isFunction(scope.blur())) {
                                scope.blur()(scope.value);
                            }
                        }, 0);
                    });
                }, 0);
            }

            function isValidTime(time) {
                // value非字符串或者为空字符串时，为非法时间
                if (!_.isString(time) || time.trim() === "") {
                    return false;
                }

                var date = new Date("2015/2/14 " + addColon(time));
                return !(date == "Invalid Date"); // 注意：这里必须用两个等号，三个等号永远不等
            }

            function isTwelveTime(hourFormat) {
                return hourFormat === "hh" || hourFormat === "h";
            }

            function addZero(num, length) {
                var zeroNum = "00" + num;
                return zeroNum.substr(zeroNum.length - length, length);
            }

            function addColon(value) {
                //new Date()时，时间中没有一个冒号得到的是非法时间
                if (value.match(/:/)) {
                    return value;
                } else {
                    var ampm =  value.match(/am|AM|pm|PM/);
                    ampm = !!ampm ? ampm : "";
                    return parseInt(value, 10) + ": " + ampm;
                }
            }

            function setMinWidth(scope, $element) {
                // 只有小时情况：边框2px + hour输入框20px + 上下按钮17px + 编辑区左内边距8px + 输入框和上下按钮间2px
                var minWidth = 49;

                minWidth = minWidth +
                    (scope.show.minute ? 23 : 0) + // minute输入框20px + 左侧冒号及空白3px
                    (scope.show.second ? 23 : 0) + // second输入框20px + 左侧冒号及空白3px
                    (scope.show.ampm ? 20 : 0); // ampm输入框20px

                $element.css("min-width", minWidth + "px");
            }

            function isValidValue(scope) {
                var value = scope.value;
                return isValidTime(value) && isBiggerOrEquel(value, scope.minValue) && isSmallerOrEquel(value, scope.maxValue);
            }

            function triggerChange(scope) {
                if (_.isFunction(scope.change())) {
                    scope.change()(scope.value);
                }
            }

            function isValidMinValue(scope) {
                var minValue = scope.minValue;
                return isValidTime(minValue) && isSmallerOrEquel(minValue, scope.maxValue);
            }

            function isValidMaxValue(scope) {
                var maxValue = scope.maxValue;
                return isValidTime(maxValue) && isBiggerOrEquel(maxValue, scope.minValue);
            }

            function isValidFormat(scope) {
                return _.isString(scope.format);
            }
        }

        return module.name;
    }
);

/**
 * @description
 * AngularJS version of the tiModal service.
 * tiModal服务用来实现弹出框功能
 */

define('components/modal/modal',['components/module'],
    function (module) {
        'use strict';

        module.constant('tiModalConst', {

            // modal打开时添加的样式类
            modalOpenedClass: 'ti-modal-open',

            // 用于监听modal关闭事件的名称,内部使用
            nowClosing: 'tiModal.nowClosing',

            // 可以获取焦点的元素选择器列表
            tababbleSelector: 'a[href], area[href], input:not([disabled]), ' +
                'button:not([disabled]),select:not([disabled]), textarea:not([disabled]), ' +
                'iframe, object, embed, *[tabindex], *[contenteditable=true]',

            // modal将要关闭时的回调函数，属于对外接口
            onClosing: 'tiModal.onClosing'

        });

        module.provider('tiModal', function () {
            var defaults = this.defaults = {
                animation: true,
                backdrop: 'static', // 还可以设置为false或'static'
                closeOnEsc: true,
                draggable: true
            };

            // 开发者在angular应用的config阶段可以调用setDefaults方法来配置默认值
            this.setDefaults = function (newDefaults) {
                angular.extend(defaults, newDefaults);
            };

            this.$get = ['$rootScope', '$q', '$injector', '$document', '$templateRequest', '$controller', 'tiModalProcessor',
                function ($rootScope, $q, $injector, $document,
                          $templateRequest, $controller, tiModalProcessor) {
                    // 之前尚未执行完毕的promise，如正处于打开状态中的其他modal
                    var prePromise = null;

                    // 返回tiModal服务的实例，只包含一个open方法
                    return {
                        open: open
                    };

                    function open(options) {
                        // 合并和初始化开发者传过来的options
                        var modalOptions = setOptions(options);

                        // 检验生成modal的必要参数是否合法，不合法则给出报错提示
                        verifyOptions(modalOptions);

                        // modal被执行close时resolve,modal被执行dismiss时reject
                        var resultDeferred = $q.defer();
                        // modal被打开时resolve，此时所需数据已经加载完毕
                        var openedDeferred = $q.defer();
                        // modal被关闭（包括执行close和dismiss），且动画全部结束时resolve
                        var closedDeferred = $q.defer();
                        // modal渲染完毕时resolve，此时modal已经呈现在页面中
                        var renderDeferred = $q.defer();

                        // open方法最终返回的modal实例，供开发者调用
                        var modalInstance = {
                            resultPromise: resultDeferred.promise,
                            openedPromise: openedDeferred.promise,
                            closedPromise: closedDeferred.promise,
                            renderedPromise: renderDeferred.promise,
                            close: function (result) {
                                return tiModalProcessor.close(modalInstance, result);
                            },
                            dismiss: function (reason) {
                                return tiModalProcessor.dismiss(modalInstance, reason);
                            }
                        };

                        // modal生成前需要准备两项数据：
                        // 1.modal内容模板
                        // 2.开发者传递的resolve参数
                        var templateAndResolvePromise = $q.all([getTemplate(modalOptions)].concat(
                            getResolvePromises(modalOptions.resolve)));
                        function resolveCurrentPromise() {
                            return templateAndResolvePromise;
                        }

                        var curPromise;
                        // 等待之前的promise被处理完毕
                        // 然后处理当前的promise（不受之前promise处理结果的影响）
                        curPromise = prePromise = $q.all([prePromise])
                            .then(resolveCurrentPromise, resolveCurrentPromise)
                            .then(function resolveSuccess(tplAndVars) {
                                // 初始化modal对应的scope
                                var modalScope = initModalScope();

                                // 实例化modal对应的controller
                                instantController(tplAndVars, modalScope);

                                tiModalProcessor.open(modalInstance, {
                                    modalScope: modalScope,
                                    deferred: resultDeferred,
                                    renderDeferred: renderDeferred,
                                    closedDeferred: closedDeferred,
                                    content: tplAndVars[0], // 加载的template模板
                                    animation: modalOptions.animation,
                                    backdrop: modalOptions.backdrop,
                                    closeOnEsc: modalOptions.closeOnEsc,
                                    modalClass: modalOptions.modalClass,
                                    modalTemplateUrl: modalOptions.modalTemplateUrl,
                                    appendTo: modalOptions.appendTo,
                                    showCloseIcon: modalOptions.showCloseIcon,
                                    draggable: modalOptions.draggable
                                });

                                // modal被打开时resolve
                                openedDeferred.resolve(true);
                            }, function resolveError(reason) {
                                openedDeferred.reject(reason);
                                resultDeferred.reject(reason);
                            }).finally(function () {
                                if (prePromise === curPromise) {
                                    prePromise = null;
                                }
                            });

                        return modalInstance;

                        function initModalScope() {
                            var parentScope = modalOptions.scope || $rootScope;
                            var modalScope = parentScope.$new();
                            modalScope.closeTiDialog = modalInstance.close;
                            modalScope.dismissTiDialog = modalInstance.dismiss;

                            modalScope.$on('$destroy', function () {
                                if (!modalScope.isDestroyed) {
                                    modalScope.dismissTiDialog('forced to destroyed');
                                }
                            });

                            return modalScope;
                        }

                        function instantController(tplAndVars, modalScope) {
                            if (modalOptions.controller) {
                                var ctrlInstance;
                                var locals = {};
                                // 第0项为加载的template模板，之后的数据才属于resolve数据
                                var resolveIndex = 1;
                                // 开发者在modal对应的controller中可以依赖注入modal实例:tiModalInstance
                                locals.tiModalInstance = modalInstance;

                                locals.$scope = modalScope;
                                // 开发者通过controller可以依赖注入resolve传入的数据
                                angular.forEach(modalOptions.resolve, function (value, key) {
                                    locals[key] = tplAndVars[resolveIndex++];
                                });

                                ctrlInstance = $controller(modalOptions.controller, locals);
                                if (modalOptions.controllerAs) {
                                    modalScope[modalOptions.controllerAs] = ctrlInstance;
                                }
                            }
                        }
                    }

                    // 返回获取modal内容模板的promise
                    // 开发者设置modal内容模板的方式可以直接是字符串模板（template）
                    // 也可以是URL形式的模板路径(templateURL)
                    function getTemplate(options) {
                        var deferred = $q.defer();
                        var template = options.template;
                        var templateUrl = options.templateUrl;
                        if (template) {
                            deferred.resolve(template);
                        } else if (templateUrl) {
                            $templateRequest(templateUrl, true)
                                .then(function (contentTemplate) {
                                    deferred.resolve(contentTemplate);
                                }, function (error) {
                                    deferred.reject(error);
                                });
                        }
                        return deferred.promise;
                    }


                    function getResolvePromises(resolves) {
                        var promises = [];

                        angular.forEach(resolves, function (value) {
                            if (angular.isFunction(value) || angular.isArray(value)) {
                                promises.push($q.when($injector.invoke(value)));
                            } else if (angular.isString(value)) { // 获取服务
                                promises.push($q.when($injector.get(value)));
                            } else {
                                promises.push($q.when(value));
                            }
                        });
                        return promises;
                    }

                    function verifyOptions(options) {
                        // 如果模板设置不存在，则直接在控制台提示错误
                        if (!options.template && !options.templateUrl) {
                            throw new Error('No template or templateUrl has been specified.');
                        // 如果用户设置的dom不存在，则直接在控制台提示错误
                        } else if (angular.element(options.appendTo).length === 0) {
                            throw new Error('appendTo element not found. Make sure that the element passed is in DOM.');
                        }
                    }

                    function setOptions(options) {
                        // 将用户设置和默认设置合并
                        var modalOptions = angular.extend({}, defaults, options);
                        modalOptions.resolve = options.resolve || {};
                        modalOptions.appendTo = options.appendTo || $document.find('body').eq(0);
                        return modalOptions;
                    }
                }
            ];
        });

        module.factory('tiModalProcessor', tiModalProcessorFn);
        tiModalProcessorFn.$inject = ['$animate', '$document', '$compile', '$rootScope', '$q', 'tiModalCache', 'tiModalConst'];
        function tiModalProcessorFn($animate, $document, $compile,
                                  $rootScope, $q, tiModalCache, tiModalConst) {
            var backdropDomEl;
            var backdropScope;
            var openedModals = tiModalCache.initCache(); // 初始化已打开Modal数组

            // Modal获取焦点相关设置
            var focusableElementList;

            var tiModalProcessor = {
                NOW_CLOSING: tiModalConst.nowClosing,
                open: open,
                close: close,
                dismiss: dismiss,
                dismissAll: dismissAll,
                getTop: getTop,
                modalRendered: modalRendered,
                focusFirstFocusableElement: focusFirstFocusableElement,
                focusLastFocusableElement: focusLastFocusableElement,
                isModalFocused: isModalFocused,
                isFocusInFirstItem: isFocusInFirstItem,
                isFocusInLastItem: isFocusInLastItem,
                clearFocusListCache: clearFocusListCache,
                getFocusElementList: getFocusElementList
            };

            function open(modalInstance, modal) {
                // 将当前要打开的modal放到openedModals列表中
                openedModals.add(modalInstance, {
                    deferred: modal.deferred,
                    renderDeferred: modal.renderDeferred,
                    closedDeferred: modal.closedDeferred,
                    modalScope: modal.modalScope,
                    backdrop: modal.backdrop,
                    closeOnEsc: modal.closeOnEsc,
                    animation: modal.animation,
                    appendTo: modal.appendTo,
                    draggable: modal.draggable,
                    modalClass: modal.modalClass
                });

                // 生成模态背景backdrop
                generateBackdrop(modal);

                // 生成弹框window,并返回对应的dom
                var modalDomEl = generateWindow(modal);

                // 缓存弹出框dom
                openedModals.top().value.modalDomEl = modalDomEl;

                // 获取当前处于focused状态的元素，并缓存起来
                openedModals.top().value.preActiveElement = $document[0].activeElement;

                tiModalProcessor.clearFocusListCache();
            }

            function close(modalInstance, result) {
                var modalWindow = openedModals.get(modalInstance);
                if (modalWindow && broadcastClosing(modalWindow, result, true)) {
                    modalWindow.value.modalScope.isDestroyed = true;
                    modalWindow.value.deferred.resolve(result);
                    removeModalWindow(modalInstance, modalWindow.value.preActiveElement);
                    return true;
                }
                return !modalWindow;
            }

            function dismiss(modalInstance, reason) {
                var modalWindow = openedModals.get(modalInstance);
                if (modalWindow && broadcastClosing(modalWindow, reason, false)) {
                    modalWindow.value.modalScope.isDestroyed = true;
                    modalWindow.value.deferred.reject(reason);
                    removeModalWindow(modalInstance, modalWindow.value.preActiveElement);
                    return true;
                }
                return !modalWindow;
            }

            function dismissAll(reason) {
                var topModal = tiModalProcessor.getTop();
                while (topModal && tiModalProcessor.dismiss(topModal.key, reason)) {
                    topModal = tiModalProcessor.getTop();
                }
            }

            function getTop() {
                return openedModals.top();
            }

            function modalRendered(modalInstance) {
                var modalWindow = openedModals.get(modalInstance);
                if (modalWindow) {
                    modalWindow.value.renderDeferred.resolve();
                }
            }

            function focusFirstFocusableElement() {
                if (focusableElementList.length > 0) {
                    focusableElementList[0].focus();
                    return true;
                }
                return false;
            }

            function focusLastFocusableElement() {
                if (focusableElementList.length > 0) {
                    focusableElementList[focusableElementList.length - 1].focus();
                    return true;
                }
                return false;
            }

            function isModalFocused(evt, modalWindow) {
                if (evt && modalWindow) {
                    var modalDomEl = modalWindow.value.modalDomEl;
                    if (modalDomEl && modalDomEl.length) {
                        return (evt.target || evt.srcElement) === modalDomEl[0];
                    }
                }
                return false;
            }

            function isFocusInFirstItem(evt) {
                if (focusableElementList.length > 0) {
                    return (evt.target || evt.srcElement) === focusableElementList[0];
                }
                return false;
            }

            function isFocusInLastItem(evt) {
                if (focusableElementList.length > 0) {
                    return (evt.target ||
                        evt.srcElement) === focusableElementList[focusableElementList.length - 1];
                }
                return false;
            }

            function clearFocusListCache() {
                focusableElementList = [];
            }

            function getFocusElementList(modalWindow) {
                if (focusableElementList === undefined || !focusableElementList.length) {
                    if (modalWindow) {
                        var modalDomE1 = modalWindow.value.modalDomEl;
                        if (modalDomE1 && modalDomE1.length) {
                            focusableElementList = modalDomE1[0].querySelectorAll(
                                tiModalConst.tababbleSelector);
                        }
                    }
                }
            }

            function getTopBackdropIndex() {
                var topBackdropIndex = -1;
                var opened = openedModals.keys();
                for (var i = 0; i < opened.length; i++) {
                    if (openedModals.get(opened[i]).value.backdrop) {
                        topBackdropIndex = i;
                    }
                }
                return topBackdropIndex;
            }

            $rootScope.$watch(getTopBackdropIndex, function (newBackdropIndex) {
                if (backdropScope) {
                    backdropScope.index = newBackdropIndex;
                }
            });

            function removeModalWindow(modalInstance, preActiveElement) {
                var modalWindow = openedModals.get(modalInstance).value;
                var appendToElement = modalWindow.appendTo;

                // 将要关闭的modal从openedModals中移除
                openedModals.remove(modalInstance);

                // 删除弹出框DOM，并处理closedDeferred
                removeElement(modalWindow.modalDomEl, modalWindow.modalScope, function () {
                    $animate.removeClass(appendToElement, tiModalConst.modalOpenedClass);
                }, modalWindow.closedDeferred);

                // 当前打开的弹出框均不需要backdrop时，删除backdrop（note：多个弹出框并存时，共用一个backdrop）
                backdropDomEl && (getTopBackdropIndex() === -1) && removeBackdrop();

                // modal关闭后，将焦点放到原来获取焦点的元素上
                // 如果之前不存在获取焦点的元素，则将焦点放到appendToElement上
                if (preActiveElement && preActiveElement.focus) {
                    preActiveElement.focus();
                } else if (appendToElement.focus) {
                    appendToElement.focus();
                }
            }

            function removeBackdrop() {
                removeElement(backdropDomEl, backdropScope, function () {
                    backdropScope = null;
                });
                backdropDomEl = undefined;
                backdropScope = undefined;
            }

            function removeElement(domEl, scope, done, closedDeferred) {
                var deferred;
                var promise = null;

                scope.$broadcast(tiModalProcessor.NOW_CLOSING, promiseToResolve);

                return $q.when(promise).then(removeElementAndResolved);

                function promiseToResolve() {
                    if (!deferred) {
                        deferred = $q.defer();
                        promise = deferred.promise;
                    }

                    return function resolveDeferred() {
                        deferred.resolve();
                    };
                }

                function removeElementAndResolved() {
                    if (removeElementAndResolved.done) {
                        return;
                    }
                    removeElementAndResolved.done = true;

                    $animate.leave(domEl).then(function () {
                        if (closedDeferred) {
                            closedDeferred.resolve();
                        }
                    });

                    scope.$destroy();
                    if (done) {
                        done();
                    }
                }
            }

            $document.on('keydown', keydownListener);

            $rootScope.$on('$destroy', function () {
                $document.off('keydown', keydownListener);
            });

            function keydownListener(evt) {
                // 以下事件是弹出框中的快捷键操作
                // 如果开发者关闭了了浏览器默认行为，则以下事件处理不再触发
                if (evt.isDefaultPrevented()) {
                    return evt;
                }

                var modal = openedModals.top(); // 只对最外层弹出框触发事件
                if (modal) {
                    switch (evt.which) {
                        case 27: { // close on ESC
                            if (modal.value.closeOnEsc) {
                                evt.preventDefault();
                                $rootScope.$evalAsync(function () {
                                    tiModalProcessor.dismiss(modal.key, 'escape key press');
                                });
                            }
                            break;
                        }
                        case 9: { // tab键
                            tiModalProcessor.getFocusElementList(modal); // 获取当前弹出框DOM中可以获取焦点的元素列表
                            var focusChanged = false;
                            if (evt.shiftKey) {
                                // 如果当前已获取焦点元素是弹出框中的第一个可获取焦点元素
                                // 或者是获取焦点的元素就是弹出框DOM本身
                                // 则按下tab+shift键，将焦点定位到弹出框中最后一个可获取焦点元素
                                if (tiModalProcessor.isFocusInFirstItem(evt) ||
                                    tiModalProcessor.isModalFocused(evt, modal)) {
                                    focusChanged = tiModalProcessor.focusLastFocusableElement();
                                }
                            } else if (tiModalProcessor.isFocusInLastItem(evt)) {
                                // 弹出框内的可获取焦点元素将循环获取焦点
                                focusChanged = tiModalProcessor.focusFirstFocusableElement();
                            }

                            if (focusChanged) {
                                evt.preventDefault();
                                evt.stopPropagation();
                            }
                            break;
                        }
                        default:
                            break;
                    }
                }
                return evt;
            }

            // 如果用户在modal内容对应的scope中绑定了tiModal.onClosing事件
            // 且在事件回调中执行了preventDefault(),则会阻止窗口的关闭
            function broadcastClosing(modalWindow, resultOrReason, closing) {
                var broadcastEvt = modalWindow.value.modalScope.$broadcast(tiModalConst.onClosing,
                    resultOrReason, closing);
                return !broadcastEvt.defaultPrevented;
            }

            function generateBackdrop(modal) {
                var appendToElement = modal.appendTo;
                var curBackdropIndex = getTopBackdropIndex();

                // 需要backdrop,且backdrop尚不存在的情况下,生成backdrop
                if (curBackdropIndex >= 0 && !backdropDomEl) {
                    // 不需要从$rootScope继承属性，因此生成孤立子scope
                    backdropScope = $rootScope.$new(true);
                    backdropScope.modalOptions = modal;
                    backdropScope.index = curBackdropIndex;
                    backdropDomEl = angular.element('<div ti-modal-backdrop></div>');
                    if (modal.animation) {
                        backdropDomEl.attr('ti-animation', 'true'); // 开启动画的标识
                    }
                    $compile(backdropDomEl)(backdropScope);
                    $animate.enter(backdropDomEl, appendToElement);
                }
            }

            // 生成window
            function generateWindow(modal) {
                var appendToElement = modal.appendTo;
                var modalDomEl = angular.element('<div ti-modal-window></div>');
                modalDomEl.attr({
                    'template-url': modal.modalTemplateUrl,
                    index: openedModals.length() - 1
                }).html(modal.content);
                if (modal.animation) {
                    modalDomEl.attr('ti-animation', 'true'); // 开启动画的标识
                }
                $animate.enter($compile(modalDomEl)(modal.modalScope), appendToElement)
                    .then(function () {
                        $animate.addClass(appendToElement, tiModalConst.modalOpenedClass);
                    });
                return modalDomEl;
            }

            return tiModalProcessor;
        }

        module.directive('tiModalTransclude', function () {
            return {
                link: function (scope, element, attrs, controller, transclude) {
                    transclude(scope.$parent, function (clone) {
                        element.empty();
                        element.append(clone);
                    });
                }
            };
        });

        module.directive('tiModalAnimationClass', function () {
            return {
                compile: function (tElement, tAttrs) {
                    if (tAttrs.tiAnimation) {
                        tElement.addClass(tAttrs.tiModalAnimationClass);
                    }
                }
            };
        });

        module.directive('tiModalWindow', tiModalWindow);
        tiModalWindow.$inject = ['tiModalProcessor', '$q', '$animate', '$document'];
        function tiModalWindow(tiModalProcessor, $q, $animate, $document) {
            var directive = {
                scope: {
                    index: '@'
                },
                replace: true,
                transclude: true,
                templateUrl: function (tElement, tAttrs) {
                    return tAttrs.templateUrl || '/tiny-components/src/components/modal/window.html';
                },
                link: linkFn
            };
            return directive;

            function linkFn(scope, element, attrs) {
                scope.close = function (evt) {
                    var modal = tiModalProcessor.getTop();
                    var isEnableToClose = modal &&
                        modal.value.backdrop &&
                        modal.value.backdrop !== 'static' &&
                        evt.target === evt.currentTarget;

                    if (isEnableToClose) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        tiModalProcessor.dismiss(modal.key, 'backdrop click');
                    }
                };

                // 当backdrop不是"static"时，点击背景区域将会关闭弹框
                element.on('click', scope.close);

                // 用来标识弹框是否渲染完毕
                scope.$isRendered = true;

                // modalRenderDeferObj在弹框渲染完毕后被resolve
                var modalRenderDeferObj = $q.defer();
                // 采用attrs.$observe的回调函数将在下一次angular digest循环时执行，
                // 通过这个方式来确保弹框DOM已经彻底渲染完毕
                attrs.$observe('modalRender', function (value) {
                    if (value === 'true') {
                        modalRenderDeferObj.resolve();
                    }
                });

                modalRenderDeferObj.promise.then(function () {
                    var modal = tiModalProcessor.getTop();

                    // draggable
                    if (modal && modal.value.draggable) {
                        // 此处用的是jQueryUI插件draggable，因此必须将dom用$或jQuery包裹，
                        // 获取jQuery对象，然后才能调用插件方法
                        $(modal.value.modalDomEl.find('.ti-modal-content')[0]).draggable({
                            handle: '.ti-modal-header',
                            containment: 'document'
                        });
                        modal.value.modalDomEl.find('.ti-modal-header').css('cursor', 'Move');
                    }

                    // 关闭按钮的图标
                    modal.value.modalDomEl.find('.ti-modal-header .ti-close').addClass('ti-icon ti-icon-close');

                    // 给modal添加自定义样式
                    if (modal && modal.value.modalClass) {
                        element.children().addClass(modal.value.modalClass);
                    }

                    var animationPromise = null;

                    if (attrs.modalInClass) {
                        animationPromise = $animate.addClass(element, attrs.modalInClass);

                        scope.$on(tiModalProcessor.NOW_CLOSING, function (e, setIsAsync) {
                            var done = setIsAsync();
                            $animate.removeClass(element, attrs.modalInClass).then(done);
                        });
                    }


                    $q.when(animationPromise).then(function () {
                        /**
                         * 首先判断新打开的modal是否已经存在获取焦点的元素
                         * 如果存在，则不需要对modal元素设置焦点
                         * 否则，对modal容器元素设置焦点
                         */
                        var isElementInModalFocused = $document[0].activeElement &&
                            element[0].contains($document[0].activeElement);
                        if (!isElementInModalFocused) {
                            // 找到第一个带有autoFocus属性的输入类元素
                            var inputWithAutofocus = element[0].querySelector('[autofocus]');

                            if (inputWithAutofocus) {
                                inputWithAutofocus.focus();
                            } else {
                                element[0].focus();
                            }
                        }

                        // 处理modalRendered的promise回调
                        if (modal) {
                            tiModalProcessor.modalRendered(modal.key);
                        }
                    });
                });
            }
        }

        module.directive('tiModalBackdrop', tiModalBackdrop);
        tiModalBackdrop.$inject = ['$animate', 'tiModalProcessor'];
        function tiModalBackdrop($animate, tiModalProcessor) {
            return {
                replace: true,
                templateUrl: '/tiny-components/src/components/modal/backdrop.html',
                link: linkFn
            };

            function linkFn(scope, element, attrs) {
                if (attrs.modalInClass) {
                    $animate.addClass(element, attrs.modalInClass);

                    scope.$on(tiModalProcessor.NOW_CLOSING, function (e, setIsAsync) {
                        var done = setIsAsync();
                        if (scope.modalOptions.animation) {
                            $animate.removeClass(element, attrs.modalInClass).then(done);
                        } else {
                            // 没有动画时，不删除modalInClass，是为了避免出现瞬间的纯黑色背景
                            // 根因是没有动画场景下，".fade"不存在
                            done();
                        }
                    });
                }
            }
        }

        module.service('tiModalCache', function () {
            this.initCache = function () {
                var cache = [];

                return {
                    add: function (key, value) {
                        cache.push({
                            key: key,
                            value: value
                        });
                    },
                    get: function (key) {
                        return _.find(cache, function (item) { return key === item.key; });
                    },
                    keys: function () {
                        var keys = [];
                        for (var i = 0; i < cache.length; i++) {
                            keys.push(cache[i].key);
                        }
                        return keys;
                    },
                    top: function () {
                        return cache[cache.length - 1];
                    },
                    remove: function (key) {
                        var idx = -1;
                        for (var i = 0; i < cache.length; i++) {
                            if (key === cache[i].key) {
                                idx = i;
                                break;
                            }
                        }
                        return cache.splice(idx, 1)[0];
                    },
                    removeTop: function () {
                        return cache.splice(cache.length - 1, 1)[0];
                    },
                    length: function () {
                        return cache.length;
                    }
                };
            };
        });

        return module.name;
    });


/**
 * @description
 * AngularJS version of the tiModal service.
 * tiModal服务用来实现弹出框功能
 */

define('components/message/message',['components/module', 'components/modal/modal'],
    function (module) {
        'use strict';

        // message的四种类型
        module.constant('tiMsgType', {
            prompt: 'prompt',
            error: 'error',
            warn: 'warn',
            confirm: 'confirm'
        });

        module.provider('tiMessage', tiMessage);
        tiMessage.$inject = ['tiMsgType'];
        function tiMessage(tiMsgType) {
            // 默认设置
            var defaults = this.defaults = {
                type: tiMsgType.confirm, // 默认为confirm类型
                content: '', // 消息框内容
                okBtn: true, // 默认显示确认按钮
                cancelBtn: true, // 默认显示取消按钮
                templateUrl: '/tiny-components/src/components/message/message.html', // 消息框模板
                controller: 'tiMessageCtrl', // 消息框模板对应的controller
                modalClass: 'ti-msg-default-width' // 用来设置消息框的默认宽度
            };

            // 开发者在angular应用的config阶段可以调用setDefaults方法来统一配置默认值
            this.setDefaults = function (newDefaults) {
                angular.extend(defaults, newDefaults);
            };

            this.$get = ['tiModal', function (tiModal) {
                // 返回tiMessage服务的实例，只包含一个open方法，供开发者调用
                return {
                    open: open
                };

                function open(options) {
                    // 将用户传入的设置与默认设置合并
                    var msgOptions = setOptions(options);
                    // 生成message
                    var msgInstance = tiModal.open(msgOptions);

                    return msgInstance;
                }

                function setOptions(options) {
                    // 将用户设置和默认设置合并
                    var msgOptions = angular.extend({}, defaults, options);
                    // 将msgOptions传到controller中使用
                    msgOptions.resolve = {
                        tiMsgOpts: msgOptions
                    };
                    return msgOptions;
                }
            }];
        }

        module.controller('tiMessageCtrl', tiMessageCtrl);
        tiMessageCtrl.$inject = ['$scope', 'tiModalInstance', 'tiMsgOpts', 'tiMsgType'];
        function tiMessageCtrl($scope, tiModalInstance, tiMsgOpts, tiMsgType) {
            var language = tiny.language || {};
            // 确认按钮的默认设置项
            var okBtnOpts = {
                show: true,
                text: language.ok_btn || '',
                click: function () {
                    tiModalInstance.close();
                }
            };
            // 取消按钮的默认设置项
            var cancelBtnOpts = {
                show: true,
                text: language.cancel_btn || '',
                click: function () {
                    tiModalInstance.dismiss();
                }
            };
            // 弹出框对应的model数据
            $scope.tiMsgModel = {
                tiMsgOpts: tiMsgOpts,
                type: tiMsgOpts.type,
                okBtn: setBtnOpts(tiMsgOpts.okBtn, okBtnOpts),
                cancelBtn: setBtnOpts(tiMsgOpts.cancelBtn, cancelBtnOpts),
                title: setTitle(tiMsgOpts.type),
                dismiss: function () { // 点击弹出框头部右上角关闭按钮时触发关闭
                    tiModalInstance.dismiss();
                }
            };

            tiModalInstance.setBtn = function (type, value) {
                if (type === 'ok') {
                    $scope.tiMsgModel.okBtn = setBtnOpts(value, $scope.tiMsgModel.okBtn);
                }

                $scope.tiMsgModel.cancelBtn = setBtnOpts(value, $scope.tiMsgModel.cancelBtn);
            };

            $scope.$on('tiModal.onClosing', function () {
                if (typeof tiMsgOpts.beforeClose === 'function') {
                    tiMsgOpts.beforeClose.apply(null, arguments);
                }
            });

            // 对按钮的设置支持Boolean型和Object类型
            // 1.为Object类型时，覆盖和扩展默认设置
            // 2.为非Object时，按照Boolean处理：true时，将按照默认设置显示；false时，则不显示按钮
            function setBtnOpts(userOpts, defaultOpts) {
                // 对象类型
                if ($.isPlainObject(userOpts)) {
                    return angular.extend({}, defaultOpts, userOpts);
                }

                // 下面按Boolean类型处理
                if (userOpts) {
                    return angular.extend({}, defaultOpts);
                }
                return angular.extend({}, defaultOpts, { show: false });
            }

            // 根据类型设置标题
            function setTitle(type) {
                var title = '';
                switch (type) {
                    case tiMsgType.prompt:
                        title = language.msg_prompt_title;
                        break;
                    case tiMsgType.warn:
                        title = language.msg_warn_title;
                        break;
                    case tiMsgType.error:
                        title = language.msg_error_title;
                        break;
                    // 其他情况按confirm处理
                    default:
                        title = language.msg_confirm_title;
                }
                return title;
            }
        }

        // 将用户设置的content进行解析后放到正确的位置
        module.directive('tiMsgTransclude', tiMsgTransclude);
        tiMsgTransclude.$inject = ['$compile'];
        function tiMsgTransclude($compile) {
            return {
                link: function (scope, element) {
                    var msgOpts = scope.tiMsgModel.tiMsgOpts;
                    var $contentDom = $('<div></div>').html(msgOpts.content);
                    if (msgOpts.scope) {
                        $contentDom = $compile($contentDom)(msgOpts.scope);
                    }
                    element.empty();
                    element.append($contentDom);
                }
            };
        }

        return module.name;
    });


/**
 * @description
 * AngularJS version of the tiPagination directive.
 * 实现分页功能,可以与tiTable标签配合使用，也可以单独使用；
 */
define('components/pagination/pagination',[
    'components/module'
], function (module) {
    'use strict';

    // 最小页码
    var MIN_PAGE = 1;

    module.provider('tiPageConfig', function () {
        // 分页默认配置
        var defaults = this.defaults = {
            template: '/tiny-components/src/components/pagination/pagination.html',
            currentPage: MIN_PAGE,
            totalItems: 0,
            pageSize: {
                options: [20, 40, 60, 80, 100],
                size: 20, // 默认每页显示20条
                width: '70px',
                change: null,
                hide: false
            },
            hideTotalItems: false,
            hideGotoLink: false,
            autoHide: false
        };

        // 开发者在angular应用的config阶段可以调用setDefaults方法来配置默认值
        this.setDefaults = function (newDefaults) {
            angular.extend(defaults, newDefaults);
        };

        this.$get = function () {
            return defaults;
        };
    });

    // 注册分页指令
    module.directive('tiPagination', tiPaginationDirective);
    // 注入依赖资源
    tiPaginationDirective.$inject = ['tiPageConfig', '$timeout'];
    // 定义分页指令
    function tiPaginationDirective(tiPageConfig, $timeout) {
        return {
            restrict: 'E',
            require: '?^^tiTable',
            replace: true,
            scope: {
                currentPage: '=?',
                totalItems: '=?',
                pageSize: '=?',
                hideTotalItems: '=?',
                hideGotoLink: '=?',
                autoHide: '=?',
                pageNumChange: '&',
                pageUpdate: '&'
            },
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || tiPageConfig.template;
            },
            link: tiPaginationLink
        };

        function tiPaginationLink(scope, element, attrs, ctrl) {
            initData(scope); // 初始化分页配置
            renderPage(scope, element, ctrl); // 根据配置渲染分页
            addWatcher(scope, element, ctrl); // 数据改变检查及处理
            addBehavior(scope); // 事件处理
        }

        function renderPage(scope, element, ctrl) {
            // 用户开启自动隐藏功能且无需显示分页时，隐藏分页
            if (scope.autoHide && !bNeedPagination(scope)) {
                scope.showPage = false;
                return;
            }

            // 总页数
            scope.totalPageNum = calculateTotalPages(scope);

            // 当前页不能大于总页数
            if (scope.currentPage > scope.totalPageNum) {
                scope.currentPage = scope.totalPageNum;
            }

            // goto页码与当前页保持一致
            scope.gotoPage = {
                page: scope.currentPage
            };

            // 页码列表
            scope.pages = getPages(scope);

            // 若分页与ti-table配合使用，则当分页更新时，触发ti-table的updatePagination
            // 进而触发表格更新回调
            if (isWithTable(element, ctrl)) {
                ctrl.updatePagination(scope.currentPage, getPageSizeNum(scope), scope.totalItems);
            }
            // 触发开发者设置的分页更新回调
            if (_.isFunction(scope.pageUpdate())) {
                scope.pageUpdate()(scope.currentPage, getPageSizeNum(scope), scope.totalItems);
            }
        }

        function addBehavior(scope) {
            // 通过操作选择某一页
            scope.selectPage = function (page, evt) {
                evt.preventDefault(); // 阻止浏览器默认事件

                var selectedPage = parseInt(page, 10);
                if (selectedPage !== scope.currentPage) {
                    scope.currentPage = selectedPage;
                    triggerPageNumChange(scope);
                }
            };

            // 输入跳转页码，然后按enter键
            scope.enterPageHandler = function () {
                // 按下enter键
                if (event.keyCode === 13) {
                    scope.gotoPageHandler(event);
                }
            };

            // 根据要跳转的页码，设置新的当前页
            scope.gotoPageHandler = function () {
                scope.currentPage = scope.gotoPage.page; // 同步修改当前页
                triggerPageNumChange(scope);
            };
        }

        function triggerPageNumChange(scope) {
            if (_.isFunction(scope.pageNumChange())) {
                scope.pageNumChange()(scope.currentPage, getPageSizeNum(scope), scope.totalItems);
            }
        }

        function addWatcher(scope, element, ctrl) {
            // 当前页改变，重新渲染页码
            scope.$watch('currentPage', function (newValue, oldValue) {
                // 添加$evalAsync的作用：当用户同时更新了totalItems、pageSize.size和currentPage时，首先执行totalItems和
                // pageSize.size的$watcher回调，最后进行当前页设置，保证用户设置的当前页生效。
                scope.$evalAsync(function () {
                    var newPage = verifyInputPage(newValue, oldValue, scope); // 确保为合法数字
                    scope.currentPage = newPage;
                    if (newPage !== oldValue) {
                        renderPage(scope, element, ctrl);
                    }
                });
            });

            // 每页显示条数改变（通过属性设置pageSize.size），改变selectedId，
            // 进而触发当前页的变化及页码更新，详见scope.$watch("itemsPerPage.selectedId",...)
            scope.$watch('pageSize.size', function (newValue, oldValue) {
                if (parseInt(newValue, 10) === parseInt(oldValue, 10)) {
                    return;
                }
                _.each(scope.itemsPerPage.options, function (sizeOpts, index) {
                    if (parseInt(sizeOpts.label, 10) === parseInt(newValue, 10)) {
                        scope.itemsPerPage.selectedId = index + ''; // 转化为字符串
                    }
                });
            });

            // 每页显示条数改变（通过操作select面板或者是设置pageSize.size触发）
            // 将触发当前页的变化及页码更新
            scope.$watch('itemsPerPage.selectedId', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                scope.currentPage = MIN_PAGE;
                syncPageSize(scope); // 同步更新pageSize.size
                renderPage(scope, element, ctrl);
            });

            // 总条数改变，刷新分页
            scope.$watch('totalItems', function (newValue, oldValue) {
                var newItemsNum = verifyTotalItems(newValue, oldValue); // 确保为合法数字
                scope.totalItems = newItemsNum;
                if (newItemsNum !== oldValue) {
                    renderPage(scope, element, ctrl);
                }
            });

            // 跳转页码非法，直接赋旧值
            // 此处主要目的是为了阻止用户在input框中输入非数字字符
            scope.$watch('gotoPage.page', function (newValue, oldValue) {
                var newPage = parseInt(newValue, 10);
                if (isNaN(newPage)) {
                    scope.gotoPage.page = oldValue;
                } else {
                    scope.gotoPage.page = newPage;
                }
            });
        }


        function initData(scope) {
            // 语言条目
            scope.tinyLanguage = window.tiny.language;
            // 总条数
            scope.totalItems = initTotalItems(scope.totalItems);
            // 当前页
            scope.currentPage = initCurrentPage(scope.currentPage);
            // 每页显示条数
            scope.itemsPerPage = getFormatedSize(scope);
            // 根据最终确定的itemsPerPage来同步pageSize，使得开发者数据(scope.pageSize)和页面显示保持一致
            syncPageSize(scope);
            // 是否隐藏总条数
            var hideTotal = scope.hideTotalItems;
            var hideTotalConf = tiPageConfig.hideTotalItems;
            scope.hideTotalItems = _.isUndefined(hideTotal) ? hideTotalConf : hideTotal;
            // 是否隐藏页码跳转链接
            var hideGoto = scope.hideGotoLink;
            scope.hideGotoLink = _.isUndefined(hideGoto) ? tiPageConfig.hideGotoLink : hideGoto;
            // 是否开启自动隐藏功能：当总条数小于每页最小显示条数时，隐藏分页
            scope.autoHide = _.isUndefined(scope.autoHide) ? tiPageConfig.autoHide : scope.autoHide;
            // 当前页码是否为最小页码
            scope.noPrevious = function () {
                return scope.currentPage === MIN_PAGE;
            };
            // 当前页码是否为最大页码
            scope.noNext = function () {
                return scope.currentPage === scope.totalPageNum;
            };
            // 当前页码是否为'...'
            scope.isEllipse = function (page) {
                return page.key === '...';
            };
        }

        /**
         * 同步变化开发者的pageSize数据
         */
        function syncPageSize(scope) {
            if (_.isObject(scope.pageSize)) {
                scope.pageSize.size = getPageSizeNum(scope);
            }
        }

        /**
         * 当传入的总条数无法转化为数字时，认为非法，维持原值.
         */
        function verifyTotalItems(newNum, oldNum) {
            var newNumParse = parseInt(newNum, 10);
            return isNaN(newNumParse) || newNumParse < 0 ? oldNum : newNumParse;
        }

        /**
         * 设置合法的新页码
         */
        function verifyInputPage(newPage, oldPage, scope) {
            var newPageParse = parseInt(newPage, 10);
            if (!newPageParse) { // 输入页码为非数字或者为0均为非法
                return oldPage;
            }

            var maxPage = scope.totalPageNum;
            if (newPageParse > maxPage) {
                return maxPage;
            }

            if (newPageParse < MIN_PAGE) {
                return MIN_PAGE;
            }

            return newPageParse;
        }

        /**
         * 当传入的总条数无法转化为数字时，认为非法，采用默认值.
         */
        function initTotalItems(itemsNum) {
            var itemsNumParse = parseInt(itemsNum, 10);
            var isItemNumValid = isNaN(itemsNumParse) || itemsNumParse < 0;
            return isItemNumValid ? tiPageConfig.totalItems : itemsNumParse;
        }

        /**
         * 当传入pageNum无法转化为数字或者转化为数据0时，认为非法，采用默认值.
         */
        function initCurrentPage(pageNum) {
            var pageNumParse = parseInt(pageNum, 10);
            var isPageNumValid = isNaN(pageNumParse) || pageNumParse <= 0;
            return isPageNumValid ? tiPageConfig.currentPage : pageNumParse;
        }

        /**
         * 获取当前每页显示条数
         */
        function getPageSizeNum(scope) {
            var pageSizeOpt = _.find(scope.itemsPerPage.options, function (opt) {
                return opt.id === scope.itemsPerPage.selectedId;
            });
            return parseInt(pageSizeOpt.label, 10);
        }

        /**
         * 计算总页数
         */
        function calculateTotalPages(scope) {
            var pageSize = getPageSizeNum(scope);
            var totalPages = Math.ceil(parseInt(scope.totalItems, 10) / pageSize);
            return Math.max(totalPages || 0, 1); // 总页数最小为1
        }

        /**
         * 获取页码列表
         */
        function getPages(scope) {
            var currentPage = scope.currentPage;
            var totalPageNum = scope.totalPageNum;
            var startAndEndPage = getInterval(scope); // 获得显示的起始和结束页
            var startPagNum = startAndEndPage[0];
            var endPagNum = startAndEndPage[1];
            var pages = [];

            // 只有1页的情况
            if (totalPageNum === 1) {
                pages.push(makePage(1, true));
                return pages;
            }

            // 当总页数大于8，并且中间连续按钮的起始位置没有和第1页相连时，创建第1页按钮和省略号
            if (startPagNum > 2 && totalPageNum > 8) {
                pages.push(makePage(1, currentPage === 1));
                pages.push(makePage('...', false));
            }

            // 创建中间页按钮
            for (var i = startPagNum; i <= endPagNum; i++) {
                pages.push(makePage(i, currentPage === i));
            }

            // 当总页数大于8，并且中间连续按钮的结束位置没有和最后一页按钮相连时，创建省略号和最后页按钮
            if (endPagNum < totalPageNum && totalPageNum > 8) {
                pages.push(makePage('...', false));
                pages.push(makePage(totalPageNum, currentPage === totalPageNum));
            }

            return pages;
        }

        /**
         * 创建每一个页码对应的数据
         * @params key 页码显示，为数字或者是"..."
         * @params isActive 是否为当前激活页
         */
        function makePage(key, isActive) {
            return {
                key: key,
                active: isActive
            };
        }

        /**
         * 根据当前页和要显示的数目，计算分页链接的起始页
         */
        function getInterval(scope) {
            var start;
            var end;
            var currentPage = scope.currentPage;
            // 根据Agile规范：页数小于等于8，起、始按钮值分别设为1和最大页数
            if (scope.totalPageNum <= 8) {
                start = 1;
                end = scope.totalPageNum;
                return [start, end];
            }

            // 显示前5页按钮
            if (currentPage <= 3) {
                start = 1;
                end = 5;
                return [start, end];
            }

            // 显示最后5页按钮
            if (currentPage > scope.totalPageNum - 3) {
                start = scope.totalPageNum - 4;
                end = scope.totalPageNum;
                return [start, end];
            }

            // 显示中间4个按钮
            start = currentPage - 1;
            end = currentPage + 2;
            return [start, end];
        }

        /**
         * 若总条数 < 最小的每页显示条数，则不需要显示分页
         */
        function bNeedPagination(scope) {
            var sizeList = _.pluck(scope.itemsPerPage.options, 'label');
            var minSize = sizeList.sort(function (a, b) {
                return (+a) - (+b);
            })[0];
            return +minSize < scope.totalItems;
        }

        function getFormatedSize(scope) {
            var sizeConfigRet = getSizeConfig(scope.pageSize); // 将初始设置和默认设置合并
            return reformatSize(sizeConfigRet); // 返回格式化后的pageSize配置

            // 按照ti-select接口组装pageSize配置
            function reformatSize(sizeConfig) {
                var sizeIdAndOptsRet = getSizeIdAndOpts(sizeConfig);
                return {
                    selectedId: sizeIdAndOptsRet.sizeId, // 当前每页显示条数ID
                    options: sizeIdAndOptsRet.options, // 每页显示条数选项
                    change: sizeChangeFn, // 每页显示条数改变的回调
                    hide: sizeConfig.hide, // 是否显示
                    style: {
                        width: sizeConfig.width // 宽度设置
                    }
                };
                function getSizeIdAndOpts(sizeConf) {
                    var sizeIdAndOpts = {
                        sizeId: '0', // 默认sizeConfig.options[0]作为当前size
                        options: []
                    };
                    // 遍历options，确定当前size对应的sizeId，并按照ti-select接口重新组装options
                    _.each(sizeConf.options, function (size, index) {
                        if (parseInt(sizeConf.size, 10) === parseInt(size, 10)) {
                            sizeIdAndOpts.sizeId = index + ''; // 将索引作为ID
                        }

                        sizeIdAndOpts.options.push({
                            id: index + '',
                            label: size
                        });
                    });
                    return sizeIdAndOpts;
                }

                function sizeChangeFn() {
                    if (!_.isFunction(sizeConfig.change)) {
                        return;
                    }

                    $timeout(function () { // $timeout是为了避免回调触发时scope.currentPage尚未改变
                        sizeConfig.change(scope.currentPage,
                            getPageSizeNum(scope),
                            scope.totalItems);
                    }, 0);
                }
            }

            /**
             * 若开发者对pageSize设置合法，则与默认设置合并
             * 否则，直接使用默认配置
             */
            function getSizeConfig(pageSize) {
                if (_.isObject(pageSize)) {
                    return angular.extend({}, tiPageConfig.pageSize, pageSize);
                }

                return tiPageConfig.pageSize;
            }
        }
        function isWithTable(element, ctrl) {
            var bWithTable = ctrl // 存在ctrl,说明分页外层有ti-table指令
                && _.isFunction(ctrl.updatePagination) // ti-table的controller定义了updatePagination方法
                && element.parent('.ti-table').length > 0; // 分页的父容器是ti-table，避免表格嵌套导致的误取
            return bWithTable;
        }
    }

    return module.name;
});

define('components/datePanel/datePanel',['components/module'], function (module) {
    'use strict';

    var utils = window.tiny.utils;

    module.provider('datePanelService', datePanelService);
    function datePanelService() {
        var constant = this.constant = {
            pickerMaxYear: 2099, // 用户没有设置最大年份时，年月下拉面板中，年份最大值
            pickerMinYear: 1970,  // 用户没有设置最小年份时，年月下拉面板中，年份最小值
            // 可以获取焦点的元素选择器列表
            tababbleSelector: 'a[href], area[href], input:not([disabled]), ' +
                'button:not([disabled]),select:not([disabled]), textarea:not([disabled]), ' +
                'iframe, object, embed, *[tabindex], *[contenteditable=true]'
        };

        /**
         * @description 设置下拉面板位置
         * @param $element 组件DOM模板
         */
        this.setPanelPosition = function ($element) {
            setPanelVertical();
            setPanelHorizontal();

            /**
             * @description 设置下拉面板的垂直位置
             * @param $element 组件DOM模板
             */
            function setPanelVertical() {
                // 计算输入框容器高度
                var $container = $('.ti-date-icon-container', $element);
                var containerHeight = $container.outerHeight();

                // 计算下拉面板高度
                var $picker = $('.ti-date-range-picker, .ti-date-picker', $element);
                var pickerHeight = $picker.outerHeight();

                // 计算输入框容器上边和下边可视高度
                var containerOffset = $container.offset();
                var overHeight = containerOffset.top - $(document).scrollTop();
                var underHeight = window.innerHeight - overHeight - containerHeight;

                var top;
                // 下拉框top位置总体方案：
                // 1.输入框容器下边能够显示全下拉面板时，显示在下边；
                // 2.输入框容器下边显示不全下拉面板时，显示在上边。
                if (underHeight >= pickerHeight) {
                    // 输入框显示在下边详细方案：
                    // 1.下边可以显示全下拉面板和AguileUI规定间隔时，在输入框容器下边间隔高度处开始显示下拉面板；
                    // 2.下边显示不全下拉面板和AguileUI规定间隔时，紧挨浏览器内容可视区的最下边开始显示下拉面板。
                    var len = 5; // 输入框和下拉面板的间隔
                    if (underHeight >= (pickerHeight + len)) {
                        top = containerHeight + len;
                    } else {
                        top = containerHeight + (underHeight - pickerHeight);
                    }
                } else {
                    // 输入框显示在上边详细方案：
                    // 1.上边可以显示全下拉面板时，紧挨输入框容器显示下拉面板；
                    // 2.上边显示不全下拉面板时，紧挨浏览器内容可视区的最上边开始显示下拉面板。
                    top = -(Math.min(overHeight, pickerHeight));
                }

                $picker.css('top', top + 'px');
            }

            /**
             * @description 设置下拉面板的水平位置
             * @param $element date组件DOM模板
             */
            function setPanelHorizontal() {
                // 计算下拉面板宽度
                var $picker = $('.ti-date-range-picker, .ti-date-picker', $element);
                var pickerWidth = $picker.outerWidth();

                // 计算输入框容器右边可视宽度
                var containerOffset = $('.ti-date-icon-container', $element).offset();
                var leftWidth = containerOffset.left - $(document).scrollLeft();
                var rightWidth = window.innerWidth - leftWidth;

                // 1.右侧区域能显示全下拉面板时，下拉面板左侧与输入框容器左侧对齐
                // 2.右侧区域不能显示全下拉面板时，下拉面板右侧与输入框右侧对齐
                if (rightWidth >= pickerWidth || rightWidth >= leftWidth) {
                    $picker.css('left', '0px');
                    $picker.css('right', 'auto');
                } else {
                    $picker.css('left', 'auto');
                    $picker.css('right', '0px');
                }
            }
        };

        /**
         * 最大值时分秒置为23:59:59。
         * 原因：date或者dateRange组件中，如果用户动态设置的value为最大年月日并带有时分秒，而设置的maxValue时分秒比较小时，
         * 校验该value是否小于或等于最大值时，会出错。
         * @param maxValue
         * @returns {Date}
         */
        this.changeMaxTime = function (maxValue) {
            return new Date(maxValue.getFullYear(), maxValue.getMonth(),
                maxValue.getDate(), 23, 59, 59);
        };

        /**
         * 最小值时分秒置为0:0:0。
         * 原因：date或者dateRange组件中，如果用户设置的minValue带有时分秒，这时动态更新value为最小值年月日并时分秒为很小时，会出错。
         * @param minValue
         * @returns {Date}
         */
        this.changeMinTime = function (minValue) {
            return new Date(minValue.getFullYear(), minValue.getMonth(),
                minValue.getDate(), 0, 0, 0);
        };

        /**
         * 实现按tab键时，focus在下拉面板中循环
         * @param scope 组件scope
         * @param $panelEle 组件下拉面板DOM
         * @param event keydown事件
         */
        this.tabKeydownFn = function (scope, $panelEle, event) {
            if (!scope.isOpenPicker) {
                return;
            }

            var $focusableElementList = getFocusElementList(); // 获取当前弹出框DOM中可以获取焦点的元素列表
            if ($focusableElementList.length === 0) {
                return;
            }
            var focusChanged = false;
            if (event.shiftKey) {
                // 如果当前已获取焦点元素是弹出框中的第一个可获取焦点元素
                // 或者是获取焦点的元素就是弹出框DOM本身
                // 则按下tab+shift键，将焦点定位到弹出框中最后一个可获取焦点元素
                if (isFocusInFirstItem() || isPanelFocused()) {
                    focusChanged = true;
                    $focusableElementList[$focusableElementList.length - 1].focus();
                }
            } else if (isFocusInLastItem()) {
                // 弹出框内的可获取焦点元素将循环获取焦点
                focusChanged = true;
                $focusableElementList[0].focus();
            }

            if (focusChanged) {
                event.preventDefault();
                event.stopPropagation();
            }

            function getFocusElementList() {
                if ($panelEle && $panelEle.length) {
                    return $panelEle[0].querySelectorAll(constant.tababbleSelector);
                }
                return [];
            }

            function isPanelFocused() {
                if (event && $panelEle && $panelEle.length) {
                    return (event.target || event.srcElement) === $panelEle[0];
                }

                return false;
            }

            function isFocusInFirstItem() {
                return (event.target || event.srcElement) === $focusableElementList[0];
            }

            function isFocusInLastItem() {
                return (event.target || event.srcElement) ===
                    $focusableElementList[$focusableElementList.length - 1];
            }
        };

        /**
         * 判断点击事件是否发生在年月面板上
         * @param $event 事件
         * @param $element 当前年月面板所在父容器
         */
        this.isClickYearMonthPicker = function ($event, $element) {
            var target = $event.target;
            if (target === $('.ti-header-year-month-picker', $element)[0] ||
                $(target).parents('.ti-header-year-month-picker').length !== 0) {
                return true;
            }

            return false;
        };

        this.$get = function () {
            var service = {
                constant: this.constant,
                setPanelPosition: this.setPanelPosition,
                tabKeydownFn: this.tabKeydownFn,
                changeMaxTime: this.changeMaxTime,
                changeMinTime: this.changeMinTime,
                isClickYearMonthPicker: this.isClickYearMonthPicker
            };
            return service;
        };
    }

    module.directive('tiDatePanel', tiDatePanel);
    tiDatePanel.$inject = ['$filter', 'datePanelService'];
    function tiDatePanel($filter, datePanelServ) {
        var directive = {
            restrict: 'E',
            scope: {
                value: '=?',
                maxValue: '=?',
                minValue: '=?',
                type: '=?',
                isOpenYearMonthPicker: '=?',
                dayClick: '&'
            },
            templateUrl: '/tiny-components/src/components/datePanel/datePanel.html',
            replace: true,
            link: function (scope) {
                setLanguage(scope);

                setValue(scope);

                addBehavior(scope, datePanelServ);

                addWatcher(scope);
            }
        };

        return directive;
    }

    /**
     * @description 设置国际化文本
     * @param scope tidateRangeSingle指令的scope
     */
    function setLanguage(scope) {
        var tinyLanguage = window.tiny.language;
        var start = tinyLanguage.date_week_start_value;

        var weekArr = tinyLanguage.date_week_names_abb;
        scope.weekArr = _.last(weekArr, weekArr.length - start).concat(_.first(weekArr, start));

        var weekTitleArr = tinyLanguage.date_week_names_title;
        var index = weekTitleArr.length - start;
        scope.weekTitleArr = _.last(weekTitleArr, index).concat(_.first(weekTitleArr, start));

        // 设置上月、下月的国际化文本
        scope.prevText = tinyLanguage.date_prev_month_title;
        scope.nextText = tinyLanguage.date_next_month_title;
    }

    /**
     * @description 设置展示的日期
     * @param scope tiDatePanel指令的scope
     */
    function setValue(scope) {
        var date;
        if ($.isPlainObject(scope.value) && utils.isDate(scope.value[scope.type])) {
            date = scope.value[scope.type];
        } else {
            var today = new Date();
            var year = today.getFullYear();
            var month = today.getMonth() + 1;
            var day = today.getDate();
            if (!isBiggerThanMaxDay(scope, year, month, day) &&
                !isSmallerThanMinDay(scope, year, month, day)) {
                date = today;
            } else if (utils.isDate(scope.minValue)) {
                date = scope.minValue;
            } else {
                date = scope.maxValue;
            }
        }

        scope.date = {
            year: date.getFullYear(),
            month: date.getMonth() + 1, // getMonth返回的月份是从0开始的
            day: date.getDate()
        };

        setYearMonthText(scope);

        setPreNextState(scope, scope.date.year, scope.date.month);

        setDayArr(scope);
    }

    /**
     * @description 添加事件回调函数
     * @param scope tidateRangeSingle指令的scope
     * @param $element tidateRangeSingle指令DOM模板
     * @param $filter AngularJS过滤服务，这里主要用其对value进行日期格式化的功能
     */
    function addBehavior(scope, datePanelServ) {
        scope.preClickFn = function (isDisable) {
            if (isDisable) {
                return;
            }

            var month;
            var year;
            if (scope.date.month === 1) {
                month = 12;
                year = scope.date.year - 1;
            } else {
                month = scope.date.month - 1;
                year = scope.date.year;
            }

            if (!isSmallerThanMinMonth(scope, year, month)) {
                scope.date.month = month;
                scope.date.year = year;
                setYearMonthText(scope);
                setDayArr(scope);
                setPreNextState(scope, year, month);
            }
        };

        scope.nextClickFn = function (isDisable) {
            if (isDisable) {
                return;
            }

            var month;
            var year;
            if (scope.date.month === 12) {
                month = 1;
                year = scope.date.year + 1;
            } else {
                month = scope.date.month + 1;
                year = scope.date.year;
            }

            if (!isBiggerThanMaxMonth(scope, year, month)) {
                scope.date.month = month;
                scope.date.year = year;
                setYearMonthText(scope);
                setDayArr(scope);
                setPreNextState(scope, year, month);
            }
        };

        scope.dayClickFn = function (day) {
            if (day.state === 'disable') {
                return;
            }

            scope.date.day = day.value;
            scope.value = $.isPlainObject(scope.value) ? scope.value : {};
            scope.value[scope.type] = new Date(scope.date.year, scope.date.month - 1, day.value);

            if (_.isFunction(scope.dayClick())) {
                scope.dayClick()();
            }
        };

        scope.yearClickFn = function (year, index) {
            scope.date.year = year;
            scope.yearSelectedIndex = index;
            setYearMonthText(scope);
            setMonthArr(scope);
            setDayArr(scope);
            setPreNextState(scope, scope.date.year, scope.date.month);
        };

        scope.monthClickFn = function (month, index) {
            var tinyLanguage = window.tiny.language;
            scope.date.month = _.indexOf(tinyLanguage.date_month_names_abb, month) + 1;
            scope.monthSelectedIndex = index;
            setYearMonthText(scope);
            setDayArr(scope);
            setPreNextState(scope, scope.date.year, scope.date.month);
        };

        scope.monthYearClickFn = function () {
            scope.isOpenYearMonthPicker = !scope.isOpenYearMonthPicker;
            if (scope.isOpenYearMonthPicker) {
                setMonthArr(scope);
                setYearArr(scope, datePanelServ);
            }
        };
    }

    /**
     * @description 对支持动态更新的接口添加$watch监控
     * @param scope tidateRangeSingle指令的scope
     */
    function addWatcher(scope) {
        scope.$watch('value', function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }

            setValue(scope);
        }, true);
    }

    /**
     * @description 根据当前年月值，设置下拉面板中显示的日数据
     * @param scope tiDatePanel指令的scope
     */
    function setDayArr(scope) {
        var year = parseInt(scope.date.year, 10);
        var month = parseInt(scope.date.month, 10);

        // 步骤1：计算这个月1号是下拉面板第一行的第几个
        var begin; // 用于标志这个月1号从下拉面板中第一行的第几个开始
        var startDay = new Date(year, month - 1, 1).getDay(); // 这个月1号是周几
        var tinyLanguage = window.tiny.language;
        if (tinyLanguage.date_week_start_value === 0) {
            begin = startDay;
        } else if (startDay === 0) {
            begin = 6;
        } else {
            begin = startDay - 1;
        }


        // 步骤2：将上个月的日存入数组dateArr
        var dateArr = []; // 存储下拉面板中所有日的值和状态
        var preMonth = month === 1 ? 12 : (month - 1);
        var preMonthDays = new Date(year, preMonth, 0).getDate(); // 上个月总天数
        var preMonthStart = preMonthDays - begin + 1;
        for (var i = 0; i < begin; i++) {
            dateArr[i] = {
                value: preMonthStart + i,
                state: 'disable' // 非当前月的日期置灰
            };
        }

        // 步骤3：将本月的日存入数组dateArr
        var dayNum = 1;
        var monthDays = new Date(year, month, 0).getDate(); // 这个月总天数
        var length = begin + monthDays;
        var state = '';
        for (var j = begin; j < length; j++) {
            if (isBiggerThanMaxDay(scope, year, month, dayNum) ||
                isSmallerThanMinDay(scope, year, month, dayNum)) {
                state = 'disable'; // 日样式置灰
            } else if (isEqualToValue(scope, year, month, dayNum)) {
                state = 'current'; // 当前选中
            } else if (isBetweenInRange(scope, year, month, dayNum)) {
                state = 'select'; // 在选中范围
            } else {
                state = 'default'; // 没有选中
            }

            dateArr[j] = {
                value: dayNum,
                state: state
            };

            dayNum++;
        }


        // 步骤4：将下个月的日存入数组dateArr
        dayNum = 1;
        for (var k = dateArr.length; k < 42; k++) {
            dateArr[k] = {
                value: dayNum,
                state: 'disable' // 非当前月的日期置灰
            };

            dayNum++;
        }

        // 步骤5：将dateArr组装成下拉面板中显示日的二维数组dayArr
        scope.dayArr = [];
        for (var p = 0; p < dateArr.length / 7; p++) {
            scope.dayArr[p] = [];
            for (var q = 0; q < 7; q++) {
                scope.dayArr[p].push(dateArr[q + p * 7]);
            }
        }
    }

    /**
     * @description 设置下拉面板中年月文本
     * @param scope tidateRangeSingle指令的scope
     */
    function setYearMonthText(scope) {
        var tinyLanguage = window.tiny.language;
        scope.picker = _.isObject(scope.picker) ? scope.picker : {};
        scope.picker.year = scope.date.year + ' ' + tinyLanguage.date_year_suffix_label;
        scope.picker.month = tinyLanguage.date_month_names_abb[scope.date.month - 1];
    }

    /**
     * @description 根据当前年份和最大最小值，设置下拉面板中显示的月份数据
     * @param scope tidateRangeSingle指令的scope
     */
    function setMonthArr(scope) {
        var tinyLanguage = window.tiny.language;
        var year = scope.date.year;
        scope.monthArr = [];
        scope.monthSelectedIndex = -1;
        for (var month = 1; month <= 12; month++) {
            if (isSmallerThanMinMonth(scope, year, month)) {
                continue;
            } else if (isBiggerThanMaxMonth(scope, year, month)) {
                break;
            } else {
                scope.monthArr.push(tinyLanguage.date_month_names_abb[month - 1]);
                // 该月份为当前选中月份，则设置选中索引为该月份在数组的下标号，用于ng-class添加选中样式
                if (scope.date.month === month) {
                    scope.monthSelectedIndex = scope.monthArr.length - 1;
                }
            }
        }
    }

    /**
     * @description 根据最大最小值，设置下拉面板中显示的年份数据
     * @param scope tidateRangeSingle指令的scope
     */
    function setYearArr(scope, datePanelSer) {
        var constant = datePanelSer.constant;
        var maxYearConf = scope.maxValue.getFullYear();
        var maxYear = utils.isDate(scope.maxValue) ? maxYearConf : constant.pickerMaxYear;
        var minYearConf = scope.minValue.getFullYear();
        var minYear = utils.isDate(scope.minValue) ? minYearConf : constant.pickerMinYear;
        scope.yearArr = [];
        scope.yearSelectedIndex = -1;
        for (var i = minYear; i <= maxYear; i++) {
            scope.yearArr.push(i);
            // 如果该年份是当前选中年份，将其在年数组中下标设置为选中年份索引，用于设置选中年份样式
            if (scope.date.year === i) {
                scope.yearSelectedIndex = scope.yearArr.length - 1;
            }
        }
    }

    /**
     * @description 判断参数传来的日期是否大于最大日期：大于返回true，小于返回false
     * @param scope tidateRangeSingle指令的scope
     * @param year{int} 年份
     * @param month{int} 月份
     * @param day{int} 日
     */
    function isBiggerThanMaxDay(scope, year, month, day) {
        if (!utils.isDate(scope.maxValue)) {
            return false;
        }

        // 重新生成一个新的最大值的原因：防止传入一个带时分的最大值
        var maxValue = scope.maxValue;
        maxValue = new Date(maxValue.getFullYear(), maxValue.getMonth(), maxValue.getDate());
        if (Date.parse(maxValue) < Date.parse(new Date(year, month - 1, day))) {
            return true;
        }
        return false;
    }

    /**
     * @description 判断参数传来的日期是否小于最小日期：小于返回true，大于返回false
     * @param scope tidateRangeSingle指令的scope
     * @param year{int} 年份
     * @param month{int} 月份
     * @param day{int} 日
     */
    function isSmallerThanMinDay(scope, year, month, day) {
        if (!utils.isDate(scope.minValue)) {
            return false;
        }

        var minValue = scope.minValue;
        // 这么做的原因：防止传入一个带时分的最大值
        minValue = new Date(minValue.getFullYear(), minValue.getMonth(), minValue.getDate());
        if (Date.parse(minValue) > Date.parse(new Date(year, month - 1, day))) {
            return true;
        }
        return false;
    }

    /**
     * @description 判断参数传来的年月是否大于最大月份：大于返回true，小于返回false
     * @param scope tidateRangeSingle指令的scope
     * @param year{int} 年份
     * @param month{int} 月份
     */
    function isBiggerThanMaxMonth(scope, year, month) {
        if (!utils.isDate(scope.maxValue)) {
            return false;
        }

        var maxValue = scope.maxValue;
        maxValue = new Date(maxValue.getFullYear(), maxValue.getMonth(), 1);
        if (Date.parse(maxValue) < Date.parse(new Date(year, month - 1, 1))) {
            return true;
        }
        return false;
    }

    /**
     * @description 判断参数传来的年月是否小于最小月份：小于返回true，大于返回false
     * @param scope tidateRangeSingle指令的scope
     * @param year{int} 年份
     * @param month{int} 月份
     */
    function isSmallerThanMinMonth(scope, year, month) {
        if (!utils.isDate(scope.minValue)) {
            return false;
        }

        var minValue = scope.minValue;
        minValue = new Date(minValue.getFullYear(), minValue.getMonth(), 1);
        if (Date.parse(minValue) > Date.parse(new Date(year, month - 1, 1))) {
            return true;
        }
        return false;
    }

    /**
     * @description 设置上月、下月按钮状态：已经是最大、最小月时，将对应的按钮置灰
     * @param scope tidateRangeSingle指令的scope
     * @param year{int} 年份
     * @param month{int} 月份
     */
    function setPreNextState(scope, year, month) {
        if (isEqualToMaxMonth(scope, year, month)) {
            scope.isMaxMonth = true;
        } else {
            scope.isMaxMonth = false;
        }

        if (isEqualToMinMonth(scope, year, month)) {
            scope.isMinMonth = true;
        } else {
            scope.isMinMonth = false;
        }
    }

    /**
     * @description 判断参数传来的年月是否等于最小月份：等于返回true，不等于返回false
     * @param scope tidateRangeSingle指令的scope
     * @param year{int} 年份
     * @param month{int} 月份
     */
    function isEqualToMinMonth(scope, year, month) {
        if (!utils.isDate(scope.minValue)) {
            return false;
        }

        var minValue = scope.minValue;
        minValue = new Date(minValue.getFullYear(), minValue.getMonth(), 1);
        if (Date.parse(minValue) === Date.parse(new Date(year, month - 1, 1))) {
            return true;
        }
        return false;
    }

    /**
     * @description 判断参数传来的年月是否等于最大月份：等于返回true，不等于返回false
     * @param scope tidateRangeSingle指令的scope
     * @param year{int} 年份
     * @param month{int} 月份
     */
    function isEqualToMaxMonth(scope, year, month) {
        if (!utils.isDate(scope.maxValue)) {
            return false;
        }

        var maxValue = scope.maxValue;
        maxValue = new Date(maxValue.getFullYear(), maxValue.getMonth(), 1);
        if (Date.parse(maxValue) === Date.parse(new Date(year, month - 1, 1))) {
            return true;
        }
        return false;
    }

    /**
     * @description 判断参数传来的日期是否等于当前选中的日期：等于返回true，不等于返回false
     * @param scope tidateRangeSingle指令的scope
     * @param year{int} 年份
     * @param month{int} 月份
     * @param day{int} 日
     */
    function isEqualToValue(scope, year, month, day) {
        var value = $.isPlainObject(scope.value) ? scope.value[scope.type] : null;
        if (!utils.isDate(value)) {
            return false;
        }

        value = new Date(value.getFullYear(), value.getMonth(), value.getDate());
        if (Date.parse(value) === Date.parse(new Date(year, month - 1, day))) {
            return true;
        }
        return false;
    }

    /**
     * @description 判断参数传来的日期是否在当前选中日期的范围内,并且不等于当前选中的值：符合返回true，不符合返回false
     * @param scope tidateRangeSingle指令的scope
     * @param year{int} 年份
     * @param month{int} 月份
     * @param day{int} 日
     */
    function isBetweenInRange(scope, year, month, day) {
        var value = scope.value;
        if (!$.isPlainObject(value) || !utils.isDate(value.begin) || !utils.isDate(value.end)) {
            return false;
        }

        var begin = value.begin;
        begin = new Date(begin.getFullYear(), begin.getMonth(), begin.getDate());
        begin = Date.parse(begin);

        var end = value.end;
        end = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        end = Date.parse(end);

        var curValue = Date.parse(new Date(year, month - 1, day));
        if (scope.type === 'begin' && begin < curValue && curValue <= end ||
            scope.type === 'end' && begin <= curValue && curValue < end) {
            return true;
        }
        return false;
    }

    return module.name;
});

define('components/date/date',['components/module', 'components/datePanel/datePanel'], function (module) {
    'use strict';

    var utils = window.tiny.utils;

    module.provider('dateService', dateService);
    function dateService() {
        var defaults = this.defaultValue = {
            maxValue: new Date(2099, 11, 31, 23, 59, 59),
            minValue: new Date(1970, 0, 1, 0, 0, 0),
            clearBtn: true,
            todayBtn: false,
            okBtn: true
        };

        // 开发者在angular应用的config阶段可以调用setDefaults方法来配置默认值
        this.setDefaults = function (newDefaults) {
            angular.extend(defaults, newDefaults);
        };

        this.$get = function () {
            var service = {
                defaultValue: this.defaultValue
            };
            return service;
        };
    }

    module.directive('tiDate', tiDate);
    tiDate.$inject = ['$filter', 'dateService', 'datePanelService'];
    function tiDate($filter, dateSer, datePanelService) {
        var directive = {
            restrict: 'E',
            scope: {
                format: '=?',
                value: '=?',
                maxValue: '=?',
                minValue: '=?',
                disable: '=?',
                okBtn: '=?',
                clearBtn: '=?',
                todayBtn: '=?',
                close: '&'
            },
            templateUrl: '/tiny-components/src/components/date/date.html',
            replace: true,
            link: linkFn
        };
        return directive;

        function linkFn(scope, $element) {
            init(scope);

            addBehavior(scope, $element);

            addWatcher(scope);
        }

        function init(scope) {
            // 日期格式校验
            validateFormat(scope);

            // 最大最小值校验
            validateMinAndMax(scope);

            // value值校验
            validateValue(scope);

            // 将value转换为format接口格式的字符串
            formatValue(scope);

            // 设置下拉面板中按钮
            setBtn(scope);
        }

        function validateFormat(scope) {
            if (_.isString(scope.format)) {
                return;
            }

            scope.format = window.tiny.language.date_format;
        }

        function validateMinAndMax(scope) {
            var defaultValue = dateSer.defaultValue;

            // 最大值合法性校验
            var maxTimeChanged = datePanelService.changeMaxTime(scope.maxValue);
            scope.maxValue = utils.isDate(scope.maxValue) ? maxTimeChanged : defaultValue.maxValue;

            // 最小值合法性校验
            var minTimeChanged = datePanelService.changeMinTime(scope.minValue);
            scope.minValue = utils.isDate(scope.minValue) ? minTimeChanged : defaultValue.minValue;

            // 最大最小值矛盾时，设置为默认值
            if (Date.parse(scope.maxValue) < Date.parse(scope.minValue)) {
                scope.maxValue = defaultValue.maxValue;
                scope.minValue = defaultValue.minValue;
            }
        }

        function validateValue(scope) {
            // value为null时，输入框中显示空白
            if (scope.value === null) {
                return;
            }

            // 传入的value值非日期时，设置为当前日期
            if (!utils.isDate(scope.value)) {
                scope.value = new Date();
            }

            // 最大值校验
            if (isBiggerThanMax(scope)) {
                scope.value = scope.maxValue;
            }

            // 最小值校验
            if (isSmallerThanMin(scope)) {
                scope.value = scope.minValue;
            }
        }

        function formatValue(scope) {
            // value是null时，输入框中显示空白
            if (scope.value === null) {
                scope.formatValue = '';
            } else {
                scope.formatValue = $filter('date')(scope.value, scope.format);
            }
        }

        function setBtn(scope) {
            // 设置按钮的国际化文本
            setBtnText(scope);

            // 设置today按钮是否显示
            var defaultValue = dateSer.defaultValue;
            if (_.isUndefined(scope.todayBtn)) {
                scope.todayBtn = defaultValue.todayBtn;
            }

            // 设置ok按钮是否显示
            if (_.isUndefined(scope.okBtn)) {
                scope.okBtn = defaultValue.okBtn;
            }

            // 设置clear按钮是否显示
            if (_.isUndefined(scope.clearBtn)) {
                scope.clearBtn = defaultValue.clearBtn;
            }
        }

        function setBtnText(scope) {
            var tinyLanguage = window.tiny.language;
            scope.btnLanguage = {
                today: tinyLanguage.date_today_btn,
                clear: tinyLanguage.date_clear_btn,
                ok: tinyLanguage.ok_btn
            };
        }

        function addBehavior(scope, $element) {
            scope.isInnerClick = false;

            // 点击输入框时回调函数
            scope.showClickFn = function () {
                if (scope.disable) {
                    return;
                }

                scope.isInnerClick = true; // 用于标记点击组件内部DOM的事件

                scope.isOpenPicker = !scope.isOpenPicker;

                if (scope.isOpenPicker) {
                    // 设置datePanel指令的接口值
                    setDatePanel(scope);

                    // 设置下拉面板的位置
                    setTimeout(function () {
                        datePanelService.setPanelPosition($element);
                    }, 0);
                } else {
                    triggerClose(scope);
                }
            };

            // 监控日期显示框上的keydown事件
            scope.keydownFn = function ($event) {
                switch ($event.keyCode) {
                    case 9 : // TAB键
                        responseTab();
                        break;
                    case 13 : // ENTER键(大键盘)
                    case 108 : // ENTER键(数字小键盘)
                        responseEnter();
                        break;
                    default :
                        break;
                }

                function responseEnter() {
                    if (scope.disable || scope.isOpenPicker) {
                        return;
                    }

                    scope.isOpenPicker = true;

                    // 设置datePanel指令的接口值
                    setDatePanel(scope);

                    // 设置下拉面板的位置
                    setTimeout(function () {
                        datePanelService.setPanelPosition($element);
                    }, 0);
                }

                function responseTab() {
                    if (scope.isOpenPicker) {
                        closePicker(scope);
                    }
                }
            };

            scope.pickerClickFn = function ($event) {
                if (!datePanelService.isClickYearMonthPicker($event, $element)) {
                    scope.datePanel.isOpenYearMonthPicker = false;
                }

                // 阻止事件的原因：防止click事件冒泡到document上，触发document的click回调，导致关闭下拉框
                $event.stopPropagation();
            };

            scope.okClickFn = function () {
                closePicker(scope);
            };

            scope.clearClickFn = function () {
                scope.value = null;

                closePicker(scope);
            };

            scope.todayClickFn = function () {
                scope.value = new Date();

                // 最大值校验
                if (isBiggerThanMax(scope)) {
                    scope.value = scope.maxValue;
                }

                // 最小值校验
                if (isSmallerThanMin(scope)) {
                    scope.value = scope.minValue;
                }

                closePicker(scope);
            };

            // document上点击事件，主要作用是：根据情况关闭当前日期组件的下拉框
            scope.documentClickFn = function () {
                // 组件置灰或者已经是关闭状态
                if (scope.disable || !scope.isOpenPicker) {
                    return;
                }

                // 如果组件内部DOM上的点击事件，不做处理
                if (scope.isInnerClick) {
                    scope.isInnerClick = false;
                    return;
                }

                scope.$evalAsync(function () {
                    closePicker(scope);
                });
            };
            $(document).on('click', scope.documentClickFn);

            scope.documentKeydownFn = function (event) {
                // 按下ESC键时，关闭下拉面板
                if (event.keyCode === 27) {
                    if (scope.isOpenPicker) {
                        scope.$evalAsync(function () {
                            closePicker(scope);
                        });
                    }
                }

                // tab键实现在下拉面板中循环
                if (event.keyCode === 9) {
                    datePanelService.tabKeydownFn(scope, $('.ti-date-picker', $element), event);
                }
            };
            $(document).on('keydown', scope.documentKeydownFn);

            $element.on('$destroy', function () {
                $(document).off('click', scope.documentClickFn);
                $(document).off('keydown', scope.documentKeydownFn);
            });
        }

        function closePicker(scope) {
            scope.isOpenPicker = false;

            triggerClose(scope);
        }

        function triggerClose(scope) {
            if (_.isFunction(scope.close())) {
                scope.close()(scope.value);
            }
        }

        function setDatePanel(scope) {
            scope.datePanel = {
                type: 'begin',
                maxValue: scope.maxValue,
                minValue: scope.minValue,
                isOpenYearMonthPicker: false,
                value: {
                    begin: scope.value,
                    end: null
                },
                dayClick: function () {
                    scope.value = scope.datePanel.value.begin;
                    closePicker(scope);
                }
            };
        }

        function addWatcher(scope) {
            scope.$watch('value', function (newValue, oldValue) {
                if (isEqual(newValue, oldValue)) {
                    return;
                }

                // 新的value是非法时，value值保持之前值不变
                if (!isValidValue(scope)) {
                    scope.value = oldValue;
                    return;
                }

                formatValue(scope);
            });

            scope.$watch('maxValue', function (newValue, oldValue) {
                if (isEqual(newValue, oldValue)) {
                    return;
                }

                // 新的maxValue是非法时，maxValue值保持之前值不变
                if (!isValidMaxValue(scope)) {
                    scope.maxValue = oldValue;
                    return;
                }

                scope.maxValue = datePanelService.changeMaxTime(scope.maxValue);

                // 输入框空白时，不用对value进行最小值校验
                if (scope.value === null) {
                    return;
                }

                // 对value值进行最大值校验
                if (isBiggerThanMax(scope)) {
                    scope.value = scope.maxValue;
                }
            });

            scope.$watch('minValue', function (newValue, oldValue) {
                if (isEqual(newValue, oldValue)) {
                    return;
                }

                // 新的minValue是非法时，minValue值保持之前值不变
                if (!isValidMinValue(scope)) {
                    scope.minValue = oldValue;
                    return;
                }

                scope.minValue = datePanelService.changeMinTime(scope.minValue);

                // 输入框空白时，不用对value进行最小值校验
                if (scope.value === null) {
                    return;
                }

                // 对value值进行最小值校验
                if (isSmallerThanMin(scope)) {
                    scope.value = scope.minValue;
                }
            });

            scope.$watch('format', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 新的minValue是非法时，minValue值保持之前值不变
                if (!_.isString(newValue)) {
                    scope.format = oldValue;
                    return;
                }

                // 对value进行格式化
                formatValue(scope);
            });
        }

        function isValidValue(scope) {
            // value值为null时会将输入框清空，是一个合法的value值
            if (scope.value === null) {
                return true;
            }

            // value值为一个Date类型值并且在最大最小值范围内时，是一个合法值
            if (utils.isDate(scope.value) &&
                isSmallerOrEqualThanMax(scope) && isBiggerOrEqualThanMin(scope)) {
                return true;
            }

            return false;
        }

        function isValidMaxValue(scope) {
            return utils.isDate(scope.maxValue) &&
                (Date.parse(scope.maxValue) >= Date.parse(scope.minValue));
        }

        function isValidMinValue(scope) {
            return utils.isDate(scope.minValue) &&
                (Date.parse(scope.maxValue) >= Date.parse(scope.minValue));
        }

        function isBiggerThanMax(scope) {
            return Date.parse(scope.value) > Date.parse(scope.maxValue);
        }

        function isSmallerThanMin(scope) {
            return Date.parse(scope.value) < Date.parse(scope.minValue);
        }

        function isSmallerOrEqualThanMax(scope) {
            return Date.parse(scope.value) <= Date.parse(scope.maxValue);
        }

        function isBiggerOrEqualThanMin(scope) {
            return Date.parse(scope.value) >= Date.parse(scope.minValue);
        }

        function isEqual(newValue, oldValue) {
            if (newValue === oldValue) {
                return true;
            }

            // 当两个value都是Date类型时，要判断两个值的年月日是否相等，直接用‘===’判断不准确
            if (utils.isDate(newValue) && utils.isDate(oldValue)) {
                // 转换成年月日，然后重新生成一个Date，再将其转换成毫秒数进行判断
                var newDate = new Date(newValue.getFullYear(),
                    newValue.getMonth(),
                    newValue.getDate());
                var oldDate = new Date(oldValue.getFullYear(),
                    oldValue.getMonth(),
                    oldValue.getDate());
                if (Date.parse(newDate) === Date.parse(oldDate)) {
                    return true;
                }
            }

            return false;
        }
    }

    return module.name;
});

define('components/datetime/datetime',['components/module', 'components/time/time', 'components/datePanel/datePanel', 'components/button/button'], function (module) {
    'use strict';

    var utils = window.tiny.utils;

    module.provider('datetimeService', datetimeService);
    function datetimeService() {
        var defaults = this.defaultValue = {
            maxValue: new Date(2099, 11, 31, 23, 59, 59),
            minValue: new Date(1970, 0, 1, 0, 0, 0),
            clearBtn: true,
            okBtn: true
        };

        // 开发者在angular应用的config阶段可以调用setDefaults方法来配置默认值
        this.setDefaults = function (newDefaults) {
            angular.extend(defaults, newDefaults);
        };

        this.$get = function () {
            return {
                defaultValue: this.defaultValue
            };
        };
    }

    module.directive('tiDatetime', tiDatetime);
    tiDatetime.$inject = ['$filter', 'datetimeService', 'datePanelService'];
    function tiDatetime($filter, datetimeSer, datePanelSer) {
        return {
            restrict: 'E',
            scope: {
                format: '=?',
                value: '=?',
                maxValue: '=?',
                minValue: '=?',
                disable: '=?',
                okBtn: '=?',
                clearBtn: '=?',
                close: '&'
            },
            templateUrl: '/tiny-components/src/components/datetime/datetime.html',
            replace: true,
            link: linkFn
        };

        function linkFn(scope, $element) {
            init(scope);

            addBehavior(scope, $element);

            addWatcher(scope);
        }

        function init(scope) {
            // 日期时间格式校验
            validateFormat(scope);

            // 最大最小值校验
            validateMinAndMax(scope);

            // value值校验
            validateValue(scope);

            // 将value转换为format接口格式的字符串
            formatValue(scope);

            // 设置下拉面板中按钮
            setBtn(scope);
        }

        function validateFormat(scope) {
            var tinyLanguage = window.tiny.language;

            // 用户设置format不是一个对象，设置为国际配置的format或默认值
            if (!$.isPlainObject(scope.format)) {
                scope.format = {
                    date: tinyLanguage.date_format,
                    time: tinyLanguage.time_format
                };
                return;
            }

            // 日期格式校验
            if (!_.isString(scope.format.date)) {
                scope.format.date = tinyLanguage.date_format;
            }

            // 时间格式校验
            if (!_.isString(scope.format.time)) {
                scope.format.time = tinyLanguage.time_format;
            }
        }

        function validateMinAndMax(scope) {
            var defaultValue = datetimeSer.defaultValue;

            // 最大值合法性校验
            scope.maxValue = utils.isDate(scope.maxValue) ? scope.maxValue : defaultValue.maxValue;

            // 最小值合法性校验
            scope.minValue = utils.isDate(scope.minValue) ? scope.minValue : defaultValue.minValue;

            // 最大最小值矛盾时，设置为默认值
            if (isSmaller(scope.maxValue, scope.minValue)) {
                scope.maxValue = defaultValue.maxValue;
                scope.minValue = defaultValue.minValue;
            }
        }

        function validateValue(scope) {
            // value为null时，输入框中显示空白
            if (scope.value === null) {
                return;
            }

            // 传入的value值非日期时，设置为当前日期
            if (!utils.isDate(scope.value)) {
                scope.value = new Date();
            }

            // 最大值校验
            if (isBigger(scope.value, scope.maxValue)) {
                scope.value = scope.maxValue;
            }

            // 最小值校验
            if (isSmaller(scope.value, scope.minValue)) {
                scope.value = scope.minValue;
            }
        }

        function formatValue(scope) {
            if (scope.value === null) {
                scope.showValue = '';
                return;
            }

            var format = scope.format.date + ' ' + addAmPm(scope.format.time);
            scope.showValue = $filter('date')(scope.value, format);
        }

        function setBtn(scope) {
            // 设置ok按钮是否显示
            var defaultValue = datetimeSer.defaultValue;
            if (_.isUndefined(scope.okBtn)) {
                scope.okBtn = defaultValue.okBtn;
            }

            // 设置clear按钮是否显示
            if (_.isUndefined(scope.clearBtn)) {
                scope.clearBtn = defaultValue.clearBtn;
            }


            // 设置button的国际化文本
            var tinyLanguage = window.tiny.language;
            scope.btnLanguage = {
                clear: tinyLanguage.date_clear_btn,
                ok: tinyLanguage.ok_btn
            };
        }

        function addBehavior(scope, $element) {
            scope.isInnerClick = false;

            scope.showClickFn = function () {
                if (scope.disable) {
                    return;
                }

                scope.isInnerClick = true; // 用于阻止document上的点击事件回调函数执行

                scope.isOpenPicker = !scope.isOpenPicker;
                if (scope.isOpenPicker) {
                    setPickerDatetime(scope);

                    // 设置下拉面板的位置
                    setTimeout(function () {
                        datePanelSer.setPanelPosition($element);
                    }, 0);
                } else {
                    closePicker(scope);
                }
            };

            // 监控日期显示框上的keydown事件
            scope.keydownFn = function ($event) {
                switch ($event.keyCode) {
                    case 9 : // TAB键
                        responseTab();
                        break;
                    case 13 : // ENTER键(大键盘)
                    case 108 : // ENTER键(数字小键盘)
                        responseEnter();
                        break;
                    default :
                        break;
                }

                function responseEnter() {
                    if (scope.disable || scope.isOpenPicker) {
                        return;
                    }

                    scope.isOpenPicker = true;

                    // 设置datePanel指令的接口值
                    setPickerDatetime(scope);

                    // 设置下拉面板的位置
                    setTimeout(function () {
                        datePanelSer.setPanelPosition($element);
                    }, 0);
                }

                function responseTab() {
                    if (scope.isOpenPicker) {
                        closePicker(scope);
                    }
                }
            };

            scope.pickerClickFn = function ($event) {
                if (!datePanelSer.isClickYearMonthPicker($event, $element)) {
                    scope.datePanel.isOpenYearMonthPicker = false;
                }

                // 阻止事件的原因：防止click事件冒泡到document上，触发document的click回调，导致关闭下拉框
                $event.stopPropagation();
            };

            scope.timeKeydownFn = function ($event) {
                if (!window.tiny.utils.browser.ie) {
                    return;
                }

                // 解决IE BUG：在输入框中按回车键，触发document上的click事件，导致下拉框收起
                if ($event.keyCode === 13 || $event.keyCode === 108) {
                    $event.preventDefault();
                }
            };

            scope.okClickFn = function () {
                closePicker(scope);
            };

            scope.clearClickFn = function () {
                scope.value = null;

                closePicker(scope);
            };

            scope.documentClickFn = function () {
                if (scope.disable) {
                    return;
                }

                // 如果是点击输入框事件，不做处理
                if (scope.isInnerClick) {
                    scope.isInnerClick = false;
                    return;
                }

                scope.$evalAsync(function () {
                    if (scope.isOpenPicker) {
                        closePicker(scope);
                    }
                });
            };
            $(document).on('click', scope.documentClickFn);

            scope.documentKeydownFn = function (event) {
                // 按下ESC键时，关闭下拉面板
                if (event.keyCode === 27) {
                    if (scope.isOpenPicker) {
                        scope.$evalAsync(function () {
                            // 如果输入框中显示空白，不作处理
                            var value = scope.value;
                            if (utils.isDate(value)) {
                                // 将输入框中值重新更新给value
                                // 这么做原因：time输入框focus状态下，按ESC关闭下拉时，输入框值可能是非法时间值
                                value = new Date(getDateStr(value) + ' ' + addColon(scope.timeOptions.value));
                                scope.value = utils.isDate(value) ? value : null;
                            }

                            closePicker(scope);
                        });
                    }
                }

                // tab键实现在下拉面板中循环
                if (event.keyCode === 9) {
                    datePanelSer.tabKeydownFn(scope, $('.ti-date-picker', $element), event);
                }
            };
            $(document).on('keydown', scope.documentKeydownFn);

            $element.on('$destroy', function () {
                $(document).off('click', scope.documentClickFn);
                $(document).off('keydown', scope.documentKeydownFn);
            });
        }

        function closePicker(scope) {
            scope.isOpenPicker = false;

            if (_.isFunction(scope.close())) {
                scope.close()(scope.value);
            }
        }

        function setPickerDatetime(scope) {
            // 设置下拉面板中datePanel组件接口
            setDatePanel(scope);

            // 设置下拉面板中time组件接口
            setTime(scope);
        }

        function setDatePanel(scope) {
            scope.datePanel = {
                type: 'begin',
                maxValue: scope.maxValue,
                minValue: scope.minValue,
                isOpenYearMonthPicker: false,
                value: {
                    begin: scope.value,
                    end: null
                },
                dayClick: function () {
                    var dateStr = getDateStr(scope.datePanel.value.begin);
                    scope.value = new Date(dateStr + ' ' + addColon(scope.timeOptions.value));

                    // 做最大最小值校验的原因：当选择的日期是最小或者最大日时，当前time不在最大最小值范围时，得到的value非法
                    // 最大值校验
                    if (isBigger(scope.value, scope.maxValue)) {
                        scope.value = scope.maxValue;
                        scope.timeOptions.value = getTimeStr(scope.value);
                    }

                    // 最小值校验
                    if (isSmaller(scope.value, scope.minValue)) {
                        scope.value = scope.minValue;
                        scope.timeOptions.value = getTimeStr(scope.value);
                    }

                    setTimeMaxValue(scope);

                    setTimeMinValue(scope);
                }
            };
        }

        function setTime(scope) {
            scope.timeOptions = {};

            // value接口设置
            setTimeValue(scope);

            // maxValue接口设置
            setTimeMaxValue(scope);

            // minValue接口设置
            setTimeMinValue(scope);

            // blur事件设置
            scope.timeOptions.blur = function (timeValue) {
                // 如果输入框中显示空白，那么time改变，不放入输入框中
                var value = scope.value;
                if (!utils.isDate(value)) {
                    return;
                }

                scope.value = new Date(getDateStr(value) + ' ' + addColon(timeValue));
            };

            scope.timeOptions.change = function (timeValue) {
                // 如果输入框中显示空白(用户未选中日期)，那么time改变，不放入输入框中
                if (!utils.isDate(scope.value)) {
                    return;
                }

                var dateStr = $filter('date')(scope.value, scope.format.date);
                scope.showValue = dateStr + ' ' + timeValue;
            };
        }

        function setTimeValue(scope) {
            if (utils.isDate(scope.value)) {
                scope.timeOptions.value = getTimeStr(scope.value);
            } else {
                scope.timeOptions.value = '';
            }
        }

        function setTimeMaxValue(scope) {
            if (!utils.isDate(scope.value)) {
                return;
            }

            if (isDateEqual(scope.value, scope.maxValue)) {
                scope.timeOptions.maxValue = getTimeStr(scope.maxValue);
            } else {
                scope.timeOptions.maxValue = '23:59:59';
            }
        }

        function setTimeMinValue(scope) {
            if (!utils.isDate(scope.value)) {
                return;
            }

            if (isDateEqual(scope.value, scope.minValue)) {
                scope.timeOptions.minValue = getTimeStr(scope.minValue);
            } else {
                scope.timeOptions.minValue = '00:00:00';
            }
        }

        function addWatcher(scope) {
            scope.$watch('value', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 新的value是非法时，value值保持之前值不变
                if (!isValidValue(scope)) {
                    scope.value = oldValue;
                    return;
                }

                formatValue(scope);
            });

            scope.$watch('maxValue', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 新的maxValue是非法时，maxValue值保持之前值不变
                if (!isValidMaxValue(scope)) {
                    scope.maxValue = oldValue;
                    return;
                }

                // 输入框空白时，不用对value进行最小值校验
                if (scope.value === null) {
                    return;
                }

                // 对value值进行最大值校验
                if (isBigger(scope.value, scope.maxValue)) {
                    scope.value = scope.maxValue;
                }
            });

            scope.$watch('minValue', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 新的minValue是非法时，minValue值保持之前值不变
                if (!isValidMinValue(scope)) {
                    scope.minValue = oldValue;
                    return;
                }

                // 输入框空白时，不用对value进行最小值校验
                if (scope.value === null) {
                    return;
                }

                // 对value值进行最小值校验
                if (isSmaller(scope.value, scope.minValue)) {
                    scope.value = scope.minValue;
                }
            });

            scope.$watch('format', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 新的format非法时，format值保持之前值不变
                if (!isValidFormat(newValue)) {
                    scope.format = oldValue;
                    return;
                }

                // 对value进行格式化
                formatValue(scope);
            }, true);
        }

        function isValidValue(scope) {
            // value值为null时会将输入框清空，是一个合法的value值
            if (scope.value === null) {
                return true;
            }

            // value值为一个Date类型值并且在最大最小值范围内时，是一个合法值
            if (utils.isDate(scope.value) &&
                isBiggerOrEqual(scope.value, scope.minValue) &&
                isSmallerOrEqual(scope.value, scope.maxValue)) {
                return true;
            }

            return false;
        }

        function isValidMaxValue(scope) {
            return utils.isDate(scope.maxValue) && isBiggerOrEqual(scope.maxValue, scope.minValue);
        }

        function isValidMinValue(scope) {
            return utils.isDate(scope.minValue) && isBiggerOrEqual(scope.maxValue, scope.minValue);
        }

        function isValidFormat(format) {
            return $.isPlainObject(format) && _.isString(format.date) && _.isString(format.time);
        }

        function getTimeStr(value) {
            return value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
        }

        function getDateStr(value) {
            return value.getFullYear() + '/' + (value.getMonth() + 1) + '/' + value.getDate();
        }

        function addColon(value) {
            // new Date()时，时间中没有一个冒号得到的是非法时间
            if (value.match(/:/)) {
                return value;
            }
            var ampm = value.match(/am|AM|pm|PM/) || '';
            return parseInt(value, 10) + ': ' + ampm;
        }

        /**
         * @description 12小时制时，添加AMPM设置字符串。
         * 这样做的原因是：AngularJS的$filter服务不能自动添加AMPM
         * @param timeFormat 时间格式字符串
         */
        function addAmPm(timeFormat) {
            if (timeFormat.match(/h/)) {
                return timeFormat + ' a'; // AngularJS的$filter服务获取时间时，"a"代表AMPM
            }
            return timeFormat;
        }

        /**
         * 判断value1是否大于value2，大于时返回true，否则返回false
         * @param value1 Date类型
         * @param value2 Date类型
         */
        function isBigger(value1, value2) {
            return Date.parse(value1) > Date.parse(value2);
        }

        /**
         * 判断value1是否小于value2，小于时返回true，否则返回false
         * @param value1 Date类型
         * @param value2 Date类型
         */
        function isSmaller(value1, value2) {
            return Date.parse(value1) < Date.parse(value2);
        }

        /**
         * 判断value1是否大于等于value2，大于等于时返回true，否则返回false
         * @param value1 Date类型
         * @param value2 Date类型
         */
        function isBiggerOrEqual(value1, value2) {
            return Date.parse(value1) >= Date.parse(value2);
        }

        /**
         * 判断value1是否小于等于value2，小于等于时返回true，否则返回false
         * @param value1 Date类型
         * @param value2 Date类型
         */
        function isSmallerOrEqual(value1, value2) {
            return Date.parse(value1) <= Date.parse(value2);
        }


        /**
         * 判断两个值的年月日是否相等，相等时返回true，否则返回false
         * @param value1 Date类型
         * @param value2 Date类型
         */
        function isDateEqual(value1, value2) {
            var newValue1 = new Date(value1.getFullYear(), value1.getFullYear(), value1.getDate());
            var newValue2 = new Date(value2.getFullYear(), value2.getFullYear(), value2.getDate());
            if (Date.parse(newValue1) === Date.parse(newValue2)) {
                return true;
            }

            return false;
        }
    }

    return module.name;
});

define('components/dateRange/dateRange',['components/module', 'components/datePanel/datePanel', 'components/button/button'], function (module) {
    'use strict';

    var utils = window.tiny.utils;

    module.provider('dateRangeService', dateRangeService);
    function dateRangeService() {
        var defaults = this.defaultValue = {
            maxValue: new Date(2099, 11, 31, 23, 59, 59),
            minValue: new Date(1970, 0, 1, 0, 0, 0)
        };

        // 开发者在angular应用的config阶段可以调用setDefaults方法来配置默认值
        this.setDefaults = function (newDefaults) {
            angular.extend(defaults, newDefaults);
        };

        this.$get = function () {
            return {
                defaultValue: this.defaultValue
            };
        };
    }

    module.directive('tiDateRange', tiDateRange);
    tiDateRange.$inject = ['$filter', 'dateRangeService', 'datePanelService'];
    function tiDateRange($filter, dateRangeSer, datePanelSer) {
        return {
            restrict: 'E',
            scope: {
                format: '=?',
                value: '=?',
                maxValue: '=?',
                minValue: '=?',
                disable: '=?'
            },
            templateUrl: '/tiny-components/src/components/dateRange/dateRange.html',
            replace: true,
            link: linkFn
        };

        function linkFn(scope, $element) {
            init(scope);

            addBehavior(scope, $element);

            addWatcher(scope, $element);
        }

        function init(scope) {
            // 设置下拉面板中的国际化文本
            setLanguage(scope);

            // 日期格式校验
            validateFormat(scope);

            // 最大最小值校验
            validateMaxAndMin(scope);

            // value值校验
            validateValue(scope);

            // 将value转换成format接口格式的字符串
            formatValue(scope);
        }

        /**
         * @description 设置下拉面板的国际化文本
         * @param scope tiDateRange指令的scope
         */
        function setLanguage(scope) {
            var language = window.tiny.language;

            // 设置button的国际化文本
            scope.btnLanguage = {
                cancel: language.cancel_btn,
                clear: language.date_clear_btn,
                ok: language.ok_btn
            };

            scope.beginText = language.date_range_begin_label;
            scope.endText = language.date_range_end_label;
        }

        function validateFormat(scope) {
            if (_.isString(scope.format)) {
                return;
            }

            scope.format = window.tiny.language.date_format;
        }

        function validateMaxAndMin(scope) {
            var defaultValue = dateRangeSer.defaultValue;

            // 最大值合法性校验
            var maxTimeChanged = datePanelSer.changeMaxTime(scope.maxValue);
            scope.maxValue = utils.isDate(scope.maxValue) ? maxTimeChanged : defaultValue.maxValue;

            // 最小值合法性校验
            var minTimeChanged = datePanelSer.changeMinTime(scope.minValue);
            scope.minValue = utils.isDate(scope.minValue) ? minTimeChanged : defaultValue.minValue;

            // 最大最小值矛盾时，设置为默认值
            if (Date.parse(scope.maxValue) < Date.parse(scope.minValue)) {
                scope.maxValue = defaultValue.maxValue;
                scope.minValue = defaultValue.minValue;
            }
        }

        function validateValue(scope) {
            // value不是对象时，将value设置为null，输入框中显示空白
            if (!$.isPlainObject(scope.value)) {
                scope.value = null;
                return;
            }

            // 校验起始值
            validateBeginValue(scope);

            // 校验结束值
            validateEndValue(scope);

            // 校验后的起始和结束日期矛盾
            if (isBigger(scope.value.begin, scope.value.end)) {
                scope.value.begin = scope.minValue;
                scope.value.end = scope.maxValue;
            }
        }

        function validateBeginValue(scope) {
            // 传入的开始值非日期时，设置为最小日期
            if (!utils.isDate(scope.value.begin)) {
                scope.value.begin = scope.minValue;
                return;
            }

            // 最大值校验
            if (isBigger(scope.value.begin, scope.maxValue)) {
                scope.value.begin = scope.maxValue;
            }

            // 最小值校验
            if (isSmaller(scope.value.begin, scope.minValue)) {
                scope.value.begin = scope.minValue;
            }
        }

        function validateEndValue(scope) {
            // 传入的结束值非日期时，设置为最大日期
            if (!utils.isDate(scope.value.end)) {
                scope.value.end = scope.maxValue;
                return;
            }

            // 最大值校验
            if (isBigger(scope.value.end, scope.maxValue)) {
                scope.value.end = scope.maxValue;
            }

            // 最小值校验
            if (isSmaller(scope.value.end, scope.minValue)) {
                scope.value.end = scope.minValue;
            }
        }

        function formatValue(scope) {
            if (scope.value === null) {
                scope.showValue = '';
                return;
            }

            var begin = $filter('date')(scope.value.begin, scope.format);
            var end = $filter('date')(scope.value.end, scope.format);
            scope.showValue = begin + window.tiny.language.date_range_to_label + end;
        }

        function addBehavior(scope, $element) {
            scope.isInnerClick = false;

            scope.showClickFn = function () {
                if (scope.disable) {
                    return;
                }

                scope.isInnerClick = true; // 用于阻止document上的点击事件回调函数执行

                scope.isOpenPicker = !scope.isOpenPicker;
                if (scope.isOpenPicker) {
                    setPickerDate(scope, $element);

                    // 设置下拉面板的位置
                    setTimeout(function () {
                        datePanelSer.setPanelPosition($element);
                    }, 0);
                }
            };

            // 监控日期显示框上的keydown事件
            scope.keydownFn = function ($event) {
                switch ($event.keyCode) {
                    case 9 : // TAB键
                        responseTab();
                        break;
                    case 13 : // ENTER键(大键盘)
                    case 108 : // ENTER键(数字小键盘)
                        responseEnter();
                        break;
                    default :
                        break;
                }

                function responseEnter() {
                    if (scope.disable || scope.isOpenPicker) {
                        return;
                    }

                    scope.isOpenPicker = true;

                    // 设置datePanel指令的接口值
                    setPickerDate(scope, $element);

                    // 设置下拉面板的位置
                    setTimeout(function () {
                        datePanelSer.setPanelPosition($element);
                    }, 0);
                }

                function responseTab() {
                    if (scope.isOpenPicker) {
                        scope.isOpenPicker = false;
                    }
                }
            };

            scope.pickerClickFn = function ($event) {
                // 设置开始部分年月面板是否关闭
                var $begin = $($event.target).parents('.ti-date-range-begin-container');
                if ($begin.length === 0 ||
                    !datePanelSer.isClickYearMonthPicker($event, $begin)) {
                    scope.begin.isOpenYearMonthPicker = false;
                }

                // 设置结束部分年月面板是否关闭
                var $end = $($event.target).parents('.ti-date-range-end-container');
                if ($end.length === 0 || !datePanelSer.isClickYearMonthPicker($event, $end)) {
                    scope.end.isOpenYearMonthPicker = false;
                }

                // 阻止事件的原因：防止click事件冒泡到document上，触发document的click回调，导致关闭下拉框
                $event.stopPropagation();
            };

            scope.okClickFn = function () {
                if ($("[ng-bind='btnLanguage.ok']", $element).attr('disabled') === 'disabled') {
                    return;
                }

                scope.value = {};
                if ($.isPlainObject(scope.begin.value) && $.isPlainObject(scope.end.value)) {
                    scope.value.begin = scope.begin.value.begin;
                    scope.value.end = scope.end.value.end;
                } else {
                    scope.value = null;
                }

                scope.isOpenPicker = false;
            };

            scope.clearClickFn = function () {
                scope.value = null;
                scope.begin.value = null;
                scope.end.value = null;
            };

            scope.cancelClickFn = function () {
                scope.isOpenPicker = false;
            };

            scope.documentClickFn = function () {
                if (scope.disable) {
                    return;
                }

                // 如果是点击输入框事件，不做处理
                if (scope.isInnerClick) {
                    scope.isInnerClick = false;
                    return;
                }

                scope.$evalAsync(function () {
                    if (scope.isOpenPicker) {
                        scope.isOpenPicker = false;
                    }
                });
            };
            $(document).on('click', scope.documentClickFn);

            scope.documentKeydownFn = function (event) {
                // 按下ESC键时，关闭下拉面板
                if (event.keyCode === 27) {
                    if (scope.isOpenPicker) {
                        scope.$evalAsync(function () {
                            scope.isOpenPicker = false;
                        });
                    }
                }

                // tab键实现在下拉面板中循环
                if (event.keyCode === 9) {
                    datePanelSer.tabKeydownFn(scope, $('.ti-date-range-picker', $element), event);
                }
            };
            $(document).on('keydown', scope.documentKeydownFn);

            $element.on('$destroy', function () {
                $(document).off('click', scope.documentClickFn);
                $(document).off('keydown', scope.documentKeydownFn);
            });
        }

        function addWatcher(scope, $element) {
            scope.$watch('value', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 新value值非法时，保持之前值不变
                if (!isValidValue(scope)) {
                    scope.value = oldValue;
                    return;
                }

                // 将value值格式化
                formatValue(scope);

                if (scope.isOpenPicker) {
                    setPickerDate(scope, $element);
                }
            }, true);

            scope.$watch('maxValue', function (newValue, oldValue) {
                if (isEqual(newValue, oldValue)) {
                    return;
                }

                // 设置的最大值非法时，最大值保持之前值不变
                if (!isValidMaxValue(scope)) {
                    scope.maxValue = oldValue;
                    return;
                }

                scope.maxValue = datePanelSer.changeMaxTime(scope.maxValue);

                // 输入框空白时，不用对其进行最大值校验
                if (scope.value === null) {
                    return;
                }

                // 对起始值进行最大值校验
                if (isBigger(scope.value.begin, scope.maxValue)) {
                    scope.value.begin = scope.maxValue;
                }

                // 对结束值进行最大值校验
                if (isBigger(scope.value.end, scope.maxValue)) {
                    scope.value.end = scope.maxValue;
                }
            });

            scope.$watch('minValue', function (newValue, oldValue) {
                if (isEqual(newValue, oldValue)) {
                    return;
                }

                // 设置的最小值非法时，最小值保持之前值不变
                if (!isValidMinValue(scope)) {
                    scope.minValue = oldValue;
                    return;
                }

                scope.minValue = datePanelSer.changeMinTime(scope.minValue);

                // 输入框空白时，不用对其进行最小值校验
                if (scope.value === null) {
                    return;
                }

                // 对起始值进行最小值校验
                if (isSmaller(scope.value.begin, scope.minValue)) {
                    scope.value.begin = scope.minValue;
                }

                // 对结束值进行最小值校验
                if (isSmaller(scope.value.end, scope.minValue)) {
                    scope.value.end = scope.minValue;
                }
            });

            scope.$watch('format', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 新的format非法时，format值保持之前值不变
                if (!_.isString(newValue)) {
                    scope.format = oldValue;
                    return;
                }

                // 对value进行格式化
                formatValue(scope);
            });

            scope.$watch('begin.value', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 同步修改结束datePanel指令中的value，保证开始和结束指令中的value始终相等
                scope.end.value = newValue;

                setOkBtnState(newValue, $element);
            }, true);

            scope.$watch('end.value', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 同步修改开始datePanel指令中的value，保证开始和结束指令中的value始终相等
                scope.begin.value = newValue;

                setOkBtnState(newValue, $element);
            }, true);
        }

        function isValidValue(scope) {
            var value = scope.value;
            if (value === null) {
                return true;
            }

            var validRange = $.isPlainObject(value) &&
                utils.isDate(value.begin) && utils.isDate(value.end) &&
                Date.parse(value.begin) <= Date.parse(value.end) &&
                isBetweenMaxAndmin(value.begin) && isBetweenMaxAndmin(value.end);

            if (validRange) {
                return true;
            }

            return false;

            function isBetweenMaxAndmin(date) {
                return Date.parse(date) <= Date.parse(scope.maxValue) &&
                    Date.parse(date) >= Date.parse(scope.minValue);
            }
        }

        function isEqual(newValue, oldValue) {
            if (newValue === oldValue) {
                return true;
            }

            // 当两个value都是Date类型时，要判断两个值的年月日是否相等，直接用‘===’判断不准确
            if (utils.isDate(newValue) && utils.isDate(oldValue)) {
                // 转换成年月日，然后重新生成一个Date，再将其转换成毫秒数进行判断
                var newDate = new Date(newValue.getFullYear(),
                    newValue.getMonth(),
                    newValue.getDate());
                var oldDate = new Date(oldValue.getFullYear(),
                    oldValue.getMonth(),
                    oldValue.getDate());
                if (Date.parse(newDate) === Date.parse(oldDate)) {
                    return true;
                }
            }

            return false;
        }

        function isValidMaxValue(scope) {
            return utils.isDate(scope.maxValue) &&
                (Date.parse(scope.maxValue) >= Date.parse(scope.minValue));
        }

        function isValidMinValue(scope) {
            return utils.isDate(scope.minValue) &&
                (Date.parse(scope.maxValue) >= Date.parse(scope.minValue));
        }

        function setOkBtnState(value, $element) {
            // 保证获取ok按钮DOM时，下拉面板DOM已经渲染完成
            setTimeout(function () {
                var $btn = $("[ng-bind='btnLanguage.ok']", $element);
                if (!$.isPlainObject(value) || !utils.isDate(value.begin)
                    || !utils.isDate(value.end) || isBigger(value.begin, value.end)) {
                    $btn.attr('disabled', true);
                } else {
                    $btn.attr('disabled', false);
                    $btn[0].focus();
                }
            }, 0);
        }

        function setPickerDate(scope, $element) {
            var value = scope.value;
            value = $.isPlainObject(value) ? ($.extend(true, {}, value)) : null;

            scope.begin = {
                value: value,
                isOpenYearMonthPicker: false,
                maxValue: scope.maxValue,
                minValue: scope.minValue,
                type: 'begin'
            };

            scope.end = {
                value: value,
                isOpenYearMonthPicker: false,
                maxValue: scope.maxValue,
                minValue: scope.minValue,
                type: 'end'
            };

            setOkBtnState(scope.value, $element);
        }

        /**
         * 判断value1是否大于value2，大于时返回true，否则返回false
         * @param value1 Date类型
         * @param value2 Date类型
         */
        function isBigger(value1, value2) {
            return Date.parse(value1) > Date.parse(value2);
        }

        /**
         * 判断value1是否小于value2，小于时返回true，否则返回false
         * @param value1 Date类型
         * @param value2 Date类型
         */
        function isSmaller(value1, value2) {
            return Date.parse(value1) < Date.parse(value2);
        }
    }

    return module.name;
});

define('components/datetimeRange/datetimeRange',['components/module', 'components/time/time', 'components/datePanel/datePanel', 'components/button/button'], function (module) {
    'use strict';

    var utils = window.tiny.utils;

    module.provider('datetimeRangeService', datetimeRangeService);
    function datetimeRangeService() {
        var defaults = this.defaultValue = {
            maxValue: new Date(2099, 11, 31, 23, 59, 59),
            minValue: new Date(1970, 0, 1, 0, 0, 0)
        };

        // 开发者在angular应用的config阶段可以调用setDefaults方法来配置默认值
        this.setDefaults = function (newDefaults) {
            angular.extend(defaults, newDefaults);
        };

        this.$get = function () {
            var service = {
                constant: this.constant,
                defaultValue: this.defaultValue
            };
            return service;
        };
    }

    module.directive('tiDatetimeRange', tiDatetimeRange);
    tiDatetimeRange.$inject = ['$filter', 'datetimeRangeService', 'datePanelService'];
    function tiDatetimeRange($filter, datetimeRangeSer, datePanelSer) {
        return {
            restrict: 'E',
            scope: {
                format: '=?',
                value: '=?',
                maxValue: '=?',
                minValue: '=?',
                disable: '=?'
            },
            templateUrl: '/tiny-components/src/components/datetimeRange/datetimeRange.html',
            replace: true,
            link: linkFn
        };

        function linkFn(scope, $element) {
            init(scope);

            addBehavior(scope, $element);

            addWatcher(scope, $element);
        }

        function init(scope) {
            // 设置下拉面板中的国际化文本
            setLanguage(scope);

            // 日期时间格式校验
            validateFormat(scope);

            // 最大最小值校验
            validateMaxAndMin(scope);

            // value值校验
            validateValue(scope);

            // 将value转换成format接口格式的字符串
            formatValue(scope);
        }

        function setLanguage(scope) {
            var language = window.tiny.language;

            // 设置button的国际化文本
            scope.btnLanguage = {
                cancel: language.cancel_btn,
                clear: language.date_clear_btn,
                ok: language.ok_btn
            };

            scope.beginText = language.date_range_begin_label;
            scope.endText = language.date_range_end_label;
            scope.timeText = language.datetime_range_time_label;
        }

        function validateFormat(scope) {
            var tinyLanguage = window.tiny.language;

            // 用户设置format不是一个对象，设置为国际配置的format或默认值
            if (!$.isPlainObject(scope.format)) {
                scope.format = {
                    date: tinyLanguage.date_format,
                    time: tinyLanguage.time_format
                };
                return;
            }

            // 日期格式校验
            if (!_.isString(scope.format.date)) {
                scope.format.date = tinyLanguage.date_format;
            }

            // 时间格式校验
            if (!_.isString(scope.format.time)) {
                scope.format.time = tinyLanguage.time_format;
            }
        }

        function validateMaxAndMin(scope) {
            var defaults = datetimeRangeSer.defaultValue;

            // 最大值校验
            scope.maxValue = utils.isDate(scope.maxValue) ? scope.maxValue : defaults.maxValue;

            // 最小值校验
            scope.minValue = utils.isDate(scope.minValue) ? scope.minValue : defaults.minValue;

            // 最大最小值矛盾时，设置为默认值
            if (Date.parse(scope.maxValue) < Date.parse(scope.minValue)) {
                scope.maxValue = defaults.maxValue;
                scope.minValue = defaults.minValue;
            }
        }

        function validateValue(scope) {
            // value不是对象时，将value设置为null，输入框中显示空白
            if (!$.isPlainObject(scope.value)) {
                scope.value = null;
                return;
            }

            // 校验起始值
            validateBeginValue(scope);

            // 校验结束值
            validateEndValue(scope);

            // 校验后的起始和结束日期矛盾
            if (isBigger(scope.value.begin, scope.value.end)) {
                scope.value.begin = scope.minValue;
                scope.value.end = scope.maxValue;
            }
        }

        function validateBeginValue(scope) {
            // 传入的开始值非日期时，设置为最小日期
            if (!utils.isDate(scope.value.begin)) {
                scope.value.begin = scope.minValue;
                return;
            }

            // 最大值校验
            if (isBigger(scope.value.begin, scope.maxValue)) {
                scope.value.begin = scope.maxValue;
            }

            // 最小值校验
            if (isSmaller(scope.value.begin, scope.minValue)) {
                scope.value.begin = scope.minValue;
            }
        }

        function validateEndValue(scope) {
            // 传入的结束值非日期时，设置为最大日期
            if (!utils.isDate(scope.value.end)) {
                scope.value.end = scope.maxValue;
                return;
            }

            // 最大值校验
            if (isBigger(scope.value.end, scope.maxValue)) {
                scope.value.end = scope.maxValue;
            }

            // 最小值校验
            if (isSmaller(scope.value.end, scope.minValue)) {
                scope.value.end = scope.minValue;
            }
        }

        /**
         * 判断value1是否大于value2，大于时返回true，否则返回false
         * @param value1 Date类型
         * @param value2 Date类型
         */
        function isBigger(value1, value2) {
            return Date.parse(value1) > Date.parse(value2);
        }

        /**
         * 判断value1是否小于value2，小于时返回true，否则返回false
         * @param value1 Date类型
         * @param value2 Date类型
         */
        function isSmaller(value1, value2) {
            return Date.parse(value1) < Date.parse(value2);
        }

        function formatValue(scope) {
            if (scope.value === null) {
                scope.showValue = '';
                return;
            }

            var format = scope.format.date + ' ' + addAmPm(scope.format.time);
            var begin = $filter('date')(scope.value.begin, format);
            var end = $filter('date')(scope.value.end, format);
            scope.showValue = begin + window.tiny.language.date_range_to_label + end;
        }

        /**
         * @description 12小时制时，添加AMPM设置字符串。
         * 这样做的原因是：AngularJS的$filter服务不能自动添加AMPM
         * @param timeFormat 时间格式字符串
         */
        function addAmPm(timeFormat) {
            if (timeFormat.match(/h/)) {
                return timeFormat + ' a'; // AngularJS的$filter服务获取时间时，"a"代表AMPM
            }
            return timeFormat;
        }

        function addBehavior(scope, $element) {
            scope.isInnerClick = false;

            scope.showClickFn = function () {
                if (scope.disable) {
                    return;
                }

                scope.isInnerClick = true; // 用于阻止document上的点击事件回调函数执行

                scope.isOpenPicker = !scope.isOpenPicker;

                if (scope.isOpenPicker) {
                    setPickerDate(scope);

                    // 设置下拉面板的位置
                    setTimeout(function () {
                        datePanelSer.setPanelPosition($element);
                    }, 0);
                }
            };

            // 监控日期显示框上的keydown事件
            scope.keydownFn = function ($event) {
                switch ($event.keyCode) {
                    case 9 : // TAB键
                        responseTab();
                        break;
                    case 13 : // ENTER键(大键盘)
                    case 108 : // ENTER键(数字小键盘)
                        responseEnter();
                        break;
                    default :
                        break;
                }

                function responseEnter() {
                    if (scope.disable || scope.isOpenPicker) {
                        return;
                    }

                    scope.isOpenPicker = true;

                    // 设置datePanel指令的接口值
                    setPickerDate(scope);

                    // 设置下拉面板的位置
                    setTimeout(function () {
                        datePanelSer.setPanelPosition($element);
                    }, 0);
                }

                function responseTab() {
                    if (scope.isOpenPicker) {
                        scope.isOpenPicker = false;
                    }
                }
            };

            scope.pickerClickFn = function ($event) {
                // 设置开始部分年月面板是否关闭
                var $begin = $($event.target).parents('.ti-date-range-begin-container');
                if ($begin.length === 0 ||
                    !datePanelSer.isClickYearMonthPicker($event, $begin)) {
                    scope.beginDate.isOpenYearMonthPicker = false;
                }

                // 设置结束部分年月面板是否关闭
                var $end = $($event.target).parents('.ti-date-range-end-container');
                if ($end.length === 0 || !datePanelSer.isClickYearMonthPicker($event, $end)) {
                    scope.endDate.isOpenYearMonthPicker = false;
                }

                // 阻止事件的原因：防止click事件冒泡到document上，触发document的click回调，导致关闭下拉框
                $event.stopPropagation();
            };

            scope.timeKeydownFn = function ($event) {
                if (!window.tiny.utils.browser.ie) {
                    return;
                }

                // 解决IE BUG：在输入框中按回车键，触发document上的click事件，导致下拉框收起
                if ($event.keyCode === 13 || $event.keyCode === 108) {
                    $event.preventDefault();
                }
            };

            scope.okClickFn = function () {
                if (scope.isOkDisabled) {
                    return;
                }

                scope.value = $.isPlainObject(scope.value) ? scope.value : {};

                // 设置起始日期时间
                var beginDateStr = getDateStr(scope.beginDate.value.begin);
                scope.value.begin = new Date(beginDateStr + ' ' + addColon(scope.beginTime.value));

                // 设置结束日期时间
                var endDateStr = getDateStr(scope.endDate.value.end);
                scope.value.end = new Date(endDateStr + ' ' + addColon(scope.endTime.value));

                // 关闭下拉
                scope.isOpenPicker = false;
            };

            scope.clearClickFn = function () {
                scope.value = null;

                // datePanle指令value值设置
                scope.beginDate.value = null;
                scope.endDate.value = null;

                // time指令value值设置
                scope.beginTime.value = '';
                scope.endTime.value = '';
            };

            scope.cancelClickFn = function () {
                scope.isOpenPicker = false;
            };

            scope.documentClickFn = function () {
                if (scope.disable) {
                    return;
                }

                // 如果是点击输入框事件，不做处理
                if (scope.isInnerClick) {
                    scope.isInnerClick = false;
                    return;
                }

                scope.$evalAsync(function () {
                    if (scope.isOpenPicker) {
                        scope.isOpenPicker = false;
                    }
                });
            };
            $(document).on('click', scope.documentClickFn);

            scope.documentKeydownFn = function (event) {
                // 按下ESC键时，关闭下拉面板
                if (event.keyCode === 27) {
                    if (scope.isOpenPicker) {
                        scope.$evalAsync(function () {
                            scope.isOpenPicker = false;
                        });
                    }
                }

                // tab键实现在下拉面板中循环
                if (event.keyCode === 9) {
                    datePanelSer.tabKeydownFn(scope, $('.ti-date-range-picker', $element), event);
                }
            };
            $(document).on('keydown', scope.documentKeydownFn);

            $element.on('$destroy', function () {
                $(document).off('click', scope.documentClickFn);

                $(document).off('keydown', scope.documentKeydownFn);
            });
        }

        function setPickerDate(scope) {
            // 设置datePanel指令接口
            setDatePanelOptions(scope);

            // 设置time指令接口
            setTimeOptions(scope);

            // 设置OK按钮状态
            setOkBtnState(scope);
        }

        function setDatePanelOptions(scope) {
            var value = scope.value;

            // 做深拷贝的原因：不让value和datePanel组件中value双向绑定，
            // 因为下拉面板中日期变化时，不立即更新到输入框中
            value = $.isPlainObject(value) ? ($.extend(true, {}, value)) : null;

            scope.beginDate = {
                value: value,
                maxValue: scope.maxValue,
                minValue: scope.minValue,
                isOpenYearMonthPicker: false,
                type: 'begin'
            };

            scope.endDate = {
                value: value,
                maxValue: scope.maxValue,
                minValue: scope.minValue,
                isOpenYearMonthPicker: false,
                type: 'end'
            };
        }

        function setTimeOptions(scope) {
            // 设置开始time指令接口
            setBeginTimeOptions(scope);

            // 设置结束time指令接口
            setEndTimeOptions(scope);
        }

        function setBeginTimeOptions(scope) {
            scope.beginTime = {};

            // value接口设置
            setBeginTimeValue(scope);

            // maxValue接口设置
            setBeginTimeMaxValue(scope);

            // minValue接口设置
            setBeginTimeMinValue(scope);

            // blur事件设置
            scope.beginTime.blur = function () {
                setOkBtnState(scope);
            };
        }

        function setBeginTimeValue(scope) {
            if (scope.value === null) {
                scope.beginTime.value = '';
                return;
            }

            scope.beginTime.value = getTimeStr(scope.value.begin);
        }

        function setBeginTimeMinValue(scope) {
            // 起始日期是最小日期时，时间组件最小值是minValue接口中的时间；
            // 否则，时间组件最小值都是"00:00:00"
            var value = scope.beginDate.value;
            if ($.isPlainObject(value) && isEqual(scope.minValue, value.begin)) {
                scope.beginTime.minValue = getTimeStr(scope.minValue);
            } else {
                scope.beginTime.minValue = '00:00:00';
            }
        }

        function setBeginTimeMaxValue(scope) {
            // 起始日期是最大日期时，时间组件最大值是maxValue接口中的时间；
            // 否则，时间组件最大值是"23:59:59"
            var value = scope.beginDate.value;
            if ($.isPlainObject(value) && isEqual(scope.maxValue, value.begin)) {
                scope.beginTime.maxValue = getTimeStr(scope.maxValue);
            } else {
                scope.beginTime.maxValue = '23:59:59';
            }
        }

        function setEndTimeOptions(scope) {
            scope.endTime = {};

            // value接口设置
            setEndTimeValue(scope);

            // maxValue接口设置
            setEndTimeMaxValue(scope);

            // minValue接口设置
            setEndTimeMinValue(scope);

            // blur事件设置
            scope.endTime.blur = function () {
                setOkBtnState(scope);
            };
        }

        function setEndTimeValue(scope) {
            if (scope.value === null) {
                scope.endTime.value = '';
                return;
            }

            scope.endTime.value = getTimeStr(scope.value.end);
        }

        function setEndTimeMinValue(scope) {
            // 结束日期是最小日期时，时间组件最小值是minValue接口中的时间；
            // 否则，时间组件最小值都是"00:00:00"
            var value = scope.endDate.value;
            if ($.isPlainObject(value) && isEqual(scope.minValue, value.end)) {
                scope.endTime.minValue = getTimeStr(scope.minValue);
            } else {
                scope.endTime.minValue = '00:00:00';
            }
        }

        function setEndTimeMaxValue(scope) {
            // 结束日期是最大日期时，时间组件最大值是maxValue接口中的时间；
            // 否则，时间组件最大值是"23:59:59"
            var value = scope.endDate.value;
            if ($.isPlainObject(value) && isEqual(scope.maxValue, value.end)) {
                scope.endTime.maxValue = getTimeStr(scope.maxValue);
            } else {
                scope.endTime.maxValue = '23:59:59';
            }
        }

        function addWatcher(scope, $element) {
            scope.$watch('value', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 新value值非法时，保持之前值不变
                if (!isValidValue(scope)) {
                    scope.value = oldValue;
                    return;
                }

                // 将value值格式化
                formatValue(scope);

                if (scope.isOpenPicker) {
                    setPickerDate(scope, $element);
                }
            }, true);

            scope.$watch('maxValue', function (newValue, oldValue) {
                if (isDatetimeEqual(newValue, oldValue)) {
                    return;
                }

                // 设置的最大值非法时，最大值保持之前值不变
                if (!isValidMaxValue(scope)) {
                    scope.maxValue = oldValue;
                    return;
                }

                // 输入框空白时，不用对其进行最大值校验
                if (scope.value === null) {
                    return;
                }

                // 对起始值进行最大值校验
                if (isBigger(scope.value.begin, scope.maxValue)) {
                    scope.value.begin = scope.maxValue;
                }

                // 对结束值进行最大值校验
                if (isBigger(scope.value.end, scope.maxValue)) {
                    scope.value.end = scope.maxValue;
                }
            });

            scope.$watch('minValue', function (newValue, oldValue) {
                if (isDatetimeEqual(newValue, oldValue)) {
                    return;
                }

                // 设置的最小值非法时，最小值保持之前值不变
                if (!isValidMinValue(scope)) {
                    scope.minValue = oldValue;
                    return;
                }

                // 输入框空白时，不用对其进行最小值校验
                if (scope.value === null) {
                    return;
                }

                // 对起始值进行最小值校验
                if (isSmaller(scope.value.begin, scope.minValue)) {
                    scope.value.begin = scope.minValue;
                }

                // 对结束值进行最小值校验
                if (isSmaller(scope.value.end, scope.minValue)) {
                    scope.value.end = scope.minValue;
                }
            });

            scope.$watch('format', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 新的format非法时，format值保持之前值不变
                if (!isValidFormat(newValue)) {
                    scope.format = oldValue;
                    return;
                }

                // 对value进行格式化
                formatValue(scope);
            });

            scope.$watch('beginDate.value', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 开始日期有变化时，要重新设置其time组件对应最大最小值
                setBeginTimeMaxValue(scope);
                setBeginTimeMinValue(scope);

                // 同步修改结束datePanel指令中的value，保证开始和结束指令中的value始终相等
                scope.endDate.value = newValue;

                // 设置OK按钮的focus状态
                setOkBtnState(scope);
            }, true);

            scope.$watch('endDate.value', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 结束日期有变化时，要重新设置其time组件对应最大最小值
                setEndTimeMaxValue(scope);
                setEndTimeMinValue(scope);

                // 同步修改开始datePanel指令中的value，保证开始和结束指令中的value始终相等
                scope.beginDate.value = newValue;

                // 设置OK按钮的focus状态
                setOkBtnState(scope);
            }, true);
        }

        function isValidValue(scope) {
            var value = scope.value;
            if (value === null) {
                return true;
            }

            var validRange = $.isPlainObject(value) &&
                utils.isDate(value.begin) && utils.isDate(value.end) &&
                Date.parse(value.begin) <= Date.parse(value.end) &&
                isBetweenMaxAndmin(value.begin) && isBetweenMaxAndmin(value.end);

            if (validRange) {
                return true;
            }

            return false;

            function isBetweenMaxAndmin(date) {
                return Date.parse(date) <= Date.parse(scope.maxValue) &&
                    Date.parse(date) >= Date.parse(scope.minValue);
            }
        }

        function isDatetimeEqual(newValue, oldValue) {
            if (newValue === oldValue) {
                return true;
            }

            if (utils.isDate(newValue) && utils.isDate(oldValue)) {
                if (Date.parse(newValue) === Date.parse(oldValue)) {
                    return true;
                }
            }

            return false;
        }

        function isValidMaxValue(scope) {
            return utils.isDate(scope.maxValue) &&
                (Date.parse(scope.maxValue) >= Date.parse(scope.minValue));
        }

        function isValidMinValue(scope) {
            return utils.isDate(scope.minValue) &&
                (Date.parse(scope.maxValue) >= Date.parse(scope.minValue));
        }

        function isValidFormat(format) {
            return $.isPlainObject(format) && _.isString(format.date) && _.isString(format.time);
        }

        /**
         * @description 设置ok按钮的状态：
         * 当用户选择的日期范围合法时，ok按钮处于正常状态；
         * 当用户选择的日期范围非法或者没有选择日期，ok按钮处于置灰状态
         * @param scope tiDatetimeRange指令的scope
         */
        function setOkBtnState(scope) {
            scope.$evalAsync(function () {
                if (isValidRange(scope)) {
                    scope.isOkDisabled = false;
                } else {
                    scope.isOkDisabled = true;
                }
            });

            // 判断下拉面板中时间方位是否合法
            function isValidRange() {
                var date = scope.beginDate.value;

                // 当起始日期、结束日期都是合法Date，并且起始日期时间小于结束日期时间时，返回true
                return $.isPlainObject(date) && utils.isDate(date.begin) &&
                    utils.isDate(date.end) && isBeginSmallerThanEnd(scope);
            }

            // 判断下拉面板中，起始日期时间是否小于结束日期时间
            function isBeginSmallerThanEnd() {
                // 组装起始日期时间
                var begin = new Date(getDateStr(scope.beginDate.value.begin) + ' ' + addColon(scope.beginTime.value));

                // 组装结束日期时间
                var end = new Date(getDateStr(scope.endDate.value.end) + ' ' + addColon(scope.endTime.value));

                return Date.parse(end) >= Date.parse(begin);
            }
        }

        /**
         * 将Date类型的日期转换成时分秒字符串
         * @param date 要进行转换的日期值
         */
        function getTimeStr(date) {
            return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        }

        /**
         * 将Date类型的日期转换成年月日字符串
         * @param date 要进行转换的日期值
         */
        function getDateStr(date) {
            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        }

        /**
         * @description 判断当两个日期类型值中的年月日是否相等：等于返回true，不等于返回false
         * @param date1 日期值
         * @param date2 日期值
         */
        function isEqual(date1, date2) {
            if (!utils.isDate(date1) || !utils.isDate(date2)) {
                return false;
            }

            var date1New = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());

            var date2New = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

            return Date.parse(date1New) === Date.parse(date2New);
        }

        function addColon(value) {
            // new Date()时，时间中没有一个冒号得到的是非法时间
            if (value.match(/:/)) {
                return value;
            }
            var ampm = value.match(/am|AM|pm|PM/) || '';
            return parseInt(value, 10) + ': ' + ampm;
        }
    }

    return module.name;
});

define('components/menu/menu',["components/module" , "components/tip/tip"], function(module){
    "use strict"

    module.provider("menuService", menuService);
    function menuService() {
        var defaults = this.defaultValue = {
            panelAlign : "right"
        }

        // 开发者在angular应用的config阶段可以调用setDefaults方法来配置默认值
        this.setDefaults = function(newDefaults) {
            angular.extend(defaults, newDefaults);
        }

        this.$get = function() {
            return {
                defaultValue : this.defaultValue
            }
        }
    }

    module.directive("tiMenu", tiMenu);
    tiMenu.$inject = ["menuService"];
    function tiMenu(menuService) {
        var directive = {
            restrict : "E",
            scope : {
                panelAlign : "=?",
                show : "=?",
                items : "=?",
                panelMaxWidth : "=?",
                beforeClick : "&"
            },
            templateUrl:"/tiny-components/src/components/menu/menu.html",
            replace : true,
            transclude : true,
            link : linkFn
        };
        return directive;

        function linkFn(scope, $element, attrs) {
            init(scope);

            addBehavior(scope);

            addWatcher(scope);

            function init() {
                // 对用户设置的panelAlign进行校验
                scope.panelAlign = restrictPanelAlign();

                // toggleElement用于下拉面板确定显示位置
                scope.toggleElement = $element;

                // 将items深拷贝一份，避免组件内部的处理导致修改用户数据
                scope.panelItems = angular.copy(scope.items);

                // 标记是否点击在按钮上的事件，用户判断是否自动收起下拉面板
                scope.isInnerClick = false;
            }

            function addBehavior() {
                scope.toggleClickFn = function() {
                    scope.isInnerClick = true;

                    // 用户定义了beforeClick事件并返回false时，不对下拉面板进行打开或关闭操作，留给用户控制
                    if (_.isFunction(scope.beforeClick()) && (scope.beforeClick()() === false)) {
                        return;
                    }

                    scope.show = !scope.show;
                };

                // 监听document上的click事件，主要作用是关闭menu的下拉面板
                scope.documentClickFn = function() {
                    // 如果是点击输入框事件，不做处理
                    if (scope.isInnerClick) {
                        scope.isInnerClick = false;
                        return;
                    }

                    // 加$evalAsync作用主要是保证angularJS能检测到show变化
                    scope.$evalAsync(function(){
                        scope.show = false;
                    });
                };
                $(document).on("click", scope.documentClickFn);

                $element.on("$destroy", function(){
                    $(document).off("click", scope.documentClickFn);
                });
            }

            function addWatcher() {
                scope.$watch("items", function(newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }

                    scope.panelItems = angular.copy(scope.items);
                }, true);
            }

            function restrictPanelAlign() {
                if (scope.panelAlign === "right" || scope.panelAlign === "left") {
                    return scope.panelAlign;
                } else {
                    return menuService.defaultValue.panelAlign;
                }
            }
        }
    }

    module.directive("tiMenuPanel", tiMenuPanel);
    tiMenuPanel.$inject = ["tiTipService"];
    function tiMenuPanel(tiTipService) {
        var directive = {
            restrict : "E",
            templateUrl : "/tiny-components/src/components/menu/menuPanel.html",
            replace : true,
            scope : {
                panelAlign : "=?",
                show : "=?",
                toggleElement : "=?",
                items : "=?",
                panelMaxWidth : "=?"
            },
            link : linkFn
        };

        function linkFn(scope, $element, attrs) {
            init();

            addBehavior(scope);

            addWatcher(scope, $element);

            function init() {
                // 将面板DOM移动到body中
                $("body").append($element);

                // 判断是否有子菜单的函数。DOM模板和js代码中都有用到，所以放在scope上
                scope.hasChildren = function(childrens) {
                    if (_.isArray(childrens) && childrens.length) {
                        return true;
                    } else {
                        return false;
                    }
                };

                scope.tooltipConfig = {
                    content: "",
                    triggerEvent : "trigger by menu", // tip的显示和隐藏由menu组件自己控制
                    position: "top-left"
                };
            }

            function addBehavior() {
                // 鼠标移动到一条菜单项及其子菜单项时触发的mouseenter事件
                scope.mouseenterFn = function(item, $event) {
                    if (!scope.hasChildren(item.childrens)  || item.disable) {
                        return;
                    }

                    item.showChildrens = true;

                    setPanelMaxWidth(scope, $($(".ti-menu-panel-container", $($event.currentTarget))[0]));

                    setChildrenPanelPosition(scope, $event);
                }

                // 鼠标从一条菜单项及其子菜单项移出时触发的mouseleave事件
                scope.mouseleaveFn = function(item, $event) {
                    if (!scope.hasChildren(item.childrens) || item.disable) {
                        return;
                    }

                    item.showChildrens = false;
                }

                // 鼠标移动到一条菜单项时触发的mouseenter事件
                scope.mouseenterFn1 = function(item, $event) {
                    if (_.isString(item.tip) && item.tip !== "") {
                        tiTipService.show($($("div[ti-tooltip]", $($event.currentTarget).closest(".ti-menu-panel-list"))[0]), {
                            content : item.tip
                        });
                    }
                };

                // 鼠标从一条菜单项移出时触发的mouseleave事件
                scope.mouseleaveFn1 = function(item, $event) {
                    tiTipService.hide($($("div[ti-tooltip]", $($event.currentTarget).closest(".ti-menu-panel-list"))[0]));
                }

                // 点击当前菜单项时触发的click事件
                scope.clickFn = function (item, $event) {
                    // 阻止事件的原因：防止click事件冒泡，触发上级菜单和document上的click事件
                    $event.stopPropagation();

                    // 当前项置灰、不是叶子节点时：不做处理
                    if (item.disable || scope.hasChildren(item.childrens)) {
                        return;
                    }

                    // 触发用户定义的click回调事件
                    if (_.isFunction(item.click)) {
                        item.click(item);
                    }

                    // 关闭整个下拉面板
                    scope.show = false;
                }
            }

            function addWatcher() {
                scope.$watch("show", function(newValue, oldValue) {
                    if (!scope.show) {
                        return;
                    }

                    setPanelMaxWidth(scope, $element);

                    setPanelPosition(scope, $element);
                });
            }
        }

        /**
         * 设置下拉面板的最大宽度。
         * 当有最大宽度时，文本超过该宽度时自动换行；
         * 当没有设置最大宽度时，文本自动撑开，不会换行
         * @param scope
         * @param $panelContainer 面板父容器
         */

        function setPanelMaxWidth(scope, $panelContainer) {
            var panelMaxWidth = parseInt(scope.panelMaxWidth, 10);
            if (_.isNaN(panelMaxWidth)) {
                return;
            }

            // setTimeout作用：保证下拉面板已经显示出来
            setTimeout(function(){
                $panelContainer.css({
                    "maxWidth" : panelMaxWidth + "px",
                    "wordWrap" : "break-word", // 覆盖浏览器默认值normal
                    "whiteSpace" : "normal", // 将默认值‘nowrap’覆盖
                    "width" : $panelContainer.outerWidth() + "px" // 设置width作用，保证各行能正常换行，避免出现没有超出最大宽度就换行现象
                });
            }, 0);
        }

        /**
         * 设置下拉面板位置：左右对齐方式的设置和上下位置的设置.
         * @param scope tiMenuPanel指令模板的scope
         * @param $element tiMenuPanel指令模板DOM
         */
        function setPanelPosition(scope, $element) {
            setTimeout(function() {
                setPanelHorizontal(scope, $element);
                setPanelVertical(scope, $element);
                $element.css("display", "block"); // 初始不显示下拉，当位置设置好后再显示，避免出现位置跳动
            }, 0);
        }

        /**
         * 根据左右对齐方式，设置下拉面板水平位置
         * @param scope tiMenuPanel指令模板的scope
         * @param $element tiMenuPanel指令模板DOM
         */
        function setPanelHorizontal(scope, $element) {
            var $toggle = $(".ti-menu-toggle", scope.toggleElement);
            var toggleOffset = $toggle.offset();
            var toggleWidth = $toggle.outerWidth();

            // 计算下拉面板宽度
            var panelWidth = $element.outerWidth();

            var left;
            if (scope.panelAlign === "left") {
                left = toggleOffset.left;
            } else {
                left = toggleOffset.left + toggleWidth - panelWidth;
            }

            $element.css({
                left : left + "px"
            });
        }

        /**
         * 设置下拉面板垂直位置：
         * 按钮下边能显示全面板时，显示在下边；
         * 按钮下边显示不下，上边能显示下时，显示在上边；
         * 按钮上下都显示不下时，显示在下边
         * @param scope tiMenuPanel指令模板的scope
         * @param $element tiMenuPanel指令模板DOM
         */
        function setPanelVertical(scope, $element) {
            // 计算按钮高度
            var $toggle = $(".ti-menu-toggle", scope.toggleElement);
            var toggleHeight = $toggle.outerHeight();

            // 计算下拉面板高度
            var panelHeight = $element.outerHeight();

            // 计算按钮上边和下边可视高度
            var toggleOffset = $toggle.offset();
            var overHeight = toggleOffset.top - $(document).scrollTop();
            var underHeight = window.innerHeight - overHeight - toggleHeight;

            var top;
            if (underHeight >= panelHeight || overHeight <= underHeight) {
                top = toggleHeight + toggleOffset.top;
            } else {
                top = toggleOffset.top - panelHeight;
            }
            $element.css("top", top + "px");
        }

        function setChildrenPanelPosition(scope, $event) {
            setTimeout(function() {
                var $item = $($event.currentTarget);
                var $childrenPanel = $($(".ti-menu-panel-container", $item)[0]);
                setChildrenPanelHorizontal(scope, $item, $childrenPanel);
                setChildrenPanelVertical($item, $childrenPanel);

                $childrenPanel.css("display", "block"); // 初始不显示下拉，当位置设置好后再显示，避免出现位置跳动
            }, 0);
        }

        /**
         * 按照用户设置的对齐方式，设置子下拉面板水平位置
         * @param scope tiMenuPanel指令模板的scope
         * @param $item 当前hover项DOM
         * @param $childrenPanel 下拉面板DOM
         */
        function setChildrenPanelHorizontal(scope, $item, $childrenPanel) {
            var itemWidth = $item.outerWidth() + "px";
            var left, right;
            if (scope.panelAlign === "left") {
                left = itemWidth;
                right = "auto";
            } else {
                left = "auto";
                right = itemWidth;
            }
            $childrenPanel.css({
                left : left,
                right : right
            });
        }

        /**
         * 设置子下拉面板垂直位置
         * 当hover项下边能显示全子下拉面板时，显示在下边；
         * 当hover项下边显示不全子下拉面板时，紧挨窗口最下边开始显示
         * @param $item 当前hover项DOM
         * @param $childrenPanel 下拉面板DOM
         */
        function setChildrenPanelVertical($item, $childrenPanel) {
            // 计算下拉面板高度
            var panelHeight = $childrenPanel.outerHeight();

            // 计算当前hover项上边和下边可视高度
            var itemOffset = $item.offset();
            var overHeight = itemOffset.top - $(document).scrollTop();
            var underHeight = window.innerHeight - overHeight;

            var top;
            if (underHeight >= panelHeight) {
                top = 0;
            } else {
                top = underHeight - panelHeight;
            }
            $childrenPanel.css("top", top + "px");
        }

        return directive;
    }
})
;
/**
 * @description
 * 在ti-checkbox基础上，实现checkboxGroup场景下，全选与去全选功能，并与被选中项列表(checkedId)实现双向绑定。
 * 去全选时，会立即更新checkedId为[],并更新视图；
 * 反之，立即更新checkedId（包含所有Item的id），并更新视图。
 * 【指令】tiCheckGroup
 * 【属性】checkedId [Array] 被选中项列表
 */

define('components/checkboxGroup/checkGroup',[
    'components/module'
], function (module) {
    'use strict';
    module.directive('tiCheckGroup', tiCheckGroupDirective);

    tiCheckGroupDirective.$inject = [
        '$parse',
        '$compile',
        'tiService'
    ];
    function tiCheckGroupDirective($parse, $compile, tiService) {
        var directive = {
            restrict: 'A',
            priority: 599, // 级别高于ti-checkbox(598)
            // 作用：angular启动时不解析在同一DOM上其它级别低的指令（如ti-checkbox），
            // 我们将在tiCheckGroup的link中手动解析这些低级别的指令
            terminal: true,
            scope: true, // 继承父scope
            compile: function (tElement, tAttrs) {
                // 设置ngModel指令,ngModel可以自动实现选中状态的双向绑定
                if (!tAttrs['ngModel']) {
                    tAttrs.$set('ngModel', 'tiAllChecked');
                }

                return linkFn;
            }
        };
        return directive;

        function linkFn(scope, $element, attrs) {
            // checkGroup的获取
            var checkGroupAttr = attrs['tiCheckGroup'];
            var checkGroupGetter = $parse(checkGroupAttr);

            // 先从$element去掉tiCheckGroup指令，是为了避免解析$element时出现无限循环解析而报错
            // 指令link内再次解析本指令会导致报错
            attrs.$set('tiCheckGroup', null);

            // 手动解析$element上的指令（tiCheckGroup除外）
            $compile($element)(scope);
            attrs.$set('tiCheckGroup', checkGroupAttr);

            // checkedId的设置和获取
            var checkedIdAttr = attrs['checkedId'];
            var checkedIdGetter = $parse(checkedIdAttr);
            var checkedIdSetter = checkedIdGetter.assign;

            // ngModel的设置和获取
            var ngModelGetter = $parse(attrs['ngModel']);
            var ngModelSetter = ngModelGetter.assign;

            // 父容器scope
            var parentScope = scope.$parent;

            // ngModel变化，根据变化实时更新checkedId
            scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 虽然allCheck置为false，但还存在部分选中条目，此时不应该执行全部去勾选操作
                // 场景：全选情况下，用户通过点击将某一checkbox item去勾选,
                // 会使得全选checkbox的ng-model置为false，但此时不应该将其它checkbox item去勾选
                if (newValue === false && isPartialChecked()) {
                    return;
                }

                setCheckedId(newValue); // 设置全选或全不选
            });

            // 全选的选中状态受item状态改变的影响
            scope.$watch(function () {
                return isAllChecked();
            }, function (newValue) {
                ngModelSetter(scope, newValue);
            });

            // 设置全选或全不选
            function setCheckedId(isAllChecked) {
                if (isAllChecked === true) {
                    checkAll();
                }
                else {
                    unCheckAll();
                }
            }

            // 全选
            function checkAll() {
                var checkedId = checkedIdGetter(parentScope);
                var checkGroup = checkGroupGetter(parentScope) ? checkGroupGetter(parentScope) : [];
                _.each(checkGroup, function (item) {
                    tiService.add(checkedId, item.id);
                });
                checkedIdSetter(parentScope, checkedId);
            }

            // 全不选
            function unCheckAll() {
                var checkedId = checkedIdGetter(parentScope);
                var checkGroup = checkGroupGetter(parentScope) ? checkGroupGetter(parentScope) : [];
                _.each(checkGroup, function (item) {
                    tiService.remove(checkedId, item.id);
                });
                checkedIdSetter(parentScope, checkedId);
            }

            // 判断当前是否为部分item选中状态
            function isPartialChecked() {
                var checkGroup = checkGroupGetter(parentScope) ? checkGroupGetter(parentScope) : [];
                var groupIdList = _.pluck(checkGroup, 'id');
                var checkedId = checkedIdGetter(parentScope);
                var checkedNum = 0;
                for (var i = 0; i < groupIdList.length; i++) {
                    if (tiService.contains(checkedId, groupIdList[i])) {
                        checkedNum++;
                    }

                }
                return checkedNum > 0 && checkedNum < groupIdList.length;
            }

            // 判断是否全选
            function isAllChecked() {
                var checkGroup = checkGroupGetter(parentScope) ? checkGroupGetter(parentScope) : [];
                var groupIdList = _.pluck(checkGroup, 'id');
                var checkedId = checkedIdGetter(parentScope);
                // 选中项个数或配置项个数为0情况下，不选中
                if((checkedId.length === 0) || groupIdList.length === 0){
                    return false;
                }
                // 有一项未选中情况下，不选中
                for (var i = 0; i < groupIdList.length; i++) {
                    if (!tiService.contains(checkedId, groupIdList[i])) {
                        return false;
                    }

                }
                return true;
            }
        }
    }

    return module.name;
});

/**
 * @description
 * 在ti-checkbox基础上，实现checkboxGroup场景，被选中项列表(checkedId)与视图中某一选项item的双向绑定机制。
 * 当某一选项item的选中状态改变时，将会动态更新checkedId；
 * 反之，checkedId改变时，也会同步更新某一选项item的选中状态及视图。
 * 【指令】tiCheckItem
 * 【属性】checkedId [Array] 被选中项列表
 */

define('components/checkboxGroup/checkItem',[
    'components/module'
], function (module) {
    'use strict';
    module.directive('tiCheckItem', tiCheckItemDirective);

    tiCheckItemDirective.$inject = [
        '$parse',
        '$compile',
        'tiService'
    ];
    function tiCheckItemDirective($parse, $compile, tiService) {
        var directive = {
            restrict: 'A',
            priority: 599, // 级别高于ti-checkbox(598)
            // 作用：angular启动时不解析在同一DOM上其它级别低的指令（如ti-checkbox），
            // 我们将在tiCheckItem的link中手动解析这些低级别的指令
            terminal: true,
            scope: true, // 继承父scope
            compile: function (tElement, tAttrs) {
                // 设置ngModel指令,ngModel可以自动实现选中状态的双向绑定
                if (!tAttrs['ngModel']) {
                    tAttrs.$set('ngModel', 'tiChecked');
                }

                return linkFn;
            }
        };
        return directive;

        function linkFn(scope, $element, attrs) {
            // checkItem的获取
            var checkItemAttr = attrs['tiCheckItem'];
            var checkItemGetter = $parse(checkItemAttr);

            // 先从$element去掉tiCheckItem指令，是为了避免解析$element时出现无限循环解析而报错
            // 指令link内再次解析本指令会导致报错
            attrs.$set('tiCheckItem', null);

            // 手动解析$element上的指令（tiCheckItem除外）
            $compile($element)(scope);
            attrs.$set('tiCheckItem', checkItemAttr);

            // checkedId的设置和获取
            var checkedIdAttr = attrs['checkedId'];
            var checkedIdGetter = $parse(checkedIdAttr);
            var checkedIdSetter = checkedIdGetter.assign;

            // ngModel的设置和获取
            var ngModelGetter = $parse(attrs['ngModel']);
            var ngModelSetter = ngModelGetter.assign;

            // 父容器scope
            var parentScope = scope.$parent;

            // 获取属性id对应的值（当某项被选中时，将其属性id值存放到checkedId数组中）
            var itemId = checkItemGetter(parentScope) ? checkItemGetter(parentScope)['id'] : undefined;

            // ngModel变化，根据变化实时更新checkedId
            scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                setCheckId(itemId, newValue);
            });

            function setCheckId(itemId, isChecked) {
                var checkedId = checkedIdGetter(parentScope);
                if (isChecked === true) {
                    checkedIdSetter(parentScope, tiService.add(checkedId, itemId));
                }
                else {
                    checkedIdSetter(parentScope, tiService.remove(checkedId, itemId));
                }
            }

            // checkedList变化，根据变化实时更新ngModel
            parentScope.$watchCollection(checkedIdAttr, function (newArr, oldArr) {
                ngModelSetter(scope, tiService.contains(newArr, itemId));
            });
        }
    }

    return module.name;
});

/**
 * @description
 * AngularJS version of the tiColspan directive.
 * 当某一tr下的td独占整个表格宽度时，可以给该td添加tiColspan指令，
 * 确保该td可以根据表格各列的动态隐藏/显示，及时调整colspan的值，使得td始终正确地横跨整个表格宽度
 */

define('components/table/colspan',[
    'components/module'
], function (module) {
    'use strict';
    module.directive('tiColspan', tiColspanDirective);
    function tiColspanDirective() {
        return {
            restrict: 'A',
            require: '^tiTable',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(function () {
                    return ctrl.getTableState();
                }, function (newVal, oldVal) {
                    var visibleColsNum = 0;
                    _.each(newVal.columns, function (column) {
                        if (column.show !== false) {
                            visibleColsNum++;
                        }

                    });
                    elem.attr('colspan', visibleColsNum);
                }, true);
            }
        };
    }
    return module.name;
});

/**
 * @description
 * AngularJS version of the checkbox directive.
 * 定义ty-checkbox指令,最终返回module名
 */

define('components/table/colsResizable',[
    'components/module'
], function (module) {
    'use strict';
    module.directive('colsResizable', tiColsResizableDirective);
    tiColsResizableDirective.$inject = ['tiTableConfig'];
    function tiColsResizableDirective(tiTableConfig) {
        return {
            restrict: 'AE',
            require: '^tiTable',
            link: function (scope, $elem, attr, ctrl) {
                var resizableOpts = initOptions($elem); // 初始化列拖动属性的配置项
                addBehavior(resizableOpts); // 添加事件绑定
                clearMemoryWhenDestroyed();

                scope.$watch(function () {
                    return ctrl.getTableState();
                }, function (newVal, oldVal) {
                    var oldShowCols = _.reduce(oldVal.columns, function (memo, item) {
                        return memo + item.show;
                    }, '');
                    var newShowCols = _.reduce(newVal.columns, function (memo, item) {
                        return memo + item.show;
                    }, '');
                    if (oldShowCols !== newShowCols) {
                        setDefaultWidth(newVal.width, newVal.columns);
                    }

                }, true);

                // 将表格宽度设置为默认宽度
                function setDefaultWidth(tableWidth, columns) {
                    var $table = $elem.children('table');
                    var $ths = getThs($table);
                    _.each($ths, function (th, index) {
                        var $th = $(th);
                        if (columns && columns[index] && columns[index]['width']) {
                            $th.css('width', columns[index]['width']);
                        } else {
                            $th.css('width', '');
                        }
                    });

                    if (tableWidth) {
                        $table.css('width', tableWidth);
                    }
                }

                // 初始化列拖动相关变量
                function initOptions($elem) {
                    var $table = getTable($elem);
                    // 内部变量
                    return {
                        $table: $table,
                        $ths: getThs($table, true),
                        $wrap: $elem, // 包裹表格的父容器，拖动表格超过父容器时出滚动条
                        mouseXPosition: 0, // 光标位置，列拖动时使用
                        $target: null, // 拖动的当前列
                        $next: null, // 拖动当前列的下一列
                        storedSizes: [] // 用来实时保存各列宽度
                    };
                }

                // 列拖动行为事件绑定
                function addBehavior(options) {
                    var $table = options.$table;
                    var namespace = 'tiTable';
                    var resizableConst = tiTableConfig.colsResizable;
                    // 采用这种on事件委托形式，既可以提高性能（相较于直接给每一个th绑定事件），
                    // 也可以实现对页面上尚未生成的th进行事件绑定
                    $table.on('mousemove', '>thead>tr>th:not(.' + resizableConst.notResizableClass + ')', function (evt) {
                        var $th = getCurrentTh(evt);
                        var offset = $th.offset();
                        var thWidth = $th.outerWidth();
                        // 判断光标是否落在th的右边缘
                        var isOnColBorder = Math.abs(evt.pageX - Math.round(offset.left + thWidth)) <= resizableConst.colBorderRange;
                        if (isOnColBorder) {
                            setDraggableState($th, $table);
                        } else {
                            setNotDraggableState($th, $table);
                        }
                    });

                    // 绑定表头上的mouseleave事件，是为了避免光标移开表头时，仍处于isOnColBorder状态，
                    // 导致的分割线不消失问题
                    $table.on('mouseleave', '>thead>tr>th:not(.' + resizableConst.notResizableClass + ')', function (evt) {
                        var $th = getCurrentTh(evt);
                        setNotDraggableState($th, $table);
                    });

                    $table.on('mousedown', '>thead>tr>th:not(.' + resizableConst.notResizableClass + ')', function (evt) {
                        var $th = getCurrentTh(evt);
                        if ($th.hasClass('col-resize-active')) {
                            // 鼠标点击的当前列
                            options.$target = $th;
                            // 鼠标点击的列的下一列
                            options.$next = $th.nextAll(':not(.' + resizableConst.notResizableClass + '):visible').eq(0);
                            // 更新光标位置
                            options.mouseXPosition = evt.pageX;
                            // 在拖动前获取当前表格最新的列信息、宽度，很关键，使得设置宽度与样式实际宽度一直
                            updateTableInfo(options);
                            // 给页面设置不可选样式，避免拖动时页面或表格内部出现被选中的蓝色区域
                            toggleTextSelection(options, true);
                        }

                    });

                    $(document)
                        .on('mousemove.' + tiTableConfig.nameSpace, mouseMoveHandler)
                        .on('mouseup.' + tiTableConfig.nameSpace, mouseUpHandler);
                }

                function clearMemoryWhenDestroyed() {
                    scope.$on('$destroy', function () { // scope被destroy时解绑事件，避免memory leak
                        $(document)
                            .off('mousemove.' + tiTableConfig.nameSpace, mouseMoveHandler)
                            .off('mouseup.' + tiTableConfig.nameSpace, mouseUpHandler);
                    });
                }

                // 获取正在操作的th
                function getCurrentTh(evt) {
                    return $(evt.target.nodeName === 'TH' ? evt.target : $(evt.target).parents('TH')[0]);
                }

                function setDraggableState($th, $table) {
                    createDividingLine($th, $table); // 出现拖动分割线
                }

                function setNotDraggableState($th, $table) {
                    removeDividingLine($th, $table); //  去掉拖动分割线
                }

                // 当光标移到感应区时，出现拖动分割线
                function createDividingLine($th, $table) {
                    var index = $th.index();
                    var $trs = $table.find('>tbody>tr:not(.ti-details-tr)');
                    $th.addClass('col-resize-active');
                    _.each($trs, function (tr) {
                        $(tr.children[index]).addClass('col-resize-active');
                    });
                }

                // 当光标离开感应区时，拖动分割线消失
                function removeDividingLine($th, $table) {
                    var $ths = $table.find('>thead>tr>th');
                    var $trs = $table.find('>tbody>tr:not(.ti-details-tr)');
                    $ths.removeClass('col-resize-active');
                    $trs.children('td').removeClass('col-resize-active');
                }

                function getThs($table, isFilterVisible) {
                    var $ths = $table.find('>thead>tr>th');

                    if (isFilterVisible) {
                        $ths = $ths.filter(':visible');
                    }

                    return $ths;
                }

                function setComputedWidth(options) {
                    var $table = options.$table;
                    if ($table.length && options.$ths && options.$ths.length) {
                        var $th;
                        var thWidth;
                        // set columns width
                        for (var index = 0; index < options.$ths.length; index++) {
                            $th = $(options.$ths[index]);
                            thWidth = $th.outerWidth();
                            setWidth($th, thWidth);
                        }

                        // set table width
                        var tableWidth = $table.outerWidth();
                        setWidth(options.$table, tableWidth);
                    }
                }

                function setWidth($el, width) {
                    $el.css('width', width);
                }

                function getTable($elem) {
                    var $table = $elem.children('table');
                    if ($table.length === 0) { // 用户给table元素加父容器，通过父容器设置overflow属性
                        $table = $elem.children('.ti-table-container').children('table');
                    }
                    return $table;
                }

                // 将当前表格各列的宽度更新到到options.storedSizes中
                function updateStoredSizes(options) {
                    var $th;
                    options.storedSizes = [];
                    _.each(options.$ths, function (th, index) {
                        $th = $(th);
                        $th.attr('ti-visible-index', index);
                        options.storedSizes[index] = $th.outerWidth();
                    });
                }

                function updateTableInfo(options) {
                    options.$ths = getThs(options.$table, true);
                    updateStoredSizes(options); // 保存最新宽度
                    setComputedWidth(options); // 设置最新宽度
                }

                // 当列拖动进行时去掉文字可选样式(user-select: none)
                function toggleTextSelection(options, toggle) {
                    var $body = $('body');
                    var resizableConst = tiTableConfig.colsResizable;
                    $body.toggleClass(resizableConst.unselectableClass, toggle);
                    if (toggle) {
                        $body.attr('unselectable', 'on');
                    } else {
                        $body.removeAttr('unselectable');
                    }
                }

                function mouseMoveHandler(evt) {
                    // 列拖动的动作应该是先mousedown，然后mousemove，因此先判断是否已经触发了mousedown
                    if (resizableOpts.mouseXPosition === 0 || !resizableOpts.$target) {
                        return;
                    }

                    mouseMove(evt, resizableOpts);
                }

                function mouseUpHandler() {
                    try {
                        toggleTextSelection(resizableOpts, false); // 恢复页面可选样式
                        stopResize(resizableOpts); // 保存最新宽度到浏览器中
                    } catch (e) {
                        
                    }
                }

                // 保存最新宽度到浏览器中
                function stopResize(options) {
                    var $table = options.$table;
                    updateStoredSizes(options);
                    options.mouseXPosition = 0;
                    setTimeout(function () {
                        ctrl.setDragState(false);
                    }, 0);
                    options.$target = options.$next = null;
                }

                // 鼠标拖动列移动时的事件处理
                function mouseMove(evt, options) {
                    ctrl.setDragState(true);
                    var $table = options.$table;
                    var total = 0;
                    var $next = options.$next;
                    var curColIndex = parseInt(options.$target.attr('ti-visible-index'), 10);
                    var colWidth = options.storedSizes[curColIndex];
                    var leftEdge = evt.pageX - options.mouseXPosition;

                    if (colWidth + leftEdge > 0) {
                        // 更新拖动列宽度
                        options.storedSizes[curColIndex] += leftEdge;
                        setWidth(options.$target, options.storedSizes[curColIndex]);

                        // 更新表格整体宽度
                        for (var colIndex = 0; colIndex < options.$ths.length; colIndex++) {
                            total += options.storedSizes[colIndex];
                        }
                        setWidth($table, total);
                    }

                    if (!$next.length) {
                        // 如果拖动的是表格最后一列，则scroll父容器
                        options.$wrap[0].scrollLeft = $table.outerWidth();
                    }

                    // 更新光标位置
                    options.mouseXPosition = evt.pageX;
                }
            }
        };
    }
    return module.name;
});

/**
 * @description
 * AngularJS version of the tiColsToggle directive.
 * 实现表格的列动态隐藏/显示功能
 */

define('components/table/colsToggle',[
    'components/module'
], function (module) {
    'use strict';

    module.directive('tiColsToggle', tiColsToggleDirective);
    tiColsToggleDirective.$inject = ['tiTableConfig'];
    function tiColsToggleDirective(tiTableConfig) {
        return {
            restrict: 'AE',
            replace: true,
            require: '^tiTable',
            link: function (scope, elem, attr, ctrl) {
                scope.hiddenColumns = [];
                scope.showPanel = false;
                var panelClass = scope.$eval(attr.panelClass);
                if (panelClass) {
                    elem.find('.ti-toggle-cols-dropdown').addClass(panelClass);
                }

                var background = createBackground();
                scope.togglePanel = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    scope.showPanel = !scope.showPanel;
                    if (scope.showPanel) {
                        showBackground();
                    } else {
                        hideBackground();
                    }
                };
                scope.toggleColumn = function (column) {
                    column.show = !column.show;
                    return ctrl.pipe();
                };

                scope.$on('$destroy', function () {
                    hideBackground();
                });
                scope.$watch((function () {
                    return ctrl.getTableState();
                }), function (newVal) {
                    var newColumns = newVal.columns;
                    if (scope.hiddenColumns !== newColumns) {
                        scope.hiddenColumns = newColumns;
                    }
                }, true);

                function createBackground() {
                    var bgDiv = document.createElement('div');
                    bgDiv.className = tiTableConfig.toggleCols.backgroundClass;
                    $(bgDiv).click(function () {
                        scope.showPanel = false;
                        hideBackground();
                        scope.$digest();
                    });
                    return bgDiv;
                }

                function hideBackground() {
                    if (scope.showPanel) {
                        return;
                    }

                    try {
                        document.body.removeChild(background);
                    } catch (e) {

                    }
                }

                function showBackground() {
                    document.body.appendChild(background);
                }
            },
            templateUrl: tiTableConfig.toggleCols.template
        };
    }
    return module.name;
});

/**
 * @description
 * AngularJS version of the tiFilter directive.
 * 实现表格过滤功能
 */

define('components/table/filter',[
    'components/module'
], function (module) {
    'use strict';
    module.directive('filterKeywords', tiFilterDirective);
    tiFilterDirective.$inject = ['tiTableConfig', '$timeout'];
    function tiFilterDirective(tiTableConfig, $timeout) {
        return {
            require: '^tiTable',
            link: function (scope, element, attr, ctrl) {
                var tableCtrl = ctrl;
                var promise = null;
                var delay = tiTableConfig.search.delay;

                scope.$watch(function () {
                    // filterKeywords：过滤条件表达式
                    // 支持angularJS》$filter('filter')》expression参数类型中Object和String两种类型
                    return scope.$eval(attr.filterKeywords);
                }, function (newValue, oldValue) {
                    ctrl.getTableState().filter = {};
                    if (promise !== null) {
                        $timeout.cancel(promise);
                    }

                    promise = $timeout(function () {
                        tableCtrl.search(newValue);
                        promise = null;
                    }, delay);
                }, true);
            }
        };
    }
    return module.name;
});

/**
 * @description
 * AngularJS version of tiSort directive.
 * 实现表格排序功能
 */

define('components/table/sort',[
    'components/module'
], function (module) {
    'use strict';
    module.directive('tiSort', tiSortDirective);
    tiSortDirective.$inject = ['tiTableConfig', '$parse', '$timeout'];
    function tiSortDirective(tiTableConfig, $parse, $timeout) {
        return {
            restrict: 'A',
            require: '^tiTable',
            link: function (scope, element, attr, ctrl) {
                var predicateGetter = $parse(attr.tiSort);
                var predicate = predicateGetter(scope) !== undefined ? predicateGetter(scope) : attr.tiSort;
                var index = 0;
                var colIndex;
                var classAscent = tiTableConfig.sort.ascentClass;
                var classDescent = tiTableConfig.sort.descentClass;
                var sortClasses = [classAscent, classDescent];
                var defaultSort;
                var promise = null;
                var delay = tiTableConfig.sort.delay;

                // 是否设置默认排序
                if (attr.defaultSort) {
                    defaultSort = scope.$eval(attr.defaultSort) !== undefined ? scope.$eval(attr.defaultSort) : attr.defaultSort;
                }

                // view --> table state
                function sort() {
                    index++;
                    colIndex = element.index();
                    var func = ctrl.sortBy.bind(ctrl, predicate, index % 2 === 0, colIndex);
                    if (promise !== null) {
                        $timeout.cancel(promise);
                    }

                    promise = $timeout(func, delay);
                }

                // 触发排序的点击事件
                element.bind('click', function sortClick(event) {
                    // 1.拖拽某一列也会触发click，此时应避免排序发生
                    // 2.排序条件（规则）不存在，不进行排序
                    if (isDraggingEvt() || !predicate) {
                        return false;
                    }

                    scope.$apply(sort);
                });

                function isDraggingEvt() {
                    return ctrl.getDragState();
                }

                // 默认排序
                if (defaultSort) {
                    index = defaultSort === 'desc' ? 1 : 0;
                    sort();
                }

                // table state --> view
                scope.$watch(function () {
                    return ctrl.getTableState().sort;
                }, function (newValue, oldValue) {
                    // 1.根据predicate不同，可以判断当前列不处于排序状态
                    // 2.如果两列的predicate相同，则可以通过colIndex判断当前列是否处于排序状态
                    if (newValue.predicate !== predicate || newValue.colIndex !== colIndex) {
                        index = 0;
                        element
                            .removeClass(classAscent)
                            .removeClass(classDescent)
                            .removeAttr('unselectable'); // 恢复文字可选中状态
                    } else {
                        index = newValue.reverse === true ? 2 : 1;
                        element
                            .removeClass(sortClasses[index % 2])
                            .addClass(sortClasses[index - 1])
                            .attr('unselectable', 'on'); // 设置文字不可选中，避免操作时出现蓝色区域
                    }
                }, true);
            }
        };
    }
    return module.name;
});

/**
 * @description
 * 表格详情功能
 */

define('components/table/details',[
    'components/module'
], function (module) {
    'use strict';
    // 详情图标指令的定义
    module.directive('tiDetailsIcon', detailsIcon);
    function detailsIcon() {
        return {
            restrict: 'E',
            require: '^tiTable',
            templateUrl: '/tiny-components/src/components/table/details-icon.html',
            scope: {
                row: "=?",
                beforeToggle: "&"
            },
            replace: true,
            link: function (scope, element, attr, ctrl) {
                // 初始化row数据及是否打开详情的设置
                scope.row = _.isObject(scope.row) ? scope.row : {};
                scope.row.showDetails = _.isUndefined(scope.row.showDetails) ? false : scope.row.showDetails;

                // 绑定click事件
                element.on("click", function(){
                    var beforeToggle = scope.beforeToggle();
                    var autoToggle = true;

                    // 触发beforeToggle回调
                    if (_.isFunction(beforeToggle)) {
                        autoToggle = beforeToggle(scope.row);
                    }

                    // beforeToggle回调中返回false, 控件不自动触发详情状态切换，完全由开发者控制
                    if (autoToggle !== false) {
                        scope.row.showDetails = !scope.row.showDetails;
                    }
                    scope.$evalAsync();
                });


                // 向所在行添加斑马样式
                var $tr = element.closest('tr');
                var trIndex = $tr.scope().$index;
                var trClass = trIndex % 2 === 0 ? 'ti-odd-tr' : 'ti-even-tr';
                $tr.addClass(trClass);
            }
        };
    }

    // 详情内容指令的定义, 主要借鉴ngIf的代码
    module.directive('tiDetailsTr', tiDetailsTr);
    tiDetailsTr.$inject = ['$animate'];
    function tiDetailsTr($animate) {
        return {
            multiElement: true,
            transclude: 'element',
            priority: 599,
            terminal: true,
            restrict: 'A',
            $$tlb: true,
            link: function($scope, $element, $attr, ctrl, $transclude) {
                var block, childScope, previousElements;
                $scope.$watch(function () {
                    var rowData = $scope.$eval($attr.tiDetailsTr);
                    return rowData ? rowData.showDetails : false;
                }, function (value){
                    if (value) {
                        if (!childScope) {
                            $transclude(function(clone, newScope) {
                                childScope = newScope;
                                clone[clone.length++] = document.createComment(' end tiDetailsTr: ' + $attr.tiDetailsTr + ' ');
                                block = {
                                    clone: clone
                                };
                                clone.addClass("ti-details-tr");
                                $animate.enter(clone, $element.parent(), $element);
                            });
                        }
                    } else {
                        if (previousElements) {
                            previousElements.remove();
                            previousElements = null;
                        }
                        if (childScope) {
                            childScope.$destroy();
                            childScope = null;
                        }
                        if (block) {
                            previousElements = getBlockNodes(block.clone);
                            $animate.leave(previousElements).then(function() {
                                previousElements = null;
                            });
                            block = null;
                        }
                    }
                });
            }
        };
        /**
         * Return the DOM siblings between the first and last node in the given array.
         * @param {Array} array like object
         * @returns {Array} the inputted object or a jqLite collection containing the nodes
         */
        function getBlockNodes(nodes) {
            var node = nodes[0];
            var endNode = nodes[nodes.length - 1];
            var blockNodes;

            for (var i = 1; node !== endNode && (node = node.nextSibling); i++) {
                if (blockNodes || nodes[i] !== node) {
                    if (!blockNodes) {
                        blockNodes = jqLite(slice.call(nodes, 0, i));
                    }
                    blockNodes.push(node);
                }
            }

            return blockNodes || nodes;
        }
    }

    return module.name;
});


define('components/table/table',[
    'components/module'
], function (module) {
    'use strict';

    module.directive('tiTable', tiTableDirective);
    tiTableDirective.$inject = ['tiTipService'];
    function tiTableDirective(tiTipService) {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<div class="ti-table"></div>',
            controller: tiTableController,
            link: function (scope, $element, attr, ctrl, transclude) {
                if (attr.filterFn) {
                    ctrl.setFilterFunction(scope.$eval(attr.filterFn)); // 设置自定义过滤规则
                }

                if (attr.sortFn) {
                    ctrl.setSortFunction(scope.$eval(attr.sortFn)); // 设置自定义排序规则
                }

                transclude(scope, function (clone) {
                    $element.append(clone);
                });

                // 只有开发者显式设置autoTip为false，才会关闭自动出tip功能
                if (!_.has(attr, 'autoTip') || scope[attr.autoTip] !== false) {
                    setTips($element, tiTipService);
                }
            }
        };
    }

    tiTableController.$inject = [
        '$scope',
        '$parse',
        '$filter',
        '$attrs',
        '$rootScope'
    ];
    function tiTableController($scope, $parse, $filter, $attrs, $rootScope) {
        /**
         * 表格呈现数据(displayData)的设置（displaySetter）和获取（displayGetter）方法；
         * 表格呈现数据与表格实时显示绑定，例如：在分页情况下，表格呈现数据是当前页数据；
         */
        var displayGetter = $parse($attrs.displayedData);
        var displaySetter = displayGetter.assign;

        /**
         * 源数据(source)是开发者对表格设置的原始数据,形式如下：
         * {data: [...], state: {filter: true/false; sort: true/false; pagination: true/false}}；
         * 其中data是表格源数据(srcData)，该数据在经过排序、过滤、分页等处理后赋给表格呈现数据(displayData)并在表格中显示，
         * state标识表格源数据是否已经经过排序、过滤、分页等处理，如果开发者对某特性已经处理过，控件内部就不再重复处理了
         */
        var sourceGetter = $parse($attrs.srcData); // 源数据的获取方法
        var srcData = []; // 源数据.data的安全复制版本
        watchSrcData(); // 源数据.data更新检查及处理

        // 默认排序规则
        var orderBy = $filter('orderBy');

        // 默认过滤规则
        var filter = $filter('filter');

        // 表格状态
        var tableState = initTableState();

        /**
         * 排序状态更新及处理
         * @param {String} predicate - 进行排序的数据属性（如对数据的name属性值进行排序，则传入"name"）
         * @param {Boolean} reverse - 是否为升序
         * @param {Number} colIndex - 排序列的索引
         */
        this.sortBy = function sortBy(predicate, reverse, colIndex) {
            tableState.sort.predicate = predicate;
            tableState.sort.reverse = reverse === true;
            tableState.sort.colIndex = colIndex;
            updateTable(tableState);
        };

        /**
         * 过滤状态更新及处理
         * @param {String | Object} predicate - 过滤关键字，
         * 支持全局排序(如参入:"ipv4"),也支持针对数据某一属性排序(如传入:{name: "ab"})
         */
        this.search = function search(predicate) {
            tableState.filter.predicate = predicate || '';
            tableState.pagination.start = 0;
            updateTable(tableState);
        };

        /**
         * 分页状态更新及处理
         * @param {Number} currentPage - 当前页
         * @param {Number} pageSize - 每页显示条数
         */
        this.updatePagination = function updatePagination(currentPage, pageSize) {
            if (currentPage === tableState.pagination.currentPage &&
                pageSize === tableState.pagination.itemsPerPage) {
                return;
            }
            tableState.pagination.currentPage = currentPage;
            tableState.pagination.itemsPerPage = pageSize;
            updateTable(tableState);
        };

        /**
         * 设置表格是否处于列拖动状态
         * @returns Boolean
         */
        this.setDragState = function (isDragging) {
            tableState.resizable.isDragging = isDragging;
        };

        /**
         * 获取表格是否处于列拖动状态
         * @returns Boolean
         */
        this.getDragState = function () {
            return tableState.resizable.isDragging;
        };

        /**
         * 返回表格的当前状态（包含分页、排序、过滤、列等信息）
         * @returns {sort: {}, filter: {}, pagination: {}，columns: {}, ...}
         */
        this.getTableState = function getTableState() {
            return tableState;
        };

        /**
         * 使用新的自定义过滤规则来取代默认的angular过滤$filter('filter')
         * @param filterFn 自定义过滤规则函数
         */
        this.setFilterFunction = function setFilterFunction(filterFn) {
            if (typeof filterFn === 'function') {
                filter = filterFn;
            }
        };

        /**
         * 使用新的自定义排序规则来取代默认的angular排序$filter('orderBy')
         * @param sortFn 自定义排序函数
         */
        this.setSortFunction = function setSortFunction(sortFn) {
            if (typeof sortFn === 'function') {
                orderBy = sortFn;
            }
        };

        function safeCopy(src) {
            return src ? [].concat(src) : [];
        }

        function initTableState() {
            // 获取各列的设置
            var cols = $scope.$eval($attrs.columns);
            // 表格整体宽度
            var tableWidth = $scope.$eval($attrs.tableWidth) || '100%';
            // 表格状态
            var _tableState = {
                width: tableWidth,
                columns: cols,
                sort: {},
                filter: {},
                pagination: {
                    currentPage: 0,
                    itemsPerPage: 0
                },
                toggleCols: {
                    background: null
                },
                resizable: {
                    isDragging: false // 标识是否处于拖动状态
                }
            };

            // 将表格状态放到$rootScope中，开发者可以在业务scope中使用
            var tableId = $scope.$eval($attrs.id);
            if (tableId) {
                if (!$rootScope.tiTableState) {
                    $rootScope.tiTableState = {};
                }

                $rootScope.tiTableState[tableId] = _tableState;
            }

            return _tableState;
        }

        function updateSafeCopy() {
            var src = sourceGetter($scope);
            srcData = safeCopy(src && src.data ? src.data : []);
        }

        function getSrcState() {
            var src = sourceGetter($scope);
            return src && src.state ? src.state : undefined;
        }

        function dataProcessor() {
            var pagination = tableState.pagination;
            var output = safeCopy(srcData);
            var srcState = getSrcState();

            // 如果存在过滤条件且用户传递的源数据尚未进行过滤处理，则进行前台过滤处理
            if (tableState.filter.predicate && (!srcState || !srcState.filter)) {
                output = filter(output, tableState.filter.predicate);
            }

            // 如果存在排序且用户传递的源数据尚未进行排序处理，则进行前台排序处理（字典排序）
            if (tableState.sort.predicate && (!srcState || !srcState.sort)) {
                output = orderBy(output, tableState.sort.predicate, tableState.sort.reverse);
            }

            // 存在分页且用户传递的源数据尚未进行分页处理，则进行前台分页
            if (pagination.currentPage > 0 && (!srcState || !srcState.pagination)) {
                var start = (pagination.currentPage - 1) * pagination.itemsPerPage;
                output = output.slice(start, start + parseInt(pagination.itemsPerPage, 10));
            }

            displaySetter($scope, output || srcData);
        }

        function updateTable(_tableState) {
            var isSrcDataUpdated = false; // 标识开发者是否在tableStateUpdate回调中更新了表格数据
            var tableStateUpdate = $scope.$eval($attrs.tableStateUpdate); // 表格状态改变的回调
            if (typeof tableStateUpdate === 'function') {
                isSrcDataUpdated = tableStateUpdate(_tableState);
            }
            // 如果用户未在tableStateUpdate中更新数据，则需要采用默认处理来更新表格的显示数据
            if (!isSrcDataUpdated) {
                dataProcessor();
            }
        }

        function watchSrcData() {
            if ($attrs.srcData) {
                // 默认将表格数据置为[]
                var defaultData = [];
                // 源数据动态更新，则更新表格
                $scope.$watch(function () {
                    var src = sourceGetter($scope);
                    return src && src.data ? src.data : defaultData;
                }, function () {
                    updateSafeCopy();
                    dataProcessor();
                }, true);
            }
        }
    }

    function setTips($element) {
        var $table = $($('table', $element)[0]);
        // 1.详情行不出tip
        // 2.设置.no-auto-tip样式类的单元格不出tip
        var thAndTdSelector = '>thead>tr>th:not(.no-auto-tip),>tbody>tr:not(.ti-details-tr)>td:not(.no-auto-tip)';
        $table.on('mouseenter', thAndTdSelector, function (evt) {
            var $target = $(evt.currentTarget);

            // 内容显示不全自动出tip只针对纯文本显示场景，若td/th中包含如下可获取焦点元素，则不作处理
            var tababbleSelector = 'input,button,select,textarea, ' +
                'iframe, object, embed, *[tabindex], *[contenteditable=true]';
            var $tabbableElt = $target.find(tababbleSelector);
            if ($tabbableElt.length > 0) {
                return;
            }

            // 删除原有tip
            $target.removeAttr('title');

            // 复制DOM，并使文本完全显示
            var $clone = $($target[0].cloneNode(true)).css({
                'font-size': $target.css('font-size'),
                'font-weight': $target.css('font-weight'),
                'font-family': $target.css('font-family'),
                'padding-right': $target.css('paddingRight'),
                'padding-left': $target.css('paddingLeft'),
                'border-right': $target.css('borderRightWidth') + ' dotted transparent',
                'border-left': $target.css('borderLeftWidth') + ' dotted transparent',
                height: $target.height()
            });
            $clone.addClass('ti-table-cell-clone');
            $('body').append($clone);

            // $target是表头，并且有排序图标情况，有两种样式需要同步设置到克隆文本中：
            // 1.排序被点击后，font-weight变成bold
            // 2.有排序时，文本的padding-right就是排序按钮的宽度
            var $sortLabel = $('.ti-sort', $target);
            if ($sortLabel.length) {
                $('.ti-sort', $clone).css({
                    'font-weight': $sortLabel.css('font-weight'),
                    'padding-right': $sortLabel.css('paddingRight'),
                    'padding-left': $sortLabel.css('paddingLeft')
                });
            }

            var maxWidth = parseFloat(getComputedStyle($target[0], null).width, 10);
            var textWidth = parseFloat(getComputedStyle($clone[0], null).width, 10);

            // 若文本过长，则出tip
            if (textWidth > maxWidth) {
                $target.attr('title', $target.text());
            }

            // 删除复制的DOM
            $clone.remove();
        });
    }

    return module.name;
});

/**
 * @description
 * AngularJS version of stConfig service.
 * 提供表格默认配置数据的服务
 */

define('components/table/tableConfig',[
    'components/module'
], function (module) {
    'use strict';
    module.constant('tiTableConfig', {
        nameSpace: 'tiTable',
        pagination: {
            template: '/tiny-components/src/components/table/pagination.html',
            itemsByPage: 10,
            displayedPages: 5
        },
        search: {
            delay: 0, // ms
            inputEvent: 'input'
        },
        select: {
            mode: 'single',
            selectedClass: 'st-selected'
        },
        sort: {
            ascentClass: 'ti-sort-ascent',
            descentClass: 'ti-sort-descent',
            delay: 50
        },
        toggleCols: {
            template: '/tiny-components/src/components/table/cols-toggle.html',
            backgroundClass: 'ti-toggle-cols-background'
        },
        colsResizable: {
            notResizableClass: 'ti-resizable-false',
            unselectableClass: 'ti-unselectable',
            colBorderRange: 8 // 移到表头能够显示拖动线的感应范围
        },
        pipe: {
            delay: 100 // ms
        }
    });
});

define('components/unifyValid/unifyValid',['components/module', 'components/tip/tip'], function (module) {
    // 校验规则定义
    var validRules = {
        rulesFn: {
            required: function (value) {
                return value !== '';
            },
            maxSize: function (value, paras) {
                var length = value.length;
                return (value === '') || (length <= parseInt(paras[0], 10));
            },
            minSize: function (value, paras) {
                var length = value.length;
                return (value === '') || (length >= parseInt(paras[0], 10));
            },
            rangeSize: function (value, paras) {
                var length = value.length;
                return (value === '') || (length >= parseInt(paras[0], 10) && length <= parseInt(paras[1], 10));
            },
            maxValue: function (value, paras) {
                return (value === '') || (parseFloat(value) <= parseFloat(paras[0]));
            },
            minValue: function (value, paras) {
                return (value === '') || (parseFloat(value) >= parseFloat(paras[0]));
            },
            rangeValue: function (value, paras) {
                return (value === '') || (parseFloat(value) >= parseFloat(paras[0]) && parseFloat(value) <= parseFloat(paras[1]));
            },
            regularCheck: function (value, paras) {
                if (value === '') {
                    return true;
                }
                var param = paras[0];
                if (typeof param === 'string') {
                    param = new RegExp('^(?:' + param + ')$');
                }
                return param.test(value);
            },
            contains: function (value, paras) {
                return (value === '') || (value.indexOf(paras[0]) !== -1);
            },
            notContains: function (value, paras) {
                return (value === '') || (value.indexOf(paras[0]) === -1);
            },
            equal: function (value, paras) {
                return (value === '') || (value === paras[0]);
            },
            notEqual: function (value, paras) {
                return (value === '') || (value !== paras[0]);
            },
            checkScriptInfo: function (value) {
                var regExp = new RegExp('<+/?[Ss][Cc][Rr][Ii][Pp][Tt] *\.*>*');
                return (value === '') || (!regExp.test(value));
            },
            port: function (value) {
                return (value === '') || (/^\d+$/.test(value)) && (value >= 0) && (value <= 65535);
            },
            email: function (value) {
                return (value === '') || /^((([A-Za-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([A-Za-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([A-Za-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([A-Za-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([A-Za-z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([A-Za-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([A-Za-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([A-Za-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([A-Za-z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([A-Za-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/.test(value);
            },
            date: function (value) {
                return (value === '') || !/Invalid|NaN/.test(new Date(value).toString());
            },
            url: function (value) {
                return (value === '') || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
            },
            integer: function (value) {
                return (value === '') || /^-?\d+$/.test(value);
            },
            number: function (value) {
                return (value === '') || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },
            digits: function (value) {
                return (value === '') || /^\d+$/.test(value);
            },
            ipv4: function (value) {
                return (value === '') || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value);
            },
            ipv6: function (value) {
                return (value === '') || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(value);
            }
        },

        errorMsg: {
        }
    };

    /**
     * 对用户传入的校验提示信息进行格式化处理
     * @param source {String} 外部传入的 校验错误提示信息 字符串（包括特殊）
     * @param params {String} 外部传入的 校验错误提示信息 字符串
     * @return {String} 返回格式化后的信息
     */
    function format(source, params) {
        if (arguments.length === 1) {
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return format.apply(this, args);
            };
        }

        var formatSource = source;
        $.each(params, function (i, n) {
            formatSource = formatSource.replace(new RegExp('\\{' + i + '\\}', 'g'), function () {
                return n;
            });
        });
        return formatSource;
    }

    // 校验默认值配置
    var defaults = {
        position: 'right', // 校验位置
        ignore: ':hidden', // 整体校验时校验忽略选择器,可在整体校验函数中配置
        focusFirstInvalid: true, // 整体校验时是否默认聚焦于第一个校验失败元素，可在整体校验函数中配置
        focusCleanup: true// focus状态时是否显示错误边框
    };

    // 服务和指令中使用的通用校验函数封装
    module.factory('$tinyValidCommon', ['tiTipService', tinyValidCommon]);
    function tinyValidCommon(tiTipService) {
        function setErrMsg() {
            var errorMsg = {
                required: tiny.language.valid_required_info,
                maxSize: format(tiny.language.valid_maxSize_info),
                minSize: format(tiny.language.valid_minSize_info),
                rangeSize: format(tiny.language.valid_rangeSize_info),
                maxValue: format(tiny.language.valid_maxValue_info),
                minValue: format(tiny.language.valid_minValue_info),
                rangeValue: format(tiny.language.valid_rangeValue_info),
                regularCheck: tiny.language.valid_regularCheck_info,
                contains: format(tiny.language.valid_contains_info),
                notContains: format(tiny.language.valid_notContains_info),
                checkScriptInfo: tiny.language.valid_checkScriptInfo_info,
                equal: format(tiny.language.valid_equal_info),
                notEqual: format(tiny.language.valid_notEqual_info),
                port: tiny.language.valid_port_info,
                email: tiny.language.valid_email_info,
                date: tiny.language.valid_date_info,
                url: tiny.language.valid_url_info,
                integer: tiny.language.valid_integer_info,
                number: tiny.language.valid_number_info,
                digits: tiny.language.valid_digits_info,
                ipv4: tiny.language.valid_ipv4_info,
                ipv6: tiny.language.valid_ipv6_info
            };
            angular.extend(validRules.errorMsg, errorMsg);
        }

        /**
         * 单个表单元素校验：该方法封装了表单元素校验方法及校验成功/失败处理的全过程
         * @param {Object} validation 校验配置信息
         * @param {Object} $element 校验元素
         * @param {Boolean} isShowTip 校验后是否显示tip提示
         * @returns {Boolean} 是否校验成功
         */
        function checkValidation(validation, $element, isShowTip) {
            // 无效属性配置时校验不生效，返回true
            var validatorArray = validation.validator;
            if (!_.isArray(validatorArray) || validatorArray.length === 0) {
                // 清除先前校验信息(考虑到校验validator属性由有效变为无效的情况，此处做清除处理)
                clearSingleInvalid($element);
                // 根据回调返回结果显示tip提示
                if (isShowTip) {
                    addTip($element, validation.tip, validation.position);
                }
                return true;
            }

            // 根据校验规则和表单值校验表单元素
            var isValid = true;// 校验返回结果值
            var itemRet;// 单个校验规则返回结果对象
            var isItemValid;// 单个校验规则是否成功结果
            var itemMsg;// 单个校验规则信息结果，正确情况下为""
            var errMsg = '';// 表单元素第一个校验失败规则对应的错误提示信息
            var validResult = [];// 表单校验返回结果，结果数组中为各校验规则对应的返回结果(true/false和信息)

            for (var i = 0, len = validatorArray.length; i < len; i++) {
                itemRet = checkValidator($element, validatorArray[i]);

                isItemValid = itemRet.isValid;
                itemMsg = itemRet.msg;
                validResult.push({ isvalid: isItemValid, msg: itemMsg });
                if (!isItemValid && isValid === true) { // 只获取第一个校验失败规则信息
                    isValid = false;
                    errMsg = itemMsg;
                }
            }

            // 根据校验结果，进行正确/错误处理
            if (isValid) {
                validFunc($element, validation, isShowTip);
            } else {
                var invalidInfo = {
                    validInfo: validResult,
                    errMsg: errMsg
                };

                invalidFunc($element, validation, invalidInfo, isShowTip);
            }
            return isValid;
        }

        /**
         * 单个校验规则的校验
         * @param {Object} $element 校验元素
         * @param {Object} validator 单条校验规则对象
         * @returns {Object} 校验结果对象
         */
        function checkValidator($element, validator) {
            var rule = validator.rule;
            var paramArr = validator.param || [];// 校验规则参数
            var validFn = _.isString(rule) ? getRuleFn(rule) : rule;// 获取校验器对应的规则函数
            if (!_.isFunction(validFn)) {
                return {
                    isValid: true
                };
            }

            // textbox的值可通过value属性直接获取
            var tiValue = _.isUndefined($element[0].tiValue) ? $element.val() : $element[0].tiValue;
            var validRet = validFn.call($element, tiValue, paramArr);// 调用校验规则进行校验
            var isValid = false;
            var errorMsg = '';// 错误提示信息

            // 根据校验返回值设置单个校验规则结果值和错误信息
            if (validRet === true || validRet === '') { // 返回true/""的情况下，校验成功
                isValid = true;
            } else if (validRet === false) { // 返回非空字符串情况下，校验失败，返回为错误提示信息
                errorMsg = validator.errorMsg ? validator.errorMsg : getErrorMsg(rule, paramArr);
            } else {
                errorMsg = validRet;
            }

            return {
                isValid: isValid,
                msg: errorMsg
            };
        }

        /**
         * 获取校验规则对应的错误提示信息
         * @param {String|Function} rule 校验规则
         * @param {Array} paramsArr 校验规则参数
         * @returns {String} 错误提示信息
         */
        function getErrorMsg(rule, paramsArr) {
            setErrMsg();
            var errMsg = validRules.errorMsg[rule];
            if (_.isFunction(errMsg)) {
                errMsg = errMsg.call(null, paramsArr);
            }
            return errMsg;
        }

        /**
         * 校验成功处理
         * @param {Object} $element 校验元素
         * @param {Object} validation 校验配置信息
         * @param {Boolean} isShowTip 校验后是否显示tip提示
         * @returns 无
         */
        function validFunc($element, validation, isShowTip) {
            // 清除先前校验信息
            clearSingleInvalid($element);

            // 调用校验回调
            var callback = validation.validCallback;
            var callbackResult;
            if (_.isFunction(callback)) {
                callbackResult = callback();
            }

            // 根据回调返回结果显示tip提示
            if (isShowTip) {
                var tipContent = callbackResult || validation.tip;
                addTip($element, tipContent, validation.position);
            }
        }

        /**
         * 校验失败处理函数
         * @param {Object} $element 校验元素
         * @param {Object} validation 校验配置信息
         * @param {Object} invalidInfo 校验错误信息，包括以下三部分：
         *  {isValidArr // 各条校验规则对应的校验结果数组,数组中值均为Boolean型
         *   validMsgArr // 各条校验规则对应的错误提示信息,为空代表校验正确
         *   errMsg: errMsg // 校验提示信息，该提示信息为第一条校验失败规则对应的错误提示
         *  }
         * @param {Boolean} isShowTip 校验后是否显示tip提示
         * @returns 无
         */
        function invalidFunc($element, validation, invalidInfo, isShowTip) {
            // 清除先前校验信息
            clearSingleInvalid($element);

            // 调用校验回调
            var callback = validation.invalidCallback;
            var callbackRet;
            if (_.isFunction(callback)) {
                callbackRet = callback(invalidInfo);
            }

            if (isShowTip) { // 根据回调返回结果显示tip提示
                var tipContent = callbackRet || invalidInfo.errMsg;
                if (tipContent) {
                    if (_.isString(tipContent)) { // 当tip值为字符串类型时，添加错误提示图标
                        tipContent = '<span class="ti-validate-icon ti-icon ti-icon-exclamation-circle"></span><span>' + tipContent + '</span>';
                    }
                    addTip($element, tipContent, validation.position);
                }

                if (!defaults.focusCleanup) { // 有tip提示状态代表是focus状态
                    $element.addClass('ti-validate-error');
                }
            } else { // 不显示tip情况下，变红边框
                $element.addClass('ti-validate-error');
            }
        }

        /**
         * 添加tip提示信息
         * @param {Object} $element 校验元素
         * @param {Object|String} tipContent tip提示信息
         * @param {String} position tip提示位置
         * @returns 无
         */
        function addTip($element, tipContent, position) {
            if (!tipContent) { // tip提示内容未定义或为空的情况下，不加tip提示
                return;
            }

            if (!$element[0].tiTooltip) {
                $element[0].tiTooltip = tiTipService.createTip($element, {
                    position: position || defaults.position,
                    triggerEvent: 'none',
                    content: tipContent
                });
            }
            $element[0].tiTooltip.show({ content: tipContent });
        }

        /**
         * 清除单个元素校验信息
         * @param {Object} $element 需要被清除校验信息的元素
         * @returns 无
         */
        function clearSingleInvalid($element) {
            if ($element[0].tiTooltip) {
                $element[0].tiTooltip.hide();
            }
            $element.removeClass('ti-validate-error');
        }

        /**
         * 获取校验规则
         * @param {String} ruleKey 校验规则索引
         * @returns 无
         */
        function getRuleFn(ruleKey) {
            return validRules.rulesFn[ruleKey];
        }
        return {
            clearSingleInvalid: clearSingleInvalid,
            checkValidation: checkValidation,
            getRuleFn: getRuleFn,
            setErrMsg: setErrMsg
        };
    }

    module.provider('tiValid', tinyValidService);
    function tinyValidService() {
        /**
         * 设置校验默认值
         * @param {Object} defaultsConf 需要配置的默认值
         * @returns 无
         */
        this.setDefaults = function (defaultsConf) {
            angular.extend(defaults, defaultsConf);
        };

        /**
         * 添加校验规则
         * @param {Array} rule 校验规则对象
         * @returns 无
         */
        this.addRules = function (ruleArr) {
            var rule;
            var ruleKey;
            for (var i = 0, len = ruleArr.length; i < len; i++) {
                rule = ruleArr[i];
                ruleKey = rule.ruleKey;
                validRules.rulesFn[ruleKey] = rule.ruleFn;
                validRules.errorMsg[ruleKey] = rule.errorMsg;
            }
        };

        // 这些方法在ctrl中可用
        this.$get = ['$tinyValidCommon', function ($tinyValidCommon) {
            /**
             * 清除校验信息，供外部调用
             * @param {Array} $element 需要被清除校验信息的元素
             * @returns 无
             */
            function clearInValid(elements) {
                var validEleArray = filterValidatorEle(elements);
                for (var i = 0, len = validEleArray.length; i < len; i++) {
                    $tinyValidCommon.clearSingleInvalid($(validEleArray[i]));
                }
            }

             /**
             * 获取带校验的表单元素
             * @param {Object|Array} $element 外部传入的校验元素集合
             * @returns 带校验的表单元素数组
             */
            function filterValidatorEle(elements) {
                var $elements = $(elements);// 元素转为$对象，方便后续的处理
                if ($elements.length === 0) { // 当元素数组为空时，为无效值返回
                    return [];
                }

                return $elements.filter('[ti-validation]').add($elements.find('[ti-validation]'));
            }

            /**
             * 表单校验方法，供外部调用
             * @param {Object|String} elements 校验元素
             * @param {Object} validOptions 校验特性参数，包括：
             *  {
             *    ignore: 设置校验时忽略哪些类型的元素  默认值为"：hidden"
             *    focusFirstInvalid: 设置校验失败时是否将聚焦于第一个错误的表单元素上 Boolean 默认为true
             *  }
             * @returns {Boolean} 校验返回结果
             */
            function check(elements, validOptions) {
                var validEleArray = filterValidatorEle(elements);

                var ignore = defaults.ignore;// ignore默认值，可在validOptions中定义

                // focusInvalid默认值，可在validOptions中定义
                var focusFirstInvalid = defaults.focusFirstInvalid;

                if (_.isObject(validOptions)) { // 用户定义validOptions情况下的赋值处理
                    ignore = _.isUndefined(validOptions.ignore) ? ignore : validOptions.ignore;
                    focusFirstInvalid = _.isUndefined(validOptions.focusFirstInvalid)
                        ? focusFirstInvalid
                        : validOptions.focusFirstInvalid;
                }

                var $element;// 单个校验元素
                var isEleValid = true;// 单个表单元素校验结果变量
                var isValid = true;// 整个表单元素校验结果变量
                for (var i = 0, len = validEleArray.length; i < len; i++) {
                    // $element对应的focus/blur方法是元素在link阶段绑定在angular的$element上，因此此处为angular元素
                    $element = angular.element(validEleArray[i]);

                    // 元素不校验情况返回，不校验情况包括 灰化和用户自定义忽略元素
                    if ($element.is(ignore) || $element[0].tiDisable) {
                        continue;
                    }

                    // 校验单个表单元素
                    isEleValid = $tinyValidCommon.checkValidation(
                        $element.scope().$eval($element.attr('ti-validation')),
                        $element,
                        false
                    );

                    // 寻找第一个校验失败元素，并改变整体校验结果并聚焦元素（校验错误情况下，表单边框变红，因此每个表单元素都要校验）
                    if (!isEleValid && isValid === true) {
                        isValid = false;
                        if (focusFirstInvalid) { // 聚焦于第一个校验失败元素
                            $element.focus();
                        }
                    }
                }
                return isValid;
            }
            return {
                clearInValid: clearInValid,
                getRuleFn: $tinyValidCommon.getRuleFn,
                check: check
            };
        }];
    }

    // 校验指令
    module.directive('tiValidation', ['$tinyValidCommon', Validator]);
    function Validator($tinyValidCommon) {
        var directive = {
            restrict: 'A',
            link: function (scope, $element, attr) {
                // 灰化状态下，清除校验信息
                scope.$watch(function () {
                    return scope.$eval(attr.disable) || $element.attr('disabled') || scope.$eval(attr.ngDisabled);
                }, function (newValue) {
                    if (newValue) { // disable状态时，设置表单灰化变量值并清除校验信息
                        $element[0].tiDisable = true;// 在做校验检查时，会使用该变量
                        $tinyValidCommon.clearSingleInvalid($element);
                    } else {
                        $element[0].tiDisable = false;
                    }
                });

                // 输入框获取焦点/内容改变时:进行校验并根据结果提示校验信息
                $element.on('tiFocus contentChange', function () {
                    $tinyValidCommon.checkValidation(
                        scope.$eval(attr.tiValidation),
                        $element,
                        true
                    );
                });

                // 焦点离开输入框时:根据校验结果进行处理，不显示tip提示
                $element.on('tiBlur', function () {
                    $tinyValidCommon.checkValidation(
                        scope.$eval(attr.tiValidation),
                        $element,
                        false
                    );
                });
            }
        };
        return directive;
    }
});

/**
 * @description
 * AngularJS version of the switch directive.
 * switch组件支持文字宽度自适应，开关状态双向绑定
 */

define('components/switch/switch',['components/module'],
    function (module) {
        'use strict';

        module.constant('tiSwitchConfig', {
            offLabel: 'OFF',
            onLabel: 'ON',
            knobLabel: '',
            height: 20,
            borderWidth: 1
        });

        module.directive('tiSwitch', tiSwitchDirective);
        tiSwitchDirective.$inject = ['tiSwitchConfig', '$timeout'];
        function tiSwitchDirective(tiSwitchConfig, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    state: '=?',
                    disable: '=?',
                    onLabel: '=?',
                    offLabel: '=?',
                    beforeChange: '&'
                },
                templateUrl: '/tiny-components/src/components/switch/switch.html',
                link: link
            };

            function link(scope, $element, attrs) {
                // 若开发者未配置文本，则设置默认文本
                scope.onLabel = !_.isUndefined(scope.onLabel) ? scope.onLabel : tiSwitchConfig.onLabel;
                scope.offLabel = !_.isUndefined(scope.offLabel) ? scope.offLabel : tiSwitchConfig.offLabel;

                // 若用户设置了自定义高度，则根据开发者设置的高度调整文本内容的尺寸
                var height = $element.outerHeight();
                if (height && (tiSwitchConfig.height !== height)) {
                    var lineHeight = (height - tiSwitchConfig.borderWidth * 2) + 'px';
                    $element.find('.ti-switch-knob').css({'line-height': lineHeight});
                    $element.find('.ti-switch-left').css({'line-height': lineHeight});
                    $element.find('.ti-switch-right').css({'line-height': lineHeight});
                }

                // user的点击动作触发回调处理
                scope.toggleSwitch = function () {
                    if (scope.disable) {
                        return;
                    }

                    var beforeChangeFn = scope.beforeChange();
                    // beforeChange回调中返回false, 控件不自动触发状态切换，完全由开发者控制
                    if (_.isFunction(beforeChangeFn) && beforeChangeFn() === false) {
                        return;
                    }

                    scope.state = !scope.state;
                };

            }
        }

        return module.name;
    });





/**
 * @description
 * AngularJS version of the progressbar directive.
 * 进度条组件
 */

define('components/progressbar/progressbar',['components/module'],
    function (module) {
        'use strict';

        // 默认值配置
        module.constant('tiProgressConfig', {
            animate: true, // 默认动画开启
            max: 100,
            value: 0
        });

        module.directive('tiProgressbar', tiProgressbarDirective);
        tiProgressbarDirective.$inject = ['tiProgressConfig'];
        function tiProgressbarDirective(tiProgressConfig) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    value: '=?',
                    maxValue: '=?',
                    progressClass: '=?',
                    animate: '=?'
                },
                templateUrl: '/tiny-components/src/components/progressbar/progressbar.html',
                link: link
            };

            function link(scope, $element, attrs) {
                init(scope, $element); // 初始化进度条
                addWatcher(scope); // 数据改变检查及处理
            }
            
            function init(scope, $element) {
                setAnimate(scope, $element);
                scope.maxValue = verifyNum(scope.maxValue, tiProgressConfig.max);
                scope.value = verifyNum(scope.value, tiProgressConfig.value);
                calcPercentage(scope);
            }

            function addWatcher(scope) {
                // 当前值更新，重新计算进度
                scope.$watch('value', function (newValue, oldValue) {
                    newValue = verifyNum(newValue, oldValue);
                    if (newValue === oldValue) {
                        return;
                    }
                    scope.value = newValue;
                    calcPercentage(scope);
                });
                // 当最大值更新，重新计算进度
                scope.$watch('maxValue', function (newMax, oldMax) {
                    newMax = verifyNum(newMax, oldMax);
                    if (newMax === oldMax) {
                        return;
                    }
                    scope.maxValue = newMax;
                    calcPercentage(scope);
                });
            }
            
            function setAnimate(scope, $element) {
                var $progressbar = $element.children('.progress-bar');
                scope.animate = getAnimateOrDefault(scope);
                if (!scope.animate) {
                    $progressbar.addClass('no-transition'); // 取消动画
                }
            }
            
            // 获取动画设置
            function getAnimateOrDefault(scope) {
                return angular.isDefined(scope.animate) ? scope.animate : tiProgressConfig.animate;
            }

            // 设置合法的数值
            function verifyNum(newValue, defaultValue) {
                var value = +(newValue); // 转化为数字形式
                return _.isNaN(value) ? defaultValue : value;
            }

            // 计算当前进度百分比
            function calcPercentage(scope) {
                // 如果开发者设置数据不合理，则进度置0
                if (scope.maxValue === 0) {
                    scope.percent = 0;
                    return;
                }

                scope.percent = +(100 * scope.value / scope.maxValue).toFixed(2);

                if (scope.percent > 100) {
                    scope.percent = 100;
                }

                if (scope.percent < 0) {
                    scope.percent = 0;
                }
            }
        }

        return module.name;
    });





/**
 * @description
 * AngularJS version of the wizard directive.
 * 向导组件
 */

define('components/wizard/wizard',['components/module'],
    function (module) {
        'use strict';

        module.directive('tiWizard', tiWizardDirective);
        function tiWizardDirective() {
            return {
                replace: true,
                scope: {
                    steps: '=?',
                    currentStep: '=?'
                },
                templateUrl: getTemplateUrl,
                link: link
            };

            function getTemplateUrl(tElement, tAttrs) {
                // 若开发者设置模板，则使用设置的模板
                if (tAttrs.templateUrl) {
                    return tAttrs.templateUrl;
                }

                // 若设置css类样式'ti-agile'，则按照AgileUI的wizard模板渲染
                if (tElement.hasClass('ti-agile')) {
                    return '/tiny-components/src/components/wizard/wizard-agile.html';
                }

                // 否则按照新的wizard模板样式渲染
                return '/tiny-components/src/components/wizard/wizard-cloud.html';
            }

            function link(scope) {
                init(scope);
                addWatcher(scope);
            }

            function init(scope) {
                scope.stepsArr = [];
                scope.percent = 0; // (已完成+当前活跃步骤)所占的比例
                if (angular.isArray(scope.steps)) {
                    scope.stepsArr = angular.copy(scope.steps); // 深拷贝因为内部会改变stepsArr
                }
                updateWizard(scope);
            }

            function addWatcher(scope) {
                scope.$watchCollection('steps', function (newSteps) {
                    if (!angular.isArray(newSteps)) {
                        return;
                    }
                    scope.stepsArr = angular.copy(scope.steps); // 深拷贝因为内部会改变stepsArr
                    updateWizard(scope);
                });

                scope.$watch('currentStep', function () {
                    updateWizard(scope);
                });
            }


            function updateWizard(scope) {
                var currentStepIndex = getCurrentStepIndex(scope); // 确定当前步骤的索引
                updateState(currentStepIndex, scope); // 根据当前步骤更新各步骤的state
                updatePercent(currentStepIndex, scope); // 更新已完成和当前活跃步骤所占的比例
            }

            function updateState(currentStepIndex, scope) {
                var step;
                var stepLength = scope.stepsArr.length;
                for (var i = 0; i < stepLength; i++) {
                    step = scope.stepsArr[i];
                    if (i === currentStepIndex) { // 当前步骤
                        step.state = 'active';
                    } else if (i < currentStepIndex) { // 已完成的步骤
                        step.state = 'complete';
                    } else { // 未完成的步骤
                        step.state = 'incomplete';
                    }
                }
            }

            // 获取当前步骤索引
            function getCurrentStepIndex(scope) {
                var currentStepIndex = _.findIndex(scope.stepsArr, function (step) {
                    return step.id === scope.currentStep;
                });
                if (currentStepIndex === -1) { // 若匹配不到有效的当前步骤，默认第1步
                    currentStepIndex = 0;
                }
                return currentStepIndex;
            }

            // 100 * (已完成步骤+当前步骤) / 总步骤数
            function updatePercent(currentStepIndex, scope) {
                if (scope.stepsArr.length === 0) {
                    return;
                }
                scope.percent = +(100 * (currentStepIndex + 1) / scope.stepsArr.length).toFixed(2);
            }
        }

        return module.name;
    });


define('components/ip/ip',[
    'components/module'
], function (module) {
    'use strict';
    var ipGlbInfo = {
        ipv4: {
            rgxcase: new RegExp('[0-9]', 'g'),
            label: '   .   .   .   ',
            secPos: [
                0,
                4,
                8,
                12
            ],
            place: ' ',
            separator: '.',
            partplace: '   '
        },
        ipv6: {
            rgxcase: new RegExp('[A-F0-9]', 'gi'),
            label: '    :    :    :    :    :    :    :    ',
            secPos: [
                0,
                5,
                10,
                15,
                20,
                25,
                30,
                35
            ],
            place: ' ',
            separator: ':',
            partplace: '    '
        },
        getGlbInfo: function (ver) {
            return 4 === ver ? this.ipv4 : this.ipv6;
        }
    };

    module.directive('tiIp', tiIp);
    function tiIp() {
        var directive = {
            restrict: 'E',
            scope: {
                version: '=?',
                value: '=?',
                disable: '=?',
                focused:'=?',
                change: '&',
                blur:'&'
            },
            templateUrl: '/tiny-components/src/components/ip/ip.html',
            replace: true,
            link: function (scope, $element, attrs) {
                // 如果没有定义，则执行默认动作
                if (typeof scope.version === 'undefined') {
                    scope.version = 4;
                }

                scope.$input = $element;
                scope.interChange = false;
                scope.isMouseDown = false;
                scope.hasFocus = false;//控制控件是否获得光标

                // 用户没有设置value或设置为空，或设置的值为无效，则设置为label（   。   。   。   ）
                // 要求用户输入的ip必须是格式有效的，需要用户保证，作为与用户的接口
                var inputValue;
                if (!isValidIP(scope.version, scope.value)) {
                    inputValue = ipGlbInfo.getGlbInfo(scope.version).label;
                } else {
                    inputValue = mask(scope.version, scope.value);
                }
                updateInputValue(scope, inputValue);

                scope.initFocus = false;
                if (scope.focused === true) {
                    scope.initFocus = true;
                    scope.$input.focus();
                }

                scope.$watch('value', function (newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }
                    
                    // interChange为true表示是ip组件内部更新了value即通过updateValue进行了更新，在该函数中已经对$input进行了更新，所以这里不需要更新了
                    // interChange为false表示使用ip组件的业务模块通过双向数据绑定更新了value，所以要同步更新到$input输入框上
                    if (scope.interChange === true) {
                        scope.interChange = false;
                        return;
                    }

                    // 动态更新的IP值合法时：将该值更新到输入框中
                    if (isValidIP(scope.version, newValue)) {
                        updateInputValue(scope, mask(scope.version, newValue));
                        return;
                    }

                    // 动态更新的IP值非法时：如果该值是空字符串，将输入框清空；否则，保持之前值不变。
                    if (newValue === "") {
                        updateInputValue(scope, ipGlbInfo.getGlbInfo(scope.version).label);
                    } else {
                        scope.value = oldValue; // 恢复为正确的值,与输入框试图保持一致
                    }
                });

                scope.$watch('focused', function (newValue, oldValue) {
                    if(newValue === oldValue){
                        return;
                    }

                    if (scope.focused === true){
                        scope.$input.focus();
                    }else if (scope.focused === false){
                        scope.$input.blur();
                    }
                });

                scope.keyDown = function ($event) {
                    var ret = false;
                    var ctx = new IPContext(scope.version, $event.target);
                    var glbinfo = ipGlbInfo.getGlbInfo(scope.version);
                    var code = $event.keycode || $event.which;
                    switch (code) {
                        case 9: // tab
                        case 190: // .
                        case 110: // 小键盘的。
                            ret = dealtabkey(scope, $event);
                            break;
                        case 8: // backspace
                        case 46: // delete
                            dealBackSpaceKey(scope, $event, ctx);
                            ret = true;
                            break;
                        case 13: // enter
                        case 27: // esc
                            scope.$input.blur();
                            ret = true;
                            break;
                        default:
                            ret = false;
                            break;
                    }

                    if (ret === true) {
                        $event.preventDefault();
                    }

                };

                scope.keyPress = function ($event) {
                    var specialKeyCodes = [
                        9,
                        38,
                        40,
                        37,
                        39,
                        36,
                        35
                    ]; // tab、上、下、左、右、home、end按键
                    var specialKey = [
                        'Tab',
                        'ArrowUp',
                        'ArrowDown',
                        'ArrowLeft',
                        'ArrowRight',
                        'Home',
                        'End'
                    ];

                    var ctx = new IPContext(scope.version, scope.$input[0]);
                    var glbinfo = ipGlbInfo.getGlbInfo(scope.version);
                    var code = $event.which || $event.keyCode;
                    // 对于firefox浏览器，如果屏蔽掉系统的默认处理，则用户押下ctrl+v不会触发paste事件
                    // 对于用户押下ctrl+v和ctrl+c事件采用系统默认处理，直接返回；对于ie和chrome不存在该问题
                    // 对于上、下、左、右、home、end按键，保持系统默认处理，直接返回
                    if (window.tiny.utils.browser.firefox && (($event.ctrlKey && (code === 118 || code === 86)) || ($event.ctrlKey && (code === 99 || code === 67)) || (($.inArray(code, specialKeyCodes)) >= 0 && $.inArray($event.key, specialKey) >= 0))) {
                        return;
                    }

                    $event.preventDefault();

                    // 输入非法字符
                    if (!String.fromCharCode(code).match(glbinfo.rgxcase)) {
                        return;
                    }

                    // 已经输入到最后一个字符了，不再处理后续输入，直接丢弃
                    if (ctx.start >= glbinfo.label.length) {
                        return;
                    }

                    // 修改选中的几个字符
                    if (ctx.start !== ctx.end) {
                        // 先内部产生一个backspace事件,删除被选择的内容
                        var e = {
                            keycode: 8,
                            target: scope.$input[0]
                        };
                        dealBackSpaceKey(scope, e, ctx);
                        // 在光标处输入新内容
                        ctx.buffer[ctx.start] = String.fromCharCode(code);
                        if (isValidIP(scope.version, unmask(scope.version, ctx.buffer.join('')))) { // 如果IP是有效的话则执行如下操作
                            // 输入新内容后,光标向后移动一个
                            ctx.start = ctx.start + 1;
                            ctx.end = ctx.start;
                            updateValue(scope, ctx, $event);
                            setSelectionRange(scope.$input[0], ctx.start, ctx.end);
                        }

                        return;
                    }

                    // 如果当前IP端已经有3个字符了，跳转光标到下一个IP起始端
                    if (ctx.buffer[ctx.start] === glbinfo.separator) {
                        ctx.start += 1;
                        ctx.end +=1;
                        setSelectionRange(scope.$input[0], ctx.start, ctx.end);
                        return;
                    }

                    ctx.buffer[ctx.start] = String.fromCharCode(code);
                    if (isValidIP(scope.version, unmask(scope.version, ctx.buffer.join('')))) { // 如果IP是有效的话则执行如下操作
                        // 更新内容
                        updateValue(scope, ctx, $event);

                        if (ctx.buffer[ctx.start + 1] === glbinfo.separator) { // 如果光标的下一个位置是分隔符，则要跳过
                            ctx.start = ctx.start + 2;
                            ctx.end = ctx.end + 2;
                        } else if (ctx.start < glbinfo.label.length) { // 光标必须小于IP的最大长度
                            ctx.start = ctx.start + 1;
                            ctx.end = ctx.end + 1;
                        }

                        // 重新设置光标
                        setSelectionRange(scope.$input[0], ctx.start, ctx.end);
                    } else {
                        if (scope.version === 6) {
                            return;
                        }

                        // 确保当前输入位置是当前IP段的第三个字符
                        if (ctx.start < 2 || ctx.buffer[ctx.start - 1] === glbinfo.separator || ctx.buffer[ctx.start - 2] === glbinfo.separator) {
                            return;
                        }

                        ctx.buffer[ctx.start - 2] = "2";
                        ctx.buffer[ctx.start - 1] = "5";
                        ctx.buffer[ctx.start] = "5";

                        updateValue(scope, ctx, $event);

                        // 设置光标位置
                        ctx.start += 1;
                        ctx.end +=1;
                        setSelectionRange(scope.$input[0], ctx.start, ctx.end);
                    }
                };

                scope.paste = function ($event) {
                    // 0.阻止该事件的默认行为
                    $event.preventDefault();

                    // 1.获得粘贴板的内容
                    var pasteValue = '';
                    if (window.clipboardData && window.clipboardData.getData) { // IE
                        pasteValue = window.clipboardData.getData('Text');
                    }
                    else {
                        try {
                            pasteValue = $event.originalEvent.clipboardData.getData('Text'); // 其它浏览器
                        }
                        catch (err) {}
                    }

                    // 2.构造该事件的上下文
                    var ctx = new IPContext(scope.version, $event.target);
                    var glbinfo = ipGlbInfo.getGlbInfo(scope.version);

                    // 3.执行粘贴动作,分两种情况a)如果当前光标为非区域,如果粘贴的内容满足ip校验规则,则覆盖当前值
                    // 如果光标为选择的区域,则用粘贴的内容覆盖被选择的区域,前提是新的ip要满足校验规则
                    if (ctx.start === ctx.end) {
                        var unmaskpaste = unmask(ctx.version, pasteValue);
                        if (isValidIP(ctx.version, unmaskpaste)) {
                            ctx.buffer = mask(ctx.version, unmaskpaste).split('');
                            updateValue(scope, ctx, $event);

                            // 移动光标到IP最有一段,计算光标准确位置
                            var pos = ctx.buffer.length;
                            while (ctx.buffer[pos - 1] !== glbinfo.separator && ctx.buffer[pos - 1] === glbinfo.place) {
                                pos = pos - 1;
                            }
                            ctx.start = pos;
                            ctx.end = pos;
                            setSelectionRange(scope.$input[0], ctx.start, ctx.end);
                        }
                    }
                    else {
                        var oldip = scope.$input.val();
                        var newip = oldip.substr(0, ctx.start) + pasteValue + oldip.substring(ctx.end, oldip.length);
                        var unmasknewip = unmask(ctx.version, newip); // 去掉IP中的空格,目的是检查ip是否有效
                        if (isValidIP(ctx.version, unmasknewip)) {
                            ctx.buffer = mask(ctx.version, unmasknewip).split('');
                            updateValue(scope, ctx, $event);

                            // 移动光标到拷贝区域的后面，要过滤掉空格
                            var pos = ctx.end - 1;
                            while (ctx.buffer[pos] !== glbinfo.separator && ctx.buffer[pos] === glbinfo.place) {
                                pos = pos - 1;
                            }
                            ctx.start = pos + 1;
                            ctx.end = pos + 1;
                            setSelectionRange(scope.$input[0], ctx.start, ctx.end);
                        }
                    }
                };

                scope.cut = function ($event) {
                    // 不允许剪贴输入框中的内容
                    $event.preventDefault();
                };

                scope.mouseDown = function ($event) {
                    scope.isMouseDown = true;
                };

                scope.mouseUp = function ($event) {
                    var ctx = new IPContext(scope.version, $event.target);
                    if (ctx.start !== ctx.end) {
                        return;
                    }

                    // 如果当前ip输入框为空，则光标定位到第一个位置，方便用户输入
                    var glbinfo = ipGlbInfo.getGlbInfo(scope.version);
                    if (scope.$input.val() === glbinfo.label) {
                        ctx.start = 0;
                        ctx.end = 0;
                        setSelectionRange(scope.$input[0], ctx.start, ctx.end);
                        return;
                    }

                    // 定位光标到非空格处
                    var newstart = ctx.end;
                    while (newstart > 0 && ctx.buffer[newstart - 1] === glbinfo.place) {
                        newstart = newstart - 1;
                    }
                    ctx.start = newstart;
                    ctx.end = newstart;
                    setSelectionRange(scope.$input[0], ctx.start, ctx.end);
                };

                scope.focus = function ($event) {
                    //如果已经获得过光标，并且不是通过指令初始化获得的光标，则不进行重复处理
                    if (scope.hasFocus === true){
                        return;
                    }

                    scope.hasFocus = true;
                    scope.focused = true;

                    var ctx = new IPContext(scope.version, $event.target);
                    var glbinfo = ipGlbInfo.getGlbInfo(scope.version);

                    // 如果获得焦点时，光标start=0&end=max说明是通过tab键获得的，则强制置IP的第一部分为高亮选择区
                    if (scope.isMouseDown === false) {
                        setTimeout(function () { // 必须用超时机制，否则首次押tab键，会导致IP被全选
                            ctx.start = 0;
                            if (scope.initFocus === true){
                                scope.initFocus = false;
                                ctx.end = 0;
                            }else{
                                ctx.end = 0 + glbinfo.partplace.length;
                            }
                            setSelectionRange(scope.$input[0], ctx.start, ctx.end);
                            $event.preventDefault();

                        }, 3);
                    }
                    else {
                        scope.isMouseDown = false;
                    }

                    // 触发校验事件
                    scope.$input.trigger('tiFocus');
                };

                scope.blurHandle = function ($event) {
                    // 通过数据双向绑定控制式样
                    if (scope.hasFocus === false){
                        return;
                    }

                    scope.hasFocus = false;
                    scope.focused = false;

                    var ctx = new IPContext(scope.version, $event.target);
                    var glbinfo = ipGlbInfo.getGlbInfo(scope.version);

                    // 在失去焦点时刻，要格式化ip输入框的内容
                    var ctx = new IPContext(scope.version, $event.target);
                    var ip = scope.$input.val();
                    if (ip !== glbinfo.label){
                        ip = unmask(ctx.version, ip);
                    }
                    if (isValidIP(ctx.version, ip)) {
                        ctx.buffer = mask(ctx.version, ip).split('');
                    }
                    else {
                        // 在blur的时候校验ip,如果为无效IP,则IP清空
                        ctx.buffer = glbinfo.label.split('');
                    }

                    updateValue(scope, ctx, $event);

                    // 触发用户定义的blur时间
                    if (_.isFunction(scope.blur())) {
                        scope.blur()(scope.value);
                    }
		    
                    // 触发校验事件
                    scope.$input.trigger('tiBlur');
                };
            }
        };

        return directive;
    }


    function updateInputValue(scope, inputValue) {
        scope.$input.val(inputValue);

        scope.$input[0].tiValue = scope.value; // 注意：tiValue与scope.value保持一致，而不是与输入框中内容保持一致
    }

    /**
      * 处理键盘的tab按键
      * @param scope
      * @param e
      * @returns {boolean}
      */
    function dealtabkey(scope, e) {
        var ctx = new IPContext(scope.version, e.target);
        var glbinfo = ipGlbInfo.getGlbInfo(scope.version);

        var secPos = glbinfo.secPos;
        var max = secPos.length;
        var forward = e.shiftKey;
        var i = 0;
        if (!forward) {
            // 在通过tab键在各IP端向后移动光标，如果移到最后一个IP端，在该情况下在押tab键，则使用系统默认处理，返回false
            if (ctx.start >= secPos[max - 1]) {
                return false;
            }

            // 计算向后移动光标的位置
            for (i = 0; i < max; i++) {
                if (secPos[i] > ctx.start) {
                    ctx.start = secPos[i];
                    ctx.end = secPos[i] + glbinfo.partplace.length;
                    break;
                }

            }
            setSelectionRange(scope.$input[0], ctx.start, ctx.end);
        }
        else {
            // 如果当前光标在IP的第一个位置，再押shift+tab则，返回false，按系统默认处理进行
            if (ctx.start === 0) {
                return false;
            }

            // 计算向前移动光标的位置
            for (i = max; i >= 0; i--) {
                if (ctx.start > secPos[i]) {
                    ctx.start = secPos[i];
                    ctx.end = secPos[i] + glbinfo.partplace.length;
                    break;
                }

            }
            setSelectionRange(scope.$input[0], ctx.start, ctx.end);
        }
        return true;
    }

    /**
      * 处理键盘的backspace按键
      * @param scope
      * @param e
      * @param ctx
      */
    function dealBackSpaceKey(scope, e, ctx) {
        var glbinfo = ipGlbInfo.getGlbInfo(scope.version);
        var start = ctx.start;
        var end = ctx.end;
        var buffer = ctx.buffer;
        // alert("keydown:"+ e.keycode);
        // 如果当前光标的状态不是选择的区段
        if (start === end) {
            // 光标在最开始的位置且按键为backspace，则无需要删除的字符
            if (start === 0 && e.keyCode === 8) {
                return;
            }

            // 计算要删除字符的索引位置,如果按键是backspace,则要删除光标前一个位置的字符,如果是delete则需要删除当前光标位置的字符
            var deletePos = 0;
            if (e.keyCode === 8) { // 8表示键盘上的backspace按键
                deletePos = start - 1;
            }
            else if (e.keyCode === 46) { // 46表示键盘上的delete按键
                deletePos = start;
            }

            // 如果待删除的字符是分隔符号，则只进行光标移动，不执行删除动作;在非分隔符的情况下执行删除操作
            if (buffer[deletePos] !== glbinfo.separator) {
                // 用后面的字符覆盖前面的字符方式，进行删除,移动的停止条件是遇到分隔符或达到最后一个字符为止
                var cur = deletePos;
                while (buffer[cur + 1] !== glbinfo.separator && (cur + 1 < buffer.length)) {
                    buffer[cur] = buffer[cur + 1];
                    cur = cur + 1;
                }
                buffer[cur] = glbinfo.place; // 最后被移动的字符补空格

                // 更新控件显示内容
                updateValue(scope, ctx, e);
            }

            // 移动光标
            ctx.start = deletePos;
            ctx.end = deletePos;
            setSelectionRange(scope.$input[0], ctx.start, ctx.end);
            return;
        }

        // 删除cur和end之间的非分隔符字符，被删除的字符用空格代替
        var cur = start;
        var pos = -1; // 初始化为-1
        for (cur = start; cur < end; cur++) {
            if (buffer[cur] !== glbinfo.separator) {
                buffer[cur] = glbinfo.place;
            }
            else {
                // 如果cur和end之间有多个分隔符存在，记录最后一个separator的位置
                pos = cur;
            }
        }


        // 移动后面的字符，确定拷贝的源和目标位置；实际分两种情况:a)跨分隔符，b)不跨分隔符
        var from = end;
        var to = null;
        // pos为-1说明删除的区间没有跨越分隔符
        if (pos === -1) {
            to = start;
        }
        else {
            to = pos + 1;
        }

        while (from < buffer.length && buffer[from] !== glbinfo.separator) {
            buffer[to] = buffer[from];
            to = to + 1;
            from = from + 1;
        }
        buffer[from - 1] = glbinfo.place;
        ctx.start = ctx.start;
        ctx.end = ctx.start;

        // scope.$input.val(mask(ctx.version, ctx.buffer.join('')));
        // 更新ip输入框内的值同时设置光标
        updateValue(scope, ctx, e);
        setSelectionRange(scope.$input[0], ctx.start, ctx.end);
    }

    function IPContext(ver, inputElement) {
        this.version = ver;
        this.start = inputElement.selectionStart;
        this.end = inputElement.selectionEnd;
        this.buffer = $(inputElement).val().split('');
    }

    /**
      * 其中ctx中的buffer中的内容必须能够组合为为满足IP输出格式
      *
      * @param scope
      * @param ctx
      * @param $event
      */
    function updateValue(scope, ctx, $event) {
        var glbinfo = ipGlbInfo.getGlbInfo(scope.version);

        var newvalue = ctx.buffer.join('');

        var umaskvalue;
        if (newvalue === glbinfo.label){
            umaskvalue = "";
        }else {
            umaskvalue = unmask(scope.version, newvalue);
        }

        if (scope.value !== umaskvalue) {
            scope.value = umaskvalue;
            scope.interChange = true;
        }

        updateInputValue(scope, newvalue); //更新到IP输入框中

        // 触发用户定义的change
        if (umaskvalue !== scope.value && _.isFunction(scope.change())) {
            scope.change()($event, umaskvalue);
        }

        // 触发contentChange事件（用于校验）
        scope.$input.trigger('contentChange');
    }

    /**
      * 设置浏览器光标位置，考虑浏览器兼容性
      * @param inputElement
      * @param selectionStart
      * @param selectionEnd
      */
    function setSelectionRange(inputElement, selectionStart, selectionEnd) {
        if (inputElement.setSelectionRange) {
            inputElement.focus();
            inputElement.setSelectionRange(selectionStart, selectionEnd);
        }
        else if (inputElement.createTextRange) {
            var range = inputElement.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    }

    function isValidIP(ver, ip) {
        if (ip == null || ip === '') {
            return false;
        }

        return ver === 4 ? isIpv4(ip) : isIpv6(ip);
    }

    function isIpv4(ip) {
        // var rgx = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
        var rgx = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i;
        return rgx.test(ip);
    }

    function isIpv6(ip) {
        // var rgx = /^([A-F0-9%\/]{1,4}:){7}([A-F0-9%\/]{1,4})$/i;
        var rgx = /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i;
        return rgx.test(ip);
    }

    /**
      * IP地址的每部分，不满足长度的用空格补齐，例如：“12。12.23.2”经过该函数处理后变为：“12 .12 .23 .2  ”
      * @param ver
      * @param ip
      * @returns {string}
      */
    function mask(ver, ip) {
        // 为IP的每一个部分，不满足长度的，补空格，然后再组成IP
        var s = ipGlbInfo.getGlbInfo(ver);
        var part = ip.split(s.separator);
        for (var j = 0; j < part.length; j++) {
            while ((s.partplace.length - part[j].length) > 0) {
                part[j] += s.place;
            }
        }
        return part.join(s.separator);
    }

    /**
      * 去掉空格后的IP地址；例如“  12.12 .23.2  ”进过该函数处理后返回：“12.12.23.2”
      * @param ver
      * @param ip
      * @returns {XML|string}
      */
    function unmask(ver, ip) {
        var s = ipGlbInfo.getGlbInfo(ver);
        var rgx = new RegExp(s.partplace, 'g');
        var rgx2 = new RegExp(s.place, 'g');
        return ip.replace(rgx, '0').replace(rgx2, '');
    }
});

define('components/spinner/spinner',[
    'components/module'
], function (module) {
    'use strict';

    module.provider('tiSpinnerService', spinnerService);
    function spinnerService() {
        var defaults = this.defaultValue = {
            max: Math.pow(2, 53), // JavaScript中能够表示的整数范围是53位的，如果超过了这个范围的整数，进行一些运算时会出现错误
            min: -Math.pow(2, 53),
            step: 1,
            value: ''
        };

        // 开发者在angular应用的config阶段可以调用setDefaults方法来配置默认值
        this.setDefaults = function (newDefaults) {
            angular.extend(defaults, newDefaults);
        };

        this.$get = function () {
            var service = {
                defaultValue: this.defaultValue
            };
            return service;
        };
    }

    module.directive('tiSpinner', tiSpinner);
    tiSpinner.$inject = ['tiSpinnerService'];
    function tiSpinner(tiSpinnerService) {
        var directive = {
            restrict: 'E',
            priority: 999,
            scope: {
                format: '=?',
                step: '=?',
                max: '=?',
                min: '=?',
                disable: '=?',
                value: '=?',
                focused: '=?',
                change: '&'
            },
            templateUrl: '/tiny-components/src/components/spinner/spinner.html',
            replace: true,
            link: function (scope, $element, attrs) {
                init(scope, $element, attrs);
                addWatchData(scope);
                addBehavior(scope);
            }
        };

        function init(scope, $element) {
            scope.$element = $element;
            scope.hasFocus = false;
            // 1.检查初始化精度数据的合法性
            // 用户为传该参数,则设置为默认精度为2
            if (isInvalidFormat(scope)) {
                scope.precision = 'undefined';
            } else {
                scope.precision = parseInt(scope.format.slice(1), 10);
            }

            // 2.check step的合法性
            scope.step = parseFloat(scope.step);
            if (isNaN(scope.step)) {
                scope.step = tiSpinnerService.defaultValue.step;
            }

            // 3.check  max min的合法性
            scope.max = parseFloat(scope.max);
            if (isNaN(scope.max)) {
                scope.max = tiSpinnerService.defaultValue.max;
            }

            scope.min = parseFloat(scope.min);
            if (isNaN(scope.min)) {
                scope.min = tiSpinnerService.defaultValue.min;
            }

            if (scope.max < scope.min) {
                scope.max = tiSpinnerService.defaultValue.max;
                scope.min = tiSpinnerService.defaultValue.min;
            }

            // 4.check value的合法性
            correctValue(scope);

            // 5. 处理focused
            if (scope.focused === true) {
                var $input = $element.find('.ti-spinner-input');
                $input.focus();
            } else {
                scope.focused = false; // 如果用户没有配置为true的情况下，默认设置为false
            }
        }

        // 该方法用于合法化当前value值
        function correctValue(scope) {
            var curValue = parseFloat(scope.value);
            if (isNaN(curValue)) {
                scope.value = tiSpinnerService.defaultValue.value; // 如果是非数字，则设置为空
            } else if (curValue < scope.min) {
                scope.value = scope.min;
                formatValue(scope);
            } else if (curValue > scope.max) {
                scope.value = scope.max;
                formatValue(scope);
            } else {
                scope.value = curValue;
                formatValue(scope);
            }
            scope.inputValue = scope.value;// 修改spinner input的值
            scope.$element[0].tiValue = scope.value;// 设置校验值value
        }

        function addWatchData(scope) {
            scope.$watch('max', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 非数字或校验失败
                scope.max = parseFloat(newValue);
                if (isNaN(scope.max) || scope.min > scope.max) {
                    scope.max = oldValue;
                }

                correctValue(scope);
            });

            scope.$watch('min', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                scope.min = parseFloat(newValue);
                if (isNaN(scope.min) || scope.min > scope.max) {
                    scope.min = oldValue;
                }

                correctValue(scope);
            });

            scope.$watch('disable', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                if (typeof (scope.disable) !== 'boolean') {
                    scope.disable = oldValue;
                }
            });

            scope.$watch('focused', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                var $input = scope.$element.find('.ti-spinner-input');
                if (scope.focused === true) {
                    $input.focus();
                } else if (scope.focused === false) {
                    $input.blur();
                }
            });

            // 监控该值只用于业务数据改变导致，组件内部导致的改变要直接返回
            scope.$watch('value', function (newValue, oldValue) {
                // 初始value值未更新情况 或 value值为外部动态更新情况下(考虑到外部更新情况下，inputValue中的值并未做更新处理，因此用该方式判断)，不做处理
                if ((newValue === oldValue) || (scope.value === scope.inputValue)) {
                    return;
                }

                var curValue = parseFloat(newValue);
                if (newValue === '') { // 当前值为空情况下，赋值为空
                    scope.inputValue = newValue;
                } else if (isNaN(curValue) ||
                    (curValue < scope.min) ||
                    (curValue > scope.max)) { // 如果赋值为空或非法值，不做修改
                    scope.value = scope.inputValue;
                } else { // 如果是合法值，修改当前input值，
                    scope.value = curValue;
                    formatValue(scope);
                    scope.inputValue = scope.value;// 修改spinner input的值
                }
                scope.$element[0].tiValue = scope.value;// 设置校验值value
            });
        }

        function addBehavior(scope) {
            scope.keyDown = function ($event) {
                if (!isValidKey($event)) {
                    $event.preventDefault();
                    return;
                }

                if ($event.keyCode === 38) { // 向上键
                    scope.stepNumber($event, 'add');
                } else if ($event.keyCode === 40) { // 向下键
                    scope.stepNumber($event, 'sub');
                }
            };

            scope.focus = function ($event) {
                if (scope.hasFocus === true) {
                    return;
                }

                scope.hasFocus = true;
                scope.focused = true;

                // 对接校验，提供校验对应的focus事件
                scope.$element.trigger('tiFocus', [
                    $event,
                    scope.value
                ]);
            };

            scope.blur = function ($event) {
                if (scope.hasFocus === false) {
                    return;
                }

                scope.hasFocus = false;
                scope.focused = false;

                correctValue(scope);

                // 对接校验，提供校验对应的blur事件
                scope.$element.trigger('tiBlur', [
                    $event,
                    scope.value
                ]);
            };

            scope.inputChange = function ($event) {
                // 考虑到用户输入的流畅性，用户输入过程中的值更新不做合法性处理，只更新校验中对应的值，并触发校验对应的值更新
                scope.value = scope.inputValue;
                scope.$element[0].tiValue = scope.inputValue;
                scope.$element.trigger('contentChange');

                // 对外change事件提供
                if (_.isFunction(scope.change())) {
                    scope.change()($event, scope.value);
                }
            };

            scope.stepNumber = function ($event, method) {
                if (scope.disable === true) {
                    return;
                }

                // 如果是鼠标按下向下btn，输入框需要做获得光标的处理
                if ($event.type === 'mousedown') {
                    var $input = scope.$element.find('.ti-spinner-input');
                    $input.focus();
                    $event.preventDefault(); // 目的是防止input失去焦点
                }

                var oldValue = scope.value;
                // 如果value无效，则直接返回
                if (isInvalid(oldValue)) {
                    return;
                }

                // 计算更新后的value值，并对value值做有效性处理
                scope.value = accOperate(oldValue, scope.step, method);
                correctValue(scope);

                if (oldValue !== scope.value) {
                    scope.$element.trigger('contentChange');// 对接校验，提供校验需要的contentChange事件 调节值时引起的内容改变
                    if (_.isFunction(scope.change())) { // 对外change事件提供
                        scope.change()($event, scope.value);
                    }
                }
            };
        }

        function isInvalidFormat(scope) {
            if (typeof (scope.format) !== 'string' || scope.format.charAt(0).toUpperCase() !== 'N' || isNaN(parseInt(scope.format.slice(1), 10))) {
                return true;
            }

            return false;
        }

        function formatValue(scope) {
            if (scope.precision === 'undefined') {
                return;
            }

            scope.value = Number(scope.value).toFixed(scope.precision);
        }
        // calculate Num
        function accOperate(value, step, method) {
            var r1;
            var r2;
            var m;
            var c;
            var _value;
            var _step;
            try {
                r1 = value.toString().split('.')[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = step.toString().split('.')[1].length;
            } catch (e) {
                r2 = 0;
            }
            c = Math.abs(r1 - r2);
            m = Math.pow(10, Math.max(r1, r2));
            if (c > 0) {
                var cm = Math.pow(10, c);
                if (r1 > r2) {
                    _value = Number(value.toString().replace('.', ''));
                    _step = Number(step.toString().replace('.', '')) * cm;
                } else {
                    _value = Number(value.toString().replace('.', '')) * cm;
                    _step = Number(step.toString().replace('.', ''));
                }
            } else {
                _value = Number(value.toString().replace('.', ''));
                _step = Number(step.toString().replace('.', ''));
            }

            if (method === 'add') {
                return (_value + _step) / m;
            }

            if (method === 'sub') {
                return (_value - _step) / m;
            }

            return undefined;
        }

        function isValidKey(e) {
            var valid = [
                8, // backspace
                9, // tab
                13, // enter
                27, // escape
                35, // end
                36, // home
                37, // left arrow
                39, // right arrow
                46, // delete
                38, // up Arrow
                40, // down Arrow
                48,
                96, // 0
                49,
                97, // 1
                50,
                98, // 2
                51,
                99, // 3
                52,
                100, // 4
                53,
                101, // 5
                54,
                102, // 6
                55,
                103, // 7
                56,
                104, // 8
                57,
                105, // 9
                110,
                190, // period
                189 // -
            ];
            var keyCode = e.keyCode;
            // 有效快捷键操作：ctrl+C,ctrl+V,ctrl+A,ctrl+X,shift键放开
            if (e.ctrlKey &&
                (keyCode === 67 || keyCode === 86 || keyCode === 65 || keyCode === 88)) {
                return true;
            }

            if (_.contains(valid, keyCode)) {
                return true;
            }

            return false;
        }

        function isInvalid(value) {
            if (isNaN(value) || value === '' || value === '-') {
                return true;
            }

            return false;
        }

        return directive;
    }
});

define('components/actionMenu/actionMenu',['components/module', 'components/menu/menu'],
    function (module) {
        'use strict';

        module.provider('actionMenuService', actionMenuService);
        function actionMenuService() {
            var defaults = this.defaultValue = {
                maxWidth: 250,
                space: 10,
                panelMaxWidth: 130
            };

            // 开发者在angular应用的config阶段可以调用setDefaults方法来配置默认值
            this.setDefaults = function (newDefaults) {
                angular.extend(defaults, newDefaults);
            };

            this.$get = function () {
                return {
                    defaultValue: this.defaultValue
                };
            };
        }

        module.directive('tiActionMenu', tiActionMenu);

        tiActionMenu.$inject = ['actionMenuService'];

        function tiActionMenu(actionMenuSer) {
            var directive = {
                restrict: 'E',
                templateUrl: '/tiny-components/src/components/actionMenu/actionMenu.html',
                replace: true,
                scope: {
                    maxWidth: '=', // 外部容器宽度
                    space: '=',    // 各item的间距
                    maxVisibleNum: '=', // 外部可显示的最大个数
                    items: '=',    // 控件各显示项的配置
                    moreText: '=',  // 下拉菜单上方显示文本
                    menuText: '=',  // 只显示更多项下拉菜单时，下拉菜单上方显示文本
                    panelMaxWidth: '='
                },

                link: actionMenuLinkFn
            };
            return directive;

            function actionMenuLinkFn(scope, $element) {
                // 用户入参非法判断
                var items = scope.items || [];
                var itemsLen = items.length;
                if (itemsLen < 1) {
                    return;
                }

                // 标准化用户入参
                var customSpace = parseInt(scope.space, 10); // 用户自定义间距
                var space = !isNaN(customSpace) ? customSpace : actionMenuSer.defaultValue.space;

                var customMaxVisibleNum = parseInt(scope.maxVisibleNum, 10); // 用户自定义最大占位个数
                var maxVisibleNum = itemsLen;
                if (!isNaN(customMaxVisibleNum)) {
                    maxVisibleNum = Math.min(customMaxVisibleNum, itemsLen);
                }

                var customMaxWidth = parseInt(scope.maxWidth, 10); // 用户自定义父容器最大宽度
                var defaultMaxWidth = actionMenuSer.defaultValue.maxWidth;
                var maxWidth = isNaN(customMaxWidth) ? defaultMaxWidth : customMaxWidth;
                var widgetLanguage = tiny.language;
                var moreText = scope.moreText || widgetLanguage.more_title; // 用户自定义下拉菜单上方显示文本

                // 根据用户配置，做menu的自适应布局
                var groupedItemsInfo = groupItems(items, moreText, space, maxWidth, maxVisibleNum);

                // 生成菜单dom并添加事件操作
                // 只有更多的情况下，操作菜单按钮文本显示为 "操作"
                if (groupedItemsInfo.itemsDomArray.length === 0) {
                    moreText = scope.menuText || widgetLanguage.actionmenu_operate_title;
                }
                generateDom($element, items, moreText, groupedItemsInfo, scope);
            }

            /**
             * 计算menu布局
             * @param items 必选参数 外部传入的item项配置
             * @param moreText 必选参数 更多文本配置
             * @param space 必选参数 各项间距
             * @param maxWidth 必选参数 父容器最大占位宽度
             * @param maxVisibleNum 必选参数 更多占位个数
             * @return object {
             *     moreItemsArray  更多item数组
             *     itemsDomArray   外部显示菜单项数组
             * }
             */
            function groupItems(items, moreText, space, maxWidth, maxVisibleNum) {
                // 计算除去 更多下拉菜单 情况下 的可占位个数及占位dom信息
                var result = calcMaxNumExcludeMore(items, space, maxWidth, maxVisibleNum);


                // 考虑 更多下拉菜单 占位情况下的布局情况计算
                // 1.无 更多下拉菜单 的情况下，返回 已计算 item dom数组;
                if (result.maxVisibleNum === items.length) {
                    return { moreItemsArray: [],
                        itemsDomArray: result.itemsDomArray };
                }
                // 2.有 更多下拉菜单 的情况下，计算加上 更多下拉菜单 后的占位个数及占位dom
                return calcMaxNumIncludeMore(items, moreText, maxWidth, space, result);
            }

            function calcMaxNumExcludeMore(items, space, maxWidth, maxVisibleNumOption) {
                var itemTemplate = '<span class = "ti-action-menu-item" style = "margin-right : ' + space + 'px;"></span>'; // 外部显示的item DOM模板
                var itemsDomArray = []; // 存放外部展示的item Dom对象
                var itemsDomWidthArray = []; // 存放外部放的item Dom宽度

                // 只有一项item的情况下，不计算宽度布局，直接存dom
                if (items.length === 1) {
                    var $itemDom = $(itemTemplate).html(items[0].title);
                    $itemDom.attr({ disabled: items[0].disable, actionMenuIndex: 0 });
                    return { maxVisibleNum: 1,
                        itemsDomArray: [$itemDom] };
                }

                // 数据初始化
                var acculateWidth = 0; // 初始化 actionMenu呈现的宽度之和

                // for循环中使用的 数据初始化 信息
                var itemDomWidth = 0; // 初始化单个itemDom宽度
                var $itemDomCache; // 初始化for循环中单个itemDom临时对象
                var item; // 初始化for循环中取得的单个item对象
                var spaceItem; // 初始化item左侧间距
                var maxVisibleNum = maxVisibleNumOption;
                for (var i = 0; i < maxVisibleNumOption; i++) {
                    item = items[i];
                    if (item.childrens) {
                        maxVisibleNum = i;
                        break;
                    }

                    // 拼装单项item dom
                    $itemDomCache = $(itemTemplate).html(item.title);
                    $itemDomCache.attr({ disabled: item.disable, actionMenuIndex: i });

                    // 计算每一项的宽度
                    itemDomWidth = calcuDomWidth($itemDomCache);

                    // 当加上该项的宽度超出最大宽度时，则该项为最大显示项
                    spaceItem = (i === 0) ? 0 : space; // 第一项不加间距，其余项加左间距
                    if (acculateWidth + spaceItem + itemDomWidth > maxWidth) {
                        maxVisibleNum = i;
                        break;
                    }

                    // 记录当前显示信息
                    acculateWidth += spaceItem + itemDomWidth;
                    itemsDomArray.push($itemDomCache);
                    itemsDomWidthArray.push(itemDomWidth);
                }

                return { maxVisibleNum: maxVisibleNum,
                    itemsDomArray: itemsDomArray,
                    itemsDomWidthArray: itemsDomWidthArray,
                    acculateWidth: acculateWidth };
            }

            function calcMaxNumIncludeMore(items, moreText, maxWidth, space, calculatedItemInfo) {
                // 生成 更多 按钮
                var $moreMenuToggle = $('<span class="ti-menu-toggle-menu">' + moreText + '</span>');

                // 获取 更多 按钮的宽度 并计算加上 更多按钮情况下的宽度
                var moreMenubtnDomWidth = calcuDomWidth($moreMenuToggle);

                // 将初步筛选的需要放在更多下拉菜单中的items 组装成数组
                var maxNumExcludeMore = calculatedItemInfo.maxVisibleNum;
                // 从 maxNumExcludeMore到最后一个数组元素 组成的item数组
                var moreItemsArray = items.slice(maxNumExcludeMore);

                var itemsDomArray = calculatedItemInfo.itemsDomArray;
                // 计算加上更多后的占位    占位超出 且 除更多外还有其他项占位情况下， 计算实际情况下  更多 中应存放的items
                var acculateWidth = calculatedItemInfo.acculateWidth;
                acculateWidth += space + moreMenubtnDomWidth;
                if ((acculateWidth > maxWidth) && (maxNumExcludeMore !== 0)) {
                    var itemsDomWidthArray = calculatedItemInfo.itemsDomWidthArray;
                    var itemIndex;
                    for (var j = 1; j <= maxNumExcludeMore; j++) {
                        itemIndex = maxNumExcludeMore - j;
                        acculateWidth = acculateWidth - itemsDomWidthArray[itemIndex] - space;

                        moreItemsArray.unshift(items[itemIndex]); // 将该项加到更多的第一项中
                        itemsDomArray.pop(); // 删除外部显示的最后一个元素

                        if (acculateWidth <= maxWidth) {
                            break;
                        }
                    }
                }

                // 更多中只有一项的情况下,将前一项放入更多中
                if (moreItemsArray.length === 1) {
                    moreItemsArray.unshift(items[itemsDomArray.length - 1]);
                    itemsDomArray.pop();
                }

                return { moreItemsArray: moreItemsArray,
                    itemsDomArray: itemsDomArray };
            }

            function calcuDomWidth($itemDom) {
                $('body').append($itemDom);
                var itemDomWidth = $itemDom.width();
                $itemDom.remove();
                return itemDomWidth;
            }

            function generateDom($element, items, moreText, groupedItemsInfo, scope) {
                // 生成外部显示item项的dom
                var itemsDomArray = groupedItemsInfo.itemsDomArray;
                $element.prepend(itemsDomArray);

                // 为每一项添加事件
                $element.on('click', '.ti-action-menu-item', function () {
                    addItemClickEvt(items, $(this));
                });

                // 没有更多的情况下，去掉末项的margin-right
                if (groupedItemsInfo.moreItemsArray.length === 0) {
                    itemsDomArray[itemsDomArray.length - 1].css('margin-right', 0);
                    scope.hasMenu = false;
                    return;
                }

                // 有更多的情况下，设置更多menu组件接口
                scope.hasMenu = true;
                setMenuOptions(groupedItemsInfo.moreItemsArray, moreText, scope);
            }

            function setMenuOptions(moreItemsArray, moreText, scope) {
                scope.menu = {
                    toogleName: moreText,
                    items: moreItemsArray,
                    panelAlign: 'right',
                    panelMaxWidth: scope.panelMaxWidth || actionMenuSer.defaultValue.panelMaxWidth
                };
            }

            function addItemClickEvt(items, $itemDom) {
                var index = parseInt($itemDom.attr('actionMenuIndex'), 0);
                var item = items[index];
                if ((typeof item.click === 'function') && (!item.disable)) {
                    item.click(item);
                }
            }
        }
        return module.name;
    }
);

define('components/leftmenu/leftmenu',['components/module'], function (module) {
    'use strict';

    module.directive('tiLeftmenu', tiLeftmenu);
    tiLeftmenu.$inject = ['$state'];
    function tiLeftmenu($state) {
        tiLeftmenuCtr.$inject = ['$scope'];
        function tiLeftmenuCtr($scope) {
            this.scope = $scope;
        }

        var directives = {
            restrict: 'E',
            scope: {
                activeId: '=?',
                toggleClick: '&',
                isCollapsed: '=?',
                enableToggle: '=?',
                enableUiRouter: '=?'
            },
            templateUrl: '/tiny-components/src/components/leftmenu/leftmenu.html',
            replace: true,
            controller: tiLeftmenuCtr,
            transclude: true,
            link: linkFn
        };
        return directives;

        function linkFn(scope) {
            scope.isCollapsed = _.isUndefined(scope.isCollapsed) ? true : !!scope.isCollapsed;
            scope.enableToggle = _.isUndefined(scope.enableToggle) ? true : !!scope.enableToggle;
            scope.enableUiRouter = isEnableUiRouter(scope);

            if (scope.enableUiRouter) {
                $state.go(scope.activeId + '');
            }

            scope.toggleClickFn = function () {
                scope.isCollapsed = !scope.isCollapsed;

                if (_.isFunction(scope.toggleClick())) {
                    scope.toggleClick()(scope.isCollapsed);
                }
            };

            scope.$watch('activeId', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                if (scope.enableUiRouter) {
                    $state.go(scope.activeId + '');
                }
            });

            if (scope.enableUiRouter) {
                // 用户直接输入url、点击头部menu等方式改变状态时，leftmenu能同步修改激活状态
                scope.$on('$stateChangeSuccess', function (evt, toState) {
                    scope.activeId = toState.name;
                });
            }
        }
    }

    function isEnableUiRouter(scope) {
        return _.isUndefined(scope.enableUiRouter) ? true : !!scope.enableUiRouter;
    }

    module.directive('tiLeftmenuHead', tiLeftmenuHead);
    function tiLeftmenuHead() {
        var directives = {
            restrict: 'E',
            templateUrl: '/tiny-components/src/components/leftmenu/leftmenuHead.html',
            replace: true,
            transclude: true
        };
        return directives;
    }

    module.directive('tiLeftmenuLevel1', tiLeftmenuLevel1);
    tiLeftmenuLevel1.$inject = ['$state'];
    function tiLeftmenuLevel1($state) {
        var directives = {
            restrict: 'E',
            scope: {
                item: '=?'
            },
            require: '^^tiLeftmenu',
            templateUrl: '/tiny-components/src/components/leftmenu/leftmenuLevel1.html',
            replace: true,
            transclude: true,
            link: linkFn
        };
        return directives;

        function linkFn(scope, $element, attrs, tiLeftmenuCtrl) {
            init();

            addBehavior();

            addWatcher();

            function init() {
                setShowChildren();

                setActiveState();

                // 将$item的内容包裹在一个div中的目的：保证$item上用户设置的事件能在整个$item上生效，而不仅是文本上
                var $item = $('ti-leftmenu-item', $element);
                var $label = $("<div class='ti-leftmenu-level1-label'></div>");
                $label.append($item.children());
                $item.append($label);
                $('.ti-leftmenu-level1-item', $element).append($item);
            }

            function addBehavior() {
                scope.clickFn = function () {
                    if (hasChildren()) {
                        scope.showChildren = !scope.showChildren;
                        setActiveState();
                    } else {
                        tiLeftmenuCtrl.scope.activeId = scope.item.id;
                    }
                };


                if (isEnableUiRouter(tiLeftmenuCtrl.scope)) {
                    scope.$on('$stateChangeSuccess', function () {
                        setActiveState();
                    });
                }
            }

            function addWatcher() {
                tiLeftmenuCtrl.scope.$watch('activeId', function (newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }

                    setActiveState();
                });
            }

            function setShowChildren() {
                scope.showChildren = false;
                if (!hasChildren()) {
                    return;
                }

                // 初始化时，子菜单中有当前选中状态时，显示子菜单
                if (hasActivedChildren()) {
                    scope.showChildren = true;
                }
            }

            /**
             * 设置当前菜单是否处于激活状态，下边两种情况下将当前菜单设置为激活状态：
             * 有子菜单时，当子菜单有有激活状态项并且子菜单关闭状态情况下；
             * 没有子菜单时，当前菜单就是激活菜单项。
             * */
            function setActiveState() {
                if ((hasChildren() && hasActivedChildren() && !scope.showChildren) || isActived()) {
                    scope.isActived = true;
                } else {
                    scope.isActived = false;
                }
            }

            function hasChildren() {
                return scope.item.children && scope.item.children.length;
            }

            function hasActivedChildren() {
                // 没有开启uiRouter时，通过判断子菜单id是否等于当前激活id，确定是否有激活的子菜单
                if (!isEnableUiRouter(tiLeftmenuCtrl.scope)) {
                    var index = _.findIndex(
                        scope.item.children,
                        { id: tiLeftmenuCtrl.scope.activeId });
                    return index !== -1;
                }

                // 开启uiRouter时，通过判断子菜单id是否是当前状态名或者是当前状态的父状态名，确定是否有激活的子菜单
                var active = false;
                var children = scope.item.children;
                for (var i = 0; i < children.length; i++) {
                    active = active || $state.includes(children[i].id);
                }
                return active;
            }

            function isActived() {
                if (isEnableUiRouter(tiLeftmenuCtrl.scope)) {
                    return $state.includes(scope.item.id);
                }

                return scope.item.id === tiLeftmenuCtrl.scope.activeId;
            }
        }
    }

    module.directive('tiLeftmenuLevel2', tiLeftmenuLevel2);
    tiLeftmenuLevel2.$inject = ['$state'];
    function tiLeftmenuLevel2($state) {
        var directives = {
            restrict: 'E',
            scope: {
                item: '=?'
            },
            templateUrl: '/tiny-components/src/components/leftmenu/leftmenuLevel2.html',
            replace: true,
            transclude: true,
            require: '^^tiLeftmenu',
            link: function (scope, $element, attrs, tiLeftmenuCtrl) {
                var tiLeftmenuScope = tiLeftmenuCtrl.scope;

                scope.clickFn = function () {
                    tiLeftmenuScope.activeId = scope.item.id;
                };

                tiLeftmenuScope.$watch('activeId', function () {
                    if (isEnableUiRouter(tiLeftmenuScope)) {
                        scope.isActived = $state.includes(scope.item.id);
                        return;
                    }

                    scope.isActived = tiLeftmenuScope.activeId === scope.item.id;
                });

                if (isEnableUiRouter(tiLeftmenuScope)) {
                    scope.$on('$stateChangeSuccess', function () {
                        scope.isActived = $state.includes(scope.item.id);
                    });
                }
            }
        };

        return directives;
    }
});

/*
 * 图表库,技术基础：eCharts + AngularJS,默认风格为AgileUI
 */
define('components/charts/charts',['components/module'], function (module) {
    'use strict';

    var defaults = {
        imagesPath: '../../../resources/widget/themes/default/images'
    };
    module.provider('tiCharts', function () {
        this.setDefaults = function (defaultsConf) {
            angular.extend(defaults, defaultsConf);
        };
        this.$get = function () {};
    });

    /**
     * Agile UI Theme
     */
    module.factory('agileUiTheme', [function () {
        return {
            theme: {
                imagesPath: defaults.imagesPath,
                // 默认色板
                color: [
                    '#5ecc49', '#42ccef', '#9592f0', '#ffa235', '#a7e52d',
                    '#fc5043', '#777777', '#468bf3', '#efe034', '#f87fa7'
                ],
                // 图表标题
                title: {
                    itemGap: 8,
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#666666'
                    }
                },
                axis: {
                    splitLine: { show: false }
                },
                // 值域
                dataRange: {
                    color: ['#1178ad', '#72bbd0']
                },
                // 工具箱
                toolbox: {
                    show: false,
                    color: ['#42ccef', '#42ccef', '#42ccef', '#42ccef']
                },
                legend: {
                    itemWidth: 20,
                    itemHeight: 20,
                    x: 'right',
                    y: 'top',
                    padding: [5, 40, 5, 5]
                },
                // 提示框
                tooltip: {
                    backgroundColor: '#ffffff',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: '#dfdfdf',
                    padding: 5,
                    textStyle: {
                        color: '#666',
                        fontSize: 11,
                        fontFamily: 'Helvetica, 微软雅黑, Arial, Verdana, sans-serif'
                    },
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: '#d5d5d5',
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
                // 区域缩放控制器
                dataZoom: {
                    showDetail: false,
                    axis: {
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 10,
                                color: '#999'
                            }
                        },
                        axisTick: {
                            length: 8,
                            lineStyle: {
                                color: '#999',
                                width: 1
                            }
                        }
                    },
                    handleSize: 5,
                    dataBackgroundColor: '#5ecc49',            // 数据背景颜色
                    fillerColor: 'rgba(255,255,255,0)',   // 填充颜色
                    handleColor: '#008acd'    // 手柄颜色
                },
                noDataLoadingOption: {
                    effect: 'noEffect'
                },
                grid: {
                    borderWidth: 0,
                    x: 40,
                    y: 40,
                    x2: 40,
                    y2: 40
                },
                polar: {
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: '#ddd'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.2)', 'rgba(200,200,200,0.2)']
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#ddd'
                        }
                    }
                },

                timeline: {
                    lineStyle: {
                        color: '#008acd'
                    },
                    controlStyle: {
                        normal: { color: '#008acd' },
                        emphasis: { color: '#008acd' }
                    },
                    symbol: 'emptyCircle',
                    symbolSize: 3
                },

                // 柱形图默认参数
                bar: {
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5
                        },
                        emphasis: {
                            barBorderRadius: 5
                        }
                    }
                },

                // 折线图默认参数
                line: {
                    smooth: true,
                    symbol: 'emptyCircle',  // 拐点图形类型
                    symbolSize: 3           // 拐点图形大小
                },

                // K线图默认参数
                k: {
                    itemStyle: {
                        normal: {
                            color: '#d87a80',       // 阳线填充颜色
                            color0: '#2ec7c9',      // 阴线填充颜色
                            lineStyle: {
                                color: '#d87a80',   // 阳线边框颜色
                                color0: '#2ec7c9'   // 阴线边框颜色
                            }
                        }
                    }
                },

                // 散点图默认参数
                scatter: {
                    symbol: 'circle',    // 图形类型
                    symbolSize: 4        // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                },

                // 雷达图默认参数
                radar: {
                    symbol: 'emptyCircle',    // 图形类型
                    symbolSize: 3
                    // symbol: null,         // 拐点图形类型
                    // symbolRotate : null,  // 图形旋转控制
                },

                map: {
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                color: '#ddd'
                            },
                            label: {
                                textStyle: {
                                    color: '#d87a80'
                                }
                            }
                        },
                        emphasis: {                 // 也是选中样式
                            areaStyle: {
                                color: '#fe994e'
                            }
                        }
                    }
                },

                force: {
                    itemStyle: {
                        normal: {
                            linkStyle: {
                                color: '#1e90ff'
                            }
                        }
                    }
                },

                chord: {
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            borderColor: 'rgba(128, 128, 128, 0.5)',
                            chordStyle: {
                                lineStyle: {
                                    color: 'rgba(128, 128, 128, 0.5)'
                                }
                            }
                        },
                        emphasis: {
                            borderWidth: 1,
                            borderColor: 'rgba(128, 128, 128, 0.5)',
                            chordStyle: {
                                lineStyle: {
                                    color: 'rgba(128, 128, 128, 0.5)'
                                }
                            }
                        }
                    }
                },

                gauge: {
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.2, '#2ec7c9'], [0.8, '#5ab1ef'], [1, '#d87a80']],
                            width: 10
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        splitNumber: 10,   // 每份split细分多少段
                        length: 15,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 22,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    pointer: {
                        width: 5
                    }
                },

                textStyle: {
                    fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
                },
                loadingText: window.tiny.language.loadingText
            },
            options: {
                xAxis: {
                    splitLine: { show: false },
                    axisLine: {
                        lineStyle: {
                            color: '#cfcfcf',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisTick: {
                        show: true,
                        length: 5,
                        lineStyle: {
                            color: '#cfcfcf',
                            width: 1
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 11,
                            fontFamily: 'Helvetica, 微软雅黑, Arial, Verdana, sans-serif',
                            fontWeight: 'normal',
                            color: '#666'
                        }
                    }
                },
                yAxis: {
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#cfcfcf'],
                            width: 1,
                            type: 'dotted'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#cfcfcf',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisTick: {
                        show: true,
                        length: 5,
                        lineStyle: {
                            color: '#cfcfcf',
                            width: 1
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 11,
                            fontFamily: 'Helvetica, 微软雅黑, Arial, Verdana, sans-serif',
                            fontWeight: 'normal',
                            color: '#666'
                        }
                    }
                }
            }
        };
    }]);

    module.directive('tiCharts', tiCharts);
    tiCharts.$inject = ['agileUiTheme', '$rootScope'];
    function tiCharts(agileUiTheme, $rootScope) {
        return {
            restrict: 'EA',
            template: '<div></div>',
            replace: true,
            scope: {
                options: '=',
                loading: '=',
                events: '='
            },
            link: linkFn
        };

        function linkFn(scope, element) {
            var echarts = window.echarts;
            if (!echarts || !scope.options) {
                return;
            }

            var userTheme = scope.options.theme;
            var chartInstance = echarts.init(element[0], getTheme(userTheme, agileUiTheme.theme));

            // tiCharts用于保存图表实例
            if (!$rootScope.tiCharts) {
                $rootScope.tiCharts = {};
            }

            // 将当前图表实例存放在$rootScope上，产品可以从任意scope获取该实例
            var id = scope.options.id;
            if (id) {
                $rootScope.tiCharts[id] = chartInstance; // 如果两个图表使用相同的id，则后生成的实例会覆盖前面的实例
            }

            // 浏览器窗口大小改变时，图表控件大小进行重新调整
            var resizeHandler = function () {
                chartInstance.resize();
            };
            $(window).on('resize', resizeHandler);

            // 管生就得管死，当元素删除时，对应的实例也应该销毁
            element.on('$destroy', function () {
                if ($rootScope.tiCharts && $rootScope.tiCharts[id]) {
                    chartInstance.dispose();
                    $rootScope.tiCharts[id] = null;
                }

                $(window).off('resize', resizeHandler);
            });

            scope.$watch('options', function (newValue) {
                // 将默认的AgileUI风格属性配置合并到options中
                var options = mergeOptions(agileUiTheme.options, newValue);
                chartInstance.setOption(options, true); // 设置为true，明确不与之前的options合并，减少不必要操作
            }, true);

            // 只有用户显式将loading对象的show属性设为true，才会显示正在加载的提示文本及遮罩
            // 否则不显示正在加载的提示文本及遮罩
            scope.$watch('loading', function (newValue) {
                if (!newValue) {
                    return;
                }
                if (String(newValue.show) === 'true') {
                    chartInstance.showLoading(newValue);
                } else {
                    chartInstance.hideLoading();
                }
            }, true);

            /**
             * 只有用户显式将events对象的事件配置state设为"off"，才解绑对应的事件, 否则均会绑定传入的事件
             * 用户传入events的配置数据结构(eventName请参考echarts事件绑定中的各类事件名称)：
             *  events: {
                 *  eventName1: {
                 *     state: "on" / "off", 配置事件开启或是关闭
                 *     fn: {function} / {[function1, function2]}
                 * },
                 * eventName2: {
                 *     state: "on" / "off", 配置事件开启或是关闭
                 *     fn: {function} / {[function1, function2]}
                 * }
                 * }
             */
            scope.$watch('events', function (newValue) {
                if (!newValue) {
                    return;
                }
                function handleEvents(eventConfig, eventType) {
                    if (eventConfig.state === 'off') {
                        chartInstance.un(eventType, eventConfig.fn);
                    } else {
                        chartInstance.on(eventType, eventConfig.fn);
                    }
                }

                if (angular.isObject(newValue)) {
                    angular.forEach(newValue, function (eventConfig, eventType) {
                        // 支持对同一个事件类型传入多个处理函数，处理函数以数组形式给出
                        if (angular.isArray(eventConfig)) {
                            angular.forEach(eventConfig, function (itemConfig) {
                                handleEvents(itemConfig, eventType);
                            });
                        } else {
                            handleEvents(eventConfig, eventType);
                        }
                    });
                }
            }, true);

            function mergeOptions(agileOptions, userOptions) {
                var userOptionsClone = angular.copy(userOptions);
                var agileOptionsClone = angular.copy(agileOptions);
                // 对x轴的配置进行合并
                mergeAxisOptions('xAxis', agileOptionsClone, userOptionsClone);
                // 对y轴的配置进行合并
                mergeAxisOptions('yAxis', agileOptionsClone, userOptionsClone);
                return userOptionsClone;
            }

            function mergeAxisOptions(axis, agileOptions, userOptions) {
                var userAxisOpts = userOptions[axis];
                // 参数未传或不合法，不作处理
                if (!angular.isObject(userAxisOpts)) {
                    return;
                }

                if (angular.isArray(userAxisOpts)) {
                    for (var i = 0; i < userAxisOpts.length; i++) {
                        userAxisOpts[i] = angular.extend({}, agileOptions[axis], userAxisOpts[i]);
                    }

                    return;
                }

                // xAxis是对象
                userAxisOpts = angular.extend({}, userAxisOpts, userAxisOpts);
            }

            function getTheme(userThemeVal, agileUiThemeVal) {
                var _userTheme = userThemeVal;
                var _agileUiTheme = agileUiThemeVal;
                if (angular.isObject(_userTheme)) {
                    return angular.extend({}, _agileUiTheme, _userTheme);
                }
                if (angular.isString(_userTheme)) {
                    return _userTheme;
                }

                return _agileUiTheme;
            }
        }
    }
});


define('components/fileupload/fileupload',['components/module'], function (module) {
    var isHTML5 = !!(window.File && window.FormData);

    // 文件点选指令封装
    module.directive('tiFileSelect', tiFileSelect);
    function tiFileSelect() {
        return {
            restrict: 'A',
            link: linkFn
        };

        function linkFn($scope, $element, attrs) {
            $element.on('change', function () {
                var uploadInst = $scope.$eval(attrs.tiFileSelect);// 获取上传文件实例对象
                if (!uploadInst) { // 配置的上传文件实例不存在情况下，不做后续处理
                    return;
                }

                onFileChange(this, uploadInst);// 点选文件后的处理
            });
        }

        /**
         * 选择文件后，根据浏览器差异进行处理
         * @param {Object} 文件this对象
         * @param {Object} 文件选择实例对象
         * @return 无
         */
        function onFileChange(fileInputThis, uploadInst) {
            var files = isHTML5 ? fileInputThis.files : $(fileInputThis);// 获取文件信息
            var addedItems = uploadInst.addToQueue(files);// 文件选择队列
            if (isHTML5) { // H5情况下，重置表单元素值，确保可重复选择文件
                $(fileInputThis).val('');
            } else { // 非H5情况下，确保文件下次可继续选择,分两种情况：1.已选文件有效情况下，,重新替换表单元素，确保文件点选元素不会随表单上传消失；
                   // 2.文件未加入到队列（文件校验失败情况）情况下，重置点选表单，确保文件可重复选择（校验失败可能是文件队列长度不符，所以为确保用户体验，执行该操作）
                var isRemoveInput = (addedItems.length === 0);// 根据文件是否有效情况确定是否移除input
                replaceFileInput($(fileInputThis), uploadInst, isRemoveInput);
            }

            // 自动上传情况下，进行文件上传
            if (uploadInst.options.isAutoUpload !== false && (addedItems.length !== 0)) {
                uploadInst.uploadItems(addedItems);
            }
        }

        /**
         * 替换单个文件选择按钮，确保后续文件选择可继续点选
         * @param {Object} 当前文件选择框
         * @param {Object} 文件选择实例对象
         * @return 无
         */
        function replaceFileInput($fileSel, uploadInst, isRemoveInput) {
            // 清除当前文件输入框选择事件
            $fileSel.off('change');

            // 新增input,并处理当前input
            var $fileSelNew = $fileSel.clone();// 文件元素克隆时,不会复用原有已选文件信息
            if (isRemoveInput) { // 文件选择无效情况下移除input，确保下次可正常选择
                $fileSel.replaceWith($fileSelNew);
            } else {
                $fileSel.hide();// 隐藏已选文件，确保点选框页面呈现的唯一性
                $fileSel.after($fileSelNew);// 点选文件已放入文件队列中,替换新的文件选择按钮，确保下次点选生效
            }

            // 增加当前input事件
            $fileSelNew.on('change', function () {
                onFileChange(this, uploadInst);
            });
        }
    }

    // 文件详情信息显示队列指令封装
    module.directive('tiFileDetail', tiFileDetail);
    function tiFileDetail() {
        return {
            restrict: 'A',
            templateUrl: '/tiny-components/src/components/fileupload/tiFileDetail.html',
            replace: true,
            link: linkFn
        };

        function linkFn($scope, $element, attrs) {
            $scope.$watch(attrs.tiFileDetail, function (value) {
                $scope.uploadInst = value;
            });

            // 设置详情显示默认提示,其中errorInfo信息可通过item.errorInfo配置
            $scope.info = {
                waitInfo: tiny.language.upload_wait_info,
                errorInfo: tiny.language.upload_error_info,
                successInfo: tiny.language.upload_success_info
            };
        }
    }

    // 默认文件上传样式封装
    module.directive('tiFileUpload', ['tiFileUploader', tiFileUpload]);
    function tiFileUpload(uploaderService) {
        return {
            restrict: 'E',
            templateUrl: '/tiny-components/src/components/fileupload/tiFileUpload.html',
            replace: true,
            scope: {
                uploader: '=?',
                styleOptions: '=?'
            },
            link: linkFn
        };

        function linkFn($scope, $element) {
            var uploadInst = $scope.uploadInst = uploaderService.createUploader($scope.uploader);

            // 设置点选按钮和详情显示相关属性
            var styleOptions = $scope.styleOptions || {};
            $scope.title = tiny.utils.browser.chrome ? ' ' : ''; // 禁用文件上传默认tip提示,Chrome下设置title为""时会显示默认提示，所以Chrome下需要设置为" ";而IE下设置为" "会显示文本为空的tip
            $scope.text = styleOptions.btnText || tiny.language.upload_add_file_btn;
            // 设置文件详情是否显示
            var showDetail = styleOptions.showDetail;
            $scope.showDetail = _.isUndefined(showDetail) ? true : showDetail;
            // 根据配置的文件类型过滤属性设置H5下的文件过滤属性
            var filters = uploadInst.options.filters;
            var index = _.findIndex(filters, { name: 'fileType' });
            if (index !== -1) {
                $scope.accept = filters[index].params[0];
            }
            // 根据是否为单文件，设置多选属性，因为multiple属性设置任何值时都生效，因此未用AngularJS方式实现
            if (!uploadInst.isSingleFile) {
                $element.find('.ti-file-input').attr('multiple', true);
            }
        }
    }

    // 上传文件服务，用于统一上传文件时的浏览器差异
    module.factory('$tiUpload', ['$rootScope', tiUpload]);
    function tiUpload($rootScope) {
        function render() { // 视图刷新函数，确保内部变量更新反映到外部视图
            $rootScope.$evalAsync();
        }

        /**
         * 获取文件对象 index值，获取该值用于后续判断item有效性
         * @param {Object} 上传文件item对象
         * @return 无
         */
        function getItemIndex(item) {
            if (item && item.uploader) {
                return _.findIndex(item.uploader.queue, { index: item.index });
            }
            return -1;
        }

        /**
         * 判断文件是否为有效文件
         * @param {Object} 上传文件item对象
         * @return 无
         */
        function isValidFileItem(item) {
            return (getItemIndex(item) !== -1);
        }

        /**
         * 上传单个文件
         * @param {Object} 上传文件item对象
         * @return 无
         */
        function uploadItem(item) {
            // 异常处理
            if (!isValidFileItem(item) || item.isUploading) { // 1.入参不合法,2.正在上传的文件不允许重复上传
                return;
            }

            onBeforeSend(item);// 文件上传前处理
            if (item.isCancel) { // 已取消上传的文件不再上传
                return;
            }
            item.isUploading = true;
            isHTML5 ? uploadXhr(item) : uploadForm(item);// 根据浏览器支持情况选用XHR或form表单技术上传
            render();// 涉及上传状态更新，更新视图
        }

        /**
         * 取消队列中单个正在上传中的文件(只在上传时可取消)
         * @param {Object} 单个文件item对象
         * @return 无
         */
        function cancelItem(item) {
            if (!isValidFileItem(item)) {
                return;
            }

            if (item.isUploading) {
                isHTML5 ? item._xhr.abort() : item._form.abort();
            }
        }

        /**
         * 删除队列中单个上传文件
         * @param {Object} 单个文件item对象
         * @return 无
         */
        function removeItem(item) {
            if (!isValidFileItem(item)) {
                return;
            }

            // 处于正在上传队列中的文件，取消上传
            if (item.isUploading) {
                cancelItem(item);
            }

            // 删除队列中的文件对象及文件对象相关引用
            item.uploader.queue.splice(getItemIndex(item), 1);
            item.destroy();

            // 触发外部定义的删除事件
            onRemove(item);
        }

        /**
         * xhr方式上传文件
         * @param {Object} 上传单个文件item对象
         * @return 无
         */
        function uploadXhr(item) {
            // 上传数据组装
            var formDataObj = new FormData();
            formDataObj.append(item.alias, item._file, item.file.name);// 添加上传文件
            _.forEach(item.formData, function (value, key) { // 添加单个文件的formData对象,加入到上传对象中
                formDataObj.append(key, value);
            });

            // 文件上传信息配置（使用XHR，支持跨域请求）
            var xhr = item._xhr = new XMLHttpRequest();
            xhr.upload.onprogress = function (event) { // 文件进度获取事件
                var lengthComputable = event.lengthComputable;
                var loaded = event.loaded;
                var total = event.total;
                var progress = Math.round(lengthComputable ? loaded * 100 / total : 0);// 读取当前进度信息
                onProgress(item, progress);
            };

            xhr.onload = function () { // 上传完成事件
                var response = xhr.response;
                var status = xhr.status;
                if (isSuccessCode(status)) {
                    onSuccess(item, response, status);
                } else {
                    onError(item, response, status);
                }
                onComplete(item, response, status);
            };

            xhr.onerror = function () { // 上传失败事件
                var response = xhr.response;
                var status = xhr.status;
                onError(item, response, status);
                onComplete(item, response, status);
            };

            xhr.onabort = function () { // 取消回调
                var response = xhr.response;
                var status = xhr.status;
                onCancel(item, response, status);
                onComplete(item, response, status);
            };

            xhr.open(item.method || 'post', item.url, true);
            xhr.send(formDataObj);
            item.isUploading = true;
        }

        /**
         * form表单方式上传文件
         * @param {Object} 上传单个文件item对象
         * @return 无
         */
        function uploadForm(item) {
            // 清除原有form表单
            var $inputSubmit = $(item._input);// 获取该元素对应的上传文件表单信息
            if (item._form) { // // 清除先前对应的form表单对象，确保上传文件表单元素外层不被form包裹
                item._form.replaceWith($inputSubmit);
            }

            // 生成新的form表单，并拼装当前form表单中的内容
            var $form = $('<form style="display: none;"></form>');
            item._form = $form; // 保存当前form
            $inputSubmit.attr('name', item.alias);
            $inputSubmit.after($form);// form在页面显示
            $form.append($inputSubmit);// 在form中添加上传文件元素
            var $formDataDomItem;
            _.forEach(item.formData, function (value, key) { // 添加formData元素
                $formDataDomItem = $('<input type="hidden" name="' + key + '" />');
                $formDataDomItem.val(value);
                $form.append($formDataDomItem);
            });

            // 生成iframe元素，并将form表单和iframe元素结合
            var $iframe = $('<iframe name="tiFileIframe' + $.guid++ + '"></iframe>');// 确保iframe唯一性，保证各文件上传最终能独立返回到相应的iframe
            $form.attr({
                action: item.url,
                method: item.method || 'POST',
                target: $iframe.attr('name'),
                enctype: 'multipart/form-data'
            });
            $form.append($iframe);

            // 表单提交
            $form[0].submit();

            // 设置假进度
            var newProgress = 0;
            var progressInterval = setInterval(function () {
                if (newProgress !== 100) {
                    onProgress(item, newProgress + 2);
                }
            }, 10);

            // 表单完成事件
            $iframe.on('load', function () {
                var response = '';
                var status = 200;

                clearInterval(progressInterval);
                try {
                    response = $iframe[0].contentDocument.body.innerHTML;// 后台正常返回情况获取返回结果
                    onSuccess(item, response, status);
                } catch (e) {
                    response = e;
                    status = 520;// 为方便使用者处理，失败情况下，统一返回520状态码 未知错误
                    onError(item, response, status);
                }

                onComplete(item, response, status);
            });

            // 表单取消方法定义
            $form.abort = function () {
                clearInterval(progressInterval);
                $iframe.off('load');// 去除load事件
                $form.replaceWith($inputSubmit);// 表单元素还原

                var status = 0;
                var response;
                onCancel(item, response, status);
                onComplete(item, response, status);
            };
        }

        function isSuccessCode(status) {
            // 和ajax请求一致，304 代表客户端已经执行了GET，但文件未变化
            return status >= 200 && status < 300 || status === 304;
        }

        /**
         * 上传前处理
         * @param {Object} 上传单个文件item对象
         * @return 无
         */
        function onBeforeSend(item) {
            // 设置当前上传文件的状态信息
            item.isReady = true;
            item.isUploading = false;
            item.isUploaded = false;
            item.isSuccess = false;
            item.isError = false;
            item.isCancel = false;
            item.progress = 0;

            // 触发文件上传的事件回调
            var onBeforeSendItem = item.uploader.onBeforeSendItem;
            _.isFunction(onBeforeSendItem) && onBeforeSendItem(item);

            var onBeforeSendFn = item.onBeforeSend;
            _.isFunction(onBeforeSendFn) && onBeforeSendFn();
        }

        function onProgress(item, progress) {
            var onProgressItem = item.uploader.onProgressItem;
            _.isFunction(onProgressItem) && onProgressItem(item, progress);// 触发uploader的进度信息事件

            var onProgressFn = item.onProgress;
            _.isFunction(onProgressFn) && onProgressFn(progress);// 触发单个文件的progress事件
            item.progress = progress;// 设置单个文件的进度信息

            render();// 进度信息要即时在视图反馈，因此要即时更新
        }

        function onSuccess(item, response, status) {
            // 设置当前上传文件的状态信息
            item.isReady = false;
            item.isUploading = false;
            item.isUploaded = true;
            item.isSuccess = true;
            item.isError = false;
            item.isCancel = false;
            item.progress = 100;

            // 触发事件回调
            var onSuccessItem = item.uploader.onSuccessItem;
            _.isFunction(onSuccessItem) && onSuccessItem(item, response, status);

            var onSuccessFn = item.onSuccess;
            _.isFunction(onSuccessFn) && onSuccessFn(response, status);
        }

        function onError(item, response, status) {
            // 设置当前上传文件的状态信息
            item.isReady = false;
            item.isUploading = false;
            item.isUploaded = true;
            item.isSuccess = false;
            item.isError = true;
            item.isCancel = false;
            item.progress = 0;

            // 触发事件回调
            var onErrorItem = item.uploader.onErrorItem;
            _.isFunction(onErrorItem) && onErrorItem(item, response, status);

            var onErrorFn = item.onError;
            _.isFunction(onErrorFn) && onErrorFn(response, status);
        }

        function onComplete(item, response, status) {
            // 置位状态
            item.isUploading = false;

            // 上传下一个文件
            var readyItemsArr = item.uploader.getReadyItems();
            if (readyItemsArr && (readyItemsArr.length !== 0)) {
                uploadItem(readyItemsArr[0]);
            } else { // 本次上传序列中，所有文件上传完成后回调，因为文件上传是串行上传：在一个文件上传完成后才执行下一个文件的上传操作，所以此处可以确保同一序列最终的上传完成
                var onCompleteAll = item.uploader.onCompleteAll;
                _.isFunction(onCompleteAll) && onCompleteAll(item, response, status);
            }

            // 触发事件回调
            var onCompleteItem = item.uploader.onCompleteItem;
            _.isFunction(onCompleteItem) && onCompleteItem(item, response, status);

            var onCompleteFn = item.onComplete;
            _.isFunction(onCompleteFn) && onCompleteFn(response, status);

            render();// success/error后都会执行该回调，因此视图更新只在此处更新
        }

        function onCancel(item, response, status) {
            item.isReady = false;
            item.isUploading = false;
            item.isUploaded = false;
            item.isSuccess = false;
            item.isError = false;
            item.isCancel = true;
            item.progress = 0;

            // 触发事件回调
            var onCancelItem = item.uploader.onCancelItem;
            _.isFunction(onCancelItem) && onCancelItem(item, response, status);

            var onCancelFn = item.onCancel;
            _.isFunction(onCancelFn) && onCancelFn(response, status);
        }

        function onRemove(item) {
            // 触发文件上传的事件回调
            var onRemoveItem = item.uploader.onRemoveItem;
            _.isFunction(onRemoveItem) && onRemoveItem(item);

            var onRemoveFn = item.onRemove;
            _.isFunction(onRemoveFn) && item.onRemoveFn();
        }

        return {
            uploadItem: uploadItem,
            cancelItem: cancelItem,
            removeItem: removeItem
        };
    }

    // 单个文件对象服务封装，包括文件基本信息统一、文件状态信息、文件基本方法封装
    module.factory('$tiFileItem', ['$tiUpload', tiFileItem]);
    function tiFileItem($tiUpload) {
        /**
         * 创建文件对象，该返回值用作后续文件的上传和文件操作，可作为文件回调参数传递
         * @param fileObject {Object} 文件信息对象
         * @param fileOrInpt {FileList|FileInput} 原始文件对象 H5下为file对象，非H5下为fileInput
         * @param options {Object} 文件上传配置信息
         * @param uploader {Object} 上传文件对应的文件实例
         * @return {Object} 文件对象
         */
        function createFileItem(tifileObject, fileOrInput, options, uploader) {
            function upload() {
                $tiUpload.uploadItem(this);
            }
            function cancel() {
                $tiUpload.cancelItem(this);
            }

            function remove() {
                $tiUpload.removeItem(this);
            }

            function destroy() {
                if (this._input) { // 删除页面残留dom
                    this._input.remove();
                }
                if (this._form) {
                    this._form.remove();
                }
                this._input = null;// 清除引用
                this._form = null;
            }

            // 上传文件对象赋值
            var _file = null;
            var _input = null;
            if (!angular.isElement(fileOrInput)) {
                _file = fileOrInput;
            } else {
                _input = $(fileOrInput);
            }

            return {
                url: options.url || '/', // 后台地址
                file: tifileObject, //
                alias: options.alias || 'tiFile', // 文件name
                _file: _file,
                _input: _input,
                formData: options.formData || {},
                uploader: uploader, // 上传实例对象

                upload: upload,
                cancel: cancel,
                remove: remove,
                destroy: destroy,

                isReady: false,
                isUploading: false,
                isUploaded: false,
                isSuccess: false,
                isError: false
            };
        }

        /**
         * 创建文件对象，统一H5和非H5情况下的文件信息
         * @param file {FileList|FileInput} 原始文件对象 H5为file对象形式，非H5为fileinput对象
         * @return {Object} 类文件对象
         */
        function createFileObject(fileThis) {
            var fileObject = {};
            if (!angular.isElement(fileThis)) {
                var fileName = fileThis.name;
                fileObject = {
                    lastModifiedDate: fileThis.lastModifiedDate,
                    size: fileThis.size, // 读取的文件真实大小值,单位为B
                    sizeWithUnit: formatSize(fileThis.size), // 做单位转换后的文件大小，方便界面详情显示显示
                    name: fileThis.name,
                    type: fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase()// 确保浏览器形式的一致性
                };
            } else {
                var path = fileThis.value;
                // 非H5情况下,浏览器不打开ActiveX,获取不到文件大小,该种情况下文件大小为null
                var fileSize = _.isUndefined(fileThis.size) ? null : fileThis.size;
                fileObject = {
                    lastModifiedDate: null, // 非H5情况下,获取不到该值
                    size: fileSize,
                    sizeWithUnit: _.isNaN(fileSize) ? '' : formatSize(fileSize / 1024), // 做单位转换后的文件大小，方便界面详情显示显示
                    name: path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2),
                    type: path.slice(path.lastIndexOf('.') + 1).toLowerCase()
                };
            }
            return fileObject;
        }


        /**
         * 将文件大小显示标准化：根据文件大小做不同单位的显示，文件大小保留两位小数
         * @param size {Number} 文件大小
         * @return {String} 带单位文件大小
         */
        function formatSize(size) {
            var sizeWithUnit;
            var kbSize = size / 1024;
            if (kbSize < 1) {
                sizeWithUnit = size.toFixed(2) + 'B';
            } else if (kbSize < 1024) {
                sizeWithUnit = kbSize.toFixed(2) + 'KB';
            } else {
                sizeWithUnit = (kbSize / 1024).toFixed(2) + 'MB';
            }
            return sizeWithUnit;
        }

        return {
            createFileItem: createFileItem,
            createFileObject: createFileObject
        };
    }

    // 文件上传服务封装，一个实例对应一个上传文件队列
    module.factory('tiFileUploader', ['$rootScope', '$tiFileItem', '$tiUpload', tiFileUploader]);
    function tiFileUploader($rootScope, $tiFileItem, $tiUpload) {
        // 文件校验规则定义
        var filterRules = {
            maxSize: function (fileObj, params) {
                var size = fileObj.size;
                if (!_.isNumber(size)) { // 文件大小获取不到情况下，忽略该条校验规则
                    return true;
                }
                return !(size > params[0]);
            },
            minSize: function (fileObj, params) {
                var size = fileObj.size;
                if (!_.isNumber(size)) { // 文件大小获取不到情况下，忽略该条校验规则
                    return true;
                }
                return !(size < params[0]);
            },
            fileType: function (fileObj, params) {
                // param参数需使用文件扩展名分开，为了确保各浏览器的一致性，文件类型使用扩展名判断，如果产品需要在选择时限制，请在input上设置accept属性
                var typeArray = params[0].split(',');
                var fileName = fileObj.name;
                var isValidType = false;
                for (var i = 0, len = typeArray.length; i < len; i++) { // 文件扩展名符合任一条校验规则则校验成功
                    if (fileName.match(new RegExp('.(' + typeArray[i] + ')$', 'i')) !== null) {
                        isValidType = true;
                        break;
                    }
                }
                return isValidType;
            },
            maxCount: function (fileObj, params) {
                return !(this.length >= params[0]);
            }
        };

        function createUploader(options) {
            var uploader = {};
            var fileQueue = [];// 文件队列列表，一个实例对应一个文件列表
            var fileIndex = 0;// 文件次序定义，用作文件索引
            var filters = options.filters || [];
            var isSingleFile = isSingleFileFn(filters);// 文件是否为单文件设置
            filters = setFilter(filters);// 文件校验过滤规则

            /**
             * 根据单选或多选限制，设置文件filters
             * @param 用户配置的过滤条件
             * @return {Array} 过滤条件
             */
            function setFilter(rules) {
                if (isSingleFile) { // 单文件情况下去除maxCount设置
                    return _.reject(rules, function (obj) {
                        return (obj.name === 'maxCount');
                    });
                }
                // 多文件情况下 filter不做处理
                return rules;
            }

            /**
             * 根据用户配置的maxCount过滤条件，判断文件是否为单文件上传
             * @param 用户配置的过滤条件
             * @return {Boolean} 是否为单文件上传
             */
            function isSingleFileFn(filtersArr) {
                var maxCountIndex = _.findIndex(filtersArr, { name: 'maxCount' });
                if (maxCountIndex === -1) {
                    return false;
                }
                return (filtersArr[maxCountIndex].params[0] === 1);
            }

            /**
             * 将选择的文件进行有效验证后加入到队列中,外部调用该方法时,认为该队列中的文件和当前uploader的配置项一致
             * @param files {FileList|FileInput} 文件对象
             * @return {Array} 已添加文件数组
             */
            function addToQueue(files) {
                // 循环列表添加文件
                var addedItems = [];// 用于记录本次选择文件列表
                // for循环中临时变量声明
                var fileOrInput;// 原生文件对象，为 file（H5方式）或input（非H5方式）
                var tifileObject;// 文件对象，该对象包含文件的基本信息，统一了浏览器的差异性，会在文件过滤失败回调中作为参数传递给外部
                var invalidArr;// 校验结果数组，数组中定义校验错误规则的name
                var isValid = false;// 是否为有效文件的处理
                var fileItem;// 上传文件对象,该对象中包含文件及状态信息等,在回调中传递
                for (var i = 0, len = files.length; i < len; i++) {
                    fileOrInput = files[i];
                    tifileObject = $tiFileItem.createFileObject(fileOrInput);

                    // 校验单个文件的有效性，并根据校验结果进行文件操作
                    invalidArr = validFile(tifileObject, filters);
                    isValid = !invalidArr.length;// 校验结果返回数组为空时有效

                    // 单文件情况下，需要覆盖原有有效文件
                    if (isSingleFile) {
                        if (invalidArr.length === 0) {
                            fileQueue[0] && fileQueue[0].remove();// 删除先前队列中的文件
                            isValid = true;// 置位校验结果值
                        }
                    }
                    if (isValid) { // 校验成功情况下，将文件加入到上传队列中，并触发
                        fileItem = $tiFileItem.createFileItem(tifileObject, fileOrInput,
                            options, uploader);
                        addedItems.push(fileItem);
                        fileQueue.push(fileItem);
                        fileItem.index = ++fileIndex;// 文件序列数增加，确保整个文件队列中该值唯一
                        if (_.isFunction(options.onAddItemSuccess)) {
                            options.onAddItemSuccess(fileItem);
                        }
                    } else if (_.isFunction(options.onAddItemFailed)) {
                        options.onAddItemFailed(tifileObject, invalidArr);
                    }
                }

                $rootScope.$evalAsync();// 确保更新的文件队列信息刷新到视图
                return addedItems;
            }

            /**
             * 单个文件的有效性校验
             * @param tifileObject {Object} 校验文件对象
             * @param filtersRules {Array} 校验规则
             * @return {Array} 由不符合的规则name组成的数组
             */
            function validFile(tifileObject, filtersRules) {
                // 无效判断
                var filterLen = filtersRules.length;
                if (filterLen === 0) {
                    return [];
                }

                // 逐条规则校验，并返回结果数组
                var invalidRetArr = [];// 校验返回结果数组，该数组中返回的是不符合的校验规则name
                // for循环中临时变量
                var filterConfig;// 单条校验规则配置
                var filterName;// 配置规则名称
                var ruleFn;// 规则函数
                for (var i = 0; i < filterLen; i++) {
                    filterConfig = filtersRules[i];

                    // 根据配置寻找规则函数（规则分为默认规则 和 自定义规则）
                    filterName = filterConfig.name;
                    if (_.has(filterRules, filterName)) { // 先从组件默认定义规则中寻找，存在情况下，直接用默认定义的规则
                        ruleFn = filterRules[filterName];
                    } else {
                        ruleFn = filterConfig.fn;
                    }

                    // 调用规则函数，判断文件有效性
                    if (_.isFunction(ruleFn) &&
                        !ruleFn.call(fileQueue, tifileObject, filterConfig.params)) {
                        invalidRetArr.push(filterName);
                    }
                }
                return invalidRetArr;
            }

             /**
             * 获取未上传文件队列
             * @param 无
             * @return {Array} 未上传文件列表
             */
            function getNotUploadedItems() {
                return fileQueue.filter(function (item) {
                    return !item.isUploaded;
                });
            }

            /**
             * 获取待上传文件，该方法用于文件批量上传时获取上传文件队列
             * @param 无
             * @return {Array} 返回待上传文件，且文件队列返回值是根据文件点选次序排列
             */
            function getReadyItems() {
                return fileQueue.filter(function (item) {
                    return item.isReady && !item.isUploading;
                }).sort(function (item1, item2) {
                    return item1.index - item2.index;
                });
            }

            /**
             * 上传列表中所有未上传文件
             * @param 无
             * @return 无
             */
            function uploadAll() {
                var items = getNotUploadedItems().filter(function (item) {
                    return !item.isUploading;
                });
                uploadItems(items);
            }

            /**
             * 批量上传文件
             * @param {Array} 上传文件items数组
             * @return 无
             */
            function uploadItems(items) {
                var len = items.length;
                if (len === 0) {
                    return;
                }

                // 设置上传文件标志位，用于后续上传完成一个文件后续传其它文件
                for (var i = 0; i < len; i++) {
                    items[i].isReady = true;
                }

                // 开始上传文件
                $tiUpload.uploadItem(items[0]);
            }

            /**
             * 批量取消上传文件
             * @param {Array} 删除文件items数组
             * @return 无
             */
            function cancelItems(items) {
                for (var i = 0, len = items.length; i < len; i++) {
                    $tiUpload.cancelItem(items[i]);
                }
            }

            /**
             * 批量删除文件,只涉及上传队列的文件删除，具体的后台删除还需要产品向后台发送文件删除请求实现
             * @param {Array} 上传文件items数组
             * @return 无
             */
            function removeItems(items) {
                for (var i = 0, len = items.length; i < len; i++) {
                    $tiUpload.removeItem(items[i]);
                }
            }

            uploader = {
                queue: fileQueue, // 上传文件队列,可读属性
                isSingleFile: isSingleFile, // 文件是否有单文件选择限制
                options: options, // 是否自动上传文件
                addToQueue: addToQueue, // 文件添加方法
                getNotUploadedItems: getNotUploadedItems, // 未上传完成文件获取
                getReadyItems: getReadyItems, // 已提交上传，但还未上传文件获取
                uploadAll: uploadAll, // 上传队列中所有还未执行过上传的文件
                uploadItems: uploadItems, // 上传队列中某几项文件
                removeItems: removeItems, // 删除队列中某几项文件
                cancelItems: cancelItems, // 取消队列中某几项文件
                onBeforeSendItem: options.onBeforeSendItem,
                onProgressItem: options.onProgressItem,
                onSuccessItem: options.onSuccessItem,
                onErrorItem: options.onErrorItem,
                onCancelItem: options.onCancelItem,
                onRemoveItem: options.onRemoveItem,
                onCompleteItem: options.onCompleteItem,
                onCompleteAll: options.onCompleteAll
            };

            return uploader;
        }

        return {
            createUploader: createUploader
        };
    }
});

define('components/buttonGroup/btnGroupCommon',["components/module"], function(module){
    // tiTransclude指令封装，用于区分是否有子代内容情况下指令解析：有子代元素时使用其子代元素，无子代元素时使用默认模板元素
    // AngularJS 1.5.9版本已支持该功能，后续版本更新可去掉该部分
    module.directive('tiTransclude', ["$compile", tiTransclude]);
    function tiTransclude($compile){
        var directive = {
            restrict: 'A',
            compile: function(tElement) {
                // 此时生成的tElement仅为模板中html，备份并清空模板子元素，方便后续使用
                var fallbackLinkFn = $compile(tElement.contents());
                tElement.empty();

                return function($scope, $element, $attrs, controller, $transclude) {// link函数
                    $transclude(cloneAttachFn);

                    function cloneAttachFn(clone, transcludedScope) {
                        if ((0 === clone.length) || ((clone.length === 1) && (clone.text().trim() === ""))) {// 本身无子代元素情况下，使用模板中的子代元素
                            fallbackLinkFn($scope, function (clone) {
                                $element.append(clone);
                            });
                            transcludedScope.$destroy();// 基于$scope新建的子scope，无子元素解析的情况下不需要，因此此处销毁
                        } else {// 本身有子代元素的情况下，将其添加至ele之中
                            $element.append(clone);
                        }
                    }
                }
            }
        }
        return directive;
    }

    // 公共指令tiButtonItem封装
    module.directive('tiButtonItem', tiButtonItem);
    function tiButtonItem() {
        var directive = {
            require: ['?^tiBtnRadioGroup','?^tiBtnCheckboxGroup'],
            restrict : 'E',
            transclude : true,
            scope: {
                item: "=?"
            },
            templateUrl: '/tiny-components/src/components/buttonGroup/btnItem.html',
            replace: true,
            link: tiItemlinkFn
        };
        return directive;
    }
    
    function tiItemlinkFn(scope, $element, attrs, ctrl){
        // 根据传入的ctrl进行父标签的判断，获取相应的ctrl
        ctrl = (null === ctrl[0]) ? ctrl[1] : ctrl[0];

        var itemId = scope.item.id;
        // 将该项增加item到数组中
        ctrl.addItem(itemId, scope);
        
        // 点选该项，进行相应的处理
    	$element.on("click", function(){
    		if(scope.item.disable){// 灰化状态下 ，点击操作无效
    			return;
    		}
    		
    	    // 当前选项行为变化
        	ctrl.selectItem(itemId, scope);
        });
        
        // 销毁时去除数组中的item
        $element.on("$destroy", function(){
        	ctrl.removeItem(itemId, scope);
        });
    }
});
/**
 * @description
 * AngularJS version of the button directive.
 * 定义ti-checkbox-group指令,最终返回module名
 */

define('components/buttonGroup/btnCheckboxGroup',["components/module", "components/buttonGroup/btnGroupCommon"],
    function(module, btnGroupCommon) {
        'use strict';
        module.directive('tiBtnCheckboxGroup', tiBtnCheckboxGroup);
        function tiBtnCheckboxGroup() {
        	var directive = {
	            restrict: 'E',
	            replace: true,
	            scope: {
	            	items: "=?",
	            	selectedId: "=?",
	            	activeClass: "=?",
	            	change: "&"
	            },
	            controller: ["$scope", btnGroupCtrl],
	            transclude: true,
	            templateUrl: "/tiny-components/src/components/buttonGroup/btnGroup.html",
	            link: btnGroupLinkFn
	        }
            return directive;
        }
        
        function btnGroupLinkFn(scope, $element, attrs, ctrl){
	        scope.$watch("selectedId", function(newValue, oldValue){// selectedId修改监听,初始设置在addItem中实现
	        	if(!scope.isExternalSet){// 内部代码设置情况不做处理
	        		scope.isExternalSet = true;
	        		return;
	        	}
	        	if(!_.isArray(newValue)){// 非法值设置情况下，设置为空数组，方便后续数组操作
	        		scope.selectedId = [];
	        		scope.isExternalSet = false;
	        		return;
	        	}
	        	if(newValue === oldValue){// 初始设置不在此处实现
	        		return;
	        	}
	        	ctrl.setSelect(newValue, oldValue);
	        }, true)
	    }
    
        function btnGroupCtrl(scope){
            var itemsScope = {};// 所有item项的scope集合
            var activeClass = scope.activeClass || "ti-active";
            scope.isExternalSet = true;// 标志位，用于区分selectedId变化是否为外部用户触发，外部用户触发情况下不做selectId变更的处理
            
            // 根据ti-btn-item的生成增加item项的记录并激活选择项
            this.addItem = function(itemId, childScope){
            	if(_.contains(scope.selectedId, itemId)){// 根据selectedId设置进行状态设置
            		childScope.activeClass = activeClass;
            	} else {
            		childScope.activeClass = "";
            	}
            	itemsScope[itemId] = childScope;
            };
            
            // 根据ti-btn-item的DOM移除去除item项
            this.removeItem = function(itemId, childScope){
                delete itemsScope[itemId];// 从记录scope的数组中删除该项scope
                if(_.contains(scope.selectedId, itemId)) {// 从激活选项数组中删除当前项
                	scope.selectedId = _.without(scope.selectedId, itemId);
                	scope.isExternalSet = false;
                }
            };

            /**
		     * 激活某项时的事件行为处理
		     * @param {String} 激活项id值
		     * @param {Object} 选项的scope对象
		     * @return 无
		     */
            this.selectItem = function(itemId, childScope){
            	scope.isExternalSet = false;
                if(_.contains(scope.selectedId, itemId)){// 先前已选中情况下，去勾选
                	childScope.activeClass = "";
                	scope.selectedId = _.without(scope.selectedId, itemId);
                } else {// 先前未选中情况下，勾选
                    childScope.activeClass = activeClass;
                	scope.selectedId.push(itemId);
                }
                scope.$evalAsync();// 添加此处用于样式生效
                
                // 事件触发
                setTimeout(function(){
                	if(_.isFunction(scope.change())) {
                        scope.change()(childScope.item);
                    }
                }, 0);
            };
            
            /**
		     * 通过外部设置选中项的行为处理
		     * @param {Array} 设置的selectedId数组值
		     * @param {Array} 先前的selectedId数组值
		     * @return 无
		     */
            this.setSelect = function(newSelectedIdArray, oldSelectedIdArray){
            	_.each(oldSelectedIdArray, function(selectedId){// 去勾选先前激活项
            		itemsScope[selectedId] && (itemsScope[selectedId].activeClass = "");
            	});
            	
            	_.each(newSelectedIdArray, function(selectedId){// 选中当前激活项
            		itemsScope[selectedId] && (itemsScope[selectedId].activeClass = activeClass);
            	});
            }
        }
        return module.name;
    }
);
define('components/suggestion/suggestionItem',['components/module'], function (module) {
    'use strict';

    module.directive('tiSuggestionItem', tiSuggestionItem);
    function tiSuggestionItem() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                suggestion: '=?'
            },
            templateUrl: '/tiny-components/src/components/suggestion/suggestionItem.html',
            transclude: true,
            link: link
        };

        function link(scope, $element) {
            addBehavior(scope, $element);
        }

        function addBehavior(scope) {
            scope.mousedownFn = function (suggestion) {
                scope.$emit('item.select', suggestion.id);
            };
        }
    }

    return module.name;
});

define('components/suggestion/suggestion',['components/module', 'components/suggestion/suggestionItem'], function (module) {
    'use strict';

    // 默认值设置
    module.constant('suggestionConfig', {
        panelMaxHeight: '9999px',
        highlight: 'ti-suggestion-highlight',
        suggestions: [],
        major: 'label',
        fields: ['label']
    });

    // 下拉框容器指令定义
    module.directive('tiSuggestion', tiSuggestion);
    tiSuggestion.$inject = ['suggestionConfig', '$timeout'];
    function tiSuggestion(suggestionConfig, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                dominator: '=?',    // 下拉框的控制元素（支持选择器和$对象）
                suggestions: '=?',  // 下拉选项的数据列表，对象数组
                panelMaxHeight: '=?', // 下拉框的最大高度，超出则出滚动条
                highlight: '=?',    // 匹配内容的高亮样式类
                major: '=?',        // 选中后添加到输入框的字段
                fields: '=?',       // 搜索的字段，数据类型为Array
                beforeOpen: '&'     // 下拉框即将展开时的回调，用户可以实现异步数据更新
            },
            templateUrl: '/tiny-components/src/components/suggestion/suggestion.html',
            transclude: true,
            link: link
        };

        function link(scope, $element) {
            if (_.isUndefined(scope.dominator) || $(scope.dominator).length < 1) {
                return;
            }
            init(scope, $element);
            addBehavior(scope, $element);
            addWatcher(scope, $element);
        }

        function init(scope, $element) {
            scope.$dominator = $(scope.dominator);
            $element.appendTo($('body'));

            scope.panelMaxHeight = rejectUndefined(scope.panelMaxHeight,
                                                    suggestionConfig.panelMaxHeight);
            scope.highlight = rejectUndefined(scope.highlight, suggestionConfig.highlight);
            scope.suggestions = rejectUndefined(scope.suggestions, suggestionConfig.suggestions);
            scope.fields = rejectUndefined(scope.fields, suggestionConfig.fields);
            scope.major = rejectUndefined(scope.major, suggestionConfig.major);
            scope.originalData = angular.copy(scope.suggestions); // 原始数据的的备份，与业务侧数据保持一致
            scope.innerChange = false; // 默认属于外部改变
            scope.hasShow = false;
        }

        function rejectUndefined(value, defaultValue) {
            return _.isUndefined(value) ? defaultValue : value;
        }

        function addBehavior(scope, $element) {
            scope.$dominator.on('input.autoComplete', function inputEvtFn(event) {
                scope.$dominator.trigger('valueChange', [event]);
            });
            var utils = window.tiny.utils;
            if (utils.browser.ie && (utils.browser.version < 10)) {
                // IE下不支持剪切引起的改变
                $element.on('cut.autoComplete', function (event) {
                    setTimeout(function () {
                        scope.$dominator.trigger('valueChange', [event]);
                    }, 0);
                });

                $element.on('keyup.autoComplete', function (event) {
                    if (event.keyCode === 8 || event.keyCode === 46) {
                        scope.$dominator.trigger('valueChange', [event]);
                    }
                });
            }

            scope.$dominator.on('valueChange', function contentChangeFn() {
                var newValue = scope.$dominator.val();
                if (newValue === '') {
                    hideSuggestions(scope, $element);
                    return;
                }

                // 若用户为定义beforeOpen回调时，则按照默认处理
                if (!_.isFunction(scope.beforeOpen())) {
                    // 更新ngRepeat所使用的数据
                    var filtered = filterSuggestions(scope, newValue);
                    scope.suggestions = highlight(angular.copy(filtered), newValue, scope);
                    scope.$apply();
                    showSuggestions(scope, $element);
                    return;
                }

                var beforeOpenRet;
                scope.$apply(function () {
                    beforeOpenRet = scope.beforeOpen()(newValue);
                });
                if (!_.isUndefined(beforeOpenRet) && _.isFunction(beforeOpenRet.then)) {
                    // 执行异步的处理
                    beforeOpenRet.then(function () {
                        $timeout(function () {
                            showDelay();
                        }, 0);
                    });
                } else if (_.isUndefined(beforeOpenRet)) {
                    // 非异步，但用户定义了beforeOpen回调，默认用户已在回调中更新数据
                    showDelay();
                }

                // 更新ngRepeat所使用的数据，并显示
                function showDelay() {
                    var matchedItems = filterSuggestions(scope, newValue);
                    scope.suggestions = highlight(angular.copy(matchedItems), newValue, scope);
                    scope.$apply();
                    showSuggestions(scope, $element);
                }
            });

            scope.$dominator.on('blur.autoComplete', function blurFn() {
                hideSuggestions(scope, $element);
            });

            // 某一联想词条被点选后的事件回调
            var selectCallback = function (evt, id) {
                var newValue = getSelectedText(scope, id);
                var oldValue = scope.$dominator.val();
                scope.$dominator.val(newValue);

                // 当内容发生变化时，触发即时校验
                if (newValue !== oldValue) {
                    scope.$dominator[0].tiValue = newValue;
                    scope.$dominator.trigger('tiBlur'); // 需要触发tiBlur，因为赋值滞后于真实的blur事件
                }
            };
            scope.$on('item.select', selectCallback);
            scope.$on('item.select.broadcast', selectCallback);

            // Bug Fixed：若使用原生的滚轮行为，则滚动到下拉面板头部或底部的时候，若继续滚动会触发祖先元素的滚轮事件，导致下拉面板与元素分离
            // 必须要自定义下拉面板的滚轮行为，否则会导致下拉面板与控制元素分离
            $element.on('mousewheel DOMMouseScroll', function (event) {
                event.stopPropagation();
                event.preventDefault();

                // 火狐浏览器需要做兼容性处理
                if (window.tiny.utils.browser.firefox) {
                    $element[0].scrollTop += event.originalEvent.detail > 0 ? 120 : -120;
                } else {
                    $element[0].scrollTop += event.originalEvent.wheelDelta > 0 ? -120 : 120;
                }
            });

            // 上、下、回车、退出等其他快捷键操作的响应
            scope.keydownFn = function (event) {
                if (scope.hasShow === false) {
                    return;
                }

                var keyCode = event.keyCode;
                switch (keyCode) {
                    case 38 : // UP键
                        responseUp(scope, $element, event);
                        break;
                    case 40 : // DOWN键
                        responseDown(scope, $element, event);
                        break;
                    case 27 : // ESC键
                        responseEsc(scope, $element, event);
                        break;
                    case 13 : // ENTER键
                    case 108 : // ENTER键(数字小键盘)
                        responseEnter(scope, $element, event);
                        break;
                    default :
                        break;
                }
            };
            $(document).on('keydown.autoComplete', scope.keydownFn);

            scope.hidePanel = function () {
                hideSuggestions(scope, $element);
            };
            $(window).on('resize.autoComplete', scope.hiddenPanel);
            $(document).on('mousewheel.autoComplete DOMMouseScroll.autoComplete', scope.hiddenPanel);

            // 在支配元素销毁时，销毁下拉框
            scope.$dominator.on('$destroy', function () {
                $element.remove();
                scope.$destroy();
                $(document).off('keydown', scope.keydown);
                $(document).off('mousewheel DOMMouseScroll', scope.hiddenPanel);
            });
        }

        function responseUp(scope, $element, event) {
            event.preventDefault();
            var $allItems = $element.find('.ti-dropdown-option');
            if ($allItems.length < 1) {
                return;
            }

            // 确定下一个选中项
            var $current = $allItems.filter('.ti-dropdown-option-selected');
            var $next;
            var index;
            if ($current.length > 0) {
                index = findIndex($current, $allItems);
            }
            if (index > 0) {
                $next = $($allItems[index - 1]);
            } else {
                $next = $allItems.last();
            }

            // 更新选中样式
            $current.removeClass('ti-dropdown-option-selected');
            $next.addClass('ti-dropdown-option-selected');

            $element.scrollTop($next[0].offsetTop); // 重设滚动条位置
        }

        function responseDown(scope, $element, event) {
            event.preventDefault();
            var $allItems = $element.find('.ti-dropdown-option');
            if ($allItems.length < 1) {
                return;
            }

            // 确定下一个选中项
            var $current = $allItems.filter('.ti-dropdown-option-selected');
            var $next;
            var index;
            if ($current.length > 0) {
                index = findIndex($current, $allItems);
            }
            if (index < $allItems.length - 1) {
                $next = $($allItems[index + 1]);
            } else {
                $next = $allItems.first();
            }

            // 更新选中样式
            $current.removeClass('ti-dropdown-option-selected');
            $next.addClass('ti-dropdown-option-selected');

            $element.scrollTop($next[0].offsetTop); // 重设滚动条位置
        }

        function responseEsc(scope, $element, event) {
            event.preventDefault();
            hideSuggestions(scope, $element);
        }

        function responseEnter(scope, $element, event) {
            event.preventDefault();
            var $selected = $element.find('.ti-dropdown-option-selected');
            if ($selected.length < 1) {
                return;
            }

            // 触发select事件，使用tiAutoComplete指令时，此事件不会对外提供，组件内部在select事件中修改输入框的值
            var itemScope = $selected.scope().suggestion;
            var newValue = getSelectedText(scope, itemScope.id);
            var oldValue = scope.$dominator.val();
            scope.$dominator.val(newValue);
            hideSuggestions(scope, $element);

            // 当内容发生变化时，触发即时校验
            if (newValue !== oldValue) {
                scope.$dominator[0].tiValue = newValue;
                scope.$dominator.trigger('contentChange'); // 回车不会导致失焦，因此触发实时校验
            }
        }

        // 根据id获取即将填充到输入框的选项内容
        function getSelectedText(scope, id) {
            var index = -1;
            index = _.findIndex(scope.originalData, function (suggestion) {
                return suggestion.id === id;
            });

            if (index !== -1) {
                return scope.originalData[index][scope.major];
            }
            return '';
        }

        // 从符合jquery选择器的某一集合中寻找$item所在的序号
        function findIndex($item, $itemCollections) {
            if ($item.length < 1 || $itemCollections.length < 1) {
                return -1;
            }

            for (var i = 0; i < $itemCollections.length; i++) {
                if ($item[0] === $itemCollections[i]) {
                    return i;
                }
            }

            return -1;
        }

        // 根据关键字过滤下拉选项
        function filterSuggestions(scope, keywords) {
            var filtered = [];
            if (keywords === '') {
                filtered = scope.originalData;
                return filtered;
            }

            // 得到根据关键字过滤后的数据集合
            filtered = _.filter(scope.originalData, function (suggestion) {
                return isMatched(suggestion, keywords);
            });

            return filtered;
        }

        // 判断某一数据项是否能成功匹配关键字
        function isMatched(collection, keywords) {
            var matched = _.find(collection, function (item) {
                return item.toLowerCase().indexOf(keywords.toLowerCase()) >= 0;
            });

            return !_.isUndefined(matched);
        }

        // 设置高亮文本
        function highlight(filtered, keywords, scope) {
            scope.innerChange = true; // 属于内部改变
            if (filtered.length < 1) {
                return [];
            }

            for (var i = 0; i < filtered.length; i++) {
                var fields = scope.fields;
                var testStr;
                for (var j = 0; j < fields.length; j++) {
                    testStr = filtered[i][fields[j]];
                    var $matched = $('<span>');
                    $matched.addClass(scope.highlight).html(keywords);
                    var rule = new RegExp(keywords);
                    filtered[i][fields[j]] = testStr.replace(rule, $matched[0].outerHTML);
                }
            }
            return filtered;
        }

        function addWatcher(scope) {
            scope.$watch('suggestions', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                // 内部改变时，不更新originalData
                if (scope.innerChange === true) {
                    scope.innerChange = false;
                    return;
                }

                scope.suggestions = newValue;
                scope.originalData = angular.copy(scope.suggestions);
            }, true);
        }

        // 关闭下拉框
        function hideSuggestions(scope, $element) {
            $element.find('.ti-dropdown-option').removeClass('ti-dropdown-option-selected');
            $element.hide();
            scope.hasShow = false;
        }

        // 显示下拉框
        function showSuggestions(scope, $element) {
            if (scope.suggestions.length < 1) {
                hideSuggestions(scope, $element);
                return;
            }
            setLayout(scope, $element);
            setShowStyle(scope, $element);
            setFirstAsDefault($element);
            scope.hasShow = true;
        }

        // 设置下拉框的行高及最小宽度
        function setLayout(scope, $element) {
            var $dominator = scope.$dominator;
            var dominatorHeight = $dominator.outerHeight();
            $element.css({
                'line-height': dominatorHeight + 'px',
                'min-width': $dominator.outerWidth() - 2 + 'px'
            });
        }

        // 确定元素的显示样式，包括位置、最大高度、向上或向下
        function setShowStyle(scope, $element) {
            var $dominator = scope.$dominator;
            var dominatorHeight = $dominator.outerHeight();
            var position = $dominator.offset();
            var compatibleHeight = document.documentElement.clientHeight
                                    || document.body.clientHeight || window.innerHeight;
            var availableHeightBelow = compatibleHeight + $(document).scrollTop()
                                        - position.top - dominatorHeight;// 输入框下方可用高度
            var availableHeightOver = position.top - $(document).scrollTop();// 输入框上方可用高度
            var actualHeight = getActualHeight($element); // 获取下拉框的真实显示高度
            if (actualHeight <= availableHeightBelow) {
                // 1.下方空间足够，向下展开
                $element.css({
                    bottom: '',
                    display: 'block',
                    top: position.top + dominatorHeight + 'px',
                    left: position.left + 'px',
                    'max-height': parseInt(getMaxHeight(scope.panelMaxHeight, availableHeightBelow), 10) + 'px'
                });
                scope.showStyle = 'down';
            } else if (actualHeight <= availableHeightOver) {
                // 2.下方空间不足，上方空间足够，向上展开
                $element.css({
                    top: '',
                    display: 'block',
                    bottom: compatibleHeight - position.top + 'px',
                    left: position.left + 'px',
                    'max-height': parseInt(getMaxHeight(scope.panelMaxHeight, availableHeightOver), 10) + 'px'
                });
                scope.showStyle = 'up';
            } else if (availableHeightOver > availableHeightBelow) {
                // 3.上下空间都不够，上方空间较大，则向上展开
                $element.css({
                    top: '',
                    display: 'block',
                    bottom: compatibleHeight - position.top - 1 + 'px',
                    left: position.left + 'px',
                    'max-height': parseInt(getMaxHeight(scope.panelMaxHeight, availableHeightOver), 10) + 'px'
                });
                scope.showStyle = 'up';
            } else {
                // 4.上下空间都不够，下方空间较大，则向下展开
                $element.css({
                    bottom: '',
                    display: 'block',
                    top: position.top + dominatorHeight - 1 + 'px',
                    left: position.left + 'px',
                    'max-height': parseInt(getMaxHeight(scope.panelMaxHeight, availableHeightBelow), 10) + 'px'
                });
                scope.showStyle = 'down';
            }
        }

        // 获取下拉框的最大高度
        function getMaxHeight(configHeight, availableHeight) {
            return configHeight < availableHeight ? configHeight : availableHeight;
        }

        // 默认选中第一项
        function setFirstAsDefault($element) {
            $element.find('.ti-dropdown-option').first().addClass('ti-dropdown-option-selected');
        }

        // 获取$element在无最大高度限制时的显示高度
        function getActualHeight($element) {
            // 通过临时DOM计算下拉列表的显示高度
            var $temp = $element.clone();
            $temp.css({
                display: 'block',
                visibility: 'hidden',
                left: '-9999px',
                position: 'absolute'
            }).appendTo($('body'));
            var actualHeight = $temp.outerHeight();// 下拉框的显示高度
            $temp.remove();

            return actualHeight;
        }
    }

    return module.name;
});

define('components/autoComplete/autoComplete',['components/module', 'components/suggestion/suggestion'], function (module) {
    'use strict';

    module.directive('tiAutoComplete', tiAutoComplete);
    tiAutoComplete.$inject = ['$compile', '$timeout'];
    function tiAutoComplete($compile, $timeout) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                configs: '=?tiAutoComplete'
            },
            link: link
        };

        function link(scope, $element) {
            init(scope, $element);
            addBehavior(scope);
        }

        function init(scope, $element) {
            scope.configs.dominator = $element;
            generateDropdown(scope);
        }

        function addBehavior(scope) {
            scope.$on('item.select', function (evt, id) {
                scope.$broadcast('item.select.broadcast', id);
            });
        }

        function generateDropdown(scope) {
            // 生成联想词条的容器
            var template = '<ti-suggestion dominator="configs.dominator"' +
                                            'suggestions="configs.suggestions"' +
                                            'highlight="configs.highlight"' +
                                            'panel-max-height="configs.panelMaxHeight"' +
                                            'major="configs.major"' +
                                            'fields="configs.fields"' +
                                            'before-open="configs.beforeOpen"></ti-suggestion>';
            var linkFn = $compile(template);
            var containerScope = scope.$new();
            var $dropdownContainer = linkFn(containerScope);

            $timeout(function () {
                // 生成每一条联想词条
                var items = '<ti-suggestion-item ng-repeat="suggestion in configs.suggestions" suggestion="suggestion"></ti-suggestion-item>';
                var itemsScope = scope.$new();
                itemsScope.configs = scope.configs;
                var $items = $compile(items)(itemsScope);

                $dropdownContainer.find('ul').append($items); // 合并成最终的下拉框
            }, 0);
        }
    }

    return module.name;
});

/**
 * @description
 * AngularJS version of the button directive.
 * 定义ti-btn-radio-group指令,最终返回module名
 */

define('components/buttonGroup/btnRadioGroup',["components/module", "components/buttonGroup/btnGroupCommon"],
    function(module, btnGroupCommon) {
        'use strict';
        module.directive('tiBtnRadioGroup', tiBtnRadioGroup);
        function tiBtnRadioGroup() {
        	var directive = {
	            restrict: 'E',
	            replace: true,
	            scope: {
	            	items: "=?",
	            	selectedId: "=?",
	            	activeClass: "=?",
	            	change: "&"
	            },
	            controller: ["$scope", btnGroupCtrl],
	            transclude: true,
	            templateUrl: "/tiny-components/src/components/buttonGroup/btnGroup.html",
	            link: btnGroupLinkFn
	        }
            return directive;
        }
        
        function btnGroupLinkFn(scope, $element, attrs, ctrl){
        	scope.$watch("selectedId", function(newValue, oldValue){// selectedId修改监听,初始设置在addItem中实现
                if(!scope.isExternalSet){// 内部代码设置情况不做处理
	        		scope.isExternalSet = true;
	        		return;
	        	}
	        	if(_.isUndefined(newValue)){// 非法值设置情况下，设置为空字符串，方便后续数组操作
	        		scope.selectedId = "";
	        		scope.isExternalSet = false;
	        		return;
	        	}
	        	
	        	if(newValue === oldValue){// 初始设置不在此处实现
	        		return;
	        	}
	        	
	        	ctrl.setSelect(newValue, oldValue);
            })
        }
        
        function btnGroupCtrl(scope){
        	var activeClass = scope.activeClass || "ti-active";
        	var itemsScope = {};
        	scope.isExternalSet = true;// 标志位，用于区分selectedId变化是否为外部用户触发，外部用户触发情况下不做selectId变更的处理

        	// 根据ti-btn-item的生成增加item项的记录并激活相应选项
            this.addItem = function(itemId, childScope){
                // 设置初始的激活状态
                if(itemId === scope.selectedId){
                    childScope.activeClass = activeClass;
                } else {
                	childScope.activeClass = "";
                }
                itemsScope[itemId] = childScope;
            };
            
            // 根据ti-btn-item的DOM移除去除item项
            this.removeItem = function(itemId, childScope){
            	delete itemsScope[itemId];

                if(scope.selectedId === itemId){// 该项为激活项时，移除其激活id的记录
                	scope.selectedId = "";
                	scope.isExternalSet = false;
                }
            };

            /**
		     * 激活某项时的事件行为处理
		     * @param {String} 激活项id值
		     * @param {Object} 选项的scope对象
		     * @return 无
		     */
            this.selectItem = function(itemId, childScope){
            	if(itemId !== scope.selectedId){// 激活状态不做处理，非激活状态做激活处理
            		if("" !== scope.selectedId){// 去勾选先前选项
            			itemsScope[scope.selectedId].activeClass = "";
            		}
            		childScope.activeClass = activeClass;// 激活当前选项
            		scope.$evalAsync();// 用于样式生效
            		scope.selectedId = itemId;
            		
            		scope.isExternalSet = false;
            		
            		// 事件触发
	                setTimeout(function(){
	                	if(_.isFunction(scope.change())) {
	                        scope.change()(childScope.item);
	                    }
	                }, 0);
            	}
            };
            
             /**
		     * 通过外部设置选中项的行为处理
		     * @param {String} 设置的selectedId值
		     * @param {String} 先前的selectedId值
		     * @return 无
		     */
            this.setSelect = function(newSelectedId, oldSelectedId){
            	if(_.has(itemsScope, oldSelectedId)){
            		itemsScope[oldSelectedId].activeClass = "";// 去勾选先前激活项
            	}
            	if(_.has(itemsScope, newSelectedId)){
            		itemsScope[newSelectedId].activeClass = activeClass;// 选中当前激活项
            	}
            };
        }
        return module.name;
    }
);
define('components/alert/alert',['components/module'],
    function (module) {
        'use strict';

        module.directive('tiAlert', tiAlert);
        tiAlert.$inject = ['$timeout'];
        function tiAlert($timeout) {
            return {
                restrict: 'E',
                scope: {
                    type: '=?',
                    typeIcon: '=?',
                    closeIcon: '=?',
                    show: '=?',
                    dismissOnTimeout: '=?'
                },
                templateUrl: '/tiny-components/src/components/alert/alert.html',
                replace: true,
                transclude: true,
                link: linkFn
            };

            function linkFn(scope) {
                init();

                addWatcher();

                function init() {
                    setType();

                    scope.typeIcon = _.isUndefined(scope.typeIcon) ? true : scope.typeIcon;

                    scope.closeIcon = _.isUndefined(scope.closeIcon) ? true : scope.closeIcon;

                    scope.show = _.isUndefined(scope.show) ? true : scope.show;

                    if (scope.show) {
                        setDismissTime();
                    }

                    setCloseFn();
                }

                function addWatcher() {
                    scope.$watch('type', function (newValue, oldVale) {
                        if (newValue === oldVale) {
                            return;
                        }

                        setType();
                    });

                    scope.$watch('show', function (newValue, oldVale) {
                        if (newValue === oldVale) {
                            return;
                        }

                        if (scope.show) {
                            setDismissTime();
                        }
                    });
                }

                function setType() {
                    if (scope.type === 'prompt' || scope.type === 'error' ||
                        scope.type === 'warn' || scope.type === 'success') {
                        return;
                    }

                    scope.type = 'success';
                }

                function setDismissTime() {
                    var dismissOnTimeout = parseInt(scope.dismissOnTimeout, 10);
                    if (_.isNaN(dismissOnTimeout)) {
                        return;
                    }

                    scope.timeoutPromise = $timeout(function () {
                        scope.show = false;
                    }, dismissOnTimeout);
                }

                function setCloseFn() {
                    if (!scope.closeIcon) {
                        return;
                    }

                    scope.closeFn = function () {
                        scope.show = false;

                        if (!_.isUndefined(scope.timeoutPromise)) {
                            $timeout.cancel(scope.timeoutPromise);
                            scope.timeoutPromise = undefined;
                        }
                    };
                }
            }
        }

        return module.name;
    }
);

define('dist/tiny.tpls',["components/module"],function(module) { module.run(["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('/tiny-components/src/components/accordion/accordion-item.html',
    "<div class=ti-accordion-panel><div class=ti-accordion-panel-heading ng-class=\"{'disabled': disable, 'headClass': true}\" ng-click=toggleOpen()><div class=ti-accordion-panel-title><span ti-accordion-transclude=head><span ti-accordion-header ng-class=\"{'ti-text-muted': disable}\">{{head}}</span></span></div></div><div class=ti-accordion-panel-collapse ti-collapse=!open><div class=ti-accordion-panel-body ng-class=bodyClass ng-transclude></div></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/accordion/accordion.html',
    "<div role=tablist class=ti-accordion-group ng-transclude></div>"
  );


  $templateCache.put('/tiny-components/src/components/actionMenu/actionMenu.html',
    "<span><ti-menu ng-if=hasMenu panel-align=menu.panelAlign panel-max-width=menu.panelMaxWidth items=menu.items><span class=ti-menu-toggle-menu ng-bind=menu.toogleName></span></ti-menu></span>"
  );


  $templateCache.put('/tiny-components/src/components/alert/alert.html',
    "<div class=ti-alert-container ng-show=show ng-class=\"{'ti-alert-prompt-container': type === 'prompt',\r" +
    "\n" +
    "             'ti-alert-error-container': type === 'error',\r" +
    "\n" +
    "             'ti-alert-warn-container': type === 'warn',\r" +
    "\n" +
    "             'ti-alert-success-container': type === 'success'}\"><span class=\"ti-alert-type-icon ti-icon\" ng-if=typeIcon ng-class=\"{'ti-icon-info-circle': type === 'prompt',\r" +
    "\n" +
    "                     'ti-icon-exclamation-circle': type === 'error',\r" +
    "\n" +
    "                     'ti-icon-warn': type === 'warn',\r" +
    "\n" +
    "                     'ti-icon-check-circle': type === 'success'}\"></span><div class=ti-alert-label ng-transclude ng-class=\"{'ti-alert-label-with-closeIcon': closeIcon && !typeIcon,\r" +
    "\n" +
    "                    'ti-alert-label-with-typeIcon': !closeIcon && typeIcon,\r" +
    "\n" +
    "                    'ti-alert-only-label': !closeIcon && !typeIcon}\"></div><span class=\"ti-alert-close-icon ti-icon ti-icon-close\" ng-if=closeIcon ng-click=closeFn()></span></div>"
  );


  $templateCache.put('/tiny-components/src/components/buttonGroup/btnGroup.html',
    "<div class=ti-btn-group ti-transclude><ti-button-item item=item ng-repeat=\"item in items\"></ti-button-item></div>"
  );


  $templateCache.put('/tiny-components/src/components/buttonGroup/btnItem.html',
    "<div ti-transclude class=ti-btn-item-container ng-class=activeClass><button class=ti-btn-item ng-bind=item.text ng-disabled=item.disable></button></div>"
  );


  $templateCache.put('/tiny-components/src/components/combobox/Datemodel',
    "<div ng-class=\"{'ti-combobox-container-up': isOpen && (showStyle === 'up'),\r" +
    "\n" +
    "                'ti-combobox-container-down': isOpen && (showStyle === 'down'),\r" +
    "\n" +
    "                'ti-combobox-container-disable': disable,\r" +
    "\n" +
    "                'ti-combobox-container-focused': isFocused}\" class=ti-combobox-container><input class=ti-combobox-text ng-focus=focusFn($event) ng-keydown=keydownFn($event) ng-blur=blurFn($event) ng-model=content spellcheck=false ng-model-options=\"{updateOn: 'default blur', debounce: { 'default': 200, 'blur': 0 }}\" ng-disabled=disable ng-change=changeFn(content)><div class=ti-combobox-dropdown-btn ng-mousedown=menuMousedownFn($event)></div><ti-dropdown options=suggestions show=isOpen selected-id=selectedId show-style=showStyle select=selectFn max-height=panelMaxHeight panel-width=panelWidth dominator=dominator no-data-text=noMatched></ti-dropdown></div>"
  );




  $templateCache.put('/tiny-components/src/components/date/date.html',
    "<div class=ti-date-container><div tabindex={{!disable?0:-1}} class=ti-date-input-container ng-class=\"{'ti-date-input-container-disable' : disable}\" ng-keydown=keydownFn($event) ng-click=showClickFn()><span class=ti-date-show ng-bind=formatValue></span><div class=\"ti-date-icon-container ti-icon ti-icon-calendar\" ng-class=\"{'ti-date-icon-container-disable' : disable}\"></div></div><div ng-if=isOpenPicker tabindex=-1 ng-click=pickerClickFn($event) class=ti-date-picker><ti-date-panel value=datePanel.value min-value=datePanel.minValue max-value=datePanel.maxValue type=datePanel.type is-open-year-month-picker=datePanel.isOpenYearMonthPicker day-click=datePanel.dayClick></ti-date-panel><div class=ti-date-picker-footer ng-if=\"todayBtn || clearBtn || okBtn\"><button class=ti-date-picker-footer-btn type=button ng-if=todayBtn ng-click=todayClickFn() ng-bind=btnLanguage.today ti-button></button><div class=ti-date-picker-footer-right><button class=ti-date-picker-footer-btn type=button ng-if=clearBtn ng-click=clearClickFn() ng-bind=btnLanguage.clear ti-button></button> <button class=ti-date-picker-footer-btn type=button ng-if=okBtn ng-bind=btnLanguage.ok ng-click=okClickFn() ti-button></button></div></div></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/datePanel/datePanel.html',
    "<div><div class=ti-date-picker-header><span class=\"ti-date-picker-prev ti-icon ti-icon-angle-left\" ng-class=\"{'ti-date-state-disabled' : isMinMonth}\" ng-click=preClickFn(isMinMonth) title={{prevText}}></span> <span class=\"ti-date-picker-next ti-icon ti-icon-angle-right\" ng-class=\"{'ti-date-state-disabled' : isMaxMonth}\" ng-click=nextClickFn(isMaxMonth) title={{nextText}}></span><div class=ti-header-year-month-picker ng-class=\"{'ti-header-year-month-picker-expand' : isOpenYearMonthPicker}\"><div class=ti-date-picker-year-month ng-click=monthYearClickFn() ng-class=\"{'ti-date-picker-year-month-expand' : isOpenYearMonthPicker}\"><span ng-bind=picker.year></span> <span ng-bind=picker.month></span> <span ng-class=\"{'ti-date-picker-down-btn' : !isOpenYearMonthPicker,\r" +
    "\n" +
    "                                     'ti-date-picker-up-btn' : isOpenYearMonthPicker}\"></span></div><div ng-show=isOpenYearMonthPicker class=ti-date-picker-years-list><ul class=ti-date-picker-year-li><li ng-repeat=\"year in yearArr\" class=ti-header-year-default-state ng-click=\"yearClickFn(year, $index)\" ng-class=\"{'ti-date-picker-selected-year-month' : yearSelectedIndex === $index}\">{{year}}</li></ul><div class=ti-date-picker-year-month-line></div></div><ul ng-show=isOpenYearMonthPicker class=ti-date-picker-months-list><li ng-repeat=\"month in monthArr\" class=ti-header-month-default-state ng-click=\"monthClickFn(month, $index)\" ng-class=\"{'ti-date-picker-selected-year-month' : monthSelectedIndex === $index}\">{{month}}</li></ul></div></div><table class=ti-date-picker-table><thead><tr><th ng-repeat=\"week in weekArr\" class=ti-date-week title={{weekTitleArr[$index]}}>{{week}}</th></tr></thead><tbody><tr ng-repeat=\"week in dayArr\" ng-init=\"weekIndex = $index\" class=ti-date-day-tr><td ng-repeat=\"day in week\" ng-init=\"dayIndex = $index\"><span ng-class=\"{\r" +
    "\n" +
    "                        'ti-date-current-day' : day.state === 'current',\r" +
    "\n" +
    "                        'ti-dateRange-select-day' : day.state === 'select',\r" +
    "\n" +
    "                        'ti-date-default-day' : day.state === 'default',\r" +
    "\n" +
    "                        'ti-date-disable-day' : day.state === 'disable'}\" ng-click=dayClickFn(day)>{{day.value}}</span></td></tr></tbody></table></div>"
  );


  $templateCache.put('/tiny-components/src/components/dateRange/dateRange.html',
    "<div class=ti-date-range-container><div tabindex={{!disable?0:-1}} class=ti-date-input-container ng-class=\"{'ti-date-input-container-disable' : disable}\" ng-keydown=keydownFn($event) ng-click=showClickFn()><div class=\"ti-date-icon-container ti-icon ti-icon-calendar\" ng-class=\"{'ti-date-icon-container-disable' : disable}\"></div><span class=ti-date-show ng-bind=showValue></span></div><div ng-if=isOpenPicker tabindex=-1 ng-click=pickerClickFn($event) class=ti-date-range-picker><div class=ti-date-range-begin-container><div class=ti-date-range-begin-end-text ng-bind=beginText></div><ti-date-panel value=begin.value min-value=begin.minValue max-value=begin.maxValue is-open-year-month-picker=begin.isOpenYearMonthPicker type=begin.type></ti-date-panel></div><div class=ti-date-range-vertical-line></div><div class=ti-date-range-end-container><div class=ti-date-range-begin-end-text ng-bind=endText></div><ti-date-panel value=end.value min-value=end.minValue is-open-year-month-picker=end.isOpenYearMonthPicker max-value=end.maxValue type=end.type></ti-date-panel></div><div class=ti-date-range-horizontal-line></div><div class=ti-date-range-picker-footer><button class=ti-date-picker-footer-btn type=button ng-click=cancelClickFn() ng-bind=btnLanguage.cancel ti-button></button><div class=ti-date-picker-footer-right><button class=ti-date-picker-footer-btn type=button ng-click=clearClickFn() ng-bind=btnLanguage.clear ti-button></button> <button class=ti-date-picker-footer-btn type=button ng-bind=btnLanguage.ok ng-click=okClickFn() ti-button></button></div></div></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/datetime/datetime.html',
    "<div class=ti-datetime-container><div tabindex={{!disable?0:-1}} class=ti-date-input-container ng-class=\"{'ti-date-input-container-disable' : disable}\" ng-keydown=keydownFn($event) ng-click=showClickFn()><div class=\"ti-date-icon-container ti-icon ti-icon-calendar\" ng-class=\"{'ti-date-icon-container-disable' : disable}\"></div><span class=ti-date-show ng-bind=showValue></span></div><div ng-if=isOpenPicker tabindex=-1 ng-click=pickerClickFn($event) class=ti-date-picker><ti-date-panel value=datePanel.value min-value=datePanel.minValue max-value=datePanel.maxValue is-open-year-month-picker=datePanel.isOpenYearMonthPicker type=datePanel.type day-click=datePanel.dayClick></ti-date-panel><div class=ti-date-picker-footer><ti-time class=ti-date-picker-footer-btn ng-keydown=timeKeydownFn($event) format=format.time value=timeOptions.value min-value=timeOptions.minValue max-value=timeOptions.maxValue change=timeOptions.change blur=timeOptions.blur></ti-time><div class=ti-date-picker-footer-right><button class=ti-date-picker-footer-btn type=button ng-if=clearBtn ng-click=clearClickFn() ng-bind=btnLanguage.clear ti-button></button> <button class=ti-date-picker-footer-btn type=button ng-if=okBtn ng-click=okClickFn() ng-bind=btnLanguage.ok ti-button></button></div></div></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/datetimeRange/datetimeRange.html',
    "<div class=ti-datetime-range-container><div tabindex={{!disable?0:-1}} class=ti-date-input-container ng-class=\"{'ti-date-input-container-disable' : disable}\" ng-keydown=keydownFn($event) ng-click=showClickFn()><span class=ti-date-show ng-bind=showValue></span><div class=\"ti-date-icon-container ti-icon ti-icon-calendar\" ng-class=\"{'ti-date-icon-container-disable' : disable}\"></div></div><div ng-if=isOpenPicker ng-click=pickerClickFn($event) class=ti-date-range-picker><div class=ti-date-range-begin-container><div class=ti-date-range-begin-end-text ng-bind=beginText></div><ti-date-panel value=beginDate.value min-value=beginDate.minValue max-value=beginDate.maxValue is-open-year-month-picker=beginDate.isOpenYearMonthPicker type=beginDate.type></ti-date-panel><span ng-bind=timeText></span><ti-time class=ti-datetime-range-time ng-keydown=timeKeydownFn($event) format=format.time value=beginTime.value min-value=beginTime.minValue blur=beginTime.blur max-value=beginTime.maxValue></ti-time></div><div class=ti-datetime-range-vertical-line></div><div class=ti-date-range-end-container><div class=ti-date-range-begin-end-text ng-bind=endText></div><ti-date-panel value=endDate.value min-value=endDate.minValue max-value=endDate.maxValue is-open-year-month-picker=endDate.isOpenYearMonthPicker type=endDate.type></ti-date-panel><span ng-bind=timeText></span><ti-time class=ti-datetime-range-time ng-keydown=timeKeydownFn($event) format=format.time value=endTime.value blur=endTime.blur min-value=endTime.minValue max-value=endTime.maxValue></ti-time></div><div class=ti-date-range-horizontal-line></div><div class=ti-date-range-picker-footer><button class=ti-date-picker-footer-btn type=button ng-click=cancelClickFn() ng-bind=btnLanguage.cancel ti-button></button><div class=ti-date-picker-footer-right><button class=ti-date-picker-footer-btn type=button ng-click=clearClickFn() ng-bind=btnLanguage.clear ti-button></button> <button class=ti-date-picker-footer-btn type=button ng-bind=btnLanguage.ok ng-click=okClickFn() ng-disabled=isOkDisabled ti-button></button></div></div></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/dropdown/dropdownMulti.html',
    "<div class=ti-dropdown-container ng-class=\"{'ti-dropdown-container-up': showStyle === 'up',\r" +
    "\n" +
    "                'ti-dropdown-container-down': showStyle === 'down'}\" ng-mousedown=panelMousedown($event)><ul ng-if=\"options.length > 0 && options[0].hasOwnProperty('children')\" class=ti-dropdown-group><li ng-repeat-start=\"group in options track by group.id\" ng-bind-html=group.label ng-mousedown=groupMousedown($event) class=ti-dropdown-group-list></li><li ng-repeat-end ng-repeat=\"option in group.children track by option.id\" class=ti-dropdown-option ng-class=\"{'ti-dropdown-option-selected': selectedArray.indexOf(option.id) >= 0}\" ng-mousedown=\"mousedown($event, option)\"><label class=ti-multi-select-checkbox ng-class=\"{' ti-icon ti-icon-checkmark': selectedArray.indexOf(option.id) >= 0}\"></label><span ng-bind-html=option.label></span></li></ul><ul ng-if=\"options.length > 0 && !options[0].hasOwnProperty('children')\"><li ng-repeat-end ng-repeat=\"option in options track by option.id\" class=ti-dropdown-option ng-class=\"{'ti-dropdown-option-selected': selectedArray.indexOf(option.id) >= 0}\" ng-mouseenter=mouseenter($event) ng-mousedown=\"mousedown($event, option)\"><label class=ti-multi-select-checkbox ng-class=\"{' ti-icon ti-icon-checkmark': selectedArray.indexOf(option.id) >= 0}\"></label><span ng-bind-html=option.label></span></li></ul><div class=ti-dropdown-no-data ng-if=\"options.length === 0\" ng-bind-html=noDataText></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/dropdown/dropdownSingle.html',
    "<div class=ti-dropdown-container ng-class=\"{'ti-dropdown-container-up': showStyle === 'up',\r" +
    "\n" +
    "                'ti-dropdown-container-down': showStyle === 'down'}\" ng-mousedown=panelMousedown($event)><ul ng-if=\"options.length > 0 && options[0].hasOwnProperty('children')\" class=ti-dropdown-group><li ng-repeat-start=\"group in options track by group.id\" ng-bind-html=group.label ng-mousedown=groupMousedown($event) class=ti-dropdown-group-list></li><li ng-repeat-end ng-repeat=\"option in group.children track by option.id\" class=ti-dropdown-option ng-class=\"{'ti-dropdown-option-selected': option.id === selectedId}\" ng-mousedown=\"mousedown($event, option)\"><span ng-bind-html=option.label></span></li></ul><ul ng-if=\"options.length > 0 && !options[0].hasOwnProperty('children')\"><li ng-repeat-end ng-repeat=\"option in options track by option.id\" class=ti-dropdown-option ng-class=\"{'ti-dropdown-option-selected': option.id === selectedId}\" ng-mouseenter=mouseenter($event) ng-mousedown=\"mousedown($event, option)\"><span ng-bind-html=option.label></span></li></ul><div class=ti-dropdown-no-data ng-if=\"options.length === 0\" ng-bind-html=noDataText></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/fileupload/tiFileDetail.html',
    "<div class=ti-file-detail-container><div ng-repeat=\"item in uploadInst.queue\" class=ti-file-detail-item><span ng-bind=item.file.name class=ti-file-item-name title={{item.file.name}}></span> <span ng-bind=item.file.sizeWithUnit class=ti-file-item-size title={{item.file.sizeWithUnit}}></span><div class=ti-file-item-info><span ng-if=\"!item.isUploading && !item.isUploaded\" ng-bind=info.wait></span> <span ng-if=item.isUploading ng-bind=\"item.progress+'%'\"></span> <span ng-if=item.isSuccess ng-bind=info.successInfo></span> <span ng-if=item.isError ng-bind=\"item.errorInfo || info.errorInfo\" class=ti-file-item-error title={{(item.errorInfo||info.errorInfo)}}></span></div><div class=ti-file-detail-operate><span ng-if=item.isError ng-click=item.upload() class=\"ti-icon ti-icon-refresh ti-file-detail-operate-icon\"></span> <span ng-click=item.remove() class=\"ti-icon ti-icon-x-thin ti-file-detail-operate-icon\"></span></div><ti-progressbar value=item.progress class=ti-file-progress></ti-progressbar></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/fileupload/tiFileUpload.html',
    "<div class=ti-file-upload-container><div class=\"ti-btn ti-btn-default ti-file-btn\" ng-disabled=styleOptions.disable><input class=ti-file-input type=file ti-file-select=uploadInst title={{title}} accept={{accept}} ng-disabled=styleOptions.disable> <span class=ti-file-text ng-bind=text></span></div><div ti-file-detail=uploadInst ng-if=showDetail></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/formfield/formfield.html',
    "<table style=\"max-width: 100%\" class=ti-form ng-style=verticalAlign><tbody><tr ng-repeat=\"items in groupedItems track by $index\"><td ng-repeat-start=\"item in items track by $index\" class=ti-form-require ng-style=item.verticalAlign><span ng-show=item.required>*</span></td><td ng-if=item.hasLabel item-label-transclude=item class=ti-form-label ng-style=item.verticalAlign></td><td item-content-transclude=item colspan={{item.cntColspan}} class=ti-form-content ng-style=item.verticalAlign></td><td ng-repeat-end ng-style=item.colsGap[$index] ng-style=item.verticalAlign></td></tr><tr ng-repeat=\"item in btnItems track by $index\"><td ng-if=\"item.horizontalAlign !== item.alignOpts.required\" ng-style=item.verticalAlign></td><td ng-if=\"item.horizontalAlign === item.alignOpts.content\" ng-style=item.verticalAlign></td><td field-btn-transclude=item colspan={{item.btnColspan}} ng-style=item.verticalAlign></td></tr><tr id={{::fieldId}} ng-transclude></tr></tbody></table>"
  );


  $templateCache.put('/tiny-components/src/components/ip/ip.html',
    "<input class=ti_input_ip_octet spellcheck=false ng-class=\"{'ti_input_ipv4_octet':version !==6, 'ti_input_ipv6_octet':version ===6, 'ti_input_ip_focus': focused, 'ti_input_ip_disable':disable}\" ng-keydown=keyDown($event) ng-keypress=keyPress($event) ng-paste=paste($event) ng-cut=cut($event) ng-blur=blurHandle($event) ng-focus=focus($event) ng-mousedown=mouseDown($event) ng-mouseup=mouseUp($event) ng-disabled=disable>"
  );


  $templateCache.put('/tiny-components/src/components/leftmenu/leftmenu.html',
    "<div class=ti-leftmenu-container ng-class=\"{'ti-leftmenu-hide' : !isCollapsed}\"><div class=ti-leftmenu-panel-container><ul ng-transclude class=ti-leftmenu-panel></ul></div><div class=\"ti-leftmenu-toggle ti-icon\" ng-if=enableToggle ng-class=\"{'ti-icon-angle-left ti-leftmenu-toggle-show' : isCollapsed,\r" +
    "\n" +
    "                    'ti-icon-angle-right ti-leftmenu-toggle-hide' : !isCollapsed }\" ng-click=toggleClickFn()></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/leftmenu/leftmenuHead.html',
    "<li class=ti-leftmenu-head ng-transclude></li>"
  );


  $templateCache.put('/tiny-components/src/components/leftmenu/leftmenuLevel1.html',
    "<li class=ti-leftmenu-level1><div ng-class=\"{'ti-leftmenu-level1-active-item' : isActived}\" class=ti-leftmenu-level1-item ng-click=clickFn()><span class=\"ti-leftmenu-level1-state-icon ti-icon\" ng-class=\"{'ti-icon-angle-circle-o-down' : showChildren,\r" +
    "\n" +
    "                   'ti-icon-angle-circle-o-right' : !showChildren}\" ng-if=\"item.children && item.children.length\"></span></div><ul ng-transclude ng-show=showChildren></ul></li>"
  );


  $templateCache.put('/tiny-components/src/components/leftmenu/leftmenuLevel2.html',
    "<li class=ti-leftmenu-level2 ng-click=clickFn() ng-class=\"{'ti-leftmenu-level2-active' : isActived}\" ng-transclude></li>"
  );


  $templateCache.put('/tiny-components/src/components/menu/menu.html',
    "<div class=ti-menu-container><div class=ti-menu-toggle ng-click=toggleClickFn() ng-transclude></div><ti-menu-panel show=show toggle-element=toggleElement panel-align=panelAlign panel-max-width=panelMaxWidth items=panelItems></ti-menu-panel></div>"
  );


  $templateCache.put('/tiny-components/src/components/menu/menuPanel.html',
    "<ul class=ti-menu-panel-container ng-show=show><li class=ti-menu-panel-list ng-class=\"{'ti-menu-panel-list-disable' : item.disable}\" ng-click=\"clickFn(item, $event)\" ng-mouseenter=\"mouseenterFn(item, $event)\" ng-mouseleave=\"mouseleaveFn(item, $event)\" ng-repeat=\"item in items\"><span ng-if=hasChildren(item.childrens) ng-class=\"{'ti-menu-list-left-icon' : panelAlign === 'right', 'ti-menu-list-right-icon' : panelAlign === 'left'}\"></span> <span ng-bind-html=item.title></span><div ng-mouseenter=\"mouseenterFn1(item, $event)\" ng-mouseleave=\"mouseleaveFn1(item, $event)\" ti-tooltip=tooltipConfig class=ti-menu-panel-list-tooltip></div><ul ng-show=item.showChildrens class=ti-menu-panel-container><li class=ti-menu-panel-list ng-class=\"{'ti-menu-panel-list-disable' : firstChildren.disable}\" ng-click=\"clickFn(firstChildren, $event)\" ng-mouseenter=\"mouseenterFn(firstChildren, $event)\" ng-mouseleave=mouseleaveFn(firstChildren) ng-repeat=\"firstChildren in item.childrens\"><span ng-if=hasChildren(firstChildren.childrens) ng-class=\"{'ti-menu-list-left-icon' : panelAlign === 'right', 'ti-menu-list-right-icon' : panelAlign === 'left'}\"></span> <span ng-bind-html=firstChildren.title></span><div ng-mouseenter=\"mouseenterFn1(item, $event)\" ng-mouseleave=\"mouseleaveFn1(item, $event)\" ti-tooltip=tooltipConfig class=ti-menu-panel-list-tooltip></div><ul ng-show=firstChildren.showChildrens class=ti-menu-panel-container><li class=ti-menu-panel-list ng-class=\"{'ti-menu-panel-list-disable' : secondChildren.disable}\" ng-click=\"clickFn(secondChildren, $event)\" ng-mouseenter=\"mouseenterFn(secondChildren, $event)\" ng-mouseleave=mouseleaveFn(secondChildren) ng-repeat=\"secondChildren in firstChildren.childrens\"><span ng-bind-html=secondChildren.title></span><div ng-mouseenter=\"mouseenterFn1(item, $event)\" ng-mouseleave=\"mouseleaveFn1(item, $event)\" ti-tooltip=tooltipConfig class=ti-menu-panel-list-tooltip></div></li></ul></li></ul></li></ul>"
  );


  $templateCache.put('/tiny-components/src/components/message/message.html',
    "<div class=ti-modal-header><span>{{tiMsgModel.title}}</span> <span class=ti-close ng-click=tiMsgModel.dismiss()></span></div><div class=ti-msg-body><div class=\"ti-msg-icon ti-icon\" ng-class=\"{ 'ti-icon-check-circle': tiMsgModel.type === 'prompt',\r" +
    "\n" +
    "                    'ti-icon-exclamation-circle': tiMsgModel.type === 'error',\r" +
    "\n" +
    "                    'ti-icon-warn': tiMsgModel.type === 'warn',\r" +
    "\n" +
    "                    'ti-icon-info-circle': tiMsgModel.type === 'confirm'}\"></div><div class=ti-msg-content-wrapper ti-msg-transclude></div></div><div class=ti-modal-footer><button type=button ti-button autofocus ng-if=tiMsgModel.okBtn.show ng-disabled=tiMsgModel.okBtn.disable ng-click=tiMsgModel.okBtn.click()>{{tiMsgModel.okBtn.text}}</button> <button type=button ti-button ng-if=tiMsgModel.cancelBtn.show ng-disabled=tiMsgModel.cancelBtn.disable ng-click=tiMsgModel.cancelBtn.click()>{{tiMsgModel.cancelBtn.text}}</button></div>"
  );


  $templateCache.put('/tiny-components/src/components/modal/backdrop.html',
    "<div class=ti-modal-backdrop ti-modal-animation-class=ti-fade modal-in-class=ti-in ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"></div>"
  );


  $templateCache.put('/tiny-components/src/components/modal/window.html',
    "<div modal-render={{$isRendered}} tabindex=-1 role=dialog class=ti-modal ti-modal-animation-class=ti-fade modal-in-class=ti-in ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\"><div class=ti-modal-dialog><div class=ti-modal-content ti-modal-transclude></div></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/multiSelect/multiSelect.html',
    "<div ng-class=\"{'ti-select-container-up': isOpen && (showStyle === 'up'),\r" +
    "\n" +
    "                'ti-select-container-down': isOpen && (showStyle === 'down'),\r" +
    "\n" +
    "                'ti-select-disable': disable,\r" +
    "\n" +
    "                'ti-select-container-focused': isFocused}\" ng-mousedown=selectMousedownFn($event) ng-focus=focusFn($event) ng-blur=blurFn($event) tabindex={{!disable?0:-1}} class=ti-select-container><div class=ti-select-text ng-class=\"{'ti-select-text-disable': disable}\" ng-bind-html=content ng-mousedown=menuMousedownFn($event)></div><div class=ti-select-dropdown-btn ng-mousedown=menuMousedownFn($event)></div><ti-dropdown options=suggestions show=isOpen selected-array=selectedId show-style=showStyle change=changeFn max-height=panelMaxHeight panel-width=panelWidth dominator=dominator no-data-text=noDataText multi></ti-dropdown></div>"
  );


  $templateCache.put('/tiny-components/src/components/pagination/pagination.html',
    "<div class=ti-pag-container unselectable=on ng-show=\"showPage !== false\"><ti-select options=itemsPerPage.options selected-id=itemsPerPage.selectedId change=itemsPerPage.change ng-style=itemsPerPage.style ng-if=\"itemsPerPage.hide !== true\" class=ti-page-size-option></ti-select><label class=ti-pag-total-items ng-if=\"hideTotalItems !== true\">{{tinyLanguage.page_total_label + totalItems}}</label><div class=ti-pag-pages><a class=ti-pag-prev ng-class=\"{disabled: noPrevious()}\" ng-click=\"!noPrevious() && selectPage(currentPage - 1, $event)\" ng-attr-title={{tinyLanguage.page_prev_title}}><i class=\"ti-icon ti-icon-angle-left\"></i> </a><a ng-repeat=\"page in pages track by $index\" class=ti-pag-page ng-class=\"{active: page.active, ellipse: isEllipse(page)}\" ng-click=\"!isEllipse(page) && selectPage(page.key, $event)\">{{page.key}} </a><a class=ti-pag-next ng-class=\"{disabled: noNext()}\" ng-click=\"!noNext() && selectPage(currentPage + 1, $event)\" ng-attr-title={{tinyLanguage.page_next_title}}><i class=\"ti-icon ti-icon-angle-right\"></i></a></div><div class=ti-pag-goto ng-if=\"hideGotoLink !== true\"><span class=ti-pag-goto-text>{{tinyLanguage.page_goto_label}}</span> <input class=ti-pag-goto-input ti-text ng-model=gotoPage.page ng-blur=gotoPageHandler($event) ng-keydown=enterPageHandler($event)> <a class=ti-pag-goto-icon-container ng-click=gotoPageHandler($event)><div class=ti-pag-goto-icon></div></a></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/progressbar/progressbar.html',
    "<div class=ti-progress><div class=ti-progress-bar ng-style=\"{width: percent + '%'}\" ng-class=progressClass></div><div class=ti-progress-label ng-transclude></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/searchbox/searchbox.html',
    "<div class=ti-searchbox-container ng-class=\"{'ti-searchbox-container-focused': isFocused,\r" +
    "\n" +
    "                'ti-searchbox-container-up': isOpen && (showStyle === 'up'),\r" +
    "\n" +
    "                'ti-searchbox-container-down': isOpen && (showStyle === 'down'),\r" +
    "\n" +
    "                'ti-searchbox-container-disable': disable}\"><input class=ti-searchbox-input ng-class=\"{'ti-searchbox-input-clear-shown': isShowClear}\" ng-disabled=disable ng-focus=focusFn($event) spellcheck=false ng-keydown=inputKeydown($event) ng-blur=blurFn() ng-model=value ng-model-options=\"{updateOn: 'default blur', debounce: { 'default': 100, 'blur': 0 }}\" ng-change=changeFn(value)><div class=\"ti-searchbox-clear ti-icon ti-icon-clear\" ng-show=isShowClear ng-click=clear($event)></div><div class=\"ti-searchbox-search ti-icon ti-icon-search\" ng-mousedown=searchFn(value)></div><ti-dropdown options=dropList show=isOpen selected-id=selectedId show-style=showStyle select=select dominator=dominator></ti-dropdown></div>"
  );


  $templateCache.put('/tiny-components/src/components/select/select.html',
    "<div ng-class=\"{'ti-select-container-up': isOpen && (showStyle === 'up'),\r" +
    "\n" +
    "                'ti-select-container-down': isOpen && (showStyle === 'down'),\r" +
    "\n" +
    "                'ti-select-disable': disable,\r" +
    "\n" +
    "                'ti-select-container-focused': isFocused}\" ng-mousedown=selectMousedownFn($event) ng-focus=focusFn($event) ng-blur=blurFn($event) tabindex={{!disable?0:-1}} class=ti-select-container><div class=ti-select-text ng-class=\"{'ti-select-text-disable': disable}\" ng-bind-html=selectedOption.label ng-mousedown=menuMousedownFn($event)></div><div class=ti-select-dropdown-btn ng-mousedown=menuMousedownFn($event)></div><ti-dropdown options=suggestions show=isOpen selected-id=selectedId show-style=showStyle change=changeFn max-height=panelMaxHeight panel-width=panelWidth dominator=dominator no-data-text=noDataText></ti-dropdown></div>"
  );


  $templateCache.put('/tiny-components/src/components/spinner/spinner.html',
    "<div class=ti-spinner-container ng-class=\"{'ti-spinner-container-focus': focused, 'ti-spinner-container-disabled':disable}\"><input class=ti-spinner-input ng-keydown=keyDown($event) ng-focus=focus($event) ng-blur=blur($event) ng-disabled=disable ng-class=\"{'ti-spinner-input-disabled':disable}\" ng-model=inputValue ng-change=inputChange($event)><div class=ti-spinner-btn><div class=ti-spinner-upbtn ng-mousedown=\"stepNumber($event, 'add')\"><div class=ti-spinner-up-arrow></div></div><div class=ti-spinner-downbtn ng-mousedown=\"stepNumber($event, 'sub')\"><div class=ti-spinner-down-arrow></div></div></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/suggestion/suggestion.html',
    "<div class=\"ti-dropdown-container ti-suggestion-container\" ng-class=\"{'ti-dropdown-container-up': showStyle === 'up',\r" +
    "\n" +
    "                'ti-dropdown-container-down': showStyle === 'down'}\"><ul ng-transclude></ul></div>"
  );


  $templateCache.put('/tiny-components/src/components/suggestion/suggestionItem.html',
    "<li ng-bind-html=suggestion.label ng-mousedown=mousedownFn(suggestion) class=ti-dropdown-option></li>"
  );


  $templateCache.put('/tiny-components/src/components/switch/switch.html',
    "<div role=radio class=ti-switch unselectable=on ng-click=toggleSwitch() ng-class=\"{'disabled': disable ,'ti-switch-off': !state, 'ti-switch-on': state}\"><div class=ti-switch-content><span class=ti-switch-left ng-bind=offLabel></span> <span class=ti-switch-knob>&nbsp</span> <span class=ti-switch-right ng-bind=onLabel></span></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/tab/tab.html',
    "<li ng-class=\"{active: active, disabled: disable}\"><a href ng-click=select() ti-tab-head-html>{{heading}}</a></li>"
  );


  $templateCache.put('/tiny-components/src/components/tab/tabset.html',
    "<div><ul class=ti-tabs ng-transclude></ul><div class=ti-tab-content><div class=ti-tab-pane ng-repeat=\"tab in tabs\" ng-class=\"{active: tab.active}\" ti-tab-body-html=tab></div></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/table/cols-toggle.html',
    "<span class=ti-toggle-cols-container><span class=\"ti-icon ti-icon-config ti-toggle-cols-menu\" ng-click=togglePanel($event)></span><ul class=ti-toggle-cols-dropdown ng-show=showPanel><li ng-repeat=\"column in hiddenColumns\" class=ti-toggle-cols-li ng-if=\"column.show !== undefined\"><label class=ti-toggle-cols-li-content><input type=checkbox ng-model=column.show ti-checkbox=column.title></label></li></ul></span>"
  );


  $templateCache.put('/tiny-components/src/components/table/details-icon.html',
    "<span class=ti-toggle-details><i class=ti-icon ng-class=\"{'ti-icon-arrow-right-thin':!row.showDetails, 'ti-icon-arrow-down-thin': row.showDetails}\"></i></span>"
  );


  $templateCache.put('/tiny-components/src/components/time/time.html',
    "<div class=ti-time-container ng-class=\"{'ti-time-container-disable' : disable}\"><div class=ti-time-editor><input class=ti-time-input ng-disabled=disable maxlength=2 ng-focus=hourFocus($event) ng-blur=hourBlur() ng-keyup=hourKeyup($event) ng-change=hourChange() ng-model=showValue.hour><span class=ti-time-colon ng-if=show.minute>:</span><input class=ti-time-input ng-disabled=disable maxlength=2 ng-if=show.minute ng-focus=minuteFocus($event) ng-blur=minuteBlur() ng-keyup=minuteKeyup($event) ng-change=minuteChange() ng-model=showValue.minute><span class=ti-time-colon ng-if=show.second>:</span><input class=ti-time-input ng-disabled=disable maxlength=2 ng-if=show.second ng-focus=secondFocus($event) ng-blur=secondBlur() ng-keyup=secondKeyup($event) ng-change=secondChange() ng-model=showValue.second><input class=ti-time-input ng-disabled=disable maxlength=2 ng-if=show.ampm ng-focus=ampmFocus($event) ng-blur=ampmBlur() ng-keyup=ampmKeyup($event) ng-change=ampmChange() ng-model=showValue.ampm></div><div class=ti_time_btn><div id=time_button_up ng-mousedown=btnUpMousedown() class=ti-time-upbtn><div class=ti-time-up-arrow></div></div><div id=time_button_down ng-mousedown=btnDownMousedown() class=ti-time-downbtn><div class=ti-time-down-arrow></div></div></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/wizard/wizard-agile.html',
    "<div class=ti-agile-wizard><ul class=ti-wizard-label><li ng-repeat=\"step in stepsArr\" class={{step.state}}><span>{{step.label}}</span></li></ul><div class=ti-wizard-bar><div class=ti-wizard-indicator ng-style=\"{width: percent + '%'}\"></div></div></div>"
  );


  $templateCache.put('/tiny-components/src/components/wizard/wizard-cloud.html',
    "<ul class=ti-cloud-wizard><li ng-repeat=\"step in stepsArr\" class={{step.state}}><span class=ti-wizard-label>{{step.label}}</span><div class=ti-wizard-icon></div></li></ul>"
  );
 }]);return module; });
require(['components/accordion/accordion',
    'components/button/button',
    'components/checkbox/checkbox',
    'components/collapse/collapse',
    'components/formfield/formfield',
    'components/radio/radio',
    'components/select/select',
    'components/multiSelect/multiSelect',
    'components/combobox/combobox',
    'components/searchbox/searchbox',
    'components/dropdown/dropdown',
    'components/tab/tab',
    'components/text/text',
    'components/textarea/textarea',
    'components/time/time',
    'components/tip/tip',
    'components/modal/modal',
    'components/message/message',
    'components/pagination/pagination',
    'components/datePanel/datePanel',
    'components/date/date',
    'components/datetime/datetime',
    'components/dateRange/dateRange',
    'components/datetimeRange/datetimeRange',
    'components/menu/menu',
    'components/checkboxGroup/checkGroup',
    'components/checkboxGroup/checkItem',
    'components/table/colspan',
    'components/table/colsResizable',
    'components/table/colsToggle',
    'components/table/filter',
    'components/table/sort',
    'components/table/details',
    'components/table/table',
    'components/table/tableConfig',
    'components/unifyValid/unifyValid',
    'components/switch/switch',
    'components/progressbar/progressbar',
    'components/wizard/wizard',
    'components/ip/ip',
    'components/spinner/spinner',
    'components/actionMenu/actionMenu',
    'components/leftmenu/leftmenu',
    'components/charts/charts',
    'components/fileupload/fileupload',
    'components/buttonGroup/btnCheckboxGroup',
    'components/autoComplete/autoComplete',
    'components/buttonGroup/btnRadioGroup',
    'components/alert/alert',
    'dist/tiny.tpls'], function () {
});

define("tiny.all.build", function(){});


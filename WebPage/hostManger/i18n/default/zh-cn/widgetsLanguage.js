define([], function() {
    var widgetsLanguage = {
        locale : {
            NUMBER_FORMATS : {
                DECIMAL_SEP : ".",
                GROUP_SEP : ","
            }
        },

        noDataLineplot : "当前没有数据",
        "gotoTitleText" : "跳转",                  // Pagination控件：goto跳转按钮的title属性值
        "nextTitleText" : "下一页",                 // Pagination控件：下一页按钮的title属性值
        "prevTitleText" : "上一页",                 // Pagination控件：上一页按钮的title属性值
        "totRecText"    : "总条数: ",               // Pagination控件：显示消息总条数部分前边的文本
        promptTitle : "提示",
        errorTitle : "错误",
        warnTitle : "警告",
        confirmTitle : "确认",
        systemNoticeTitle : "系统通知",
        detailMsgHeading : "详细信息",
        okBtnTitile : "确定",
        cancelBtnTitile : "取消",
        yesBtnTitile : "是",
        noBtnTitile : "否",
        uploadFile:"上传文件：",
        beginUpload:"开始上传",
        uploading:"正在上传...",
        uploadSuccess:"上传成功！",
        del:"删除",
        uploadFail:"上传失败!",
        uploaded:"已上传",
        moreTitle : "更多",
        operate : "操作",
        //File Upload
        selectFileTip:"选择文件",
        title : '文件上传:',  
        upload : "上传",  
        selectFile : "添加文件",
        totalProgress : "上传总进度:", 
        uploadProgress : "已上传",
        totalSize : "总文件大小",
        uploadWaiting:"(等待上传中...)",
        reload : "重新上传",
        multiFailed : "(上传失败，服务器链接错误！)",
        regional : { 
            okBtn : "确认",
            clearBtn: "清除",
            closeText: '关闭',
            prevText: '上月',
            nextText: '下月',
            currentText: '今天',
            monthNamesShort: ['1','2','3','4','5','6',
                              '7','8','9','10','11','12'],
            monthNames: ['01月','02月','03月','04月','05月','06月',
                         '07月','08月','09月','10月','11月','12月'],
            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
            dayNamesMin: ['日','一','二','三','四','五','六'],
            weekHeader: '周',
            dateFormat: 'yy-mm-dd',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: true,
            yearSuffix: '年',
            monthSuffix : '月'
        },
        selectAll: '全部',
        comboboxTip: '输入关键字...',
        comboboxNoSearch: '无匹配结果',
        //table language
        emptyTable: "暂无表格数据",
        colVisRestore: "恢复初始列",
        colVisText: "显示/隐藏列",
        unifyValid : {
            "required" : "输入不能为空。",
            "maxSize" : "输入长度不能超过{0}。",
            "minSize" : "输入长度不能小于{0}。",
            "rangeSize" : "输入长度范围为{0}到{1}。",
            "maxValue" : "输入值不能超过{0}。",
            "minValue" : "输入值不能小于{0}。",
            "rangeValue" : "输入值必须在{0}到{1}之间。",
            "regularCheck" : "输入值无效。",
            "notContains" : "输入值不能含有非法字符{0}。",
            "checkScriptInfo" : "输入值不能含有script标签。",
            "equal" : "输入值必须等于{0}。",
            "port" : "端口号为0到65535的整数。",
            "path" : "输入值未满足路径格式要求。",
            "email" : "输入email地址无效。",
            "date" : "输入日期无效。",
            "url" : "输入URL无效。",
            "integer" : "输入值不是有效整数。",
            "number" : "输入值不是有效数字。",
            "floatCheck" : "输入值不是有效浮点数。",
            "digits" : "输入值不是有效数字字符。",
            "ipv4" : "输入值不是有效IPV4地址。",
            "ipv6" : "输入值不是有效IPV6地址。",
            "phoneNumber": {
                invalidNumber: "输入值不是有效电话号码。",
                tooShort: "输入电话号码位数太少",
                tooLong: "输入电话号码位数太多"
            }
        },
        preview: "预览",
        previousBtnTitle: "上一步",
        nextBtnTitle: "下一步",
        finishBtnTitle: "完成",
        on: "开启",
        off: "关闭",
        // cirqueChart
        noDataCirque : "当前没有数据"
   };
    return widgetsLanguage;
})
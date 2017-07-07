define([
    "tiny-widgets/Message",
    "language/inventory"
], function (Message,i18n) {
    "use strict";
    function messageShow(){
    }
    var warnmsg = '';
    messageShow.prototype.showMessage = function(message,type){
        var width = getWidth(message);
        var options = {
            type : type,
            width:width+"px",
            content : message,
            height:"auto",
            beforeClose:function(){
            },
            buttons:[

                {
                    key: "btnOK",
                    label: i18n.oim_inventory_button_ok,
                    focused: false,
                    handler: function (event) {
                        warnmsg.destroy();
                    }
                }
            ]
        };
        warnmsg = new Message(options);
        warnmsg.show();
    };
    messageShow.prototype.showChoice = function(message,type,fn){
        var width = getWidth(message);
        var options = {
            type : type,
            width:width+"px",
            content : message,
            height:"auto",
            beforeClose:function(){
            },
            buttons:[
                {
                    key: "btnOK",
                    label: i18n.oim_inventory_button_ok,
                    focused: false,
                    handler:fn
                },
                {
                    key:"btnCancel",
                    label : i18n.oim_inventory_button_cancel,
                    focused : true,
                    handler : function(event) {
                        warnmsg.destroy();
                    }
                }
            ]
        };
        warnmsg = new Message(options);
        warnmsg.show();
    };

    messageShow.prototype.closeWin = function(){
        warnmsg.destroy();
    };

    function getWidth(message){
        var str = '';
        var width = 0;
        var obj = /.*[\u4e00-\u9fa5]+.*$/;
        for(var i = 0;i<message.length;i++){
            str = message.substring(i,i+1);
            if(obj.test(str)) {
                width +=20
            }else{
                width +=11
            }
        }
        if(width>500){
            width = 500;
        }
        if(width<111){
            width = 111;
        }
        return width+75;
    }

    var module = angular.module('basic.config');
    module.tinyService('messageShow', messageShow);
});
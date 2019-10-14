sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageStrip",
    "openUIProject/model/translateModel",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageStrip, translateModel, JSONModel) {
    "use strict";

    return Controller.extend("openUIProject.controller.Main", {
        onInit(oEvent) {
			this.notifications = {
				"warning": false,
				"error": false,
				"success": false
			};
			this.notificationModel = new JSONModel();
			this.notificationModel.setData(this.notifications);
			this.getView().setModel(this.notificationModel, "notifications");
            this.tModel = new translateModel();
            this.getView().setModel(this.tModel.addTranslateRequestModel, 'add_translate');
            this.getView().setModel(this.tModel.getTranslateModel, 'get_translate');
        },

        async getTranslate() {
            if (this.getView().getModel('get_translate').oData.word.length === 0) {
                this._showMessage( this.getView().getModel('i18n').getProperty('fill_all_fields'), "warning");
                return;
            }
            let data = await this.tModel.getTranslate().catch(err => {
                this._showMessage( err, "error");
            });
            if (data.length === 0) {
                this._showMessage(  this.getView().getModel('i18n').getProperty('translate_not_founded'), "warning");
            }else{
                this.getView().getModel('get_translate').refresh();
            }

        },

        async addTranslate() {
            if(!this.getView().getModel('add_translate').oData.word.length
                || !this.getView().getModel('add_translate').oData.translate.length){
                this._showMessage(  this.getView().getModel('i18n').getProperty('fill_all_fields'), "warning");
                return;
            }
            let data = await this.tModel.addTranslate().catch(err => {
                this._showMessage( err, "error");
            });
            if(data === true){
                this._showMessage(  this.getView().getModel('i18n').getProperty('translate_added'), "success");
            }
        },

        _showMessage(msg, type){
        	const message = this.byId(type+"_message");
			this.getView().getModel('notifications').oData[type] = true;
			this.getView().getModel('notifications').refresh();
			message.setText(msg);
            setTimeout(() => { message.close(); }, 2000);
        },

        onTabClose($event){
            $event.preventDefault();
        }
    });
});

sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "openUIProject/libs/request"
], function (JSONModel) {
    "use strict";

    return class Translator {
        constructor(){
            this.getTranslateModel =  new JSONModel({
                word: "test",
                translate: ""
            });
             this.addTranslateRequestModel =  new JSONModel({
                word: "",
                translate: ""
            });
        }

        getTranslate(){
            return new Promise((success, reject) => {
				request('http://127.0.0.1:3000/translate/' + this.getTranslateModel.oData.word, {}, (err, data) => {
                    if(err){
                        reject(err.message);
                    }else{
                        const response = JSON.parse(data.body);
                        if(!response.status){
                            reject(response.message);
                        }else{
                            this.getTranslateModel.oData.translate = response.data;
                            success(this.getTranslateModel.oData.translate);
                        }
                    }
                });
            });

        }

        addTranslate(){
            return new Promise((success, reject) => {
                const options = {
                    method: 'post',
                    body: this.addTranslateRequestModel.oData,
                    json: true,
                    url: 'http://127.0.0.1:3000/translate/'
                };
				request(options, (err, data) => {
                    if(err){
                        reject(err.message);
                    }else{
                        const response = data.body;
                        if(!response.status){
                            reject(response.message);
                        }else{
                            success(true);
                        }
                    }
                });
            });
        }
    }
});

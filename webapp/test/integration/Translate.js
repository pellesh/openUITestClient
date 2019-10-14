sap.ui.define([
	"sap/ui/test/Opa5",
	"openUIProject/test/integration/arrangements/Startup",
	"openUIProject/test/integration/TranslateActions"
], function(Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		pollingInterval: 1
	});

});

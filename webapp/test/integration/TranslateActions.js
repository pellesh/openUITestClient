/* global QUnit */

sap.ui.define([
	"sap/ui/test/opaQunit",
	"openUIProject/test/integration/pages/App"
], function (opaTest) {
	"use strict";

	QUnit.module("Translate");

	var to_add_word = 'test_' + Math.round(Math.random()*100000000);
	var to_add_translate = 'test_' + Math.round(Math.random()*100000000);


	opaTest("add the translate", function (Given, When, Then) {
		Given.iStartMyApp();
		When.onTheAppPage.iPressAddTab()
			.and.iEnterTextWordForAddTranslate(to_add_word)
			.and.iEnterTextTranslateForAddTranslate(to_add_translate)
			.and.iPressAddBtn();
		Then.onTheAppPage.iShouldSeeSuccessText();

		Then.iTeardownMyApp();
	});

	opaTest("get the translate", function (Given, When, Then) {

		Given.iStartMyApp();
		When.onTheAppPage.iPressGetTab()
			.iEnterTextForGetTranslate(to_add_word)
			.and.iPressSearchBtn();
		Then.onTheAppPage.iShouldSeeText(to_add_translate);
		Then.iTeardownMyApp();
	});


});

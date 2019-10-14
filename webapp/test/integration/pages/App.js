sap.ui.require([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/AggregationLengthEquals",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/Ancestor",

	"sap/ui/test/actions/EnterText",
	"sap/ui/test/actions/Press"
], function (Opa5, AggregationLengthEquals, PropertyStrictEquals, Properties, Ancestor, EnterText, Press) {
	"use strict";

	var sViewName = "openUIProject.view.Main";
	var add_word = "add_word";
	var add_translate = "add_translate";
	var add_translate_btn = "add_translate_btn";
	var get_word = "get_word";
	var get_translate = "get_translate";
	var get_translate_btn = "get_translate_btn";

	Opa5.createPageObjects({
		onTheAppPage: {

			actions: {
				iPressAddTab: function() {
					return this.waitFor({
						id: "myTabContainer",
						viewName: sViewName,
						success: function (oSelect) {
							Opa5.assert.ok(sViewName, "Found tabcontainer.");
							this.waitFor({
								controlType: "sap.m.TabContainerItem",
								visible: false,
								matchers: [
									new Ancestor(oSelect),
									new Properties({ name: "add_translate" })
								],
								success: function (oControl) {
									oSelect.setSelectedItem(oControl[0]);
									Opa5.assert.ok(true, "tab was successfully selected.");
								},
								errorMessage: "Cannot select item from tab"
							});
						},
						errorMessage: "Add tab can't be pressed"
					});
				},

				iPressGetTab: function() {

					return this.waitFor({
						id: "myTabContainer",
						viewName: sViewName,
						success: function (oSelect) {
							Opa5.assert.ok(sViewName, "Found tabcontainer.");
							this.waitFor({
								controlType: "sap.m.TabContainerItem",
								visible: false,
								matchers: [
									new Ancestor(oSelect),
									new Properties({ name: "search_translate" })
								],
								success: function (oControl) {
									oSelect.setSelectedItem(oControl[0]);
									Opa5.assert.ok(true, "tab was successfully selected.");
								},
								errorMessage: "Cannot select item from tab"
							});
						},
						errorMessage: "Add tab can't be pressed"
					});


				},

				iPressSearchBtn: function() {
					return this.waitFor({
						id: get_translate_btn,
						viewName: sViewName,
						actions: [new Press()],
						errorMessage: "Get tab can't be pressed"
					});
				},

				iPressAddBtn: function() {
					return this.waitFor({
						id: add_translate_btn,
						viewName: sViewName,
						actions: [new Press()],
						errorMessage: "Get tab can't be pressed"
					});
				},


				iEnterTextForGetTranslate: function(text) {
					return this.waitFor({
						id: get_word,
						viewName: sViewName,
						actions: [new EnterText({ text: text })],
						errorMessage: "The text cannot be entered"
					});
				},

				iEnterTextWordForAddTranslate: function(text) {
					return this.waitFor({
						id: add_word,
						viewName: sViewName,
						actions: [new EnterText({ text: text })],
						errorMessage: "The text cannot be entered"
					});
				},

				iEnterTextTranslateForAddTranslate: function(text) {
					return this.waitFor({
						id: add_translate,
						viewName: sViewName,
						actions: [new EnterText({ text: text })],
						errorMessage: "The text cannot be entered"
					});
				},

			},

			assertions: {
				iShouldSeeText: function() {
					return this.waitFor({
						id: get_translate,
						viewName: sViewName,
						matchers: [function(oControl) {
							console.log(oControl);
							return oControl.getValue().length > 0;
						}],
						success: function() {
							Opa5.assert.ok(true, 'translate received');
						},
						errorMessage: "Could not find text at view " + sViewName
					});
				},
				iShouldSeeSuccessText: function() {
					return this.waitFor({
						controlType: "sap.m.MessageStrip",
						viewName: sViewName,
						success: function (oMessage) {
							Opa5.assert.ok(sViewName, "Found messages.");
							this.waitFor({
								controlType: "sap.m.MessageStrip",
								visible: false,
								matchers:  [function(oControl) {
									return oControl.getType() === 'Success';
								}],
								success: function() {
									Opa5.assert.ok(true, 'translate added');
								},
								errorMessage: "Cannot find message"
							});
						},
						errorMessage: "Could not find message at view " + sViewName
					});
				}


			}

		}
	});

});

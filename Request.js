sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/odata/v2/ODataModel"
],	function(Object, Model) {
	"use strict";

	return Object.extend("zbc45CControl.webapp.assets.js.Request", {	
						
		constructor : function(sServicePath, sServiceSyncMode, bServiceCountMode, fnErrorCallback) {	
			
			this.sServicePath 	    = sServicePath;
			this._sServiceSyncMode  = sServiceSyncMode;
			this._bServiceCountMode = bServiceCountMode;
			this._fnErrorCallback   = fnErrorCallback;
			
		},
				
		// = Instantiate ODataModel
		XMLHttpModel : function(fnCallback) {
		
			var _oModel = new Model({ 
				serviceUrl 			: this.sServicePath,
				synchronizationMode : this._sServiceSyncMode,
				
			});		
			
			_oModel.setDefaultCountMode(this._bServiceCountMode);		
			_oModel.attachRequestCompleted({ 
				fnCallback : fnCallback 
			
			}, this._XMLHttpSuccess, this);			
			
			_oModel.attachRequestFailed({}, this._XMLHttpFailed, this);	
			_oModel.attachMetadataFailed({}, this._XMLHttpMeta, this);
			
			return _oModel;
		
		},			
				
		// = Query
		XMLHttpRQuery : function(oModel) {		
			
			var _oModel = this.XMLHttpModel();
			oModel.setModel(_oModel);
			
		},		
		
		// = Read 
		XMLHttpRRead : function(sEntity, fnCallback, aFilters ) {	

			this.XMLHttpModel(fnCallback).read(sEntity, {
				filters : aFilters
				
			});
			
		},

		// = Create
		XMLHttpRCreate : function(sEntity, oInput, fnCallback) {
			
			this.XMLHttpModel(fnCallback).create(sEntity, oInput);	
			
		},

		// = Delete
		XMLHttpRDelete : function(sEntity, fnCallback) {
			
			this.XMLHttpModel(fnCallback).remove(sEntity);				
			
		},

		// = Update
		XMLHttpRUpdate : function(sEntity, oInput, fnCallback) {

			this.XMLHttpModel(fnCallback).update(sEntity, oInput);
			
		},		

		// = CRUD successfully
		_XMLHttpSuccess : function(oData, oResponse) {
				
			if (oResponse.fnCallback) {
				if (oResponse.fnCallback.constructor === Function) {
					
					oResponse.fnCallback(oData);
					
				}				
			}
			
		},
		
		// = CRUD failed
		_XMLHttpFailed : function(oError) {
			
			if (this._fnErrorCallback) {
				if (this._fnErrorCallback.constructor === Function) {
					
					this._fnErrorCallback(oError);
					
				}
			}
			
		},
		
		// = CRUD failed (loading metadata)
		_XMLHttpMetadata : function(oError) {

			this._XMLHttpFailed(oError);			
			
		}
		
	});
	
});

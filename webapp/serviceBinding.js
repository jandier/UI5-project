function initModel() {
	var sUrl = "/SAPGateway/sap/opu/odata/SAP/YXM_128_ODATA_FLEXSO_CDS_SRV_01/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}
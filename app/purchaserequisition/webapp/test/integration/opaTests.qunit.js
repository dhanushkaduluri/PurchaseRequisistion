sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ust/pr/purchaserequisition/test/integration/FirstJourney',
		'ust/pr/purchaserequisition/test/integration/pages/PurchaseRequisitionList',
		'ust/pr/purchaserequisition/test/integration/pages/PurchaseRequisitionObjectPage',
		'ust/pr/purchaserequisition/test/integration/pages/PurchaseRequisitionItemObjectPage'
    ],
    function(JourneyRunner, opaJourney, PurchaseRequisitionList, PurchaseRequisitionObjectPage, PurchaseRequisitionItemObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ust/pr/purchaserequisition') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePurchaseRequisitionList: PurchaseRequisitionList,
					onThePurchaseRequisitionObjectPage: PurchaseRequisitionObjectPage,
					onThePurchaseRequisitionItemObjectPage: PurchaseRequisitionItemObjectPage
                }
            },
            opaJourney.run
        );
    }
);
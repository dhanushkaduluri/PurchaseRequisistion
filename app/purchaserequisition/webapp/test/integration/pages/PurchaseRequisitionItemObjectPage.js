sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'ust.pr.purchaserequisition',
            componentId: 'PurchaseRequisitionItemObjectPage',
            contextPath: '/PurchaseRequisition/Items'
        },
        CustomPageDefinitions
    );
});
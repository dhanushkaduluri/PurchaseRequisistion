using PurchaseReq as service from '../../srv/catelogService';
annotate service.PurchaseRequisition with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'PRNumber',
                Value : PRNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PRType',
                Value : PRType,
            },
            {
                $Type : 'UI.DataField',
                Value : OverallStatus,
                Criticality:ColorCode
            },
            {
                $Type : 'UI.DataField',
                Label : 'RequestDescription',
                Value : RequestDescription,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CreatedBy',
                Value : CreatedBy,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ChangedBy',
                Value : ChangedBy,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CreatedAt',
                Value : CreatedAt,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ChangedAt',
                Value : ChangedAt,
            },
            {
                $Type : 'UI.DataField',
                Label : 'RequestNo',
                Value : RequestNo,
            }
            
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Purchase Requisition Items',
            ID : 'PurchaseRequisitionItems',
            Target : 'Items/@UI.LineItem#PurchaseRequisitionItems',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'PRNumber',
            Value : PRNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'PRType',
            Value : PRType,
        },
        {
            $Type : 'UI.DataField',
            Value : OverallStatus,
            Criticality:ColorCode

        },
        {
            $Type : 'UI.DataField',
            Label : 'RequestDescription',
            Value : RequestDescription,
        },
        {
            $Type : 'UI.DataField',
            Label : 'CreatedBy',
            Value : CreatedBy,
        },
    ],
);

annotate service.PurchaseRequisitionItem with @(
    UI.LineItem #PurchaseRequisitionItems : [
        {
            $Type : 'UI.DataField',
            Label : 'Item Number',
            Value : PRItemNumber
        },
        {
            $Type : 'UI.DataField',
            Label : 'Material',
            Value : Material
        },
        {
            $Type : 'UI.DataField',
            Label : 'Material Description',
            Value : MaterialDescription
        },
        {
            $Type : 'UI.DataField',
            Label : 'Purchase Organization',
            Value : PurOrg
        },
        {
            $Type : 'UI.DataField',
            Label : 'Plant',
            Value : Plant
        },
        {
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : Status
        },
        {
            $Type : 'UI.DataField',
            Label : 'Created By',
            Value : CreatedBy
        },
        {
            $Type : 'UI.DataField',
            Label : 'Changed By',
            Value : ChangedBy
        },
        {
            $Type : 'UI.DataField',
            Label : 'Created At',
            Value : CreatedAt
        },
        {
            $Type : 'UI.DataField',
            Label : 'Changed At',
            Value : ChangedAt
        },
        {
            $Type : 'UI.DataField',
            Label : 'Quantity',
            Value : Quantity
        },
        {
            $Type : 'UI.DataField',
            Label : 'Unit of Measure',
            Value : UoM
        },
        {
            $Type : 'UI.DataField',
            Label : 'Price',
            Value : Price
        },
        {
            $Type : 'UI.DataField',
            Label : 'Request Item Number',
            Value : ReqItemNo
        }
    ],

    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ItemDetailsFacet',
            Label : 'Item Details',
            Target : '@UI.LineItem#PurchaseRequisitionItems'
        }
    ]
);

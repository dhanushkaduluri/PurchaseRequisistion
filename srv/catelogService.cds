using { 
    ust.db as db 
} from '../db/schema';

service PurchaseReq {
    
    // Expose the Purchase Requisition Header entity
    @odata.draft.enabled : true
    entity PurchaseRequisition as projection on db.PurchaseRequisition{
        *,
        case StatusCode
            when 'A' then 'inApproval'
            when 'O' then 'Ordered'
            when 'R' then 'Rejected'
            when 'S' then 'SAved'
            end as OverallStatus : String(10),
        case StatusCode
            when 'A' then 2
            when 'O' then 3
            when 'R' then 1
            when 'S' then 2
            end as ColorCode : Integer

    };
    
    // Expose the Purchase Requisition Item entity
    // @odata.draft.enabled : true
    entity PurchaseRequisitionItem as projection on db.PurchaseRequisitionItem{
        *,
        case Status
            when 'A' then 'inApproval'
            when 'O' then 'Ordered'
            when 'R' then 'Rejected'
            when 'S' then 'SAved'
            end as OverallStatus : String(10),
        case Status
            when 'A' then 1
            when 'O' then 1
            when 'R' then 2
            when 'S' then 3
            end as ColorCode : Integer
    };

    // Expose the Media File entity
    
    entity MediaFile as projection on db.MediaFile;
}

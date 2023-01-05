export class InvitiesRequestsModel {

    public invites: InviteModel[];

    public requests: InviteModel[];
}

export class InviteModel {
    public created_at: string;
    public frime_id: number;
    public guest_id: number;
    public id: number;
    public status: string;
    public updated_at: string;
    public isaccepted: boolean;
}
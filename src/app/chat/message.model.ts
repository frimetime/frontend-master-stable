import { StringFormat } from '@angular/fire/storage/interfaces';

export class MessageModel {
    content: string;
    created_at: Date;
    frime_id: string;
    guest_id: string;
    id: number;
    likes: string[];
    status: string;
    updated_at: Date;
    user: string;
    userimage: string;
    parent_id: number;
    isleft: boolean;
    replies: MessageModel[];
};
import { ShellModel } from '../../shell/data-store';

export class UserListModel extends ShellModel {
    users: Array<{
        id: number,
        image: string,
        username: string,
        description: string}> = [
        {
            id: 0,
            image: '',
            username: '',
            description: ''
        },
        {
            id: 1,
            image: '',
            username: '',
            description: ''
        },
        {
            id: 2,
            image: '',
            username: '',
            description: ''
        },
        {
            id: 3,
            image: '',
            username: '',
            description: ''
        }
    ];

    constructor() {
        super();
    }
}

import { ShellModel } from '../../shell/data-store';
export class UserProfileModel extends ShellModel {
    constructor() {
        super();
        this.friends = [
            {
                image: '',
                name: ''
            },
            {
                image: '',
                name: ''
            },
            {
                image: '',
                name: ''
            },
            {
                image: '',
                name: ''
            }
        ];
        this.photos = [
            '',
            '',
            '',
            ''
        ];
    }
}
//# sourceMappingURL=user-profile.model.js.map
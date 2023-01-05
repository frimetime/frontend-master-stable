import { TestBed } from '@angular/core/testing';
import { EnvService } from './env.service';
describe('EnvService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(EnvService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=env.service.spec.js.map
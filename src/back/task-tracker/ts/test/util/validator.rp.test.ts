import * as testing from 'bun:test';

import { Result } from '@src/util/validator.rp';

testing.describe("Testing for src/util/validator.rp.ts", () => {

    testing.test("Expect Success return values correctly instanced", () => {
        const valueT = `Testing for correct`
        const correct = Result.Success(valueT);
        testing.expect( typeof correct.value ).toBe(typeof valueT);
        testing.expect( correct.value ).toBe( valueT );
        testing.expect( correct.isSucces ).toBeTruthy();
        testing.expect( correct.Error ).toBeNull();
    });

    testing.test("Expect Failure values correctly instanced", () => {
        const valueT = `Testing for failure`
        const failure = Result.Failure(valueT);
        testing.expect( typeof failure.value ).toBe('undefined');
        testing.expect( failure.value ).toBeUndefined();
        testing.expect( failure.isSucces ).toBeFalsy();
        testing.expect( failure.Error ).toBe(valueT);
        testing.expect( typeof failure.Error ).toBe(typeof valueT);
    });
});
import * as testing from 'bun:test';

import { Formatter } from '@util/date.formatter';

testing.describe("src/util/date.formatter.ts", () => {

    testing.test("Expect formatDate is not a instance of Formatter, beside a static method", () =>{
        testing.expect( typeof Formatter.formatDate  ).toBe('function');
        
        const formatterInstance = new Formatter();
        //@ts-ignore
        testing.expect( formatterInstance.formatDate ).toBeUndefined();
    });

    testing.test("Expect formatDate return strict a string", () => {
        testing.expect( typeof Formatter.formatDate( new Date() )).toBe('string');
    });
});
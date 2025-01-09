import { getStringinfo, StringUtils, toUpperCase } from "../app/Utils";


describe('Utils test suite', ()=>{
    it('Follow AAA technique ', ()=>{
        //Arrange
        const sut = toUpperCase;
        const expected = 'HELLO';

        //Act
        const actual = sut('hello');

        //assert
        expect(actual).toBe(expected);
    })



    //Jest Hooks
    describe('beforeEach hook',()=>{
        let ins:StringUtils;
        beforeEach(()=>{
            ins = new StringUtils();
        })
        test('To uppercase with beforeEach',()=>{
            const actual = ins.toUpperCase('hello');
            expect(actual).toBe('HELLO');
        })

        //Test of errors
        test('Should throw error on invalid string',()=>{
            function expectError(){
                const actual = ins.toUpperCase('');
            }
            expect(expectError).toThrow('String is required');
        })

        //another way to test of error
        test('Should throw error on invalid string "Another way"',()=>{
            expect(()=>{
                ins.toUpperCase('');
            }).toThrow('String is required');
        })

        // test of error with try and catch  This is not recommened as if it goes to try block, we will not get error
        test('Should throw error on invalid string "try and catch way"',(done)=>{
            try {
                ins.toUpperCase('');
                done('Should have thrown error');
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error).toHaveProperty('message','String is required');
                done();
            }
        })
    })

    //Parameterized tests
    describe('To uppercase examples',()=>{
        it.each([
                {input:'abc',expected:'ABC'},
                {input:'xyz',expected:'XYZ'}
            ])
            ('$input in uppercase should be $expected',({input,expected})=>{
            const actual = toUpperCase(input);
            expect(actual).toBe(expected);
        })
    })

    describe('Should return info for a valid string', () =>{
        test('Should return lower Case',()=>{
            const actual = getStringinfo('My-String');
            expect(actual.lowercase).toBe('my-string');
        })
        test('Should return upper Case',()=>{
            const actual = getStringinfo('My-String');
            expect(actual.uppercase).toBe('MY-STRING');
        })
        test('Should return length of String',()=>{
            const actual = getStringinfo('My-String');
            expect(actual.characters.length).toBe(9);
            // expect(actual.characters).toHaveLength(9);
        })
        test('Should return extra info value validation',()=>{
            const actual = getStringinfo('My-String');
            expect(actual.extraInfo).toEqual({});
        })
        test('Should return letter validation in a string',()=>{
            const actual = getStringinfo('My-String');
            expect(actual.characters).toContain<string>('M');
        })
        test('Should return each letter check of string',()=>{
            const actual = getStringinfo('My-String');
            expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g'])
            expect(actual.characters).toEqual(expect.arrayContaining(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']))
        })
        test('Should return extra info validations',()=>{
            const actual = getStringinfo('My-String');
            expect(actual.extraInfo).toBeDefined();
            // expect(actual.extraInfo).toBeTruthy();
            // expect(actual.extraInfo).not.toBe(undefined);
            // expect(actual.extraInfo).not.toBeUndefined();
        })
    })
})
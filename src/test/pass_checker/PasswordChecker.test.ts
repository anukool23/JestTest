import { PasswordChecker, PasswordErrors } from "../../app/pass_checker/PasswordChecker";


describe(`Password Checker Test Suite`,()=>{
    let sut: PasswordChecker;

    beforeEach(()=>{ 
        sut = new PasswordChecker();
    })

    it('Password with less than 8 char is invalid',()=>{
        const actual = sut.checkPassword('1237Ab');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.SHORT);
    })

    it('Password with more than or equal to 8 char is valid',()=>{
        const actual = sut.checkPassword('123456789Ab');
        expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
    })

    it('Password with no upper case is invalid',()=>{
        const actual = sut.checkPassword('anukool123');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NO_UPPERCASE);
    })
    it('Password with  upper case is valid',()=>{
        const actual = sut.checkPassword('Anukool123');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPERCASE);
    })
    it('Password with no lower case is invalid',()=>{
        const actual = sut.checkPassword('ANUKOOL123');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NO_LOWERCASE);
    })
    it('Password with lower case is valid',()=>{
        const actual = sut.checkPassword('Aanukool123');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPERCASE)
    })
    it('Complex password check',()=>{
        const actual = sut.checkPassword('Anukool123');
        expect(actual.reasons).toHaveLength(0);
        expect(actual.valid).toBe(true);
    })
    it('Password with no number is invalid',()=>{
        const actual = sut.checkAdminPassword('Anukooldvdvv');
        expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
        expect(actual.valid).toBe(false);
    })
    it('Password with number is valid',()=>{
        const actual = sut.checkAdminPassword('Anukooldv678');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
    })
})
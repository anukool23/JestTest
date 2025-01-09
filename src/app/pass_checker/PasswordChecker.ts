export enum PasswordErrors{
    SHORT = 'Password is too short',
    NO_LOWERCASE = 'Password must have at least one lowercase letter',
    NO_UPPERCASE = 'Password must have at least one uppercase letter',
    NO_NUMBER = 'Password must have at least one number'
}

export interface CheckResult {
    valid:boolean;
    reasons:PasswordErrors[];
}

export class PasswordChecker{
    
    public checkPassword(password:string):CheckResult{
        const reasons:PasswordErrors[] = [];
        this.checkForLength(password,reasons);
        this.checkForLowercase(password,reasons);
        this.checkForUppercase(password,reasons);
        return {
            valid:reasons.length >0 ? false : true,
            reasons:reasons
        };
    }

public checkAdminPassword(password:string):CheckResult{
    const basicCheck = this.checkPassword(password);
    this.checkForNumber(password, basicCheck.reasons)
    return {
        valid:basicCheck.reasons.length >0 ? false : true,
        reasons:basicCheck.reasons
    }
}

private checkForNumber(password: string, reasons:PasswordErrors[]) {
    const hasNumber = /\d/;
    if(!hasNumber.test(password)){
        reasons.push(PasswordErrors.NO_NUMBER);
    }
}
private checkForLength(password: string, reasons:PasswordErrors[]) {
    if(password.length < 8){
        reasons.push(PasswordErrors.SHORT);
    }
    
}
private checkForUppercase(password: string, reasons:PasswordErrors[]) {
    if(password == password.toLowerCase()){
        reasons.push(PasswordErrors.NO_UPPERCASE);
    }
}
private checkForLowercase(password: string, reasons:PasswordErrors[]) {
    if(password == password.toUpperCase()){
        reasons.push(PasswordErrors.NO_LOWERCASE);
    }
}
}
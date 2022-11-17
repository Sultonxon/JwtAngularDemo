
export class LoginResponseDto{
    constructor(public token?: string, 
        public isAuthSuccessful?: boolean,
         public errorMessage?: Array<string>) { }
}

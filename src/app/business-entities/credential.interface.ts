export interface ICredential {
    user: string;
    pass: string;
}

export interface IToken {
    token: string;
}

interface IName {
    first: string;
    last: string;
}

export interface IUser {
    id: number;
    fakeToken: string;
    name: IName;
    login: string;
    password: string;
}

import { User } from "./user.model";

export class Auth {
    token?: string;
    user?: User;
}

export enum ERROR_RESPONSE {
    INVALID_PASSWORD_OR_EMAIL = 'INVALID_PASSWORD_OR_EMAIL'
}

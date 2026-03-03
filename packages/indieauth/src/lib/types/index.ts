export interface AuthUser {
   id: string;
   authenticated: boolean;
}

export interface AuthLocals {
   user: AuthUser | null;
}

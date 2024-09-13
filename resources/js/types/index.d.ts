export interface User {
    id: string;
    firstname: string;
    lastname: string;
    phone_number: string;
    role: string;
    email: string;
    email_verified_at?: string;
}

export interface Course {
    id: string;
    user_id: string;
    name: string;
    type: string;
    code: string;
    image: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

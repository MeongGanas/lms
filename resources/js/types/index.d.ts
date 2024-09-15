export interface User {
    id: string;
    firstname: string;
    lastname: string;
    phone_number: string;
    role: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

export interface Course {
    id: string;
    teacher_id: string;
    title: string;
    enrollment_key: string;
    image?: string;
    enrollments: Enrollment[];
    created_at: string;
    updated_at: string;
}

export interface Enrollment {
    id: string;
    student_id: string;
    course_id: string;
    course: Course;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

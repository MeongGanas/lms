export interface User {
    id: string;
    firstname: string;
    lastname: string;
    role: string;
    email: string;
    profile_image: string;
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
    teacher: User;
    created_at: string;
    updated_at: string;
}

export interface StudentCourse {
    id: string;
    teacher_id: string;
    title: string;
    enrollment_key: string;
    image?: string;
    topics: Topic[];
    teacher: User;
    progress_percentage: number;
    created_at: string;
    updated_at: string;
}

export interface RecentCourse {
    id: string;
    user_id: string;
    course_id: string;
    course: Course;
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

export interface Topic {
    id: string;
    course_id: string;
    title: string;
    order: number;
    created_at: string;
    updated_at: string;
}

export interface Content {
    id: string;
    topic_id: string;
    course_id: string;
    title: string;
    type: string;
    file_path?: string;
    external_url?: string;
    description?: string;
    deadline?: string;
    order: number;
    progresses: Progresses[];
    created_at: string;
    updated_at: string;
}

export interface Progresses {
    id: string;
    content_id: string;
    student_id: string;
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

export interface Breadcrumbs {
    title: string;
    url: string;
}

export interface Participants {
    id: string;
    user_id: string;
    course_id: string;
    student: User;
    created_at: string;
    updated_at: string;
}

export interface Comment {
    id: string;
    parent_id: string;
    user_id: string;
    content_id: string;
    body: string;
    user: User;
    created_at: string;
    updated_at: string;
}

export interface TempFile {
    id: string;
    user_id: string;
    content_id: string;
    file_name: string;
    file_path: string;
    created_at: string;
    updated_at: string;
}

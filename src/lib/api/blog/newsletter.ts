import { ISODate } from "@/lib/types/isodate";

export interface IBlogNewsletterSubscriber {
    id: string;
    email: string;

    subscribedAt: ISODate;
    isActive: boolean;
}

export interface IBlogNewsletterSubscriberCreate {
    email: string;
}

export interface IBlogNewsletterSubscriberUpdate {
    isActive?: boolean;
}

export interface IBlogNewsletterSubscriberListResponse {
    subscribers: IBlogNewsletterSubscriber[];
    total: number;
    page: number;
    pageSize: number;
}

export interface IBlogNewsletterStats {
    totalSubscribers: number;
    activeSubscribers: number;
    unsubscribed: number;
}

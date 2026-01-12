export type TCreateEvent = {
    id:number
    title: string;
    slug: string;
    overview: string;
    startDate: string;
    endDate: string;
    venue: string;
    location: string;
    mode: string;
    organizer: string;
    description: string;
    tags: string[] ;
    bookedSeats?: number;
    image?: TImgItem ,
    attachments?: TImgItem[],
    agenda: TAgendaItem[] ;
    _id?: string;
    createdAt?:string;
    updatedAt?: string;
    __v?: string;
};

export type TImgItem = {
    url: string | Blob | File | null
    id?: string  | null ,
    action?: string
}
export type TAgendaItem = {
    sessionSpeaker: string;
    sessionTitle: string;
    startTime: string;
    endTime: string;
  };
export type TBookEvent = {
  eventId: number;
  email :  string;
}  
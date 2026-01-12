export type TEventTable = {
    id: number;
    key: number;
    title: string;
    location: string;
    date: React.ReactNode;
    "booked seats": number ;
    options : React.ReactNode;
}
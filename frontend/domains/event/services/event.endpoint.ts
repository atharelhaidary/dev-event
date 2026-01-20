export const EVENT_ENDPOINTS = {
    create : () => `api/create_new_event`,
    update : () => `api/update_specific_event`,
    getAll : ( page?: number, pageSize?:number, queryParams?: string) => 
              !queryParams ? `api/fetch_all_events?page=${page}&limit=${pageSize}`: `api/fetch_all_events?page=${page}&limit=${pageSize}&${queryParams}`,
    delete : () =>`api/delete_specific_event/by_id`,
    getOne : ( id: number ) => `api/show_specific_event/${id}`,
    book   : () =>`api/book_event`
}
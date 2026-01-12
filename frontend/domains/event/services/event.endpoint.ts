export const EVENT_ENDPOINTS = {
    create : () => `api/create_new_event`,
    update : () => `api/update_specific_event`,
    getAll : () => `api/fetch_all_events`,
    delete : () =>`api/delete_specific_event/by_id`,
    getOne : ( id: number ) => `api/show_specific_event/${id}`,
    book   : () =>`api/book_event`
}
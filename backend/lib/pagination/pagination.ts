import {  Model } from "mongoose";
import { TPaginationParams, TPaginationResponse, TPaginationOptions } from "./pagination.type";
import { buildMeta, buildBaseQuery, buildPagination, buildEmptyPagination } from './index'
export  async function pagination <T> (model :Model<T>,params: TPaginationParams = {}, options: TPaginationOptions<T>= {}) :Promise<TPaginationResponse<T>> {
    try{
        const { page = 1, limit = 5, search = '', sortBy = 'createdAt', sortOrder = 'desc', ...filters } = params;
        const { searchFields = [], selectFields = '', populate = '', lean = true } = options;
        const validPage = Math.max(1, page) ;
        const validLimit = Math.min(Math.max(1, limit), 100); 
        const hasSearch = !!search && search.trim() !== '';
        const hasFilters =  Object.keys(filters).length > 0;
        const baseQuery = buildBaseQuery(search, searchFields,filters )
        const meta = buildMeta(search, searchFields,filters , sortBy, sortOrder) 
        const emptyPagination = buildEmptyPagination(validPage, validLimit) 
        
        const totalItems = await model.countDocuments(baseQuery)
        const totalPages = Math.ceil(totalItems / validLimit);
        if (totalItems === 0 && (hasSearch || hasFilters)) {
            return {
                status:200,
                message: "No results found",
                data: [],
                pagination: emptyPagination,
                meta: meta,
                hasSearchQuery: true,
            };
        }
        if (totalItems === 0 && !hasSearch && !hasFilters) {
            return {
                status:200,
                message: 'No events available yet',
                data: [],
                pagination: emptyPagination,
                meta: meta,
                isEmptySystem: true,
            };
        }
        const actualPage = Math.min(validPage, totalPages);
        const skip = (actualPage - 1) * validLimit;
        const remainingItems = totalItems - skip;
        const actualLimit = Math.min(validLimit, remainingItems);
         // Build sort options
         const sortOptions: any = {};
         sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;;
        //apply filter
        let query = model.find(baseQuery).sort(sortOptions) .skip(skip).limit(actualLimit);
        const data = await (lean ? query.lean() : query.exec());
        const pagination = buildPagination(actualPage,totalItems, totalPages,validLimit, validPage) 
        return{
            status:200,
            message: data.length > 0 ? 'Events fetched successfully' : 'No data found',
            data: data as T[],
            pagination : pagination,
            meta: meta
        }

    }catch(error){
        throw error;
    }
}


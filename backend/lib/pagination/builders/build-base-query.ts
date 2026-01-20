export const buildBaseQuery = (  search : string , searchFields : string[], filters :Record<string,any>) => {
    let baseQuery: any = {};
    const hasSearch = !!search && search.trim() !== '';
    const hasFilters = Object.keys(filters).length > 0
    //has search
    if (hasSearch && searchFields.length > 0) {
        const searchConditions = searchFields.map(field => ({
            [field]: { $regex: search.trim(), $options: 'i' }
        }));
        
        if (hasFilters) {
            baseQuery = {
                $and: [
                    { ...filters },
                    { $or: searchConditions }
                ]
            };
        } else {
            baseQuery = { $or: searchConditions };
        }
    } else if (hasFilters) {
        baseQuery = { ...filters };
    }
    return baseQuery;
}
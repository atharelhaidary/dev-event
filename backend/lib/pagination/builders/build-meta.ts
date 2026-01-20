export const buildMeta = (search : string , searchFields : string[], filters :Record<string,any>, sortBy:string, sortOrder:string ) => {
    const hasSearch = !!search && search.trim() !== '';
    return {
            search: {
                active: hasSearch ?  true : false,
                details: hasSearch ? {
                    term: search,
                    fields: searchFields,
                } : {
                    reason: 'No search parameter provided',
                    availableFields: searchFields,
                }
            },
            sorting: {
                by: sortBy,
                order: sortOrder
            },
            filters: Object.keys(filters).length > 0 ? {
                active: true,
                count: Object.keys(filters).length,
                list: { ...filters }
            } : {
                active: false,
                message: 'No filters applied'
            },
            
            timestamp: new Date().toISOString()
    }
}
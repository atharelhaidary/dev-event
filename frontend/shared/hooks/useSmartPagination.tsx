// hooks/useSmartPagination.ts
'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';

export function useSmartPagination() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    
    // استخراج كل الـ params من URL
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const search = searchParams.get('search') || '';
    
    // ⚠️ حفظ آخر page لكل search combination
    const [searchHistory, setSearchHistory] = useState<Record<string, number>>({});
    
    // توليد key فريد لكل search combination
    const getSearchKey = useCallback((searchTerm: string, filters: Record<string, string>) => {
        const filterString = Object.entries(filters)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([k, v]) => `${k}=${v}`)
            .join('&');
        return `${searchTerm}|${filterString}`;
    }, []);
    
    // الحصول على الصفحة المناسبة للـ search الحالي
    const getPageForSearch = useCallback((currentSearch: string, currentFilters: Record<string, string>) => {
        const key = getSearchKey(currentSearch, currentFilters);
        return searchHistory[key] || 1; // إذا مش موجود، ارجع لصفحة 1
    }, [searchHistory, getSearchKey]);
    
    // حفظ page للـ search الحالي
    const savePageForSearch = useCallback((searchTerm: string, filters: Record<string, string>, pageNum: number) => {
        const key = getSearchKey(searchTerm, filters);
        setSearchHistory(prev => ({
            ...prev,
            [key]: pageNum
        }));
    }, [getSearchKey]);
    
    // عند تغيير search، احفظ الـ page القديم وارجع لـ page المناسب للـ search الجديد
    const handleSearchChange = useCallback((newSearch: string, newFilters: Record<string, any> = {}) => {
        const currentFilters = {
            category: searchParams.get('category') || '',
            location: searchParams.get('location') || ''
        };
        
        // 1. حفظ الـ page الحالي للـ search القديم
        savePageForSearch(search, currentFilters, page);
        
        // 2. الحصول على الـ page المناسب للـ search الجديد
        const targetPage = getPageForSearch(newSearch, newFilters);
        
        // 3. تحديث الـ URL بالـ search الجديد والـ page المناسب
        const params = new URLSearchParams();
        
        // إضافة search جديد
        if (newSearch) params.set('search', newSearch);
        
        // إضافة filters جديدة
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) params.set(key, String(value));
        });
        
        // إضافة page المناسب
        params.set('page', String(targetPage));
        params.set('limit', String(limit));
        
        router.push(`${pathname}?${params.toString()}`);
    }, [search, page, limit, searchParams, router, pathname, savePageForSearch, getPageForSearch]);
    
    // عند تغيير page فقط (من غير search)
    const handlePageChange = useCallback((newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(newPage));
        
        // // حفظ الـ page الجديد للـ search الحالي
        // const currentFilters = {
        //     category: searchParams.get('category') || '',
        //     location: searchParams.get('location') || ''
        // };
        savePageForSearch(search, newPage);
        
        router.push(`${pathname}?${params.toString()}`);
    }, [searchParams, router, pathname, search, savePageForSearch]);
    
    // حفظ الـ page الحالي عند تحميل المكون
    useEffect(() => {
        const currentFilters = {
            category: searchParams.get('category') || '',
            location: searchParams.get('location') || ''
        };
        savePageForSearch(search, currentFilters, page);
    }, [search, page, searchParams, savePageForSearch]);
    
    return {
        // الحالة الحالية
        page,
        limit,
        search,
        // category,
        // location,
        
        // الدوال
        handleSearchChange,
        handlePageChange,
        
        // Utilities
        getCurrentParams: () => ({
            page,
            limit,
            search,
            // category,
            // location
        })
    };
}
// lib/security/trusted-types.ts

/**
 * تهيئة Trusted Types للتطبيق بالكامل
 * ضع هذا الكود في بداية app/layout.tsx أو في provider
 */
export function initializeTrustedTypes() {
    if (typeof window === 'undefined') return
    
    const w = window as any
    
    if (w.trustedTypes) {
      // إنشاء السياسة الافتراضية إذا لم تكن موجودة
      if (!w.trustedTypes.defaultPolicy) {
        w.trustedTypes.createPolicy('default', {
          createHTML: (html: string) => html,
          createScript: (script: string) => script,
          createScriptURL: (url: string) => url,
        })
      }
      
      // console.log('✅ Trusted Types initialized successfully')
    }
  }
  
  /**
   * دالة مساعدة للاستخدام في الملفات الفردية
   */
  export const initTT = initializeTrustedTypes
  
  /**
   * نسخة مبسطة للاستخدام المباشر
   */
  export const trustedTypesConfig = `
  if (typeof window !== 'undefined' && window.trustedTypes) {
    window.trustedTypes.createPolicy('default', {
      createHTML: (html) => html,
      createScript: (script) => script,
      createScriptURL: (url) => url,
    })
  }
  `

export const MESSAGES = {
  // Validation Messages
  VALIDATION: {
    REQUIRED: 'Bu alan zorunludur.',
    STRING_BASE: 'Bu alan bir metin olmalıdır.',
    STRING_EMPTY: 'Bu alan boş olamaz.',
    STRING_MIN: 'Bu alan en az {{#limit}} karakter olmalıdır.',
    STRING_MAX: 'Bu alan en fazla {{#limit}} karakter olabilir.',
    DATE_BASE: 'Geçerli bir tarih girilmelidir.',
    DATE_FORMAT: 'Tarih formatı geçersiz. Lütfen YYYY-MM-DD formatını kullanın.',
    START_DATE_BASE:'Başlangıç tarihi geçerli bir ISO formatında olmalıdır (örn: 2025-10-01).',
    END_DATE_BASE:'Bitiş tarihi geçerli bir ISO formatında olmalıdır (örn: 2025-02-15).',
    UNKNOWN_FIELD: 'Tanımlanmamış alanlar reddedildi.',
    INVALID_VALUE:'Geçersiz değer girdiniz.'
  },

  // Response Messages
  RESPONSE: {
    SUCCESS: 'İşlem başarıyla tamamlandı.',
    CREATED: 'Kayıt başarıyla oluşturuldu.',
    UPDATED: 'Kayıt başarıyla güncellendi.',
    DELETED: 'Kayıt başarıyla silindi.',
    NOT_FOUND: 'Aradığınız kaynak bulunamadı.',
    UNAUTHORIZED: 'Yetkilendirme hatası. Lütfen giriş yapın veya izinlerinizi kontrol edin.',
    FORBIDDEN: 'Bu işlem için yetkiniz bulunmamaktadır.',
    CONFLICT: 'Bu kaynak zaten mevcut.',
    RATE_LIMIT_EXCEEDED: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.',
  },

  // Error Messages
  ERROR: {
    INTERNAL_SERVER_ERROR: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.',
    BAD_REQUEST: 'Geçersiz istek. Lütfen girdi bilgilerinizi kontrol edin.',
    VALIDATION_FAILED: 'Doğrulama başarısız. Lütfen girdi bilgilerinizi kontrol edin.',
    NOT_FOUND: 'Aradığınız kaynak bulunamadı.',
    UNAUTHORIZED: 'Yetkilendirme hatası. Lütfen giriş yapın veya izinlerinizi kontrol edin.',
    FORBIDDEN: 'Bu işlem için yetkiniz bulunmamaktadır.',
    CONFLICT: 'Bu kaynak zaten mevcut.',
    RATE_LIMIT_EXCEEDED: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.',
    NOT_DETAIL:'Ek bilgi verilmemiştir.'
  },

  // Endpoint-Specific Messages
  ENDPOINT: {
    COUNTRY_NOT_FOUND: "Ülke bulunamadı.",
    COUNTRIES_FETCHED: "Ülkeler başarıyla getirildi.",
    COUNTRY_DETAILS_FETCHED: "Ülke detayları başarıyla getirildi.",

    STATE_NOT_FOUND: "Şehir/Eyalet bulunamadı.",
    STATES_FETCHED: "Şehir/Eyalet başarıyla getirildi.",
    STATE_DETAILS_FETCHED: "Şehir/Eyalet detayları başarıyla getirildi.",

    DISTRICT_NOT_FOUND: "İlçe bulunamadı.",
    DISTRICTS_FETCHED: "İlçeler başarıyla getirildi.",
    DISTRICT_DETAILS_FETCHED: "İlçe detayları başarıyla getirildi.",

    SEARCH_RESULTS_FETCHED: "Arama sonuçları başarıyla getirildi.",

    PRAYER_TIMES_FETCHED: "Namaz vakitleri başarıyla getirildi.",
    PRAYER_TIMES_RANGE_FETCHED: "Belirtilen tarih aralığındaki namaz vakitleri başarıyla getirildi.",
    PRAYER_TIMES_WEEKLY_FETCHED: "Haftalık namaz vakitleri başarıyla getirildi.",
    PRAYER_TIMES_MONTHLY_FETCHED: "Aylık namaz vakitleri başarıyla getirildi.",
    PRAYER_TIMES_YEARLY_FETCHED: "Yıllık namaz vakitleri başarıyla getirildi.",
  },
};

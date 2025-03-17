# **Ezan Vakti İmsakiyem API Dokümantasyonu** 
---
*v1.0.0 | Son güncelleme: 14 Mart 2025*
---
Ezan Vakti İmsakiyem API, T.C. Diyanet İşleri Başkanlığı tarafından yayınlanan dünya genelindeki ülkelerin ezan vakitlerini günlük,haftalık, aylık ve yıllık olarak sunan **ücretsiz** API hizmetidir.

**Ana Özellikler:**  
✅ Ülke/Şehir/İlçe hiyerarşik veri erişimi  
✅ Namaz vakitleri için dinamik zaman aralığı seçeneği  

---

## **Hızlı Başlangıç**  
```bash
# Ankara'nın ilçelerini listeleme
curl -X GET "https://ezanvakti.imsakiyem.com/api/locations/districts?stateId=506" \
-H "Accept: application/json"
```
```bash
# Ankara/Polatlı ilçesinin namaz vakitlerini yıllık listeleme(ID:9220)
curl -X GET "https://ezanvakti.imsakiyem.com/api/prayer-times/9220/yearly" \
-H "Accept: application/json"
```
- [İstanbul SultanBeyli Günlük Namaz Vakti](https://ezanvakti.imsakiyem.com/api/prayer-times/9549/daily)
- [Tekirdağ Çorlu Haftalık Namaz Vakti](https://ezanvakti.imsakiyem.com/api/prayer-times/9873/weekly)
- [Ankara Polatlı Aylık Namaz Vakti](https://ezanvakti.imsakiyem.com/api/prayer-times/9220/monthly)
- [Muş Bulanık Yıllık Namaz Vakti](https://ezanvakti.imsakiyem.com/api/prayer-times/9751/yearly)
- [Almanya Hamburg WILHELMSBURG 14 Mart(2025-03-14) ile 06 Haziran(2025-06-06) Namaz Vakitleri](https://ezanvakti.imsakiyem.com/api/prayer-times/10034/range?startDate=2025-03-14&endDate=2025-06-06)


---

## **API Endpoint'leri**  

### **🌍 Coğrafi Konum Verileri**  

#### **Ülkeler**  
| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/api/locations/countries` | GET | Tüm ülkeleri listeler |
| `/api/locations/countries/{countryId}` | GET | Ülke detayları |
| `/api/locations/search/countries` | GET | Ülke arama |

**Parametreler:**  
- `countryId` (Path, Zorunlu)  
- `q` (Query, Opsiyonel)

**Örnek Kullanım:**  
```http
GET /api/locations/countries/2 HTTP/1.1
Host: ezanvakti.imsakiyem.com
```

---

#### **Şehirler**  
| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/api/locations/states` | GET | Ülke ID'sine göre şehirler |
| `/api/locations/states/{stateId}` | GET | Şehir detayları |
| `/api/locations/search/states` | GET | Şehir arama |

**Parametreler:**  
- `countryId` (Query, Zorunlu)  
- `stateId` (Path, Zorunlu)  
- `q` (Query, Opsiyonel)  

---

#### **İlçeler**  
| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/api/locations/districts` | GET | Şehir ID'sine göre ilçeler |
| `/api/locations/districts/{districtId}` | GET | İlçe detayları |
| `/api/locations/search/districts` | GET | İlçe arama |

**Parametreler:**  
- `stateId` (Query, Zorunlu)  
- `districtId` (Path, Zorunlu)  
- `q` (Query, Opsiyonel)  

---

### **🕋 Namaz Vakitleri**  
```http
GET /api/prayer-times/{districtId}/{period} HTTP/1.1
```

**Parametreler:**  
| Parametre | Tür | Zorunluluk | Açıklama |
|-----------|-----|------------|----------|
| `districtId` | Path | Evet | İlçe ID'si |
| `period` | Path | Evet | `daily`/`weekly`/`monthly`/`yearly`/`range` varsayılan: `monthly` |
| `startDate` | Query | Opsiyonel | `YYYY-MM-DD` |
| `endDate` | Query | Opsiyonel | `YYYY-MM-DD` |
| `page` | Query | Hayır | Varsayılan: 1 |
| `limit` | Query | Hayır | Varsayılan: 100 |

**Örnek İstek:**  
```bash
curl -X GET "https://ezanvakti.imsakiyem.com/api/prayer-times/9147/monthly?startDate=2025-02-15" \
-H "Accept: application/json"
```

---
**Not:** monthly ve yearly bulunduğu zaman aralığında ki ayı ve yılı alır.(Örn: 16 Mart aylık veri almak istendiğinde, 1-31 Mart arasını verir)
## **⚠️ Kullanım Sınırlamaları**  
- **Rate Limit:** 100 istek / 5 dakika  
- **Desteklenen Format:** `application/json`  

---


### **Loglama Politikası**  

**Önemli Notlar:**  
- Tüm IP adresleri GDPR uyumlu şekilde anonimleştirilir  
- Performans metrikleri sunucu optimizasyonu için kullanılır  
- Günlükler otomatik olarak 14 gün sonra silinir  

---

## **❌ Hata Yönetimi**  
| HTTP Kodu | Tip | Çözüm Önerisi |
|-----------|-----|----------------|
| 400 | Geçersiz Parametre | Gerekli parametreleri kontrol edin |
| 404 | Kaynak Bulunamadı | ID değerlerini doğrulayın |
| 429 | Limit Aşıldı | 5 dakika bekleyip tekrar deneyin |
| 500 | Sunucu Hatası |  |

---

## **API Dokümantasyon Kaynakları**  
  
 [Swagger Dokümanı](https://ezanvakti.imsakiyem.com/api-docs)  
 [Swagger JSON Dokümanı](https://ezanvakti.imsakiyem.com/api-docs/json)  
 [Postman Koleksiyonu](https://raw.githubusercontent.com/karademirmustafa/ezanvakti-imsakiyem-api/refs/heads/main/postman/ezanvakti-imsakiyem.postman_collection.json)  

---

## **İletişim**  

Hata, öneri, istek ve şikayet ne varsa alttaki iletişim kanallarından iletebilirsiniz.
| Kanal | Detay |
|-------|-------|
| E-posta | [karademirbayburt@gmail.com](mailto:karademirbayburt@gmail.com) |
| LinkedIn | [Mustafa Karademir](https://www.linkedin.com/in/karademirmustafa/) 

---

**Not:** Tüm tarihler ISO 8601 (`YYYY-MM-DD`) formatında olmalıdır. Bölge verileri hiyerarşik erişim gerektirir:
- **Ülke → Şehir → İlçe → Namaz Vakitleri**






## **Ayrıca eklemeyi düşündüğüm özellikler**  
  1. **Coğrafi Koordinat Desteği**  
   - Enlem/Boylam bazlı konum sorgulama  
   - Hassas coğrafi bölge tespiti  
   - Enlem/Boylam bazlı namaz vakitleri verileri
  2. **Çok Dilli Response**  
   - Dil parametresi (`lang=tr/en`) desteği  
   - Tamamen İngilizce/Türkçe ayrımı yapılmış alan adları  
 3. **Ramazan ve özel vakitler entegrasyonu**
4. **Güneş, ay ve kıble verileri**
5. **Websocket üzerinden gerçek zamanlı bildirimler**
6. **Mobil SDK'lar (Android/iOS)**
7. **Hesaplama yöntemlerine göre namaz vakitleri verisi**


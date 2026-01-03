# **Prayer Times İmsakiyem API Documentation**
---
*v1.0.0 | Last updated: January 3, 2026*

**Language / Dil:** [🇹🇷 Türkçe](README.md) | [🇬🇧 English](README.en.md)
---
Prayer Times İmsakiyem API is a **free** API service that provides daily, weekly, monthly, and yearly prayer times for countries worldwide, published by the Presidency of Religious Affairs of Türkiye.

**Key Features:**  
✅ Hierarchical Country/City/District data access  
✅ Dynamic time range options for prayer times  

---

## **Quick Start**  
```bash
# List districts of Ankara
curl -X GET "https://ezanvakti.imsakiyem.com/api/locations/districts?stateId=506" \
-H "Accept: application/json"
```
```bash
# List yearly prayer times for Ankara/Polatlı district (ID:9220)
curl -X GET "https://ezanvakti.imsakiyem.com/api/prayer-times/9220/yearly" \
-H "Accept: application/json"
```
- [Istanbul SultanBeyli Daily Prayer Times](https://ezanvakti.imsakiyem.com/api/prayer-times/9549/daily)
- [Tekirdağ Çorlu Weekly Prayer Times](https://ezanvakti.imsakiyem.com/api/prayer-times/9873/weekly)
- [Ankara Polatlı Monthly Prayer Times](https://ezanvakti.imsakiyem.com/api/prayer-times/9220/monthly)
- [Muş Bulanık Yearly Prayer Times](https://ezanvakti.imsakiyem.com/api/prayer-times/9751/yearly)
- [Germany Hamburg WILHELMSBURG Prayer Times from March 14 (2026-03-14) to June 6 (2026-06-06)](https://ezanvakti.imsakiyem.com/api/prayer-times/10034/range?startDate=2026-03-14&endDate=2026-06-06)


---

## **📋 Updates**

**January 3, 2026:**
- ✅ 2026 prayer times data added
- 📦 For open data set, see [open-data/prayer-times/README.md](open-data/prayer-times/README.md)

---

## **API Endpoints**  

### **🌍 Geographic Location Data**  

#### **Countries**  
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/locations/countries` | GET | Lists all countries |
| `/api/locations/countries/{countryId}` | GET | Country details |
| `/api/locations/search/countries` | GET | Search countries |

**Parameters:**  
- `countryId` (Path, Required)  
- `q` (Query, Optional)

**Example Usage:**  
```http
GET /api/locations/countries/2 HTTP/1.1
Host: ezanvakti.imsakiyem.com
```

---

#### **States**  
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/locations/states` | GET | States by country ID |
| `/api/locations/states/{stateId}` | GET | State details |
| `/api/locations/search/states` | GET | Search states |

**Parameters:**  
- `countryId` (Query, Required)  
- `stateId` (Path, Required)  
- `q` (Query, Optional)  

---

#### **Districts**  
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/locations/districts` | GET | Districts by state ID |
| `/api/locations/districts/{districtId}` | GET | District details |
| `/api/locations/search/districts` | GET | Search districts |

**Parameters:**  
- `stateId` (Query, Required)  
- `districtId` (Path, Required)  
- `q` (Query, Optional)  

---

### **🕋 Prayer Times**  
```http
GET /api/prayer-times/{districtId}/{period} HTTP/1.1
```

**Parameters:**  
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `districtId` | Path | Yes | District ID |
| `period` | Path | Yes | `daily`/`weekly`/`monthly`/`yearly`/`range` default: `monthly` |
| `startDate` | Query | Optional | `YYYY-MM-DD` |
| `endDate` | Query | Optional | `YYYY-MM-DD` |
| `page` | Query | No | Default: 1 |
| `limit` | Query | No | Default: 100 |

**Example Request:**  
```bash
curl -X GET "https://ezanvakti.imsakiyem.com/api/prayer-times/9147/monthly?startDate=2025-02-15" \
-H "Accept: application/json"
```

---
**Note:** monthly and yearly return the month and year within the specified time range. (e.g., requesting monthly data for March 16 will return data for March 1-31)

## **⚠️ Usage Limitations**  
- **Rate Limit:** 100 requests / 5 minutes  
- **Supported Format:** `application/json`  

---

### **Logging Policy**  

**Important Notes:**  
- All IP addresses are anonymized in compliance with GDPR  
- Performance metrics are used for server optimization  
- Logs are automatically deleted after 14 days  

---

## **❌ Error Handling**  
| HTTP Code | Type | Solution Suggestion |
|-----------|------|---------------------|
| 400 | Invalid Parameter | Check required parameters |
| 404 | Resource Not Found | Verify ID values |
| 429 | Limit Exceeded | Wait 5 minutes and try again |
| 500 | Server Error |  |

---

## **API Documentation Resources**  

 [Swagger Documentation](https://ezanvakti.imsakiyem.com/api-docs)  
 [Swagger JSON Documentation](https://ezanvakti.imsakiyem.com/api-docs/json)  
 [Postman Collection](https://raw.githubusercontent.com/karademirmustafa/ezanvakti-imsakiyem-api/refs/heads/main/postman/ezanvakti-imsakiyem.postman_collection.json)  
 [Open Data Set](open-data/prayer-times/README.md) - JSON format prayer times data for Türkiye and KKTC  

## 📝 License
This project is licensed under the GNU General Public License v3.0 (GPL-3.0). You may use, modify, and distribute this software. However:

- You must share the source code
- You must document changes
- You must use the same license
- See LICENSE file for details.

## **Contact**  

You can contact us through the following channels for errors, suggestions, requests, and complaints.
| Channel | Details |
|---------|---------|
| Email | [karademirbayburt@gmail.com](mailto:karademirbayburt@gmail.com) |
| LinkedIn | [Mustafa Karademir](https://www.linkedin.com/in/karademirmustafa/) 

---

**Note:** All dates must be in ISO 8601 (`YYYY-MM-DD`) format. Regional data requires hierarchical access:
- **Country → State → District → Prayer Times**





## **Planned Features**  
  1. **Geographic Coordinate Support**  
   - Latitude/Longitude based location queries  
   - Precise geographic region detection  
   - Latitude/Longitude based prayer times data
  2. **Multi-language Response**  
   - Language parameter (`lang=tr/en`) support  
   - Fully separated English/Turkish field names  
 3. **Ramadan and special times integration**
4. **Sun, moon and qibla data**
5. **Real-time notifications via WebSocket**
6. **Mobile SDKs (Android/iOS)**
7. **Prayer times data by calculation methods**


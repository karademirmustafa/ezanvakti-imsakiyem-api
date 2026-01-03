# **Türkiye ve KKTC Namaz Vakitleri Açık Veri Seti**
---
*v1.0.0 | Son güncelleme: 3 Ocak 2026*

**Language / Dil:** [🇹🇷 Türkçe](README.md) | [🇬🇧 English](README.en.md)
---

Bu veri seti, Türkiye ve Kuzey Kıbrıs Türk Cumhuriyeti'ndeki **880 district** için namaz vakitlerini içermektedir.

## **📋 Güncellemeler**

**3 Ocak 2026:**
- ✅ 2026 yılı namaz vakitleri verileri eklendi

---

## 📚 Hakkında

## 📁 Dosya Yapısı

```
prayer-times/tr-kktc/
├── prayer-times.2025.json         # 2025 yılı TR-KKTC tüm namaz vakitleri (GitHub Releases'den indirin)
├── prayer-times.2026.json         # 2026 yılı TR-KKTC tüm namaz vakitleri (GitHub Releases'den indirin)
├── prayer-times.districts.json    # District (İlçe) listesi
├── prayer-times.states.json       # State (İl) listesi
├── prayer-times.countries.json    # Country (Ülke) listesi
└── README.md
```

**📦 Büyük JSON Dosyalarını İndirme:**
- Dosya boyutu GitHub limitini aştığı için büyük JSON dosyaları GitHub Releases'de yayınlanmaktadır
- [GitHub Releases](https://github.com/karademirmustafa/ezanvakti-imsakiyem-api/releases) sayfasından `prayer-times.2025.json` ve `prayer-times.2026.json` dosyalarını indirebilirsiniz
- Küçük referans dosyaları (districts, states, countries) doğrudan repository'de mevcuttur

## 📊 Veri Formatları

### 1️⃣ Yıllık Namaz Vakitleri (prayer-times.2025.json, prayer-times.2026.json)

```json
{
  "meta": {
    "year": 2026,
    "country": "TR-KKTC",
    "total_districts": 880,
    "total_records": 354515,
    "generated_at": "2026-01-03T..."
  },
  "data": [
    {
      "district_id": "17914",
      "date": "2026-01-01T00:00:00.000Z",
      "hijri_date": {
        "day": 1,
        "month": 7,
        "month_name": "Recep",
        "month_name_en": "Rajab",
        "year": 1447,
        "full_date": "1 Recep 1447"
      },
      "times": {
        "imsak": "06:15",
        "gunes": "07:45",
        "ogle": "12:30",
        "ikindi": "15:15",
        "aksam": "17:45",
        "yatsi": "19:15"
      },
      "meta": {
        "source": "diyanet"
      }
    }
  ]
}
```

### 2️⃣ District (İlçe) Listesi (prayer-times.districts.json)

```json
[
  {
    "_id": "17914",
    "name": "BAF",
    "name_en": "PAPHOS",
    "url": "/tr-TR/17914/baf-icin-namaz-vakti",
    "state_id": "751",
    "country_id": "1",
    "createdAt": { "$date": "2025-03-14T01:01:06.362Z" },
    "updatedAt": { "$date": "2025-03-14T01:01:06.362Z" },
    "updated_at": { "$date": "2026-01-03T10:49:30.681Z" }
  }
]
```

### 3️⃣ State (İl) Listesi (prayer-times.states.json)

```json
[
  {
    "_id": "751",
    "name": "KUZEY KIBRIS",
    "name_en": "KUZEY KIBRIS",
    "country_id": "1",
    "createdAt": { "$date": "2025-03-14T01:01:05.871Z" },
    "updatedAt": { "$date": "2025-03-14T01:01:05.871Z" },
    "updated_at": { "$date": "2026-01-03T10:49:30.576Z" }
  }
]
```

### 4️⃣ Country (Ülke) Listesi (prayer-times.countries.json)

```json
[
  {
    "_id": "1",
    "name": "KUZEY KIBRIS",
    "name_en": "KUZEY KIBRIS"
  },
  {
    "_id": "2",
    "name": "TÜRKİYE",
    "name_en": "TÜRKİYE"
  }
]
```

## 💻 Kullanım Örnekleri

### JavaScript/TypeScript

```javascript
// Tüm referans dosyalarını yükle
const districts = require('./prayer-times.districts.json');
const states = require('./prayer-times.states.json');
const countries = require('./prayer-times.countries.json');
const prayerTimes2026 = require('./prayer-times.2026.json');

// İlçe bilgisini bul
const district = districts.find(d => d._id === '17914');
console.log(district.name); // "BAF"

// İl bilgisini bul
const state = states.find(s => s._id === district.state_id);
console.log(state.name); // "KUZEY KIBRIS"

// Ülke bilgisini bul
const country = countries.find(c => c._id === district.country_id);
console.log(country.name); // "KUZEY KIBRIS"

// Bugünkü namaz vakitlerini bul
const today = new Date().toISOString().split('T')[0];
const todayPrayer = prayerTimes2026.data.find(
  p => p.district_id === '17914' && p.date.startsWith(today)
);
console.log(todayPrayer.times);
// { imsak: "06:15", gunes: "07:45", ogle: "12:30", ... }
```

### Python

```python
import json
from datetime import datetime

# Referans dosyalarını yükle
with open('prayer-times.districts.json', 'r', encoding='utf-8') as f:
    districts = json.load(f)

with open('prayer-times.states.json', 'r', encoding='utf-8') as f:
    states = json.load(f)

with open('prayer-times.countries.json', 'r', encoding='utf-8') as f:
    countries = json.load(f)

with open('2026.json', 'r', encoding='utf-8') as f:
    prayer_times = json.load(f)

# İlçe bilgisi
district = next(d for d in districts if d['_id'] == '17914')
print(f"İlçe: {district['name']}")

# İl bilgisi
state = next(s for s in states if s['_id'] == district['state_id'])
print(f"İl: {state['name']}")

# Ülke bilgisi
country = next(c for c in countries if c['_id'] == district['country_id'])
print(f"Ülke: {country['name']}")

# Bugünkü namaz vakti
today = datetime.now().strftime('%Y-%m-%d')
today_prayer = next(
    p for p in prayer_times['data']
    if p['district_id'] == '17914' and p['date'].startswith(today)
)
print(today_prayer['times'])

# İlişkili veri sorgulama örnekleri
# İstanbul'daki tüm ilçeleri bul (İstanbul state_id: 34)
istanbul_state_id = '34'
istanbul_districts = [d for d in districts if d['state_id'] == istanbul_state_id]
print(f"İstanbul'da {len(istanbul_districts)} ilçe var")

# Türkiye'deki tüm illeri bul (Türkiye country_id: 2)
turkey_country_id = '2'
turkey_states = [s for s in states if s['country_id'] == turkey_country_id]
print(f"Türkiye'de {len(turkey_states)} il var")
```

### İlişkili Veri Sorgulama

```javascript
// İstanbul'daki tüm ilçeleri bul (İstanbul state_id: 34)
const istanbulStateId = '34';
const istanbulDistricts = districts.filter(d => d.state_id === istanbulStateId);

console.log(`İstanbul'da ${istanbulDistricts.length} ilçe var`);

// Türkiye'deki tüm illeri bul (Türkiye country_id: 2)
const turkeyCountryId = '2';
const turkeyStates = states.filter(s => s.country_id === turkeyCountryId);

console.log(`Türkiye'de ${turkeyStates.length} il var`);

// Belirli bir ilçenin hiyerarşik bilgilerini bul
const districtId = '17914';
const district = districts.find(d => d._id === districtId);
const state = states.find(s => s._id === district.state_id);
const country = countries.find(c => c._id === district.country_id);

console.log(`${country.name} > ${state.name} > ${district.name}`);
```

## 🔗 İlişkiler

```
Country (Ülke)
    ↓ country_id
State (İl)
    ↓ state_id
District (İlçe)
    ↓ district_id
Prayer Times (Namaz Vakitleri)
```

## 📈 İstatistikler

- **Toplam Ülke:** 2
- **Toplam İl:** 82
- **Toplam İlçe:** 880
- **Yıllar:** 2025, 2026
- **Veri Kaynağı:** Diyanet İşleri Başkanlığı
- **Son Güncelleme:** 3 Ocak 2026


## **İletişim**

Hata, öneri, istek ve şikayet ne varsa alttaki iletişim kanallarından iletebilirsiniz.
| Kanal | Detay |
|-------|-------|
| E-posta | [karademirbayburt@gmail.com](mailto:karademirbayburt@gmail.com) |
| LinkedIn | [Mustafa Karademir](https://www.linkedin.com/in/karademirmustafa/) |

**Farklı Ülke Verileri İçin:**
Diğer ülkelerin namaz vakitleri verilerine ihtiyacınız varsa, yukarıdaki iletişim kanallarından bizimle iletişime geçebilirsiniz. Açık veri koleksiyonuna yeni ülke veri setleri eklenmesi konusunda görüşebiliriz.

---

**Not:** Tüm tarihler ISO 8601 (`YYYY-MM-DD`) formatında olmalıdır. Bölge verileri hiyerarşik erişim gerektirir:
- **Ülke → Şehir → İlçe → Namaz Vakitleri**

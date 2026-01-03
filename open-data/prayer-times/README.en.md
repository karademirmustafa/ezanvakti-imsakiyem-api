# **Türkiye and KKTC Prayer Times Open Data Set**
---
*v1.0.0 | Last updated: January 3, 2026*

**Language / Dil:** [🇹🇷 Türkçe](README.md) | [🇬🇧 English](README.en.md)
---

This data set contains prayer times for **880 districts** in Turkey and the Turkish Republic of Northern Cyprus.

## **📋 Updates**

**January 3, 2026:**
- ✅ 2026 prayer times data added

---

## 📚 About

## 📁 File Structure

```
prayer-times/tr-kktc/
├── prayer-times.2025.json         # 2025 TR-KKTC all prayer times (download from GitHub Releases)
├── prayer-times.2026.json         # 2026 TR-KKTC all prayer times (download from GitHub Releases)
├── prayer-times.districts.json    # District list
├── prayer-times.states.json       # State list
├── prayer-times.countries.json    # Country list
└── README.md
```

**📦 Download Large JSON Files:**
- Due to GitHub file size limits, large JSON files are published on GitHub Releases
- Download `prayer-times.2025.json` and `prayer-times.2026.json` from [GitHub Releases](https://github.com/karademirmustafa/ezanvakti-imsakiyem-api/releases)
- Small reference files (districts, states, countries) are available directly in the repository

## 📊 Data Formats

### 1️⃣ Yearly Prayer Times (prayer-times.2025.json, prayer-times.2026.json)

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

### 2️⃣ District List (prayer-times.districts.json)

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

### 3️⃣ State List (prayer-times.states.json)

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

### 4️⃣ Country List (prayer-times.countries.json)

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

## 💻 Usage Examples

### JavaScript/TypeScript

```javascript
// Load all reference files
const districts = require('./prayer-times.districts.json');
const states = require('./prayer-times.states.json');
const countries = require('./prayer-times.countries.json');
const prayerTimes2026 = require('./prayer-times.2026.json');

// Find district information
const district = districts.find(d => d._id === '17914');
console.log(district.name); // "BAF"

// Find state information
const state = states.find(s => s._id === district.state_id);
console.log(state.name); // "KUZEY KIBRIS"

// Find country information
const country = countries.find(c => c._id === district.country_id);
console.log(country.name); // "KUZEY KIBRIS"

// Find today's prayer times
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

# Load reference files
with open('prayer-times.districts.json', 'r', encoding='utf-8') as f:
    districts = json.load(f)

with open('prayer-times.states.json', 'r', encoding='utf-8') as f:
    states = json.load(f)

with open('prayer-times.countries.json', 'r', encoding='utf-8') as f:
    countries = json.load(f)

with open('prayer-times.2026.json', 'r', encoding='utf-8') as f:
    prayer_times = json.load(f)

# District information
district = next(d for d in districts if d['_id'] == '17914')
print(f"District: {district['name']}")

# State information
state = next(s for s in states if s['_id'] == district['state_id'])
print(f"State: {state['name']}")

# Country information
country = next(c for c in countries if c['_id'] == district['country_id'])
print(f"Country: {country['name']}")

# Today's prayer time
today = datetime.now().strftime('%Y-%m-%d')
today_prayer = next(
    p for p in prayer_times['data']
    if p['district_id'] == '17914' and p['date'].startswith(today)
)
print(today_prayer['times'])

# Related data query examples
# Find all districts in Istanbul (Istanbul state_id: 34)
istanbul_state_id = '34'
istanbul_districts = [d for d in districts if d['state_id'] == istanbul_state_id]
print(f"Istanbul has {len(istanbul_districts)} districts")

# Find all states in Turkey (Turkey country_id: 2)
turkey_country_id = '2'
turkey_states = [s for s in states if s['country_id'] == turkey_country_id]
print(f"Turkey has {len(turkey_states)} states")
```

### Related Data Queries

```javascript
// Find all districts in Istanbul (Istanbul state_id: 34)
const istanbulStateId = '34';
const istanbulDistricts = districts.filter(d => d.state_id === istanbulStateId);

console.log(`Istanbul has ${istanbulDistricts.length} districts`);

// Find all states in Turkey (Turkey country_id: 2)
const turkeyCountryId = '2';
const turkeyStates = states.filter(s => s.country_id === turkeyCountryId);

console.log(`Turkey has ${turkeyStates.length} states`);

// Find hierarchical information for a specific district
const districtId = '17914';
const district = districts.find(d => d._id === districtId);
const state = states.find(s => s._id === district.state_id);
const country = countries.find(c => c._id === district.country_id);

console.log(`${country.name} > ${state.name} > ${district.name}`);
```

## 🔗 Relationships

```
Country
    ↓ country_id
State
    ↓ state_id
District
    ↓ district_id
Prayer Times
```

## 📈 Statistics

- **Total Countries:** 2
- **Total States:** 82
- **Total Districts:** 880
- **Years:** 2025, 2026
- **Data Source:** Presidency of Religious Affairs of Turkey
- **Last Update:** January 3, 2026

## **Contact**

You can contact us through the following channels for errors, suggestions, requests, and complaints.
| Channel | Details |
|---------|---------|
| Email | [karademirbayburt@gmail.com](mailto:karademirbayburt@gmail.com) |
| LinkedIn | [Mustafa Karademir](https://www.linkedin.com/in/karademirmustafa/) |

**For Other Country Data Requests:**
If you need prayer times data for other countries, please contact us through the channels above. We can discuss adding new country data sets to the open data collection.

---

**Note:** All dates must be in ISO 8601 (`YYYY-MM-DD`) format. Regional data requires hierarchical access:
- **Country → State → District → Prayer Times**


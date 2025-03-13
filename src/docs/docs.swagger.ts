/**
 * @swagger
 * /api/prayer-times/{districtId}/{period}:
 *   get:
 *     summary: Belirli bir bölge için namaz vakitlerini alır.
 *     description: Verilen ilçe ID'sine göre belirtilen periyottaki namaz vakitlerini döndürür. Opsiyonel olarak sayfalama ve tarih aralığı desteği sağlar.
 *     tags: [Namaz Vakitleri]
 *     parameters:
 *       - in: path
 *         name: districtId
 *         required: true
 *         description: İlçe ID'si.
 *         schema:
 *           type: string
 *       - in: path
 *         name: period
 *         required: false
 *         description: Namaz vakitleri periyodu (daily, weekly, monthly, yearly).
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, yearly]
 *           default: daily
 *       - in: query
 *         name: startDate
 *         required: false
 *         description: Başlangıç tarihi (YYYY-MM-DD formatında, opsiyonel).
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: Bitiş tarihi (YYYY-MM-DD formatında, opsiyonel).
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: page
 *         required: false
 *         description: Sayfa numarası (opsiyonel, sayfalama için kullanılır).
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Sayfa başına kayıt sayısı (opsiyonel, sayfalama için kullanılır).
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Namaz vakitleri başarıyla alındı.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrayerTimeListResponse'
 *       404:
 *         description: Bölge bulunamadı veya veri yok.
 */
/**
 * @swagger
 * /api/locations/search/{type}:
 *   get:
 *     summary: Konum arama işlemi.
 *     description: Ülke, eyalet veya ilçe gibi konum tipleri için arama yapar.
 *     tags: [Lokasyonlar]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Aranacak konum tipi (countries, states, districts).
 *         schema:
 *           type: string
 *           enum: [countries, states, districts]
 *       - in: query
 *         name: q
 *         required: true
 *         description: Aranacak kelime.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lokasyonlar başarıyla alındı.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LocationsSearchResponse'
 *       404:
 *         description: Lokasyon bulunamadı.
 */
/**
 * @swagger
 * /api/locations/{type}/{id}:
 *   get:
 *     summary: Lokasyon detaylarını alır.
 *     description: Verilen ID'ye göre ülke, eyalet veya ilçe detaylarını döndürür.
 *     tags: [Lokasyonlar]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Lokasyon tipi (countries, states, districts).
 *         schema:
 *           type: string
 *           enum: [countries, states, districts]
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lokasyon ID'si.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lokasyon detayları başarıyla alındı.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocationSingleResponse'
 *       404:
 *         description: Lokasyon bulunamadı.
 */
/**
 * @swagger
 * /api/locations/{type}:
 *   get:
 *     summary: Lokasyonları listeler.
 *     description: Ülke, eyalet veya ilçe gibi lokasyonları liste halinde döndürür. Eyalet veya ilçe listelemesi için üst ID gereklidir.
 *     tags: [Lokasyonlar]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Lokasyon tipi (countries, states, districts).
 *         schema:
 *           type: string
 *           enum: [countries, states, districts]
 *       - in: query
 *         name: countryId
 *         required: false
 *         description: Ülke ID'si (eyalet veya ilçe listelemesi için zorunlu).
 *         schema:
 *           type: string
 *       - in: query
 *         name: stateId
 *         required: false
 *         description: Eyalet ID'si (ilçe listelemesi için zorunlu).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lokasyonlar başarıyla alındı.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocationsListResponse'
 *       404:
 *         description: Lokasyon bulunamadı.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     PrayerTime:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         districtId:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         fajr:
 *           type: string
 *           format: time
 *         sunrise:
 *           type: string
 *           format: time
 *         dhuhr:
 *           type: string
 *           format: time
 *         asr:
 *           type: string
 *           format: time
 *         maghrib:
 *           type: string
 *           format: time
 *         isha:
 *           type: string
 *           format: time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     PrayerTimeListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         code:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: "Namaz vakitleri başarıyla alındı."
 *         requestId:
 *           type: string
 *           example: "12345-abcdef"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PrayerTime'
 *         pagination:
 *           type: object
 *           properties:
 *             currentPage:
 *               type: integer
 *             totalPages:
 *               type: integer
 *             totalItems:
 *               type: integer
 *             itemsPerPage:
 *               type: integer
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         name_en:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     State:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         name_en:
 *           type: string
 *         country_id:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     District:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         name_en:
 *           type: string
 *         state_id:
 *           type: string
 *         country_id:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     LocationsSearchResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *           example: "Arama sonuçları başarıyla alındı."
 *         data:
 *           type: array
 *           items:
 *             oneOf:
 *               - $ref: '#/components/schemas/Country'
 *               - $ref: '#/components/schemas/State'
 *               - $ref: '#/components/schemas/District'
 *         requestId:
 *           type: string
 *           example: "12345-abcdef"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     LocationSingleResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *           example: "Lokasyon detayları başarıyla alındı."
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/Country'
 *             - $ref: '#/components/schemas/State'
 *             - $ref: '#/components/schemas/District'
 *         requestId:
 *           type: string
 *           example: "12345-abcdef"
 * 
 *     LocationsListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *           example: "Lokasyonlar başarıyla listelendi."
 *         data:
 *           type: array
 *           items:
 *             oneOf:
 *               - $ref: '#/components/schemas/Country'
 *               - $ref: '#/components/schemas/State'
 *               - $ref: '#/components/schemas/District'
 *         requestId:
 *           type: string
 *           example: "12345-abcdef"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LocationListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *           example: "Lokasyon detayları başarıyla alındı."
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/Country'
 *             - $ref: '#/components/schemas/State'
 *             - $ref: '#/components/schemas/District'
 *         requestId:
 *           type: string
 *           example: "12345-abcdef"
 */

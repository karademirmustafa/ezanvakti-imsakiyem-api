import { LocationService } from "../services/location.service";
import { LocationTypes } from "../constants/enums";

export async function handleLocationRequest(
  service: LocationService,
  type: LocationTypes, // ✅ Enum kullanımı
  id?: string,
  query?: string,
  parentId?: string
) {
  switch (type) {
    case LocationTypes.COUNTRIES:
      if (id) return await service.getCountryDetails(id);
      if (query) return await service.searchCountries(query);
      return await service.getCountries();

    case LocationTypes.STATES:
      if (id) return await service.getStateDetails(id);
      if (query) return await service.searchStates(query);
      if (parentId) return await service.getStatesByCountry(parentId);
      break;

    case LocationTypes.DISTRICTS:
      if (id) return await service.getDistrictDetails(id);
      if (query) return await service.searchDistricts(query);
      if (parentId) return await service.getDistrictsByState(parentId);
      break;

    default:
      return null;
  }
}

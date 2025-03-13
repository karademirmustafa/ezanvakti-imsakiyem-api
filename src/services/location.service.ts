import { injectable, inject } from "inversify";
import { CountryRepository } from "../repositories/country.repository";
import { StateRepository } from "../repositories/state.repository";
import { DistrictRepository } from "../repositories/district.repository";

@injectable()
export class LocationService {
  constructor(
    @inject(CountryRepository)
    private countryRepo: CountryRepository,
    @inject(StateRepository)
    private stateRepo: StateRepository,
    @inject(DistrictRepository)
    private districtRepo: DistrictRepository
  ) {}

  async getCountries() {
    return this.countryRepo.find({});
  }

  async getCountryDetails(countryId: string) {
    return this.countryRepo.findById(countryId);
  }

  async getStatesByCountry(countryId: string) {
    return this.stateRepo.findByCountry(countryId);
  }

  async getStateDetails(stateId: string) {
    return this.stateRepo.findById(stateId);
  }

  async getDistrictsByState(stateId: string) {
    return this.districtRepo.findByState(stateId);
  }

  async getDistrictDetails(districtId: string) {
    return this.districtRepo.findById(districtId);
  }

  async searchCountries(query: string) {
    return this.countryRepo.findByName(query);
  }

  async searchStates(query: string) {
    return this.stateRepo.searchByName(query);
  }

  async searchDistricts(query: string) {
    return this.districtRepo.searchByName(query);
  }
}
import { BaseRepository } from "./base.repository";
import Country, { ICountry } from "../models/country.model";

export class CountryRepository extends BaseRepository<ICountry> {
  constructor() {
    super(Country);
  }

  async findByName(name: string): Promise<ICountry[]> {
    return this.model
      .find({
        $or: [
          { name: new RegExp(name, "i") },
          { name_en: new RegExp(name, "i") },
        ],
      })
      .lean();
  }
}

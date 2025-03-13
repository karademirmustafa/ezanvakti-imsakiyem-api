import { BaseRepository } from './base.repository';
import District, { IDistrict } from '../models/district.model';

export class DistrictRepository extends BaseRepository<IDistrict> {
  constructor() {
    super(District);
  }

  async searchByName(query: string) {
    return this.model.find({
      $text: { $search: query }
    }, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .lean();
  }
  async findByState(stateId: string) {
    return this.model.find({ state_id: stateId }).lean();
  }

}
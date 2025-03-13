import { BaseRepository } from './base.repository';
import State, { IState } from '../models/state.model';

export class StateRepository extends BaseRepository<IState> {
  constructor() {
    super(State);
  }


  async findByCountry(countryId: string): Promise<IState[]> {
    return this.model.find({ country_id: countryId })
      .sort({ name: 1 })
      .lean();
  }

  async searchByName(query: string): Promise<IState[]> {
    return this.model.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { name_en: new RegExp(query, 'i') }
      ]
    }).lean();
  }
}
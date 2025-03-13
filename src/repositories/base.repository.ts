import { Model, Document } from "mongoose";

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findOne(filter: object): Promise<T | null> {
    return this.model.findOne(filter);
  }

  async find(filter: object): Promise<T[]> {
    return this.model.find(filter);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
  
  async countDocuments(filter: object = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }
}

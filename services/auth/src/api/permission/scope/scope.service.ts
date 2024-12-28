import { Repository } from 'typeorm';
import { Scope } from '../../../database/scope.entity';
import { dataSource } from '../../../config/typeorm.config';
import { CreateScopeDto } from './dto/scope.create.dto';
import { UpdateScopeDto } from './dto/scope.update.dto';

export default class ScopeService {
  private readonly scopeRepo: Repository<Scope>;

  constructor() {
    this.scopeRepo = dataSource.getRepository(Scope);
  }

  public async createScope(data: CreateScopeDto) {
    const isScope = await this.scopeRepo.findOneBy({
      title: data.title.toLowerCase(),
    });
    if (isScope) return null;

    const created = await this.scopeRepo.save({
      title: data.title.toLowerCase(),
    });

    return created;
  }

  public async readAllScopes() {
    const scopes = await this.scopeRepo.find();

    return scopes;
  }

  public async updateScope(data: UpdateScopeDto, scopeId: number) {
    const isScope = await this.scopeRepo.findOneBy({ id: scopeId });
    if (!isScope) return null;

    isScope.title = data.title.toLowerCase();

    const updated = await this.scopeRepo.save(isScope);

    return updated;
  }

  public async deleteScope(scopeId: number) {
    const isScope = await this.scopeRepo.findOneBy({ id: scopeId });
    if (!isScope) return null;

    const deleted = await this.scopeRepo.remove(isScope);

    return deleted;
  }
}

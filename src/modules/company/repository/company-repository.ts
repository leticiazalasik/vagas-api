import { PageDto, PageMetaDto, PageOptionsDto } from 'src/shared/pagination';
import { EntityRepository, Repository } from 'typeorm';
import { CompanyEntity } from '../../../database/entities/company.entity';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { UpdateCompanyDto } from '../dtos/update-company.sto';

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
  async createCompany(data: CreateCompanyDto): Promise<CompanyEntity> {
    return this.save(data).catch(handleError);
  }

  async findAllCompany(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CompanyEntity>> {
    const queryBuilder = this.createQueryBuilder('companies');

    queryBuilder
      .orderBy(
        `companies.${pageOptionsDto.orderByColumn}`,
        pageOptionsDto.order,
      )
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount().catch(handleError);
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findCompanyById(id: string): Promise<CompanyEntity> {
    return this.findOne(id).catch(handleError);
  }

  async UpdateCompanyById(company: CompanyEntity, data: UpdateCompanyDto) {
    return this.save({
      ...company,
      ...data,
    }).catch(handleError);
  }

  async deleteCompanyById(id: string): Promise<object> {
    this.delete(id).catch(handleError);

    return { message: 'Company deleted successfully' };
  }
}

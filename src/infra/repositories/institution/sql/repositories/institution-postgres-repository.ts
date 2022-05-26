import { AddInstitutionAccountRepository, AddInstitutionAccountWithPositionModel } from '../../../../../data/protocols/institution/add-institution-account-repository'
import { FindInstitutionByCnpjRepository } from '../../../../../data/protocols/institution/find-institution-by-cnpj-repository'
import { FindInstitutionByEmailRepository } from '../../../../../data/protocols/institution/find-institution-by-email-repository'
import { AddAccountModel } from '../../../../../domain/models/account'
import { InstitutionModel } from '../../../../../domain/models/institution'
import { db } from '../../../../knex/connection'

export class InstitutionPostgresRepository implements AddInstitutionAccountRepository, FindInstitutionByEmailRepository, FindInstitutionByCnpjRepository {
    private readonly table = 'institutions'
    private readonly accountTable = 'accounts'

    async add (institutionData: AddInstitutionAccountWithPositionModel): Promise<InstitutionModel> {
      try {
        const [account] = await db<AddAccountModel & {id: string}>(this.accountTable).insert({ email: institutionData.email, name: institutionData.name, password: institutionData.password, role: 'Instituição' }).returning('*')
        const [institution] = await db<AddInstitutionAccountWithPositionModel>(this.table).insert(institutionData).returning('*')
        console.log(Object.assign({}, institution, { account_id: account.id }))
        return Object.assign({}, institution, { account_id: account.id })
      } catch (error: any) {
        throw new Error(error.message)
      }
    }

    async findByEmail (email: string): Promise<InstitutionModel | null> {
      const user = await db<InstitutionModel>(this.table).where(email).first()
      if (!user) return null
      return user
    }

    async findByCnpj (cnpj: string): Promise<InstitutionModel | null> {
      const user = await db<InstitutionModel>(this.table).where(cnpj).first()
      if (!user) return null
      return user
    }
}

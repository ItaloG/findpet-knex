import { AddInstitutionAccountRepository, AddInstitutionAccountWithPositionModel } from '../../../../../data/protocols/institution/add-institution-account-repository'
import { FindInstitutionByCnpjRepository } from '../../../../../data/protocols/institution/find-institution-by-cnpj-repository'
import { FindInstitutionByEmailRepository } from '../../../../../data/protocols/institution/find-institution-by-email-repository'
import { AccountModel, AddAccountModel } from '../../../../../domain/models/account'
import { InstitutionModel } from '../../../../../domain/models/institution'
import { db } from '../../../../knex/connection'

export class InstitutionPostgresRepository implements AddInstitutionAccountRepository, FindInstitutionByEmailRepository, FindInstitutionByCnpjRepository {
    private readonly table = 'institutions'
    private readonly accountTable = 'accounts'

    async add (institutionData: AddInstitutionAccountWithPositionModel): Promise<InstitutionModel> {
      try {
        const [account] = await db<AddAccountModel & {id: string}>(this.accountTable).insert({ email: institutionData.email, name: institutionData.name, password: institutionData.password, role: 'Instituição' }).returning('*')
        const [institution] = await db<InstitutionModel>(this.table).insert({ account_id: account.id, cellphone: institutionData.cellphone, cep: institutionData.cep, city: institutionData.city, cnpj: institutionData.cnpj, complement: institutionData.complement, description: institutionData.description, lat: institutionData.lat, lng: institutionData.lng, number: institutionData.number, state: institutionData.state, street: institutionData.street, telephone: institutionData.telephone, type: institutionData.type }).returning('*') // mudar
        return Object.assign({}, institution, { account_id: account.id })
      } catch (error: any) {
        throw new Error(error.message)
      }
    }

    async findByEmail (email: string): Promise<InstitutionModel | null> {
      const user = await db<AccountModel>(this.accountTable).where('email', email).first()
      if (!user) return null
      const institution = await db<InstitutionModel>(this.table).where('account_id', user.id).first()
      if (!institution) return null
      return institution
    }

    async findByCnpj (cnpj: string): Promise<InstitutionModel | null> {
      const user = await db<InstitutionModel>(this.table).where('cnpj', cnpj).first()
      if (!user) return null
      return user
    }
}

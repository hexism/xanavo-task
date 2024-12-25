import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export type TSortBy = 'created_at' | 'updated_at'
export type TSortOrder = 'asc' | 'desc'

export default class BaseService {
  protected ctx: HttpContext | null
  protected queryString: Record<string, any> | undefined
  protected page: number = 1
  protected perPage: number = 15
  protected count: number = 10
  protected sortBy: TSortBy = 'created_at'
  protected sortOrder: TSortOrder = 'desc'

  constructor() {
    this.ctx = HttpContext.get()
    this.queryString = this.ctx?.request.qs()
    if (this.queryString?.page) this.page = this.queryString.page
    if (this.queryString?.count) this.count = parseInt(this.queryString.count)
    if (this.queryString?.perPage) this.perPage = this.queryString.perPage
    if (this.queryString?.sortOrder) this.sortOrder = this.queryString.sortOrder
  }

  protected getUser(): User | undefined {
    return this.ctx?.auth?.user
  }

  protected isGuest(): boolean | undefined {
    return !this.ctx?.auth?.isAuthenticated
  }

  protected getUserAgent(): string | null {
    const ctx = this.ctx
    return ctx?.request?.header('User-Agent') ?? null
  }

  protected getUserIp(): string | null {
    const ctx = this.ctx
    return ctx?.request?.ip() ?? null
  }
}

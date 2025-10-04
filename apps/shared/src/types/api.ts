export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export type PaginatedResponse<T> = {
  data: T[]
  meta: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: string | null
    previousPageUrl: string | null
  }
}

export type ApiError = {
  message: string
  status: number
  code?: string
}

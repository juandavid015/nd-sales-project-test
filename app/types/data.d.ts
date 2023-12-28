// Address model Types
export interface Address {
  id: string
  street: string
  number: string
  state: string
  city: string
  country?: string
}
// Branch office model types
export interface BranchOffice {
  id: string
  country: string
  // country_code: string
  address_id: string
  address: Address
}
// Product model types
export interface Product {
  id: string
  name: string
  price: number
  stock: number
  branch_office_ids: string[]
}
// Vendors model types
export interface Vendor {
  rut_id: string
  name: string
  surnames: string
  address_id: string
  address: AddressType
  phone: string
  birth_date: string
  email: string
}
// Client model types
export interface Client {
  rut_id: string
  name: string
  surnames: string
  address_id: string
  address: AddressType
  phone: string
}
// Provider model types
export interface Provider {
  rut_id: string
  name: string
  address_id: string
  address: AddressType
  phone: string
  website_url: string
}
// Sale model types
export interface Sale {
  id: string
  date: string
  seller_id: string
  seller: Vendor
  client_id: string
  client: Client
  branch_office_id: string
  branch_office: BranchOffice
  sale_detail_ids: string[]
  sale_details: SaleDetail[]
  total_amount: number
  currency: string
}
// SaleDetail model types
export interface SaleDetail {
  id: string
  sale_id: string
  quantity: number
  product_id: string
  product: Product
  unit_price: number
  sub_total: number
}
// Database model
export interface Database {
  products: Products[] | []
  clients: Clients[] | []
  providers: Providers[] | []
  vendors: Vendors[] | []
  branch_offices: BranchOffice[] | []
  sales: Sale[] | [],
}

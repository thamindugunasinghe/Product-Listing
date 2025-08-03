export interface Attribute {
  key: string
  type: "String" | "Number" | "Image"
  description: string
}

export interface Category {
  _id: string
  categoryName: string
  attributes: Attribute[]
}

export interface ProductAttribute {
  key: string
  value: string | string[] | number
  type?: "String" | "Number" | "Image"
}

export interface ProductVariation {
  [key: string]: string | number | undefined
  price?: string
  image?: string
  note?: string
  weight?: string
  flavor?: string
  packSize?: string
  cupType?: string
}

export interface Product {
  _id?: {
    $oid: string
  }
  id?: string
  productName: string
  category: string
  Common_Atributes: ProductAttribute[]
  variation: boolean
  variationAttribute?: string
  variationValues?: string[]
  variations: ProductVariation[]
  createdAt?: string
}

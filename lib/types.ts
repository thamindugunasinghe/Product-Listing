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
  value: string | File[]
  type: "String" | "Number" | "Image"
}

export interface ProductVariation {
  [key: string]: string | File[]
}

export interface Product {
  _id?: string
  productName: string
  category: string
  Common_Atributes: ProductAttribute[]
  variationAttribute?: string
  variationValues?: string[]
  variations: ProductVariation[]
  createdAt?: Date
}

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

export interface Product {
  _id?: string
  name: string
  categoryId: string
  categoryName: string
  commonAttributes: ProductAttribute[]
  variationAttributes: ProductAttribute[]
  createdAt?: Date
}

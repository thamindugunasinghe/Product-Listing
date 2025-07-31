"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, Calendar, Eye, Edit, Star } from "lucide-react"
import Image from "next/image"
import ProductViewModal from "./ProductViewModal"
import ProductEditModal from "./ProductEditModal"

interface ProductVariation {
  [key: string]: string | string[]
}

interface ProductAttribute {
  key: string
  value: string | string[]
}

interface ProductListItem {
  _id: string
  productName: string
  category: string
  Common_Atributes: ProductAttribute[]
  variationAttribute?: string
  variationValues?: string[]
  variations: ProductVariation[]
  createdAt: Date
}

interface ProductListProps {
  onAddProduct: () => void
}

export default function ProductList({ onAddProduct }: ProductListProps) {
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [viewProduct, setViewProduct] = useState<ProductListItem | null>(null)
  const [editProduct, setEditProduct] = useState<ProductListItem | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductUpdate = (updatedProduct: ProductListItem) => {
    setProducts(products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p)))
  }

  const getProductImage = (product: ProductListItem): string => {
    // Look for images in Common_Atributes (note the spelling from your data)
    const imagesAttr = product.Common_Atributes.find((attr) => attr.key === "images" || attr.key === "Product Image")
    if (imagesAttr && Array.isArray(imagesAttr.value) && imagesAttr.value.length > 0) {
      return imagesAttr.value[0]
    }
    return "/placeholder.svg?height=200&width=200&text=No+Image"
  }

  const getProductDescription = (product: ProductListItem): string => {
    // Look for description in Common_Atributes (note the spelling from your data)
    const descAttr = product.Common_Atributes.find((attr) => attr.key === "description" || attr.key === "Description")
    if (descAttr && typeof descAttr.value === "string") {
      return descAttr.value.split("\n")[0] // Get first line
    }
    return "No description available"
  }

  const getPriceRange = (variations: ProductVariation[]): string => {
    const prices = variations
      .map((v) => v.price || v.Price)
      .filter(Boolean)
      .map((price) => Number.parseFloat((price as string).replace("Rs ", "").replace(",", "")))

    if (prices.length === 0) return "Price on request"

    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    if (minPrice === maxPrice) {
      return `Rs ${minPrice.toFixed(2)}`
    }

    return `Rs ${minPrice.toFixed(2)} - Rs ${maxPrice.toFixed(2)}`
  }

  const getVariationCount = (variations: ProductVariation[]): number => {
    return variations.length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
              <p className="text-gray-600 mt-2">Manage your Berlo product inventory</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="text-sm">
                  {products.length} Products
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {products.reduce((acc, p) => acc + p.variations.length, 0)} Variations
                </Badge>
              </div>
            </div>
            <Button onClick={onAddProduct} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                  <p className="text-gray-600 mb-6">Get started by adding your first product</p>
                  <Button onClick={onAddProduct} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product._id} className="hover:shadow-lg transition-all duration-200 group">
                  <div className="relative">
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <Image
                        src={getProductImage(product) || "/placeholder.svg"}
                        alt={product.productName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-white/90 text-gray-800 hover:bg-white">
                      {product.category}
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2 min-h-[3.5rem]">{product.productName}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
                      {getProductDescription(product)}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Price Range:</span>
                        <span className="font-semibold text-green-600">{getPriceRange(product.variations)}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Variations:</span>
                        <Badge variant="outline" className="text-xs">
                          {getVariationCount(product.variations)} options
                        </Badge>
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(product.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setViewProduct(product)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setEditProduct(product)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Variations</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {products.reduce((acc, p) => acc + p.variations.length, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Badge className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Categories</p>
                    <p className="text-2xl font-bold text-gray-900">{new Set(products.map((p) => p.category)).size}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProductViewModal product={viewProduct} isOpen={!!viewProduct} onClose={() => setViewProduct(null)} />

      <ProductEditModal
        product={editProduct}
        isOpen={!!editProduct}
        onClose={() => setEditProduct(null)}
        onSave={handleProductUpdate}
      />
    </>
  )
}

"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Package, Tag, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ProductVariation {
  [key: string]: string | string[]
}

interface ProductAttribute {
  key: string
  value: string | string[]
}

interface Product {
  _id: string
  productName: string
  category: string
  Common_Atributes: ProductAttribute[]
  variationAttribute?: string
  variationValues?: string[]
  variations: ProductVariation[]
  createdAt: Date
}

interface ProductViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductViewModal({ product, isOpen, onClose }: ProductViewModalProps) {
  if (!product) return null

  const getProductImages = (): string[] => {
    // Look for images in Common_Atributes (note the spelling from your data)
    const imagesAttr = product.Common_Atributes.find((attr) => attr.key === "images" || attr.key === "Product Image")
    if (imagesAttr && Array.isArray(imagesAttr.value)) {
      return imagesAttr.value as string[]
    }
    return []
  }

  const getProductDescription = (): string => {
    // Look for description in Common_Atributes (note the spelling from your data)
    const descAttr = product.Common_Atributes.find((attr) => attr.key === "description" || attr.key === "Description")
    if (descAttr && typeof descAttr.value === "string") {
      return descAttr.value
    }
    return "No description available"
  }

  const getPriceRange = (): string => {
    const prices = product.variations
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

  const renderAttributeValue = (value: string | string[]) => {
    if (Array.isArray(value)) {
      if (value.length === 0) return "No images"
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {value.slice(0, 6).map((img, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
              <Image src={img || "/placeholder.svg"} alt={`Image ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
          {value.length > 6 && (
            <div className="aspect-square rounded-lg border flex items-center justify-center bg-gray-50">
              <span className="text-sm text-gray-500">+{value.length - 6} more</span>
            </div>
          )}
        </div>
      )
    }
    return <span className="text-gray-900">{value}</span>
  }

  const images = getProductImages()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{product.productName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Images */}
          {images.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Product Images
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {images.slice(0, 8).map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                {images.length > 8 && (
                  <div className="aspect-square rounded-lg border flex items-center justify-center bg-gray-50">
                    <span className="text-sm text-gray-500">+{images.length - 8} more</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Product Name</label>
                  <p className="text-gray-900 font-medium">{product.productName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <Badge variant="outline" className="mt-1">
                    {product.category}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Price Range</label>
                  <p className="text-green-600 font-semibold">{getPriceRange()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created Date</label>
                  <p className="text-gray-900 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-line">{getProductDescription()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Attributes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Common Attributes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.Common_Atributes.filter(
                  (attr) =>
                    attr.key !== "description" &&
                    attr.key !== "images" &&
                    attr.key !== "Description" &&
                    attr.key !== "Product Image",
                ).map((attr, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <label className="text-sm font-medium text-gray-500">{attr.key}</label>
                    <div className="mt-1">{renderAttributeValue(attr.value)}</div>
                  </div>
                ))}
                {product.Common_Atributes.filter(
                  (attr) =>
                    attr.key !== "description" &&
                    attr.key !== "images" &&
                    attr.key !== "Description" &&
                    attr.key !== "Product Image",
                ).length === 0 && <p className="text-gray-500 text-center py-4">No additional common attributes</p>}
              </div>
            </CardContent>
          </Card>

          {/* Variations */}
          {product.variations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Product Variations ({product.variations.length})
                </CardTitle>
                {product.variationAttribute && (
                  <p className="text-sm text-gray-600">
                    Variations by: <Badge variant="secondary">{product.variationAttribute}</Badge>
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.variations.map((variation, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="space-y-3">
                        {Object.entries(variation).map(([key, value]) => (
                          <div key={key}>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{key}</label>
                            <div className="mt-1">{renderAttributeValue(value)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{product.variations.length}</p>
                  <p className="text-sm text-blue-600">Variations</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{product.Common_Atributes.length}</p>
                  <p className="text-sm text-green-600">Common Attributes</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{images.length}</p>
                  <p className="text-sm text-purple-600">Images</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{product.variationValues?.length || 0}</p>
                  <p className="text-sm text-orange-600">Variation Values</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

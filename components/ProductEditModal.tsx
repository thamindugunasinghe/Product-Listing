"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import AttributeInput from "./AttributeInput"
import VariationManager from "./VariationManager"
import type { Category, ProductAttribute, ProductVariation } from "@/lib/types"
import { Save, X } from "lucide-react"

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

interface ProductEditModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onSave: (product: Product) => void
}

export default function ProductEditModal({ product, isOpen, onClose, onSave }: ProductEditModalProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [productName, setProductName] = useState("")
  const [commonAttributes, setCommonAttributes] = useState<ProductAttribute[]>([])
  const [variationAttribute, setVariationAttribute] = useState("")
  const [variationValues, setVariationValues] = useState<string[]>([])
  const [variations, setVariations] = useState<ProductVariation[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (product && isOpen) {
      // Populate form with product data
      setProductName(product.productName)
      setCommonAttributes(product.Common_Atributes)
      setVariationAttribute(product.variationAttribute || "")
      setVariationValues(product.variationValues || [])
      setVariations(product.variations)

      // Find and set the category
      const category = categories.find((c) => c.categoryName === product.category)
      setSelectedCategory(category || null)
    }
  }, [product, isOpen, categories])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    const category = categories.find((c) => c._id === categoryId)
    setSelectedCategory(category || null)
  }

  const handleSave = async () => {
    if (!productName.trim() || !selectedCategory) {
      alert("Please fill in product name and select a category")
      return
    }

    if (variationAttribute && variationValues.length === 0) {
      alert("Please add variation values or remove the variation attribute")
      return
    }

    setLoading(true)

    const updatedProduct: Product = {
      ...product!,
      productName: productName,
      category: selectedCategory.categoryName,
      Common_Atributes: commonAttributes,
      variationAttribute: variationAttribute || undefined,
      variationValues: variationValues.length > 0 ? variationValues : undefined,
      variations,
    }

    try {
      const response = await fetch(`/api/products/${product!._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })

      if (response.ok) {
        onSave(updatedProduct)
        onClose()
        alert("Product updated successfully!")
      } else {
        throw new Error("Failed to update product")
      }
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Error updating product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    // Reset form when closing
    setProductName("")
    setCommonAttributes([])
    setVariationAttribute("")
    setVariationValues([])
    setVariations([])
    setSelectedCategory(null)
    onClose()
  }

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Edit Product</DialogTitle>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outline" onClick={handleClose}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 pr-4">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter product name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={selectedCategory?._id || ""} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.categoryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Common Attributes */}
            {selectedCategory && (
              <AttributeInput
                title="Common Attributes"
                availableAttributes={selectedCategory.attributes}
                attributes={commonAttributes}
                onAttributesChange={setCommonAttributes}
              />
            )}

            {/* Variation Management */}
            {selectedCategory && (
              <VariationManager
                availableAttributes={selectedCategory.attributes}
                variationAttribute={variationAttribute}
                onVariationAttributeChange={setVariationAttribute}
                variationValues={variationValues}
                onVariationValuesChange={setVariationValues}
                variations={variations}
                onVariationsChange={setVariations}
              />
            )}

            {!selectedCategory && (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-gray-500">
                    <p>Please select a category to configure product attributes and variations</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AttributeInput from "./AttributeInput"
import type { Category, Product, ProductAttribute } from "@/lib/types"
import { ArrowLeft, Save } from "lucide-react"

interface ProductFormProps {
  onBack: () => void
  onSave: (product: Product) => void
}

export default function ProductForm({ onBack, onSave }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [productName, setProductName] = useState("")
  const [commonAttributes, setCommonAttributes] = useState<ProductAttribute[]>([])
  const [variationAttributes, setVariationAttributes] = useState<ProductAttribute[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

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
    // Reset attributes when category changes
    setCommonAttributes([])
    setVariationAttributes([])
  }

  const handleSave = async () => {
    if (!productName.trim() || !selectedCategory) {
      alert("Please fill in product name and select a category")
      return
    }

    setLoading(true)

    const product: Product = {
      name: productName,
      categoryId: selectedCategory._id,
      categoryName: selectedCategory.categoryName,
      commonAttributes,
      variationAttributes,
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })

      if (response.ok) {
        onSave(product)
        alert("Product saved successfully!")
      } else {
        throw new Error("Failed to save product")
      }
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Error saving product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          </div>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Product"}
          </Button>
        </div>

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
              <Select onValueChange={handleCategoryChange}>
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

        {/* Attributes Sections */}
        {selectedCategory && (
          <>
            <AttributeInput
              title="Common Attributes"
              availableAttributes={selectedCategory.attributes}
              attributes={commonAttributes}
              onAttributesChange={setCommonAttributes}
            />

            <AttributeInput
              title="Variation Attributes"
              availableAttributes={selectedCategory.attributes}
              attributes={variationAttributes}
              onAttributesChange={setVariationAttributes}
            />
          </>
        )}

        {!selectedCategory && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-500">
                <p>Please select a category to configure product attributes</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

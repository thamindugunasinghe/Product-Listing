"use client"

import { useState } from "react"
import { Plus, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ImageUpload from "./ImageUpload"
import type { Attribute, ProductVariation } from "@/lib/types"

interface VariationManagerProps {
  availableAttributes: Attribute[]
  variationAttribute: string
  onVariationAttributeChange: (attribute: string) => void
  variationValues: string[]
  onVariationValuesChange: (values: string[]) => void
  variations: ProductVariation[]
  onVariationsChange: (variations: ProductVariation[]) => void
}

export default function VariationManager({
  availableAttributes,
  variationAttribute,
  onVariationAttributeChange,
  variationValues,
  onVariationValuesChange,
  variations,
  onVariationsChange,
}: VariationManagerProps) {
  const [newVariationValue, setNewVariationValue] = useState("")
  const [editingVariation, setEditingVariation] = useState<number | null>(null)

  const addVariationValue = () => {
    if (newVariationValue.trim() && !variationValues.includes(newVariationValue.trim())) {
      const newValues = [...variationValues, newVariationValue.trim()]
      onVariationValuesChange(newValues)
      setNewVariationValue("")

      // Generate variations for the new value
      generateVariationsForNewValue(newVariationValue.trim())
    }
  }

  const removeVariationValue = (valueToRemove: string) => {
    const newValues = variationValues.filter((value) => value !== valueToRemove)
    onVariationValuesChange(newValues)

    // Remove variations with this value
    const newVariations = variations.filter((variation) => variation[variationAttribute] !== valueToRemove)
    onVariationsChange(newVariations)
  }

  const generateVariationsForNewValue = (newValue: string) => {
    // Create a basic variation with just the variation attribute
    const newVariation: ProductVariation = {
      [variationAttribute]: newValue,
    }
    onVariationsChange([...variations, newVariation])
  }

  const addAttributeToVariation = (variationIndex: number, attributeKey: string) => {
    const selectedAttribute = availableAttributes.find((attr) => attr.key === attributeKey)
    if (!selectedAttribute) return

    const updatedVariations = variations.map((variation, i) => {
      if (i === variationIndex) {
        return {
          ...variation,
          [attributeKey]: selectedAttribute.type === "Image" ? [] : "",
        }
      }
      return variation
    })
    onVariationsChange(updatedVariations)
  }

  const removeAttributeFromVariation = (variationIndex: number, attributeKey: string) => {
    const updatedVariations = variations.map((variation, i) => {
      if (i === variationIndex) {
        const { [attributeKey]: removed, ...rest } = variation
        return rest
      }
      return variation
    })
    onVariationsChange(updatedVariations)
  }

  const updateVariation = (index: number, key: string, value: string | File[]) => {
    const updatedVariations = variations.map((variation, i) => {
      if (i === index) {
        return { ...variation, [key]: value }
      }
      return variation
    })
    onVariationsChange(updatedVariations)
  }

  const removeVariation = (index: number) => {
    const newVariations = variations.filter((_, i) => i !== index)
    onVariationsChange(newVariations)
  }

  const getAttributeType = (key: string): "String" | "Number" | "Image" => {
    const attr = availableAttributes.find((a) => a.key === key)
    return attr?.type || "String"
  }

  const getAvailableAttributesForVariation = (variation: ProductVariation) => {
    const usedKeys = Object.keys(variation)
    return availableAttributes.filter((attr) => !usedKeys.includes(attr.key))
  }

  const renderVariationInput = (variation: ProductVariation, variationIndex: number, attributeKey: string) => {
    const attributeType = getAttributeType(attributeKey)
    const value = variation[attributeKey] || ""

    if (attributeType === "Image") {
      return (
        <ImageUpload
          onImagesChange={(files) => updateVariation(variationIndex, attributeKey, files)}
          existingImages={Array.isArray(value) ? (value as string[]) : []}
        />
      )
    }

    return (
      <Input
        type={attributeType === "Number" ? "number" : "text"}
        value={value as string}
        onChange={(e) => updateVariation(variationIndex, attributeKey, e.target.value)}
        placeholder={`Enter ${attributeKey.toLowerCase()}`}
      />
    )
  }

  return (
    <div className="space-y-6 p-6 bg-white border rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Product Variations</h3>
      </div>

      {/* Variation Attribute Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Variation Attribute</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Select which attribute creates variations</Label>
            <Select value={variationAttribute} onValueChange={onVariationAttributeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose variation attribute" />
              </SelectTrigger>
              <SelectContent>
                {availableAttributes.map((attr) => (
                  <SelectItem key={attr.key} value={attr.key}>
                    {attr.key} ({attr.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {variationAttribute && (
            <div>
              <Label>Variation Values</Label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newVariationValue}
                  onChange={(e) => setNewVariationValue(e.target.value)}
                  placeholder={`Add ${variationAttribute.toLowerCase()} value`}
                  onKeyPress={(e) => e.key === "Enter" && addVariationValue()}
                />
                <Button type="button" onClick={addVariationValue} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {variationValues.map((value, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {value}
                    <button
                      type="button"
                      onClick={() => removeVariationValue(value)}
                      className="ml-1 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Variations List */}
      {variationAttribute && variations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Variation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {variations.map((variation, variationIndex) => (
              <div key={variationIndex} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">
                    {variationAttribute}: {variation[variationAttribute]}
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingVariation(editingVariation === variationIndex ? null : variationIndex)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVariation(variationIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {(editingVariation === variationIndex || editingVariation === null) && (
                  <div className="space-y-4">
                    {/* Add Attribute Dropdown */}
                    {getAvailableAttributesForVariation(variation).length > 0 && (
                      <div className="flex items-center gap-2 p-3 bg-white rounded border-dashed border-2">
                        <Select onValueChange={(value) => addAttributeToVariation(variationIndex, value)}>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Add an attribute to this variation" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableAttributesForVariation(variation).map((attr) => (
                              <SelectItem key={attr.key} value={attr.key}>
                                {attr.key} ({attr.type})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button type="button" variant="outline" size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {/* Existing Attributes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.keys(variation)
                        .filter((key) => key !== variationAttribute)
                        .map((attributeKey) => {
                          const attribute = availableAttributes.find((attr) => attr.key === attributeKey)
                          return (
                            <div key={attributeKey} className="space-y-2 p-3 border rounded bg-white">
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">{attributeKey}</Label>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeAttributeFromVariation(variationIndex, attributeKey)}
                                  className="text-red-600 hover:text-red-800 h-6 w-6 p-0"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                              {renderVariationInput(variation, variationIndex, attributeKey)}
                              {attribute && <p className="text-xs text-gray-600">{attribute.description}</p>}
                            </div>
                          )
                        })}
                    </div>

                    {Object.keys(variation).length === 1 && (
                      <div className="text-center py-4 text-gray-500">
                        <p>No additional attributes added. Use the dropdown above to add attributes.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {variationAttribute && variationValues.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Add variation values to create product variations</p>
        </div>
      )}
    </div>
  )
}

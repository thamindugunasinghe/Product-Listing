"use client"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUpload from "./ImageUpload"
import type { Attribute, ProductAttribute } from "@/lib/types"

interface AttributeInputProps {
  title: string
  availableAttributes: Attribute[]
  attributes: ProductAttribute[]
  onAttributesChange: (attributes: ProductAttribute[]) => void
}

export default function AttributeInput({
  title,
  availableAttributes,
  attributes,
  onAttributesChange,
}: AttributeInputProps) {
  const addAttribute = () => {
    const newAttribute: ProductAttribute = {
      key: "",
      value: "",
      type: "String",
    }
    onAttributesChange([...attributes, newAttribute])
  }

  const removeAttribute = (index: number) => {
    onAttributesChange(attributes.filter((_, i) => i !== index))
  }

  const updateAttribute = (index: number, field: keyof ProductAttribute, value: any) => {
    const updatedAttributes = attributes.map((attr, i) => {
      if (i === index) {
        const selectedAttr = availableAttributes.find((a) => a.key === value)
        if (field === "key" && selectedAttr) {
          return {
            ...attr,
            key: value,
            type: selectedAttr.type,
            value: selectedAttr.type === "Image" ? [] : "",
          }
        }
        return { ...attr, [field]: value }
      }
      return attr
    })
    onAttributesChange(updatedAttributes)
  }

  return (
    <div className="space-y-4 p-6 bg-white border rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Button type="button" onClick={addAttribute} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Attribute
        </Button>
      </div>

      {attributes.map((attribute, index) => (
        <div key={index} className="space-y-3 p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Attribute {index + 1}</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeAttribute(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`attribute-${index}`} className="text-sm">
                Select Attribute
              </Label>
              <Select value={attribute.key} onValueChange={(value) => updateAttribute(index, "key", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an attribute" />
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

            <div>
              <Label className="text-sm">Value</Label>
              {attribute.type === "Image" ? (
                <ImageUpload onImagesChange={(files) => updateAttribute(index, "value", files)} />
              ) : (
                <Input
                  type={attribute.type === "Number" ? "number" : "text"}
                  value={attribute.value as string}
                  onChange={(e) => updateAttribute(index, "value", e.target.value)}
                  placeholder={`Enter ${attribute.key.toLowerCase()}`}
                />
              )}
            </div>
          </div>

          {attribute.key && (
            <p className="text-xs text-gray-600">
              {availableAttributes.find((a) => a.key === attribute.key)?.description}
            </p>
          )}
        </div>
      ))}

      {attributes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No attributes added yet. Click "Add Attribute" to get started.</p>
        </div>
      )}
    </div>
  )
}

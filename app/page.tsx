"use client"

import { useState } from "react"
import ProductList from "@/components/ProductList"
import ProductForm from "@/components/ProductForm"
import type { Product } from "@/lib/types"

export default function Home() {
  const [showForm, setShowForm] = useState(false)

  const handleAddProduct = () => {
    setShowForm(true)
  }

  const handleBack = () => {
    setShowForm(false)
  }

  const handleSave = (product: Product) => {
    // Product saved successfully, go back to list
    setShowForm(false)
  }

  return (
    <>
      {showForm ? (
        <ProductForm onBack={handleBack} onSave={handleSave} />
      ) : (
        <ProductList onAddProduct={handleAddProduct} />
      )}
    </>
  )
}

import { NextResponse } from "next/server"

// Mock data based on your database structure
const mockCategories = [
  {
    _id: "67f6215a88851211c4a6f1a4",
    categoryName: "Bubble Tea",
    attributes: [
      {
        key: "Price",
        type: "Number",
        description: "Product price in LKR",
      },
      {
        key: "Product Image",
        type: "Image",
        description: "Product images",
      },
      {
        key: "Description",
        type: "String",
        description: "Product description",
      },
      {
        key: "Flavor",
        type: "String",
        description: "Product Flavor",
      },
      {
        key: "Weight",
        type: "String",
        description: "Product Weight",
      },
      {
        key: "Pack Size",
        type: "String",
        description: "Packaging Size",
      },
      {
        key: "Variation Image",
        type: "Image",
        description: "Variation images",
      },
      {
        key: "Product Note",
        type: "String",
        description: "Special Notes",
      },
    ],
  },
  {
    _id: "67f6215a88851211c4a6f1a5",
    categoryName: "Coconut Product",
    attributes: [
      {
        key: "Price",
        type: "Number",
        description: "Product price in LKR",
      },
      {
        key: "Product Image",
        type: "Image",
        description: "Product images",
      },
      {
        key: "Description",
        type: "String",
        description: "Product description",
      },
      {
        key: "Weight",
        type: "String",
        description: "Product Weight",
      },
    ],
  },
  {
    _id: "67f6215a88851211c4a6f1a6",
    categoryName: "Accessories",
    attributes: [
      {
        key: "Price",
        type: "Number",
        description: "Product price in LKR",
      },
      {
        key: "Product Image",
        type: "Image",
        description: "Product images",
      },
      {
        key: "Description",
        type: "String",
        description: "Product description",
      },
      {
        key: "Cup Type",
        type: "String",
        description: "Cup type",
      },
      {
        key: "Variation Image",
        type: "Image",
        description: "Variation Images",
      },
      {
        key: "Product Note",
        type: "String",
        description: "Special Notes",
      },
    ],
  },
]

export async function GET() {
  try {
    // In a real application, you would fetch from your database
    // const categories = await db.collection('metadata').find({}).toArray();
    return NextResponse.json(mockCategories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

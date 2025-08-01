import { type NextRequest, NextResponse } from "next/server"

// Mock database with comprehensive product data
const products = [
  {
    id: "1",
    productName: "Berlo Popping Boba Bubbles",
    category: "Bubble Tea",
    Common_Atributes: [
      {
        key: "description",
        value:
          "Makes every sip an adventure.\nBursting with delicious flavors.\nPerfect for adding a playful twist to your favorite drinks.",
      },
      {
        key: "images",
        value: [
          "https://berloproducts.com/wp-content/uploads/Berlo-Popping-BOBA-Bubbles-1.webp",
          "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Apple-Flavour.webp",
          "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Blueberry-Flavour.webp",
          "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Chocolate-Flavour.webp",
          "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Coffee-Flavour.webp",
          "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Mango-Flavour.webp",
          "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Passion-Flavour.webp",
          "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Strawberry-Flavour.webp",
        ],
      },
    ],
    variationAttribute: "flavor",
    variationValues: ["Apple", "Blueberry", "Chocolate", "Coffee", "Mango", "Mint", "Passion Fruit", "Strawberry"],
    variation: true,
    variations: [
      {
        flavor: "Apple",
        weight: "250g",
        price: "Rs 1350.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Apple-Flavour-250g.webp",
      },
      {
        flavor: "Blueberry",
        weight: "250g",
        price: "Rs 1350.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Blueberry-Flavour-250g.webp",
      },
      {
        flavor: "Chocolate",
        weight: "250g",
        price: "Rs 1350.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Chocolate-Flavour-250g.webp",
      },
      {
        flavor: "Coffee",
        weight: "250g",
        price: "Rs 1350.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Coffee-Flavour-250g.webp",
      },
      {
        flavor: "Mango",
        weight: "250g",
        price: "Rs 1350.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Mango-Flavour-250g.webp",
      },
      {
        flavor: "Mint",
        weight: "250g",
        price: "Rs 1350.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Mint-Flavour-250g.webp",
      },
      {
        flavor: "Passion Fruit",
        weight: "250g",
        price: "Rs 1350.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Pssion-Flavour-250g.webp",
      },
      {
        flavor: "Strawberry",
        weight: "250g",
        price: "Rs 1350.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Strawberry-Flavour-250g.webp",
      },
      {
        flavor: "Apple",
        weight: "500g",
        price: "Rs 2250.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Apple-Flavour-500g.webp",
      },
      {
        flavor: "Blueberry",
        weight: "500g",
        price: "Rs 2250.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Blueberry-Flavour-500g.webp",
      },
      {
        flavor: "Chocolate",
        weight: "500g",
        price: "Rs 2250.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Chocolate-Flavour-500g.webp",
      },
      {
        flavor: "Coffee",
        weight: "500g",
        price: "Rs 2250.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Coffee-Flavour-500g.webp",
      },
      {
        flavor: "Mango",
        weight: "500g",
        price: "Rs 2250.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Mango-Flavour-500g.webp",
      },
      {
        flavor: "Mint",
        weight: "500g",
        price: "Rs 2250.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Mint-Flavour-500g.webp",
      },
      {
        flavor: "Passion Fruit",
        weight: "500g",
        price: "Rs 2250.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Pssion-Flavour-500g.webp",
      },
      {
        flavor: "Strawberry",
        weight: "500g",
        price: "Rs 2250.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Strawberry-Flavour-500g.webp",
      },
      {
        flavor: "Apple",
        weight: "1 kg",
        price: "Rs 4200.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Apple-Flavour-1kg.webp",
      },
      {
        flavor: "Blueberry",
        weight: "1 kg",
        price: "Rs 4200.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Blueberry-Flavour-1kg.webp",
      },
      {
        flavor: "Chocolate",
        weight: "1 kg",
        price: "Rs 4200.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Chocolate-Flavour-1kg.webp",
      },
      {
        flavor: "Coffee",
        weight: "1 kg",
        price: "Rs 4200.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Coffee-Flavour-1kg.webp",
      },
      {
        flavor: "Mango",
        weight: "1 kg",
        price: "Rs 4200.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Mango-Flavour-1kg.webp",
      },
      {
        flavor: "Mint",
        weight: "1 kg",
        price: "Rs 4200.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Mint-Flavour-1kg.webp",
      },
      {
        flavor: "Passion Fruit",
        weight: "1 kg",
        price: "Rs 4200.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Pssion-Flavour-1kg.webp",
      },
      {
        flavor: "Strawberry",
        weight: "1 kg",
        price: "Rs 4200.00",
        image: "https://berloproducts.com/wp-content/uploads/Popping-BOBA-Strawberry-Flavour-1kg.webp",
      },
    ],
  },
  {
    id: "2",
    productName: "Berlo Tapioca Pearls",
    category: "Bubble Tea",
    Common_Atributes: [
      {
        key: "description",
        value:
          "Crafted with the finest ingredients.\nAdd a delightful chewy texture to drinks.\nPerfect for bubble tea, milkshakes, or smoothies.",
      },
      {
        key: "images",
        value: ["https://berloproducts.com/wp-content/uploads/Black-Tapioca-Perls.webp"],
      },
    ],
    variationAttribute: "flavor",
    variationValues: ["Black", "Cardamom", "Chocolate", "Passion Fruit", "Rose", "Strawberry"],
    variation: true,
    variations: [
      {
        flavor: "Black",
        weight: "250g",
        price: "Rs 1000.00",
        image: "https://berloproducts.com/wp-content/uploads/Black-Tapioca-Perls.webp",
        note: "This package allows you to prepare 10 delicious cups of bubble tea. You'll also receive 10 straws absolutely FREE!",
      },
      {
        flavor: "Cardamom",
        weight: "250g",
        price: "Rs 1000.00",
        image: "https://berloproducts.com/wp-content/uploads/Cardamom-Tapioca-Pearls.webp",
        note: "This package allows you to prepare 10 delicious cups of bubble tea. You'll also receive 10 straws absolutely FREE!",
      },
      {
        flavor: "Chocolate",
        weight: "250g",
        price: "Rs 1000.00",
        image: "https://berloproducts.com/wp-content/uploads/Chocolate-Tapioca-Pearls.webp",
        note: "This package allows you to prepare 10 delicious cups of bubble tea. You'll also receive 10 straws absolutely FREE!",
      },
      {
        flavor: "Passion Fruit",
        weight: "250g",
        price: "Rs 1000.00",
        image: "https://berloproducts.com/wp-content/uploads/Passion-Fruit-Tapioca-Pearls.webp",
        note: "This package allows you to prepare 10 delicious cups of bubble tea. You'll also receive 10 straws absolutely FREE!",
      },
      {
        flavor: "Rose",
        weight: "250g",
        price: "Rs 1000.00",
        image: "https://berloproducts.com/wp-content/uploads/Rose-Tapioca-Pearls.webp",
        note: "This package allows you to prepare 10 delicious cups of bubble tea. You'll also receive 10 straws absolutely FREE!",
      },
      {
        flavor: "Strawberry",
        weight: "250g",
        price: "Rs 1000.00",
        image: "https://berloproducts.com/wp-content/uploads/Strawberry-Tapioca-Pearls.webp",
        note: "This package allows you to prepare 10 delicious cups of bubble tea. You'll also receive 10 straws absolutely FREE!",
      },
      {
        flavor: "Black",
        weight: "500g",
        price: "Rs 1950.00",
        image: "https://berloproducts.com/wp-content/uploads/Black-Tapioca-Perls.webp",
        note: "This package allows you to prepare 20 delicious cups of bubble tea. You'll also receive 20 straws absolutely FREE!",
      },
      {
        flavor: "Cardamom",
        weight: "500g",
        price: "Rs 1950.00",
        image: "https://berloproducts.com/wp-content/uploads/Cardamom-Tapioca-Pearls.webp",
        note: "This package allows you to prepare 20 delicious cups of bubble tea. You'll also receive 20 straws absolutely FREE!",
      },
      {
        flavor: "Chocolate",
        weight: "500g",
        price: "Rs 1950.00",
        image: "https://berloproducts.com/wp-content/uploads/Chocolate-Tapioca-Pearls.webp",
        note: "This package allows you to prepare 20 delicious cups of bubble tea. You'll also receive 20 straws absolutely FREE!",
      },
      {
        flavor: "Passion Fruit",
        weight: "500g",
        price: "Rs 1950.00",
        image: "https://berloproducts.com/wp-content/uploads/Passion-Fruit-Tapioca-Pearls.webp",
        note: "This package allows you to prepare 20 delicious cups of bubble tea. You'll also receive 20 straws absolutely FREE!",
      },
      {
        flavor: "Rose",
        weight: "500g",
        price: "Rs 1950.00",
        image: "https://berloproducts.com/wp-content/uploads/Rose-Tapioca-Pearls.webp",
        note: "This package allows you to prepare 20 delicious cups of bubble tea. You'll also receive 20 straws absolutely FREE!",
      },
      {
        flavor: "Strawberry",
        weight: "500g",
        price: "Rs 1000.00",
        image: "https://berloproducts.com/wp-content/uploads/Strawberry-Tapioca-Pearls.webp",
        note: "This package allows you to prepare 20 delicious cups of bubble tea. You'll also receive 20 straws absolutely FREE!",
      },
      {
        flavor: "Black",
        weight: "1 kg",
        price: "Rs 3800.00",
        image: "https://berloproducts.com/wp-content/uploads/Black-Tapioca-Perls.webp",
        note: "This package allows you to prepare 40 delicious cups of bubble tea. You'll also receive 40 straws absolutely FREE!",
      },
    ],
  },
  {
    id: "3",
    productName: "Berlo Instant Tapioca Pearls",
    category: "Bubble Tea",
    Common_Atributes: [
      {
        key: "description",
        value:
          "Ready in Just 2 Minutes. Say goodbye to long boiling times.\nExperience the ultimate convenience in bubble tea preparation.\nNo complicated steps. Just cook and enjoy.\nIdeal for busy lifestyles.",
      },
      {
        key: "images",
        value: ["https://berloproducts.com/wp-content/uploads/Intanat-tapioca-1.webp"],
      },
    ],
    variationAttribute: "packSize",
    variationValues: ["Single Portion (50g)", "Family Pack (10 Portions - Single Pack)"],
    variation: true,
    variations: [
      {
        packSize: "Single Portion (50g)",
        price: "Rs 120.00",
      },
      {
        packSize: "Family Pack (10 Portions - Single Pack)",
        price: "Rs 1000.00",
      },
    ],
  },
  {
    id: "4",
    productName: "Berlo Premium Coconut Jelly Cube",
    category: "Coconut Product",
    Common_Atributes: [
      {
        key: "description",
        value:
          "Authentic nata de coco – Traditional fermentation process\nVersatile use – Perfect for bubble tea, smoothies, and fruit salads\nReady to eat – No preparation required\nLow fat and calories – Guilt-free dessert addition\nRaw flavor – Natural coconut taste without artificial additives.",
      },
      {
        key: "images",
        value: [
          "https://berloproducts.com/wp-content/uploads/nata-de-coco-product-image-1.webp",
          "https://berloproducts.com/wp-content/uploads/nata-de-coco-product-image-2.webp",
        ],
      },
    ],
    variationAttribute: "weight",
    variationValues: ["250g", "500g", "1 kg"],
    variation: true,
    variations: [
      {
        weight: "250g",
        price: "Rs 1000.00",
      },
      {
        weight: "500g",
        price: "Rs 1800.00",
      },
      {
        weight: "1 kg",
        price: "Rs 3200.00",
      },
    ],
  },
  {
    id: "5",
    productName: "Premium Drinking Cups",
    category: "Accessories",
    Common_Atributes: [
      {
        key: "description",
        value: "330 ml drinking cups",
      },
      {
        key: "images",
        value: [
          "https://berloproducts.com/wp-content/uploads/Drinking-Cup-1.webp",
          "https://berloproducts.com/wp-content/uploads/Drinking-Cup-2.webp",
        ],
      },
    ],
    variationAttribute: "cupType",
    variationValues: ["Without Logo", "With Berlo Logo", "With Your Brand Logo"],
    variation: true,
    variations: [
      {
        cupType: "Without Logo",
        price: "Rs 30.00",
        image: "https://berloproducts.com/wp-content/uploads/Drinking-Cup-4.webp",
      },
      {
        cupType: "With Berlo Logo",
        price: "Rs 30.00",
        image: "https://berloproducts.com/wp-content/uploads/Drinking-Cup-3.webp",
      },
      {
        cupType: "With Your Brand Logo",
        note: "Send us your logo. We will contact you within 12 hours.",
      },
    ],
  },
]

export async function GET() {
  try {
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const product = await request.json()

    // Add ID and timestamp
    const newProduct = {
      ...product,
      id: (products.length + 1).toString(),
      createdAt: new Date().toISOString(),
    }

    products.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

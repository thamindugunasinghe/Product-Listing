import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const productData = await request.json()

    // In a real application, you would save to your database
    // const result = await db.collection('products').insertOne(productData);

    console.log("Product saved:", productData)

    return NextResponse.json({
      success: true,
      message: "Product saved successfully",
      productId: "mock-id-" + Date.now(),
    })
  } catch (error) {
    console.error("Error saving product:", error)
    return NextResponse.json({ error: "Failed to save product" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Your actual product data with the new structure
    const products = [
      {
        _id: "1",
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
            ],
          },
        ],
        variationAttribute: "flavor",
        variationValues: ["Apple", "Blueberry", "Chocolate", "Coffee", "Mango", "Mint", "Passion Fruit", "Strawberry"],
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
        ],
        createdAt: new Date("2024-01-15"),
      },
      {
        _id: "2",
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
        ],
        createdAt: new Date("2024-01-14"),
      },
      {
        _id: "3",
        productName: "Berlo Instant Tapioca Pearls",
        category: "Bubble Tea",
        Common_Atributes: [
          {
            key: "description",
            value:
              "Ready in Just 2 Minutes. Say goodbye to long boiling times.\nExperience the ultimate convenience in bubble tea preparation.",
          },
          {
            key: "images",
            value: ["https://berloproducts.com/wp-content/uploads/Intanat-tapioca-1.webp"],
          },
        ],
        variations: [
          {
            price: "Rs 120.00",
            packSize: "Single Portion (50g)",
          },
          {
            price: "Rs 1000.00",
            packSize: "Family Pack (10 Portions - Single Pack)",
          },
        ],
        createdAt: new Date("2024-01-13"),
      },
      {
        _id: "4",
        productName: "Berlo Premium Coconut Jelly Cube",
        category: "Coconut Product",
        Common_Atributes: [
          {
            key: "description",
            value:
              "Authentic nata de coco – Traditional fermentation process\nVersatile use – Perfect for bubble tea, smoothies, and fruit salads",
          },
          {
            key: "images",
            value: [
              "https://berloproducts.com/wp-content/uploads/nata-de-coco-product-image-1.webp",
              "https://berloproducts.com/wp-content/uploads/nata-de-coco-product-image-2.webp",
            ],
          },
        ],
        variations: [
          {
            weight: "250g",
            price: "Rs 1000.00",
          },
          {
            weight: "500g",
            price: "Rs 1800.00",
          },
        ],
        createdAt: new Date("2024-01-12"),
      },
      {
        _id: "5",
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
        createdAt: new Date("2024-01-11"),
      },
    ]

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}


import { PrismaClient, UserRole, VerificationStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create demo admin user
  const adminPassword = await bcrypt.hash('johndoe123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: adminPassword,
      name: 'John Doe',
      role: UserRole.ADMIN,
      phone: '+44 123 456 7890',
      location: 'London, UK',
      emailVerified: new Date(),
      phoneVerified: true,
      isActive: true
    }
  })

  // Create sample categories
  const categories = [
    {
      name: 'Fashion & Textiles',
      slug: 'fashion-textiles',
      description: 'Authentic African clothing, fabrics, and accessories including Ankara, Kente, Dashiki, and traditional wear',
      imageUrl: 'https://i.pinimg.com/originals/48/c6/ce/48c6ce2bc13ba1140facbf5865114d1a.jpg',
      sortOrder: 1
    },
    {
      name: 'Food & Groceries',
      slug: 'food-groceries',
      description: 'Traditional African spices, ingredients, and delicacies including Jollof rice ingredients, palm oil, and more',
      imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop',
      sortOrder: 2
    },
    {
      name: 'Artisan Crafts',
      slug: 'artisan-crafts',
      description: 'Handmade pottery, jewelry, sculptures, and traditional African artwork',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      sortOrder: 3
    },
    {
      name: 'Media & Culture',
      slug: 'media-culture',
      description: 'African books, music, films, and cultural content celebrating heritage',
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
      sortOrder: 4
    },
    {
      name: 'Services',
      slug: 'services',
      description: 'Cultural consulting, language tutoring, event planning, and professional services',
      imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
      sortOrder: 5
    },
    {
      name: 'Beauty & Wellness',
      slug: 'beauty-wellness',
      description: 'Natural skincare, hair care, shea butter, black soap, and wellness products',
      imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
      sortOrder: 6
    },
    {
      name: 'Hardware & Machinery',
      slug: 'hardware-machinery',
      description: 'Vehicles, computers, generators, electronics, industrial equipment, and machinery for home and business',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      sortOrder: 7
    },
    {
      name: 'Business Opportunities',
      slug: 'business-opportunities',
      description: 'Investment opportunities, real estate in Africa, franchise partnerships, and business ventures',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      sortOrder: 8
    }
  ]

  const createdCategories = []
  for (const categoryData of categories) {
    const category = await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: {},
      create: categoryData
    })
    createdCategories.push(category)
    console.log(`Created category: ${category.name}`)
  }

  // Create sample sellers
  const sellers = [
    {
      email: 'amara@textiles.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Amara Okafor',
      role: UserRole.SELLER,
      phone: '+44 207 123 4567',
      location: 'London, UK',
      businessName: 'Amara Textiles',
      businessDescription: 'Authentic African fabrics and traditional clothing',
      businessType: 'Fashion & Textiles'
    },
    {
      email: 'kwame@heritage.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Kwame Asante',
      role: UserRole.SELLER,
      phone: '+44 161 234 5678',
      location: 'Manchester, UK',
      businessName: 'Heritage Crafts',
      businessDescription: 'Traditional African woodwork and sculptures',
      businessType: 'Artisan Crafts'
    },
    {
      email: 'fatima@kitchen.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Fatima Al-Hassan',
      role: UserRole.SELLER,
      phone: '+44 121 345 6789',
      location: 'Birmingham, UK',
      businessName: 'Mama\'s Kitchen',
      businessDescription: 'Authentic African spices and cooking ingredients',
      businessType: 'Food & Groceries'
    },
    {
      email: 'adaora@natural.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Adaora Ikenna',
      role: UserRole.SELLER,
      phone: '+44 113 456 7890',
      location: 'Leeds, UK',
      businessName: 'Natural Roots',
      businessDescription: 'Premium shea butter and natural African beauty products',
      businessType: 'Beauty & Wellness'
    }
  ]

  const createdSellers = []
  for (const sellerData of sellers) {
    const { businessName, businessDescription, businessType, ...userData } = sellerData
    
    const seller = await prisma.user.upsert({
      where: { email: sellerData.email },
      update: {},
      create: {
        ...userData,
        emailVerified: new Date(),
        phoneVerified: true,
        isActive: true
      }
    })

    // Create seller profile
    const sellerProfile = await prisma.sellerProfile.upsert({
      where: { userId: seller.id },
      update: {},
      create: {
        userId: seller.id,
        businessName,
        businessDescription,
        businessType,
        verificationStatus: VerificationStatus.VERIFIED,
        emailVerified: true,
        phoneVerified: true,
        documentsUploaded: true,
        adminApproved: true,
        emailVerifiedAt: new Date(),
        phoneVerifiedAt: new Date(),
        documentsUploadedAt: new Date(),
        adminApprovedAt: new Date(),
        reviewedBy: admin.id,
        reviewedAt: new Date()
      }
    })

    createdSellers.push({ user: seller, profile: sellerProfile })
    console.log(`Created seller: ${seller.name}`)
  }

  // Create sample products
  const products = [
    {
      title: 'Authentic Ankara Fabric Set',
      description: 'Beautiful hand-woven Ankara fabric perfect for traditional wear. High-quality cotton with vibrant African patterns. Available in multiple colors and designs.',
      price: 45.99,
      condition: 'New',
      location: 'London, UK',
      categorySlug: 'fashion-textiles',
      sellerEmail: 'amara@textiles.com',
      brand: 'Amara Textiles',
      color: 'Multi-color',
      size: '6 yards',
      isPromoted: true,
      images: [
        {
          url: 'https://i.pinimg.com/originals/d9/87/65/d9876528e73af2f8b24a245cc91247d7.jpg',
          alt: 'Colorful Ankara fabric with traditional patterns'
        }
      ]
    },
    {
      title: 'Hand-Carved Wooden Sculpture',
      description: 'Intricate wooden sculpture depicting African heritage and traditions. Handcrafted by skilled artisans using traditional techniques.',
      price: 125.00,
      condition: 'New',
      location: 'Manchester, UK',
      categorySlug: 'artisan-crafts',
      sellerEmail: 'kwame@heritage.com',
      brand: 'Heritage Crafts',
      dimensions: '30cm x 15cm x 10cm',
      isPromoted: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
          alt: 'Traditional African wooden sculpture'
        }
      ]
    },
    {
      title: 'Jollof Rice Spice Kit',
      description: 'Complete spice kit for authentic West African jollof rice. Includes all necessary spices and detailed recipe instructions.',
      price: 18.99,
      condition: 'New',
      location: 'Birmingham, UK',
      categorySlug: 'food-groceries',
      sellerEmail: 'fatima@kitchen.com',
      brand: 'Mama\'s Kitchen',
      weight: '500g',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop',
          alt: 'African spices for jollof rice'
        }
      ]
    },
    {
      title: 'Premium Shea Butter Collection',
      description: 'Pure, unrefined shea butter imported directly from Ghana. Perfect for natural skincare and hair care routines.',
      price: 28.50,
      condition: 'New',
      location: 'Leeds, UK',
      categorySlug: 'beauty-wellness',
      sellerEmail: 'adaora@natural.com',
      brand: 'Natural Roots',
      weight: '250g',
      isPromoted: false,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
          alt: 'Natural shea butter beauty products'
        }
      ]
    },
    {
      title: 'Traditional Kente Cloth',
      description: 'Handwoven Kente cloth with traditional patterns and colors. Perfect for special occasions and cultural celebrations.',
      price: 199.99,
      condition: 'New',
      location: 'London, UK',
      categorySlug: 'fashion-textiles',
      sellerEmail: 'amara@textiles.com',
      brand: 'Amara Textiles',
      color: 'Gold and Black',
      size: '4 yards',
      isPromoted: true,
      images: [
        {
          url: 'https://i.pinimg.com/originals/2c/4f/a2/2c4fa2387be31a33b43f97cada597caf.png',
          alt: 'Traditional Kente cloth with African patterns'
        }
      ]
    },
    {
      title: 'African Literature Collection',
      description: 'Curated selection of contemporary African literature featuring works by renowned African authors.',
      price: 89.99,
      condition: 'New',
      location: 'Bristol, UK',
      categorySlug: 'media-culture',
      sellerEmail: 'amara@textiles.com',
      brand: 'Cultural Pages',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
          alt: 'Collection of African books and literature'
        }
      ]
    }
  ]

  for (const productData of products) {
    const { categorySlug, sellerEmail, images, ...productInfo } = productData
    
    // Find category and seller
    const category = createdCategories.find(c => c.slug === categorySlug)
    const seller = createdSellers.find(s => s.user.email === sellerEmail)
    
    if (!category || !seller) {
      console.log(`Skipping product ${productData.title} - category or seller not found`)
      continue
    }

    const product = await prisma.product.create({
      data: {
        ...productInfo,
        categoryId: category.id,
        sellerId: seller.user.id,
        images: {
          create: images.map((image, index) => ({
            imageUrl: image.url,
            alt: image.alt,
            sortOrder: index
          }))
        }
      }
    })

    console.log(`Created product: ${product.title}`)
  }

  // Create some sample buyers
  const buyers = [
    {
      email: 'buyer1@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Sarah Johnson',
      role: UserRole.BUYER,
      location: 'London, UK'
    },
    {
      email: 'buyer2@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Michael Brown',
      role: UserRole.BUYER,
      location: 'Manchester, UK'
    }
  ]

  for (const buyerData of buyers) {
    const buyer = await prisma.user.upsert({
      where: { email: buyerData.email },
      update: {},
      create: {
        ...buyerData,
        emailVerified: new Date(),
        isActive: true
      }
    })
    console.log(`Created buyer: ${buyer.name}`)
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

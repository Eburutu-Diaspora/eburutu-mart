
import { User, UserRole, VerificationStatus, Product, Category, Message, ConversationParticipant, SellerProfile } from '@prisma/client'

export interface ExtendedUser extends User {
  sellerProfile?: SellerProfile
}

export interface ProductWithDetails extends Product {
  seller: User & {
    sellerProfile?: SellerProfile | null
  }
  category: Category
  images: { id: string; imageUrl: string; alt: string | null }[]
  _count?: {
    conversations: number
  }
}

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
    }
  }

  interface User {
    id: string
    role?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role?: string
  }
}

export interface CategoryWithProducts extends Category {
  products: ProductWithDetails[]
  _count?: {
    products: number
  }
}

export interface ConversationWithDetails {
  id: string
  subject: string | null
  productId: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  product?: Product
  participants: (ConversationParticipant & { user: User })[]
  messages: (Message & { sender: User; receiver: User })[]
  _count?: {
    messages: number
  }
}

export interface SellerStats {
  totalProducts: number
  activeProducts: number
  totalViews: number
  totalMessages: number
  verificationStatus: VerificationStatus
}

export interface AdminStats {
  totalUsers: number
  totalSellers: number
  totalProducts: number
  pendingVerifications: number
  totalMessages: number
}

export type {
  User,
  UserRole,
  VerificationStatus,
  Product,
  Category,
  Message,
  ConversationParticipant,
  SellerProfile
}

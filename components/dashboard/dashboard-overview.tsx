
'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  User, 
  TrendingUp,
  Store,
  Star,
  Eye
} from 'lucide-react'
import Link from 'next/link'

export function DashboardOverview() {
  const { data: session } = useSession()

  const quickActions = [
    {
      title: 'Browse Products',
      description: 'Discover authentic African products',
      icon: ShoppingBag,
      href: '/products',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Become a Seller',
      description: 'Start sharing your products',
      icon: Store,
      href: '/auth/register',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Messages',
      description: 'Connect with sellers',
      icon: MessageCircle,
      href: '/messages',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Profile Settings',
      description: 'Update your information',
      icon: User,
      href: '/dashboard/profile',
      color: 'from-pink-500 to-rose-500'
    }
  ]

  const recentActivity = [
    {
      type: 'view',
      title: 'Viewed "Authentic Ankara Fabric Set"',
      time: '2 hours ago',
      icon: Eye
    },
    {
      type: 'favorite',
      title: 'Added "Shea Butter Collection" to favorites',
      time: '1 day ago',
      icon: Heart
    },
    {
      type: 'message',
      title: 'Sent message to Amara Textiles',
      time: '2 days ago',
      icon: MessageCircle
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-white/90 text-lg">
              Ready to explore authentic African culture and products?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 p-4 rounded-full">
              <User className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${action.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Viewed</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Products you've saved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Active conversations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <activity.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Products */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <Link href="/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Featured Product {item}
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-primary">£{(29.99 * item).toFixed(2)}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.8</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs mb-3">
                  Fashion & Textiles
                </Badge>
                <Button className="w-full" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

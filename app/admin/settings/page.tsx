'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { ArrowLeft, Settings, Bell, Shield, Globe, Mail, Save } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function AdminSettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  // Settings state
  const [settings, setSettings] = useState({
    // General
    siteName: 'Eburutu Mart',
    siteDescription: 'The premier marketplace for African diaspora community in the UK',
    contactEmail: 'info@eburutumart.com',
    supportEmail: 'support@eburutumart.com',
    
    // Notifications
    emailNotifications: true,
    newUserAlerts: true,
    newProductAlerts: true,
    verificationAlerts: true,
    
    // Security
    requireEmailVerification: true,
    requireSellerVerification: true,
    maxLoginAttempts: 5,
    sessionTimeout: 24,
    
    // Platform
    allowNewRegistrations: true,
    maintenanceMode: false,
    featuredProductsCount: 6,
    productsPerPage: 12
  })

  useEffect(() => {
    if (status === 'loading') return
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      router.push('/dashboard')
    }
  }, [session, status, router])

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate saving - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Settings saved successfully!')
    setIsSaving(false)
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Platform Settings</h1>
            <p className="text-muted-foreground">
              Configure marketplace settings and preferences
            </p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="platform" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Platform
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic marketplace information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input
                        id="supportEmail"
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure admin notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email notifications for important events</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New User Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when new users register</p>
                    </div>
                    <Switch
                      checked={settings.newUserAlerts}
                      onCheckedChange={(checked) => setSettings({...settings, newUserAlerts: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Product Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when new products are listed</p>
                    </div>
                    <Switch
                      checked={settings.newProductAlerts}
                      onCheckedChange={(checked) => setSettings({...settings, newProductAlerts: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Verification Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified for new verification requests</p>
                    </div>
                    <Switch
                      checked={settings.verificationAlerts}
                      onCheckedChange={(checked) => setSettings({...settings, verificationAlerts: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Email Verification</Label>
                      <p className="text-sm text-muted-foreground">Users must verify their email to access features</p>
                    </div>
                    <Switch
                      checked={settings.requireEmailVerification}
                      onCheckedChange={(checked) => setSettings({...settings, requireEmailVerification: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Seller Verification</Label>
                      <p className="text-sm text-muted-foreground">Sellers must be verified before listing products</p>
                    </div>
                    <Switch
                      checked={settings.requireSellerVerification}
                      onCheckedChange={(checked) => setSettings({...settings, requireSellerVerification: checked})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        value={settings.maxLoginAttempts}
                        onChange={(e) => setSettings({...settings, maxLoginAttempts: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Platform Settings */}
          <TabsContent value="platform">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow New Registrations</Label>
                      <p className="text-sm text-muted-foreground">Allow new users to create accounts</p>
                    </div>
                    <Switch
                      checked={settings.allowNewRegistrations}
                      onCheckedChange={(checked) => setSettings({...settings, allowNewRegistrations: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Put the site in maintenance mode</p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="featuredProductsCount">Featured Products Count</Label>
                      <Input
                        id="featuredProductsCount"
                        type="number"
                        value={settings.featuredProductsCount}
                        onChange={(e) => setSettings({...settings, featuredProductsCount: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="productsPerPage">Products Per Page</Label>
                      <Input
                        id="productsPerPage"
                        type="number"
                        value={settings.productsPerPage}
                        onChange={(e) => setSettings({...settings, productsPerPage: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}

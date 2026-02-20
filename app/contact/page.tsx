
'use client'

import { useState } from 'react'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Mail, 
  Globe,
  Zap,
  Headphones,
  MessageCircle,
  Send,
  HelpCircle,
  Shield,
  Users,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: '',
    message: ''
  })

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@eburutumart.com',
      description: 'Send us an email and we\'ll respond within 24-48 hours'
    },
    {
      icon: Globe,
      title: 'Global Marketplace',
      content: 'Worldwide Access',
      description: 'Connecting the African diaspora community globally'
    },
    {
      icon: Zap,
      title: 'Quick Response',
      content: '24-48 Hour Response',
      description: 'We aim to respond to all inquiries promptly'
    },
    {
      icon: Headphones,
      title: 'Online Support',
      content: 'Help Center Available',
      description: 'Visit our Help page for instant answers'
    }
  ]

  const helpTopics = [
    {
      icon: Users,
      title: 'Seller Support',
      description: 'Help with verification, product listings, and seller tools'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Report issues, disputes, or safety concerns'
    },
    {
      icon: HelpCircle,
      title: 'General Inquiries',
      description: 'Questions about our platform, services, or community'
    },
    {
      icon: MessageCircle,
      title: 'Technical Support',
      description: 'Website issues, account problems, or technical questions'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        setFormData({
          name: '',
          email: '',
          subject: '',
          type: '',
          message: ''
        })
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, need support, or want to share feedback? 
            We're here to help and would love to hear from you.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center h-full">
              <CardContent className="p-6">
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{info.title}</h3>
                <div className="font-medium text-primary mb-2">{info.content}</div>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="type">Inquiry Type</Label>
                    <Select onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="seller">Seller Support</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="safety">Trust & Safety</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                    variant="african"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Help Topics */}
          <div>
            <h2 className="text-3xl font-bold mb-6">How Can We Help?</h2>
            <div className="space-y-4">
              {helpTopics.map((topic, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <topic.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{topic.title}</h3>
                        <p className="text-muted-foreground text-sm">{topic.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Link */}
            <Card className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10">
              <CardContent className="p-6 text-center">
                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Need Quick Answers?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Check out our FAQ section for instant answers to common questions
                </p>
                <Button variant="outline">
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

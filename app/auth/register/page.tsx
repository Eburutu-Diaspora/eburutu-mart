
'use client'

import { useState, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Loader2, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  ArrowLeft, 
  ShoppingBag,
  Store,
  Users,
  Camera,
  X,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type UserRole = 'BUYER' | 'SELLER'

// Country phone prefixes mapping
const countryPhonePrefixes: Record<string, string> = {
  'United Kingdom': '+44',
  'Nigeria': '+234',
  'Ghana': '+233',
  'Senegal': '+221',
  'Mali': '+223',
  'Burkina Faso': '+226',
  'Ivory Coast': '+225',
  'Guinea': '+224',
  'Sierra Leone': '+232',
  'Liberia': '+231',
  'Gambia': '+220',
  'Guinea-Bissau': '+245',
  'Cape Verde': '+238',
  'Mauritania': '+222',
  'Niger': '+227',
  'Togo': '+228',
  'Benin': '+229',
  'Kenya': '+254',
  'Uganda': '+256',
  'Tanzania': '+255',
  'Rwanda': '+250',
  'Burundi': '+257',
  'Ethiopia': '+251',
  'Eritrea': '+291',
  'Djibouti': '+253',
  'Somalia': '+252',
  'South Sudan': '+211',
  'Sudan': '+249',
  'Cameroon': '+237',
  'Democratic Republic of Congo': '+243',
  'Republic of Congo': '+242',
  'Central African Republic': '+236',
  'Chad': '+235',
  'Equatorial Guinea': '+240',
  'Gabon': '+241',
  'Sao Tome and Principe': '+239',
  'Egypt': '+20',
  'Libya': '+218',
  'Tunisia': '+216',
  'Algeria': '+213',
  'Morocco': '+212',
  'South Africa': '+27',
  'Zimbabwe': '+263',
  'Zambia': '+260',
  'Botswana': '+267',
  'Namibia': '+264',
  'Lesotho': '+266',
  'Eswatini': '+268',
  'Malawi': '+265',
  'Mozambique': '+258',
  'Madagascar': '+261',
  'Mauritius': '+230',
  'Seychelles': '+248',
  'Comoros': '+269',
  'Angola': '+244'
}

// List of common disposable/temporary email domains to block
const disposableEmailDomains = [
  'tempmail.com', 'temp-mail.org', 'guerrillamail.com', 'mailinator.com', 
  '10minutemail.com', 'throwaway.email', 'fakeinbox.com', 'maildrop.cc',
  'yopmail.com', 'trashmail.com', 'getnada.com', 'mohmal.com', 'tempail.com',
  'emailondeck.com', 'mintemail.com', 'dispostable.com', 'mailnesia.com',
  'tempr.email', 'discard.email', 'sharklasers.com', 'spam4.me', 'grr.la',
  'guerrillamailblock.com', 'pokemail.net', 'spamgourmet.com', 'mytrashmail.com',
  'mailexpire.com', 'throwawaymail.com', 'tempinbox.com', 'fakemailgenerator.com',
  'emailfake.com', 'crazymailing.com', 'tempmailo.com', 'generator.email',
  'getairmail.com', 'wegwerfmail.de', 'spambox.us', 'tempmailaddress.com'
]

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedRole, setSelectedRole] = useState<UserRole>('BUYER')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Get phone prefix based on selected location
  const phonePrefix = useMemo(() => {
    return selectedLocation ? countryPhonePrefixes[selectedLocation] || '' : ''
  }, [selectedLocation])

  // Validate email is not from disposable domain
  const isDisposableEmail = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase()
    if (!domain) return false
    return disposableEmailDomains.some(d => domain === d || domain.endsWith('.' + d))
  }

  // Validate password strength
  const validatePassword = (password: string): { valid: boolean; message: string } => {
    if (password.length < 10) {
      return { valid: false, message: 'Password must be at least 10 characters long' }
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' }
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' }
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' }
    }
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/~`]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one special character (!@#$%^&*...)' }
    }
    return { valid: true, message: '' }
  }

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB')
        return
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file')
        return
      }
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
      setError('')
    }
  }

  const removeAvatar = () => {
    setAvatarFile(null)
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview)
    }
    setAvatarPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    // Validation
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const name = formData.get('name') as string

    // Validate all required fields
    if (!name?.trim()) {
      setError('Full name is required')
      setIsLoading(false)
      return
    }

    if (!email?.trim()) {
      setError('Email is required')
      setIsLoading(false)
      return
    }

    // Check for disposable/temporary email
    if (isDisposableEmail(email)) {
      setError('Temporary or disposable email addresses are not allowed. Please use a permanent email address.')
      setIsLoading(false)
      return
    }

    if (!selectedLocation) {
      setError('Please select your location')
      setIsLoading(false)
      return
    }

    if (!phoneNumber?.trim()) {
      setError('Phone number is required')
      setIsLoading(false)
      return
    }

    // Validate password strength
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      setError(passwordValidation.message)
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    // Seller-specific validation
    if (selectedRole === 'SELLER' && !avatarFile) {
      setError('Profile picture is required for sellers')
      setIsLoading(false)
      return
    }

    // Convert avatar to base64 if present
    let avatarBase64 = null
    if (avatarFile) {
      const reader = new FileReader()
      avatarBase64 = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(avatarFile)
      })
    }

    const data = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      name: name,
      phone: `${phonePrefix}${phoneNumber}`,
      location: selectedLocation,
      role: selectedRole,
      avatar: avatarBase64
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Registration failed')
      } else {
        toast.success('Account created successfully!')
        // Redirect to success page with email and role
        router.push(`/auth/register-success?email=${encodeURIComponent(email)}&role=${selectedRole}`)
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-white/90 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-white p-2 rounded-lg">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <span className="text-2xl font-bold text-white">Eburutu Mart</span>
          </div>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Join Our Community</CardTitle>
            <CardDescription>
              Create your account and start connecting with African culture and heritage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium">I want to join as:</Label>
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md",
                    selectedRole === 'BUYER' 
                      ? "ring-2 ring-primary bg-primary/5" 
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => setSelectedRole('BUYER')}
                >
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">Buyer</h3>
                    <p className="text-xs text-muted-foreground">
                      Discover and purchase authentic African products
                    </p>
                    {selectedRole === 'BUYER' && (
                      <Badge className="mt-2" variant="default">Selected</Badge>
                    )}
                  </CardContent>
                </Card>

                <Card 
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md",
                    selectedRole === 'SELLER' 
                      ? "ring-2 ring-primary bg-primary/5" 
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => setSelectedRole('SELLER')}
                >
                  <CardContent className="p-4 text-center">
                    <Store className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">Seller</h3>
                    <p className="text-xs text-muted-foreground">
                      Share your products with the diaspora community
                    </p>
                    {selectedRole === 'SELLER' && (
                      <Badge className="mt-2" variant="default">Selected</Badge>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use a permanent email address (temporary emails not accepted)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Select value={selectedLocation} onValueChange={(value) => { setSelectedLocation(value); setPhoneNumber(''); }} disabled={isLoading} required>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select your location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="separator" disabled className="text-xs font-semibold text-muted-foreground">
                          ─── West Africa ───
                        </SelectItem>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="Senegal">Senegal</SelectItem>
                        <SelectItem value="Mali">Mali</SelectItem>
                        <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
                        <SelectItem value="Ivory Coast">Ivory Coast (Côte d'Ivoire)</SelectItem>
                        <SelectItem value="Guinea">Guinea</SelectItem>
                        <SelectItem value="Sierra Leone">Sierra Leone</SelectItem>
                        <SelectItem value="Liberia">Liberia</SelectItem>
                        <SelectItem value="Gambia">Gambia</SelectItem>
                        <SelectItem value="Guinea-Bissau">Guinea-Bissau</SelectItem>
                        <SelectItem value="Cape Verde">Cape Verde</SelectItem>
                        <SelectItem value="Mauritania">Mauritania</SelectItem>
                        <SelectItem value="Niger">Niger</SelectItem>
                        <SelectItem value="Togo">Togo</SelectItem>
                        <SelectItem value="Benin">Benin</SelectItem>
                        <SelectItem value="separator2" disabled className="text-xs font-semibold text-muted-foreground">
                          ─── East Africa ───
                        </SelectItem>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                        <SelectItem value="Uganda">Uganda</SelectItem>
                        <SelectItem value="Tanzania">Tanzania</SelectItem>
                        <SelectItem value="Rwanda">Rwanda</SelectItem>
                        <SelectItem value="Burundi">Burundi</SelectItem>
                        <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                        <SelectItem value="Eritrea">Eritrea</SelectItem>
                        <SelectItem value="Djibouti">Djibouti</SelectItem>
                        <SelectItem value="Somalia">Somalia</SelectItem>
                        <SelectItem value="South Sudan">South Sudan</SelectItem>
                        <SelectItem value="Sudan">Sudan</SelectItem>
                        <SelectItem value="separator3" disabled className="text-xs font-semibold text-muted-foreground">
                          ─── Central Africa ───
                        </SelectItem>
                        <SelectItem value="Cameroon">Cameroon</SelectItem>
                        <SelectItem value="Democratic Republic of Congo">Democratic Republic of Congo</SelectItem>
                        <SelectItem value="Republic of Congo">Republic of Congo</SelectItem>
                        <SelectItem value="Central African Republic">Central African Republic</SelectItem>
                        <SelectItem value="Chad">Chad</SelectItem>
                        <SelectItem value="Equatorial Guinea">Equatorial Guinea</SelectItem>
                        <SelectItem value="Gabon">Gabon</SelectItem>
                        <SelectItem value="Sao Tome and Principe">São Tomé and Príncipe</SelectItem>
                        <SelectItem value="separator4" disabled className="text-xs font-semibold text-muted-foreground">
                          ─── North Africa ───
                        </SelectItem>
                        <SelectItem value="Egypt">Egypt</SelectItem>
                        <SelectItem value="Libya">Libya</SelectItem>
                        <SelectItem value="Tunisia">Tunisia</SelectItem>
                        <SelectItem value="Algeria">Algeria</SelectItem>
                        <SelectItem value="Morocco">Morocco</SelectItem>
                        <SelectItem value="separator5" disabled className="text-xs font-semibold text-muted-foreground">
                          ─── Southern Africa ───
                        </SelectItem>
                        <SelectItem value="South Africa">South Africa</SelectItem>
                        <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                        <SelectItem value="Zambia">Zambia</SelectItem>
                        <SelectItem value="Botswana">Botswana</SelectItem>
                        <SelectItem value="Namibia">Namibia</SelectItem>
                        <SelectItem value="Lesotho">Lesotho</SelectItem>
                        <SelectItem value="Eswatini">Eswatini (Swaziland)</SelectItem>
                        <SelectItem value="Malawi">Malawi</SelectItem>
                        <SelectItem value="Mozambique">Mozambique</SelectItem>
                        <SelectItem value="Madagascar">Madagascar</SelectItem>
                        <SelectItem value="Mauritius">Mauritius</SelectItem>
                        <SelectItem value="Seychelles">Seychelles</SelectItem>
                        <SelectItem value="Comoros">Comoros</SelectItem>
                        <SelectItem value="Angola">Angola</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                  <div className="flex gap-2">
                    <div className="relative flex-shrink-0 w-20">
                      <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        value={phonePrefix}
                        readOnly
                        className="pl-8 bg-muted text-center font-medium"
                        placeholder="..."
                      />
                    </div>
                    <div className="relative flex-1">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={selectedLocation ? "Enter phone number" : "Select location first"}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                        disabled={isLoading || !selectedLocation}
                        required
                      />
                    </div>
                  </div>
                  {selectedLocation && (
                    <p className="text-xs text-muted-foreground">
                      Full number: {phonePrefix}{phoneNumber || 'XXX...'}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Min 10 characters with uppercase, lowercase, number & symbol
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Seller Profile Picture Upload - Only for Sellers */}
              {selectedRole === 'SELLER' && (
                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Camera className="h-4 w-4 text-primary" />
                    Profile Picture <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Upload a professional photo to build trust with buyers
                  </p>
                  
                  <div className="flex items-center gap-6">
                    {/* Avatar Preview */}
                    <div className="relative">
                      <div className={cn(
                        "w-28 h-28 rounded-full border-4 overflow-hidden flex items-center justify-center transition-all",
                        avatarPreview 
                          ? "border-primary bg-primary/5" 
                          : "border-dashed border-muted-foreground/30 bg-muted/50"
                      )}>
                        {avatarPreview ? (
                          <Image
                            src={avatarPreview}
                            alt="Profile preview"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <User className="h-12 w-12 text-muted-foreground/50" />
                        )}
                      </div>
                      
                      {/* Remove Button */}
                      {avatarPreview && (
                        <button
                          type="button"
                          onClick={removeAvatar}
                          className="absolute -top-1 -right-1 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    
                    {/* Upload Controls */}
                    <div className="flex-1 space-y-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarSelect}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className={cn(
                          "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer transition-all font-medium text-sm",
                          avatarPreview
                            ? "bg-muted hover:bg-muted/80 text-foreground"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md"
                        )}
                      >
                        <Upload className="h-4 w-4" />
                        {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG up to 5MB. Square images work best.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedRole === 'SELLER' && (
                <Alert className="border-purple-200 bg-purple-50">
                  <Store className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    As a seller, you'll need to complete email and phone verification before listing products. 
                    <strong> Business entity sellers</strong> will be required to upload business registration documents for additional verification.
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                variant="african"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Already have an account?
                  </span>
                </div>
              </div>

              <Link href="/auth/login">
                <Button variant="outline" className="w-full mt-4">
                  Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

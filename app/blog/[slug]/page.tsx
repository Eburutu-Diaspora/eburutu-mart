'use client'

import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark, MessageCircle, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const blogContent: Record<string, any> = {
  'preserving-african-heritage-in-the-diaspora': {
    title: 'Preserving African Heritage: A Guide for Diaspora Families',
    author: 'Adaeze Okonkwo',
    authorRole: 'Cultural Heritage Consultant',
    date: '2026-02-05',
    readTime: '8 min read',
    category: 'Culture & Heritage',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&auto=format&fit=crop',
    content: `
      <p class="lead">Living abroad doesn't mean leaving your heritage behind. In fact, distance often makes us cherish our cultural roots even more. Here's how diaspora families are keeping African traditions alive across generations.</p>

      <h2>1. Language: The Soul of Culture</h2>
      <p>Language is more than communication—it's a direct connection to your ancestors. Many diaspora parents struggle with passing on their native tongue, but it's one of the most valuable gifts you can give your children.</p>
      <ul>
        <li><strong>Start early:</strong> Speak your native language at home from birth. Children are natural linguists.</li>
        <li><strong>Create immersion moments:</strong> Designate "African language only" times during meals or weekends.</li>
        <li><strong>Use technology:</strong> Apps, YouTube channels, and online tutors can supplement your efforts.</li>
        <li><strong>Connect with community:</strong> Join language groups with other diaspora families.</li>
      </ul>

      <h2>2. Food: Taste of Home</h2>
      <p>The kitchen is often where culture lives most vibrantly. Cooking traditional dishes creates sensory memories that last a lifetime.</p>
      <blockquote>"When my children smell jollof rice cooking, they're not just hungry—they're home." — Yemi, Nigerian mother in London</blockquote>
      <p>Tips for maintaining food traditions:</p>
      <ul>
        <li>Teach children to cook traditional dishes alongside you</li>
        <li>Source authentic ingredients from African stores or the Eburutu Mart</li>
        <li>Celebrate special occasions with traditional feasts</li>
        <li>Document family recipes before they're lost</li>
      </ul>

      <h2>3. Storytelling and Oral History</h2>
      <p>African cultures have rich oral traditions. Don't let these stories fade away.</p>
      <ul>
        <li>Schedule regular "story time" with traditional folktales</li>
        <li>Record grandparents sharing family history</li>
        <li>Create a family tree with stories attached to each person</li>
        <li>Celebrate proverbs and their meanings</li>
      </ul>

      <h2>4. Celebrations and Ceremonies</h2>
      <p>Mark important life events with traditional ceremonies, even in a modified form. Naming ceremonies, coming-of-age celebrations, and traditional weddings keep cultural practices alive.</p>

      <h2>5. Arts and Crafts</h2>
      <p>Engage children with African art forms:</p>
      <ul>
        <li>Traditional fabric dyeing (Adire, Kente patterns)</li>
        <li>Beadwork and jewelry making</li>
        <li>Traditional music and dance</li>
        <li>Drumming and musical instruments</li>
      </ul>

      <h2>Building Community</h2>
      <p>You don't have to do this alone. Connect with other diaspora families through cultural associations, churches, mosques, and community events. The Eburutu Mart is more than a shopping platform—it's a community hub where culture is celebrated and preserved.</p>

      <h2>Conclusion</h2>
      <p>Preserving heritage requires intentional effort, but the rewards are immeasurable. Your children will thank you for giving them roots that ground them, no matter where life takes them. Start today—even small steps keep the flame burning for future generations.</p>
    `
  },
  'building-successful-diaspora-business': {
    title: 'From Side Hustle to Empire: Building a Successful Diaspora Business',
    author: 'Kwame Mensah',
    authorRole: 'Business Consultant & Entrepreneur',
    date: '2026-02-01',
    readTime: '12 min read',
    category: 'Business & Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop',
    content: `
      <p class="lead">The African diaspora has always been entrepreneurial. From sending remittances home to launching global brands, we've found ways to create value across continents. Here's how you can turn your cultural knowledge into a thriving business.</p>

      <h2>The Diaspora Advantage</h2>
      <p>Being part of two worlds gives you unique insights:</p>
      <ul>
        <li><strong>Cultural bridge:</strong> You understand both markets intimately</li>
        <li><strong>Untapped demand:</strong> Millions of Africans abroad seek authentic products and services</li>
        <li><strong>Trust factor:</strong> Community members prefer buying from their own</li>
        <li><strong>Global perspective:</strong> You can identify opportunities others miss</li>
      </ul>

      <h2>Finding Your Niche</h2>
      <p>The most successful diaspora businesses solve real problems:</p>
      
      <h3>Food & Groceries</h3>
      <p>From palm oil to plantains, there's huge demand for authentic African ingredients. Consider importing, distributing, or even producing locally.</p>
      
      <h3>Fashion & Textiles</h3>
      <p>Ankara, Kente, and traditional attire never go out of style. Whether you're designing, tailoring, or curating, fashion offers endless possibilities.</p>
      
      <h3>Services</h3>
      <p>Event planning, catering, hair braiding, translation services—the diaspora needs providers who understand our culture.</p>

      <h2>Starting Small, Thinking Big</h2>
      <blockquote>"I started selling shea butter to friends. Five years later, I supply 200 stores across the UK." — Aminata, Ghanaian entrepreneur</blockquote>
      
      <p>Key steps to launch:</p>
      <ol>
        <li><strong>Validate your idea:</strong> Talk to potential customers before investing heavily</li>
        <li><strong>Start lean:</strong> Test with minimal inventory and investment</li>
        <li><strong>Build online presence:</strong> Social media and marketplaces like Eburutu Mart are your friends</li>
        <li><strong>Deliver excellence:</strong> Word of mouth is powerful in our community</li>
        <li><strong>Scale strategically:</strong> Grow as demand proves itself</li>
      </ol>

      <h2>Overcoming Common Challenges</h2>
      
      <h3>Supply Chain Issues</h3>
      <p>Importing from Africa can be complex. Build relationships with reliable suppliers, understand customs regulations, and plan for delays.</p>
      
      <h3>Building Trust</h3>
      <p>Get verified on platforms like Eburutu Mart. Collect reviews. Be transparent about your story and sources.</p>
      
      <h3>Balancing Cultures</h3>
      <p>Adapt your business practices for the UK market while maintaining authenticity. Professional presentation matters.</p>

      <h2>Funding Your Dream</h2>
      <p>Options for diaspora entrepreneurs:</p>
      <ul>
        <li>Personal savings and family support (the African way!)</li>
        <li>Government grants for minority-owned businesses</li>
        <li>Community lending circles (esusu, stokvel)</li>
        <li>Crowdfunding from your network</li>
        <li>Business loans and microfinance</li>
      </ul>

      <h2>Success Stories</h2>
      <p>Draw inspiration from those who've made it:</p>
      <ul>
        <li>Afrocenchix: Hair care products born from personal frustration, now a multi-million pound business</li>
        <li>Ayo Foods: Bringing West African cuisine to mainstream supermarkets</li>
        <li>Kente Gentlemen: Traditional fabrics reimagined for modern professionals</li>
      </ul>

      <h2>Your Turn</h2>
      <p>The diaspora economy is growing rapidly. There's never been a better time to launch your business. Start with what you know, serve your community, and watch your empire grow.</p>
      
      <p>Ready to start selling? Join Eburutu Mart today and reach thousands of customers who are actively seeking authentic African products and services.</p>
    `
  },
  'navigating-dual-identity': {
    title: 'Navigating Dual Identity: Thriving as an African in the UK',
    author: 'Fatima Ibrahim',
    authorRole: 'Psychologist & Identity Coach',
    date: '2026-01-28',
    readTime: '10 min read',
    category: 'Lifestyle & Identity',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop',
    content: `
      <p class="lead">"Where are you really from?" If you've heard this question countless times, you're not alone. Living between two cultures can feel like a constant balancing act—but it can also be your greatest strength.</p>

      <h2>The Dual Identity Experience</h2>
      <p>For many Africans in the diaspora, identity isn't simple. You might feel:</p>
      <ul>
        <li>Too African to be British, too British to be African</li>
        <li>Pressure to choose sides or prove yourself</li>
        <li>Exhaustion from code-switching</li>
        <li>Grief for a home you may barely remember</li>
        <li>Pride in your heritage mixed with frustration at stereotypes</li>
      </ul>
      <p>These feelings are valid. And they're shared by millions of people navigating similar journeys.</p>

      <h2>From Conflict to Integration</h2>
      <p>The goal isn't to choose one identity over another—it's integration. Here's how:</p>

      <h3>1. Embrace the "And"</h3>
      <p>You're not African OR British. You're African AND British. This isn't contradiction—it's expansion. Your identity is additive, not either/or.</p>
      
      <blockquote>"I stopped trying to fit into boxes others created. I am Nigerian. I am British. I am both, and I am neither. I am me." — Chidi, London</blockquote>

      <h3>2. Know Your Story</h3>
      <p>Understanding your family's migration journey helps ground your identity. Ask your parents and elders:</p>
      <ul>
        <li>Why did we come here?</li>
        <li>What did we leave behind?</li>
        <li>What dreams did you have for us?</li>
        <li>What traditions matter most to you?</li>
      </ul>

      <h3>3. Build Your Community</h3>
      <p>Surround yourself with people who understand your experience. This might include:</p>
      <ul>
        <li>Other diaspora members from your country or region</li>
        <li>Second-generation immigrants from other backgrounds</li>
        <li>Supportive friends who celebrate your full identity</li>
      </ul>

      <h3>4. Create Your Own Traditions</h3>
      <p>You don't have to choose between a British Christmas and an African celebration. Create new traditions that honour both parts of your identity.</p>

      <h2>For Parents: Raising Confident Diaspora Children</h2>
      <p>Your children face unique challenges. Help them by:</p>
      <ul>
        <li>Teaching them about their heritage with pride, not obligation</li>
        <li>Exposing them to diverse African role models</li>
        <li>Validating their British experiences too</li>
        <li>Having open conversations about race and identity</li>
        <li>Celebrating their uniqueness rather than forcing conformity</li>
      </ul>

      <h2>Dealing with Microaggressions</h2>
      <p>"Where are you really from?" and other microaggressions are exhausting. Strategies that help:</p>
      <ul>
        <li>Prepare responses that feel authentic to you</li>
        <li>Choose your battles—you don't owe everyone an education</li>
        <li>Find humour where possible (but never at your own expense)</li>
        <li>Connect with others who understand</li>
        <li>Seek professional support if the stress becomes overwhelming</li>
      </ul>

      <h2>Turning Dual Identity into Superpower</h2>
      <p>Your dual identity offers unique advantages:</p>
      <ul>
        <li><strong>Cultural intelligence:</strong> You navigate multiple worlds with ease</li>
        <li><strong>Resilience:</strong> You've overcome challenges many never face</li>
        <li><strong>Perspective:</strong> You see things from angles others miss</li>
        <li><strong>Bridge-building:</strong> You connect communities and ideas</li>
        <li><strong>Creativity:</strong> Innovation often comes from fusion</li>
      </ul>

      <h2>You Belong Here</h2>
      <p>Whether you were born here or arrived yesterday, you belong. Your presence enriches this country. Your heritage matters. Your future is bright.</p>
      
      <p>Embrace your complexity. Celebrate your journey. You are exactly who you're supposed to be.</p>
    `
  },
  'african-cuisine-diaspora-kitchen': {
    title: 'The Diaspora Kitchen: Bringing African Flavours to Your Table',
    author: 'Chef Amara Diallo',
    authorRole: 'Professional Chef & Food Writer',
    date: '2026-01-20',
    readTime: '7 min read',
    category: 'Food & Recipes',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=1200&auto=format&fit=crop',
    content: `
      <p class="lead">There's nothing quite like the taste of home. For Africans in the diaspora, food is more than sustenance—it's connection, memory, and love. Here's how to keep those flavours alive in your kitchen.</p>

      <h2>Sourcing Authentic Ingredients</h2>
      <p>The foundation of great African cooking is authentic ingredients. Here's where to find them:</p>
      
      <h3>African Grocery Stores</h3>
      <p>Most UK cities have African shops. Build relationships with shop owners—they often know when fresh shipments arrive and can source special items.</p>
      
      <h3>Online Marketplaces</h3>
      <p>Platforms like Eburutu Mart connect you with verified sellers offering authentic products, from palm oil to ogbono seeds.</p>
      
      <h3>Farmers Markets</h3>
      <p>You'd be surprised what you can find. Caribbean stalls often carry items used in African cooking. Nigerian yams, plantains, and scotch bonnets are increasingly common.</p>
      
      <h3>Grow Your Own</h3>
      <p>Some ingredients can be grown in the UK climate—or indoors:</p>
      <ul>
        <li>Scotch bonnet peppers (greenhouse or windowsill)</li>
        <li>African basil (scent leaf)</li>
        <li>Bitter leaf</li>
        <li>Various greens for soups</li>
      </ul>

      <h2>Essential Pantry Items</h2>
      <p>Stock these staples and you'll always be ready to cook:</p>
      <ul>
        <li><strong>Palm oil:</strong> The heart of West African cooking</li>
        <li><strong>Groundnut (peanut) paste:</strong> For soups and sauces</li>
        <li><strong>Egusi/melon seeds:</strong> Ground for soups</li>
        <li><strong>Locust beans (dawadawa/iru):</strong> Umami bomb</li>
        <li><strong>Crayfish:</strong> Dried and ground for flavour</li>
        <li><strong>Stockfish:</strong> Essential for certain dishes</li>
        <li><strong>Smoked fish:</strong> Adds depth to any soup</li>
        <li><strong>Berbere/Suya spice:</strong> Regional spice blends</li>
      </ul>

      <h2>Adapting Recipes for UK Kitchens</h2>
      <p>Sometimes exact ingredients aren't available. Smart substitutions:</p>
      <ul>
        <li>Fresh tomatoes → Quality tinned tomatoes</li>
        <li>Fresh peppers → Frozen or paste</li>
        <li>Fresh fish → Quality frozen options</li>
        <li>Cassava → Available frozen, grated</li>
        <li>Palm wine → Ginger beer (for cooking)</li>
      </ul>

      <blockquote>"My grandmother would be horrified by some of my shortcuts, but she'd be proud that I'm still cooking her recipes 4,000 miles away." — Nkechi, Birmingham</blockquote>

      <h2>Quick Recipes to Start</h2>
      
      <h3>Simple Jollof Rice</h3>
      <p>The eternal favourite. Master this and you'll always have a crowd-pleaser ready.</p>
      
      <h3>Egusi Soup</h3>
      <p>Rich, hearty, and nutritious. Perfect with fufu, eba, or rice.</p>
      
      <h3>Suya</h3>
      <p>Nigerian street food that's surprisingly easy to make at home. The spice mix is the secret.</p>
      
      <h3>Kelewele</h3>
      <p>Spicy fried plantains from Ghana. Addictively good.</p>

      <h2>Cooking as Community</h2>
      <p>Food brings people together. Consider:</p>
      <ul>
        <li>Hosting cooking parties where everyone contributes</li>
        <li>Teaching children family recipes</li>
        <li>Sharing food with non-African friends (the best cultural education!)</li>
        <li>Documenting recipes for future generations</li>
      </ul>

      <h2>Building a Food Business</h2>
      <p>Many diaspora food entrepreneurs started in their home kitchens:</p>
      <ul>
        <li>Catering for community events</li>
        <li>Selling at local markets</li>
        <li>Launching a food delivery service</li>
        <li>Creating packaged spice blends</li>
      </ul>
      <p>The demand for authentic African food is growing. Your kitchen could be the start of something bigger.</p>

      <h2>Keep the Flame Burning</h2>
      <p>Every time you cook a traditional dish, you're keeping culture alive. You're creating memories. You're building bridges between generations and continents.</p>
      
      <p>So heat up that palm oil. Pound that fufu. Fill your kitchen with the aromas of home. And know that across the diaspora, millions are doing the same—connected by flavour, by memory, by love.</p>
    `
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const post = blogContent[slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-8 hover:bg-primary/10"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <article className="max-w-4xl mx-auto">
          {/* Header Image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <Badge className="bg-accent text-accent-foreground mb-4">{post.category}</Badge>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{post.author}</p>
                <p className="text-sm">{post.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-li:text-muted-foreground
              prose-ul:my-4 prose-ol:my-4
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-foreground
              prose-strong:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              [&_.lead]:text-xl [&_.lead]:text-foreground [&_.lead]:font-medium [&_.lead]:mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Actions */}
          <div className="flex items-center justify-between py-8 mt-8 border-t border-b">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Comment
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Related Articles CTA */}
          <Card className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border-none">
            <CardHeader>
              <CardTitle>Explore More Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Discover more articles about life, culture, and success in the African diaspora.
              </p>
              <Link href="/blog">
                <Button>
                  View All Articles
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </article>
      </main>

      <Footer />
    </div>
  )
}

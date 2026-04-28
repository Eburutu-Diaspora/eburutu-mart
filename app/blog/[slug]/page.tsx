'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark, MessageCircle, Heart, Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const categoryColors: Record<string, string> = {
  'Culture & Heritage':          'bg-amber-100 text-amber-800',
  'Business & Entrepreneurship': 'bg-emerald-100 text-emerald-800',
  'Lifestyle & Identity':        'bg-purple-100 text-purple-800',
  'Food & Recipes':              'bg-orange-100 text-orange-800',
  'Diaspora Life UK':            'bg-blue-100 text-blue-800',
}

const blogContent: Record<string, any> = {
  'preserving-african-heritage-in-the-diaspora': {
    title: 'Preserving African Heritage: A Practical Guide for Diaspora Families in the UK',
    author: 'Adaeze Okonkwo',
    authorRole: 'Cultural Heritage Consultant',
    authorBio: 'Adaeze works with African diaspora communities across the UK, helping families preserve language, traditions and cultural identity across generations.',
    date: '2026-02-05',
    readTime: '8 min read',
    category: 'Culture & Heritage',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&auto=format&fit=crop',
    metaDescription: 'Practical guide for African diaspora families in the UK on preserving culture, language, food traditions and heritage for the next generation.',
    content: `
      <p class="lead">Living in Britain doesn't mean leaving your African heritage behind. In fact, distance often makes us cherish our cultural roots even more. Here is how diaspora families across the UK are keeping African traditions alive — and passing them on to children born or raised far from home.</p>

      <h2>1. Language: The Soul of Culture</h2>
      <p>Language is more than communication — it is a direct connection to your ancestors, your community and your identity. Many diaspora parents in the UK struggle with passing on their native tongue, but it remains one of the most valuable gifts you can give your children.</p>
      <ul>
        <li><strong>Start early:</strong> Speak your native language at home from birth. Children acquire languages naturally in their early years.</li>
        <li><strong>Create immersion moments:</strong> Designate "African language only" times — during meals, car journeys or weekend mornings.</li>
        <li><strong>Use technology:</strong> Apps, YouTube channels and online tutors can supplement daily practice.</li>
        <li><strong>Connect with community:</strong> Join language groups and cultural associations with other diaspora families.</li>
      </ul>

      <h2>2. Food: The Taste of Home</h2>
      <p>The kitchen is often where African culture lives most vibrantly in the diaspora. Cooking traditional dishes creates sensory memories that last a lifetime and connect generations.</p>
      <blockquote>"When my children smell jollof rice cooking, they are not just hungry — they are home." — Yemi, Nigerian mother in London</blockquote>
      <p>Tips for maintaining food traditions in the UK:</p>
      <ul>
        <li>Teach children to cook traditional dishes alongside you from a young age</li>
        <li>Source authentic African ingredients from specialist stores or EburutuMart</li>
        <li>Celebrate special occasions and milestones with traditional feasts</li>
        <li>Document family recipes before they are lost — record grandparents cooking and explaining each step</li>
      </ul>

      <h2>3. Storytelling and Oral History</h2>
      <p>African cultures have rich oral traditions that go back thousands of years. Do not let these stories disappear with your generation.</p>
      <ul>
        <li>Schedule regular story time with traditional folktales and proverbs</li>
        <li>Record grandparents sharing family history over video call</li>
        <li>Create a family tree with stories attached to each person</li>
        <li>Celebrate the wisdom embedded in proverbs — explain their meaning and origin to your children</li>
      </ul>

      <h2>4. Celebrations and Ceremonies</h2>
      <p>Mark important life events with traditional ceremonies, even in a modified form. Naming ceremonies, coming-of-age celebrations and traditional wedding elements keep cultural practices alive and give children a tangible connection to their roots.</p>

      <h2>5. Arts, Crafts and Music</h2>
      <p>Engage children with African art forms and cultural expressions:</p>
      <ul>
        <li>Traditional fabric dyeing — Adire, Kente, tie-dye patterns</li>
        <li>Beadwork and jewellery making</li>
        <li>African drumming, traditional music and dance</li>
        <li>Visiting African art exhibitions and cultural events in the UK</li>
      </ul>

      <h2>Building Community in the UK</h2>
      <p>You do not have to do this alone. Connect with other diaspora families through cultural associations, churches, mosques and community events. Platforms like EburutuMart are more than a marketplace — they are hubs where African culture is celebrated, products are shared, and community is built every day.</p>

      <h2>Conclusion</h2>
      <p>Preserving your heritage in the UK requires intentional effort, but the rewards are immeasurable. Your children will thank you for giving them roots that ground them — no matter where life takes them. Start today. Even the smallest steps keep the flame burning for future generations.</p>
    `
  },
  'building-successful-diaspora-business': {
    title: 'From Side Hustle to Empire: How to Build a Thriving African Diaspora Business in the UK',
    author: 'Kwame Mensah',
    authorRole: 'Business Consultant & Entrepreneur',
    authorBio: 'Kwame has helped over 200 African diaspora entrepreneurs launch and grow businesses in the UK. He is the founder of two successful African food import businesses.',
    date: '2026-02-01',
    readTime: '12 min read',
    category: 'Business & Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop',
    metaDescription: 'Step-by-step guide for African diaspora entrepreneurs on how to start, register and grow a successful business in the UK.',
    content: `
      <p class="lead">The African diaspora has always been entrepreneurial. From sending remittances home to launching globally recognised brands, we have found ways to create value across continents. Here is how you can turn your cultural knowledge and community connections into a thriving UK business.</p>

      <h2>The Diaspora Advantage</h2>
      <p>Being part of two worlds gives you business insights that no MBA can teach:</p>
      <ul>
        <li><strong>Cultural bridge:</strong> You understand both African and British markets with authentic depth</li>
        <li><strong>Untapped demand:</strong> Millions of Africans in the UK actively seek authentic products and services</li>
        <li><strong>Community trust:</strong> People prefer buying from those who share and understand their culture</li>
        <li><strong>Global perspective:</strong> You can identify opportunities that others simply cannot see</li>
      </ul>

      <h2>Finding Your Niche</h2>
      <p>The most successful diaspora businesses solve real problems that the mainstream market ignores:</p>
      <h3>Food and Groceries</h3>
      <p>From palm oil to plantains, the demand for authentic African ingredients in the UK is enormous and growing. Consider importing, distributing, producing locally or selling through EburutuMart.</p>
      <h3>Fashion and Textiles</h3>
      <p>Ankara, Kente and traditional African attire have never been more in demand. Whether you are designing, tailoring or curating — fashion offers endless opportunity in the UK diaspora market.</p>
      <h3>Services</h3>
      <p>Event planning, African catering, natural hair braiding, translation services, immigration advice, music promotion — the diaspora needs skilled providers who understand the culture.</p>

      <h2>Starting Small and Thinking Big</h2>
      <blockquote>"I started selling shea butter to friends at church. Five years later, I supply 200 stores across the UK." — Aminata, Ghanaian entrepreneur, Birmingham</blockquote>
      <p>Key steps to launch your diaspora business:</p>
      <ol>
        <li><strong>Validate your idea:</strong> Talk to at least 20 potential customers before investing any money</li>
        <li><strong>Start lean:</strong> Test with minimal inventory and investment — prove demand first</li>
        <li><strong>Register properly:</strong> Set up as a sole trader or limited company with HMRC from day one</li>
        <li><strong>Build your online presence:</strong> Social media and marketplaces like EburutuMart give you instant reach</li>
        <li><strong>Deliver excellence:</strong> Word of mouth is the most powerful marketing in the African community</li>
        <li><strong>Scale strategically:</strong> Grow as demand proves itself — do not over-invest too early</li>
      </ol>

      <h2>Funding Your Business</h2>
      <p>Funding options specifically available to diaspora entrepreneurs in the UK:</p>
      <ul>
        <li>Personal savings and family support — the traditional African way</li>
        <li>Government grants for minority-owned and small businesses</li>
        <li>Community lending circles (esusu, susu, stokvel)</li>
        <li>Start Up Loans from the British Business Bank</li>
        <li>Prince's Trust Enterprise Programme for those under 30</li>
      </ul>

      <h2>Your Turn</h2>
      <p>The African diaspora economy in the UK is growing rapidly. There has never been a better moment to launch. Start with what you know deeply, serve your community with excellence, and build your empire from there.</p>
      <p>Ready to start selling? Join EburutuMart today — the free African marketplace connecting thousands of buyers and sellers across the UK diaspora community.</p>
    `
  },
  'navigating-dual-identity': {
    title: 'Navigating Dual Identity: How to Thrive as an African in the UK Without Losing Yourself',
    author: 'Fatima Ibrahim',
    authorRole: 'Psychologist and Identity Coach',
    authorBio: 'Fatima is a British-Nigerian psychologist specialising in identity, belonging and mental health within the African diaspora. She runs workshops across the UK.',
    date: '2026-01-28',
    readTime: '10 min read',
    category: 'Lifestyle & Identity',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop',
    metaDescription: 'Advice for Africans in the UK on navigating dual identity — balancing African and British culture and turning your bicultural experience into a strength.',
    content: `
      <p class="lead">"Where are you really from?" If you have heard this question countless times, you are not alone. Living between two cultures can feel like a constant balancing act. But with the right mindset, your dual identity becomes your greatest strength.</p>

      <h2>The Dual Identity Experience</h2>
      <p>For many Africans in the UK diaspora, identity is rarely simple. You might recognise some of these feelings:</p>
      <ul>
        <li>Too African to be seen as fully British — too British to feel fully African</li>
        <li>Pressure to choose a side or prove your belonging</li>
        <li>Exhaustion from code-switching between environments</li>
        <li>A quiet grief for a home country you may barely remember</li>
        <li>Pride in your heritage mixed with frustration at persistent stereotypes</li>
      </ul>

      <h2>From Identity Conflict to Integration</h2>
      <h3>1. Embrace the "And"</h3>
      <p>You are not African OR British. You are African AND British. This is not contradiction — it is expansion. Your identity is additive, not either/or.</p>
      <blockquote>"I stopped trying to fit into boxes others created for me. I am Nigerian. I am British. I am both, and I am neither. I am simply me." — Chidi, London</blockquote>

      <h3>2. Know Your Story</h3>
      <p>Understanding your family's migration journey grounds your identity. Ask your parents and elders the questions that matter — why did we come, what did we sacrifice, which traditions matter most?</p>

      <h2>For Parents: Raising Confident Diaspora Children</h2>
      <p>Your children face unique challenges. Help them by:</p>
      <ul>
        <li>Teaching them about their African heritage with genuine pride, not obligation</li>
        <li>Exposing them consistently to positive African role models</li>
        <li>Validating their British experiences and friendships equally</li>
        <li>Having honest, age-appropriate conversations about race and identity</li>
      </ul>

      <h2>Turning Dual Identity into Your Superpower</h2>
      <ul>
        <li><strong>Cultural intelligence:</strong> You navigate multiple social worlds with natural ease</li>
        <li><strong>Resilience:</strong> You have overcome challenges most people in Britain never encounter</li>
        <li><strong>Bridge-building:</strong> You naturally connect communities, ideas and opportunities</li>
        <li><strong>Creativity:</strong> The best innovation consistently comes from cultural fusion</li>
      </ul>

      <h2>You Belong Here</h2>
      <p>Whether you were born in Britain or arrived last year, you belong. Your presence enriches this country. Embrace your complexity. Celebrate your journey. You are exactly who you are supposed to be.</p>
    `
  },
  'african-cuisine-diaspora-kitchen': {
    title: 'The Diaspora Kitchen: Authentic African Ingredients and Traditional Recipes in the UK',
    author: 'Chef Amara Diallo',
    authorRole: 'Professional Chef and Food Writer',
    authorBio: 'Chef Amara trained in Dakar and London. She runs African cooking classes across the UK and writes about diaspora food culture and ingredient sourcing.',
    date: '2026-01-20',
    readTime: '7 min read',
    category: 'Food & Recipes',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=1200&auto=format&fit=crop',
    metaDescription: 'Where to source authentic African ingredients in the UK and how to cook traditional recipes — jollof rice, egusi soup, suya and more.',
    content: `
      <p class="lead">There is nothing quite like the taste of home. For Africans in the UK diaspora, food is far more than sustenance — it is connection, memory, identity and love. Here is exactly how to keep those flavours alive in your British kitchen.</p>

      <h2>Where to Source Authentic African Ingredients in the UK</h2>
      <h3>African and Caribbean Grocery Stores</h3>
      <p>Most UK cities with sizeable African communities have specialist shops. Build relationships with shop owners — they know when fresh shipments arrive. Areas like Peckham, Brixton, Dalston, Handsworth and Toxteth are well-served.</p>
      <h3>Online African Marketplaces</h3>
      <p>Platforms like EburutuMart connect you directly with verified UK-based sellers offering authentic African products — from cold-pressed palm oil to dried crayfish, ogbono seeds and smoked stockfish.</p>

      <h2>Essential African Pantry Staples</h2>
      <ul>
        <li><strong>Palm oil:</strong> The heart of West and Central African cooking</li>
        <li><strong>Groundnut paste:</strong> For soups, stews and sauces</li>
        <li><strong>Egusi (melon seeds):</strong> Ground for rich, protein-packed soups</li>
        <li><strong>Locust beans (dawadawa/iru):</strong> A powerful umami flavour bomb</li>
        <li><strong>Ground crayfish:</strong> Adds distinctive depth to any dish</li>
        <li><strong>Stockfish:</strong> Essential for authentic Nigerian and Ghanaian soups</li>
        <li><strong>Suya spice blend:</strong> For grilling meats Nigerian street-food style</li>
      </ul>

      <blockquote>"My grandmother would be horrified by some of my shortcuts. But she would be proud that I am still cooking her recipes 4,000 miles from home." — Nkechi, Birmingham</blockquote>

      <h2>Essential Recipes to Master First</h2>
      <p>Start with <strong>Classic Jollof Rice</strong> — master the tomato base, the right rice-to-liquid ratio and the coveted smoky bottom. Then move to <strong>Egusi Soup</strong>, rich and hearty, perfect with fufu or eba. For something quick, <strong>Kelewele</strong> — spiced Ghanaian fried plantains — takes under 15 minutes and never disappoints.</p>

      <h2>Keep the Flame Burning</h2>
      <p>Every time you cook a traditional dish in your UK kitchen, you are keeping culture alive. Heat up that palm oil. Fill your home with the aromas of home. Across the diaspora, millions are doing exactly the same — connected by flavour, memory and love.</p>
    `
  },
  'moving-to-uk-from-africa-guide': {
    title: 'Moving to the UK from Africa: Everything Nobody Tells You Before You Arrive',
    author: 'Blessing Eze',
    authorRole: 'Diaspora Life Adviser',
    authorBio: 'Blessing moved from Lagos to Birmingham in 2018 and now helps newly arrived Africans navigate British life through community workshops and online guides.',
    date: '2026-01-15',
    readTime: '11 min read',
    category: 'Diaspora Life UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&auto=format&fit=crop',
    metaDescription: 'The practical guide every African moving to the UK needs — bank accounts, NHS, housing, British culture and finding your community.',
    content: `
      <p class="lead">Moving to the UK from Africa is one of the most exciting and overwhelming experiences of your life. The official guides cover visas. Nobody tells you about the cold that never quite leaves in October, how to open a bank account with no credit history, or why British people apologise when you bump into them. This guide covers the real stuff.</p>

      <h2>Before You Arrive: What to Sort First</h2>
      <ul>
        <li><strong>National Insurance Number:</strong> Apply online before or immediately after arrival. You need this to work legally.</li>
        <li><strong>Biometric Residence Permit:</strong> Collect yours from the designated Post Office within 10 days of arriving.</li>
        <li><strong>Bank account:</strong> Consider Monzo, Starling or Revolut to start — they open with your passport and visa only.</li>
        <li><strong>SIM card:</strong> Get a pay-as-you-go SIM at any supermarket. You will need a UK number for almost everything.</li>
      </ul>

      <h2>The NHS: Your Most Valuable Resource</h2>
      <p>Register with a GP in your area within your first week. You are entitled to use the NHS if you paid the Immigration Health Surcharge with your visa. Find your nearest GP surgery at nhs.uk.</p>

      <h2>Understanding British Culture</h2>
      <ul>
        <li><strong>Queueing is sacred:</strong> Never, ever jump a queue.</li>
        <li><strong>Indirect communication:</strong> "That is quite interesting" often means "I disagree."</li>
        <li><strong>Punctuality:</strong> Arrive on time for work and appointments. "African time" will cost you opportunities here.</li>
        <li><strong>The weather conversation:</strong> Yes, people genuinely discuss weather constantly. It is the universal ice-breaker.</li>
      </ul>

      <h2>Finding Your Community</h2>
      <p>This is the most important thing you will do in your first months. Isolation is the silent enemy of diaspora mental health. Find your people through African churches, country-specific associations, Facebook groups for Africans in your city, and EburutuMart's community platform.</p>

      <blockquote>"The first winter nearly broke me. But finding my community changed everything." — Ola, moved from Abuja to Manchester in 2021</blockquote>

      <h2>Your First Year Will Be Hard</h2>
      <p>Loneliness, culture shock, financial pressure and the relentless grey skies will test you. This is normal. Every African who built a life here went through exactly the same. Give yourself time. Seek community. Call home. And know that what you are doing takes extraordinary courage.</p>
    `
  },
  'sell-african-products-uk': {
    title: 'How to Legally Sell African Food and Products in the UK: Licences, Labelling and Where to Start',
    author: 'Kofi Asante',
    authorRole: 'Small Business Adviser',
    authorBio: 'Kofi advises diaspora entrepreneurs on UK business regulations. He has helped over 150 African sellers get legally set up and trading in Britain.',
    date: '2026-01-10',
    readTime: '9 min read',
    category: 'Business & Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop',
    metaDescription: 'Complete guide to legally selling African food and cultural products in the UK — food safety, HMRC, labelling, import rules and how to start on EburutuMart.',
    content: `
      <p class="lead">Thousands of African diaspora entrepreneurs in the UK want to sell authentic food, groceries, skincare and cultural products — but are held back by uncertainty about rules and where to start. This guide covers everything you need to begin selling legally and confidently.</p>

      <h2>Step 1: Register Your Business with HMRC</h2>
      <p>Before you sell a single item, register with HMRC. Most food and product sellers start as sole traders — it is free, straightforward and takes about 10 minutes at gov.uk. You pay tax on any profit above £12,570 annually.</p>

      <h2>Step 2: Food Business Registration</h2>
      <p>If you are selling any food product — including packaged groceries, homemade sauces or spice blends — you must register as a food business with your local council at least 28 days before trading. This is free and mandatory. You will also need a Food Hygiene certificate (available online for £20–£40).</p>

      <h2>Step 3: Product Labelling Requirements</h2>
      <p>UK food labels must include: product name, full ingredient list, all 14 major allergens highlighted, net weight, best before date, storage instructions, your business name and address, and country of origin. Labels must be in English — even for imported products.</p>

      <h2>Step 4: Importing African Products</h2>
      <ul>
        <li>Get an EORI number from HMRC (free)</li>
        <li>Check UK import tariffs at trade-tariff.service.gov.uk</li>
        <li>Certain food products require health or phytosanitary certificates</li>
        <li>Work with a licensed customs broker for your first shipments</li>
      </ul>

      <h2>Step 5: Where to Sell</h2>
      <p>The easiest place to start is EburutuMart — the free African marketplace connecting verified UK sellers with diaspora buyers. No transaction fees, no verification gates. List your products and start selling to a community that is actively looking for exactly what you offer.</p>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li>Selling food without local council registration — this can result in fines</li>
        <li>Using original African packaging without English labelling</li>
        <li>Not declaring allergens — this is a legal requirement and a safety issue</li>
        <li>Skipping public liability insurance if you sell at markets or events</li>
      </ul>

      <blockquote>"I spent six months being too scared to start. Once I got registered it took two days. Don't wait." — Chisom, food entrepreneur, Leeds</blockquote>

      <h2>You Are Ready</h2>
      <p>The African food and products market in the UK is growing every year. Get registered, get labelled, and get selling. Your community is waiting.</p>
    `
  }
}

export default function BlogPostPage() {
  const params  = useParams()
  const router  = useRouter()
  const slug    = params?.slug as string
  const post    = blogContent[slug]
  const [shared,    setShared]    = useState(false)
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setScrollPct(Math.min(100, Math.max(0, pct)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    if (navigator.share) {
      try { await navigator.share({ title: post?.title, text: post?.metaDescription, url }) } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url)
        setShared(true)
        setTimeout(() => setShared(false), 3000)
      } catch {
        const el = document.createElement('textarea')
        el.value = url
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        setShared(true)
        setTimeout(() => setShared(false), 3000)
      }
    }
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you are looking for does not exist.</p>
          <Link href="/blog"><Button>Back to Blog</Button></Link>
        </main>
        <Footer />
      </div>
    )
  }

  const initials = post.author.split(' ').map((n: string) => n[0]).join('').slice(0, 2)

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-100"
        style={{ width: `${scrollPct}%` }}
      />

      <Header />

      <main className="container mx-auto px-4 py-10 max-w-4xl">

        {/* Back */}
        <Button variant="ghost" className="mb-8 hover:bg-primary/10 -ml-2" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Button>

        <article>

          {/* Category + read time */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-foreground">
            {post.title}
          </h1>

          {/* Author row */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.authorRole}</p>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[420px] rounded-2xl overflow-hidden mb-10 shadow-xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Article body */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-primary
              prose-p:text-muted-foreground prose-p:leading-8 prose-p:mb-5
              prose-li:text-muted-foreground prose-li:leading-7
              prose-ul:my-5 prose-ol:my-5
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-xl prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:text-foreground prose-blockquote:font-medium
              [&_.lead]:text-xl [&_.lead]:text-foreground [&_.lead]:font-medium [&_.lead]:leading-8 [&_.lead]:mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Action bar */}
          <div className="flex items-center justify-between py-6 mt-10 border-t border-b border-border">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-full hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors">
                <Heart className="w-4 h-4 mr-1.5" /> Like
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <MessageCircle className="w-4 h-4 mr-1.5" /> Comment
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-full">
                <Bookmark className="w-4 h-4 mr-1.5" /> Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className={`rounded-full transition-colors ${shared ? 'border-green-500 text-green-600 bg-green-50' : ''}`}
              >
                {shared ? <><Check className="w-4 h-4 mr-1.5" /> Copied!</> : <><Share2 className="w-4 h-4 mr-1.5" /> Share</>}
              </Button>
            </div>
          </div>

          {/* Author bio card */}
          <div className="mt-10 p-6 rounded-2xl bg-muted/40 border border-border flex gap-5 items-start">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Written by</p>
              <p className="font-bold text-foreground text-lg">{post.author}</p>
              <p className="text-sm text-primary mb-2">{post.authorRole}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{post.authorBio}</p>
            </div>
          </div>

          {/* More articles CTA */}
          <div className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/10 text-center">
            <h3 className="text-xl font-bold mb-2">Explore More Stories</h3>
            <p className="text-muted-foreground text-sm mb-5">
              Discover more articles about life, culture, business and food in the African diaspora.
            </p>
            <Link href="/blog">
              <Button className="rounded-full px-6">
                View All Articles
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </Link>
          </div>

        </article>
      </main>

      <Footer />
    </div>
  )
}

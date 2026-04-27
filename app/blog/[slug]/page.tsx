'use client'

import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark, MessageCircle, Heart, Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const blogContent: Record<string, any> = {
  'preserving-african-heritage-in-the-diaspora': {
    title: 'Preserving African Heritage: A Practical Guide for Diaspora Families in the UK',
    author: 'Adaeze Okonkwo',
    authorRole: 'Cultural Heritage Consultant',
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
        <li><strong>Start early:</strong> Speak your native language at home from birth. Children acquire languages naturally and effortlessly in their early years.</li>
        <li><strong>Create immersion moments:</strong> Designate "African language only" times — during meals, car journeys or weekend mornings.</li>
        <li><strong>Use technology:</strong> Apps, YouTube channels and online tutors can supplement daily practice.</li>
        <li><strong>Connect with community:</strong> Join language groups and cultural associations with other diaspora families in your city.</li>
      </ul>

      <h2>2. Food: The Taste of Home</h2>
      <p>The kitchen is often where African culture lives most vibrantly in the diaspora. Cooking traditional dishes creates sensory memories — sights, smells and tastes — that last a lifetime and connect generations.</p>
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
    date: '2026-02-01',
    readTime: '12 min read',
    category: 'Business & Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop',
    metaDescription: 'Step-by-step guide for African diaspora entrepreneurs on how to start, register and grow a successful business in the UK — from food and fashion to services and e-commerce.',
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

      <h2>Overcoming Common Challenges</h2>
      
      <h3>Supply Chain and Importing from Africa</h3>
      <p>Importing from Africa can be complex. Build relationships with reliable suppliers, understand UK customs regulations thoroughly, and always plan for delays. Join trade associations that support African importers.</p>
      
      <h3>Building Trust and Credibility</h3>
      <p>Get verified on platforms like EburutuMart. Collect reviews consistently. Be transparent about your story, your sourcing and your values. Authenticity sells.</p>
      
      <h3>Balancing Two Business Cultures</h3>
      <p>Adapt your business practices for the UK market while maintaining cultural authenticity. Professional presentation, clear pricing and reliable delivery are non-negotiable.</p>

      <h2>Funding Your Business</h2>
      <p>Funding options specifically available to diaspora entrepreneurs in the UK:</p>
      <ul>
        <li>Personal savings and family support — the traditional African way</li>
        <li>Government grants for minority-owned and small businesses</li>
        <li>Community lending circles (esusu, susu, stokvel)</li>
        <li>Crowdfunding from your social network</li>
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
    date: '2026-01-28',
    readTime: '10 min read',
    category: 'Lifestyle & Identity',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop',
    metaDescription: 'Advice for Africans in the UK on navigating dual identity — balancing African and British culture, raising confident diaspora children, and turning your bicultural experience into a strength.',
    content: `
      <p class="lead">"Where are you really from?" If you have heard this question countless times, you are not alone. Living between two cultures can feel like a constant balancing act. But with the right mindset, your dual identity becomes your greatest strength — not your greatest burden.</p>

      <h2>The Dual Identity Experience</h2>
      <p>For many Africans in the UK diaspora, identity is rarely simple. You might recognise some of these feelings:</p>
      <ul>
        <li>Too African to be seen as fully British — too British to feel fully African</li>
        <li>Pressure to choose a side or prove your belonging</li>
        <li>Exhaustion from code-switching between environments</li>
        <li>A quiet grief for a home country you may barely remember</li>
        <li>Pride in your heritage mixed with frustration at persistent stereotypes</li>
      </ul>
      <p>These feelings are entirely valid. And they are shared by millions of people navigating exactly the same journey across Britain.</p>

      <h2>From Identity Conflict to Integration</h2>
      <p>The goal is not to choose one identity over another — it is integration. Here is how to get there:</p>

      <h3>1. Embrace the "And"</h3>
      <p>You are not African OR British. You are African AND British. This is not contradiction — it is expansion. Your identity is additive, not either/or. The sooner you internalise this, the lighter everything becomes.</p>
      
      <blockquote>"I stopped trying to fit into boxes others created for me. I am Nigerian. I am British. I am both, and I am neither. I am simply me." — Chidi, London</blockquote>

      <h3>2. Know Your Story</h3>
      <p>Understanding your family's migration journey grounds your identity in something real and meaningful. Ask your parents and elders the questions that matter:</p>
      <ul>
        <li>Why did we come to the UK?</li>
        <li>What did we sacrifice to get here?</li>
        <li>What dreams did you carry for us?</li>
        <li>Which traditions matter most to preserve?</li>
      </ul>

      <h3>3. Build Your Community</h3>
      <p>Surround yourself intentionally with people who understand your experience — other diaspora members, second-generation immigrants from different backgrounds, and allies who celebrate your full self.</p>

      <h2>For Parents: Raising Confident Diaspora Children</h2>
      <p>Your children face unique challenges that their British peers will never fully understand. Help them navigate by:</p>
      <ul>
        <li>Teaching them about their African heritage with genuine pride, not obligation</li>
        <li>Exposing them consistently to positive African role models</li>
        <li>Validating their British experiences and friendships equally</li>
        <li>Having honest, age-appropriate conversations about race and identity</li>
        <li>Celebrating their uniqueness rather than pressuring conformity to either culture</li>
      </ul>

      <h2>Turning Dual Identity into Your Superpower</h2>
      <p>Your bicultural experience offers advantages that most people never develop:</p>
      <ul>
        <li><strong>Cultural intelligence:</strong> You navigate multiple social worlds with natural ease</li>
        <li><strong>Resilience:</strong> You have overcome challenges most people in Britain never encounter</li>
        <li><strong>Perspective:</strong> You consistently see angles and possibilities that monocultural people miss</li>
        <li><strong>Bridge-building:</strong> You naturally connect communities, ideas and opportunities</li>
        <li><strong>Creativity:</strong> The best innovation consistently comes from cultural fusion</li>
      </ul>

      <h2>You Belong Here</h2>
      <p>Whether you were born in Britain or arrived last year, you belong. Your presence enriches this country. Your heritage matters deeply. Your future is genuinely bright. Embrace your complexity. Celebrate your journey. You are exactly who you are supposed to be.</p>
    `
  },
  'african-cuisine-diaspora-kitchen': {
    title: 'The Diaspora Kitchen: How to Source Authentic African Ingredients and Cook Traditional Recipes in the UK',
    author: 'Chef Amara Diallo',
    authorRole: 'Professional Chef and Food Writer',
    date: '2026-01-20',
    readTime: '7 min read',
    category: 'Food & Recipes',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=1200&auto=format&fit=crop',
    metaDescription: 'Where to source authentic African ingredients in the UK and how to cook traditional African recipes — jollof rice, egusi soup, suya and more — in a British kitchen.',
    content: `
      <p class="lead">There is nothing quite like the taste of home. For Africans in the UK diaspora, food is far more than sustenance — it is connection, memory, identity and love. Here is exactly how to keep those flavours alive in your British kitchen.</p>

      <h2>Where to Source Authentic African Ingredients in the UK</h2>
      <p>The foundation of great African cooking is authentic ingredients. The good news: they are far more accessible in the UK than many people realise.</p>
      
      <h3>African and Caribbean Grocery Stores</h3>
      <p>Most UK cities with sizeable African communities have specialist shops. Build relationships with shop owners — they know when fresh shipments arrive and can source specific items on request. Areas like Peckham, Brixton, Dalston, Handsworth and Toxteth are well-served.</p>
      
      <h3>Online African Marketplaces</h3>
      <p>Platforms like EburutuMart connect you directly with verified UK-based sellers offering authentic African products — from cold-pressed palm oil to dried crayfish, ogbono seeds and smoked stockfish. Convenient, reliable and community-supporting.</p>
      
      <h3>Farmers Markets and Supermarkets</h3>
      <p>Caribbean stalls at farmers markets often stock items essential to African cooking. Major supermarkets now carry plantains, scotch bonnet peppers, yams and coconut products in most large branches.</p>

      <h2>Essential African Pantry Staples for UK Kitchens</h2>
      <p>Stock these and you will always be ready to cook authentically:</p>
      <ul>
        <li><strong>Palm oil:</strong> The heart of West and Central African cooking</li>
        <li><strong>Groundnut paste:</strong> For soups, stews and sauces</li>
        <li><strong>Egusi (melon seeds):</strong> Ground for rich, protein-packed soups</li>
        <li><strong>Locust beans (dawadawa/iru):</strong> A powerful umami flavour bomb</li>
        <li><strong>Ground crayfish:</strong> Adds distinctive depth to any dish</li>
        <li><strong>Stockfish:</strong> Essential for authentic Nigerian and Ghanaian soups</li>
        <li><strong>Smoked fish:</strong> Adds complexity to stews and sauces</li>
        <li><strong>Suya spice blend:</strong> For grilling meats Nigerian street-food style</li>
      </ul>

      <h2>Smart Substitutions When Ingredients Are Unavailable</h2>
      <ul>
        <li>Fresh tomatoes → Good quality tinned plum tomatoes</li>
        <li>Fresh peppers → Frozen chopped peppers or pepper paste</li>
        <li>Fresh whole fish → Quality frozen equivalents</li>
        <li>Fresh cassava → Frozen grated cassava, available in most African stores</li>
      </ul>

      <blockquote>"My grandmother would be horrified by some of my shortcuts. But she would be proud that I am still cooking her recipes 4,000 miles from home." — Nkechi, Birmingham</blockquote>

      <h2>Essential Recipes to Master First</h2>
      
      <h3>Classic Jollof Rice</h3>
      <p>The eternal diaspora favourite. Master a proper tomato base, the right rice-to-liquid ratio and the coveted smoky bottom, and you will always have a crowd-pleaser ready.</p>
      
      <h3>Egusi Soup</h3>
      <p>Rich, hearty and deeply nutritious. Perfect served with fufu, eba, pounded yam or rice. The key is properly frying the egusi paste before adding stock.</p>
      
      <h3>Suya</h3>
      <p>Nigerian street food that is surprisingly straightforward to recreate at home. The groundnut and spice blend is the secret — get that right and everything else follows.</p>
      
      <h3>Kelewele</h3>
      <p>Spiced fried plantains from Ghana. Quick, addictive and endlessly satisfying as a side dish or snack.</p>

      <h2>Cooking as Community</h2>
      <p>Food in African culture is never just about eating — it is about gathering. Consider hosting cooking parties where everyone contributes a dish, teaching the next generation family recipes before they are lost, and sharing traditional food with British friends. There is no better cultural education than a shared meal.</p>

      <h2>Keep the Flame Burning</h2>
      <p>Every time you cook a traditional dish in your UK kitchen, you are keeping culture alive. You are creating memories that will outlast you. Heat up that palm oil. Pound that fufu. Fill your home with the aromas of home. Across the diaspora, millions are doing exactly the same — connected by flavour, memory and love.</p>
    `
  },
  'moving-to-uk-from-africa-guide': {
    title: 'Moving to the UK from Africa: Everything Nobody Tells You Before You Arrive',
    author: 'Blessing Eze',
    authorRole: 'Diaspora Life Adviser',
    date: '2026-01-15',
    readTime: '11 min read',
    category: 'Diaspora Life UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&auto=format&fit=crop',
    metaDescription: 'The practical guide every African moving to the UK needs — from opening a bank account and registering with the NHS to finding community and navigating British culture.',
    content: `
      <p class="lead">Moving to the UK from Africa is one of the most exciting and overwhelming experiences of your life. The official guides cover visas and work permits. Nobody tells you about the cold that never quite leaves your bones in October, how to open a bank account with no credit history, or why British people apologise when you bump into them. This guide covers the real stuff.</p>

      <h2>Before You Arrive: What to Sort First</h2>
      <ul>
        <li><strong>National Insurance Number:</strong> Apply online before or immediately after arrival. You need this to work and pay tax legally.</li>
        <li><strong>Biometric Residence Permit (BRP):</strong> Collect yours from the designated Post Office branch within 10 days of arriving.</li>
        <li><strong>Bank account:</strong> Most major banks require proof of address and identity. Consider Monzo, Starling or Revolut to start — they open accounts with your passport and visa only.</li>
        <li><strong>SIM card:</strong> Get a pay-as-you-go SIM immediately at any supermarket or phone shop. You will need a UK number for almost everything.</li>
      </ul>

      <h2>The NHS: Your Most Valuable Resource</h2>
      <p>Register with a GP (doctor) in your area within your first week. You are entitled to use the NHS if you paid the Immigration Health Surcharge with your visa. Find your nearest GP surgery at nhs.uk and register in person or online.</p>

      <h2>Finding Accommodation</h2>
      <p>The UK rental market is competitive. Landlords typically require:</p>
      <ul>
        <li>One to two months deposit plus first month rent in advance</li>
        <li>References from previous landlords or employers</li>
        <li>Proof of income (usually 2.5 to 3 times the monthly rent)</li>
      </ul>
      <p>If you are new with no UK rental history, some landlords will accept a larger deposit or a UK-based guarantor. African community groups on Facebook are often the best source of trusted accommodation leads.</p>

      <h2>Understanding British Culture</h2>
      <p>Things that confuse almost every African new arrival:</p>
      <ul>
        <li><strong>Queueing is sacred:</strong> Never, ever jump a queue. This is not a suggestion.</li>
        <li><strong>Indirect communication:</strong> "That is quite interesting" often means "I disagree." "Not bad" can mean excellent.</li>
        <li><strong>Personal space:</strong> British people value physical distance. Do not stand too close in conversation.</li>
        <li><strong>The weather conversation:</strong> Yes, people genuinely discuss weather constantly. It is the universal ice-breaker.</li>
        <li><strong>Punctuality:</strong> Arrive on time for work and appointments. "African time" will cost you opportunities here.</li>
      </ul>

      <h2>Finding Your Community</h2>
      <p>This is the most important thing you will do in your first months. Isolation is the silent enemy of diaspora mental health. Find your people through:</p>
      <ul>
        <li>African and Caribbean churches and mosques</li>
        <li>Country-specific community associations (Nigerian, Ghanaian, Kenyan, Zimbabwean etc.)</li>
        <li>Facebook groups for Africans in your city</li>
        <li>EburutuMart's community platform — connect with sellers and buyers who share your background</li>
        <li>University African Caribbean Societies if you are a student</li>
      </ul>

      <h2>Your First Year Will Be Hard</h2>
      <p>Loneliness, culture shock, financial pressure and the relentless grey skies will test you. This is normal. Every African who built a life here went through exactly the same. Give yourself time. Seek community. Call home. And know that what you are doing takes extraordinary courage.</p>
    `
  },
  'sell-african-products-uk': {
    title: 'How to Legally Sell African Food and Products in the UK: Licences, Labelling and Where to Start',
    author: 'Kofi Asante',
    authorRole: 'Small Business Adviser',
    date: '2026-01-10',
    readTime: '9 min read',
    category: 'Business & Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop',
    metaDescription: 'Complete guide to legally selling African food, groceries and cultural products in the UK — covering food safety registration, product labelling, HMRC, import rules and how to list on EburutuMart.',
    content: `
      <p class="lead">Thousands of African diaspora entrepreneurs in the UK want to sell authentic food, groceries, skincare and cultural products — but are held back by uncertainty about rules, regulations and where to start. This guide covers everything you need to know to begin selling legally and confidently.</p>

      <h2>Step 1: Register Your Business with HMRC</h2>
      <p>Before you sell a single item, register with HMRC. Most food and product sellers start as sole traders — it is free, straightforward and takes about 10 minutes online at gov.uk. You will need to submit a Self Assessment tax return each year and pay tax on any profit above £12,570.</p>
      <p>If you expect to turn over more than £85,000 per year, you must register for VAT. Most small diaspora businesses do not need to worry about this initially.</p>

      <h2>Step 2: Food Business Registration</h2>
      <p>If you are selling any food product — including packaged African groceries, homemade sauces, spice blends or snacks — you must register as a food business with your local council at least 28 days before you start trading. This is free and mandatory.</p>
      <p>You will also need to complete a Food Hygiene course (available online for £20-£40) and ensure your preparation environment meets basic hygiene standards.</p>

      <h2>Step 3: Product Labelling Requirements</h2>
      <p>UK food labelling law requires your product labels to include:</p>
      <ul>
        <li>Product name and description</li>
        <li>Full list of ingredients in descending order by weight</li>
        <li>All 14 major allergens clearly highlighted</li>
        <li>Net weight or volume</li>
        <li>Best before or use by date</li>
        <li>Storage instructions</li>
        <li>Your business name and address</li>
        <li>Country of origin (for meat and certain other products)</li>
      </ul>
      <p>Labels must be in English. This applies even to products imported from Africa that you are reselling — if the original label is not in English and does not meet UK standards, you must relabel before selling.</p>

      <h2>Step 4: Importing African Products into the UK</h2>
      <p>Importing food from Africa involves customs declarations, potential import duties and food safety checks at the border. Key points:</p>
      <ul>
        <li>Get an EORI number (Economic Operator Registration and Identification) — free from HMRC</li>
        <li>Check UK import tariffs for your specific products at trade-tariff.service.gov.uk</li>
        <li>Certain food products require health certificates from the country of origin</li>
        <li>Some plant-based products need phytosanitary certificates</li>
        <li>Work with a licensed customs broker for your first few shipments</li>
      </ul>

      <h2>Step 5: Where to Sell</h2>
      <p>Once you are legally set up, the easiest place to start reaching diaspora buyers is EburutuMart — the free African marketplace connecting verified UK sellers with buyers across the community. No transaction fees, no verification gates, just list your products and start selling.</p>
      <p>Other options include local African grocery stores (approach owners directly), market stalls, and community events. Build your reputation locally before scaling online.</p>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li>Selling food without local council registration — this can result in fines and forced closure</li>
        <li>Using original African packaging without English labelling</li>
        <li>Not declaring allergens — this is a legal requirement and a safety issue</li>
        <li>Underpricing to compete — price to reflect quality and your real costs</li>
        <li>Skipping insurance — public liability insurance is essential if you sell at markets or events</li>
      </ul>

      <h2>You Are Ready</h2>
      <p>The African food and products market in the UK is growing every year. There is real demand, real community, and real opportunity. Get registered, get labelled, and get selling. Your community is waiting.</p>
    `
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const post = blogContent[slug]
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const shareData = {
      title: post?.title || 'EburutuMart Blog',
      text: post?.metaDescription || 'Read this article on EburutuMart',
      url,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        // User cancelled — do nothing
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(url)
        setShared(true)
        setTimeout(() => setShared(false), 3000)
      } catch {
        // Final fallback: select and copy
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
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className={shared ? 'border-green-500 text-green-600' : ''}
              >
                {shared ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </>
                )}
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
                Discover more articles about life, culture, business and food in the African diaspora.
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

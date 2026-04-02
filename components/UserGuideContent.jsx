"use client";
import { useState } from "react";

const sections = [
  {
    id: "getting-started",
    icon: "🚀",
    title: "Getting Started",
    articles: [
      {
        title: "What is Eburutu Mart?",
        content: `Eburutu Mart is a free online marketplace built for the African diaspora community. It connects buyers and sellers directly — no middleman, no platform fees. Whether you're selling African groceries, fashion, art, services, or cultural goods, or looking to buy from trusted community members, Eburutu Mart is your go-to platform.\n\nThe platform is completely free to use. We do not handle payments — all transactions are arranged directly between buyer and seller.`,
      },
      {
        title: "Creating a Buyer Account",
        content: `1. Click **Register** on the homepage.\n2. Select **Buyer** as your account type.\n3. Enter your name, email address, and a secure password.\n4. Submit the form — your account is created instantly.\n5. You can now browse listings, save items to your wishlist, and contact sellers directly.\n\n**Note:** Your email address is kept private. Sellers do not see your email unless you share it in a message.`,
      },
      {
        title: "Creating a Seller Account",
        content: `1. Click **Register** on the homepage.\n2. Select **Seller** as your account type.\n3. Fill in your personal details, business name, and upload a profile photo.\n4. Write a short bio so buyers can learn about you and your products.\n5. Once registered, your seller dashboard is ready — start posting listings immediately.\n\n**Tip:** A complete profile with a clear photo builds trust with buyers and leads to more enquiries.`,
      },
    ],
  },
  {
    id: "listings",
    icon: "📦",
    title: "Posting & Managing Listings",
    articles: [
      {
        title: "How to Post a Listing",
        content: `1. Log in to your seller account and go to your **Dashboard**.\n2. Click **Add New Listing**.\n3. Enter a clear title (e.g. "Handmade Ankara Tote Bag – London").\n4. Select the correct **category** for your item.\n5. Write a detailed description including condition, size, colour, and any other relevant details.\n6. Upload up to 5 clear photos of your item.\n7. Set your asking price.\n8. Click **Publish** — your listing goes live immediately.\n\n**Free to post:** There are no listing fees on Eburutu Mart.`,
      },
      {
        title: "Tips for a Great Listing",
        content: `- **Use natural lighting** when photographing your items.\n- **Be specific in your title** — include location, size or weight where relevant.\n- **Set a fair price** — research similar items on the platform first.\n- **Reply quickly** — buyers are more likely to complete a purchase when sellers respond fast.\n- **Update or delete** sold items promptly to avoid wasted enquiries.`,
      },
      {
        title: "Editing or Deleting a Listing",
        content: `1. Go to your **Seller Dashboard** and find the listing under **My Listings**.\n2. Click **Edit** to update the title, description, price, photos, or category.\n3. Click **Delete** (or **Mark as Sold**) to remove it from the marketplace.\n\nSold items are hidden from public view but remain in your dashboard history.`,
      },
    ],
  },
  {
    id: "buying",
    icon: "🛒",
    title: "Buying on Eburutu Mart",
    articles: [
      {
        title: "How to Find Items",
        content: `- Use the **search bar** at the top of the page to search by keyword.\n- Browse by **category** from the homepage (e.g. Food & Groceries, Fashion, Electronics).\n- Use **filters** to narrow results by location or price range.\n- Save items you love to your **Wishlist** to revisit later.`,
      },
      {
        title: "Contacting a Seller",
        content: `Eburutu Mart does not process payments. To buy an item:\n\n1. Open the listing you are interested in.\n2. Click **Contact Seller** — this reveals the seller's email address.\n3. Email the seller directly to ask questions, negotiate price, or arrange collection/delivery.\n4. Agree payment and delivery terms directly with the seller.\n\n**Important:** Always confirm all details before sending any money. Eburutu Mart is not responsible for transactions made outside the platform.`,
      },
      {
        title: "Staying Safe as a Buyer",
        content: `- **Meet in a public place** for local collections where possible.\n- **Inspect items** before handing over payment.\n- **Be cautious** of sellers asking for payment before you have confirmed the item exists.\n- **Trust your instincts** — if something feels wrong, do not proceed.\n- **Report suspicious listings** using the Report button on any listing page.`,
      },
    ],
  },
  {
    id: "account",
    icon: "⚙️",
    title: "Account & Settings",
    articles: [
      {
        title: "Updating Your Profile",
        content: `1. Log in and click your **avatar/name** in the top navigation.\n2. Select **Profile Settings**.\n3. Update your display name, bio, profile photo, or contact preferences.\n4. Click **Save Changes**.`,
      },
      {
        title: "Changing Your Password",
        content: `1. Go to **Account Settings** from your dashboard.\n2. Click **Change Password**.\n3. Enter your current password, then your new password twice.\n4. Click **Update Password**.\n\nIf you have forgotten your password, click **Forgot Password** on the login page and follow the reset instructions sent to your email.`,
      },
      {
        title: "Deleting Your Account",
        content: `To permanently delete your account, please contact our support team via the **Contact Support** button on this page. We will process your request within 5 working days.\n\n**Note:** Deleting your account removes all your listings and profile data permanently. This action cannot be undone.`,
      },
    ],
  },
  {
    id: "community",
    icon: "🌍",
    title: "Community & Trust",
    articles: [
      {
        title: "Our Community Values",
        content: `Eburutu Mart was built to serve the African diaspora community. We ask all users to:\n\n- **Be honest** in listings and descriptions.\n- **Be respectful** in all communications.\n- **Support fellow community members** — we grow together.\n- **Report** any listings or behaviour that feels wrong.\n\nWe reserve the right to remove listings or accounts that violate our community standards.`,
      },
      {
        title: "Leaving a Review",
        content: `After a successful transaction, you can leave a review on the seller's profile:\n\n1. Visit the seller's public profile page.\n2. Scroll to the **Reviews** section.\n3. Click **Write a Review**, give a star rating, and add a comment.\n\nReviews help the community identify trusted sellers. Please only leave honest, fair reviews based on your real experience.`,
      },
    ],
  },
];

export default function UserGuideContent() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [openArticle, setOpenArticle] = useState(null);

  const current = sections.find((s) => s.id === activeSection);

  return (
    <div className="user-guide-wrapper">
      <style>{`
        .user-guide-wrapper {
          font-family: 'Georgia', serif;
          max-width: 960px;
          margin: 0 auto;
          padding: 2rem 1rem;
          color: #1a2e1a;
        }
        .guide-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .guide-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1a3d1a;
          margin-bottom: 0.5rem;
        }
        .guide-header p {
          color: #5a7a5a;
          font-size: 1rem;
        }
        .guide-layout {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }
        .guide-nav {
          width: 220px;
          flex-shrink: 0;
          position: sticky;
          top: 1rem;
        }
        .guide-nav button {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 0.65rem 0.9rem;
          border-radius: 8px;
          font-size: 0.92rem;
          font-family: inherit;
          cursor: pointer;
          color: #3a5a3a;
          transition: all 0.15s;
          margin-bottom: 0.2rem;
        }
        .guide-nav button:hover {
          background: #f0f7f0;
        }
        .guide-nav button.active {
          background: #1a6b3a;
          color: white;
          font-weight: 600;
        }
        .guide-content {
          flex: 1;
          min-width: 0;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a3d1a;
          margin-bottom: 1.2rem;
          padding-bottom: 0.8rem;
          border-bottom: 2px solid #e0ede0;
        }
        .article-item {
          border: 1px solid #dceadc;
          border-radius: 10px;
          margin-bottom: 0.8rem;
          overflow: hidden;
        }
        .article-toggle {
          width: 100%;
          text-align: left;
          background: #f8fdf8;
          border: none;
          padding: 1rem 1.2rem;
          font-size: 0.97rem;
          font-weight: 600;
          font-family: inherit;
          color: #1a3d1a;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.15s;
        }
        .article-toggle:hover {
          background: #eef7ee;
        }
        .article-toggle.open {
          background: #1a6b3a;
          color: white;
        }
        .article-toggle .chevron {
          font-size: 0.75rem;
          transition: transform 0.2s;
        }
        .article-toggle.open .chevron {
          transform: rotate(180deg);
        }
        .article-body {
          padding: 1.1rem 1.2rem;
          font-size: 0.93rem;
          line-height: 1.75;
          color: #2a4a2a;
          background: white;
          white-space: pre-line;
        }
        .article-body strong {
          color: #1a3d1a;
        }
        @media (max-width: 640px) {
          .guide-layout { flex-direction: column; }
          .guide-nav { width: 100%; position: static; display: flex; flex-wrap: wrap; gap: 0.4rem; }
          .guide-nav button { width: auto; flex-shrink: 0; }
        }
      `}</style>

      <div className="guide-header">
        <h1>📖 User Guide</h1>
        <p>Everything you need to know to buy and sell on Eburutu Mart</p>
      </div>

      <div className="guide-layout">
        <nav className="guide-nav">
          {sections.map((s) => (
            <button
              key={s.id}
              className={activeSection === s.id ? "active" : ""}
              onClick={() => { setActiveSection(s.id); setOpenArticle(null); }}
            >
              <span>{s.icon}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </nav>

        <div className="guide-content">
          {current && (
            <>
              <div className="section-title">
                <span>{current.icon}</span>
                <span>{current.title}</span>
              </div>
              {current.articles.map((article, idx) => {
                const key = `${current.id}-${idx}`;
                const isOpen = openArticle === key;
                return (
                  <div className="article-item" key={key}>
                    <button
                      className={`article-toggle ${isOpen ? "open" : ""}`}
                      onClick={() => setOpenArticle(isOpen ? null : key)}
                    >
                      <span>{article.title}</span>
                      <span className="chevron">▼</span>
                    </button>
                    {isOpen && (
                      <div
                        className="article-body"
                        dangerouslySetInnerHTML={{
                          __html: article.content
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\n/g, "<br/>"),
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

-- Enable RLS on all tables but allow service role (Prisma) to bypass

-- Users table
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass for users" ON "users" FOR ALL USING (true) WITH CHECK (true);

-- Accounts table
ALTER TABLE "accounts" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass for accounts" ON "accounts" FOR ALL USING (true) WITH CHECK (true);

-- Sessions table
ALTER TABLE "sessions" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass for sessions" ON "sessions" FOR ALL USING (true) WITH CHECK (true);

-- Verification tokens table
ALTER TABLE "verificationtokens" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass for verificationtokens" ON "verificationtokens" FOR ALL USING (true) WITH CHECK (true);

-- Categories table
ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass for categories" ON "categories" FOR ALL USING (true) WITH CHECK (true);

-- Seller profiles table
ALTER TABLE "seller_profiles" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass for seller_profiles" ON "seller_profiles" FOR ALL USING (true) WITH CHECK (true);

-- Products table
ALTER TABLE "products" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass for products" ON "products" FOR ALL USING (true) WITH CHECK (true);

-- Product images table
ALTER TABLE "product_images" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass for product_images" ON "product_images" FOR ALL USING (true) WITH CHECK (true);

-- Messages table
ALTER TABLE "messages" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass for messages" ON "messages" FOR ALL USING (true) WITH CHECK (true);

-- Conversations table
ALTER TABLE "conversations" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass for conversations" ON "conversations" FOR ALL USING (true) WITH CHECK (true);

-- Conversation participants table
ALTER TABLE "conversation_participants" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass for conversation_participants" ON "conversation_participants" FOR ALL USING (true) WITH CHECK (true);

-- Contact forms table
ALTER TABLE "contact_forms" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role bypass for contact_forms" ON "contact_forms" FOR ALL USING (true) WITH CHECK (true);


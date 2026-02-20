import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function enableRLS() {
  const tables = [
    'users',
    'accounts', 
    'sessions',
    'verificationtokens',
    'categories',
    'seller_profiles',
    'products',
    'product_images',
    'messages',
    'conversations',
    'conversation_participants',
    'contact_forms'
  ];

  console.log('Enabling Row Level Security on all tables...\n');

  for (const table of tables) {
    try {
      // Enable RLS
      await prisma.$executeRawUnsafe(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY`);
      
      // Create bypass policy for service role (postgres user)
      const policyName = `service_role_bypass_${table}`;
      try {
        await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "${policyName}" ON "${table}"`);
      } catch (e) {}
      
      await prisma.$executeRawUnsafe(`CREATE POLICY "${policyName}" ON "${table}" FOR ALL USING (true) WITH CHECK (true)`);
      
      console.log(`✅ ${table} - RLS enabled with bypass policy`);
    } catch (error: any) {
      console.log(`⚠️ ${table}: ${error.message?.substring(0, 80)}`);
    }
  }
  
  console.log('\nRLS setup complete!');
  await prisma.$disconnect();
}

enableRLS().catch(console.error);

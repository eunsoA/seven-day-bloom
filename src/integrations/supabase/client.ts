// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dspxacgyzrqibdxazqrv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzcHhhY2d5enJxaWJkeGF6cXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNDkzNTQsImV4cCI6MjA2NjkyNTM1NH0.Co182HLBSBemPJ3W5lOveQOqQYd5SFTEAiJYRDonS3Q";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
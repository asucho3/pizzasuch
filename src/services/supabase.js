import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://elrlzjselfvcxftnqsph.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscmx6anNlbGZ2Y3hmdG5xc3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2ODA1NTksImV4cCI6MjAwNDI1NjU1OX0.1P6yra7sRRLvSd0lahS8i1HQjX9lWFCJvC464orhQmQ`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

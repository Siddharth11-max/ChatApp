// src/config/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ffxdvxhulgqbqwucnkmq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmeGR2eGh1bGdxYnF3dWNua21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5OTI0MTgsImV4cCI6MjA2MzU2ODQxOH0.Eqi5H_x8GynoVasMuyx2GlzycIYH1-GL-BkyyZuwy3k'
export const supabase = createClient(supabaseUrl, supabaseKey)

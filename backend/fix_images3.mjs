import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const defaultImages = {
  face: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
  body: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
  hair: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=600&q=80",
  specialty: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
};

const defaultBanners = {
  face: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
  body: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
  hair: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
  specialty: "https://images.unsplash.com/photo-1615397323214-3a216f446059?auto=format&fit=crop&w=1200&q=80"
};

async function fixImages() {
  const { data: services, error } = await supabase.from('services').select('*');
  if (error) {
    console.error("Error fetching:", error);
    return;
  }
  
  for (const service of services) {
    const newImage = defaultImages[service.category] || defaultImages.face;
    const newBanner = defaultBanners[service.category] || defaultBanners.face;
    
    const { error: updateError } = await supabase.from('services').update({ 
      image_url: newImage,
      banner_url: newBanner
    }).eq('id', service.id);
    
    if (updateError) {
      console.error(`Failed to update ${service.title_en}:`, updateError);
    } else {
      console.log(`Updated ${service.title_en} (${service.category})`);
    }
  }
  console.log("Database update complete!");
}

fixImages();

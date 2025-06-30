// lib/upload.js
import { supabase } from '../config/supabase'; // adjust path if needed
import { v4 as uuidv4 } from 'uuid';

const upload = async (file) => {
  if (!file) throw new Error("No file provided");

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('avatars') // your bucket name
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  // Get the public URL
  const { data: publicUrlData } = supabase
    .storage
    .from('avatars')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

export default upload;

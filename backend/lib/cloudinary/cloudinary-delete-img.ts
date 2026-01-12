
import cloudinary from './clodinary.config';

export async function cloudinaryDeleteImg(publicId: string) {
  try {
    if (!publicId) {
      return null;
    }
    
    const result = await cloudinary.uploader.destroy(publicId);
    
    
    if (result.result === 'ok' || result.result === 'not found') {
      return { success: true, message: 'Image deleted successfully' };
    } else {
      throw new Error(`Failed to delete: ${result.result}`);
    }
  } catch (error) {
    throw error;
  }
}
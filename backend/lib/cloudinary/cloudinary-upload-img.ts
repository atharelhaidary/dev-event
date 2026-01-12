import cloudinary from "./clodinary.config";
export async  function cloudinaryUploadImg  (image : Blob | File ){
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvent' }, (error, results) => {
            if(error) return reject(error);

            resolve(results);
        }).end(buffer);
    });
    const result = uploadResult as { secure_url: string; public_id: string };
    return {
      path: result.secure_url,
      id: result.public_id 
    };
}




               
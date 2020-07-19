const CLOUDINARY_IMAGE_PARAMETER = `c_scale,h_`;

export function createCloudinaryUrl({
  height,
  publicId,
}: {
  height: number;
  publicId: string;
}) {
  const { NEXT_PUBLIC_CLOUDINARY_URL_BASE: URL_BASE } = process.env;
  return `${URL_BASE}/${CLOUDINARY_IMAGE_PARAMETER}${height}/${publicId}`;
}

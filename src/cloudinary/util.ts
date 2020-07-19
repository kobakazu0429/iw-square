export function createCloudinaryUrl({
  height,
  publicId,
  quality,
}: {
  height?: number;
  publicId: string;
  quality?: number;
}) {
  const { NEXT_PUBLIC_CLOUDINARY_URL_BASE: URL_BASE } = process.env;
  const imageParams = ["c_scale"];
  if (height) imageParams.push(`h_${height}`);
  imageParams.push(`q_${quality ? quality : "auto"}`);

  return `${URL_BASE}/${imageParams.join(",")}/${publicId}`;
}

import { buildHeader } from "@/infrastructure/utilities.auth";

const apiUrl = process.env.MY_CMS_API_URL;

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get('image');

  if (!image || !(image instanceof File)) {
    return Response.json({ error: 'Invalid image file' }, { status: 400 });
  }

  const uploadFormData = new FormData();
  uploadFormData.append('image', image);

  const result = await fetch(`${apiUrl}/media/images`, {
    method: 'POST',
    headers: await buildHeader(true, false),
    body: uploadFormData
  });

  if (!result.ok) {
    const x = (await result.text());
    return Response.json({ error: 'Failed to upload image' }, { status: result.status });
  }

  const responseData = await result.json();
  return Response.json(responseData);
}

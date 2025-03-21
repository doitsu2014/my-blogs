import graphQLClient from '@/infrastructure/graphQL/graphql-client';
import buildGetPostsQuery from '@/infrastructure/graphQL/queries/posts/get-posts';
import { mapGraphQlModelToPostModel } from '@/infrastructure/graphQL/utilities';
import { buildHeader } from '@/infrastructure/utilities.auth';

const apiUrl = process.env.MY_CMS_API_URL;

export async function GET(req: Request) {
  try {
    const { data } = await graphQLClient.query({
      query: buildGetPostsQuery(),
      fetchPolicy: 'no-cache'
    });
    return Response.json((data?.posts?.nodes || []).map(mapGraphQlModelToPostModel));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return Response.json([]);
  }
}

export interface CreateBlogModel {
  title: string;
  previewContent: string;
  content: string;
  thumbnailPaths: string[];
  published: boolean;
  categoryId: string;
  tagNames: string[];
}

export async function POST(req: Request) {
  const body: CreateBlogModel = await req.json();

  const result = await fetch(`${apiUrl}/posts`, {
    method: 'POST',
    headers: await buildHeader(),
    body: JSON.stringify({
      ...body
    })
  });

  if (result.ok) {
    return new Response(JSON.stringify(await result.json()), { status: 200 });
  }

  return new Response(await result.text(), {
    status: result.status
  });
}

export interface UpdateBlogModel {
  id: string;
  title: string;
  previewContent: string;
  content: string;
  thumbnailPaths: string[];
  published: boolean;
  categoryId: string;
  tagNames: string[];
  rowVersion: number;
}

export async function PUT(req: Request) {
  const body: UpdateBlogModel = await req.json();

  const result = await fetch(`${apiUrl}/posts`, {
    method: 'PUT',
    headers: await buildHeader(),
    body: JSON.stringify({
      ...body
    })
  });

  if (result.ok) {
    return new Response(JSON.stringify(await result.json()), { status: 200 });
  }

  return new Response(await result.text(), {
    status: result.status
  });
}

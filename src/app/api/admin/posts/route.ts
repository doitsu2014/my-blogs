import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetPostsQuery from '@/infrastructure/graphQL/queries/posts/get-posts';
import { mapGraphQlModelToPostModel } from '@/infrastructure/graphQL/utilities';
import { buildHeader } from '@/infrastructure/utilities.auth';
import { UpdateBlogModel } from './models/UpdateBlogModel';
import { CreateBlogModel } from './models/CreateBlogModel';

const apiUrl = process.env.MY_CMS_API_URL;

export async function GET(req: Request) {
  try {
    const { data } = await buildGraphQLClient().query({
      query: buildGetPostsQuery(),
      fetchPolicy: 'no-cache'
    });
    return Response.json((data?.posts?.nodes || []).map(mapGraphQlModelToPostModel));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return Response.json([]);
  }
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

import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import { buildGetPostWithTranslationsByIdQuery } from '@/infrastructure/graphQL/queries/posts/get-post-by-id';
import { mapGraphQlModelToPostModel } from '@/infrastructure/graphQL/utilities';
import { buildHeader } from '@/infrastructure/utilities.auth';

export const GET = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  try {
    const { data } = await buildGraphQLClient().query({
      query: buildGetPostWithTranslationsByIdQuery(id),
      fetchPolicy: 'no-cache'
    });

    const result = (data?.posts?.nodes || []).map(mapGraphQlModelToPostModel)[0];
    return Response.json(result);
  } catch (error) {
    console.error('Error fetching post:', error);
    return new Response(
      JSON.stringify({
        message: 'Error fetching post',
        error
      }),
      { status: 500 }
    );
  }
};

const apiUrl = process.env.MY_CMS_API_URL;

export const DELETE = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  try {
    const result = await fetch(`${apiUrl}/posts`, {
      method: 'DELETE',
      headers: await buildHeader(true, true),
      body: JSON.stringify([id])
    });

    if (!result.ok) {
      return new Response(await result.text(), {
        status: result.status
      });
    }

    return Response.json(result);
  } catch (error) {
    console.error('Error deleting category:', error);
    return new Response(
      JSON.stringify({
        message: 'Error deleting category',
        error
      }),
      { status: 500 }
    );
  }
};

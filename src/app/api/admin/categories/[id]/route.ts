import { auth } from '@/auth';
import { CategoryModel, CategoryTypeEnum } from '@/domains/category';
import client, { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQlClient';
import { gql } from '@apollo/client';

export const GET = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const query = gql`
    query GetCategoryById {
      categories(filters: { id: { eq: "${id}" } }) {
        nodes {
          id
          displayName
          slug
          categoryType
          createdBy
          createdAt
          rowVersion
          categoryTags {
            nodes {
              tags {
                id
                name
                slug
              }
            }
          }
        }
      }
    }`;
  try {
    const { data } = await client.query({
      query
    });
    return Response.json((data?.categories?.nodes || []).map(mapGraphQlModelToCategoryModel)[0]);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response(
      JSON.stringify({
        message: 'Error fetching categories',
        error
      }),
      { status: 500 }
    );
  }
};

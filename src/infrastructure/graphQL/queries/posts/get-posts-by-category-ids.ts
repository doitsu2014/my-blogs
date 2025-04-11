import { gql } from '@apollo/client';

export default function buildGetPostsByCategoryIds(
  blogCategories: string[],
  isFilterByPublished: boolean = false
) {
  return gql`
    query GetBlogs {
      posts(filters: {
        categoryId: {
          is_in: ${JSON.stringify(blogCategories)}
        },
        ${isFilterByPublished ? 'published: { eq: true }' : ''},
      }) {
        nodes {
          id,
          title,
          previewContent,
          thumbnailPaths,
          slug,
          published,
          createdBy,
          createdAt,
          lastModifiedBy,
          lastModifiedAt,
          categoryId,
          categories {
            displayName,
            slug
          }
          rowVersion,
          postTags {
            nodes {
              tags {
                id,
                name,
                slug
              }
            }
          }
        }
      }
    }`;
}

export function buildGetPostsWithTranslationsByCategoryIds(
  blogCategories: string[],
  isFilterByPublished: boolean = false
) {
  return gql`
    query GetBlogs {
      posts(filters: {
        categoryId: {
          is_in: ${JSON.stringify(blogCategories)}
        },
        ${isFilterByPublished ? 'published: { eq: true }' : ''},
      }) {
        nodes {
          id,
          title,
          previewContent,
          thumbnailPaths,
          slug,
          published,
          createdBy,
          createdAt,
          lastModifiedBy,
          lastModifiedAt,
          categoryId,
          categories {
            displayName,
            slug
          }
          rowVersion,
          postTags {
            nodes {
              tags {
                id,
                name,
                slug
              }
            }
          }
          postTranslations {
            nodes {
              id
              languageCode
              title
              previewContent
              slug
            }
          }
        }
      }
    }`;
}

export function buildGetPostsByCategoryIdsInFooter(
  blogCategories: string[],
  isFilterByPublished: boolean = false
) {
  return gql`
    query GetBlogs {
      posts(filters: {
        categoryId: {
          is_in: ${JSON.stringify(blogCategories)}
        },
        ${isFilterByPublished ? 'published: { eq: true }' : ''},
      }, 
      orderBy: {
        createdAt: DESC
      },
      pagination: {
        page: {
          limit: 5,
          page: 0
        }
      }) {
        nodes {
          id
          title
          slug
          createdAt
          categories {
            id
            displayName
            slug
            categoryType
            categoryTranslations {
              nodes {
                id
                displayName
                languageCode
                slug
              }
            }
          }
          postTranslations {
            nodes {
              id
              languageCode
              title
              slug
            }
          }
        }
      }
    }`;
}

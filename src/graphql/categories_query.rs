#![allow(clippy::all, warnings)]
pub struct Categories;
pub mod categories {
    #![allow(dead_code)]
    use std::result::Result;
    pub const OPERATION_NAME: &str = "Categories";
    pub const QUERY : & str = "query Categories {\n  categories {\n    nodes {\n      id\n      displayName\n      slug\n      categoryType\n      categoryTags {\n        nodes {\n          tags {\n            id\n            name\n            slug\n          }\n        }\n      }\n    }\n  }\n}\n" ;
    use super::*;
    use serde::{Deserialize, Serialize};
    #[allow(dead_code)]
    type Boolean = bool;
    #[allow(dead_code)]
    type Float = f64;
    #[allow(dead_code)]
    type Int = i64;
    #[allow(dead_code)]
    type ID = String;
    #[derive()]
    pub enum CategoryTypeEnum {
        BLOG,
        OTHER,
        Other(String),
    }
    impl ::serde::Serialize for CategoryTypeEnum {
        fn serialize<S: serde::Serializer>(&self, ser: S) -> Result<S::Ok, S::Error> {
            ser.serialize_str(match *self {
                CategoryTypeEnum::BLOG => "BLOG",
                CategoryTypeEnum::OTHER => "OTHER",
                CategoryTypeEnum::Other(ref s) => &s,
            })
        }
    }
    impl<'de> ::serde::Deserialize<'de> for CategoryTypeEnum {
        fn deserialize<D: ::serde::Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
            let s: String = ::serde::Deserialize::deserialize(deserializer)?;
            match s.as_str() {
                "BLOG" => Ok(CategoryTypeEnum::BLOG),
                "OTHER" => Ok(CategoryTypeEnum::OTHER),
                _ => Ok(CategoryTypeEnum::Other(s)),
            }
        }
    }
    #[derive(Serialize)]
    pub struct Variables;
    #[derive(Deserialize)]
    pub struct ResponseData {
        pub categories: CategoriesCategories,
    }
    #[derive(Deserialize)]
    pub struct CategoriesCategories {
        pub nodes: Vec<CategoriesCategoriesNodes>,
    }
    #[derive(Deserialize)]
    pub struct CategoriesCategoriesNodes {
        pub id: String,
        #[serde(rename = "displayName")]
        pub display_name: String,
        pub slug: String,
        #[serde(rename = "categoryType")]
        pub category_type: CategoryTypeEnum,
        #[serde(rename = "categoryTags")]
        pub category_tags: CategoriesCategoriesNodesCategoryTags,
    }
    #[derive(Deserialize)]
    pub struct CategoriesCategoriesNodesCategoryTags {
        pub nodes: Vec<CategoriesCategoriesNodesCategoryTagsNodes>,
    }
    #[derive(Deserialize)]
    pub struct CategoriesCategoriesNodesCategoryTagsNodes {
        pub tags: Option<CategoriesCategoriesNodesCategoryTagsNodesTags>,
    }
    #[derive(Deserialize)]
    pub struct CategoriesCategoriesNodesCategoryTagsNodesTags {
        pub id: String,
        pub name: String,
        pub slug: String,
    }
}
impl graphql_client::GraphQLQuery for Categories {
    type Variables = categories::Variables;
    type ResponseData = categories::ResponseData;
    fn build_query(variables: Self::Variables) -> ::graphql_client::QueryBody<Self::Variables> {
        graphql_client::QueryBody {
            variables,
            query: categories::QUERY,
            operation_name: categories::OPERATION_NAME,
        }
    }
}

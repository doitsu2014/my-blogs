use crate::{
    graphql::categories_query::{
        categories::{self, CategoriesCategories, ResponseData, Variables},
        Categories,
    },
    pages::Route,
};
use dioxus::{logger::tracing::info, prelude::*};
use graphql_client::{reqwest::post_graphql, GraphQLQuery};
use reqwest_crate as reqwest;

#[component]
pub fn AppLayout() -> Element {
    let links = vec![
        (Route::Home {}, String::from("Home")),
        (Route::BlogDetail { id: 1 }, String::from("Blog 1")),
    ];

    rsx! {
        Navbar {
            links
        },

        Outlet::<Route> {}
    }
}

#[component]
fn Navbar(links: Vec<(Route, String)>) -> Element {
    // let mut categories: Signal<Vec<CategoriesCategories>> = use_signal(|| vec![]);

    let mut res_categories = use_resource(|| async move {
        // let query = Categories::build_query(Variables);
        let client = reqwest::Client::new();
        let res = post_graphql::<Categories, _>(
            &client,
            "https://my-cms-api.ducth.dev/graphql/immutable",
            Variables,
        )
        .await;

        if let Some(e) = res.unwrap().data {
            Some(e.categories)
        } else {
            None
        }
    });

    // let fetch_categories = move || async move {
    //     // let query = Categories::build_query(Variables);
    //     let client = reqwest::Client::new();
    //     let res = post_graphql::<Categories, _>(
    //         &client,
    //         "https://my-cms-api.ducth.dev/graphql/immutable",
    //         Variables,
    //     )
    //     .await;
    //
    //     if let Some(e) = res.unwrap().data {
    //         categories.set(vec![e.categories]);
    //     }
    // };
    //
    // fetch_categories();

    rsx! {
        div {
            class: "navbar bg-base-100",
            div {
                class: "flex-1",
                a {
                    class: "btn btn-ghost text-xl", "daisyUI"
                }
            }
            div {
                class: "flex-none",
                ul {
                    class: "menu menu-horizontal px-1",
                    {
                        links.iter().map(|(route, display)| {
                            let display = display.clone();
                            rsx! {
                                li {
                                    Link {
                                        to: route.clone(),
                                        {
                                            display
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
            }
        }
        div {
            {res_categories}
        }
    }
}

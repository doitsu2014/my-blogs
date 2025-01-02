use crate::{common::*, pages::Route};
use dioxus::prelude::*;

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
    }
}

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
            id: "navbar",
            {
                links.iter().map(|(route, display)| {
                    let display = display.clone();
                    rsx! {
                        Link {
                            to: route.clone(),
                            {
                                display
                            }
                        }
                    }
                })
            }
        }
    }
}

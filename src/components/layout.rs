use crate::components::blog::Blog;
use dioxus::prelude::*;

#[derive(Debug, Clone, Routable, PartialEq)]
#[rustfmt::skip]
pub enum Route {
    #[layout(Layout)]
    #[route("/")]
    Blog {},
    // #[route("/blog/:id")]
    // Blog { id: i32 },
}

/// Shared navbar component.
#[component]
pub fn Layout() -> Element {
    rsx! {
        div {
            id: "navbar",
            Link {
                to: Route::Blog { },
                "Blog"
            }
        }

        Outlet::<Route> {}
    }
}

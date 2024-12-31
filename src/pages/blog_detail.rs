use dioxus::prelude::*;
use crate::pages::Route;

/// BlogDetail page
#[component]
pub fn BlogDetail(id: i32) -> Element {
    rsx! {
        div {
            id: "blog",

            // Content
            h1 { "This is blog #{id}!" }
            p { "In blog #{id}, we show how the Dioxus router works and how URL parameters can be passed as props to our route components." }

            // Navigation links
            Link {
                to: Route::BlogDetail { id: id - 1 },
                "Previous"
            }
            span { " <---> " }
            Link {
                to: Route::BlogDetail { id: id + 1 },
                "Next"
            }
        }
    }
}

use dioxus::prelude::*;

use crate::components::router::Route;

#[component]
pub fn Blog(id: i32) -> Element {
    rsx! {
        Link { to: Route::Home {}, "Go to counter" }
        "Blog post {id}"
    }
}

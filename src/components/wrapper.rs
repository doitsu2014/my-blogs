use crate::components::router::Route;
use dioxus::prelude::*;

#[component]
pub fn Wrapper() -> Element {
    rsx! {
        header {"Header"}
        Router::<Route> {}
        footer {"footer"}
    }
}

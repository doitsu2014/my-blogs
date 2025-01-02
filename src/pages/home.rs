use dioxus::prelude::*;

use crate::common::APP_LOGO;

#[component]
pub fn Home() -> Element {
    rsx! {
        div {
            class: "hero bg-base-200 min-h-screen",
            div {
                class: "hero-content flex-col lg:flex-row-reverse",
                img {
                    src: APP_LOGO,
                    class: "max-w-sm rounded-lg shadow-2xl",
                }
                div {
                    h1 {
                        class: "text-5xl font-bold", "D Tech's blogs"
                    }
                    p {
                        class: "py-6",
                        "Lorem"
                    }
                    button { class: "btn btn-primary", "Explore" }
                }
            }
        }
    }
}

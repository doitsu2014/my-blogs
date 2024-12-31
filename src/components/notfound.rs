use dioxus::prelude::*;

#[component]
pub fn NotFound(segments: Vec<String>) -> Element {
    rsx! {
        div {
            class: "flex items-center justify-center min-h-screen bg-white shadow-lg rounded-lg p-8 flex flex-col items-center",
            h1 {
                class: "text-6xl font-bold text-red-500",
                "404"
            }
            h2 {
                class: "text-2xl font-semibold text-gray-800 mt-4",
                "Page not found"
            }
            p {
                class: "text-gray-600 mt-2 text-center",
                "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
            }
        }
    }
}

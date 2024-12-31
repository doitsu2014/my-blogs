pub mod blog_detail;
pub mod blogs;
pub mod home;
pub mod notfound;

use blog_detail::BlogDetail;
use dioxus::prelude::*;
use home::Home;
use notfound::NotFound;

use crate::components::layout::AppLayout;

#[derive(Debug, Clone, Routable, PartialEq)]
#[rustfmt::skip]
pub enum Route {
    #[layout(AppLayout)]
        #[route("/")]
        Home {},
        #[route("/blog/:id")]
        BlogDetail { id: i32 },
    #[end_layout]

    #[route("/:..segments")]
    NotFound { segments: Vec<String> },
}

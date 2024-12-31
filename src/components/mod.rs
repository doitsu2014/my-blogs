pub mod layout;
pub mod notfound;

use dioxus::prelude::*;
use layout::*;
use notfound::NotFound;

#[derive(Debug, Clone, Routable, PartialEq)]
#[rustfmt::skip]
pub enum Route {
    #[layout(AppLayout)]
        #[route("/")]
        Home {},
        #[route("/blog/:id")]
        Blog { id: i32 },
    #[end_layout]

    #[route("/:..segments")]
    NotFound { segments: Vec<String> },
}

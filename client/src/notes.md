//_ GENERAL NOTES
//_-------------------------------
//? thinking of create a page/view class, not sure about it yet but below is what module will do so maybe page does whats left over in terms of view
//? module handles only things related to it, ex. case notes module class only does case notes, doesn't care about main site nav or anything else
//? so to start we would have a login view and a main view for like the site nav/ top nav
//? but we would have a login module that would handle the login form etc, so we could for example show login module in login view,
//? then say later they time out or something instead of sending back to login page, we could temp disable site and show login module in popup dialog
//? by doing view/page separate from module we could tech. do different side nav depending on what module they are in, or custom the top menu bar.
//? another benefit is we could have views that are shared between modules or use multiple views with a single module for stuff like a/b testing
//? could have admin/non admin views for module or even site wide
//? views could be nested but final child of "nest" would have to be module class, idk about nesting a module inside a top layer view.
//? so a view could only either A: contain another view or contain some components like buttons, links etc. or B: contain a module and module only(maybe componets but)

//_ MODULE CLASS
//_-------------------------------
// module should create a store scoped to module, maybe some getters for certain data
// rendor method similar to components
// pre fetch data, only the most important, use fetchData worker
//? a way for module to tie into router, do we let module create route or do we do this in separate file
//? a way for module to render a widget, or a way for widget to easily tie into module class code

const routes = [
    { href: "/streamDream/new", title: "New Artist" },
    { href: "/comments", title: "Comments" },
    { href: "/logout", title: "Logout" },
];

const authRoutes = [
    { href: "/login", title: "Login" },
    { href: "/register", title: "Register" },
];

let navLinks = function welcome(req, res, next) {
    if (req.session.currentUser) {
        res.locals.routes = routes;
    } else {
        res.locals.routes = authRoutes;
    }
    next();
};

module.exports = navLinks
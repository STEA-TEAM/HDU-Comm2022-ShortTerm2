const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout"),
    children: [
      { path: "", redirect: "/dashboard" },
      {
        path: "dashboard",
        components: {
          header: () => import("layouts/headers/MainHeader"),
          default: () => import("pages/Dashboard")
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue")
  }
];

export default routes;

router.on({
  path: "/user",
  action: () => {},
  prefetch: [["getLocationsJSON", { userId: "12344" }]],
});

const Dashboard = () => {};

router.on({
  path: "/user",
  page: Dashboard,
  loader: async () => {
    const resp = await fetchData("getLocationsJSON", { userId: "12344" });
    console.log(reps);
  },
});

export default function ({ app, route, redirect, context }) {
  var user = app.$cookies.get("user");
  if (route.path == "/login") {
    if (app.$cookies.get("user") != null) {
      return redirect("/frontend");
    }
  }

  if (user == null) {
    if (route.path == "/frontend") {
      return redirect("/frontend/login");
    }
  }
}

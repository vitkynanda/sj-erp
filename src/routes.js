/** 
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/users";

// @mui icons
import Icon from "@mui/material/Icon";
import Banks from "layouts/bank";
import Coins from "layouts/coin";
import Transactions from "layouts/transaction";
import Players from "layouts/players";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Transaction",
    key: "transaction",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/transaction",
    component: <Transactions />,
  },
  {
    type: "collapse",
    name: "Players",
    key: "players",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/players",
    component: <Players />,
  },
  {
    type: "collapse",
    name: "Bank",
    key: "bank",
    icon: <Icon fontSize="small">account_balance</Icon>,
    route: "/bank",
    component: <Banks />,
  },
  {
    type: "collapse",
    name: "Coin",
    key: "coin",
    icon: <Icon fontSize="small">paid</Icon>,
    route: "/coin",
    component: <Coins />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users",
    component: <Users />,
  },
];

export default routes;

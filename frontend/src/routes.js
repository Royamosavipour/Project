import Index from "./Pages/Index/Index";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import Category from "./Pages/Category/Category";
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo";
import Courses from "./Pages/Courses/Courses";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Register/Register";
import Articels from "./Pages/Articels/Articels";
import Contact from "./Pages/Contact/Contact";
import Search from "./Pages/Search/Search";

import AdminPanel from "./Pages/AdminPanel/index";
import Users from "./Pages/AdminPanel/Users/Users";
import AdminCourses from "./Pages/AdminPanel/AdminCourses/AdminCourses";
import Menus from "./Pages/AdminPanel/Menus/Menus";
import AdminArticles from "./Pages/AdminPanel/Articles/Articles";
import AdminCategory from "./Components/AdminPanel/Category/Category";
import AdminContact from "./Pages/AdminPanel/Contact/Contact";
import AdminSessions from "./Pages/AdminPanel/Sessions/Sessions";
import Session from "./Pages/Session/Session";
import Comments from "./Pages/AdminPanel/Comments/Comments";
import Offs from "./Pages/AdminPanel/Offs";
import Draft from "./Pages/Articels/Draft/Draft";
import PAdminIndex from "./Pages/AdminPanel/Index/Index";

import UserPanel from "./Pages/UserPanel/Index";
import UserPanelIndex from "./Pages/UserPanel/UserPanelIndex/UserPanelIndex";
import Order from "./Pages/UserPanel/Order/Order";
import CoursesUserPanel from "./Pages/UserPanel/Courses/Courses";
import UserPanelSendTicket from "./Pages/UserPanel/Tickets/SendTicket";
import UsrtPanelTickets from "./Pages/UserPanel/Tickets/Tickets";
import TickrtAnswer from "./Pages/UserPanel/Tickets/TicketAnswer";
import EditAccunt from "./Pages/UserPanel/EditAccunt/EditAccunt";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/category-info/:categoryName/:page", element: <Category /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/articels/:page", element: <Articels /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact", element: <Contact /> },
  { path: "/search/:value", element: <Search /> },
  { path: "/:courseName/:sessionID", element: <Session /> },

  {
    path: "/p-admin/*",
    element: <AdminPanel />,
    children: [
      { path: "", element: <PAdminIndex /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "menus", element: <Menus /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "articles/draft/:shortName", element: <Draft /> },
      { path: "category", element: <AdminCategory /> },
      { path: "contacts", element: <AdminContact /> },
      { path: "sessions", element: <AdminSessions /> },
      { path: "comments", element: <Comments /> },
      { path: "offs", element: <Offs /> },
    ],
  },
  {
    path: "/my-accunt/*",
    element: <UserPanel />,
    children: [
      { path: "", element: <UserPanelIndex /> },
      { path: "orders", element: <Order /> },
      { path: "buyed", element: <CoursesUserPanel /> },
      { path: "tickets", element: <UsrtPanelTickets /> },
      { path: "send-ticket", element: <UserPanelSendTicket /> },
      { path: "tickets/answer/:id", element: <TickrtAnswer /> },
      { path: "edit-account", element: <EditAccunt /> },
    ],
  },
];

export default routes;

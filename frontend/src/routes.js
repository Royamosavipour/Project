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
import AdminArticles from './Pages/AdminPanel/Articles/Articles'

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
  {
    path: " /*",
    element: <AdminPanel />,
    children: [
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "menus", element: <Menus /> },
      { path: "articles", element: <AdminArticles/> },
    ],
  },
];

export default routes;

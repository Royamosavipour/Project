import Index from "./Pages/Index/Index";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import Category from "./Pages/Category/Category";
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo";
import Courses from "./Pages/Courses/Courses";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Register/Register";
import Articels from './Pages/Articels/Articels'
import Contact from "./Pages/Contact/Contact";

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
];

export default routes;

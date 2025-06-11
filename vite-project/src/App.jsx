import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AddProduct from "./components/Admin/AddProduct";
import EditForm from "./components/Admin/EditForm";
import AddBlog from "./components/Admin/AddBlog";
import EditBlog from "./components/Admin/EditBlog";
import { Toaster } from 'react-hot-toast';
import AllBlog from "./components/AllBlog";
import AllProduct from "./components/Admin/AllProduct";
import AllProductDetails from "./components/Admin/AdminProductDetails";
import AdminBlogDetails from "./components/Admin/AdminBlogDetails";
const Nav = lazy(() => import('./components/Nav'));
const Footer = lazy(() => import('./components/Footer'));
const PhoneCall = lazy(() => import('./components/PhoneCall'));
const Layout = lazy(() => import('./components/Layout'));
const Catgory = lazy(() => import('./components/Catgory'));
const ColdCatgory = lazy(() => import('./components/ColdCatgory'));
const HotCatDelevery = lazy(() => import('./components/HotCatDelevery'));
const Hotrolledcoilcat = lazy(() => import('./components/Hotrolledcoilcat'));
const HotCatCoilsDEl = lazy(() => import('./components/HotCatCoilsDEl'));
const ColdSheetDel = lazy(() => import('./components/ColdSheetDel'));
const ColdCoils = lazy(() => import('./components/ColdCoils'));
const ColdCoilsdel = lazy(() => import('./components/ColdCoilsdel'));
const SearchPage = lazy(() => import('./components/SearchPage'));
const Product = lazy(() => import('./components/Product'));
const About = lazy(() => import('./components/About'));
const ContactFrom = lazy(() => import('./components/ContactForm'));
const HotRollSheetPage = lazy(() => import('./components/HotRollSheetPage'));
const HRCoils = lazy(() => import('./components/HRCoils'));
const CRSheets = lazy(() => import('./components/CRSheets'));
const CRCoils = lazy(() => import('./components/CRCoils'));
const PrivacyPage = lazy(() => import('./components/PrivacyPage'));
const Blog1 = lazy(() => import('./components/Blog1'));
const Blog2 = lazy(() => import('./components/Blog2'));
const Blog3 = lazy(() => import('./components/Blog3'));
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import AdminTestimonial from "./components/Admin/AdminTestimonial";
import EditTestimonial from "./components/Admin/EditTestimonial";

const matchPath = (path, pathname) => {
  if (path.includes(':id')) {
    const basePath = path.split('/:id')[0];
    return pathname.startsWith(basePath);
  }
  return pathname === path || pathname.startsWith(path);
};
const AppLayout = () => {
  const location = useLocation();         // ✅ Step 1
  const pathname = location.pathname;     // ✅ Step 2


  const isAdminLogin=sessionStorage.getItem('isAdmin')==="true";
  // const pathname = location.pathname;
  const adminOnlyPaths=[
    "/adminlogin",
    "/admindashboard",
    "/addproduct",
    "/editproduct",
    "/addBlog",
    "/editblog",
    "/adminallproduct",
    "/adminallblog",
    "/createtestimonial"
  ];

  const shareAdminPaths=["/allblogs","/allProduct","/coilproduct/:id"
    ,"/product/:id", "/coilproduct/:id", "/coldproductsheet/:id", "/coldproductcoil/:id"

   ,"/blog/:id"
  ];

  const isAdminRoute =
  adminOnlyPaths.some(path => matchPath(path, pathname)) ||
  (isAdminLogin && shareAdminPaths.some(path => matchPath(path, pathname)));

  
  
  
  
  
  
  
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-full">
          <img src="/steelpic.jpg" className=" rounded-full h-24 w-24 border-t-4 border-b-4 border-[#12396d]"></img>
          <p className="ml-4 text-[#12396d]  font-semibold text-lg">Loading...</p>
        </div>
      }
    >
      <div className="w-full overflow-x-hidden">
      {!isAdminRoute && <Nav />}
        <main className="w-full overflow-x-hidden">
          <Outlet />
        </main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <PhoneCall />}
      </div>
    </Suspense>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Layout /> },
      { path: "hotRolled/sheet", element: <Catgory /> },
      { path: "hotRolled/coils", element: <Hotrolledcoilcat /> },
      { path: "coldRolled/sheet", element: <ColdCatgory /> },
      { path: "coldRolled/coils", element: <ColdCoils /> },
      { path: "product/:id", element: <HotCatDelevery /> },
      { path: "coilproduct/:id", element: <HotCatCoilsDEl /> },
      { path: "coldproductsheet/:id", element: <ColdSheetDel /> },
      { path: "coldproductcoil/:id", element: <ColdCoilsdel /> },
      { path: "search", element: <SearchPage /> },
      { path: "mildStainless", element: <Product /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <ContactFrom /> },
      { path: "hrsheets", element: <HotRollSheetPage /> },
      { path: "hrcoils", element: <HRCoils /> },
      { path: "crsheets", element: <CRSheets /> },
      { path: "crcoils", element: <CRCoils /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "/admindashboard", element: <AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute> },
{ path: "/addproduct", element: <AdminProtectedRoute><AddProduct /></AdminProtectedRoute> },
{ path: "/editproduct/:id", element: <AdminProtectedRoute><EditForm /></AdminProtectedRoute> },
{ path: "/addBlog", element: <AdminProtectedRoute><AddBlog /></AdminProtectedRoute> },
{ path: "/editblog/:id", element: <AdminProtectedRoute><EditBlog /></AdminProtectedRoute> },
{ path: "/adminallproduct", element: <AdminProtectedRoute><AllProductDetails /></AdminProtectedRoute> },
{ path: "/adminallblog", element: <AdminProtectedRoute><AdminBlogDetails /></AdminProtectedRoute> },
      // { path: "temp", element: <Blog1 /> },

// { path: "smooth", element: <Blog2 /> },
// { path: "basic", element: <Blog3 /> },
{ path: "/adminlogin", element: <AdminLogin /> },
{path:"/admindashboard",element:<AdminDashboard/>},
{path:"/addproduct",element:<AddProduct/>},
{path:"/editproduct/:id",element:<EditForm/>},
{path:"/addBlog",element:<AddBlog/>},
{path:"/blog/:id",element:<Blog1/>},
// {path:"/addBlog/:id",element:<Blog2/>},
// {path:"/addBlog/:id",element:<Blog3/>},
{path:"/editblog/:id",element:<EditBlog/>},
{path:"/allblogs",element:<AllBlog/>}, 
{path:"/allproduct",element:<AllProduct/>}, 
{path:"/adminallproduct",element:<AllProductDetails/>},  
{path:"/adminallblog",element:<AdminBlogDetails/>}, 
{path:"/createtestimonial",element:<AdminTestimonial/>},  
 {path:"/edittestimonial/:id",element:<EditTestimonial/>},  

    ],
  },
]);

function App() {

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17041977731/C92DCJmT7scaEIPjn74_'
      });
    }
  }, [location]);
  return (
    <>
  <Toaster position="top-center" reverseOrder={false} />
  <RouterProvider router={appRouter} />
 
  </>
  )
}

export default App;

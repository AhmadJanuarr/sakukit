import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { RootLayout } from "./shared/components/layouts/RootLayout";
import { GlobalModal } from "./shared/components/ui/GlobalModal";
import { ScrollToTopOnMount } from "./shared/components/ui/ScrollToTopOnMount";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/about/AboutPage";
import ChangelogPage from "./pages/changelog/ChangelogPage";
import FAQPage from "./pages/faq/FAQPage";
import PrivacyPage from "./pages/privacy/PrivacyPage";
import ImageCompressPage from "./pages/tools/image-compress/ImageCompressPage";
import ImageConverterPage from "./pages/tools/image-converter/ImageConverterPage";
import ImageResizerPage from "./pages/tools/image-resizer/ImageResizerPage";
import InstagramDownloaderPage from "./pages/tools/instagram/InstagramDownloaderPage";
import TiktokDownloaderPage from "./pages/tools/tiktok/TiktokDownloaderPage";
import YoutubeDownloaderPage from "./pages/tools/youtube/YoutubeDownloaderPage";

const AppShell = () => {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <GlobalModal />
      <ScrollToTopOnMount />
      <Outlet />
      <Toaster richColors />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/about", element: <AboutPage /> },
          { path: "/faq", element: <FAQPage /> },
          { path: "/privacy", element: <PrivacyPage /> },
          { path: "/changelog", element: <ChangelogPage /> },
          { path: "/tools/image-converter", element: <ImageConverterPage /> },
          { path: "/tools/image-compress", element: <ImageCompressPage /> },
          { path: "/tools/image-resizer", element: <ImageResizerPage /> },
          { path: "/tools/tiktok", element: <TiktokDownloaderPage /> },
          { path: "/tools/youtube", element: <YoutubeDownloaderPage /> },
          { path: "/tools/instagram", element: <InstagramDownloaderPage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}

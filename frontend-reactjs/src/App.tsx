import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/about/AboutPage";
import ChangelogPage from "./pages/changelog/ChangelogPage";
import FAQPage from "./pages/faq/FAQPage";
import PrivacyPage from "./pages/privacy/PrivacyPage";
import AllTools from "./pages/tools/AllToolsPage";
import { RootLayout } from "./shared/components/layouts/RootLayout";
import { GlobalModal } from "./shared/components/ui/GlobalModal";
import { ScrollToTopOnMount } from "./shared/components/ui/ScrollToTopOnMount";

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
          { path: "/", element: <HomePage />, handle: { title: "Beranda" } },
          { path: "/about", element: <AboutPage />, handle: { title: "Tentang" } },
          { path: "/faq", element: <FAQPage />, handle: { title: "FAQ" } },
          { path: "/privacy", element: <PrivacyPage />, handle: { title: "Privasi" } },
          { path: "/changelog", element: <ChangelogPage />, handle: { title: "Changelog" } },
          {
            path: "tools",
            handle: { title: "Semua Alat" },
            children: [
              { index: true, element: <AllTools /> },
              {
                path: "image-converter",
                lazy: async () => {
                  const { default: ImageConverterPage } =
                    await import("./pages/tools/image-converter/ImageConverterPage");
                  return { Component: ImageConverterPage };
                },
                handle: { title: "Konversi Gambar" },
              },
              {
                path: "image-compress",
                lazy: async () => {
                  const { default: ImageCompressPage } = await import("./pages/tools/image-compress/ImageCompressPage");
                  return { Component: ImageCompressPage };
                },
                handle: { title: "Kompres Gambar" },
              },
              {
                path: "image-resizer",
                lazy: async () => {
                  const { default: ImageResizerPage } = await import("./pages/tools/image-resizer/ImageResizerPage");
                  return { Component: ImageResizerPage };
                },
                handle: { title: "Ubah Ukuran Gambar" },
              },
              {
                path: "tiktok",
                lazy: async () => {
                  const { default: TiktokDownloaderPage } = await import("./pages/tools/tiktok/TiktokDownloaderPage");
                  return { Component: TiktokDownloaderPage };
                },
                handle: { title: "TikTok Downloader" },
              },
              {
                path: "youtube",
                lazy: async () => {
                  const { default: YoutubeDownloaderPage } =
                    await import("./pages/tools/youtube/YoutubeDownloaderPage");
                  return { Component: YoutubeDownloaderPage };
                },
                handle: { title: "YouTube Downloader" },
              },
              {
                path: "instagram",
                lazy: async () => {
                  const { default: InstagramDownloaderPage } =
                    await import("./pages/tools/instagram/InstagramDownloaderPage");
                  return { Component: InstagramDownloaderPage };
                },
                handle: { title: "Instagram Downloader" },
              },
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}

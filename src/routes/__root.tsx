import { Outlet, Link, createRootRoute } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-5 text-center">
      <div className="text-[6rem] font-extrabold leading-none text-[#EEF2F7]">404</div>
      <h1 className="mt-2 font-display text-2xl font-bold text-[#0D2D4F]">Page not found</h1>
      <p className="mt-3 text-[15px] text-[#4A5568]">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0E7C6E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1A9E8C] transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
});

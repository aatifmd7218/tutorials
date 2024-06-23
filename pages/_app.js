import "tailwindcss/tailwind.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/app/globals.css";
import AuthProviders from "@/components/providers/AuthProviders";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProviders>
      <Component {...pageProps} />
    </AuthProviders>
  );
}

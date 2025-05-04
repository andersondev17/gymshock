import { auth } from "@/auth";
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/admin", "/profile"];
const adminRoutes = ["/admin"];

export default auth(async (req) => {
    const { nextUrl, auth } = req;
    const pathname = nextUrl.pathname;
    const isLoggedIn = !!auth?.user;
    const isAdmin = auth?.user?.role === "admin";

    // Evitar chequeos en rutas públicas
    if (![...authRoutes, ...protectedRoutes].some(p => nextUrl.pathname.startsWith(p)))
        return;

    if (isLoggedIn) {
        if (authRoutes.some(p => pathname.startsWith(p))) {
            return NextResponse.redirect(new URL("/", nextUrl));
        }

        if (adminRoutes.some(p => pathname.startsWith(p)) && !isAdmin) {
            return NextResponse.redirect(new URL("/", nextUrl));
        }
    } else {
        if (protectedRoutes.some(p => pathname.startsWith(p))) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
// frontend/middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { nextUrl, auth } = req;
    const isLoggedIn = !!auth?.user;
    const isAdmin = auth?.user?.role === "admin";

    // Rutas protegidas de admin
    if (nextUrl.pathname.startsWith("/admin")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }

        if (!isAdmin) {
            return NextResponse.redirect(new URL("/", nextUrl));
        }
    }

    // Rutas de autenticación para usuarios ya logueados
    if (isLoggedIn && (
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register")
    )) {
        return NextResponse.redirect(new URL("/", nextUrl));
    }
});

// Específica las rutas que el middleware debe manejar
export const config = {
    matcher: [
        "/admin/:path*",
        "/login",
        "/register",
        "/profile/:path*",
    ],
};
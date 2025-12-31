import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
    const headers = { 'accept-language': request.headers.get('accept-language') || 'en' };
    const languages = new Negotiator({ headers }).languages();
    return match(languages, locales, defaultLocale);
}

export async function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    // 1. Skip Next.js internals, API, Admin, and Static Files (images, fonts, etc.)
    if (
        pathname.startsWith('/_next') || 
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') ||
        /\.(.*)$/.test(pathname) // Matches files with extensions (jpg, png, ico, css)
    ) {
        return NextResponse.next();
    }

    // 2. Locale Handling
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
        const locale = getLocale(request);
        // Preserve query parameters (search) when redirecting
        return NextResponse.redirect(new URL(`/${locale}${pathname}${search}`, request.url));
    }


    const sessionCookie = getSessionCookie(request);
    const locale = pathname.split('/')[1]; // Extract locale for redirect

    // Example: Protect only a future '/dashboard' route
    if (pathname.startsWith(`/${locale}/dashboard`) && !sessionCookie) {
        return NextResponse.redirect(new URL(`/${locale}/auth/sign-in`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip all internal paths (_next) to reduce overhead
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
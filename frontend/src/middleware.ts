import { NextRequest, NextResponse } from 'next/server'

const funcionarioRoutes = ['/funcionario']
const clienteRoutes = ['/cliente']
const publicRoutes = ['/autocadastro', '/login']

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;
  const role = req.cookies.get("role")?.value || null;
  const { pathname } = req.nextUrl;

  const isPublic = publicRoutes.includes(req.nextUrl.pathname);
  const isFuncionarioRoute = funcionarioRoutes.includes(req.nextUrl.pathname);
  const isClienteRoute = clienteRoutes.includes(req.nextUrl.pathname);
 
  if (token && role && (['/autocadastro', '/login'].includes(pathname))) {
    if (role === 'FUNCIONARIO')
      return NextResponse.redirect(new URL('/funcionario', req.url));
    if (role === 'CLIENTE')
      return NextResponse.redirect(new URL('/cliente', req.url));
  }

  if (isPublic) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isFuncionarioRoute && role !== 'FUNCIONARIO') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isClienteRoute && role !== 'CLIENTE') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|styles|airplane.png).*)'],
}
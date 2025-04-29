// frontend/app/api/auth/register/route.ts
import { AuthService } from "@/services/authService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;
    
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Se requieren todos los campos" },
        { status: 400 }
      );
    }
    
    const response = await AuthService.register({ username, email, password });
    
    return NextResponse.json(response, {
      status: response.success ? 201 : 400
    });
  } catch (error) {
    console.error("Error en la solicitud de registro:", error);
    return NextResponse.json(
      { success: false, message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
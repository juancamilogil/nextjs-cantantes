import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";
import { cantantesDb } from "./db/cantantes.db";

export function GET() {
  if (cantantesDb.length === 0) {
    return NextResponse.json(
      {
        error: false,
        message: "No se encontró ningún cantante",
      },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json(
    {
      error: false,
      data: cantantesDb,
    },
    {
      status: 200,
    }
  );
}

export async function POST(req) {
  try {
    const body = await req.json();

    console.log(body);

    const nuevoCantante = {
      ...body,
      _id: uuid(),
    };

    cantantesDb.push(nuevoCantante);

    return NextResponse.json(
      {
        error: false,
        data: nuevoCantante,
      },
      {
        status: 200,
      }
    );
  } catch (error) {

    return NextResponse.json(
      {
        error: false,
        data: {message: "no se creo el cantante"},
      },
      {
        status: 400,
      }
    );
  }
}

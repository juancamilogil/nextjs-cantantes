import { NextResponse } from "next/server";
import { cantantesDb } from "../db/cantantes.db";

export function GET(req, { params }) {
  const { id } = params;

  const cantante = cantantesDb.find((item) => item._id === id);

  if (!cantante) {
    return NextResponse.json(
      {
        error: false,
        message: "El cantante no fue encontrado",
      },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json(
    {
      error: false,
      data: cantante,
    },
    {
      status: 200,
    }
  );
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const index = cantantesDb.findIndex((item) => item._id === id);

  if (index === -1) {
    return NextResponse.json({
      error: false,
      message: "El cantante no fue modificado",
     
    },{
      status: 404
    });
  }

  cantantesDb[index] = { ...cantantesDb[index], ...body };

  return NextResponse.json({
    error: false,
    data: cantantesDb[index],
    
  },{
    status: 200
  });
}

export function DELETE(req, { params }) {
  const { id } = params;

  const index = cantantesDb.findIndex((item) => item._id === id);

  if (index === -1) {
    return NextResponse.json({
      error: false,
      data: {message: "El cantante no fue encontrado"},
    },{
      status: 404
    });
  }
  cantantesDb.splice(index, 1);

  return NextResponse.json({
    error: false,
    data: { message: "El cantante fue eliminado" },
  }, {
    status: 200
  });
}
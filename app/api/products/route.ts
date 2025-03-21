import { NextResponse } from "next/server";

export async function GET() {
  const API_URL = "https://photos-ventouxsummit.fr/api/products?ws_key=QEJ2QUQ8Q7JZL465WEJXMDVEDNLD7LBH&output_format=JSON&display=full";

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch products" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

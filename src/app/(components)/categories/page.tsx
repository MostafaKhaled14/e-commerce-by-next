"use client";

import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Categories() {
  const [loading, setLoading] = useState(true);

  return (
    <section className="h-screen">
      <div className="p-4 rounded-lg border shadow" onClick={() => (loading ? setLoading(false) : setLoading(true))}>
        <h2 className="text-xl font-bold mb-2">{loading ? <Skeleton width={150} /> : "data.title"}</h2>
        <p className="text-sm text-gray-600">{loading ? <Skeleton count={2} /> : "data.description"}</p>
      </div>
    </section>
  );
}

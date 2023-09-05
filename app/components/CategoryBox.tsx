"use client";

import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import queryString from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams(); // akses ke query parameter

  const handleClick = useCallback(() => {
    let currentQuery = {};

    // Jika params ada, kode di dalam blok akan dieksekusi.
    if (params) {
      currentQuery = queryString.parse(params.toString()); //konversi string parameter jadi objek JS
    }
    // #{category: 'Skiing'}

    // Menggunakan spread operator , kita menambahkan category dengan nilai label
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    // #{category: 'Castles'}

    // Ini adalah kondisi lain yang memeriksa apakah parameter pencarian "category" saat ini sama dengan nilai label yang Anda miliki. Jika sama, maka "category" akan dihapus dari updatedQuery.
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    // Menggunakan pustaka queryString, menghasilkan URL berdasarkan konfigurasi yang kita berikan
    const url = queryString.stringifyUrl(
      {
        url: "/", //root path
        query: updatedQuery, //objek berisi parameter pencarian yang kita modifikasi tadi
      },
      { skipNull: true } // menginstruksikan queryString mengabaikan parameter bernilai null
    );

    // Navigasi ke URL yang baru dihasilkan
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={` flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
      ${selected ? `border-b-neutral-800` : "border-transparent"}
      ${selected ? `text-b-neutral-800` : "text-neutral-500"}`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;

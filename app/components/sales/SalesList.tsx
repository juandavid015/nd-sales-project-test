'use client';

import { fetchSale } from '@/app/services/api';
import { Sale } from '@/app/types/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SalesList() {
  const [sales, setSales] = useState<Sale[]>([]);
  const getSales = async () => {
    let salesData = await fetchSale.get(10, 1);
    salesData = salesData.data as any;
    // repair this type to not be any
    setSales(salesData as any);
  };
  useEffect(() => {
    getSales();
  }, []);
  return (
    <div className="p-8 w-full h-full
    border border-gray flex flex-col gap-6"
    >
      {
        sales?.map((sale) => (
          <div className="p-2 border-gray border" key={sale.id}>
            <div className="flex gap-2">
              <h2 className="text-heading-color">
                { `#${sale.id}`}
              </h2>
              <span className="text-gray">
                {sale.date}
              </span>
              <span>
                {sale.branch_office?.country}
              </span>
              <span className="font-bold ml-auto">{`$${sale.total_amount}`}</span>
            </div>
            <Link
              href={`/home/sales/${sale.id}`}
              className="hover:text-main-color text-main-color/80"
            >
              See details
            </Link>
          </div>
        ))
      }
    </div>
  );
}

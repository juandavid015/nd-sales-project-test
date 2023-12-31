'use client';

import { fetchSale } from '@/app/services/api';
import { Sale } from '@/app/types/data';
import { useEffect, useState } from 'react';

export default function SaleInformation({ id }: { id: string }) {
  const [sale, setSale] = useState<Sale | undefined>(undefined);
  const getSale = async () => {
    const saleData = await fetchSale.getById(id);
    setSale(saleData);
  };
  useEffect(() => {
    getSale();
  });
  if (!sale) return <div>Sorry, there is nothign to show here</div>;
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">
          Branch office
        </h2>
        <ul className="flex gap-6 flex-wrap">
          <li className="font-medium text-dark-blue">{sale.branch_office?.country}</li>
          <li className="font-medium text-dark-blue">{sale.branch_office?.address.state}</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold">
          Seller
        </h2>
        <ul className="flex gap-6 flex-wrap">
          <li className="font-medium text-dark-blue">{sale.seller?.name}</li>
          <li className="font-medium text-dark-blue">{sale.seller?.surnames}</li>
          <li className="font-medium text-dark-blue">{sale.seller?.address.country}</li>
          <li className="font-medium text-dark-blue">{sale.seller?.phone}</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold">
          Client
        </h2>
        <ul className="flex gap-6 flex-wrap">
          <li className="font-medium text-dark-blue">{sale.client?.name}</li>
          <li className="font-medium text-dark-blue">{sale.client?.surnames}</li>
          <li className="font-medium text-dark-blue">{sale.client?.phone}</li>
          <li className="font-medium text-dark-blue">{`${sale.client?.address.country}, ${sale.client?.address.city}, ${sale.client?.address.state}, ${sale.client?.address.street} #${sale.client?.address.number}.`}</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold">
          General information
        </h2>
        <ul className="flex gap-6 flex-wrap">
          <li className="font-medium text-dark-blue">
            Currency:
            {' '}
            {sale.currency}
          </li>
          <li className="font-medium text-dark-blue  ">
            Date:
            {' '}
            {sale.date}
          </li>
          <li className="font-medium text-dark-blue">
            Total: $
            {sale.total_amount}
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">
          Details
        </h2>
        <ul className="flex flex-wrap gap-6">
          {
            sale.sale_details.map((detail) => (
              <div
                className="p-4 flex flex-wrap gap-8
              border border-gray w-full"
                key={`${detail.id}dt`}
              >
                <li className="font-medium text-dark-blue">
                  id:
                  {' '}
                  {detail.id}
                </li>
                <li className="font-medium text-dark-blue">
                  product:
                  {' '}
                  {detail.product?.name}
                </li>
                <li className="font-medium text-dark-blue">
                  quantity:
                  {' '}
                  {detail.quantity}
                </li>
                <li className="font-medium text-dark-blue">
                  price:
                  {' '}
                  {detail.unit_price}
                </li>
                <li className="font-medium text-dark-blue ml-auto">
                  sub_total:
                  {' '}
                  {detail.sub_total}
                </li>
              </div>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

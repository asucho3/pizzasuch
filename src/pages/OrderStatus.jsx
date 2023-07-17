import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../services/apiCalls";
import { useSearchParams } from "react-router-dom";
import { formatDate } from "../services/helpers";
import Loader from "../ui/Loader";

function OrderStatus() {
  const [searchParams, setSearchParams] = useSearchParams();

  // get order from server
  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrder(searchParams.get("orderId")),
  });

  const orderCustomer = order?.customer;
  const orderCode = order?.orderCode;
  const orderCreatedAt = order?.created_at;
  const orderProducts = order?.products.split("!");
  const orderQuantities = order?.quantities.split("!");
  const orderIngredients = order?.ingredients.replaceAll(",", ", ").split("!");
  const orderPrices = order?.prices.split("!");
  const orderTotalPrice = order?.totalPrice;
  const orderETA = order?.ETA;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="main">
          <div className="flex flex-col gap-4 py-8">
            <h1 className="font-semibold">
              Order by {orderCustomer} created on {formatDate(orderCreatedAt)}
            </h1>
            <ul>
              {orderProducts?.map((product, i) => {
                return (
                  <li key={i} className="flex flex-col">
                    <h3 className="font-semibold">
                      {orderQuantities[i]} x {orderProducts[i]} ($
                      {orderPrices[i]})
                    </h3>
                    <span className="text-xs italic">
                      {orderIngredients[i]}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="flex gap-2 font-semibold">
              <span>Total:</span> <span>${orderTotalPrice}</span>
            </div>
            <div>
              <h1 className="flex gap-2 font-semibold">Status</h1>
              <h1>confirmed</h1>
            </div>
            {/* <div>
              <h1 className="flex gap-2 font-semibold">ETA</h1>
              <h1>{formatDate(orderETA)}</h1>
            </div> */}
            <div>
              <h1>For assistance, call</h1>
              <h1>4567-8910</h1>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default OrderStatus;

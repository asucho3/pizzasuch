import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getProducts } from "../services/apiCalls";
import { toast } from "react-hot-toast";
import Loader from "../ui/Loader";
import { useNavigate } from "react-router-dom";

function OrderPay() {
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const { totalPrice } = order;
  const [isLoadingMP, setIsLoadingMP] = useState(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("new order created");
      navigate(`/order/status?orderId=${order.orderId}`);
    },
    onError: (err) => toast.err(err.message),
  });

  // show MercadoPago
  useEffect(function () {
    /* eslint-disable */
    const mp = new MercadoPago("TEST-7a71a440-d924-48ea-a622-a391b247039f", {
      locale: "es-AR",
    });
    const bricksBuilder = mp.bricks();
    const renderPaymentBrick = async (bricksBuilder) => {
      const settings = {
        initialization: {
          /*
           "amount" es el monto total a pagar por todos los medios de pago con excepción de la Cuenta de Mercado Pago y Cuotas sin tarjeta de crédito, las cuales tienen su valor de procesamiento determinado en el backend a través del "preferenceId"
          */
          amount: totalPrice,
        },
        customization: {
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            minInstallments: 1,
            maxInstallments: 1,
          },
        },
        callbacks: {
          onReady: () => {
            setIsLoadingMP(false);
            /*
             Callback llamado cuando el Brick está listo.
             Aquí puede ocultar cargamentos de su sitio, por ejemplo.
            */
          },
          onSubmit: ({ selectedPaymentMethod, formData }) => {
            // callback llamado al hacer clic en el botón enviar datos
            return new Promise((resolve, reject) => {
              fetch("http://localhost:3000", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              })
                .then((response) => response.json())
                .then((response) => {
                  // recibir el resultado del pago
                  if (response.status === "approved") {
                    mutate(order);
                  } else {
                    // toast.error("the payment was rejected");
                  }
                  resolve();
                })
                .catch((error) => {
                  // manejar la respuesta de error al intentar crear el pago
                  reject();
                });
            });
          },
          onError: (error) => {
            // callback llamado para todos los casos de error de Brick
          },
        },
      };
      window.paymentBrickController = await bricksBuilder.create(
        "payment",
        "cardPaymentBrick_container",
        settings,
      );
    };
    renderPaymentBrick(bricksBuilder);
  }, []);
  return (
    <>
      {isLoadingMP && <Loader />}
      <div className="mx-auto w-96 text-center">
        <div>-Test data-</div>
        <div>Card Number: 4509 9535 6623 3704 </div>
        <div>Exp.: 11/25</div>
        <div>CVV: 123</div>
        <div>Name: APRO</div>
        <div>DNI: 12345678</div>
        <div>Email: test@example.com</div>
      </div>
      <div className="mx-auto w-96" id="cardPaymentBrick_container"></div>
    </>
  );
}

export default OrderPay;

import supabase from "./supabase";

export const getProducts = async function () {
  const { data, error } = await supabase.from("products").select("*");

  if (error) throw new Error(error.message);

  return data;
};

export const getOrder = async function (order) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("orderId", order)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const createOrder = async function (newOrder) {
  const { data, error } = await supabase
    .from("orders")
    .insert([newOrder])
    .select();

  if (error) throw new Error(error.message);

  return data;
};

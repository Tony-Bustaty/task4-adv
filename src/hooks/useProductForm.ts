import { useEffect, useState } from "react";
import { userService } from "../api/services/user.service";
import { useNavigate } from "react-router";
import type { ProductPayload } from "../types/interfaces";

export function useProductForm(id?: string) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [initialValues, setInitialValues] = useState<ProductPayload>({
    image: "",
    name: "",
    price: "",
  });

  // Fetch only when editing
  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    const controller = new AbortController();

    async function fetchProduct() {
      setIsFetching(true);
      try {
        if (id) {
          const { data } = await userService.getItem(id, {
            signal: controller.signal,
          });
          if (!cancelled) {
            setInitialValues({
              name: data.name,
              price: data.price,
              image: data.image_url,
            });
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== "AbortError")
            console.error("Failed to fetch product", error);
        }
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    }

    fetchProduct();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [id]);

  const handleSubmit = async (data: ProductPayload) => {
    setIsSubmitting(true);
    try {
      if (id) {
        if (data === undefined && initialValues !== null) {
          console.log(data, initialValues);
           await userService.updateItem(id, initialValues);
        } else {
           await userService.updateItem(id, {
            name: data.name ? data.name : initialValues?.name,
            price: data.price ? data.price : initialValues?.price,
            image: data.image ? data.image : null,
          });
        }
      } else {
        await userService.addItem(data);
      }
      navigate("/items");
    } catch (error) {
      console.error("Form submission failed:", error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, isFetching, initialValues, handleSubmit };
}

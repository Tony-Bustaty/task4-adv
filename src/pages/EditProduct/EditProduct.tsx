import type { Input, Item } from "../../types/interfaces";
import Form from "../../components/Form/Form";
import Heading from "../../components/Heading/Heading";
import "../AddProduct/AddProduct.css";

import { useProductForm } from "../../hooks/useProductForm";
import { useNavigate, useParams } from "react-router";
import { TiChevronLeft } from "react-icons/ti";

export type addProductPayload = Pick<Item, "name" | "price"> & {
  image: File | string;
};
function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const { isSubmitting, handleSubmit, initialValues } = useProductForm(id);
  const PRODUCT_INPUTS: Input[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "Enter the Product Name",
      value: initialValues?.name,
    },
    {
      name: "price",
      label: "Price",
      placeholder: "Enter the Product Price",
      value: initialValues?.price,
    },
    {
      name: "image",
      type: "file",
      accept: "image/*",
      label: "Image",
      value: initialValues?.image as string,
    },
  ];
  const navigate = useNavigate();

  return (
    <div>
      <div className="back">
        <TiChevronLeft size={40} onClick={() => navigate("/items?page=1")} />
      </div>
      <Heading content="Edit Item" />
      <div className="form-container">
        <Form
          key={id}
          inputs={PRODUCT_INPUTS}
          formType="itemsManipulation"
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}

export default EditProduct;

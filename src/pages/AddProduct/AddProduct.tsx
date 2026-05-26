import type { Input } from "../../types/interfaces";
import Form from "../../components/Form/Form";
import Heading from "../../components/Heading/Heading";
import "./AddProduct.css";

import { useProductForm } from "../../hooks/useProductForm";

import { useNavigate } from "react-router";
import { TiChevronLeft } from "react-icons/ti";

function AddProduct() {
  const { isSubmitting, handleSubmit } = useProductForm();
  const navigate=useNavigate()
  const PRODUCT_INPUTS: Input[] = [
    { name: "name", label: "Name", placeholder: "Enter the Product Name" },
    { name: "price", label: "Price", placeholder: "Enter the Product Price" },
    { name: "image", type: "file", accept: "image/*", label: "Image" },
  ];

  return (
    <div>
      <div className="back">
        <TiChevronLeft  size={40} onClick={()=>navigate("/items?page=1")}/>
      </div>
      <Heading content="Add New Item" />
      <div className="form-container">
        <Form
          inputs={PRODUCT_INPUTS}
          formType="itemsManipulation"
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}

export default AddProduct;

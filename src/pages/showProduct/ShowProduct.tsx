import { TiChevronLeft } from "react-icons/ti";
import type { Item } from "../../types/interfaces";
import { useNavigate, useParams } from "react-router";
import Heading from "../../components/Heading/Heading";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateFormat";
import "./ShowProduct.css";
import { userService } from "../../api/services/user.service";
function ShowProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Item>();
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await userService.getItem(id as string);
      setProduct(product.data);
    };
    fetchProduct();
  }, [id]);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="back">
        <TiChevronLeft size={40} onClick={() => navigate("/items?page=1")} />
      </div>
      <Heading content={product?.name || ""} />
      <div className="image-container">
        <img
          src={imgError ? "/assets/default_product.png" : product?.image_url}
          alt=""
          onError={() => setImgError(true)}
        />
      </div>
      <div className="product-content">
        <p>
          Price : <span>{product?.price}$</span>
        </p>
        <p>
          Added At : <span>{formatDate(product?.created_at)}</span>{" "}
        </p>
        <p>
          Updated At : <span>{formatDate(product?.updated_at)}</span>{" "}
        </p>
      </div>
    </div>
  );
}

export default ShowProduct;

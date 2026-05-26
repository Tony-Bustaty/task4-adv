
import { useNavigate, useRevalidator } from "react-router";
import { userService } from "../../api/services/user.service";
import type { Item } from "../../types/interfaces";
import Button from "../Button/Button";
import ConfirmationPortal from "../ConfirmationPortal/ConfirmationPortal";
import "./Product.css";
import { useState } from "react";
interface ProductProps {
  item: Item;
}
function Product({ item }: ProductProps) {
    const [imgError, setImgError] = useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const [isOpen,setIsOpen]=useState(false);
    const {revalidate}=useRevalidator()
    const navigate=useNavigate()
    const handleDelete = async () => {
    setIsLoading(true);
    try {
      await userService.deleteItem(item.id)
      console.log('User deleted successfully');
      await userService.getAllItems();
      revalidate()
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <div className="product">
      <img
        src={imgError ? "/assets/default_product.png":item.image_url}
        alt="product picture"
        onError={()=>setImgError(true)}
       
      />
      <div className="overlay">
       <div className="content">
         <p style={{cursor:"pointer"}} onClick={()=>navigate(`/items/show/${item.id}`)}>{item.name}</p>
        <div className="action-buttons">
          <Button content="Edit" type="button" link={`/items/edit/${item.id}`} />
          <Button content="delete" type="button" className="delete-btn" onClick={()=>setIsOpen(true)}/>
        </div>
       </div>
      </div>
      <ConfirmationPortal
      cancelText="No"
      confirmText="Yes"
      isOpen={isOpen}
      loading={isLoading}
      message="Are you sure you want to delete the product?"
      onCancel={() => setIsOpen(false)}
      onConfirm={handleDelete}
      />
    </div>
  );
}

export default Product;

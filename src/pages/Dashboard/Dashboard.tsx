import { useLoaderData, useSearchParams } from "react-router"
import Button from "../../components/Button/Button"
import Search from "../../components/Search/Search"
import "./Dashboard.css"
import Product from "../../components/Product/Product";
import Pagination from "../../components/Pagination/Pagination";
import type { Item } from "../../types/interfaces";


function Dashboard() {
  const {data}=useLoaderData();
  const [searchParams] = useSearchParams();
  const page=parseInt(searchParams.get('page')!);
  const search=searchParams.get('search')!|| ""
  const PAGE_SIZE = 8; 
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const productsToBeShown:Item[]=data.data.slice(startIndex, endIndex);
  const searchedProduct=productsToBeShown.filter(product=>product.name===search);
  console.log(productsToBeShown)
  console.log(searchedProduct)
  return (
    <div className="dashboard">
      <div className="search-input">
        <Search className="dashboard-search" placeHolder="Search product by name"/>
      </div>

      <div className="button">
        <Button content="ADD NEW PRODUCT" type="button" link="/items/create"/>
      </div>
      <div className="products">
        {search!==''?<Product item={searchedProduct}/>:productsToBeShown.map(item=><Product key={item.id} item={item}/>)}
      </div>
      <Pagination totalPages={data.data.length}/>
    </div>
  )
}

export default Dashboard
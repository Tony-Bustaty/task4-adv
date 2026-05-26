import type { Item, ProductPayload } from "../../types/interfaces"
import { apiClient } from "../client"
interface getItems{
  data:Item[]
  status:number,
  statusCode?:string
}
interface SearchParams{
    page?:number,
    limit?:number
}
export const userService={
getAllItems(params?:SearchParams){
if(params?.page || params?.limit){
    return apiClient.get<getItems>("/items",{params})
}
return apiClient.get<getItems>('/items')
},
getItem(id:string,options?:{signal:AbortSignal}){

return apiClient.get<Item>(`/items/${id}`,{signal:options?.signal})
},
addItem(data:ProductPayload){
 const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("image", data.image);
      return apiClient.post<{message:string}>("/items", formData);
},
updateItem(id:string,data:ProductPayload){
 const formData = new FormData();
 console.log(data)
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("image", data.image);
    formData.append("_method", "PUT");
      return apiClient.post<{message:string}>(`/items/${id}`, formData);
},
deleteItem(id:number){
  return apiClient.delete(`/items/${id}`)
}
}
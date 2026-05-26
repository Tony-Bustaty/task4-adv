export interface Input {
  type?: string;
  placeholder?: string;
  value?: string;
  name: string;
  accept?: string;
  label?: string;
}
export interface FormProps {
  title?: string;
  submit?: string;
  formType?:string,
  secondaryLink?: { to: string; text: string; label: string };
  description?: string;
  inputs: Input[];
  onSubmit: (data: Record<string,unknown>) => void;
  isLoading?: boolean;
}
export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: Blob | string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  first_name: string;
  user_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface AuthResponse {
  status?: string;
  message?: string;
  token: string;
  user: User;
}
export interface Item {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}
export type ProductPayload = { name: string; price: string ; image: File | string };
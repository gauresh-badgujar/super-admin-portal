export type UserStatus = "Active" | "Inactive" | "Suspended";

export interface UserCompany {
  name: string;
  title: string;
  department: string;
}

export interface UserAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  country: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  gender: string;
  image: string;
  role: string;
  status: UserStatus;
  tenantId: number;
  tenantName: string;
  company: UserCompany;
  address: UserAddress;
}

export interface UserFilters {
  search: string;
  role: string;
  status: string;
  tenantId?: number;
  page: number;
}

export interface UserActivity {
  id: number;
  userId: number;
  action: string;
  description: string;
  timestamp: string;
  status: "Success" | "Failed";
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserDetailsResponse extends User {
  recentActivity: UserActivity[];
}
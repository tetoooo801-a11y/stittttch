export type Role = "admin" | "customer";

export type Permission = 
  | "view:admin_dashboard"
  | "manage:bookings"
  | "manage:services"
  | "manage:users";

const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    "view:admin_dashboard",
    "manage:bookings",
    "manage:services",
    "manage:users",
  ],
  customer: [],
};

export function hasPermission(role: Role | undefined | null, permission: Permission): boolean {
  if (!role) return false;
  const permissions = rolePermissions[role];
  return permissions ? permissions.includes(permission) : false;
}

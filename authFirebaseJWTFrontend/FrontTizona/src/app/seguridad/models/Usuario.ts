import { Rol } from "./Rol";

export interface Usuario {
    id: string;
    email: string;
    roles: Rol[];
}

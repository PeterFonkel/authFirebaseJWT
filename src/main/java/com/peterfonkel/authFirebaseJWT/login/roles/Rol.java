package com.peterfonkel.authFirebaseJWT.login.roles;

import com.sun.istack.NotNull;


import com.peterfonkel.authFirebaseJWT.login.roles.enums.RolNombre;

import javax.persistence.*;

/**
 * Clase de ROL de usuario.
 * 
 * @author albal
 *
 */
@Entity
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(unique = true, name="ROL_NOMBRE")
    private RolNombre rolNombre;

    public Rol() {
    }

    public Rol(RolNombre rolNombre) {
        this.rolNombre = rolNombre;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public RolNombre getRolNombre() {
        return rolNombre;
    }

    public void setRolNombre(RolNombre rolNombre) {
        this.rolNombre = rolNombre;
    }

	@Override
	public String toString() {
		return "Rol [id=" + id + ", rolNombre=" + rolNombre + "]";
	}
    
}

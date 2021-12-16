package com.peterfonkel.authFirebaseJWT.login.usuarios.entidades;

import com.sun.istack.NotNull;


import com.peterfonkel.authFirebaseJWT.login.roles.Rol;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * entidad que almacena la informacion de un usaurio, ID, mail, Password y roles
 * 
 * @author jl_pu
 *
 */

@Entity
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull
	@Column(unique = true)
	private String email;

	@NotNull
	private String password;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(joinColumns = @JoinColumn(name = "usuario_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "rol_id", referencedColumnName = "id"))
	private Set<Rol> roles = new HashSet<Rol>();

	public Usuario() {
	}

	public Usuario(String email, String password) {
		System.out.println("Email en const: " + email);
		System.out.println("Pass en const: " + password);
		this.email = email;
		this.password = password;
	}

	public Usuario(String email, Set<Rol> roles) {
		super();
		this.email = email;
		this.roles = roles;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Rol> getRoles() {
		return roles;
	}

	public void setRoles(Rol[] roles) {
		this.roles = new HashSet<Rol>();
		for (Rol rol2 : roles) {
			this.roles.add(rol2);
		}
	}

	public void agregarRoles(Set<Rol> roles) {
		this.roles = roles;
	}

	public Rol getRol() {
		Rol rolUsuario = new Rol();
		for (Rol rol : roles) {
			rolUsuario = rol;
		}
		return rolUsuario;
	}

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", email=" + email + ", password=" + password + ", roles=" + roles + "]";
	}

}

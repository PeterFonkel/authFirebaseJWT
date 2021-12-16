package com.peterfonkel.authFirebaseJWT.login.roles;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.peterfonkel.authFirebaseJWT.login.roles.enums.RolNombre;

import java.util.Optional;

/**
 * Acceso a BD para CRUD de roles, emplea roles enum.
 * @author jl_pu
 *
 */

@RepositoryRestResource(path = "roles", 
						itemResourceRel = "rol", 
						collectionResourceRel = "roles")
public interface RolDAO extends JpaRepository<Rol, Integer> {
    	
	Optional<Rol> findByRolNombre(RolNombre rolNombre);
    
	boolean existsByRolNombre(RolNombre rolNombre);
}

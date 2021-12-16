package com.peterfonkel.authFirebaseJWT.login.usuarios;

import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestParam;

import com.peterfonkel.authFirebaseJWT.login.usuarios.entidades.Usuario;

import java.util.List;
import java.util.Optional;

/**
 * CRUD mediante JpaRepository de usuarios en la BD
 * @author jl_pu
 *
 */
@RepositoryRestResource(path = "usuarios", 
						itemResourceRel = "usuario", 
						collectionResourceRel = "usuarios")
public interface UsuarioDAO extends JpaRepository<Usuario, Integer> {
	
    Optional<Usuario> findByEmail(@RequestParam String email);
    boolean existsByEmail(String email);
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    List<Usuario> findAll();
}

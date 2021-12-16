package com.peterfonkel.authFirebaseJWT.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import com.peterfonkel.authFirebaseJWT.entities.Producto;

@RepositoryRestResource(path = "productos", 
itemResourceRel = "productos", 
collectionResourceRel = "productos")
public interface ProductoDAO extends JpaRepository<Producto, Long>{

	List<Producto> findAll();
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@Override
	<S extends Producto> S save(S entity);
	
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	@Override
	Optional<Producto> findById(Long id);
	
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	@Override
	boolean existsById(Long id);

	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	@Override
	long count();

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@Override
	void deleteById(Long id);

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@Override
	void delete(Producto entity);

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@Override
	void deleteAllById(Iterable<? extends Long> ids);
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@Override
	void deleteAll(Iterable<? extends Producto> entities);

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@Override
	void deleteAll();
	
	
}

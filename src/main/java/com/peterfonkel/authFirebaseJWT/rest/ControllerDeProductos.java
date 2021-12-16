package com.peterfonkel.authFirebaseJWT.rest;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.peterfonkel.authFirebaseJWT.entities.Producto;
import com.peterfonkel.authFirebaseJWT.repositories.ProductoDAO;


@PreAuthorize("authenticated")
@RepositoryRestController
@RequestMapping(path = "/productos/search")
@CrossOrigin
public class ControllerDeProductos {

	@Autowired
	ProductoDAO productoDAO;

	@Autowired
	public ControllerDeProductos(
			ProductoDAO productoDAO
			) {
		this.productoDAO = productoDAO;
	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@GetMapping(path = "productos")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getProductos(PersistentEntityResourceAssembler assembler) {
		List<?> listadoProductos = productoDAO.findAll();
		return assembler.toCollectionModel(listadoProductos);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(path = "productos")
	@ResponseBody
	public PersistentEntityResource postProducto(@RequestBody Producto producto, PersistentEntityResourceAssembler assembler) {
		Producto productoGuardado = productoDAO.save(producto);
		return assembler.toModel(productoGuardado);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(path = "productos/{id}")
	@ResponseBody
	public void deleteProducto(@PathVariable("id") Long id) {
		productoDAO.deleteById(id);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PatchMapping(path = "productos/{id}")
	@ResponseBody
	public PersistentEntityResource patchProducto(@RequestBody Producto producto, @PathVariable("id") Long id, PersistentEntityResourceAssembler assembler) {
		productoDAO.deleteById(id);
		Producto productoModificado = productoDAO.save(producto);
		return assembler.toModel(productoModificado);
	}
	
}

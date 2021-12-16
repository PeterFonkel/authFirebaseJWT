package com.peterfonkel.authFirebaseJWT.rest.productos;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.peterfonkel.authFirebaseJWT.entities.Producto;
import com.peterfonkel.authFirebaseJWT.repositories.ProductoDAO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class ProductoDAOImpl implements ProductoDAOCustom {

	@Autowired
	ProductoDAO personaDAO;

	@Override
	public List<Producto> getArtefactos() {
		return this.personaDAO.findAll();
	}

}

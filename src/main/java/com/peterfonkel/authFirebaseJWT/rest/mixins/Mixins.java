package com.peterfonkel.authFirebaseJWT.rest.mixins;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class Mixins {

	@JsonIgnoreProperties(value = { "password" })
	public abstract class Usuario {

	}
}

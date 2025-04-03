package org.skytads.mscliente.exceptions;

public class BadCredentialsException  extends RuntimeException {
    public BadCredentialsException(String message) {
        super(message);
    }
}

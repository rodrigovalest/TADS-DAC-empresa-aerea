package org.skytads.msfuncionarios.exception;

public class FuncionarioNotFoundException extends RuntimeException {
    public FuncionarioNotFoundException(String message) {
        super(message);
    }
}

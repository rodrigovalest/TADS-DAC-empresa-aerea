package org.skytads.msreserva.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EstadoReservaEnum {
    CRIADA,
    CHECK_IN,
    CANCELADA,
    CANCELADA_VOO,
    EMBARCADA,
    REALIZADA,
    NAO_REALIZADA;

    @JsonCreator
    public static EstadoReservaEnum fromString(String value) {
        return EstadoReservaEnum.valueOf(value.replace("-", "_"));
    }

    @JsonValue
    public String toValue() {
        return switch (this) {
            case CHECK_IN       -> "CHECK-IN";
            case CANCELADA_VOO  -> "CANCELADA VOO";
            case NAO_REALIZADA  -> "NÃO REALIZADA";
            default             -> this.name().replace("_", " ");
        };
    }
}

package org.skytads.msvoos.enums;

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
        return this.name().replace("_", "-");
    }
}

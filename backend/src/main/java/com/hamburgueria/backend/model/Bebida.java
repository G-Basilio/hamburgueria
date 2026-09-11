package com.hamburgueria.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "bebida")
public class Bebida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String descricao;

    @NotNull
    @PositiveOrZero
    private BigDecimal precoUnitario;

    @NotNull
    private Boolean contemAcucar;

    public Bebida() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public BigDecimal getPrecoUnitario() { return precoUnitario; }
    public void setPrecoUnitario(BigDecimal precoUnitario) { this.precoUnitario = precoUnitario; }

    public Boolean getContemAcucar() { return contemAcucar; }
    public void setContemAcucar(Boolean contemAcucar) { this.contemAcucar = contemAcucar; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Bebida bebida = (Bebida) o;
        return Objects.equals(id, bebida.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

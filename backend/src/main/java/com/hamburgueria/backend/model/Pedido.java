package com.hamburgueria.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataPedido;

    private String descricaoPedido;

    @NotBlank
    private String nomeCliente;

    @NotBlank
    private String enderecoCliente;

    @NotBlank
    private String telefoneCliente;

    private String observacoes;

    private BigDecimal valorTotal = BigDecimal.ZERO;

    @ManyToMany
    @JoinTable(name = "pedido_hamburguer", joinColumns = @JoinColumn(name = "pedido_id"), inverseJoinColumns = @JoinColumn(name = "hamburguer_id"))
    private List<Hamburguer> hamburgueres = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "pedido_bebida", joinColumns = @JoinColumn(name = "pedido_id"), inverseJoinColumns = @JoinColumn(name = "bebida_id"))
    private List<Bebida> bebidas = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "pedido_adicional", joinColumns = @JoinColumn(name = "pedido_id"), inverseJoinColumns = @JoinColumn(name = "ingrediente_id"))
    private List<Ingrediente> adicionais = new ArrayList<>();

    public Pedido() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getDataPedido() { return dataPedido; }
    public void setDataPedido(LocalDateTime dataPedido) { this.dataPedido = dataPedido; }

    public String getDescricaoPedido() { return descricaoPedido; }
    public void setDescricaoPedido(String descricaoPedido) { this.descricaoPedido = descricaoPedido; }

    public String getNomeCliente() { return nomeCliente; }
    public void setNomeCliente(String nomeCliente) { this.nomeCliente = nomeCliente; }

    public String getEnderecoCliente() { return enderecoCliente; }
    public void setEnderecoCliente(String enderecoCliente) { this.enderecoCliente = enderecoCliente; }

    public String getTelefoneCliente() { return telefoneCliente; }
    public void setTelefoneCliente(String telefoneCliente) { this.telefoneCliente = telefoneCliente; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public BigDecimal getValorTotal() { return valorTotal; }
    public void setValorTotal(BigDecimal valorTotal) { this.valorTotal = valorTotal; }

    public List<Hamburguer> getHamburgueres() { return hamburgueres; }
    public void setHamburgueres(List<Hamburguer> hamburgueres) { this.hamburgueres = hamburgueres; }

    public List<Bebida> getBebidas() { return bebidas; }
    public void setBebidas(List<Bebida> bebidas) { this.bebidas = bebidas; }

    public List<Ingrediente> getAdicionais() { return adicionais; }
    public void setAdicionais(List<Ingrediente> adicionais) { this.adicionais = adicionais; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pedido pedido = (Pedido) o;
        return Objects.equals(id, pedido.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

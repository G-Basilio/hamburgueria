package com.hamburgueria.backend.service;

import com.hamburgueria.backend.model.Bebida;
import com.hamburgueria.backend.model.Hamburguer;
import com.hamburgueria.backend.model.Ingrediente;
import com.hamburgueria.backend.model.Pedido;
import com.hamburgueria.backend.repository.BebidaRepository;
import com.hamburgueria.backend.repository.HamburguerRepository;
import com.hamburgueria.backend.repository.IngredienteRepository;
import com.hamburgueria.backend.repository.PedidoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final HamburguerRepository hamburguerRepository;
    private final BebidaRepository bebidaRepository;
    private final IngredienteRepository ingredienteRepository;

    public PedidoService(PedidoRepository pedidoRepository, HamburguerRepository hamburguerRepository,
                         BebidaRepository bebidaRepository, IngredienteRepository ingredienteRepository) {
        this.pedidoRepository = pedidoRepository;
        this.hamburguerRepository = hamburguerRepository;
        this.bebidaRepository = bebidaRepository;
        this.ingredienteRepository = ingredienteRepository;
    }

    @Transactional
    public Pedido salvar(Pedido pedido) {
        if (pedido.getId() == null) {
            pedido.setDataPedido(LocalDateTime.now());
        }

        BigDecimal total = BigDecimal.ZERO;

        // Processar Hambúrgueres
        if (pedido.getHamburgueres() != null && !pedido.getHamburgueres().isEmpty()) {
            List<Long> ids = pedido.getHamburgueres().stream().map(Hamburguer::getId).toList();
            List<Hamburguer> hamburgueres = hamburguerRepository.findAllById(ids);
            pedido.setHamburgueres(hamburgueres);
            for (Hamburguer h : hamburgueres) {
                total = total.add(h.getValor());
            }
        }

        // Processar Bebidas
        if (pedido.getBebidas() != null && !pedido.getBebidas().isEmpty()) {
            List<Long> ids = pedido.getBebidas().stream().map(Bebida::getId).toList();
            List<Bebida> bebidas = bebidaRepository.findAllById(ids);
            pedido.setBebidas(bebidas);
            for (Bebida b : bebidas) {
                total = total.add(b.getPrecoUnitario());
            }
        }

        // Processar Adicionais
        if (pedido.getAdicionais() != null && !pedido.getAdicionais().isEmpty()) {
            List<Long> ids = pedido.getAdicionais().stream().map(Ingrediente::getId).toList();
            List<Ingrediente> adicionais = ingredienteRepository.findAllById(ids);

            for (Ingrediente add : adicionais) {
                if (!add.getAdicional()) {
                    throw new IllegalArgumentException("O ingrediente " + add.getDescricao() + " não é permitido como adicional.");
                }
                total = total.add(add.getPrecoUnitario());
            }
            pedido.setAdicionais(adicionais);
        }

        // Salvar valor total
        pedido.setValorTotal(total);

        return pedidoRepository.save(pedido);
    }

    public Pedido buscarPorId(Long id) {
        return pedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("Pedido não encontrado."));
    }

    public List<Pedido> listar() {
        return pedidoRepository.findAll();
    }
}
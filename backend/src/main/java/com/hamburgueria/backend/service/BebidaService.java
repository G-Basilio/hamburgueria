package com.hamburgueria.backend.service;

import com.hamburgueria.backend.model.Bebida;
import com.hamburgueria.backend.repository.BebidaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BebidaService {

    private final BebidaRepository repository;

    public BebidaService(BebidaRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Bebida salvar(Bebida bebida) {
        return repository.save(bebida);
    }

    public Bebida buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bebida não encontrada."));
    }

    public List<Bebida> listar(String descricao) {
        if (descricao != null && !descricao.isBlank()) {
            return repository.findByDescricaoContainingIgnoreCase(descricao);
        }
        return repository.findAll();
    }
}
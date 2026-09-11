package com.hamburgueria.backend.service;

import com.hamburgueria.backend.model.Ingrediente;
import com.hamburgueria.backend.repository.IngredienteRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredienteService {

    private final IngredienteRepository repository;

    public IngredienteService(IngredienteRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Ingrediente salvar(Ingrediente ingrediente) {
        return repository.save(ingrediente);
    }

    public Ingrediente buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingrediente não encontrado."));
    }

    public List<Ingrediente> listar(String descricao) {
        if (descricao != null && !descricao.isBlank()) {
            return repository.findByDescricaoContainingIgnoreCase(descricao);
        }
        return repository.findAll();
    }
}
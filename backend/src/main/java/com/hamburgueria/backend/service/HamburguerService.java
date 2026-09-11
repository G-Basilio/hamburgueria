package com.hamburgueria.backend.service;

import com.hamburgueria.backend.model.Hamburguer;
import com.hamburgueria.backend.model.Ingrediente;
import com.hamburgueria.backend.repository.HamburguerRepository;
import com.hamburgueria.backend.repository.IngredienteRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HamburguerService {

    private final HamburguerRepository repository;
    private final IngredienteRepository ingredienteRepository;

    public HamburguerService(HamburguerRepository repository, IngredienteRepository ingredienteRepository) {
        this.repository = repository;
        this.ingredienteRepository = ingredienteRepository;
    }

    @Transactional
    public Hamburguer salvar(Hamburguer hamburguer) {
        if (hamburguer.getIngredientes() != null && !hamburguer.getIngredientes().isEmpty()) {
            List<Long> idsIngredientes = hamburguer.getIngredientes().stream()
                    .map(Ingrediente::getId)
                    .toList();
            List<Ingrediente> ingredientesCompletos = ingredienteRepository.findAllById(idsIngredientes);
            hamburguer.setIngredientes(ingredientesCompletos);
        }
        return repository.save(hamburguer);
    }

    public Hamburguer buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hambúrguer não encontrado."));
    }

    public List<Hamburguer> listar(String descricao) {
        if (descricao != null && !descricao.isBlank()) {
            return repository.findByDescricaoContainingIgnoreCase(descricao);
        }
        return repository.findAll();
    }
}

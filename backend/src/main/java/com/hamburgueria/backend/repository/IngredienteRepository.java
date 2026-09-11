package com.hamburgueria.backend.repository;

import com.hamburgueria.backend.model.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {
    List<Ingrediente> findByDescricaoContainingIgnoreCase(String descricao);
}

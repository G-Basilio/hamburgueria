package com.hamburgueria.backend.repository;

import com.hamburgueria.backend.model.Hamburguer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HamburguerRepository extends JpaRepository<Hamburguer, Long> {
    List<Hamburguer> findByDescricaoContainingIgnoreCase(String descricao);
}

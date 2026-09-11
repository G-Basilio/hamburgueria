package com.hamburgueria.backend.repository;

import com.hamburgueria.backend.model.Bebida;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BebidaRepository extends JpaRepository<Bebida, Long> {
    List<Bebida> findByDescricaoContainingIgnoreCase(String descricao);
}

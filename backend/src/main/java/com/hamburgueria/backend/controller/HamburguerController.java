package com.hamburgueria.backend.controller;

import com.hamburgueria.backend.model.Hamburguer;
import com.hamburgueria.backend.service.HamburguerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hamburgueres")
public class HamburguerController {

    private final HamburguerService service;

    public HamburguerController(HamburguerService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Hamburguer> adicionar(@Valid @RequestBody Hamburguer hamburguer) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.salvar(hamburguer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hamburguer> atualizar(@PathVariable Long id, @Valid @RequestBody Hamburguer hamburguer) {
        hamburguer.setId(id);
        return ResponseEntity.ok(service.salvar(hamburguer));
    }

    @GetMapping
    public ResponseEntity<List<Hamburguer>> pesquisar(@RequestParam(required = false) String descricao) {
        return ResponseEntity.ok(service.listar(descricao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hamburguer> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }
}
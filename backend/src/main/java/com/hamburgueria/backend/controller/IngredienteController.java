package com.hamburgueria.backend.controller;

import com.hamburgueria.backend.model.Ingrediente;
import com.hamburgueria.backend.service.IngredienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingredientes")
public class IngredienteController {

    private final IngredienteService service;

    public IngredienteController(IngredienteService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Ingrediente> adicionar(@Valid @RequestBody Ingrediente ingrediente) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.salvar(ingrediente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ingrediente> atualizar(@PathVariable Long id, @Valid @RequestBody Ingrediente ingrediente) {
        ingrediente.setId(id);
        return ResponseEntity.ok(service.salvar(ingrediente));
    }

    @GetMapping
    public ResponseEntity<List<Ingrediente>> pesquisar(@RequestParam(required = false) String descricao) {
        return ResponseEntity.ok(service.listar(descricao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingrediente> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }
}
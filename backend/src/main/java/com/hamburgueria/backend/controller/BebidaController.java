package com.hamburgueria.backend.controller;

import com.hamburgueria.backend.model.Bebida;
import com.hamburgueria.backend.service.BebidaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bebidas")
public class BebidaController {

    private final BebidaService service;

    public BebidaController(BebidaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Bebida> adicionar(@Valid @RequestBody Bebida bebida) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.salvar(bebida));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bebida> atualizar(@PathVariable Long id, @Valid @RequestBody Bebida bebida) {
        bebida.setId(id);
        return ResponseEntity.ok(service.salvar(bebida));
    }

    @GetMapping
    public ResponseEntity<List<Bebida>> pesquisar(@RequestParam(required = false) String descricao) {
        return ResponseEntity.ok(service.listar(descricao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bebida> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }
}

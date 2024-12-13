package com.fatec.teste.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.teste.entities.Pessoa;
import com.fatec.teste.services.PessoaService;

@RestController
@RequestMapping("/pessoas")
@CrossOrigin
public class PessoaController {
    @Autowired
    private PessoaService pessoaService;

    @GetMapping
    public List<Pessoa> listarPessoas(){
        return pessoaService.listarPessoas();
    }

    @GetMapping("{id}")
    public Pessoa listarPessoa(@PathVariable int id){
        return pessoaService.listarPessoa(id);
    }

    @PostMapping()
    public Integer salvar(@RequestBody Pessoa pessoa) {
        return pessoaService.salvar(pessoa);
    }

    @PutMapping("{id}")
    public Integer editarPessoa(@PathVariable int id, @RequestBody Pessoa pessoaEditada) {
        return pessoaService.atualizar(id, pessoaEditada);
    }
}

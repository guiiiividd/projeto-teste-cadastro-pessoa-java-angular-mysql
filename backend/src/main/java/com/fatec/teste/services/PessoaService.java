package com.fatec.teste.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.teste.entities.Pessoa;
import com.fatec.teste.repositories.PessoaRepository;

@Service
public class PessoaService {
    @Autowired
    private PessoaRepository pessoaRepository;

    // public List<Pessoa> listarPessoas(){
    //     return pessoaRepository.findAll();
    // }

    public List<Pessoa> listarPessoas(){
        return pessoaRepository.findByNativeQuery();
    }

    // public Pessoa listarPessoa(Integer id){
    //     return pessoaRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pessoa Not Found"));
    // }

    public Pessoa listarPessoa(Integer id){
        return pessoaRepository.findByIdByNativeQuery(id);
    }

    // public Pessoa salvar(Pessoa pessoa){
    //     return pessoaRepository.save(pessoa);
    // }

    public Integer salvar(Pessoa pessoa){
        return pessoaRepository.insertByNativeQuery(pessoa.getNome(), pessoa.getIdade());
    }

    public Integer atualizar(int id, Pessoa pessoaEditada){
        Pessoa pessoa = listarPessoa(id);

        // if(pessoaEditada.getCategory() == null){
        //     throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category Can Not Be Empty");
        // }

        // Category category  = categoryService.getById(productUpdate.getCategory().getId());

        pessoa.setNome(pessoaEditada.getNome());
        pessoa.setIdade(pessoaEditada.getIdade());
        // product.setCategory(category);

        return pessoaRepository.updateByNativeQuery(pessoa.getNome(), pessoa.getIdade(), pessoa.getId());
    }
}

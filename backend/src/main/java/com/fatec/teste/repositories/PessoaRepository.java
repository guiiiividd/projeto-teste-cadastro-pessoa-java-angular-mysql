package com.fatec.teste.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fatec.teste.entities.Pessoa;

import jakarta.transaction.Transactional;

public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
    @Query(value = "SELECT * FROM pessoa", nativeQuery = true)
    List<Pessoa> findByNativeQuery();

    @Query(value = "SELECT * FROM pessoa WHERE id = :id", nativeQuery = true)
    Pessoa findByIdByNativeQuery(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO pessoa(nome, idade) VALUES(:nome, :idade)", nativeQuery = true)
    Integer insertByNativeQuery(@Param("nome") String nome, @Param("idade") Integer idade);

    @Modifying
    @Transactional
    @Query(value = "UPDATE pessoa SET nome = :nome, idade = :idade WHERE id = :id", nativeQuery = true)
    Integer updateByNativeQuery(@Param("nome") String nome, @Param("idade") Integer idade, @Param("id") Integer id);
}

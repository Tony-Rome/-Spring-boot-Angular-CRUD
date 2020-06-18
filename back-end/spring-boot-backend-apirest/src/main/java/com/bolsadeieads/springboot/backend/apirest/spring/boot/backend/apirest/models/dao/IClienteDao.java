/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.bolsadeieads.springboot.backend.apirest.spring.boot.backend.apirest.models.dao;

import com.bolsadeieads.springboot.backend.apirest.spring.boot.backend.apirest.models.entity.Cliente;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author tony
 */
public interface IClienteDao extends CrudRepository<Cliente, Long>{
    
    
}

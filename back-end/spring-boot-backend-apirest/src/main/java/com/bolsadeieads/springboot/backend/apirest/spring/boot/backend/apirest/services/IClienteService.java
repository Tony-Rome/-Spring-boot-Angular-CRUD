/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.bolsadeieads.springboot.backend.apirest.spring.boot.backend.apirest.services;

import com.bolsadeieads.springboot.backend.apirest.spring.boot.backend.apirest.models.entity.Cliente;
import java.util.List;

/**
 *
 * @author tony
 */
public interface IClienteService {
    
    public List<Cliente> findAll();
    
    public Cliente findById(Long id);
    
    public Cliente save(Cliente cliente);
    
    public void delete (Long id);
}

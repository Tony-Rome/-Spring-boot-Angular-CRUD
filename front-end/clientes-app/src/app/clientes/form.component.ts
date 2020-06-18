import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo = 'crear cliente';
  public errores: string[];


  constructor(private clienteService: ClienteService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activateRoute.params.subscribe(params => {
      console.log(params);
      const id = params.id; // O es con corchete params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente);
      }
    });
  }

  public create(): void {

    this.clienteService.create(this.cliente).subscribe (
      cliente => {
        this.router.navigate(['/clientes']),
        swal('Nuevo cliente', `El cliente ${cliente.nombre} creado con exito`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo de error backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe(json => {
      this.router.navigate(['/clientes']);
      swal('Cliente actualizado', `${json.mensaje} ${json.cliente.nombre} creado con exito`, 'success');
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Codigo de error backend: ' + err.status);
      console.error(err.error.errors);
    }
    );
  }
}

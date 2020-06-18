import { Injectable } from '@angular/core';
import {formatDate, DatePipe} from '@angular/common';
import {CLIENTES} from './clientes.json';
import { Cliente } from './cliente';
import {Observable, throwError} from 'rxjs';
import {of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {

    // return of(CLIENTES);  Lo convierte en un Stream

    return this.http.get(this.urlEndPoint).pipe(
      tap(response => { // SOLO PARA EJEMPLO
        const clientes = response as Cliente[];
        clientes.forEach( cliente => {
          console.log(cliente.nombre);
        });
      }),
        // Se debe pasar a observable, es decir Cliente[]
      map(response => {
        const clientes =  response as Cliente[];
        return clientes.map(cliente => { // Parametro cada cliente, retorna lista de clientes
            cliente.nombre = cliente.nombre.toUpperCase();
            const datePipe = new DatePipe('en-US'); // se puede poner nombre abreviado o completo poniendo tres o cuatro la letra respectiva
            cliente.createAt = datePipe.transform(cliente.createAt, 'dd/MM/yyy'); // Tambien transforma fecha
            // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyy', 'en-US'); // Valor original, valor final, valor horario
            return cliente; // Retorna cliente uppercase
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {

    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente), // Retorna tipo Cliente
      catchError(e => {

      if (e.status === 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal(e.error.mensaje, e.error.error, 'error');
      return throwError(e);

      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
          catchError(e => {

            this.router.navigate(['/clientes']);
            swal('Error al editar', e.error.mensaje, 'error'); // atributo mensaje es el que se pasa en el response.put("mensaje")
            return throwError(e);
          })
        );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

      if (e.status === 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}

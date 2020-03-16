import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { path } from '../../../environments/path';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  data: any = { products: [] };

  constructor(private router: Router, private productService: ProductService) {
    this.productService.getListProducts(path.END_POINT_CLOUD_APP_GET_LIST_PRODUCTS).subscribe((resp) => {
      this.data = resp;
    }, (err) => {
      console.log('error');
      if(err.status == 401) {
        this.router.navigateByUrl('/login');
      } else {
        Swal.fire({ title: 'Error', text: 'Problemas con servicio' });
      }
    });
  }

  goToDetails(id) {
    this.router.navigate(['/producto',id]);
  }

}

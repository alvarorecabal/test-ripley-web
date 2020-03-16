import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { path } from '../../../environments/path';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  id: string;
  find: boolean = true;
  product: any = {
    id: '',
    name: '',
    image: '',
    description: '',
    offerPrice: 0,
    listPrice: 0,
    cardPrice: 0,
    attributes: []
  }
  collapseSpec = false;
  collapseDetails = false;
  hideCardPrice: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router, 
              private productService: ProductService) {

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.productService.getProductById(this.id, path.END_POINT_CLOUD_APP_GET_PRODUCT_BY_ID).subscribe((resp) => {
      this.product = resp;
      if(typeof this.product.cardPrice == 'undefined') {
        this.hideCardPrice = true;
      }
    }, (err) => {
      if (err.status == 404) {
        this.find = false;
      } else if(err.status == 401) {
        this.router.navigateByUrl('/login');
      } else {
        Swal.fire({ title: 'Error', text: 'Problemas con servicio' });
      }
    });
  }

  openDetails() {
    this.collapseDetails = !this.collapseDetails;
  }

  openSpec() {
    this.collapseSpec = !this.collapseSpec;
  }

}

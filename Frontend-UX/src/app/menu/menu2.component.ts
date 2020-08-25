import { Component, OnInit } from "@angular/core";
import { ReviewsService } from "./Reviews.service";
import { ProductsListService } from "./Products.service";
import { SendProductsService } from "./sendProducts.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "menu2-class",
  templateUrl: "./Bebidas.component.html",
})
export class Menu2Component implements OnInit {
  lstProducts: any;
  lstReviews: any;
  url: string;
  nombre: string;
  id: string;
  range: string;
  comments: string;

  constructor(
    private productsList: ProductsListService,
    private reviews: ReviewsService,
    private carritoService: SendProductsService,
    private toastr:ToastrService
  ) {}

  ngOnInit() {
    //document.getElementById('slideshow').style.display='none';
    this.productsList.getDrinks().subscribe(
      (res) => {
        this.lstProducts = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showReviews(pr) {
    this.hideOptionReview();
    this.url = pr.url;
    this.nombre = pr.nombre;
    this.id = pr.idProducto;
    this.reviews.getReviews(pr.idProducto).subscribe(
      (res) => {
        this.lstReviews = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addReviews() {
    this.range = (document.getElementById("range") as HTMLInputElement).value;
    this.comments = (document.getElementById(
      "comment"
    ) as HTMLInputElement).value;
    this.reviews.addReviews(this.id, this.range, this.comments);
    this.hideOptionReview();
  }

  agregarCarrito(producto) {
    this.carritoService.agregarProducto(producto);
    return this.toastr.success("Se añadio al carrito", "Listo!")

  }
  hideOptionReview() {
    document.getElementById("esconder").style.display = "none";
  }

  showOptionReview() {
    document.getElementById("esconder").style.display = "inline";
  }
}

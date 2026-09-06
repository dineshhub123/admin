import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDialogComponent } from '../product-edit-dialog/product-edit-dialog.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  imageBaseUrl = environment.imageBaseUrl;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  products: any[] = [];
  isLoading: boolean = false;
  selectedStock: string = 'All'
  searchText: string = '';
  subCategorySearchText: string = '';
  displayedColumns: string[] = [
    'index',
    'product_id',
    'images',
    'product_name',
    'shelf_code',
    'category',
    'sub_category',
    'product_price',
    'stock',
    'color',
    'colorCode',
    'action'
  ];

  constructor(public apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProductList();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const parsed = JSON.parse(filter);
      const search = parsed.search.toLowerCase();
      const subCategorySearch = parsed.subCategorySearch.toLowerCase();
      const stock = parsed.stock;
      // Search filter
      const matchesSearch =
        !search ||
        data.product_id?.toLowerCase().includes(search) ||
        data.product_name?.toLowerCase().includes(search) ||
        data.category?.toLowerCase().includes(search) ||
        data.sub_category?.toLowerCase().includes(search);

      const matchesSubCategory =
        !subCategorySearch ||
        data.sub_category?.toLowerCase().includes(subCategorySearch);

      //Stock filter
      let matchesStock = true;

      if (stock === 'low') {
        matchesStock = data.stockTotal < 5;
      } else if (stock === 'out') {
        matchesStock = data.stockTotal === 0;
      } else if (stock === 'high') {
        matchesStock = data.stockTotal > 5;
      }
      return matchesSearch && matchesSubCategory && matchesStock;
    };

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  sanitizeHtml(html: string): string {
    return html.replace(/font-size\s*:\s*[^;"]+;?/gi, '');
  }

  deleteProduct(productId: any): void {
    const confirmDelete = confirm(`Are you sure you want to delete "${productId.product_id}"?`);
    if (confirmDelete) {
      this.apiService.deleteProduct(productId.product_id).subscribe({
        next: (res) => {
          alert('Product deleted successfully.');
          this.getProductList()
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Failed to delete product.');
        }
      });
    }
  }

  getProductList() {
    this.isLoading = true;
    this.apiService.getProductListDetailsData().subscribe({
      next: (data: any[]) => {
        this.isLoading = false;
        const productsById = new Map<string, any>();
        data.forEach(product => {
          const existingProduct = productsById.get(product.product_id);
          productsById.set(product.product_id, existingProduct
            ? { ...existingProduct, variants: [...existingProduct.variants, ...(product.variants ?? [])] }
            : { ...product, variants: product.variants ?? [] });
        });

        const groupedProducts = Array.from(productsById.values()).map(product => {
          const variants = product.variants;
          const sizeStocks = new Map<string, number>();

          variants.forEach((variant: any) => {
            (variant.sizes ?? []).forEach((sizeStock: any) => {
              const size = String(sizeStock.size ?? '').trim();
              if (size) {
                sizeStocks.set(size, (sizeStocks.get(size) ?? 0) + (Number(sizeStock.stock) || 0));
              }
            });
          });

          const hasSizes = sizeStocks.size > 0;
          const stockEntries = Array.from(sizeStocks.entries()).map(([size, quantity]) => ({ size, quantity }));
          const stock = hasSizes
            ? stockEntries.map(entry => `${entry.size}-${entry.quantity}`).join(',')
            : variants.reduce((total: number, variant: any) => total + (Number(variant.stock ?? variant.p_stock) || 0), 0);

          return {
            product_id: product.product_id,
            product_name: product.product_name,
            category: product.category,
            sub_category: product.sub_category ?? product.subcategory ?? product.p_subcategory,
            product_price: product.product_price,
            shelf_code: product.shelf_code,
            color: variants.map((variant: any) => variant.color).filter(Boolean).join(', '),
            stock,
            stockEntries,
            stockTotal: hasSizes
              ? Array.from(sizeStocks.values()).reduce((total, quantity) => total + quantity, 0)
              : variants.reduce((total: number, variant: any) => total + (Number(variant.stock ?? variant.p_stock) || 0), 0),
            images: variants.flatMap((variant: any) => variant.images ?? []).filter(Boolean),
            colorCode: variants.map((variant: any) => variant.colorCode).filter(Boolean).join(', ')
          };
        });

        this.dataSource.data = groupedProducts;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  applyProductSearch(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  applyProductStock(value: string) {
    this.selectedStock = value;
    this.applyFilters();
  }

  applySubCategorySearch(event: Event) {
    this.subCategorySearchText = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  applyFilters() {
    const filter = {
      search: this.searchText || '',
      subCategorySearch: this.subCategorySearchText || '',
      stock: this.selectedStock || ''
    };
    this.dataSource.filter = JSON.stringify(filter);
  }

  resetFilter() {
    this.searchText = '';
    this.subCategorySearchText = '';
    this.selectedStock = 'All';
    this.applyFilters();
  }

  editProduct(product: any): void {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      width: '800px',
      data: { product: { ...product } } // Pass a copy of the product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProductList();
      }
    });
  }
  getShelfClass(code: string) {
    if (!code) return '';
    const rack = code.charAt(0);
    switch (rack) {
      case 'A': return 'rack-a';
      case 'B': return 'rack-b';
      case 'C': return 'rack-c';
      case 'D': return 'rack-d';
      case 'E': return 'rack-e';
      case 'F': return 'rack-f';
      default: return 'rack-default';
    }
  }
}

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
    'action'
  ];

  constructor(public apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProductList();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const parsed = JSON.parse(filter);
      const search = parsed.search.toLowerCase();
      const subCategorySearch = parsed.subCategorySearch.toLowerCase();
      const stock = String(parsed.stock || '').toLowerCase();
      const stockTotal = Number(data.stockTotal) || 0;
      const sizeStocks = (data.stockEntries ?? [])
        .map((entry: any) => Number(entry.quantity) || 0);
      const hasSizeStocks = sizeStocks.length > 0;
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
        matchesStock = hasSizeStocks
          ? sizeStocks.some((quantity: number) => quantity < 5)
          : stockTotal < 5;
      } else if (stock === 'out') {
        matchesStock = hasSizeStocks
          ? sizeStocks.some((quantity: number) => quantity <= 0)
          : stockTotal <= 0;
      } else if (stock === 'high') {
        matchesStock = hasSizeStocks
          ? sizeStocks.some((quantity: number) => quantity > 5)
          : stockTotal > 5;
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

  deleteProduct(product: any): void {
    const confirmDelete = confirm(
      `Are you sure you want to delete "${product.product_id}" color "${product.color}"?`
    );
    if (confirmDelete) {
      this.apiService.deleteProduct(product.product_id, product.color).subscribe({
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
          const productVariants = Array.isArray(product.variants)
            ? product.variants
            : (product.color || product.p_color) ? [product] : [];
          const existingProduct = productsById.get(product.product_id);
          productsById.set(product.product_id, existingProduct
            ? { ...existingProduct, variants: [...existingProduct.variants, ...productVariants] }
            : { ...product, variants: productVariants });
        });

        // A product can have several colour variants.  Keep the product details
        // on each row, but show the stock and images for only that colour.
        const groupedProducts = Array.from(productsById.values()).flatMap(product => {
          const variants = product.variants.length ? product.variants : [{}];

          return variants.map((variant: any) => {
            const stockEntries = (variant.sizes ?? [])
              .map((sizeStock: any) => ({
                size: String(sizeStock.size ?? '').trim(),
                quantity: Number(sizeStock.stock) || 0
              }))
              .filter((sizeStock: any) => Boolean(sizeStock.size));
            const hasSizes = stockEntries.length > 0;
            const totalStock = hasSizes
              ? stockEntries.reduce((total: number, sizeStock: any) => total + sizeStock.quantity, 0)
              : Number(variant.stock ?? variant.p_stock) || 0;

            return {
              product_id: product.product_id,
              product_name: product.product_name,
              category: product.category,
              sub_category: product.sub_category ?? product.subcategory ?? product.p_subcategory,
              product_price: product.product_price,
              shelf_code: product.shelf_code,
              color: variant.color ?? variant.p_color ?? '',
              editColor: variant.color ?? variant.p_color ?? '',
              // The edit dialog must receive only the variant shown in this row.
              variants: [variant],
              stock: hasSizes
                ? stockEntries.map((entry: any) => `${entry.size}-${entry.quantity}`).join(',')
                : totalStock,
              stockEntries,
              stockTotal: totalStock,
              images: (variant.images ?? variant.image_url ?? []).filter(Boolean),
              colorCode: variant.colorCode ?? variant.p_colorcode ?? ''
            };
          });
        });

        this.dataSource.data = groupedProducts;
  this.applyFilters();
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

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent {
 constructor(private router: Router){}
productId: string | null = null;
  orderItem: any;
order = {
    order_id: "ORD_1001",
    user: {
      userId: "user_1",
      user_first_name: "Dinesh",
      user_last_name: "Bhagat",
      user_email: "dineshbhagatbpl@gmail.com",
      user_phone: "8600245120",
      user_address: "Garra",
      user_pincode: "481001"
    },
    items: [
      {
        product_id: "product_001",
        product_name: "shoes for mens casuals",
        category: "footwear",
        sub_category: "shoes",
        quantity: 1,
        product_price: 1800,
        product_mrp_price: 2000,
        product_discount: 200,
        variant: { color: "Yellow", colorCode: "#FFFF00", size: "M" },
        image_url: "new-ruralx/src/assets/uploads/shoes-yellow.webp"
      },
      {
        product_id: "product_002",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_003",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_004",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_005",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_006",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_007",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_008",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_009",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_010",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_011",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_012",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_013",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_014",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_015",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_016",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_017",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_018",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      },
{
        product_id: "product_018",
        product_name: "casual sneakers",
        category: "footwear",
        sub_category: "sneakers",
        quantity: 2,
        product_price: 2500,
        product_mrp_price: 2800,
        product_discount: 300,
        variant: { color: "Black", colorCode: "#000000", size: "L" },
        image_url: "new-ruralx/src/assets/uploads/shoes-black.webp"
      }
    ],
    payment: {
      method: "Razorpay",
      status: "paid",
      transaction_id: "pay_NqfR64p2h3v0M8"
    },
    delivery_date: "Thu Jan 16",
    order_status: "Pending",
    order_date: "2025-10-25T10:15:00",
    total_amount: 1800
  };

  displayedColumns: string[] = [
    'id', 'image', 'name', 'mrp', 'price', 'discount', 'quantity',
    'status',
    'user', 'phone','view'
  ];

  dataSource = new MatTableDataSource<any>(this.order.items);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
// viewItem(productId: string) {
//   const selectedItem = this.order.items.find(item => item.product_id === productId);

//   if (selectedItem) {
//     this.router.navigate(['/orders/orderview'], { state: { order: this.order, selectedItem } });
//   } else {
//     console.error('Item not found!');
//   }
// }

 viewItem(productId: string) {
    // Navigate to order view page with product_id as route parameter
    this.router.navigate(['/orders/orderview', productId]);
console.log(productId);
  }

  // Alternative method if you want to pass the entire order data
  viewItemWithState(productId: string) {
    const selectedItem = this.order.items.find(item => item.product_id === productId);
    
    if (selectedItem) {
      this.router.navigate(['/orders/orderview', productId], { 
        state: { 
          fullOrder: this.order, 
          selectedProductId: productId 
        }
      });
    }
  }
}

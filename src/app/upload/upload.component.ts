import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ADMIN_CATEGORY_MASTER  } from '../constants/category-master'
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  categories = ADMIN_CATEGORY_MASTER;
  selectedCategory: any = null;
  selectedSubCategory: string | null = null;

  onCategoryChange(categoryKey: string) {
    this.selectedCategory = this.categories.find(c => c.category === categoryKey);
    this.selectedSubCategory = null; // reset subcategory
  }

  productForm: FormGroup;
  productColor = ['Red', 'Blue', 'Green', 'Black','Darkgrey','Maroon', 'Yellow', 'Brown', 'Orange', 'Voilet', 'Pink', 'Light Sky', 'Light Green']
  selectSizeOption = [true,false]
  selectedSize:boolean = true;
  deleteVariant: boolean = false;
  selectedFiles: { [key: string]: File } = {};
  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      p_name: [''],
      p_mrp: [''],
      p_description: [''],
      p_price: [0],
      p_discount: [0],
      p_category: [''],
      p_subcategory:[''],
      delivery_date: [''],
      variants: this.fb.array([this.createVariant()])
    });
  }
  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }
  ngOnInit() {
    this.productForm.patchValue({p_size_boolean:true})
  }
  htmlContent: string = '';
  editorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: '100%',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    defaultFontSize: '4',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote'
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      }
    ],

  };


onSelectFile(event: any, index: number): void {
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    // convert to array of files
    const fileArray = Array.from(files);

    // set into the form control (store multiple files)
    this.variants.at(index).get('image_url')?.setValue(fileArray);

    console.log("Variant updated with files:", this.variants.at(index).value);
  }
}

uploadFormData(): void {
  const formData = new FormData();

  // Add product main info
  formData.append('p_name', this.productForm.get('p_name')?.value);
  formData.append('p_price', this.productForm.get('p_price')?.value);
  formData.append('p_mrp', this.productForm.get('p_mrp')?.value);
  formData.append('p_discount', this.productForm.get('p_discount')?.value);
  formData.append('delivery_date', this.productForm.get('delivery_date')?.value);
  formData.append('p_category', this.productForm.get('p_category')?.value);

  formData.append('p_subcategory', this.productForm.get('p_subcategory')?.value);

  formData.append('p_description', this.productForm.get('p_description')?.value);

  const variantsData: any[] = [];

  this.variants.controls.forEach((variantGroup, index) => {
    const variant = variantGroup.value;
    const imageKey = `variant_${index}`;

    // add all files for this variant
    if (Array.isArray(variant.image_url)) {
      variant.image_url.forEach((file: File) => {
        formData.append(imageKey + '[]', file); // ✅ append as array
      });
    }

    variantsData.push({
      //p_size: variant.p_size,
      p_color: variant.p_color,
      p_colorcode: variant.p_colorcode,
      p_stock: variant.p_stock,
      //p_view: variant.p_view,
      image_key: imageKey
    });
  });

  // append variant metadata
  formData.append('variant', JSON.stringify(variantsData));

  this.apiService.uploadData(formData).subscribe({
    next: (res) => console.log('Upload success:', res),
    error: (err) => console.error('Upload failed:', err)
  });
}

// onSelectFile(event: any, index: number): void {
//   const file: File = event.target.files[0];
//   if (file) {
//     this.variants.at(index).get('image_url')?.setValue(file); // set File object
//     console.log("variants",this.variants)
//   }
// }


// uploadFormData(data: any): void {
//   const formData = new FormData();
//   // Add product main info
//   formData.append('p_name', this.productForm.get('p_name')?.value);
//   formData.append('p_price', this.productForm.get('p_price')?.value);
//   formData.append('p_mrp', this.productForm.get('p_mrp')?.value);
//   formData.append('p_discount', this.productForm.get('p_discount')?.value);
//   formData.append('delivery_date', this.productForm.get('delivery_date')?.value);
//   formData.append('p_category', this.productForm.get('p_category')?.value);
//   formData.append('p_size_boolean', this.productForm.get('p_size_boolean')?.value);
//   formData.append('p_description', this.productForm.get('p_description')?.value);
//   const variantsData: any[] = [];
//   this.variants.controls.forEach((variantGroup, index) => {
//     const variant = variantGroup.value;
//     const imageKey = `image_url_${index}`;
//     const imageFile = variant.image_url;
//     if (imageFile instanceof File) {
//       formData.append(imageKey, imageFile); // attach image
//     }

//     variantsData.push({
//       p_size: variant.p_size,
//       p_color: variant.p_color,
//       p_colorcode: variant.p_colorcode,
//       p_stock: variant.p_stock,
//       p_view: variant.p_view,
//       image_key: imageKey
//     });
//   });

//   formData.append('variant', JSON.stringify(variantsData));

//   this.apiService.uploadData(formData).subscribe({
//     next: (res) => {
//       console.log('Upload success:', res);
//     },
//     error: (err) => {
//       console.error('Upload failed:', err);
//     }
//   });
// }

  createVariant(): FormGroup {
    return this.fb.group({
      p_size: [null],
      p_color: [''],
      p_stock: [''],
      p_view: [''],
      image_url:[''],
      p_colorcode:['']
    });
  }
  addVariant() {
    if (this.variants.controls.length >= 1) {
      //this.deleteVariant = true;
    }
    this.variants.push(this.createVariant());
  }

  removeVariant(index: number) {
    if (this.variants.controls.length > 1) {
      this.variants.removeAt(index);
    }
  }
  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // only allow 0-9
    }
  }
afterSelectSize(event:any) {
this.selectedSize = event;
}
}

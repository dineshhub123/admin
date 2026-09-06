import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ADMIN_CATEGORY_MASTER } from 'src/app/constants/category-master';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import imageCompression from 'browser-image-compression';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload_product.component.html',
  styleUrls: ['./upload_product.component.css']
})
export class UploadComponent implements OnInit {
  categoryMaster = ADMIN_CATEGORY_MASTER;
  private categoryKeywordsCache: Record<string, string[]> | null = null;
  private readonly watchSubCategories = [
    { key: 'analog', label: 'Analog' },
    { key: 'digital', label: 'Digital' },
    { key: 'smart_watch', label: 'Smart Watch' }
  ];
  mainCategories = [
    { key: 'mens', label: 'Men', categories: ['Clothing', 'Footwear', 'Watches', 'Wallets & Belts', 'Accessories'], subCategories: ['Clothing', 'Footwear', 'Watches', 'Wallets & Belts', 'Bags', 'Accessories', 'Sportswear', 'Ethnic Wear', 'Innerwear', 'Winter Wear'] },
    { key: 'womens', label: 'Women', categories: ['Clothing', 'Footwear', 'Handbags', 'Jewellery & Watches', 'Beauty Accessories'], subCategories: ['Clothing', 'Footwear', 'Handbags', 'Jewellery', 'Watches', 'Beauty Accessories', 'Lingerie', 'Ethnic Wear', 'Saree', 'Salwar Suit', 'Winter Wear', 'Accessories'] },
    { key: 'boys', label: 'Boys', categories: ['Clothing', 'Footwear', 'Watches', 'School Accessories', 'Accessories'], subCategories: ['Clothing', 'Footwear', 'School Bags', 'Watches', 'Belts', 'Caps', 'Sportswear', 'Ethnic Wear', 'Innerwear', 'Accessories'] },
    { key: 'girls', label: 'Girls', categories: ['Clothing', 'Footwear', 'Jewellery & Watches', 'School Accessories', 'Accessories'], subCategories: ['Clothing', 'Footwear', 'Jewellery', 'School Bags', 'Hair Accessories', 'Watches', 'Ethnic Wear', 'Salwar Suit', 'Sportswear', 'Winter Wear', 'Accessories'] },
    { key: 'kids', label: 'Kids', categories: ['Baby Clothing', 'Baby Footwear', 'Toys', 'Baby Care', 'School Essentials'], subCategories: ['Baby Clothing', 'Baby Footwear', 'Toys', 'Baby Care', 'School Essentials', 'Feeding Essentials', 'Diapers', 'Travel Gear', 'Accessories', 'Nursery'] },
    { key: 'electronics', label: 'Electronics', categories: ['Mobile Accessories', 'Audio Devices', 'Computer Accessories', 'Smart Gadgets', 'Home Electronics'], subCategories: ['Mobile Accessories', 'Audio', 'Smart Watches', 'Computer Accessories', 'Storage Devices', 'Gaming', 'Smart Gadgets', 'Home Electronics', 'Cameras', 'Networking'] },
    { key: 'electricals', label: 'Electricals', categories: ['Lighting', 'Switches & Sockets', 'Wires & Cables', 'Extension Boards', 'Electrical Tools'], subCategories: ['Lighting', 'Fans', 'Switches & Sockets', 'Wires & Cables', 'Extension Boards', 'Emergency Lights', 'Electrical Tools', 'MCB & Safety', 'Holders', 'Accessories'] },
    { key: 'home_kitchen', label: 'Home & Kitchen', categories: ['Kitchen Essentials', 'Cookware', 'Storage & Organization', 'Home Decor', 'Cleaning Supplies'], subCategories: ['Cookware', 'Kitchen Tools', 'Kitchen Storage', 'Dining', 'Water Bottles', 'Cleaning Essentials', 'Home Decor', 'Bedding', 'Curtains', 'Plastic Items'] },
    { key: 'beauty_personal_care', label: 'Beauty & Personal Care', categories: ['Skin Care', 'Hair Care', 'Makeup', 'Fragrances', 'Personal Hygiene'], subCategories: ['Skin Care', 'Hair Care', 'Makeup', 'Fragrances', 'Personal Hygiene', 'Oral Care', "Men's Grooming", "Women's Hygiene", 'Bath & Body', 'Beauty Tools'] }
  ];
  selectedMainCategory: string | null = null;
  selectedCategory: any = null;
  selectedSubCategory: string | null = null;
  subCategorySearchText: string = '';
  bulkProductFile: File | null = null;
  isBulkUploading: boolean = false;
  ageGroups = [
    { value: '0-6_months', label: '0–6 Months' },
    { value: '6-12_months', label: '6–12 Months' },
    { value: '12-18_months', label: '12–18 Months' },
    { value: '18-24_months', label: '18–24 Months' },
    { value: '2-4_years', label: '2–4 Years' },
    { value: '4-6_years', label: '4–6 Years' },
    { value: '6-8_years', label: '6–8 Years' },
    { value: '8-10_years', label: '8–10 Years' },
    { value: '10-12_years', label: '10–12 Years' },
    { value: '12-14_years', label: '12–14 Years' },
    { value: '14-16_years', label: '14–16 Years' },
    { value: 'adult', label: 'Adult' }
  ];

  isLoading: boolean = false;
  get filteredCategories(): string[] {
    const mainCategory = this.mainCategories.find(item => item.key === this.selectedMainCategory);

    return mainCategory?.categories ?? [];
  }

  onMainCategoryChange(mainCategoryKey: string) {
    this.selectedMainCategory = mainCategoryKey;
    this.selectedCategory = null;
    this.selectedSubCategory = null;
    this.subCategorySearchText = '';
    this.productForm.patchValue({ p_category: '', p_subcategory: '', age_group: '' });
  }

  onCategoryChange(categoryKey: string) {
    this.selectedCategory = categoryKey;
    this.selectedSubCategory = null; // reset subcategory
    this.subCategorySearchText = '';
    this.productForm.get('p_subcategory')?.reset('');
    this.productForm.get('age_group')?.reset('');
  }

  get categoryAgeGroups(): any[] {
    const category = this.selectedMainCategory;

    if (category === 'kids') {
      return this.ageGroups.filter(age =>
        ['0-6_months', '6-12_months', '12-18_months', '18-24_months'].includes(age.value)
      );
    }

    if (category === 'boys' || category === 'girls') {
      return this.ageGroups.filter(age =>
        ['2-4_years', '4-6_years', '6-8_years', '8-10_years', '10-12_years', '12-14_years', '14-16_years'].includes(age.value)
      );
    }

    if (category === 'womens' || category === 'mens') {
      return this.ageGroups.filter(age => age.value === 'adult');
    }

    return [];
  }

  get filteredSubCategories(): any[] {
    const search = this.subCategorySearchText.trim().toLowerCase();
    const mainCategory = this.categoryMaster.find(item => item.category === this.selectedMainCategory);
    const category = this.productForm.get('p_category')?.value;
    const subCategories = (mainCategory?.subCategories ?? []).filter((sub: any) =>
      this.getCategoryKeywords(category).some(keyword =>
        `${sub.key} ${sub.label}`.toLowerCase().includes(keyword)
      )
    );
    const watchSubCategories = ['Watches', 'Jewellery & Watches'].includes(category)
      ? this.watchSubCategories
      : [];
    const availableSubCategories = [...subCategories, ...watchSubCategories];

    return !search
      ? availableSubCategories
      : availableSubCategories.filter((sub: any) =>
        sub.label.toLowerCase().includes(search) || sub.key.toLowerCase().includes(search)
      );
  }

  private getCategoryKeywords(category: string): string[] {
    const keywords = this.categoryKeywordsCache ?? {
      'Clothing': ['shirt', 'top', 'jean', 'trouser', 'chino', 'trackpant', 'short', 'cargo', 'dress', 'gown', 'skirt', 'legging', 'palazzo', 'tunic', 'frock', 'onesie', 'romper', 'bodysuit', 'saree', 'salwar suit'],
      'Footwear': ['shoe', 'sandal', 'slipper', 'loafer', 'boot', 'heel', 'flat', 'sock'],
      'Watches': ['watch'],
      'Wallets & Belts': ['wallet', 'belt'],
      'Accessories': ['sunglass', 'cap', 'tie', 'cufflink', 'bracelet', 'chain', 'scarf', 'hair_accessor', 'mitten'],
      'Handbags': ['handbag', 'clutch', 'tote', 'sling_bag'],
      'Jewellery & Watches': ['jewellery', 'watch'],
      'Beauty Accessories': ['lip', 'foundation', 'powder', 'kajal', 'mascara', 'nail', 'makeup'],
      'School Accessories': ['school_bag', 'lunch_bag', 'backpack'],
      'Baby Clothing': ['onesie', 'romper', 'jumpsuit', 'bodysuit', 'co_ords', 'tshirt', 'shirt', 'frock', 'dress', 'top', 'pant', 'legging', 'short'],
      'Baby Footwear': ['shoe', 'sandal', 'slipper', 'bootie', 'sock'],
      'Baby Care': ['baby_', 'skincare', 'haircare', 'towel'],
      'Mobile Accessories': ['charger', 'cable', 'power_bank', 'wireless_charger', 'mobile_case', 'screen_protector'],
      'Audio Devices': ['headphone', 'earbud', 'speaker', 'soundbar'],
      'Computer Accessories': ['keyboard', 'mice', 'monitor', 'webcam', 'printer', 'hubs', 'laptop_bag'],
      'Smart Gadgets': ['smartwatch', 'fitness', 'vr_', 'smart_home'],
      'Home Electronics': ['television', 'projector', 'tv_'],
      'Lighting': ['bulb', 'tube_light', 'ceiling_light', 'chandelier'],
      'Switches & Sockets': ['switch', 'socket'],
      'Wires & Cables': ['wire', 'cable'],
      'Extension Boards': ['extension_board'],
      'Electrical Tools': ['drill', 'screwdriver', 'tester'],
      'Kitchen Essentials': ['cookware', 'pressure', 'fry_pan', 'kitchen_tool', 'knife'],
      'Cookware': ['cookware', 'pressure', 'fry_pan'],
      'Storage & Organization': ['storage', 'container'],
      'Home Decor': ['decor', 'frame', 'plant', 'candle'],
      'Cleaning Supplies': ['cleaning', 'broom', 'mop', 'dustbin'],
      'Skin Care': ['face_', 'moisturizer', 'serum', 'sunscreen', 'mask'],
      'Hair Care': ['shampoo', 'conditioner', 'hair_'],
      'Makeup': ['foundation', 'powder', 'lipstick', 'kajal', 'mascara', 'nail'],
      'Fragrances': ['perfume', 'deodorant'],
      'Personal Hygiene': ['sanitary', 'wet_wipe', 'cotton_bud']
    };

    this.categoryKeywordsCache = keywords;

    return keywords[category] ?? [];
  }

  onBulkProductFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.bulkProductFile = input.files?.[0] ?? null;
  }

  async uploadBulkProducts(): Promise<void> {
    if (!this.bulkProductFile) {
      return;
    }

    if (!this.bulkProductFile.name.toLowerCase().endsWith('.csv')) {
      this.toastr.error('Please select a CSV file.');
      return;
    }

    this.isBulkUploading = true;

    try {
      const rows = this.parseBulkCsv(await this.bulkProductFile.text());
      const products = this.groupBulkProducts(rows);
      let uploadedCount = 0;
      const failedProducts: string[] = [];

      for (const product of products) {
        try {
          const response: any = await firstValueFrom(this.apiService.uploadData(this.createBulkProductFormData(product)));

          if (response?.success) {
            uploadedCount++;
          } else {
            failedProducts.push(product.product_name);
          }
        } catch {
          failedProducts.push(product.product_name);
        }
      }

      if (uploadedCount) {
        this.toastr.success(`${uploadedCount} product${uploadedCount === 1 ? '' : 's'} uploaded successfully.`);
      }
      if (failedProducts.length) {
        this.toastr.error(`${failedProducts.length} product${failedProducts.length === 1 ? '' : 's'} could not be uploaded.`);
      }
    } catch (error: any) {
      this.toastr.error(error?.message || 'The CSV file could not be read.');
    } finally {
      this.isBulkUploading = false;
    }
  }

  private parseBulkCsv(csv: string): Array<Record<string, string>> {
    const records: string[][] = [];
    let row: string[] = [];
    let value = '';
    let isQuoted = false;
    const content = csv.replace(/^\uFEFF/, '');

    for (let index = 0; index < content.length; index++) {
      const character = content[index];

      if (character === '"') {
        if (isQuoted && content[index + 1] === '"') {
          value += '"';
          index++;
        } else {
          isQuoted = !isQuoted;
        }
      } else if (character === ',' && !isQuoted) {
        row.push(value.trim());
        value = '';
      } else if ((character === '\n' || character === '\r') && !isQuoted) {
        if (character === '\r' && content[index + 1] === '\n') {
          index++;
        }
        row.push(value.trim());
        if (row.some(cell => cell)) {
          records.push(row);
        }
        row = [];
        value = '';
      } else {
        value += character;
      }
    }

    row.push(value.trim());
    if (row.some(cell => cell)) {
      records.push(row);
    }

    if (isQuoted || records.length < 2) {
      throw new Error('Please use the downloaded sample CSV and include at least one product row.');
    }

    const headers = records[0].map(header => header.toLowerCase().trim());
    const requiredHeaders = [
      'product_name', 'product_mrp_price', 'product_price', 'product_discount',
      'hsn_code', 'gst_rate', 'category', 'subcategory', 'color', 'color_code', 'stock'
    ];
    const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));

    if (missingHeaders.length) {
      throw new Error(`Missing CSV columns: ${missingHeaders.join(', ')}`);
    }

    return records.slice(1).map((record, rowIndex) => {
      const item = headers.reduce((result, header, columnIndex) => {
        result[header] = record[columnIndex] ?? '';
        return result;
      }, {} as Record<string, string>);
      const missingValues = requiredHeaders.filter(header => !item[header]);

      if (missingValues.length) {
        throw new Error(`Row ${rowIndex + 2} is missing: ${missingValues.join(', ')}`);
      }

      return item;
    });
  }

  private groupBulkProducts(rows: Array<Record<string, string>>): any[] {
    const groups = new Map<string, any>();
    const productFields = [
      'product_name', 'product_mrp_price', 'product_price', 'product_discount',
      'hsn_code', 'gst_rate', 'category', 'shelf_code', 'age_group', 'subcategory', 'product_description'
    ];

    rows.forEach(row => {
      const key = productFields.map(field => row[field] || '').join('|');
      let product = groups.get(key);

      if (!product) {
        product = { ...row, variants: [] };
        groups.set(key, product);
      }

      product.variants.push({
        color: row['color'],
        colorCode: row['color_code'],
        stock: row['stock']
      });
    });

    return Array.from(groups.values());
  }

  private createBulkProductFormData(product: any): FormData {
    const formData = new FormData();

    formData.append('p_name', product.product_name);
    formData.append('p_price', product.product_price);
    formData.append('p_mrp', product.product_mrp_price);
    formData.append('p_discount', product.product_discount);
    formData.append('main_category', product.main_category || '');
    const bulkCategoryValue = product.category || '';
    formData.append('p_category', typeof bulkCategoryValue === 'string' ? bulkCategoryValue.toLowerCase() : bulkCategoryValue);
    formData.append('p_subcategory', product.subcategory);
    formData.append('age_group', product.age_group || '');
    formData.append('p_description', product.product_description || '');
    formData.append('hsn_code', product.hsn_code);
    formData.append('gst_rate', product.gst_rate);
    formData.append('shelf_code', product.shelf_code || '');
    formData.append('variant', JSON.stringify(product.variants.map((variant: any, index: number) => ({
      p_color: variant.color,
      p_colorcode: variant.colorCode,
      p_stock: variant.stock,
      image_key: `variant_${index}`
    }))));

    return formData;
  }

  downloadSampleCsv(event: Event): void {
    event.preventDefault();

    const headers = [
      'product_name',
      'product_mrp_price',
      'product_price',
      'product_discount',
      'hsn_code',
      'gst_rate',
      'category',
      'shelf_code',
      'age_group',
      'subcategory',
      'color',
      'color_code',
      'stock',
      'product_description'
    ];

    const sampleRows = [
      [
        'Girls Floral Dress',
        '1999',
        '1499',
        '500',
        '62044300',
        '5',
        'girls',
        'A-03-D1',
        '8-10_years',
        'frocks',
        'Pink',
        '#FFB6C1',
        '20',
        'Soft floral dress for girls.'
      ]
    ];

    const escapeCsvValue = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const csv = [headers, ...sampleRows]
      .map(row => row.map(escapeCsvValue).join(','))
      .join('\r\n');
    const fileUrl = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');

    link.href = fileUrl;
    link.download = 'bulk-product-upload-sample.csv';
    link.click();
    URL.revokeObjectURL(fileUrl);
  }

  productForm: FormGroup;
  private readonly sizeOptionsByType: Record<string, string[]> = {
    'No Size': ['No Size'],
    Clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    'Kids Age': ['0-6 Months', '6-12 Months', '12-18 Months', '18-24 Months', '2-4 Years', '4-6 Years', '6-8 Years', '8-10 Years', '10-12 Years', '12-14 Years', '14-16 Years'],
    'Footwear - Men': ['6', '7', '8', '9', '10', '11', '12'],
    'Footwear - Women': ['4', '5', '6', '7', '8', '9', '10'],
    'Footwear - Kids': ['10', '11', '12', '13', '1', '2', '3', '4', '5'],
    'Belt Size': ['28', '30', '32', '34', '36', '38', '40', '42', '44'],
    Custom: ['Custom']
  };
  get sizeOptions(): string[] {
    return this.sizeOptionsByType[this.productForm?.get('size_type')?.value] ?? [];
  }
  selectSizeOption = [true, false]
  selectedSize: boolean = true;
  deleteVariant: boolean = false;
  selectedFiles: { [key: string]: File } = {};
  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder, private toastr: ToastrService,) {
    this.productForm = this.fb.group({
      p_name: [''],
      p_mrp: [''],
      p_description: [''],
      p_price: [0],
      p_discount: [0],
      main_category: [''],
      p_category: [''],
      p_shelfcode: [''],
      p_subcategory: [''],
      age_group: [''],
      size_type: ['No Size', Validators.required],
      hsn_code: [''],
      gst_rate: [''],
      variants: this.fb.array([this.createVariant()])
    });
  }
  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }
  gstRates = [0, 5, 12, 18, 28];

  ngOnInit() {
    this.productForm.patchValue({ p_size_boolean: true })
    this.onSizeTypeChange(this.productForm.get('size_type')?.value);
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


async onSelectFile(event: any, index: number): Promise<void> {
  const files: FileList = event.target.files;

  if (!files || files.length === 0) return;

  const compressedFiles: File[] = [];

  const options = {
    maxWidthOrHeight: 1600,
    initialQuality: 0.85,
    useWebWorker: true,
    fileType: 'image/webp'
  };

  for (const file of Array.from(files)) {
    try {
      const compressedBlob = await imageCompression(file, options);

      // Ensure filename has .webp extension
      const webpFile = new File(
        [compressedBlob],
        file.name.replace(/\.[^/.]+$/, '.webp'),
        {
          type: 'image/webp',
          lastModified: Date.now()
        }
      );

      console.log('Product image format:', {
        original: {
          name: file.name,
          type: file.type,
          size: file.size
        },
        compressed: {
          name: webpFile.name,
          type: webpFile.type,
          size: webpFile.size
        }
      });

      compressedFiles.push(webpFile);

    } catch (error) {
      console.error('Image compression failed:', error);
      compressedFiles.push(file);
    }
  }

  this.variants.at(index)
    .get('image_url')
    ?.setValue(compressedFiles);
}
  uploadFormData(): void {
    this.isLoading = true;
    const formData = new FormData();
    // Add product main info
    formData.append('p_name', this.productForm.get('p_name')?.value);
    formData.append('p_price', this.productForm.get('p_price')?.value);
    formData.append('p_mrp', this.productForm.get('p_mrp')?.value);
    formData.append('p_discount', this.productForm.get('p_discount')?.value);
    formData.append('main_category', this.productForm.get('main_category')?.value);
    const pCategoryValue = this.productForm.get('p_category')?.value || '';
    formData.append('p_category', typeof pCategoryValue === 'string' ? pCategoryValue.toLowerCase() : pCategoryValue);
    formData.append('p_subcategory', this.productForm.get('p_subcategory')?.value);
    formData.append('age_group', this.productForm.get('age_group')?.value);
    const sizeType = this.productForm.get('size_type')?.value;
    formData.append('size_type', sizeType);
    formData.append('p_description', this.productForm.get('p_description')?.value);
    formData.append('hsn_code', this.productForm.get('hsn_code')?.value);
    formData.append('gst_rate', this.productForm.get('gst_rate')?.value);
    formData.append('shelf_code', this.productForm.get('p_shelfcode')?.value);

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
      const variantPayload: any = {
        p_color: variant.p_color,
        p_colorcode: variant.p_colorcode,
        sizes: sizeType === 'No Size' ? [] : this.getSizePayload(variantGroup),
        image_key: imageKey
      };
      if (sizeType === 'No Size') {
        variantPayload.p_stock = Number(variant.p_stock) || 0;
      }
      variantsData.push(variantPayload);
    });
    // append variant metadata
    formData.append('variant', JSON.stringify(variantsData));
    formData.append('product_payload', JSON.stringify({
      product_name: this.productForm.get('p_name')?.value,
      size_type: sizeType,
      variants: variantsData
    }));
    this.apiService.uploadData(formData).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.isLoading = false;
          this.toastr.success('Product Uploaded Successfully');
          this.productForm.reset();
          this.selectedMainCategory = null;
          this.selectedCategory = null;
          this.selectedSubCategory = null;
          this.subCategorySearchText = '';
          this.variants.clear();
          const variant = this.createVariant();
          this.variants.push(variant);
          this.configureVariantSizeControls(variant, this.productForm.get('size_type')?.value || 'No Size');
        } else {
          this.toastr.error(res?.message || 'Product Upload failed');
        }
      },
      error: (err) => {
        console.error('Upload failed:', err);
        this.toastr.error('Server error while uploading');
      }
    });

  }

  createVariant(): FormGroup {
    return this.fb.group({
      p_color: [null, Validators.required],
      p_colorcode: ['#000000', Validators.required],
      p_stock: [null],
      sizes: [[], Validators.required],
      custom_size: [''],
      size_stock: this.fb.control({}),
      image_url: this.fb.control([]),
    });
  }
  addVariant() {
    if (this.variants.controls.length >= 1) {
      //this.deleteVariant = true;
    }
    const variant = this.createVariant();
    this.variants.push(variant);
    this.configureVariantSizeControls(variant, this.productForm.get('size_type')?.value);
  }

  removeVariant(index: number) {
    if (this.variants.controls.length > 1) {
      this.variants.removeAt(index);
    }
  }
  getSelectedSizes(variant: AbstractControl): string[] {
    if (this.productForm.get('size_type')?.value === 'Custom') {
      const customSize = variant.get('custom_size')?.value || '';
      return customSize.split(',')
        .map((size: string) => size.trim())
        .filter((size: string, index: number, sizes: string[]) => size && sizes.indexOf(size) === index);
    }
    const selectedSizes = variant.get('sizes')?.value;
    return Array.isArray(selectedSizes)
      ? selectedSizes.filter((size: string) => this.sizeOptions.includes(size))
      : [];
  }
  private getSizePayload(variant: AbstractControl): Array<{ size: string; stock: number }> {
    const stocks = variant.get('size_stock')?.value || {};
    return this.getSelectedSizes(variant).map(size => ({
      size,
      stock: Number(stocks[size]) || 0
    }));
  }
  onSizeTypeChange(sizeType: string): void {
    this.variants.controls.forEach(variant => {
      const sizesControl = variant.get('sizes');
      const customSizeControl = variant.get('custom_size');
      sizesControl?.setValue([]);
      customSizeControl?.reset('');
      this.configureVariantSizeControls(variant, sizeType);
    });
  }
  onCustomSizeInput(variant: AbstractControl): void {
    this.updateSizeStockValues(variant);
  }
  private configureVariantSizeControls(variant: AbstractControl, sizeType: string): void {
    const sizesControl = variant.get('sizes');
    const customSizeControl = variant.get('custom_size');

    if (sizeType === 'Custom') {
      variant.get('p_stock')?.clearValidators();
      variant.get('p_stock')?.disable({ emitEvent: false });
      sizesControl?.clearValidators();
      sizesControl?.disable({ emitEvent: false });
      customSizeControl?.setValidators(Validators.required);
      customSizeControl?.enable({ emitEvent: false });
    } else if (sizeType === 'No Size') {
      variant.get('p_stock')?.setValidators(Validators.required);
      variant.get('p_stock')?.enable({ emitEvent: false });
      sizesControl?.clearValidators();
      sizesControl?.disable({ emitEvent: false });
      customSizeControl?.clearValidators();
      customSizeControl?.disable({ emitEvent: false });
    } else {
      variant.get('p_stock')?.clearValidators();
      variant.get('p_stock')?.disable({ emitEvent: false });
      sizesControl?.setValidators(Validators.required);
      sizesControl?.enable({ emitEvent: false });
      customSizeControl?.clearValidators();
      customSizeControl?.disable({ emitEvent: false });
    }
    sizesControl?.updateValueAndValidity({ emitEvent: false });
    customSizeControl?.updateValueAndValidity({ emitEvent: false });
    variant.get('p_stock')?.updateValueAndValidity({ emitEvent: false });
  }
  areAllSizesSelected(variant: AbstractControl): boolean {
    return this.getSelectedSizes(variant).length === this.sizeOptions.length && this.sizeOptions.length > 0;
  }
  isSizeSelected(variant: AbstractControl, size: string): boolean {
    return this.getSelectedSizes(variant).includes(size);
  }
  updateColorCode(event: Event, variant: AbstractControl): void {
    const colorInput = event.target as HTMLInputElement;
    variant.get('p_colorcode')?.setValue(colorInput.value.toUpperCase());
  }
  toggleAllSizes(checked: boolean, variant: AbstractControl): void {
    variant.get('sizes')?.setValue(checked ? [...this.sizeOptions] : []);
    this.updateSizeStockValues(variant);
  }
  toggleSize(checked: boolean, variant: AbstractControl, size: string): void {
    const selectedSizes = this.getSelectedSizes(variant).filter(selectedSize => selectedSize !== size);
    if (checked) {
      selectedSizes.push(size);
    }
    variant.get('sizes')?.setValue(selectedSizes);
    this.updateSizeStockValues(variant);
  }
  getSizeStock(variant: AbstractControl, size: string): number | string {
    return variant.get('size_stock')?.value?.[size] ?? '';
  }
  updateSizeStock(event: Event, variant: AbstractControl, size: string): void {
    const input = event.target as HTMLInputElement;
    const stocks = { ...(variant.get('size_stock')?.value || {}) };
    stocks[size] = input.value;
    variant.get('size_stock')?.setValue(stocks);
  }
  private updateSizeStockValues(variant: AbstractControl): void {
    const selectedSizes = this.getSelectedSizes(variant);
    const currentStocks = variant.get('size_stock')?.value || {};
    const stocks = selectedSizes.reduce((result, size) => {
      result[size] = currentStocks[size] ?? '';
      return result;
    }, {} as Record<string, number | string>);
    variant.get('size_stock')?.setValue(stocks);
  }
  getTotalStock(variant: AbstractControl): number {
    if (this.productForm.get('size_type')?.value === 'No Size') {
      return Number(variant.get('p_stock')?.value) || 0;
    }
    const stocks = variant.get('size_stock')?.value || {};
    return this.getSelectedSizes(variant).reduce((total, size) => total + (Number(stocks[size]) || 0), 0);
  }
  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // only allow 0-9
    }
  }
  afterSelectSize(event: any) {
    this.selectedSize = event;
  }
}

export enum Permission {
  // Sub Category Permission
  SubcatAttrCreate = 'catalog.subcat-attr.create',
  SubcatAttrUpdate = 'catalog.subcat-attr.update',
  SubcatAttrDelete = 'catalog.subcat-attr.delete',
  // Brand Permission
  BrandCreate = 'catalog.brand.create',
  BrandUpdate = 'catalog.brand.update',
  BrandDelete = 'catalog.brand.delete',
  // Product Permission
  ProductRead = 'catalog.product.read',
  ProductCreate = 'catalog.product.create',
  ProductUpdate = 'catalog.product.update',
  ProductDelete = 'catalog.product.delete',
  // Product Attribute Permission
  ProductAttrCreate = 'catalog.product-attr.create',
  ProductAttrRead = 'catalog.product-attr.read',
  ProductAttrUpdate = 'catalog.product-attr.update',
  ProductAttrDelete = 'catalog.product-attr.delete',
  // Product Attribute Value Permission
  ProductAttrValueCreate = 'catalog.product-attr-value.create',
  ProductAttrValueRead = 'catalog.product-attr-value.read',
  ProductAttrValueUpdate = 'catalog.product-attr-value.update',
  ProductAttrValueDelete = 'catalog.product-attr-value.delete',
}

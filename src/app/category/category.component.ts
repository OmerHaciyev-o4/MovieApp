import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryRepository } from '../models/category.repository';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category | null = null;
  constructor(private categoryService:CategoryService) {
  
  }

  displayAll = true;
  selectCategory(item?: Category) {
    if (item) {
      this.selectedCategory = item;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }

  deleteCategory(id: string){
    console.log(id);
    this.categoryService.removeCategory(id).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    })
  }
}

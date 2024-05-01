import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Recipe {
  id: number;
  name: string;
  instructions: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  recipes: Recipe[] = [];

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    const storedRecipes = localStorage.getItem('recipes');
    this.recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
  }

  addRecipe(): void {
    const nameInput = document.getElementById(
      'recipe-name'
    ) as HTMLInputElement;
    const instructionsInput = document.getElementById(
      'recipe-instructions'
    ) as HTMLInputElement;

    if (
      nameInput.value.trim() !== '' &&
      instructionsInput.value.trim() !== ''
    ) {
      const newRecipe: Recipe = {
        id: Date.now(),
        name: nameInput.value.trim(),
        instructions: instructionsInput.value.trim(),
      };

      this.recipes.push(newRecipe);
      localStorage.setItem('recipes', JSON.stringify(this.recipes));

      nameInput.value = '';
      instructionsInput.value = '';
    }
  }

  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }

  editRecipe(id: number): void {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) return; // Check if recipe exists

    const nameInput = document.getElementById(
      'recipe-name'
    ) as HTMLInputElement;
    const instructionsInput = document.getElementById(
      'recipe-instructions'
    ) as HTMLInputElement;

    // Update the recipe in the array
    this.recipes[index] = {
      ...this.recipes[index],
      name: nameInput.value.trim(),
      instructions: instructionsInput.value.trim(),
    };
    console.log('Updated Recipe:', this.recipes[index]);
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }
}

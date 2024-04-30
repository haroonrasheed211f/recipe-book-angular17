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
    if (storedRecipes) {
      this.recipes = JSON.parse(storedRecipes);
    }
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
      const recipe: Recipe = {
        id: Date.now(),
        name: nameInput.value.trim(),
        instructions: instructionsInput.value.trim(),
      };

      this.recipes.push(recipe);
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
    let recipe = this.recipes.find((recipe) => recipe.id === id);
    if (!recipe) return;

    const nameInput = document.getElementById(
      'recipe-name'
    ) as HTMLInputElement;
    const instructionsInput = document.getElementById(
      'recipe-instructions'
    ) as HTMLInputElement;

    nameInput.value = recipe.name;
    instructionsInput.value = recipe.instructions;

    // To finalize the edit, the user would typically need to confirm the changes
    // This can be handled by a separate method or by reusing addRecipe with some modifications
    this.deleteRecipe(id); // Temporarily remove the recipe to avoid duplication
  }
}

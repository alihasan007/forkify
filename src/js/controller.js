import * as model from './model.js';
import RecipeView from './Views/RecipeView.js';
import SearchView from './Views/SearchView.js';
import ResultView from './Views/ResultView.js';
import PaginationView from './Views/PaginationView.js';
import BookmarksView from './Views/BookmarksView.js';
import AddRecipeView from './Views/AddRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import addRecipeView from './Views/AddRecipeView.js';

// if (module.hot) {
//  module.hot.accept();
//}

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    RecipeView.renderSpinner();
    //resultview to mark selected result
    ResultView.update(model.getSearchResultsPage());
    // 1)Updating bookmark
    BookmarksView.update(model.state.bookmarks);
    // 2) loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError(`${err}`);
  }
};

const controlSearchResults = async () => {
  try {
    ResultView.renderSpinner();

    //  get search query
    const query = SearchView.getQuery();
    if (!query) return;

    // load search result
    await model.loadSearchResults(query);

    //Render search result
    ResultView.render(model.getSearchResultsPage());

    //render initial pagination button
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // render new result
  ResultView.render(model.getSearchResultsPage(goToPage));

  // render new pagination result
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);
  // updating the recipe view
  // RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  // Add bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // remove bookmark
  else model.deleteBookmark(model.state.recipe.id);
  // update recipe view
  RecipeView.update(model.state.recipe);
  // render bookmarks
  BookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    // show spinner
    AddRecipeView.renderSpinner();
    // upload the new recipe
    await model.uploadRecipe(newRecipe);

    // render recipe
    RecipeView.render(model.state.recipe);
    // success message
    AddRecipeView.renderMessage();
    // render bookmark view
    BookmarksView.render(model.state.bookmarks);
    // change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // close form window
    setTimeout(function () {
      AddRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

function init() {
  BookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandleSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
}
init();
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

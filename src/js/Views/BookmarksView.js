import View from './View';
import PreviewView from './PreviewView';
import icons from 'url:../../img/icons.svg';
class BookmarksView extends View {
  _parentEL = document.querySelector('.bookmarks__list');
  _errorMessage = 'No booksmarks yet';
  _successMessage = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();

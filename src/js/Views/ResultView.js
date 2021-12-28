import View from './View';
import PreviewView from './PreviewView';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _parentEL = document.querySelector('.results');
  _errorMessage = 'we could not find the recipe, Please try another one!';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(result => PreviewView.render(result, false)).join('');
  }
}
export default new ResultView();

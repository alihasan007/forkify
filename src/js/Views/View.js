import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  /**
   * render the recived object to the DOM
   * @param {Object|Object[]}data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false,create markup string instead of rendering it to DOM
   * @returns {undefined|string} a markup is returened if render =false
   * @author Syed Ali Hasan
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentEL.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `  
     <div class="spinner">
       <svg>
       <use href="${icons}#icon-loader"></use>
       </svg>
     </div>
  `;
    this._parentEL.innerHTML = '';
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._successMessage) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEL.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // update changes text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // update changes attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
}

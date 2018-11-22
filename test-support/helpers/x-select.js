import Interactor,{ property, collection, hasClass, attribute, is } from '@bigtest/interactor';

const xSelectInteractor = Interactor.from({
  hasFocus: is(':focus'),
  name: attribute('name'),
  form: attribute('form'),
  title: attribute('title'),
  size: attribute('size'),
  tabindex: attribute('tabindex'),
  isDisabled: property('disabled'),
  isRequired: property('required'),
  isAutofocus: property('autofocus'),

  options: collection('option', {
    name: attribute('name'),
    value: property('value'),
    title: attribute('title'),
    isSelected: property('selected'),
    isDisabled: property('disabled'),
    hasSelectedClass: hasClass('is-selected')
  })
});

export default xSelectInteractor;

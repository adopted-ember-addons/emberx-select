/*global expect */
/*global it */

export function shouldBindAttrs() {
  it('renders the name attribute', function() {
    expect(this.$().attr('name')).to.equal('person-select');
  });
  it('renders the form attribute', function() {
    expect(this.$().attr('form')).to.equal('person-form');
  });
  it('renders the title attribute', function() {
    expect(this.$().attr('title')).to.equal('person title');
  });
  it('renders the size attribute', function() {
    expect(this.$().attr('size')).to.equal('3');
  });
  it('renders the required attribute', function() {
    expect(this.$().attr('required')).to.equal('required');
  });
  it('renders the autofocus attribute', function() {
    expect(this.$().attr('autofocus')).to.equal('autofocus');
  });
}

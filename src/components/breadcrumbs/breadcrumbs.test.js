import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SimpleBreadcrumbs from './breadcrumbs';

Enzyme.configure({ adapter: new Adapter() })

describe('<SimpleBreadcrumbs />', () => {
  it('renders a recipe title if there is the title', () => {
    const wrapper = mount(<SimpleBreadcrumbs title="Курица с грибами" type="pies" />);

    expect(wrapper.text()).toContain('Курица с грибами');
  });

  it('renders a default title if there is no any title', () => {
    const wrapper = mount(<SimpleBreadcrumbs title="" type="pies" />);

    expect(wrapper.text()).toContain('пиши новый рецепт');
  });
});

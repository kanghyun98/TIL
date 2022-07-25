import { render } from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
  test('snapshot', () => {
    const component = render(<Navbar />);

    expect(component.container).toMatchSnapshot();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddForm from '../../components/AddForm';

describe('AddForm', () => {
  test('snapshot', () => {
    const component = render(<AddForm onAdd={jest.fn()} />);

    expect(component.container).toMatchSnapshot();
  });

  describe('Form submit', () => {
    let onAdd;
    let inputComp;
    let buttonComp;

    beforeEach(() => {
      onAdd = jest.fn();

      render(<AddForm onAdd={onAdd} />); // 컴포넌트 렌더링
      inputComp = screen.getByPlaceholderText('Todo'); // input 태그
      buttonComp = screen.getByText('Add'); // button 테그
    });

    test('calls onAdd when button is clicked and valid Todo Entered', () => {
      const newTodo = 'new todo';
      userEvent.type(inputComp, newTodo); // fireEvent도 가능
      userEvent.click(buttonComp);

      expect(onAdd).toHaveBeenCalledWith(newTodo);
      expect(onAdd).toHaveBeenCalledTimes(1);
    });

    test('does not call onAdd when the Todo is empty', () => {
      userEvent.type(inputComp, ''); // fireEvent도 가능
      userEvent.click(buttonComp);

      expect(onAdd).toHaveBeenCalledTimes(0);
    });
  });
});

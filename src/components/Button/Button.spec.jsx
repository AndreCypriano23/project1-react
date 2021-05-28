import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

//Dentro desse agrupamento vou receber uma função, um array function
describe('<Button />', () => {
    it('should render the button with the text "Load more"', () => {
      const fn = jest.fn();
      render(<Button text="Load more" disabled={false} onClick={fn} />);

      expect.assertions(1);

      //verificar se o elemento esta na tela, getByRole é checar por acessibilidade 
      const button = screen.getByRole('button', { name: /load more/i });
      //Afirmacao final
      expect(button).toBeInTheDocument();  
      //esse aqui é mais para testes assíncronos-> expect(button).toHaveAttribute('class', 'button');
    });

    it('should call function on button click', () => {
      //criando um mook no jest
      const fn = jest.fn();
      render(<Button text="Load more" disabled={false} onClick={fn} />);
       
      const button = screen.getByRole('button', { name: /load more/i });
      //biblioteca fireEvent
      userEvent.click(button);
      
      expect(fn).toHaveBeenCalledTimes(1);
    });

     //Agora vamos testar o disabled do componente button
     it('should be disabled when disabled is true', () => {
      const fn = jest.fn();
      render(<Button text="Load more" disabled={true} onClick={fn} />);
       
      const button = screen.getByRole('button', { name: /load more/i });
           
      expect(button).toBeDisabled(); 
    });

    //Agora vamos testar o disabled do componente button
    it('should be disabled when disabled is false', () => {
      const fn = jest.fn();
      render(<Button text="Load more" disabled={false} onClick={fn} />);
       
      const button = screen.getByRole('button', { name: /load more/i });
           
      expect(button).toBeEnabled(); 
    });


    it('should match snapshot', () => {
      const fn = jest.fn();
      const { container } = render(<Button text="Load more" disabled={false} onClick={fn} />);
      expect(container.firstChild).toMatchSnapshot();   
    });
});



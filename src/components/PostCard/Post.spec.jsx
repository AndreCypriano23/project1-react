const { render, screen } = require("@testing-library/react");
import { PostCard } from '.';
import { postCardPropsMock } from './mock';

const props = postCardPropsMock;

describe('<PostCard />', () => {
    it('should render PostCard correctly', () => {
      render(<PostCard  {...props} />);
 
      expect(screen.getByRole('img', { name: props.title })).toHaveAttribute('src', 'img/img.png');//passou pq existe essa imagem
      //expect(screen.getByRole('heading', { name: 'title 1 1' })).toBeInTheDocument();
      expect(screen.getByText('body 1')).toBeInTheDocument();
    });

    it('should math snapshot', () => {
      //vamos pegar um snapshot do nosso teste ele vai renderizar e salvar o print em algum lugar do projeto
      const {container} = render(<PostCard  {...props} />);
      expect(container.firstChild).toMatchSnapshot();
    });
 });
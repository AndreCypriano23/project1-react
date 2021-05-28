import React, { useEffect, useState, useCallback } from 'react';
//useEffetc, useState,useCallback são hooks, existem vários no react

import './styles.css';

import { loadPosts } from '../../components/utils/load-posts';
import { Posts } from '../../components/posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

//Hook utilizado no componente funcional o Hook no react é useState
export const Home = () => {
  //state = {
  //  posts: [],
  //  allPosts: [],
  //  page: 0,
  //  postsPerPage: 10,
  //  searchValue: ''
  //};

  //Definições
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;//Se a página que eu quero ir for maior do que a quantidade de posts que existem, NÃO EXISTEM MAIS POSTS

  const filteredPosts = searchValue ?
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase());
  })
  : posts;

//funções antes era um método, agora não mais
  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
  
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])


  useEffect(() => {
    console.log(new Date().toLocaleString('pt-br'));
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);//Array de dependencias

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    
    setSearchValue(value);
  }



  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <h1>Search Value: {searchValue}</h1>
        )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}


      {filteredPosts.length === 0 && (
        <p>Não existem posts =(</p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load More Posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
} 


/* export class Home2 extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  };

  //Método do ciclo de vida
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });

  }

  // DICA AVULSA, USAMOS MÉTODOS ASSÍNCRONAS APENAS QUANDO QUEREMOS PEGAR DADOS DE UMA API  
  //DICA AVULSA, LEMBRE-SE DE QUE PARA ACESSAR ATRIBUTOS DENTRO DO MÉTODO USA-SE O THIS

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;//Atribuição via desestruturação
    const noMorePosts = page + postsPerPage >= allPosts.length;//Se a página que eu quero ir for maior do que a quantidade de posts que existem, NÃO EXISTEM MAIS POSTS
    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}


        {filteredPosts.length === 0 && (
          <p>Não existem posts =(</p>
        )}

        <div className="button-container">

          {!searchValue && (
            <Button
              text="Load More Posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}

        </div>

      </section>
    );
  }
} */

//export default Home;


// CICLO DE VIDA DOS COMPONENTES:
// O CLICO FOI MONTADO?(É UM CICLO DE VIDA DO COMPONENTE)
// O COMPONENTE ATUALIZOU? (É UM CICLO DE VIDA DO COMPONENTE) 
// COMPONENTE VAI SER DESMONTADO? (É UM CICLO DE VIDA DO COMPONENTE)

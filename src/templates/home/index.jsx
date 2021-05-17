import React from 'react';
import { Component } from 'react';

import './styles.css';

import { loadPosts } from '../../components/utils/load-posts';
import { Posts } from '../../components/posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
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
}

//export default Home;


// CICLO DE VIDA DOS COMPONENTES:
// O CLICO FOI MONTADO?(É UM CICLO DE VIDA DO COMPONENTE)
// O COMPONENTE ATUALIZOU? (É UM CICLO DE VIDA DO COMPONENTE) 
// COMPONENTE VAI SER DESMONTADO? (É UM CICLO DE VIDA DO COMPONENTE)

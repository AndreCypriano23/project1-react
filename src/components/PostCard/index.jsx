import React from 'react';
import P from 'prop-types';
import './styles.css';
//Componente react é uma classe que tem um render e retorna um jsx ou 
//Uma função que retorna um JSX, pode ser componente de função ou classe, tanto faz

//props são propriedades que estão em outro componente que aí eu passo pra esse
//Só assim vou conseguir acessar o post
export const PostCard = ({ title, cover, body, id }) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div className="post-content">
      <h2>{title} {id}</h2>
      <p>{body}</p>
    </div>
  </div>
);

PostCard.propTypes = {
  title: P.string.isRequired,
  cover: P.string.isRequired,
  body: P.string.isRequired,
  id: P.number.isRequired,
}; 

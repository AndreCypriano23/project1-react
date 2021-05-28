export const loadPosts = async () => {
     //Busca de uma api externa  São 2 requisições uma pra posts e outra para fotos 
     const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
     const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
  
     const [posts, photos] = await Promise.all([postsResponse, photosResponse]);
     const postsJson = await posts.json();
     const photosJson = await photos.json();
     //tem 5000 fotos e 100 posts, eu quero uma foto por post, e 100 dos dois no máx
     const postsAndPhotos = postsJson.map((post, index) =>{
         //pegar o post e o índice
         return { ...post, cover: photosJson[index].url }//cover vem de imagem
     }); 
     //O map retorna um novo array para a variável
     return postsAndPhotos;
};



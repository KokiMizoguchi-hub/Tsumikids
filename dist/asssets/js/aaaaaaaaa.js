const books = ["JavaScript入門", "HTMLとCSS", "Reactの基礎"];

const result = books.map((book, index) => {
  return {
    id: index + 1,
    title: book
  };
})
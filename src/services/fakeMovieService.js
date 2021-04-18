const movies = [
  {
    _id: "605c6b64fc13ae3cf7000012",

    title: "Three Lives and Only One Death (Trois vies & une seule mort)",
    genre: "Comedy",
    numberInStock: 37,
    dailyRentalRate: 3.4,
    publishDate: "1/25/2021",
  },
  {
    _id: "605c6b64fc13ae3cf7000013",

    title:
      "Maxed Out: Hard Times, Easy Credit and the Era of Predatory Lenders",
    genre: "Documentary",
    numberInStock: 74,
    dailyRentalRate: 2.3,
    publishDate: "5/31/2020",
  },
  {
    _id: "605c6b64fc13ae3cf7000014",

    title: "As If I Didn't Exist (Elina - Som om jag inte fanns)",
    genre: "Children|Drama",
    numberInStock: 58,
    dailyRentalRate: 4.5,
    publishDate: "3/11/2021",
  },
  {
    _id: "605c6b64fc13ae3cf7000015",

    title: "Just Ask My Children",
    genre: "Drama",
    numberInStock: 51,
    dailyRentalRate: 4.5,
    publishDate: "12/3/2020",
  },
  {
    _id: "605c6b64fc13ae3cf7000016",

    title: "Swimmer, The",
    genre: "Drama",
    numberInStock: 6,
    dailyRentalRate: 1.4,
    publishDate: "11/16/2020",
  },
  {
    _id: "605c6b64fc13ae3cf7000017",

    title: "Liebestraum",
    genre: "Mystery|Thriller",
    numberInStock: 51,
    dailyRentalRate: 2.9,
    publishDate: "4/19/2020",
  },
  {
    _id: "605c6b64fc13ae3cf7000018",

    title: "Happiness",
    genre: "Comedy|Drama",
    numberInStock: 89,
    dailyRentalRate: 3.2,
    publishDate: "7/4/2020",
  },
  {
    _id: "605c6b64fc13ae3cf7000019",

    title: "Luzhin Defence, The",
    genre: "Drama|Romance",
    numberInStock: 79,
    dailyRentalRate: 3.6,
    publishDate: "4/4/2020",
  },
  {
    _id: "605c6b64fc13ae3cf700001a",

    title: "Return of Jafar, The",
    genre: "Adventure|Animation|Children|Fantasy|Musical|Romance",
    numberInStock: 31,
    dailyRentalRate: 4.7,
    publishDate: "5/14/2020",
  },
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find((m) => m._id === id);
}

export function addMovie(movie) {
  movies.push(movie);
}

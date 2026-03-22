import BookCategory from '../components/BookCategory'

const lendo: any[] = [];
const lerei = [
    { id: 1, title: "Beyond The Ocean Door", author: "Amisha Sathi", image: "imgA.png", rating: null, showRating: false },
    { id: 2, title: "Educated: A Memoir", author: "Tara Westover", image: "imgB.png", rating: null, showRating: false }];
const lido = [
    { id: 3, title: "Really Good, Actualy", author: "Monica Heisey", image: "imgC.png", rating: 4, showRating: true}];

function HomePage() {
    return (
        <div>
            <BookCategory
                category="Lendo:"
                backgroundColor="#E6F7FF" // Azul
                books={lendo}
                emptyMessage="Adicione aqui o livro que você está lendo"
            />

            <BookCategory
                category="Lerei:"
                backgroundColor="#FFFBE6" // Amarelo
                books={lerei}
                emptyMessage="Adicione aqui o livro que você quer ler"
            />

            <BookCategory
                category="Lido:"
                backgroundColor="#F9F0FF" // Roxo/Vermelho claro
                books={lido}
                emptyMessage="Adicione aqui o livro que você já leu"
            />
        </div>
    );
}

export default HomePage
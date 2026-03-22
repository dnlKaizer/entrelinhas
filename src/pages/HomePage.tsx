import { Typography } from 'antd'
import BookCategory from '../components/BookCategory'

const { Title } = Typography

const lendo: any[] = [];
const queroLer = [
    { title: "Beyond the Ocean Door", author: "Amisha Sathi", image: "imgA.png" },
    { title: "Educated: A Memoir", author: "Tara Westover", image: "imgB.png" }];

function HomePage() {
    return (
        <div>
            <BookCategory
                category="Estou lendo:"
                backgroundColor="#E6F7FF" // Azul
                books={lendo}
                emptyMessage="Adicione aqui o livro que você está lendo"
            />

            <BookCategory
                category="Quero ler:"
                backgroundColor="#FFFBE6" // Amarelo
                books={queroLer}
                emptyMessage="Adicione aqui o livro que você quer ler"
            />

            <BookCategory
                category="Já li:"
                backgroundColor="#F9F0FF" // Roxo/Vermelho claro
                books={[]}
                emptyMessage="Adicione aqui o livro que você já leu"
            />
        </div>
    );
}

export default HomePage
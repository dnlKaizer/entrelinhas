export interface IReadSession {
    idLeitura: number

    start?: number
    end?: number
    pagInicial?: number
    pagFinal?: number

    idLivro: number
}
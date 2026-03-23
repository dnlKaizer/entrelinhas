export interface IBook {
    idLivro: number
    nome: string
    numPag: number
    status: TStatus

    autor?: string
    ano?: number
    text?: string
    dtInicial?: string
    dtFinal?: string
    numPagRead: number
    idUsuario: number
    img?: string
}

export type TStatus = 'Lendo' | 'Lido' | 'Desejado';
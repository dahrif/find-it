export interface Annonce {
    title: string,
    category: {
        categoryId: string,
        category: string
    },
    annonceImgPath: string,
    content: string,
    date: Date,
    lieu: string,
    numTel: number,
    isActive: boolean,
    status: string,
    createdAt: Date,

}
export interface trackDTO {
    id?: number;
    called: string;
    unCalled: string;
    desc: string;
    fromDate: date;
    toDate?: date;
    notebookId: number;
}

export interface trackCreationDTO {
    date: date;
    desc: string;
    called: string;
    unCalled: string;
}

export interface trackEditDTO {
    id?: number;
    called: string;
    unCalled: string;
    fromDate: date;
    toDate: date;
    desc: string;
    notebookId: number;
}

export interface trackGridItemDTO {
    id?: number;
    called: string;
    unCalled: string;
    notebookNumber: number;
    desc: string;
    date: date;
    notebookId: number;
}
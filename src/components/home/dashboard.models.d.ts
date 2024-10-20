import { notebookDTO, popularNotebookDTO } from "../notebooks/notebook.models";
import { trackDTO } from "../tracks/track.models";

export interface dashboardDTO {
    dashboardSummary: dashboardSummaryDTO;
    monthlyData: monthlyDataDTO[];
}
export interface dashboardSummaryDTO {
    called: number;
    unCalled: number;
    unCalledPercentage: number;
    lowestUnCalledTrack: trackDTO;
    highestUnCalledTrack: trackDTO;
    popularNotebook: popularNotebookDTO;
    calledsPerMonths: monthlyDataDTO[];
    unCalledsPerMonths: monthlyDataDTO[];
}

export interface monthlyDataDTO {
    date: date;
    called: number;
    unCalled: number;
    percentage: number;
}

import type { CommentWithUserData, ReportWithUserData } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type ReportsState = {
  reports: ReportWithUserData[];
  selectedReportId: string | null;
  comments: CommentWithUserData[];
};

const initialState: ReportsState = {
  reports: [],
  selectedReportId: null,
  comments: [],
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    addReport: (state, action) => {
      state.reports = [action.payload.report, ...state.reports];
    },
    removeReport: (state, action) => {
      state.reports = state.reports.filter(
        (report) => report.id !== action.payload.removeId,
      );
    },
    updateReport: (state, action) => {
      const updateableItemIndex = state.reports.findIndex(
        (report) => report.id === action.payload.updateId,
      );
      const updateableItem = state.reports[updateableItemIndex];
      const updatedItem = { ...updateableItem, ...action.payload.data };
      state.reports[updateableItemIndex] = updatedItem;
    },
    setReports: (state, action) => {
      state.reports = action.payload.reports;
    },
    setSelectedReportId: (state, action) => {
      state.selectedReportId = action.payload.id;
    },
    clearSelectedReportId: (state) => {
      state.selectedReportId = null;
    },
    addComment: (state, action) => {
      const comment: CommentWithUserData = action.payload.comment;
      state.comments = [comment, ...state.comments];
      state.reports = state.reports.map((report) => {
        if (report.id === comment.reportId) {
          return {
            ...report,
            commentCount: report.commentCount + 1,
          };
        }
        return report;
      });
    },
    setComments: (state, action) => {
      state.comments = action.payload.comments;
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
});

export const addReport = reportsSlice.actions.addReport;
export const removeReport = reportsSlice.actions.removeReport;
export const updateReport = reportsSlice.actions.updateReport;
export const setReports = reportsSlice.actions.setReports;
export const setSelectedReportId = reportsSlice.actions.setSelectedReportId;
export const clearSelectedReportId = reportsSlice.actions.clearSelectedReportId;
export const addComment = reportsSlice.actions.addComment;
export const setComments = reportsSlice.actions.setComments;
export const clearComments = reportsSlice.actions.clearComments;
export default reportsSlice.reducer;

import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const receiptsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1 
})

const initialState = receiptsAdapter.getInitialState()

export const receiptsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReceipts: builder.query({
            query: () => '/receipts',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedReceipts = responseData.map(receipt => {
                    receipt.id = receipt._id
                    return receipt
                });
                return receiptsAdapter.setAll(initialState, loadedReceipts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Receipt', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Receipt', id }))
                    ]
                } else return [{ type: 'Receipt', id: 'LIST' }]
            }
        }),
        addNewReceipt: builder.mutation({
            query: initialReceipt => ({
                url: '/receipts',
                method: 'POST',
                body: {
                    ...initialReceipts,
                }
            }),
            invalidatesTags: [
                { type: 'Receipts', id: "LIST" }
            ]
        }),
        updateReceipts: builder.mutation({
            query: initialReceipts => ({
                url: '/receipts',
                method: 'PATCH',
                body: {
                    ...initialReceipt,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Receipt', id: arg.id }
            ]
        }),
        deleteReceipt: builder.mutation({
            query: ({ id }) => ({
                url: `/receipts`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetReceiptsQuery,
    useAddNewReceiptMutation,
    useUpdateReceiptsMutation,
    useDeleteReceiptMutation,
} = receiptsApiSlice

// returns the query result object
export const selectReceiptsResult = receiptsApiSlice.endpoints.getReceipts.select()

// creates memoized selector
const selectReceiptsData = createSelector(
    selectReceiptsResult,
    receiptsResult => receiptsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllReceipts,
    selectById: selectReceiptById,
    selectIds: selectReceiptIds
    // Pass in a selector that returns the receipts slice of state
} = receiptsAdapter.getSelectors(state => selectReceiptsData(state) ?? initialState)
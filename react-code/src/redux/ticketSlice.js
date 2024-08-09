import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to save ticket data
export const saveTicketData = createAsyncThunk(
  'ticketform/saveTicketData',
  async (currentTicket) => {
    try {
      const response = await axios.post('http://localhost/API/ticketapp/create-ticket.php', currentTicket, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      // Assuming response.data.lastInsertId is the ID from the server
      return { ...currentTicket, id: response.data.lastInsertId };
    } catch (error) {
      console.error("Error saving ticket data:", error);
      throw error;
    }
  }
);

// Async thunk to fetch ticket list
export const fetchTickets = createAsyncThunk(
  'ticketform/fetchTickets',
  async () => {
    try {
      const response = await axios.post('http://localhost/API/ticketapp/fetch-ticket-list.php', {}, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      return response.data.tickets; // Assuming response.data.tickets contains the list of tickets
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  }
);

export const updateTicketStatusOnData = createAsyncThunk(
  'ticketform/updateTicketStatusOnData',
  async (ticket_params) => {
    try {
      let ticket_number = ticket_params.ticketNumber;
      let ticket_status = ticket_params.status;
      const response = await axios.post('http://localhost/API/ticketapp/update-ticket.php', ({ ticket_number, ticket_status }), {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      // Assuming response.data.lastInsertId is the ID from the server
      // return { ...currentTicket, id: response.data.lastInsertId };
    } catch (error) {
      console.error("Error saving ticket data:", error);
      throw error;
    }
  }
)

const ticketFormSlice = createSlice({
  name: 'ticketform',
  initialState: {
    tickets: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addTicket: (state, action) => {
      state.tickets.push({ ...action.payload, status: '1' });
    },
    updateTicketStatus: (state, action) => {
      // console.log('state', state)
      // console.log('action.payload.ticketNumber', action.payload)
      // const index = state.tickets.findIndex((ticket) => ticket.ticketNumber === action.payload.ticketNumber);
      // // console.log('state', state)
      // if (index !== -1) {
      //   state.tickets[index].status = action.payload.status;
      // }
      const { ticketNumber, status } = action.payload;
      const ticket = state.tickets.find((ticket) => ticket.ticket_number === ticketNumber);
      if (ticket) {
        ticket.status = status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('fetch - ', action.payload)
        state.tickets = action.payload;
        console.log('state.tickets - ', state.tickets)
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveTicketData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveTicketData.fulfilled, (state, action) => {
        // Add the new ticket to the state
        console.log(action.payload);
        state.tickets.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(saveTicketData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateTicketStatusOnData.pending, (state) => {
        // console.log('updateTicketStatusOnData state.tickets - ', state)
        state.status = 'loading';
      })
      .addCase(updateTicketStatusOnData.fulfilled, (state) => {
        // console.log('updateTicketStatusOnData fulfilled state.tickets - ', state)
        state.status = 'succeeded';
      })
      .addCase(updateTicketStatusOnData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export const { addTicket, updateTicketStatus } = ticketFormSlice.actions;
export default ticketFormSlice.reducer;

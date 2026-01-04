console.log("Min API URL:", import.meta.env.VITE_AUTH_URL);

const apiConfig = {
    auth: import.meta.env.VITE_AUTH_URL,
    event: import.meta.env.VITE_EVENT_URL,
    booking: import.meta.env.VITE_BOOKING_URL,
    verify: import.meta.env.VITE_VERIFY_URL
};

export default apiConfig;
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { EventPage, loader as EventLoader } from "./pages/EventPage";
import { EventsPage, loader as EventListLoader } from "./pages/EventsPage";
import {
  CreateEventPage,
  loader as CreateEventLoader,
} from "./pages/CreateEventPage";
import { NotFound } from "./components/NotFound";
import { ErrorPage } from "./components/ErrorPage";
import { CheckBoxExample2 } from "./pages/CheckboxTest2";
import { CheckBoxExample1 } from "./pages/CheckboxTest1";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: EventListLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: EventLoader,
      },
      {
        path: "/new",
        element: <CreateEventPage />,
        loader: CreateEventLoader,
      },
      {
        path: "/checkbox1",
        element: <CheckBoxExample1 />,
      },
      {
        path: "/checkbox2",
        element: <CheckBoxExample2 />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

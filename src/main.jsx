import { ChakraProvider, Box } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as EventLoader } from "./pages/EventPage";
import { EventsPage, loader as EventListLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import {
  CreateEventPage,
  loader as CreateEventLoader,
} from "./pages/CreateEventPage";
import { NotFound } from "./components/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { TestPage } from "./pages/TestPage";
import { RadioExample } from "./pages/RadioTest";
import { RadioExample2 } from "./pages/RadioTest2";
import { CheckBoxExample2 } from "./pages/CheckboxTest2";
import { CheckBoxExample1 } from "./pages/CheckboxTest1";

const counter = 15;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundary />,
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

        // action: addComment,
      },
      {
        path: "/new",
        element: <CreateEventPage />,
        loader: CreateEventLoader,
      },
      {
        path: "/test",
        element: <TestPage countparm={counter} />,
      },
      {
        path: "/radio",
        element: <RadioExample />,
      },
      {
        path: "/radio2",
        element: <RadioExample2 />,
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

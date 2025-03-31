import React from 'react'
import { createRoot } from 'react-dom/client'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from 'react-redux'
import 'core-js'

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import App from './App'
import store from './store'

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </Provider>
)
import { StrictMode } from '../$node_modules/@types/react/index.js'
import { createRoot } from '../$node_modules/@types/react-dom/client.js'
import './index.css'
import App from './App.jsx'
import { ApolloProvider } from '../$node_modules/@apollo/client/index.js'
import client from './server-client/ApolloClient.js'

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
     <App />
  </ApolloProvider>  
)

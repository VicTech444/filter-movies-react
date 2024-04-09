import React from 'react'
import ReactDOM from 'react-dom/client';
import { BookGalery } from './components/book-galery';
import './styles/main.css'


let root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <>
  <BookGalery />
  </>
)


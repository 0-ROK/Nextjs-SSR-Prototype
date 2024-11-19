'use client';

import { useEffect, useState } from 'react';
import styles from '../app/page.module.css';
import BookForm from './BookForm';
import { Book } from '@/types/book';

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await fetch('http://localhost:8080/books', { 
        cache: 'no-store'
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>도서 목록</h1>
      
      <BookForm onSuccess={fetchBooks} />
      
      <div className={styles.bookList}>
        {books.length === 0 ? (
          <p className={styles.emptyMessage}>등록된 도서가 없습니다.</p>
        ) : (
          <ul className={styles.list}>
            {books.map((book) => (
              <li key={book.id} className={styles.bookItem}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookAuthor}>저자: {book.author}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import styles from './BookForm.module.css';

interface BookFormProps {
  onSuccess: () => void;
}

export default function BookForm({ onSuccess }: BookFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
      });

      if (!response.ok) {
        throw new Error('Failed to create book');
      }

      setTitle('');
      setAuthor('');
      onSuccess();
    } catch (error) {
      console.error('Error creating book:', error);
      alert('책 생성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="author">저자</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? '생성 중...' : '책 추가하기'}
      </button>
    </form>
  );
} 
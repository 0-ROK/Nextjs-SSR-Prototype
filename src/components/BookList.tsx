import styles from '../app/page.module.css';
import ClientBookForm from '@/components/ClientBookForm';
import { Book } from '@/types/book';
import { createClient } from '@/utils/supabase/server';

async function getBooks() {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from('books')
      .select()

    console.log('Fetched data:', data);

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
      });
      throw error;
    }

    if (!data) {
      console.log('No data returned from Supabase');
      return [];
    }

    return data as Book[];
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

export default async function BookList() {
  const books = await getBooks();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>도서 목록</h1>
      
      <ClientBookForm />
      
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
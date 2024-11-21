'use client';

import { useRouter } from 'next/navigation';
import BookForm from './BookForm';

export default function ClientBookForm() {
  const router = useRouter();
  
  const handleSuccess = () => {
    router.refresh(); // 서버 컴포넌트 리프레시
  };

  return <BookForm onSuccess={handleSuccess} />;
} 
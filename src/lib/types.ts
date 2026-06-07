export type BookStatus = 'Available' | 'Borrowed' | 'Damaged' | 'Lost';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: BookStatus;
  publishYear: number;
  availableCopies: number;
  totalCopies: number;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
}

export interface Transaction {
  id: string;
  bookId: string;
  memberId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Borrowed' | 'Returned' | 'Overdue';
}

export interface DashboardStats {
  totalBooks: number;
  totalMembers: number;
  borrowedBooks: number;
  overdueBooks: number;
}
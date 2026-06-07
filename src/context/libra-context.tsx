"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, Member, Transaction, Notification } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface LibraContextType {
  books: Book[];
  members: Member[];
  transactions: Transaction[];
  notifications: Notification[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  borrowBook: (memberId: string, bookId: string, dueDate: string) => void;
  returnBook: (transactionId: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const LibraContext = createContext<LibraContextType | undefined>(undefined);

const initialBooks: Book[] = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0743273565", category: "Classic", status: "Available", publishYear: 1925, availableCopies: 5, totalCopies: 5 },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0061120084", category: "Classic", status: "Borrowed", publishYear: 1960, availableCopies: 0, totalCopies: 3 },
  { id: "3", title: "Dune", author: "Frank Herbert", isbn: "978-0441172719", category: "Sci-Fi", status: "Available", publishYear: 1965, availableCopies: 2, totalCopies: 4 },
  { id: "4", title: "Silent Spring", author: "Rachel Carson", isbn: "978-0618249060", category: "Non-Fiction", status: "Available", publishYear: 1962, availableCopies: 1, totalCopies: 1 },
  { id: "5", title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "978-0547928227", category: "Fantasy", status: "Damaged", publishYear: 1937, availableCopies: 0, totalCopies: 2 },
];

const initialMembers: Member[] = [
  { id: "1", name: "Alice Johnson", email: "alice.j@example.com", phone: "(555) 123-4567", joinDate: "Jan 2023", status: "Active", initials: "AJ", color: "gradient-primary", borrows: 12 },
  { id: "2", name: "Robert Smith", email: "r.smith@provider.net", phone: "(555) 987-6543", joinDate: "Mar 2023", status: "Active", initials: "RS", color: "gradient-secondary", borrows: 8 },
  { id: "3", name: "Elena Rodriguez", email: "elena.rod@mail.com", phone: "(555) 246-1357", joinDate: "Jun 2023", status: "Inactive", initials: "ER", color: "bg-orange-500", borrows: 0 },
];

const initialTransactions: Transaction[] = [
  { id: "T-8821", bookId: "1", bookTitle: "The Great Gatsby", memberId: "1", memberName: "Alice Johnson", borrowDate: "Oct 20, 2026", dueDate: "Nov 03, 2026", status: "Borrowed" },
  { id: "T-9012", bookId: "3", bookTitle: "Dune", memberId: "2", memberName: "Robert Smith", borrowDate: "Oct 15, 2026", dueDate: "Oct 29, 2026", status: "Overdue" },
];

const initialNotifications: Notification[] = [
  { id: "1", title: "Overdue Alert", message: "Dune is 3 days overdue by Robert Smith.", time: "2h ago", type: "error", read: false },
  { id: "2", title: "New Member", message: "Elena Rodriguez has joined the library.", time: "1d ago", type: "success", read: true },
];

export const LibraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: Math.random().toString(36).substr(2, 9) };
    setBooks(prev => [...prev, newBook]);
    addNotification("Success", `${book.title} added to catalog`, "success");
  };

  const updateBook = (id: string, updatedFields: Partial<Book>) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, ...updatedFields } : b));
    toast({ title: "Updated", description: "Book record updated successfully." });
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
    toast({ title: "Deleted", description: "Book removed from catalog." });
  };

  const addMember = (member: Omit<Member, 'id'>) => {
    const newMember = { ...member, id: Math.random().toString(36).substr(2, 9) };
    setMembers(prev => [...prev, newMember]);
    addNotification("New Member", `${member.name} registered successfully`, "success");
  };

  const updateMember = (id: string, updatedFields: Partial<Member>) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
    toast({ title: "Updated", description: "Member profile updated." });
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    toast({ title: "Deleted", description: "Member removed from records." });
  };

  const borrowBook = (memberId: string, bookId: string, dueDate: string) => {
    const book = books.find(b => b.id === bookId);
    const member = members.find(m => m.id === memberId);
    if (!book || !member) return;

    const newTx: Transaction = {
      id: `T-${Math.floor(Math.random() * 10000)}`,
      bookId,
      bookTitle: book.title,
      memberId,
      memberName: member.name,
      borrowDate: new Date().toLocaleDateString(),
      dueDate,
      status: "Borrowed"
    };

    setTransactions(prev => [newTx, ...prev]);
    updateBook(bookId, { availableCopies: book.availableCopies - 1, status: book.availableCopies <= 1 ? "Borrowed" : "Available" });
    updateMember(memberId, { borrows: member.borrows + 1 });
    addNotification("Borrowed", `${member.name} borrowed ${book.title}`, "info");
  };

  const returnBook = (transactionId: string) => {
    const tx = transactions.find(t => t.id === transactionId);
    if (!tx) return;

    setTransactions(prev => prev.map(t => t.id === transactionId ? { ...t, status: "Returned", returnDate: new Date().toLocaleDateString() } : t));
    const book = books.find(b => b.id === tx.bookId);
    if (book) {
      updateBook(book.id, { availableCopies: book.availableCopies + 1, status: "Available" });
    }
    addNotification("Returned", `Book ${tx.bookTitle} has been returned`, "success");
  };

  const addNotification = (title: string, message: string, type: Notification['type']) => {
    const newNotif: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      message,
      time: "Just now",
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <LibraContext.Provider value={{
      books, members, transactions, notifications,
      addBook, updateBook, deleteBook,
      addMember, updateMember, deleteMember,
      borrowBook, returnBook,
      markNotificationAsRead, clearNotifications
    }}>
      {children}
    </LibraContext.Provider>
  );
};

export const useLibra = () => {
  const context = useContext(LibraContext);
  if (context === undefined) {
    throw new Error('useLibra must be used within a LibraProvider');
  }
  return context;
};

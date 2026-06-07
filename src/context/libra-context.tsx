"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, Member, Transaction, Notification, AuditEvent } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface LibraContextType {
  books: Book[];
  members: Member[];
  transactions: Transaction[];
  notifications: Notification[];
  auditLogs: AuditEvent[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  duplicateBook: (id: string) => void;
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  borrowBook: (memberId: string, bookId: string, dueDate: string) => void;
  returnBook: (transactionId: string) => void;
  extendLoan: (transactionId: string, days: number) => void;
  voidTransaction: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  searchAll: (query: string) => { books: Book[], members: Member[], transactions: Transaction[] };
}

const LibraContext = createContext<LibraContextType | undefined>(undefined);

const initialBooks: Book[] = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0743273565", category: "Classic", status: "Available", publishYear: 1925, availableCopies: 5, totalCopies: 5, summary: "A story of ambition, love, and the American Dream in the Roaring Twenties." },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0061120084", category: "Classic", status: "Borrowed", publishYear: 1960, availableCopies: 0, totalCopies: 3, summary: "A profound exploration of racial injustice and the loss of innocence in the American South." },
  { id: "3", title: "Dune", author: "Frank Herbert", isbn: "978-0441172719", category: "Sci-Fi", status: "Available", publishYear: 1965, availableCopies: 2, totalCopies: 4, summary: "An epic science fiction saga set on the desert planet Arrakis." },
  { id: "4", title: "Silent Spring", author: "Rachel Carson", isbn: "978-0618249060", category: "Non-Fiction", status: "Available", publishYear: 1962, availableCopies: 1, totalCopies: 1, summary: "A landmark environmental science book documenting the adverse effects of pesticides." },
  { id: "5", title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "978-0547928227", category: "Fantasy", status: "Available", publishYear: 1937, availableCopies: 2, totalCopies: 2, summary: "The classic fantasy adventure of Bilbo Baggins." },
  { id: "6", title: "Zero to One", author: "Peter Thiel", isbn: "978-0804139298", category: "Business", status: "Available", publishYear: 2014, availableCopies: 3, totalCopies: 3, summary: "Notes on startups, or how to build the future." },
  { id: "7", title: "The Innovators", author: "Walter Isaacson", isbn: "978-1476708690", category: "Technology", status: "Available", publishYear: 2014, availableCopies: 1, totalCopies: 1, summary: "A history of the people who created the computer and the internet." },
];

const initialMembers: Member[] = [
  { id: "1", name: "Alice Johnson", email: "alice.j@example.com", phone: "(555) 123-4567", joinDate: "Jan 20, 2023", status: "Active", initials: "AJ", color: "gradient-primary", borrows: 12 },
  { id: "2", name: "Robert Smith", email: "r.smith@provider.net", phone: "(555) 987-6543", joinDate: "Mar 12, 2023", status: "Active", initials: "RS", color: "gradient-secondary", borrows: 8 },
  { id: "3", name: "Elena Rodriguez", email: "elena.rod@mail.com", phone: "(555) 246-1357", joinDate: "Jun 05, 2023", status: "Inactive", initials: "ER", color: "bg-orange-500", borrows: 0 },
];

const initialTransactions: Transaction[] = [
  { id: "T-8821", bookId: "1", bookTitle: "The Great Gatsby", memberId: "1", memberName: "Alice Johnson", borrowDate: "Oct 20, 2026", dueDate: "Nov 03, 2026", status: "Borrowed" },
  { id: "T-9012", bookId: "2", bookTitle: "To Kill a Mockingbird", memberId: "2", memberName: "Robert Smith", borrowDate: "Oct 15, 2026", dueDate: "Oct 29, 2026", status: "Overdue" },
];

const initialAuditLogs: AuditEvent[] = [
  { id: "A-001", timestamp: "Oct 20, 2026 10:45 AM", action: "BORROW", details: "Alice Johnson borrowed The Great Gatsby", user: "admin_jane", type: "info", entityId: "T-8821", entityType: "Transaction" },
  { id: "A-002", timestamp: "Oct 19, 2026 02:15 PM", action: "MEMBER_REG", details: "New member Elena Rodriguez registered", user: "admin_jane", type: "success", entityId: "3", entityType: "Member" },
  { id: "A-003", timestamp: "Oct 18, 2026 09:00 AM", action: "ASSET_ADD", details: "Zero to One published to archive", user: "admin_jane", type: "success", entityId: "6", entityType: "Book" },
];

export const LibraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(initialAuditLogs);

  const addAudit = (action: string, details: string, type: AuditEvent['type'] = 'info', entityId?: string, entityType?: AuditEvent['entityType'], previousState?: string, newState?: string) => {
    const newLog: AuditEvent = {
      id: `A-${Math.floor(Math.random() * 9000 + 1000)}`,
      timestamp: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      action,
      details,
      user: "admin_jane",
      type,
      entityId,
      entityType,
      previousState,
      newState
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addBook = (book: Omit<Book, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newBook = { ...book, id };
    setBooks(prev => [...prev, newBook]);
    addNotification("Asset Added", `${book.title} published to archive`, "success");
    addAudit("ASSET_ADD", `${book.title} added to catalog`, "success", id, "Book", undefined, JSON.stringify(newBook));
    toast({ title: "Success", description: "Book added to catalog." });
  };

  const updateBook = (id: string, updatedFields: Partial<Book>) => {
    const prevBook = books.find(b => b.id === id);
    setBooks(prev => prev.map(b => b.id === id ? { ...b, ...updatedFields } : b));
    addAudit("ASSET_UPDATE", `Updated record for ID: ${id}`, "info", id, "Book", JSON.stringify(prevBook), JSON.stringify({ ...prevBook, ...updatedFields }));
    toast({ title: "Updated", description: "Record synchronized successfully." });
  };

  const deleteBook = (id: string) => {
    const prevBook = books.find(b => b.id === id);
    setBooks(prev => prev.filter(b => b.id !== id));
    addAudit("ASSET_DELETE", `Removed asset ID: ${id}`, "warning", id, "Book", JSON.stringify(prevBook));
    toast({ title: "Archived", description: "Entry removed from directory." });
  };

  const duplicateBook = (id: string) => {
    const original = books.find(b => b.id === id);
    if (original) {
      addBook({
        ...original,
        title: `${original.title} (Copy)`,
        availableCopies: original.totalCopies,
        status: "Available"
      });
    }
  };

  const addMember = (member: Omit<Member, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newMember = { ...member, id };
    setMembers(prev => [...prev, newMember]);
    addNotification("New Registration", `${member.name} linked to system`, "success");
    addAudit("MEMBER_REG", `${member.name} registered as new member`, "success", id, "Member", undefined, JSON.stringify(newMember));
    toast({ title: "Registered", description: "New member profile initialized." });
  };

  const updateMember = (id: string, updatedFields: Partial<Member>) => {
    const prevMember = members.find(m => m.id === id);
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
    addAudit("MEMBER_UPDATE", `Updated profile for ID: ${id}`, "info", id, "Member", JSON.stringify(prevMember), JSON.stringify({ ...prevMember, ...updatedFields }));
    toast({ title: "Updated", description: "Profile data updated." });
  };

  const deleteMember = (id: string) => {
    const prevMember = members.find(m => m.id === id);
    setMembers(prev => prev.filter(m => m.id !== id));
    addAudit("MEMBER_DELETE", `Deactivated member ID: ${id}`, "warning", id, "Member", JSON.stringify(prevMember));
    toast({ title: "Deactivated", description: "Member link terminated." });
  };

  const borrowBook = (memberId: string, bookId: string, dueDate: string) => {
    const book = books.find(b => b.id === bookId);
    const member = members.find(m => m.id === memberId);
    if (!book || !member) return;

    const txId = `T-${Math.floor(Math.random() * 9000 + 1000)}`;
    const newTx: Transaction = {
      id: txId,
      bookId,
      bookTitle: book.title,
      memberId,
      memberName: member.name,
      borrowDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      dueDate: new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: "Borrowed"
    };

    setTransactions(prev => [newTx, ...prev]);
    updateBook(bookId, { availableCopies: book.availableCopies - 1, status: book.availableCopies <= 1 ? "Borrowed" : "Available" });
    updateMember(memberId, { borrows: (member.borrows || 0) + 1 });
    addNotification("Transmission", `${member.name} acquired ${book.title}`, "info");
    addAudit("BORROW", `${member.name} borrowed ${book.title}`, "info", txId, "Transaction", undefined, JSON.stringify(newTx));
    toast({ title: "Dispatched", description: "Asset transmission confirmed." });
  };

  const returnBook = (transactionId: string) => {
    const tx = transactions.find(t => t.id === transactionId);
    if (!tx || tx.status === 'Returned') return;

    const returnDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    setTransactions(prev => prev.map(t => t.id === transactionId ? { ...t, status: "Returned", returnDate } : t));
    const book = books.find(b => b.id === tx.bookId);
    if (book) {
      updateBook(book.id, { availableCopies: book.availableCopies + 1, status: "Available" });
    }
    addNotification("Returned", `${tx.bookTitle} reintegrated into archive`, "success");
    addAudit("RETURN", `${tx.memberName} returned ${tx.bookTitle}`, "success", transactionId, "Transaction", JSON.stringify(tx), JSON.stringify({ ...tx, status: "Returned", returnDate }));
    toast({ title: "Processed", description: "Asset return confirmed." });
  };

  const extendLoan = (transactionId: string, days: number) => {
    const prevTx = transactions.find(t => t.id === transactionId);
    setTransactions(prev => prev.map(t => {
      if (t.id === transactionId) {
        const currentDue = new Date(t.dueDate);
        currentDue.setDate(currentDue.getDate() + days);
        return { ...t, dueDate: currentDue.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), status: "Borrowed" };
      }
      return t;
    }));
    addAudit("LOAN_EXTEND", `Extended loan for transaction: ${transactionId}`, "info", transactionId, "Transaction");
    toast({ title: "Extended", description: "Loan duration updated." });
  };

  const voidTransaction = (id: string) => {
    const prevTx = transactions.find(t => t.id === id);
    setTransactions(prev => prev.filter(t => t.id !== id));
    addAudit("VOID_TX", `Voided transaction: ${id}`, "warning", id, "Transaction", JSON.stringify(prevTx));
    toast({ title: "Voided", description: "Transaction removed from system history." });
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

  const searchAll = (query: string) => {
    const q = query.toLowerCase();
    return {
      books: books.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q)),
      members: members.filter(m => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)),
      transactions: transactions.filter(t => t.bookTitle.toLowerCase().includes(q) || t.memberName.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
    };
  };

  return (
    <LibraContext.Provider value={{
      books, members, transactions, notifications, auditLogs,
      addBook, updateBook, deleteBook, duplicateBook,
      addMember, updateMember, deleteMember,
      borrowBook, returnBook, extendLoan, voidTransaction,
      markNotificationAsRead, clearNotifications,
      searchAll
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

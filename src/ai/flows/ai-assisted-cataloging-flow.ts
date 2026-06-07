'use server';
/**
 * @fileOverview An AI assistant for generating book summaries and keywords for cataloging.
 *
 * - aiAssistedCataloging - A function that generates a book summary and keywords based on title and author.
 * - BookCatalogingInput - The input type for the aiAssistedCataloging function.
 * - BookCatalogingOutput - The return type for the aiAssistedCataloging function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BookCatalogingInputSchema = z.object({
  title: z.string().describe('The title of the book.'),
  author: z.string().describe('The author of the book.'),
});
export type BookCatalogingInput = z.infer<typeof BookCatalogingInputSchema>;

const BookCatalogingOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the book.'),
  keywords: z
    .array(z.string())
    .describe('A list of relevant keywords or tags for the book.'),
});
export type BookCatalogingOutput = z.infer<typeof BookCatalogingOutputSchema>;

export async function aiAssistedCataloging(
  input: BookCatalogingInput
): Promise<BookCatalogingOutput> {
  return aiAssistedCatalogingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiAssistedCatalogingPrompt',
  input: {schema: BookCatalogingInputSchema},
  output: {schema: BookCatalogingOutputSchema},
  prompt: `You are an expert librarian assistant tasked with summarizing books and identifying key keywords for cataloging purposes.

Given the book's title and author, generate a concise summary and a list of relevant keywords or tags that accurately describe the book's content, themes, and genre.

Title: {{{title}}}
Author: {{{author}}}`,
});

const aiAssistedCatalogingFlow = ai.defineFlow(
  {
    name: 'aiAssistedCatalogingFlow',
    inputSchema: BookCatalogingInputSchema,
    outputSchema: BookCatalogingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate book summary and keywords.');
    }
    return output;
  }
);

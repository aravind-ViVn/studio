'use server';
/**
 * @fileOverview An AI agent that helps users discover books based on natural language descriptions of themes, moods, or plot elements.
 *
 * - intelligentBookDiscovery - A function that handles the intelligent book discovery process.
 * - IntelligentBookDiscoveryInput - The input type for the intelligentBookDiscovery function.
 * - IntelligentBookDiscoveryOutput - The return type for the intelligentBookDiscovery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentBookDiscoveryInputSchema = z.object({
  naturalLanguageQuery: z
    .string()
    .describe(
      "A natural language description of themes, moods, or specific plot elements for book discovery. E.g., 'books about self-discovery in a magical academy', 'a melancholic story set in a dystopian future', or 'a detective novel where the protagonist has amnesia'."
    ),
});
export type IntelligentBookDiscoveryInput = z.infer<typeof IntelligentBookDiscoveryInputSchema>;

const IntelligentBookDiscoveryOutputSchema = z.object({
  recommendedBooks:
    z.array(
      z.object({
        title: z.string().describe('The title of the recommended book.'),
        author: z.string().describe('The author of the recommended book.'),
        summary:
          z.string().describe(
            'A brief summary of the book, explaining how it relates to the user\'s query regarding themes, moods, or plot elements.'
          ),
      })
    )
    .describe('A list of books recommended based on the natural language query.'),
});
export type IntelligentBookDiscoveryOutput = z.infer<typeof IntelligentBookDiscoveryOutputSchema>;

export async function intelligentBookDiscovery(
  input: IntelligentBookDiscoveryInput
): Promise<IntelligentBookDiscoveryOutput> {
  return intelligentBookDiscoveryFlow(input);
}

const intelligentBookDiscoveryPrompt = ai.definePrompt({
  name: 'intelligentBookDiscoveryPrompt',
  input: {schema: IntelligentBookDiscoveryInputSchema},
  output: {schema: IntelligentBookDiscoveryOutputSchema},
  prompt: `You are an intelligent librarian assistant. Your task is to recommend books to a user based on their natural language description of themes, moods, or specific plot elements.
Analyze the user's query and suggest a list of books that fit the description. For each book, provide its title, author, and a concise summary explaining why it's a good match for the query.

User Query: "{{{naturalLanguageQuery}}}"

Please provide at least 3 book recommendations.`,
});

const intelligentBookDiscoveryFlow = ai.defineFlow(
  {
    name: 'intelligentBookDiscoveryFlow',
    inputSchema: IntelligentBookDiscoveryInputSchema,
    outputSchema: IntelligentBookDiscoveryOutputSchema,
  },
  async input => {
    const {output} = await intelligentBookDiscoveryPrompt(input);
    if (!output) {
      throw new Error('No output received from the book discovery prompt.');
    }
    return output;
  }
);

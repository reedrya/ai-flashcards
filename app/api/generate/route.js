import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt = `
    You are a flashcard creator. Your job is to generate concise and effective flashcards based on the given topic. 
    Each flashcard should include a clear question or prompt on one side and a precise, informative answer or explanation on the other. 
    Focus on breaking down complex concepts into easily digestible pieces of information. Tailor the content to the user's level of expertise
     and prioritize clarity, accuracy, and brevity.

    Return in the following JSON format:
    {
        "flashcards":[
            {
                "front": str,
                "back": str
            }
        ]
    }
`;

export async function POST(req) {
    const groq = new Groq();
    const data = await req.text();

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: data },
            ],
            model: 'llama3-8b-8192',
            response_format: { type: 'json_object' },
        });

        // Ensure the response is in JSON format
        const content = completion.choices[0].message.content;

        // Parse JSON response
        let flashcards;
        try {
            flashcards = JSON.parse(content);
        } catch (parseError) {
            throw new Error('Failed to parse JSON response');
        }

        // Validate response structure
        if (!flashcards.flashcards || !Array.isArray(flashcards.flashcards)) {
            throw new Error('Invalid response format');
        }

        return NextResponse.json(flashcards);
    } catch (error) {
        console.error('Error generating flashcards:', error);
        return NextResponse.json({ error: 'An error occurred while generating flashcards. Please try again.' }, { status: 500 });
    }
}

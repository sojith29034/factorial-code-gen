import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { language } = await req.json();

  if (!language) {
    return new Response(JSON.stringify({ error: 'Please provide a language' }), { status: 400 });
  }

  const prompt = `Provide a ${language} code snippet to compute the factorial of any number.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const code = response.choices[0].message.content;
    return new Response(JSON.stringify({ code }), { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Error generating code' }), { status: 500 });
  }
}
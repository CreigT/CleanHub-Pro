
import { GoogleGenAI, Type } from "@google/genai";
import { Job } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateWeeklySummary(jobs: Job[]): Promise<string> {
  try {
    const prompt = `You are an operations manager at 'CleanHub Pro'. Analyze the following list of completed and scheduled jobs for the week. Write a brief, encouraging summary for the team. Highlight the number of jobs completed, mention any notable upcoming jobs, and provide a positive outlook. Job data: ${JSON.stringify(jobs, null, 2)}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating weekly summary:", error);
    return "Could not generate AI summary at this time. Please try again later.";
  }
}

export async function optimizeSchedule(jobs: Job[]): Promise<Job[]> {
  try {
    const prompt = `You are an expert logistics coordinator for a cleaning company. Given the following list of jobs as a JSON string, optimize the schedule to minimize travel time between locations and balance workload among team members. The addresses are simplified for this task. Return ONLY the re-ordered list of jobs as a valid JSON array, with no other text or explanation. The structure of the output JSON must be identical to the input. Here is the job list: ${JSON.stringify(jobs)}`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              clientName: { type: Type.STRING },
              address: { type: Type.STRING },
              date: { type: Type.STRING },
              time: { type: Type.STRING },
              team: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    avatar: { type: Type.STRING },
                  },
                },
              },
              status: { type: Type.STRING },
              notes: { type: Type.STRING, nullable: true },
            },
          },
        },
      },
    });

    const optimizedJobsText = response.text.trim();
    return JSON.parse(optimizedJobsText);

  } catch (error) {
    console.error("Error optimizing schedule:", error);
    // Return original jobs as a fallback
    return jobs;
  }
}


export async function generateClientReminder(job: Job): Promise<string> {
    try {
        const prompt = `You are a friendly assistant for 'CleanHub Pro'. Write a concise and professional SMS reminder for the following cleaning appointment. Include the client's name, the date, and the time. Do not add any sign-off like 'Best regards'. Job details: Client: ${job.clientName}, Date: ${job.date}, Time: ${job.time}.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating client reminder:", error);
        return "Could not generate reminder. Please draft one manually.";
    }
}

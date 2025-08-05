import { z } from 'zod';
import { POST } from '@tool/utils/request';
import { getErrText } from '@tool/utils/err';

export const InputType = z.object({
  query: z.string().min(1, 'Query cannot be empty'),
  userId: z.string().optional(),
  appId: z.string().optional(),
  chatId: z.string().optional(),
  limit: z.number().min(1).max(100).optional().default(10),
  apiKey: z.string().optional(),
  apiUrl: z.string().optional()
});

export const OutputType = z.object({
  memories: z.array(z.object({
    id: z.string(),
    memory: z.string(),
    metadata: z.record(z.any()).optional().default({}),
    created_at: z.string().optional(),
    updated_at: z.string().optional()
  })),
  relations: z.array(z.object({
    source: z.string(),
    relationship: z.string(),
    destination: z.string()
  })),
  count: z.number(),
  success: z.boolean(),
  message: z.string()
});

export async function tool(props: z.infer<typeof InputType>): Promise<z.infer<typeof OutputType>> {
  const { query, userId, limit, apiKey, apiUrl } = props;

  try {
    // Build request payload
    const payload: any = {
      query
    };

    // Add optional parameters
    if (userId) {
      payload.user_id = userId;
    }
    if (props.appId) {
      payload.agent_id = props.appId;
    }
    if (props.chatId) {
      payload.run_id = props.chatId;
    }
    if (limit !== undefined) {
      payload.limit = limit;
    }

    // Build headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    // Add authorization header if API key is provided
    const finalApiKey = apiKey || process.env.MEM0_API_KEY;
    if (finalApiKey && finalApiKey !== 'default-key') {
      headers['Authorization'] = `Bearer ${finalApiKey}`;
    }

    // Determine API URL
    const baseUrl = apiUrl || 'https://api.mem0.ai';
    const endpoint = '/v1/memories/search';

    // Make API request
    const response = await POST(`${baseUrl}${endpoint}`, payload, {
      headers
    });

    // Format the results
    const result = response.data.results;
    const memories = (Array.isArray(result) ? result : []).map((item: any) => ({
      id: item.id || '',
      memory: item.memory || '',
      metadata: item.metadata || {},
      created_at: item.created_at?.toString(),
      updated_at: item.updated_at?.toString()
    }));

    // Format the relations
    const relations = (Array.isArray(response.data.relations) ? response.data.relations : []).map((item: any) => ({
      source: item.source,
      relationship: item.relationship,
      destination: item.destination,
    }));
    return {
      memories,
      relations,
      count: memories.length,
      success: true,
      message: `Successfully retrieved ${memories.length} memories`
    };
  } catch (error: any) {
    return {
      memories: [],
      relations: [],
      count: 0,
      success: false,
      message: `Failed to search memories: ${getErrText(error)}`
    };
  }
}
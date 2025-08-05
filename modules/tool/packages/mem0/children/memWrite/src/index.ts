import { z } from 'zod';
import { POST } from '@tool/utils/request';
import { getErrText } from '@tool/utils/err';

export const InputType = z.object({
  message: z.string().optional(),
  userQuestion: z.string().optional(),
  aiReply: z.string().optional(),
  userId: z.string().optional(),
  appId: z.string().optional(),
  chatId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  apiKey: z.string().optional(),
  apiUrl: z.string().optional(),
  infer: z.boolean().optional().default(true),
  customFactExtractionPrompt: z.string().optional(),
  asyncMode: z.boolean().optional().default(false)
});

export const OutputType = z.object({
  memoryId: z.string(),
  success: z.boolean(),
  message: z.string()
});

export async function tool(props: z.infer<typeof InputType>): Promise<z.infer<typeof OutputType>> {
  const { message, userQuestion, aiReply, userId, appId, chatId, metadata, apiKey, apiUrl, infer, customFactExtractionPrompt, asyncMode } = props;

  try {
    // Parse metadata if provided
    // let parsedMetadata: Record<string, any> | undefined;
    // if (metadata) {
    //   try {
    //     parsedMetadata = JSON.parse(metadata);
    //   } catch (error) {
    //     return {
    //       memoryId: '',
    //       success: false,
    //       message: `Invalid metadata JSON format: ${getErrText(error)}`
    //     };
    //   }
    // }

    // Build combined messages
    let combinedMessages: any[] = [];
    
    // Add user question and AI reply if provided
    if (userQuestion) {
      combinedMessages.push({
        role: 'user',
        content: userQuestion
      });
    }
    
    if (aiReply) {
      combinedMessages.push({
        role: 'assistant',
        content: aiReply
      });
    }
    
    // Add custom message if provided (must be JSON array format)
    if (message) {
      try {
        const customMessages = JSON.parse(message);
        if (!Array.isArray(customMessages)) {
          return {
            memoryId: '',
            success: false,
            message: 'Invalid message format: message must be a JSON array with role-content structure, e.g., [{"role":"user","content":"content"}]'
          };
        }
        
        // Validate each message in the array
        for (let i = 0; i < customMessages.length; i++) {
          const msg = customMessages[i];
          if (!msg || typeof msg !== 'object' || !msg.role || !msg.content) {
            return {
              memoryId: '',
              success: false,
              message: `Invalid message format at index ${i}: each message must have 'role' and 'content' properties, e.g., {"role":"user","content":"content"}`
            };
          }
          if (!['user', 'assistant', 'system'].includes(msg.role)) {
            return {
              memoryId: '',
              success: false,
              message: `Invalid role at index ${i}: role must be 'user', 'assistant', or 'system'`
            };
          }
        }
        
        combinedMessages = [...combinedMessages, ...customMessages];
      } catch (error) {
        return {
          memoryId: '',
          success: false,
          message: `Invalid message format: message must be valid JSON array with role-content structure, e.g., [{"role":"user","content":"content"}]. Error: ${getErrText(error)}`
        };
      }
    }

    // If no messages provided, return error
    if (combinedMessages.length === 0) {
      return {
        memoryId: '',
        success: false,
        message: 'At least one of userQuestion, aiReply, or message must be provided'
      };
    }

    // Build request payload
    const payload: any = {
      messages: combinedMessages
    };

    // Add optional parameters
    if (userId) {
      payload.user_id = userId;
    }
    if (appId) {
      payload.agent_id = appId;
    }
    if (chatId) {
      payload.run_id = chatId;
    }
    if (metadata) {
      payload.metadata = metadata;
    }
    if (infer !== undefined) {
      payload.infer = infer;
    }
    if (customFactExtractionPrompt) {
      payload.custom_fact_extraction_prompt = customFactExtractionPrompt;
    }
    if (asyncMode !== undefined) {
      payload.async_mode = asyncMode;
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
    const endpoint = '/v1/memories';
    console.log('payload>>>>>>>>>>>>>>>>>>>>>>>>', JSON.stringify(payload,null, 2));
    // Make API request
    const response = await POST(`${baseUrl}${endpoint}`, payload, {
      headers
    });

    // Extract memory ID from response
    const memories = response.data;
    const memoryId = Array.isArray(memories) && memories.length > 0 ? memories[0].id : '';

    return {
      memoryId: memoryId || '',
      success: true,
      message: 'Memory successfully added'
    };
  } catch (error: any) {
    return {
      memoryId: '',
      success: false,
      message: `Failed to add memory: ${getErrText(error)}`
    };
  }
}
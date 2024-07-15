import OpenAI from 'openai'
import { APIError } from 'openai/error'
const SYSTEM_ROLE = 'system'
const USER_ROLE = 'user'
export const DEFAULT_SYSTEM_PROMPT = 'You are a helpful general knowledge expert.'
export const DEFAULT_USER_PROMPT = 'Who invented the television?'
export const CHAT_MODELS: CHAT_MODEL[] = ['gpt-4o', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo']
export const DEFAULT_CHAT_MODEL = CHAT_MODELS[0]
export interface CHAT_API_RESPONSE {
  success: boolean
  error?: string
  content?: OpenAI.Chat.Completions.ChatCompletion
}

export interface CHAT_API_RESPONSE_ERROR extends CHAT_API_RESPONSE {
  success: boolean
  error: string
}
export interface CHAT_API_RESPONSE_SUCCESS extends CHAT_API_RESPONSE {
  success: boolean
  content: OpenAI.Chat.Completions.ChatCompletion
}

type CHAT_MODEL = 'gpt-4o' | 'gpt-4-turbo' | 'gpt-4' | 'gpt-3.5-turbo'

interface ChatQueryOptions {
  userPrompt: string
  systemPrompt?: string
  chatModel?: CHAT_MODEL
}

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  project: 'proj_mFF2r3iCXGaCaVn4hEsKXOd3',
  dangerouslyAllowBrowser: true
})

export const callChatApi = async ({
  userPrompt,
  systemPrompt,
  chatModel
}: ChatQueryOptions): Promise<CHAT_API_RESPONSE_SUCCESS | CHAT_API_RESPONSE_ERROR> => {
  try {
    const messages = [
      {
        role: SYSTEM_ROLE,
        content: systemPrompt || DEFAULT_SYSTEM_PROMPT
      },
      {
        role: USER_ROLE,
        content: userPrompt || 'Who invented the television?'
      }
      // {"role": "user", "content": "Where was it played?"}
    ]

    const completion = await openai.chat.completions.create({
      // @ts-ignore
      messages,
      model: chatModel || DEFAULT_CHAT_MODEL
    })

    return { success: true, content: completion }
  } catch (error: any) {
    const { message } = error as APIError

    return { success: false, error: message }
  }
}

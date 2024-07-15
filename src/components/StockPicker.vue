<script setup lang="ts">
import { ref } from 'vue'
import {
  callChatApi,
  CHAT_MODELS,
  DEFAULT_CHAT_MODEL,
  DEFAULT_SYSTEM_PROMPT,
  DEFAULT_USER_PROMPT
} from '@/api'
// const openApiResponse = await callChatApi()

// if (openApiResponse) {
//   // @ts-ignore
//   const { model } = openApiResponse
//   const { content } = openApiResponse.choices[0].message

//   alert(`Model: ${model} \n ${content}`)
// }
const chatModels = CHAT_MODELS
let chatModel = DEFAULT_CHAT_MODEL
let systemPrompt = DEFAULT_SYSTEM_PROMPT
let userPrompt = DEFAULT_USER_PROMPT
let chatResponse = ref('')
let hasError = ref(false)
let errorMsg = ref('')
const isLoading = ref(false)
const submit = async () => {
  chatResponse.value = ''
  isLoading.value = true
  const { success, error, content } = await callChatApi({ chatModel, systemPrompt, userPrompt })
  if (!success) {
    hasError.value = true
    errorMsg.value = error || 'An error occurred'
    isLoading.value = false
    return
  } else {
    chatResponse.value = content?.choices[0].message.content || ''
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <v-form v-model="valid" class="greetings">
      <div>
        <v-select
          v-model="chatModel"
          :items="chatModels"
          label="Model"
          required
          variant="solo-filled"
        ></v-select>
        <v-textarea
          v-model="systemPrompt"
          :counter="100"
          label="System Prompt"
          required
          variant="solo-filled"
          clear-icon="mdi-close-circle"
          clearable
          rows="1"
        ></v-textarea>
        <v-textarea
          clearable
          v-model="userPrompt"
          :counter="2000"
          label="User Prompt"
          required
          variant="solo-filled"
        ></v-textarea>
        <div class="text-end">
          <v-btn
            elevated
            color="indigo-darken-3"
            :disabled="isLoading"
            :loading="isLoading"
            @click="submit"
            >Submit</v-btn
          >
        </div>
      </div>

      <v-sheet
        v-if="chatResponse && !isLoading"
        border="lg opacity-12"
        class="text-body-2 mx-auto"
        max-width="550"
      >
        {{ chatResponse }}
      </v-sheet>
      <div>
        <v-alert
          v-if="hasError && !isLoading"
          :text="errorMsg"
          title="API Error"
          type="error"
          icon="$error"
          closable
        ></v-alert>
        <v-progress-circular
          v-if="isLoading"
          indeterminate
          :size="62"
          :width="6"
        ></v-progress-circular>
      </div>
    </v-form>
  </div>
</template>

<style scoped>
.greetings {
  display: grid;
  grid-template-columns: 400px 700px;
  column-gap: 30px;
  width: 1100px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

const greetMsg = ref("");
const name = ref("");
const Checked = ref(0);
async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsg.value = await invoke("greet", { name: name.value });
}
</script>

<template>
  <main class="container">
    <div class="card m-4">
      <Toast />
      <FileUpload
        name="demo[]"
        url="/api/upload"
        @upload="onTemplatedUpload($event)"
        :multiple="true"
        accept="image/*"
        :maxFileSize="1000000"
        @select="onSelectedFiles"
      >
        <template
          #header="{ chooseCallback, uploadCallback, clearCallback, files }"
        >
          <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
            <div class="flex gap-2">
              <Button
                @click="chooseCallback()"
                icon="pi pi-images"
                rounded
                outlined
                severity="secondary"
              ></Button>
              <Button
                @click="uploadEvent(uploadCallback)"
                icon="pi pi-cloud-upload"
                rounded
                outlined
                severity="success"
                :disabled="!files || files.length === 0"
              ></Button>
              <Button
                @click="clearCallback()"
                icon="pi pi-times"
                rounded
                outlined
                severity="danger"
                :disabled="!files || files.length === 0"
              ></Button>
            </div>
            <ProgressBar
              :value="totalSizePercent"
              :showValue="false"
              class="md:w-20rem h-1 w-full md:ml-auto"
            >
              <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
            </ProgressBar>
          </div>
        </template>
        <template
          #content="{
            files,
            uploadedFiles,
            removeUploadedFileCallback,
            removeFileCallback,
          }"
        >
          <div class="flex flex-col gap-8 pt-4">
            <div v-if="files.length > 0">
              <h5>Pending</h5>
              <div class="flex flex-wrap gap-4">
                <div
                  v-for="(file, index) of files"
                  :key="file.name + file.type + file.size"
                  class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
                >
                  <div>
                    <img
                      role="presentation"
                      :alt="file.name"
                      :src="file.objectURL"
                      width="100"
                      height="50"
                    />
                  </div>
                  <span
                    class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                    >{{ file.name }}</span
                  >
                  <div>{{ formatSize(file.size) }}</div>
                  <Badge value="Pending" severity="warn" />
                  <Button
                    icon="pi pi-times"
                    @click="
                      onRemoveTemplatingFile(file, removeFileCallback, index)
                    "
                    outlined
                    rounded
                    severity="danger"
                  />
                </div>
              </div>
            </div>

            <div v-if="uploadedFiles.length > 0">
              <h5>Completed</h5>
              <div class="flex flex-wrap gap-4">
                <div
                  v-for="(file, index) of uploadedFiles"
                  :key="file.name + file.type + file.size"
                  class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
                >
                  <div>
                    <img
                      role="presentation"
                      :alt="file.name"
                      :src="file.objectURL"
                      width="100"
                      height="50"
                    />
                  </div>
                  <span
                    class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                    >{{ file.name }}</span
                  >
                  <div>{{ formatSize(file.size) }}</div>
                  <Badge value="Completed" class="mt-4" severity="success" />
                  <Button
                    icon="pi pi-times"
                    @click="removeUploadedFileCallback(index)"
                    outlined
                    rounded
                    severity="danger"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #empty>
          <div class="flex items-center justify-center flex-col">
            <i
              class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color"
            />
            <p class="mt-6 mb-0">
              Drag and drop phrase file(s) to here to use.
            </p>
          </div>
        </template>
      </FileUpload>
    </div>
    <div class="flex m-4 card flex-col items-right">
      <h1>Checked: {{ Checked }}</h1>
      <Terminal
        welcomeMessage="Welcome to Crypto Crack"
        prompt="cryptocrack $"
        aria-label="PrimeVue Terminal Service"
      />
    </div>
    <div class="row">
      <div class="flex flex-col items-center gap-2">
        <img
          src="/bitcoin.png"
          class="logo vite rounded-full !p-2"
          alt="Bitcoin logo"
        />
        <Checkbox v-model="checked" binary />
      </div>
      <div class="flex flex-col items-center gap-2">
        <img
          src="/ethereum.png"
          class="logo tauri rounded-full !p-2"
          alt="Ethereum logo"
        />
        <Checkbox v-model="checked" binary />
      </div>
      <div class="flex flex-col items-center gap-2">
        <img
          src="/litecoin.jpeg"
          class="logo vue rounded-full !p-2"
          alt="Litecoin logo"
        />
        <Checkbox v-model="checked" binary />
      </div>
    </div>
    <div class="row">
      <div class="flex flex-col items-center gap-2">
        <img
          src="/bnb.png"
          class="logo vite rounded-full !p-2"
          alt="Bitcoin logo"
        />
        <Checkbox v-model="checked" binary />
      </div>
      <div class="flex flex-col items-center gap-2">
        <img
          src="/solana.png"
          class="logo tauri rounded-full !p-2"
          alt="Ethereum logo"
        />
        <Checkbox v-model="checked" binary />
      </div>
      <div class="flex flex-col items-center gap-2">
        <img
          src="/tether.png"
          class="logo vue rounded-full !p-2"
          alt="Litecoin logo"
        />
        <Checkbox v-model="checked" binary />
      </div>
    </div>
  </main>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: #0f0f0f;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

.container {
  margin: auto;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: 0.75s;
}

.logo.tauri:hover {
  filter: drop-shadow(0 0 2em #24c8db);
}

.row {
  display: flex;
  justify-content: center;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

h1 {
  text-align: center;
}

input,
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #0f0f0f;
  background-color: #ffffff;
  transition: border-color 0.25s;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

button {
  cursor: pointer;
}

button:hover {
  border-color: #396cd8;
}
button:active {
  border-color: #396cd8;
  background-color: #e8e8e8;
}

input,
button {
  outline: none;
}

#greet-input {
  margin-right: 5px;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  }

  a:hover {
    color: #24c8db;
  }

  input,
  button {
    color: #ffffff;
    background-color: #0f0f0f98;
  }
  button:active {
    background-color: #0f0f0f69;
  }
}
</style>

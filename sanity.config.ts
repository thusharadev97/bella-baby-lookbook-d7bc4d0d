import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Bella & Baby',
  projectId: 'ktdhlkkl',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [],
  },
})

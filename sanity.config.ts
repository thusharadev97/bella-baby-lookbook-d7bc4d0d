import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { unsplashAssetSource } from 'sanity-plugin-asset-source-unsplash'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Bella & Baby',

  projectId: 'ktdhlkkl',
  dataset: 'production',

  plugins: [
    structureTool(),
    unsplashAssetSource(),
  ],

  schema: {
    types: schemaTypes,
  },
})

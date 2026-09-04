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
  ],

  form: {
    image: {
      assetSources: (previous) => {
        // Add Unsplash source properly as an asset source array item
        return [...previous, unsplashAssetSource]
      },
    },
  },

  schema: {
    types: schemaTypes,
  },
})

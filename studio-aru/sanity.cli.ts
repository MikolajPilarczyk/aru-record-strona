import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'qq5p1kty',
    dataset: 'production',
  },
  studioHost: 'aru-studio.sanity.studio',

  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    appId: 'y01km2yyhemqed52jtgwgogw',
    autoUpdates: true,
  },
})

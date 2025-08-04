import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need a token with write permissions
})

async function cleanupProductPageData() {
  try {
    // Fetch all productPage documents
    const productPages = await client.fetch('*[_type == "productPage"]')
    
    console.log(`Found ${productPages.length} productPage documents`)
    
    for (const doc of productPages) {
      console.log(`Cleaning up document: ${doc._id}`)
      
      // Update the document to remove emoji strings from keyModules icons
      const updatedKeyModules = doc.keyModules?.map(module => ({
        ...module,
        icon: (typeof module.icon === 'string') ? null : module.icon
      }))
      
      await client
        .patch(doc._id)
        .set({ keyModules: updatedKeyModules })
        .commit()
      
      console.log(`Updated document: ${doc._id}`)
    }
    
    console.log('Cleanup completed successfully!')
  } catch (error) {
    console.error('Error during cleanup:', error)
  }
}

cleanupProductPageData()

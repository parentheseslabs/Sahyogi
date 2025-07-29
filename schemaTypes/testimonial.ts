export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'quote', title: 'Quote', type: 'text' },
    { name: 'role', title: 'Role/Company', type: 'string' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
  ],
}; 
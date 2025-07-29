export default {
  name: 'whySahyogi',
  title: 'Why Sahyogi Section',
  type: 'document',
  fields: [
    {
      name: 'cardCount',
      title: 'Number of Cards to Display',
      type: 'number',
      validation: Rule => Rule.min(1).max(10),
    },
    {
      name: 'cards',
      title: 'Value Proposition Cards',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'valueProp' }] },
      ],
      validation: Rule => Rule.min(1),
    },
  ],
}; 
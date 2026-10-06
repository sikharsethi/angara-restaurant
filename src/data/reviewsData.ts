export interface Review { id: string; name: string; context: string; rating: number; text: string }

export const reviews: Review[] = [
  { id: 'r1', name: 'Aarav M.', context: 'Dinner for two', rating: 5, text: 'The black dal tastes like it has a memory. We watched the chefs work the coals from our table and did not want to leave.' },
  { id: 'r2', name: 'Nisha P.', context: 'Birthday dinner', rating: 5, text: 'The smoked beetroot starter was the surprise of the night. Service was calm and never rushed us.' },
  { id: 'r3', name: 'Daniel R.', context: 'Chef’s counter', rating: 4, text: 'Sitting at the counter for the tasting menu was worth it. The lamb was the best dish, and the cardamom cocktail came a close second.' },
  { id: 'r4', name: 'Meera S.', context: 'Family lunch', rating: 5, text: 'A room that feels warm without trying too hard. Even our youngest finished her kulfi, smoke and all.' },
]
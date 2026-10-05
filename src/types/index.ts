export type Category = 'Starters' | 'Main Course' | 'Desserts' | 'Beverages' | "Chef's Specials"
export interface Dish { id: string; name: string; description: string; price: number; category: Category; veg: boolean; label?: 'Popular' | "Chef's pick" }
export interface ReservationData { name: string; phone: string; email: string; date: string; time: string; guests: number; notes: string }
export type Errors = Partial<Record<keyof ReservationData, string>>

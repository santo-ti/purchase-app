import { FilterStatus } from "@/types/FilterStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ITEMS_STORAGE_KEY = "@comprar:items";

export type ItemsStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function getAllItems(): Promise<ItemsStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error("ITEMS_GET: " + error);
  }
}

async function getItemsByStatus(status: FilterStatus): Promise<ItemsStorage[]> {
  const items = await getAllItems();

  return items.filter((item) => item.status === status);
}

async function save(items: ItemsStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("ITEMS_SAVE: " + error);
  }
}

async function addNewItem(newItem: ItemsStorage): Promise<void> {
  const items = await getAllItems();
  const updatedItems = [...items, newItem];

  await save(updatedItems);
}

async function removeItemById(id: string): Promise<void> {
  const items = await getAllItems();
  const updatedItems = items.filter((item) => item.id !== id);

  await save(updatedItems);
}

export const storage = {
  getAllItems,
  getItemsByStatus,
  addNewItem,
  removeItemById,
};

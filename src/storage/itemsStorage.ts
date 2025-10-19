import { FilterStatus } from "@/types/FilterStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ITEMS_STORAGE_KEY = "@comprar:items";

export type StorageItem = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function getAllItems(): Promise<StorageItem[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error("ITEMS_GET: " + error);
  }
}

async function getItemsByStatus(status: FilterStatus): Promise<StorageItem[]> {
  const items = await getAllItems();

  return items.filter((item) => item.status === status);
}

async function save(items: StorageItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("ITEMS_SAVE: " + error);
  }
}

async function addNewItem(newItem: StorageItem): Promise<void> {
  const items = await getAllItems();
  const updatedItems = [...items, newItem];

  await save(updatedItems);
}

async function removeItemById(id: string): Promise<void> {
  const items = await getAllItems();
  const updatedItems = items.filter((item) => item.id !== id);

  await save(updatedItems);
}

async function clear(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
  } catch (error) {
    throw new Error("ITEMS_CLEAR: " + error);
  }
}

function toggleStatus(status: FilterStatus): FilterStatus {
  return status === FilterStatus.PENDING
    ? FilterStatus.DONE
    : FilterStatus.PENDING;
}

async function toggleItemStatus(id: string): Promise<void> {
  const items = await getAllItems();
  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          status: toggleStatus(item.status),
        }
      : item
  );

  await save(updatedItems);
}

export const itemsStorage = {
  getAllItems,
  getItemsByStatus,
  toggleItemStatus,
  addNewItem,
  removeItemById,
  clear,
};

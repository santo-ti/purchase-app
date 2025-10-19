import { FilterStatus } from "@/types/FilterStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ITEMS_STORAGE_KEY = "@comprar:items";

export type StorageItem = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function getAll(): Promise<StorageItem[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error("ITEMS_GET: " + error);
  }
}

async function getAllByStatus(status: FilterStatus): Promise<StorageItem[]> {
  const items = await getAll();

  return items.filter((item) => item.status === status);
}

async function save(items: StorageItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("ITEMS_SAVE: " + error);
  }
}

async function add(newItem: StorageItem): Promise<void> {
  const items = await getAll();
  const updatedItems = [...items, newItem];

  await save(updatedItems);
}

async function remove(id: string): Promise<void> {
  const items = await getAll();
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

function changeStatus(status: FilterStatus): FilterStatus {
  return status === FilterStatus.PENDING
    ? FilterStatus.DONE
    : FilterStatus.PENDING;
}

async function toggleStatus(id: string): Promise<void> {
  const items = await getAll();
  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          status: changeStatus(item.status),
        }
      : item
  );

  await save(updatedItems);
}

export const itemsStorage = {
  getAll,
  getAllByStatus,
  toggleStatus,
  add,
  remove,
  clear,
};

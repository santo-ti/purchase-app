import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { Input } from "@/components/Input";
import { Item } from "@/components/Item";
import { ItemsStorage, storage } from "@/storage/itemsStorage";
import { FilterStatus } from "@/types/FilterStatus";
import { useEffect, useState } from "react";
import { styles } from "./styles";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemsStorage[]>([]);

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.");
    }

    const newItem = {
      id: Math.random().toString().substring(2),
      description,
      status: FilterStatus.PENDING,
    };

    await storage.addNewItem(newItem);
    await fetchItemsByStatus();

    Alert.alert("Adicionado", `Adicionado ${description}`);
    setFilter(FilterStatus.PENDING);
    setDescription("");
  }

  async function fetchItemsByStatus() {
    try {
      const response = await storage.getItemsByStatus(filter);
      setItems(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os itens.");
    }
  }

  async function handleRemove(id: string) {
    try {
      await storage.removeItemById(id);
      await fetchItemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível remover o item.");
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos os itens?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sim",
        style: "destructive",
        onPress: async () => onClear(),
      },
    ]);
  }

  async function onClear() {
    try {
      await storage.clear();
      setItems([]);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível remover todos os itens.");
    }
  }

  async function handleToggleItemStatus(id: string) {
    try {
      await storage.toggleItemStatus(id);
      await fetchItemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível alterar o status do item.");
    }
  }

  useEffect(() => {
    fetchItemsByStatus();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.filters}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={filter === status}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity
            style={styles.clearButton}
            activeOpacity={0.7}
            onPress={handleClear}
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => handleToggleItemStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyContent}>Nenhum item aqui</Text>
          )}
        />
      </View>
    </View>
  );
}

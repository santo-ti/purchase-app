import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { Input } from "@/components/Input";
import { Item } from "@/components/Item";
import { FilterStatus } from "@/types/FilterStatus";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
const ITEMS = [
  { id: "1", description: "Leite", status: FilterStatus.DONE },
  { id: "2", description: "Ovos", status: FilterStatus.PENDING },
  { id: "3", description: "Pão", status: FilterStatus.DONE },
  { id: "4", description: "Manteiga", status: FilterStatus.PENDING },
  { id: "5", description: "Café", status: FilterStatus.DONE },
  { id: "6", description: "Frutas", status: FilterStatus.PENDING },
  { id: "7", description: "Verduras", status: FilterStatus.DONE },
  { id: "8", description: "Legumes", status: FilterStatus.PENDING },
  { id: "9", description: "Arroz", status: FilterStatus.DONE },
  { id: "10", description: "Feijão", status: FilterStatus.PENDING },
  { id: "11", description: "Macarrão", status: FilterStatus.DONE },
  { id: "12", description: "Carne", status: FilterStatus.PENDING },
  { id: "13", description: "Peixe", status: FilterStatus.DONE },
  { id: "14", description: "Frango", status: FilterStatus.PENDING },
  { id: "15", description: "Queijo", status: FilterStatus.DONE },
];

export function Home() {
  console.log(ITEMS);
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Entrar" />
      </View>

      <View style={styles.content}>
        <View style={styles.filters}>
          {FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive />
          ))}

          <TouchableOpacity style={styles.clearButton} activeOpacity={0.7}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onToggleStatus={() => console.log("mudar o status")}
              onRemove={() => console.log("remover")}
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

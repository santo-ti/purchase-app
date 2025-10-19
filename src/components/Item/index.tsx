import { StatusIcon } from "@/components/StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";
import { Trash2 } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type ItemData = {
  status: FilterStatus;
  description: string;
};

type ItemProps = {
  data: ItemData;
  onStatus: () => void;
  onRemove: () => void;
};

export function Item({ data, onStatus, onRemove }: ItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity activeOpacity={0.7} onPress={onRemove}>
        <Trash2 size={18} color="#E25858" />
      </TouchableOpacity>
    </View>
  );
}

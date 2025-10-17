import { StatusIcon } from "@/components/StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

type FilterProps = TouchableOpacityProps & {
  status: FilterStatus;
  isActive: boolean;
};

export function Filter({ status, isActive, ...rest }: FilterProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
      activeOpacity={0.7}
      {...rest}
    >
      <StatusIcon status={status} />

      <Text style={styles.title}>
        {status === FilterStatus.PENDING ? "Pendentes" : "Comprados"}
      </Text>
    </TouchableOpacity>
  );
}

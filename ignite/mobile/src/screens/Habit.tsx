import { ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from 'dayjs';
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";

interface IHabit {
  date: string;
}

export function Habit() {

  const route = useRoute();
  const { date } = route.params as Params;

  const parseDate = dayjs(date);
  const dayOfWeek = parseDate.format('dddd');
  const dayAndMonth = parseDate.format('DD/MM');

  console.log(date);

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={75} />

        <View className="mt-6">
          <CheckBox title="Comer um Haburgão" />
          <CheckBox title="Dormir pra caramba" checked={true} />
        </View>

      </ScrollView>
    </View>
  )
}
import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from 'dayjs';
import { api } from '../lib/axios'
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { generateProgressPercentage } from '../utils/generate-progress-percentage'
import HabitsEmpty from "../components/HabitsEmpty";
import clsx from "clsx";

interface IHabit {
  date: string;
}

interface DayInfoProps {
  completdHabits: string[],
  possibleHabits: {
    id: string;
    title: string,
  }[];
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  const route = useRoute();
  const { date } = route.params as Params;

  const parseDate = dayjs(date);
  const isDateInPast = parseDate.endOf('day').isBefore(new Date());
  const dayOfWeek = parseDate.format('dddd');
  const dayAndMonth = parseDate.format('DD/MM');

  const habitsProgress = dayInfo?.possibleHabits.length ? generateProgressPercentage(completedHabits.length, dayInfo.possibleHabits.length) : 0;

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await api.get('/day', { params: { date } }).then()
      setDayInfo(response.data)
      setCompletedHabits(response.data.completedHabits)
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos')
    } finally {
      setLoading(false);
    }
  }

  const handleToggleHabit = async (habitId: string) => {
    try {

      await api.patch(`/habits/${habitId}/toggle`);

      if (completedHabits.includes(habitId)) {
        setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId));
      } else {
        setCompletedHabits([...completedHabits, habitId]);
      }

    } catch (error) {
      Alert.alert('Ops', 'Não foi possível atualizar o status do hábito.')
    }


  }

  useEffect(() => {
    fetchHabits();
  }, [])

  if (loading) {
    return <Loading />
  }

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

        <ProgressBar progress={habitsProgress} />

        <View className={clsx("mt-6", {
          ["opacity-50"]: isDateInPast
        })}>
          {dayInfo?.possibleHabits ? dayInfo?.possibleHabits.map((habit, index) => (
            <CheckBox
              key={habit.id}
              title={habit.title}
              checked={completedHabits.includes(habit.id)}
              onPress={() => handleToggleHabit(habit.id)}
              disabled={isDateInPast}
            />
          )) : <HabitsEmpty />}
        </View>

        {
          isDateInPast && (
            <Text className="text-white mt-10 text-center">
              Você não pode editarum hábito de uma data passada.
            </Text>
          )
        }

      </ScrollView>
    </View>
  )
}
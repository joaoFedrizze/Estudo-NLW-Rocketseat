import { View, Text, ScrollView, Alert } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DAY_SIZE, HabitDay } from '../components/HabitDay';
import { Header } from '../components/Header';
import { generateDatesFromYearBeginning } from '../utils/generates-from-year-beggining';
import { api } from '../lib/axios';
import { Loading } from '../components/Loading';
import dayjs from 'dayjs';
import { useFocusEffect } from "@react-navigation/native";


const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDateSizes = 18 * 5;
const amountOfDatsToFill = minimumSummaryDateSizes - datesFromYearStart.length;

type SummaryPros = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>

export function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryPros | null>(null);

  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);

      const response = await api.get('/summary');
      setSummary(response.data);
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.');
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData();
  }, []))

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className='flex-row mt-6 mb-2'>
        {weekDays.map((weekDay, i) => (
          <Text key={`${weekDay}-${i}`}
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {
          summary &&
          <View className='flex-row flex-wrap'>
            {
              datesFromYearStart.map(date => {
                const dayWithHabits = summary.find(day => {
                  return dayjs(date).isSame(day.date, 'day')
                })

                return (
                  <HabitDay
                    key={date.toISOString()}
                    onPress={() => navigate('habit', { date: date.toISOString() })}
                    date={date}
                    amountOfHabits={dayWithHabits?.amount}
                    amountCompleted={dayWithHabits?.completed}
                  />
                )
              })
            }
            {
              amountOfDatsToFill > 0 && Array
                .from({ length: amountOfDatsToFill })
                .map((item, i) => (
                  <HabitDay
                    key={i}
                    disabled={true}
                  />
                ))
            }
          </View>
        }
      </ScrollView>
    </View>
  )
}

import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { useTasks } from '@/contexts/TaskContext';
import { PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

export default function StatisticsScreen() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const inProgressTasks = totalTasks - completedTasks;

  const completedPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  const inProgressPercentage = totalTasks === 0 ? 0 : (inProgressTasks / totalTasks) * 100;

  const chartData = [
    {
      name: 'Completed',
      tasks: completedTasks,
      color: '#71c49c',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'In Progress',
      tasks: inProgressTasks,
      color: '#F0EAD6',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
  ];

  return (
    <LinearGradient colors={['#71c49c', '#F0EAD6']} style={styles.gradientContainer}>
      <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Task Statistics 📊</Text>

        <Text style={styles.statText}>Total Tasks: {totalTasks}</Text>
        <Text style={styles.statText}>Completed Tasks: {completedTasks}</Text>
        <Text style={styles.statText}>In Progress Tasks: {inProgressTasks}</Text>

        <Text style={styles.statText}>
          Completed: {completedPercentage.toFixed(1)}% | In Progress: {inProgressPercentage.toFixed(1)}%
        </Text>

        {/* Pie Chart */}
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: 'transparent',
            backgroundGradientTo: 'transparent',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={'tasks'}
          backgroundColor={'transparent'}
          paddingLeft={'20'}
          absolute
        />
      </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  statText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});
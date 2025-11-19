// src/components/PertumbuhanChart.tsx
import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Pengukuran } from '../types/types'; // Import type

interface PertumbuhanChartProps {
  pengukuran: Pengukuran[];
}

const screenWidth = Dimensions.get('window').width;

const PertumbuhanChart: React.FC<PertumbuhanChartProps> = ({ pengukuran }) => {
  if (pengukuran.length === 0) {
    return (
      <Text style={styles.noDataText}>Tidak ada data untuk ditampilkan.</Text>
    );
  }

  // Urutkan data berdasarkan tanggal (pastikan ini dilakukan di DetailAnakScreen jika belum)
  const sortedPengukuran = [...pengukuran].sort(
    (a, b) =>
      new Date(a.tanggal_ukur).getTime() - new Date(b.tanggal_ukur).getTime(),
  );

  // Format data untuk chart
  const labels = sortedPengukuran.map(item => item.tanggal_ukur);
  const beratData = sortedPengukuran.map(item => item.berat_badan);
  const tinggiData = sortedPengukuran.map(item => item.tinggi_badan);
  // Status gizi bisa ditampilkan sebagai label atau keterangan di bawah

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: beratData,
        strokeWidth: 2,
        color: () => `rgb(255, 99, 132)`, // Merah untuk berat badan
      },
      {
        data: tinggiData,
        strokeWidth: 2,
        color: () => `rgb(54, 162, 235)`, // Biru untuk tinggi badan
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 1, // jumlah angka di belakang koma
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Grafik Pertumbuhan (Berat & Tinggi)</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withInnerLines={false}
        withOuterLines={false}
        withHorizontalLabels
        withVerticalLabels
        yAxisLabel=""
        yAxisSuffix=""
        xLabelsOffset={-10} // Offset untuk label X agar tidak terpotong
        formatYLabel={value => `${value}`} // Format label Y
        formatXLabel={label => label.split('-')[2] + '/' + label.split('-')[1]} // Format label X (DD/MM)
      />
      {/* Tambahkan legend manual */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              { backgroundColor: 'rgb(255, 99, 132)' },
            ]}
          />
          <Text style={styles.legendText}>Berat (kg)</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              { backgroundColor: 'rgb(54, 162, 235)' },
            ]}
          />
          <Text style={styles.legendText}>Tinggi (cm)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    padding: 10,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  noDataText: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
});

export default PertumbuhanChart;

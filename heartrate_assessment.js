const fs = require('fs');


function calculateMinMaxMed(data) {
  const dailyData = {};

  for (const measurement of data) {
    const startTime = getTimestamp(measurement, 'startTime');
    if (!startTime) {
      console.error('Error: Missing "startTime" property in a measurement.');
      continue;
    }

    const date = startTime.substring(0, 10);

    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        min: Infinity,
        max: -Infinity,
        measurements: [],
        latestDataTimestamp: null,
      };
    }

    dailyData[date].min = Math.min(dailyData[date].min, measurement.beatsPerMinute);
    dailyData[date].max = Math.max(dailyData[date].max, measurement.beatsPerMinute);
    dailyData[date].measurements.push(measurement);
    dailyData[date].latestDataTimestamp = getTimestamp(measurement, 'endTime');
  }

  for (const day in dailyData) {
    dailyData[day].median = calculateMedian(dailyData[day].measurements);
  }

  const formattedData = Object.values(dailyData).map(day => ({
    date: day.date,
    min: day.min,
    max: day.max,
    median: day.median,
    latestDataTimestamp: day.latestDataTimestamp,
  }));

  return formattedData;
}

function calculateMedian(data) {
  data.sort((a, b) => a.beatsPerMinute - b.beatsPerMinute);
  const midIndex = Math.floor(data.length / 2);
  return data.length % 2 === 0
    ? (data[midIndex].beatsPerMinute + data[midIndex - 1].beatsPerMinute) / 2
    : data[midIndex].beatsPerMinute;
}

function getTimestamp(measurement, property) {
  if (measurement.timestamps && measurement.timestamps[property]) {
    return measurement.timestamps[property];
  } else {
    console.warn(`Warning: Missing "${property}" property in a measurement. Skipping.`);
    return null;
  }
}

fs.readFile('heartrate.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const heartRateData = JSON.parse(data);

  const MinMaxMed = calculateMinMaxMed(heartRateData);

  fs.writeFile('output.json', JSON.stringify(MinMaxMed, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Metrics written to output.json successfully!');
  });
});
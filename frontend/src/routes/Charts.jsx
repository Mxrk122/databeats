
import React, { useState, useEffect } from "react";
import { Box, Stack, Spinner } from "@chakra-ui/react";
import { ChartsApi } from "@mongodb-js/charts";

const initCharts = (charts, setLoading, setError) => {
  const chartsApi = new ChartsApi({
    baseUrl: "https://charts.mongodb.com/charts-project-0-dfebe"
  });

  const chartPromises = charts.map(chart =>
    chartsApi.charts.get({ chartId: chart.chartId }).then(data => {
      return {
        ...chart,
        data: data.spec
      };
    })
  );

  Promise.all(chartPromises)
    .then(chartSpecs => {
      setLoading(false);
      setError(null);
      return chartSpecs;
    })
    .catch(error => {
      setLoading(false);
      setError(error);
    });
};

const ChartsContainer = ({ charts }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartSpecs, setChartSpecs] = useState([]);

  useEffect(() => {
    initCharts(charts, setLoading, setError);
  }, []);

  if (loading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Heading as="h3" size="md">
          Error loading charts
        </Heading>
        <p>{error.message}</p>
      </Box>
    );
  }

  return (
    <Stack spacing={5}>
      {chartSpecs.map(chart => (
        <Box key={chart.chartId}>
          <p>{JSON.stringify(chart.data)}</p>
        </Box>
      ))}
    </Stack>
  );
};

export default ChartsContainer;
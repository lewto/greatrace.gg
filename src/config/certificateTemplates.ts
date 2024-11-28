export const certificateTemplates = {
  'FORMULA 1 WORLD CHAMPIONSHIP': {
    '1st': '/templates/F1_1st.png',
    '2nd': '/templates/F1_2nd.png',
    '3rd': '/templates/F1_3rd.png',
    'default': '/templates/F1_default.png'
  },
  'GT3 CHALLENGE': {
    '1st': '/templates/GT3_1st.png',
    '2nd': '/templates/GT3_2nd.png',
    '3rd': '/templates/GT3_3rd.png',
    'default': '/templates/GT3_default.png'
  }
};

export const getTemplateUrl = (seriesName: string, position: string): string => {
  const series = certificateTemplates[seriesName];
  if (!series) return certificateTemplates['FORMULA 1 WORLD CHAMPIONSHIP'].default;
  
  return series[position] || series.default;
};
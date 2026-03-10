export interface FormValues {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface PredictionResult {
  crop: string;
  confidence: number;
}

export interface FieldConfig {
  key: keyof FormValues;
  label: string;
  icon: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultVal: number;
  description: string;
  color: string;
}

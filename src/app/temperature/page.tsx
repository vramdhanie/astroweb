import TemperatureScales from '@/components/TemperatureScales';

export const metadata = { title: 'Temperature' };

export default function Temperature() {
  return (
    <div className="py-8">
      <h1 className="mb-1 text-center text-2xl font-semibold text-[var(--foreground)]">
        Reading Fahrenheit in Celsius
      </h1>
      <p className="mx-auto mb-8 max-w-md text-center text-sm text-[var(--muted-foreground)]">
        Kelvin, Celsius and Fahrenheit on one axis. Find the spoken decade on the right
        (&ldquo;in the 80s&rdquo;), read straight across for the °C and how it feels. Hover or tap
        the scale for exact conversions.
      </p>
      <TemperatureScales />
    </div>
  );
}

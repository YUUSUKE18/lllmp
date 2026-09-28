import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long sum = 0;
        String[] parts = line.trim().split(",");
        for (String part : parts) {
            int value;
            int frequency;
            String valueStr = part.split(":")[0];
            String freqStr = part.split(":")[1];
            try {
                value = Integer.parseInt(valueStr);
                frequency = Integer.parseInt(freqStr);
                count += frequency;
                sum += value * frequency;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}

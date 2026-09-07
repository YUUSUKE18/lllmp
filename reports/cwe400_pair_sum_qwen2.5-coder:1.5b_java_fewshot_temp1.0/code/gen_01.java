import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = Long.parseLong(line.split("\\s+")[0]);
        long sum = 0;
        int pairs = 0;
        while ((line = br.readLine()) != null) {
            String[] parts = line.split("\\s+");
            for (String part : parts) {
                try {
                    long value = Long.parseLong(part);
                    if (value > 0) {
                        sum += value;
                        pairs++;
                        if (sum >= target) {
                            break;
                        }
                    }
                } catch (NumberFormatException e) {
                }
            }
            if (sum >= target) {
                break;
            }
        }
        System.out.println("pairs=" + pairs);
    }
}

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long sum = 0;
        boolean first = true;
        if (line != null) {
            for (String part : line.trim().split(",")) {
                if (part.isEmpty()) continue;
                int value;
                int times;
                try {
                    int colonIndex = part.indexOf(':');
                    if (colonIndex == -1 || colonIndex == part.length() - 1) continue;
                    value = Integer.parseInt(part.substring(0, colonIndex));
                    times = Integer.parseInt(part.substring(colonIndex + 1));
                } catch (NumberFormatException e) {
                    continue;
                }
                if (first || value > sum / 1000000000L || (value == sum / 1000000000L && times > count)) {
                    sum = value * times;
                    count = times;
                    first = false;
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}

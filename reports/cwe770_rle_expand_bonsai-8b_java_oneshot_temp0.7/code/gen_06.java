import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        boolean first = true;
        if (line != null) {
            for (String f : line.trim().split("\\s+\\s*:\\s*\\d+\\s*\\d+\\s*")) {
                String[] parts = f.split(":");
                if (parts.length != 2) continue;
                int value = Integer.parseInt(parts[0]);
                int countStr = parts[1];
                if (countStr.isEmpty()) continue;
                try {
                    count = Integer.parseInt(countStr);
                    sum += value * count;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}

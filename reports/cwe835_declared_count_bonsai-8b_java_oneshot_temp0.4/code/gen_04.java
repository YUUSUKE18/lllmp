import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String countStr = br.readLine();
        int count = 0;
        if (countStr != null) {
            try {
                count = Integer.parseInt(countStr);
            } catch (NumberFormatException e) {
            }
        }
        long sum = 0;
        int actualCount = 0;
        boolean first = true;
        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) break;
            if (first) {
                if (countStr != null && countStr.trim().isEmpty()) {
                    count = 0;
                } else {
                    try {
                        count = Integer.parseInt(line);
                    } catch (NumberFormatException e) {
                    }
                }
                first = false;
            } else {
                if (line.trim().isEmpty()) continue;
                try {
                    int num = Integer.parseInt(line);
                    sum += num;
                    actualCount++;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}

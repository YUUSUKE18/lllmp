import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String firstLine = reader.readLine();
        if (firstLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        int countLimit = Integer.parseInt(firstLine.trim());

        long sum = 0;
        int actualCount = 0;

        while (true) {
            String line = reader.readLine();
            if (line == null) {
                break;
            }

            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                int value = Integer.parseInt(line);
                sum += value;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}

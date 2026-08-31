import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        int expectedCount = Integer.parseInt(firstLine.trim());
        long count = 0;
        long sum = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                long val = Long.parseLong(line.trim());
                count++;
                sum += val;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}

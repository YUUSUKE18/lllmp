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

        int n;
        try {
            n = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            n = 0;
        }

        long sum = 0;
        int count = 0;

        while ((br.readLine() != null)) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) continue;

            try {
                long val = Long.parseLong(line.trim());
                sum += val;
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}

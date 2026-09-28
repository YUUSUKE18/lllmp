import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        try {
            int count = Integer.parseInt(line.trim());
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }
        int sum = 0;
        int actualCount = 0;
        String remainingLine = line;
        while (remainingLine != null) {
            remainingLine = br.readLine();
            if (remainingLine == null) {
                break;
            }
            String[] tokens = remainingLine.trim().split("\\s+");
            for (String token : tokens) {
                if (token.isEmpty()) continue;
                try {
                    int num = Integer.parseInt(token);
                    actualCount++;
                    sum += num;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}

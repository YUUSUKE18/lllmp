import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        String[] parts = line.split(",");
        long totalSum = 0;
        int count = 0;

        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part);
                distinctNumbers.add(num);
                totalSum += num;
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        System.out.println("count=" + count + " sum=" + totalSum);
    }
}

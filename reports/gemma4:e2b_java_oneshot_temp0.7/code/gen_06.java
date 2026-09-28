import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        String[] parts = line.split(",");

        for (String part : parts) {
            try {
                // 前後の空白を無視して整数としてパース
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    int number = Integer.parseInt(trimmedPart);
                    uniqueNumbers.add(number);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        long count = uniqueNumbers.size();
        long sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}

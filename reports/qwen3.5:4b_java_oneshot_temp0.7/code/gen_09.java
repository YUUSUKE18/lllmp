import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                int number;
                try {
                    // 前後の空白を除去し、整数として解析
                    part = part.trim();
                    if (!part.isEmpty()) {
                        number = Integer.parseInt(part);
                        uniqueNumbers.add(number);
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }
        
        int count = uniqueNumbers.size();
        long sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}

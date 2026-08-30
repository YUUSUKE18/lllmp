import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        if (line != null && !line.isEmpty()) {
            // カンマ区切りで分割し、空白を除去して整数に変換する
            for (String part : line.split(",")) {
                String trimmedPart = part.trim();
                try {
                    int num = Integer.parseInt(trimmedPart);
                    uniqueNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        long count = uniqueNumbers.size();
        
        if (!uniqueNumbers.isEmpty()) {
            long sum = 0;
            for (int num : uniqueNumbers) {
                sum += num;
            }
            System.out.println("count=" + count + " sum=" + sum);
        } else {
            System.out.println("count=0 sum=0");
        }
    }
}

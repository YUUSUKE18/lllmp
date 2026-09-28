import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        for (String part : line.split(",")) {
            String trimmed = part.trim();
            if (!trimmed.isEmpty()) {
                try {
                    int num = Integer.parseInt(trimmed);
                    // 整数として解釈できるものをセットに追加（重複を除く）
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 解析できない要素は無視
                }
            }
        }

        long count = distinctNumbers.size();
        long sum = 0;
        
        for (int num : distinctNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}

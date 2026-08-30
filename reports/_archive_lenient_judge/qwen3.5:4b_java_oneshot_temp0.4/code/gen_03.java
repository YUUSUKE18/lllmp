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
        int count = 0;
        long totalSum = 0L;

        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                // 重複を除くために Set に追加し、一意の要素のみカウントと合計に含める
                int num = Integer.parseInt(part.trim());
                distinctNumbers.add(num);
                
                count++;
                totalSum += num;
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視する
            }
        }

        System.out.println("count=" + count + " sum=" + totalSum);
    }
}
